const DevCheckpoint = (() => {
  function cloneDevData(value) {
    if (typeof structuredClone === "function") {
      return structuredClone(value);
    }
    return JSON.parse(JSON.stringify(value));
  }

  function cloneEntityForSnapshot(entity) {
    if (!entity) {
      return null;
    }
    const stateData = cloneDevData(entity.state || {});
    const stateProto = entity.state ? Object.getPrototypeOf(entity.state) : Object.prototype;
    const stateClone = Object.assign(Object.create(stateProto), stateData);
    return {
      id: entity.id,
      type: entity.type,
      tileX: entity.tileX,
      tileY: entity.tileY,
      state: stateClone
    };
  }

  function captureRestrictedSkipSnapshot(state) {
    const counters = {
      ironOre,
      ironBar,
      ironPlate,
      copperOre,
      copperBar,
      copperPlate,
      copperWire,
      helium,
      rocketFuel,
      modularComponent,
      shipAlloy,
      electronics
    };

    const entities = state.entities.map((entity) => cloneEntityForSnapshot(entity));
    const tiles = state.map.tiles.map((row) =>
      row.map((tile) => {
        const cloned = cloneDevData(tile);
        cloned.entity = null;
        return cloned;
      })
    );

    return {
      counters,
      entities,
      tiles,
      shuttleEntityId: state.shuttleEntityId,
      selectedBuilding: cloneDevData(state.selectedBuilding),
      feedback: cloneDevData(state.feedback)
    };
  }

  function restoreRestrictedSkipSnapshot(state, snapshot) {
    if (!state || !snapshot) {
      return;
    }

    ironOre = snapshot.counters.ironOre;
    ironBar = snapshot.counters.ironBar;
    ironPlate = snapshot.counters.ironPlate;
    copperOre = snapshot.counters.copperOre;
    copperBar = snapshot.counters.copperBar;
    copperPlate = snapshot.counters.copperPlate;
    copperWire = snapshot.counters.copperWire;
    helium = snapshot.counters.helium;
    rocketFuel = snapshot.counters.rocketFuel;
    modularComponent = snapshot.counters.modularComponent;
    shipAlloy = snapshot.counters.shipAlloy;
    electronics = snapshot.counters.electronics;

    state.entities.length = 0;
    for (const entity of snapshot.entities) {
      state.entities.push(cloneEntityForSnapshot(entity));
    }

    const entityById = new Map(state.entities.map((entity) => [entity.id, entity]));
    for (let y = 0; y < state.map.tiles.length; y++) {
      for (let x = 0; x < state.map.tiles[y].length; x++) {
        const tileSnapshot = snapshot.tiles[y][x];
        state.map.tiles[y][x] = {
          ...tileSnapshot,
          entity: tileSnapshot.entityId != null ? entityById.get(tileSnapshot.entityId) || null : null
        };
      }
    }

    state.shuttleEntityId = snapshot.shuttleEntityId;
    state.selectedBuilding = cloneDevData(snapshot.selectedBuilding);
    state.feedback = cloneDevData(snapshot.feedback);
  }

  function showDevSkipFeedback(messageText) {
    if (!drawGame.state || !drawGame.state.feedback) {
      return;
    }
    const feedback = drawGame.state.feedback;
    feedback.buildCostMessageText = String(messageText || "Dev skip updated.");
    feedback.buildCostMessageUntil = millis() + 2400;
    feedback.buildCostBlinkUntil = 0;
    feedback.buildCostEntityType = null;
  }

  function setTileResourceNodeForDevSkip(state, col, row, nodeKey) {
    const tile = state?.map?.tiles?.[row]?.[col];
    if (!tile) {
      throw new Error(`Cannot mark resource at (${col},${row})`);
    }

    tile.type = nodeKey;
    if (nodeKey === "iron") {
      tile.resource = RESOURCE_TYPES.IRON_ORE;
    } else if (nodeKey === "copper") {
      tile.resource = RESOURCE_TYPES.COPPER_ORE;
    } else if (nodeKey === "helium3") {
      tile.resource = RESOURCE_TYPES.HELIUM3;
    } else {
      tile.resource = null;
    }
  }

  function resetRestrictedDevLayoutState(state) {
    if (!state || !state.map || !Array.isArray(state.entities)) {
      throw new Error("Invalid game state for dev reset.");
    }

    const mapRows = state.map.tiles.length;
    const mapCols = mapRows > 0 ? state.map.tiles[0].length : 0;
    for (let y = 0; y < mapRows; y++) {
      for (let x = 0; x < mapCols; x++) {
        const tile = state.map.tiles[y][x];
        tile.entityId = null;
        tile.entity = null;
        tile.item = null;
        tile.colorOverride = null;
        tile.building = null;
      }
    }

    let shuttle = getRestrictedModeShuttleEntity();
    if (!shuttle || shuttle.type !== ENTITY_TYPES.SHUTTLE) {
      shuttle = state.entities.find((entity) => entity.type === ENTITY_TYPES.SHUTTLE) || null;
    }

    state.entities.length = 0;
    if (!shuttle) {
      state.shuttleEntityId = null;
      spawnRestrictedModeShuttle(state);
      shuttle = getRestrictedModeShuttleEntity();
      if (!shuttle) {
        throw new Error("Failed to spawn shuttle for restricted skip.");
      }
    } else {
      shuttle.state.facing = shuttle.state.facing || "E";
      state.entities.push(shuttle);
      state.shuttleEntityId = shuttle.id;

      const footprintTiles = getSafeFootprintTilesAt(
        ENTITY_TYPES.SHUTTLE,
        shuttle.tileX,
        shuttle.tileY
      );
      for (const entry of footprintTiles) {
        const tile = state.map.tiles[entry.y] && state.map.tiles[entry.y][entry.x];
        if (!tile) {
          throw new Error("Shuttle footprint is out of bounds.");
        }
        tile.entityId = shuttle.id;
        tile.entity = shuttle;
        tile.item = ENTITY_TYPES.SHUTTLE;
        tile.colorOverride = null;
      }

      const centerTile = state.map.tiles[shuttle.tileY] && state.map.tiles[shuttle.tileY][shuttle.tileX];
      if (!centerTile) {
        throw new Error("Shuttle center tile is invalid.");
      }
      centerTile.building = {
        color: getEntityFillRgb(ENTITY_TYPES.SHUTTLE),
        label: getEntityShortLabel(ENTITY_TYPES.SHUTTLE),
        name: "Crashed Shuttle",
        entityType: ENTITY_TYPES.SHUTTLE,
        facing: shuttle.state.facing,
        entityId: shuttle.id
      };
    }

    ironOre = 0;
    ironBar = 0;
    ironPlate = 0;
    copperOre = 0;
    copperBar = 0;
    copperPlate = 0;
    copperWire = 0;
    helium = 0;
    rocketFuel = 0;
    modularComponent = 0;
    shipAlloy = 0;
    electronics = 0;

    if (!shuttle.state || typeof shuttle.state !== "object") {
      throw new Error("Shuttle state missing.");
    }
    shuttle.state.inventory = {};
    for (const resourceType of Object.values(RESOURCE_TYPES)) {
      shuttle.state.inventory[resourceType] = 0;
    }
    shuttle.state.pipeIntakeAccumulators = {};

    state.selectedBuilding = null;
    if (state.feedback) {
      state.feedback.buildCostBlinkUntil = 0;
      state.feedback.buildCostEntityType = null;
      state.feedback.buildCostMessageText = "";
      state.feedback.buildCostMessageUntil = 0;
    }

    updateConnections(state.entities);
    return shuttle;
  }

  function placeDevEntity(type, tileX, tileY, options = {}) {
    const state = drawGame.state;
    if (!state || !state.map || !state.config || !Array.isArray(state.entities)) {
      throw new Error("Cannot place dev entity without active game state.");
    }

    const { mapCols, mapRows } = state.config;
    const footprintTiles = getSafeFootprintTilesAt(type, tileX, tileY);
    for (const entry of footprintTiles) {
      if (
        entry.x < 0 ||
        entry.x >= mapCols ||
        entry.y < 0 ||
        entry.y >= mapRows
      ) {
        throw new Error(`Placement out of bounds for ${type} at (${tileX},${tileY}).`);
      }
      const tile = state.map.tiles[entry.y][entry.x];
      if (tile.entityId != null) {
        throw new Error(`Placement blocked for ${type} at (${tileX},${tileY}).`);
      }
    }

    const anchorTile = state.map.tiles[tileY] && state.map.tiles[tileY][tileX];
    if (!anchorTile) {
      throw new Error(`Missing anchor tile at (${tileX},${tileY}).`);
    }

    const baseOptions =
      type === ENTITY_TYPES.MINER || type === ENTITY_TYPES.EXTRACTOR
        ? getPlacementOptionsForTile(type, anchorTile)
        : getPlacementOptionsForEntity(type, anchorTile);
    const mergedOptions = {
      ...(baseOptions || {}),
      ...(options || {})
    };

    const entity = createEntity(type, tileX, tileY, mergedOptions);
    if (mergedOptions.facing) {
      entity.state.facing = mergedOptions.facing;
    }
    if (type === ENTITY_TYPES.TUBE && mergedOptions.shape) {
      entity.state.shape = mergedOptions.shape;
    }
    if (type === ENTITY_TYPES.MINER && typeof entity.state.updateOutputRate === "function") {
      entity.state.updateOutputRate();
    }

    state.entities.push(entity);
    for (const entry of footprintTiles) {
      const tile = state.map.tiles[entry.y][entry.x];
      tile.entityId = entity.id;
      tile.entity = entity;
      tile.item = type;
      tile.colorOverride = null;
    }

    anchorTile.building = {
      color: getEntityFillRgb(type),
      label: getEntityShortLabel(type),
      name: options.name || getEntityDisplayName(type),
      entityType: type,
      facing: entity.state.facing || "E",
      entityId: entity.id
    };

    return entity;
  }

  function getEntityPortTile(entity, kind, index = 0) {
    const ports = getEntityConnectionPorts(entity).filter((port) => port.kind === kind);
    if (index < 0 || index >= ports.length) {
      throw new Error(`Missing ${kind} port index ${index} on entity ${entity?.id}.`);
    }
    return {
      x: ports[index].worldX,
      y: ports[index].worldY
    };
  }

  function vectorKey(vec) {
    return `${vec.x},${vec.y}`;
  }

  function normalizeCardinalVector(vec, label = "vector") {
    if (!vec || !Number.isFinite(vec.x) || !Number.isFinite(vec.y)) {
      throw new Error(`Invalid ${label}.`);
    }
    const x = Math.sign(vec.x);
    const y = Math.sign(vec.y);
    if ((x === 0 && y === 0) || (x !== 0 && y !== 0)) {
      throw new Error(`Non-cardinal ${label}.`);
    }
    return { x, y };
  }

  function getTubeOptionsForConnectionVectors(vecA, vecB) {
    const a = normalizeCardinalVector(vecA, "tube vector A");
    const b = normalizeCardinalVector(vecB, "tube vector B");
    if (a.x === b.x && a.y === b.y) {
      throw new Error("Tube vectors cannot point in the same direction.");
    }

    if (a.x === -b.x && a.y === -b.y) {
      if (a.y === 0) {
        return { shape: TUBE_SHAPES.STRAIGHT, facing: "E" };
      }
      return { shape: TUBE_SHAPES.STRAIGHT, facing: "N" };
    }

    const pair = new Set([vectorKey(a), vectorKey(b)]);
    if (pair.has("-1,0") && pair.has("0,1")) {
      return { shape: TUBE_SHAPES.CORNER, facing: "E" };
    }
    if (pair.has("0,1") && pair.has("1,0")) {
      return { shape: TUBE_SHAPES.CORNER, facing: "N" };
    }
    if (pair.has("1,0") && pair.has("0,-1")) {
      return { shape: TUBE_SHAPES.CORNER, facing: "W" };
    }
    if (pair.has("0,-1") && pair.has("-1,0")) {
      return { shape: TUBE_SHAPES.CORNER, facing: "S" };
    }

    throw new Error(`Unsupported tube corner vectors: ${vectorKey(a)} + ${vectorKey(b)}`);
  }

  function getBlockedPortKeysForRouting(excludedKeys) {
    const blocked = new Set();
    if (!drawGame.state || !Array.isArray(drawGame.state.entities)) {
      return blocked;
    }
    const excluded = excludedKeys || new Set();
    for (const entity of drawGame.state.entities) {
      const ports = getEntityConnectionPorts(entity);
      for (const port of ports) {
        const key = `${port.worldX},${port.worldY}`;
        if (!excluded.has(key)) {
          blocked.add(key);
        }
      }
    }
    return blocked;
  }

  function findDevTubePath(startTile, endTile, blockedPortKeys) {
    const state = drawGame.state;
    const { mapCols, mapRows } = state.config;
    const map = state.map;
    const startKey = `${startTile.x},${startTile.y}`;
    const endKey = `${endTile.x},${endTile.y}`;
    const blocked = blockedPortKeys || new Set();

    const inBounds = (x, y) =>
      x >= 0 && x < mapCols && y >= 0 && y < mapRows;

    const canOccupy = (x, y) => {
      if (!inBounds(x, y)) {
        return false;
      }
      const key = `${x},${y}`;
      if (key === startKey || key === endKey) {
        const tile = map.tiles[y][x];
        return tile && tile.entityId == null;
      }
      if (blocked.has(key)) {
        return false;
      }
      const tile = map.tiles[y][x];
      return !!tile && tile.entityId == null;
    };

    const queue = [startTile];
    let head = 0;
    const visited = new Set([startKey]);
    const parent = new Map();
    const directions = [
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 }
    ];

    while (head < queue.length) {
      const current = queue[head++];
      const currentKey = `${current.x},${current.y}`;
      if (currentKey === endKey) {
        break;
      }
      for (const dir of directions) {
        const nx = current.x + dir.x;
        const ny = current.y + dir.y;
        const nextKey = `${nx},${ny}`;
        if (visited.has(nextKey) || !canOccupy(nx, ny)) {
          continue;
        }
        visited.add(nextKey);
        parent.set(nextKey, currentKey);
        queue.push({ x: nx, y: ny });
      }
    }

    if (!visited.has(endKey)) {
      return null;
    }

    const path = [];
    let cursorKey = endKey;
    while (cursorKey) {
      const [cx, cy] = cursorKey.split(",").map(Number);
      path.push({ x: cx, y: cy });
      if (cursorKey === startKey) {
        break;
      }
      cursorKey = parent.get(cursorKey);
    }
    path.reverse();
    return path;
  }

  function routeAndPlaceTubePath(startTile, endTile, startVectorToEntity, endVectorToEntity) {
    const start = { x: startTile.x, y: startTile.y };
    const end = { x: endTile.x, y: endTile.y };
    const startVector = normalizeCardinalVector(startVectorToEntity, "start vector");
    const endVector = normalizeCardinalVector(endVectorToEntity, "end vector");

    const excludedPortKeys = new Set([
      `${start.x},${start.y}`,
      `${end.x},${end.y}`
    ]);
    const blockedPortKeys = getBlockedPortKeysForRouting(excludedPortKeys);
    const path = findDevTubePath(start, end, blockedPortKeys);
    if (!path || path.length === 0) {
      throw new Error(
        `No tube path found from (${start.x},${start.y}) to (${end.x},${end.y}).`
      );
    }

    const placed = [];
    for (let i = 0; i < path.length; i++) {
      const current = path[i];
      const backVector = i === 0
        ? startVector
        : {
            x: path[i - 1].x - current.x,
            y: path[i - 1].y - current.y
          };
      const forwardVector = i === path.length - 1
        ? endVector
        : {
            x: path[i + 1].x - current.x,
            y: path[i + 1].y - current.y
          };

      const tubeOptions = getTubeOptionsForConnectionVectors(backVector, forwardVector);
      const tube = placeDevEntity(ENTITY_TYPES.TUBE, current.x, current.y, {
        shape: tubeOptions.shape,
        facing: tubeOptions.facing
      });
      placed.push(tube);
    }

    return placed;
  }

  function connectOutputToInput(sourceEntity, sinkEntity, sinkInputIndex = 0) {
    const startPort = getEntityPortTile(sourceEntity, "output", 0);
    const endPort = getEntityPortTile(sinkEntity, "input", sinkInputIndex);
    const startVectorToEntity = {
      x: sourceEntity.tileX - startPort.x,
      y: sourceEntity.tileY - startPort.y
    };
    const endVectorToEntity = {
      x: sinkEntity.tileX - endPort.x,
      y: sinkEntity.tileY - endPort.y
    };
    return routeAndPlaceTubePath(
      startPort,
      endPort,
      startVectorToEntity,
      endVectorToEntity
    );
  }

  function connectOutputToShuttlePort(sourceEntity, shuttleEntity, shuttlePortIndex = 0) {
    return connectOutputToInput(sourceEntity, shuttleEntity, shuttlePortIndex);
  }

  function validateRestrictedLateGameSkip(state, shuttle) {
    if (!state || !shuttle) {
      return { ok: false, reason: "Missing state or shuttle." };
    }

    const incoming = getIncomingTubeInputs(state.entities, shuttle.id);
    const hasIronPlateIncoming = incoming.some(
      (entry) =>
        entry.outputType === RESOURCE_TYPES.IRON_PLATE &&
        (Number(entry.rate) || 0) > 0
    );
    const hasCopperPlateIncoming = incoming.some(
      (entry) =>
        entry.outputType === RESOURCE_TYPES.COPPER_PLATE &&
        (Number(entry.rate) || 0) > 0
    );
    if (!hasIronPlateIncoming || !hasCopperPlateIncoming) {
      return {
        ok: false,
        reason: "Shuttle is not receiving both iron plate and copper plate."
      };
    }

    const activeConstructors = state.entities.filter(
      (entity) =>
        entity.type === ENTITY_TYPES.CONSTRUCTOR &&
        entity.state &&
        entity.state.isActive &&
        entity.state.outputType
    );
    const activeOutputs = new Set(
      activeConstructors.map((entity) => entity.state.outputType)
    );
    const requiredOutputs = [
      RESOURCE_TYPES.MODULAR_COMPONENT,
      RESOURCE_TYPES.SHIP_ALLOY,
      RESOURCE_TYPES.ELECTRONICS
    ];
    const missingOutputs = requiredOutputs.filter(
      (outputType) => !activeOutputs.has(outputType)
    );
    if (missingOutputs.length > 0) {
      return {
        ok: false,
        reason: `Missing active outputs: ${missingOutputs.join(", ")}`
      };
    }

    return {
      ok: true,
      incoming,
      activeOutputs: [...activeOutputs]
    };
  }

  function applyRestrictedLateGameSkip() {
    if (!drawGame.state || !drawGame.state.isRestrictedMode) {
      return false;
    }

    const state = drawGame.state;
    const snapshot = captureRestrictedSkipSnapshot(state);

    try {
      const shuttle = resetRestrictedDevLayoutState(state);

      setTileResourceNodeForDevSkip(state, 20, 10, "iron");
      setTileResourceNodeForDevSkip(state, 30, 10, "copper");
      setTileResourceNodeForDevSkip(state, 13, 24, "iron");
      setTileResourceNodeForDevSkip(state, 15, 24, "iron");
      setTileResourceNodeForDevSkip(state, 17, 24, "iron");
      setTileResourceNodeForDevSkip(state, 33, 24, "copper");
      setTileResourceNodeForDevSkip(state, 35, 24, "copper");
      setTileResourceNodeForDevSkip(state, 37, 24, "copper");

      const placed = {};
      placed.I_M1 = placeDevEntity(ENTITY_TYPES.MINER, 20, 10, { facing: "N" });
      placed.I_S1 = placeDevEntity(ENTITY_TYPES.SMELTER, 20, 8, { facing: "N" });
      placed.I_P1 = placeDevEntity(ENTITY_TYPES.CONSTRUCTOR, 20, 6, { facing: "E" });

      placed.C_M1 = placeDevEntity(ENTITY_TYPES.MINER, 30, 10, { facing: "N" });
      placed.C_S1 = placeDevEntity(ENTITY_TYPES.SMELTER, 30, 8, { facing: "N" });
      placed.C_P1 = placeDevEntity(ENTITY_TYPES.CONSTRUCTOR, 30, 6, { facing: "W" });

      placed.I_M2 = placeDevEntity(ENTITY_TYPES.MINER, 13, 24, { facing: "N" });
      placed.I_S2 = placeDevEntity(ENTITY_TYPES.SMELTER, 13, 22, { facing: "N" });
      placed.I_P2 = placeDevEntity(ENTITY_TYPES.CONSTRUCTOR, 13, 20, { facing: "E" });

      placed.I_M3 = placeDevEntity(ENTITY_TYPES.MINER, 15, 24, { facing: "N" });
      placed.I_S3 = placeDevEntity(ENTITY_TYPES.SMELTER, 15, 22, { facing: "N" });

      placed.I_M4 = placeDevEntity(ENTITY_TYPES.MINER, 17, 24, { facing: "N" });
      placed.I_S4 = placeDevEntity(ENTITY_TYPES.SMELTER, 17, 22, { facing: "N" });
      placed.I_P4 = placeDevEntity(ENTITY_TYPES.CONSTRUCTOR, 17, 20, { facing: "E" });

      placed.C_M2 = placeDevEntity(ENTITY_TYPES.MINER, 33, 24, { facing: "N" });
      placed.C_S2 = placeDevEntity(ENTITY_TYPES.SMELTER, 33, 22, { facing: "N" });
      placed.C_P2 = placeDevEntity(ENTITY_TYPES.CONSTRUCTOR, 33, 20, { facing: "W" });

      placed.C_M3 = placeDevEntity(ENTITY_TYPES.MINER, 35, 24, { facing: "N" });
      placed.C_S3 = placeDevEntity(ENTITY_TYPES.SMELTER, 35, 22, { facing: "N" });
      placed.C_P3 = placeDevEntity(ENTITY_TYPES.CONSTRUCTOR, 35, 20, { facing: "W" });

      placed.C_M4 = placeDevEntity(ENTITY_TYPES.MINER, 37, 24, { facing: "N" });
      placed.C_S4 = placeDevEntity(ENTITY_TYPES.SMELTER, 37, 22, { facing: "N" });

      placed.A_MOD = placeDevEntity(ENTITY_TYPES.CONSTRUCTOR, 15, 18, { facing: "E" });
      placed.A_SHIP = placeDevEntity(ENTITY_TYPES.CONSTRUCTOR, 25, 18, { facing: "E" });
      placed.A_WIRE = placeDevEntity(ENTITY_TYPES.CONSTRUCTOR, 37, 18, { facing: "W" });
      placed.A_ELEC = placeDevEntity(ENTITY_TYPES.CONSTRUCTOR, 25, 22, { facing: "E" });

      connectOutputToInput(placed.I_M1, placed.I_S1, 0);
      connectOutputToInput(placed.I_S1, placed.I_P1, 1);
      connectOutputToShuttlePort(placed.I_P1, shuttle, 0);

      connectOutputToInput(placed.C_M1, placed.C_S1, 0);
      connectOutputToInput(placed.C_S1, placed.C_P1, 0);
      connectOutputToShuttlePort(placed.C_P1, shuttle, 1);

      connectOutputToInput(placed.I_M2, placed.I_S2, 0);
      connectOutputToInput(placed.I_S2, placed.I_P2, 1);
      connectOutputToInput(placed.I_M3, placed.I_S3, 0);
      connectOutputToInput(placed.I_M4, placed.I_S4, 0);
      connectOutputToInput(placed.I_S4, placed.I_P4, 1);

      connectOutputToInput(placed.C_M2, placed.C_S2, 0);
      connectOutputToInput(placed.C_S2, placed.C_P2, 0);
      connectOutputToInput(placed.C_M3, placed.C_S3, 0);
      connectOutputToInput(placed.C_S3, placed.C_P3, 0);
      connectOutputToInput(placed.C_M4, placed.C_S4, 0);

      connectOutputToInput(placed.I_S3, placed.A_MOD, 1);
      connectOutputToInput(placed.I_P2, placed.A_MOD, 0);
      connectOutputToInput(placed.I_P4, placed.A_SHIP, 1);
      connectOutputToInput(placed.C_P2, placed.A_SHIP, 0);
      connectOutputToInput(placed.C_S4, placed.A_WIRE, 0);
      connectOutputToInput(placed.C_P3, placed.A_WIRE, 1);
      connectOutputToInput(placed.A_MOD, placed.A_ELEC, 0);
      connectOutputToInput(placed.A_WIRE, placed.A_ELEC, 1);

      updateConnections(state.entities);

      const validation = validateRestrictedLateGameSkip(state, shuttle);
      if (!validation.ok) {
        throw new Error(validation.reason || "Validation failed.");
      }

      showDevSkipFeedback("Late-game dev skip applied.");
      console.log("Restricted late-game skip success:", {
        placedEntities: Object.keys(placed).length,
        incoming: validation.incoming,
        activeOutputs: validation.activeOutputs
      });
      return true;
    } catch (error) {
      restoreRestrictedSkipSnapshot(state, snapshot);
      updateConnections(state.entities);
      const message = error && error.message ? error.message : "Unknown skip error.";
      showDevSkipFeedback(`Dev skip failed: ${message}`);
      console.error("Restricted late-game skip failed:", error);
      return false;
    }
  }

  return {
    applyRestrictedLateGameSkip
  };
})();
