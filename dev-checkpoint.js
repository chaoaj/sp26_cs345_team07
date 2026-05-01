// dev-checkpoint.js
// Restricted-mode developer checkpoint spawner.

(function initDevCheckpoint(globalScope) {
  "use strict";

  const CARDINAL_NEIGHBORS = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 }
  ];

  function inGameRestrictedState() {
    if (typeof drawGame === "undefined" || !drawGame.state) {
      return false;
    }
    return !!drawGame.state.isRestrictedMode;
  }

  function getStateOrThrow() {
    if (typeof drawGame === "undefined" || !drawGame.state) {
      throw new Error("Game state is not initialized.");
    }
    return drawGame.state;
  }

  function getRecipeOrThrow(outputType) {
    if (typeof CONSTRUCTOR_RECIPES === "undefined" || !Array.isArray(CONSTRUCTOR_RECIPES)) {
      throw new Error("CONSTRUCTOR_RECIPES is unavailable.");
    }

    const recipe = CONSTRUCTOR_RECIPES.find(
      (entry) => entry && entry.output && entry.output.type === outputType
    );
    if (!recipe) {
      throw new Error(`Missing constructor recipe for ${String(outputType)}`);
    }
    return recipe;
  }

  function getRecipeInputCountOrThrow(outputType, inputType) {
    const recipe = getRecipeOrThrow(outputType);
    const ingredient = (recipe.inputs || []).find((entry) => entry && entry.type === inputType);
    if (!ingredient) {
      throw new Error(
        `Missing input ${String(inputType)} in recipe for ${String(outputType)}`
      );
    }
    const count = Number(ingredient.count);
    if (!Number.isFinite(count) || count <= 0) {
      throw new Error(`Invalid recipe input count for ${String(outputType)} -> ${String(inputType)}`);
    }
    return count;
  }

  function normalizeDirection(dx, dy) {
    const nx = Math.sign(dx);
    const ny = Math.sign(dy);
    if (nx !== 0 && ny !== 0) {
      throw new Error(`Diagonal direction is unsupported: (${dx}, ${dy})`);
    }
    if (nx === 0 && ny === 0) {
      throw new Error("Zero direction is unsupported.");
    }
    return { x: nx, y: ny };
  }

  function directionBetween(fromX, fromY, toX, toY) {
    return normalizeDirection(toX - fromX, toY - fromY);
  }

  function getFootprintTilesAt(entityOrType, tileX, tileY, facing = "E", options = null) {
    const entityType = (entityOrType && typeof entityOrType === "object")
      ? entityOrType.type
      : entityOrType;
    const resolvedFacing = (entityOrType && typeof entityOrType === "object")
      ? (entityOrType.state && entityOrType.state.facing) || facing
      : facing;
    const resolvedOptions = (entityOrType && typeof entityOrType === "object")
      ? (entityOrType.state || options)
      : options;

    if (typeof getSafeFootprintTilesAt === "function") {
      return getSafeFootprintTilesAt(
        entityType,
        tileX,
        tileY,
        resolvedFacing,
        resolvedOptions
      );
    }
    if (typeof getSafeFootprintOffsets === "function") {
      return getSafeFootprintOffsets(entityType, resolvedFacing, resolvedOptions).map((offset) => ({
        x: tileX + offset.x,
        y: tileY + offset.y
      }));
    }
    if (typeof getEntityFootprintTilesAt === "function") {
      return getEntityFootprintTilesAt(entityType, tileX, tileY);
    }
    return [{ x: tileX, y: tileY }];
  }

  function isInsideMap(state, x, y) {
    const rows = state.map && state.map.tiles ? state.map.tiles.length : 0;
    const cols = rows > 0 && Array.isArray(state.map.tiles[0]) ? state.map.tiles[0].length : 0;
    return x >= 0 && y >= 0 && x < cols && y < rows;
  }

  function tileAt(state, x, y) {
    return state.map.tiles[y] && state.map.tiles[y][x];
  }

  function clearTileOccupancy(tile) {
    tile.entityId = null;
    tile.entity = null;
    tile.item = null;
    tile.colorOverride = null;
    tile.building = null;
  }

  function clearNonShuttleEntities(state, shuttleId, additionalPreserveIds = null) {
    const preserveIds = new Set();
    if (shuttleId != null) {
      preserveIds.add(shuttleId);
    }
    if (additionalPreserveIds && typeof additionalPreserveIds[Symbol.iterator] === "function") {
      for (const value of additionalPreserveIds) {
        const id = Number(value);
        if (Number.isFinite(id)) {
          preserveIds.add(id);
        }
      }
    }

    const rows = state.map.tiles.length;
    const cols = rows > 0 ? state.map.tiles[0].length : 0;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const tile = state.map.tiles[y][x];
        if (tile.entityId != null && preserveIds.has(tile.entityId)) {
          if (tile.building && !preserveIds.has(tile.building.entityId)) {
            tile.building = null;
          }
          continue;
        }
        clearTileOccupancy(tile);
      }
    }

    state.entities = state.entities.filter((entity) => preserveIds.has(entity.id));
    state.selectedBuilding = null;
  }

  function getEntityPorts(entity, kind) {
    if (typeof getEntityConnectionPorts !== "function") {
      throw new Error("getEntityConnectionPorts is unavailable.");
    }
    const ports = getEntityConnectionPorts(entity);
    const filtered = kind
      ? ports.filter((port) => port.kind === kind)
      : ports.slice();
    filtered.sort((a, b) => {
      if (a.worldY !== b.worldY) return a.worldY - b.worldY;
      if (a.worldX !== b.worldX) return a.worldX - b.worldX;
      const aName = a.name || "";
      const bName = b.name || "";
      return aName.localeCompare(bName);
    });
    return filtered;
  }

  function findPortOrThrow(entity, kind, worldX, worldY) {
    const ports = getEntityPorts(entity, kind);
    const match = ports.find((port) => port.worldX === worldX && port.worldY === worldY);
    if (!match) {
      throw new Error(
        `No ${kind} port at (${worldX}, ${worldY}) for ${String(entity.type)}#${entity.id}`
      );
    }
    return match;
  }

  function findPortByIndexOrThrow(entity, kind, index) {
    const ports = getEntityPorts(entity, kind);
    if (index < 0 || index >= ports.length) {
      throw new Error(
        `Port index out of range for ${String(entity.type)}#${entity.id}: ${kind}[${index}]`
      );
    }
    return ports[index];
  }

  function stampEntityOnMap(state, entity, buildingName) {
    const footprint = getFootprintTilesAt(entity, entity.tileX, entity.tileY);
    for (const tilePos of footprint) {
      if (!isInsideMap(state, tilePos.x, tilePos.y)) {
        throw new Error(
          `Footprint out of bounds for ${String(entity.type)} at (${entity.tileX}, ${entity.tileY})`
        );
      }
      const tile = tileAt(state, tilePos.x, tilePos.y);
      if (tile.entityId != null) {
        throw new Error(
          `Tile already occupied at (${tilePos.x}, ${tilePos.y}) while placing ${String(entity.type)}`
        );
      }
    }

    for (const tilePos of footprint) {
      const tile = tileAt(state, tilePos.x, tilePos.y);
      tile.entityId = entity.id;
      tile.entity = entity;
      tile.item = entity.type;
      tile.colorOverride = null;
    }

    const anchor = tileAt(state, entity.tileX, entity.tileY);
    if (anchor) {
      const color = typeof getEntityFillRgb === "function"
        ? getEntityFillRgb(entity.type)
        : [190, 190, 190];
      const label = typeof getEntityShortLabel === "function"
        ? getEntityShortLabel(entity.type)
        : String(entity.type || "?").slice(0, 2).toUpperCase();
      anchor.building = {
        color: color.slice(),
        label,
        name: buildingName || label,
        entityType: entity.type,
        facing: entity.state && entity.state.facing ? entity.state.facing : "E",
        entityId: entity.id
      };
    }
  }

  function placeEntityOrThrow(state, type, tileX, tileY, config) {
    if (typeof createEntity !== "function") {
      throw new Error("createEntity is unavailable.");
    }
    const options = (config && config.options) || {};
    const facing = (config && config.facing) || "E";
    const buildingName = (config && config.name) || String(type);

    const entity = createEntity(type, tileX, tileY, options);
    if (!entity || !entity.state) {
      throw new Error(`Failed to create entity ${String(type)} at (${tileX}, ${tileY})`);
    }
    entity.state.facing = facing;

    stampEntityOnMap(state, entity, buildingName);
    state.entities.push(entity);
    return entity;
  }

  function isWalkableForTube(state, x, y, allowStart, allowEnd) {
    if (!isInsideMap(state, x, y)) {
      return false;
    }
    if (allowStart || allowEnd) {
      return true;
    }
    const tile = tileAt(state, x, y);
    return tile.entityId == null;
  }

  function findTubePathOrThrow(state, start, end) {
    const startKey = `${start.x},${start.y}`;
    const endKey = `${end.x},${end.y}`;

    if (!isInsideMap(state, start.x, start.y) || !isInsideMap(state, end.x, end.y)) {
      throw new Error("Tube path endpoints are out of map bounds.");
    }

    if (start.x === end.x && start.y === end.y) {
      const tile = tileAt(state, start.x, start.y);
      if (tile.entityId != null) {
        throw new Error(`Single-tile tube endpoint is occupied at (${start.x}, ${start.y})`);
      }
      return [{ x: start.x, y: start.y }];
    }

    const queue = [{ x: start.x, y: start.y }];
    const seen = new Set([startKey]);
    const previous = new Map();

    while (queue.length > 0) {
      const current = queue.shift();
      const currentKey = `${current.x},${current.y}`;
      if (currentKey === endKey) {
        break;
      }

      for (const step of CARDINAL_NEIGHBORS) {
        const nx = current.x + step.x;
        const ny = current.y + step.y;
        const key = `${nx},${ny}`;
        if (seen.has(key)) {
          continue;
        }
        const allowStart = key === startKey;
        const allowEnd = key === endKey;
        if (!isWalkableForTube(state, nx, ny, allowStart, allowEnd)) {
          continue;
        }
        seen.add(key);
        previous.set(key, currentKey);
        queue.push({ x: nx, y: ny });
      }
    }

    if (!seen.has(endKey)) {
      throw new Error(`No tube path found from (${start.x}, ${start.y}) to (${end.x}, ${end.y})`);
    }

    const path = [];
    let cursor = endKey;
    while (cursor) {
      const parts = cursor.split(",");
      path.push({ x: Number(parts[0]), y: Number(parts[1]) });
      cursor = previous.get(cursor);
    }
    path.reverse();
    return path;
  }

  function setMatchesDirectionPair(offsetA, offsetB, dirA, dirB) {
    const a = `${offsetA.x},${offsetA.y}`;
    const b = `${offsetB.x},${offsetB.y}`;
    const d1 = `${dirA.x},${dirA.y}`;
    const d2 = `${dirB.x},${dirB.y}`;
    return (a === d1 && b === d2) || (a === d2 && b === d1);
  }

  function getTubeConfigForDirectionsOrThrow(dirA, dirB) {
    if (typeof rotateOffsetFromEast !== "function" || typeof TUBE_PORT_DEFS === "undefined") {
      throw new Error("Tube orientation helpers are unavailable.");
    }

    const facings = ["E", "S", "W", "N"];
    const shapes = [TUBE_SHAPES.STRAIGHT, TUBE_SHAPES.CORNER];
    for (const shape of shapes) {
      const def = TUBE_PORT_DEFS[shape];
      for (const facing of facings) {
        const inputOffset = rotateOffsetFromEast(def.input, facing);
        const outputOffset = rotateOffsetFromEast(def.output, facing);
        if (setMatchesDirectionPair(inputOffset, outputOffset, dirA, dirB)) {
          return { shape, facing };
        }
      }
    }

    throw new Error(
      `Unable to orient tube for directions (${dirA.x},${dirA.y}) and (${dirB.x},${dirB.y})`
    );
  }

  function placeTubePathBetweenPortsOrThrow(state, sourceEntity, sourcePort, sinkEntity, sinkPort) {
    const start = { x: sourcePort.worldX, y: sourcePort.worldY };
    const end = { x: sinkPort.worldX, y: sinkPort.worldY };

    const path = findTubePathOrThrow(state, start, end);
    const lastIndex = path.length - 1;

    for (let i = 0; i < path.length; i++) {
      const current = path[i];

      let dirOne;
      let dirTwo;

      if (i === 0) {
        dirOne = directionBetween(current.x, current.y, sourceEntity.tileX, sourceEntity.tileY);
        dirTwo = (path.length === 1)
          ? directionBetween(current.x, current.y, sinkEntity.tileX, sinkEntity.tileY)
          : directionBetween(current.x, current.y, path[i + 1].x, path[i + 1].y);
      } else if (i === lastIndex) {
        dirOne = directionBetween(current.x, current.y, path[i - 1].x, path[i - 1].y);
        dirTwo = directionBetween(current.x, current.y, sinkEntity.tileX, sinkEntity.tileY);
      } else {
        dirOne = directionBetween(current.x, current.y, path[i - 1].x, path[i - 1].y);
        dirTwo = directionBetween(current.x, current.y, path[i + 1].x, path[i + 1].y);
      }

      const tubeConfig = getTubeConfigForDirectionsOrThrow(dirOne, dirTwo);
      placeEntityOrThrow(state, ENTITY_TYPES.TUBE, current.x, current.y, {
        facing: tubeConfig.facing,
        options: { shape: tubeConfig.shape, facing: tubeConfig.facing },
        name: "Tube"
      });
    }
  }

  function connectEntitiesByPortIndexOrThrow(
    state,
    sourceEntity,
    sourceKind,
    sourceIndex,
    sinkEntity,
    sinkKind,
    sinkIndex
  ) {
    const sourcePort = findPortByIndexOrThrow(sourceEntity, sourceKind, sourceIndex);
    const sinkPort = findPortByIndexOrThrow(sinkEntity, sinkKind, sinkIndex);
    placeTubePathBetweenPortsOrThrow(state, sourceEntity, sourcePort, sinkEntity, sinkPort);
  }

  function connectEntitiesByPortCoordinateOrThrow(
    state,
    sourceEntity,
    sourceKind,
    sourcePortX,
    sourcePortY,
    sinkEntity,
    sinkKind,
    sinkPortX,
    sinkPortY
  ) {
    const sourcePort = findPortOrThrow(sourceEntity, sourceKind, sourcePortX, sourcePortY);
    const sinkPort = findPortOrThrow(sinkEntity, sinkKind, sinkPortX, sinkPortY);
    placeTubePathBetweenPortsOrThrow(state, sourceEntity, sourcePort, sinkEntity, sinkPort);
  }

  function ensureMineableNodeOrThrow(state, x, y) {
    const tile = tileAt(state, x, y);
    if (!tile) {
      throw new Error(`Missing tile at (${x}, ${y})`);
    }
    if (typeof isMineableTile === "function" && isMineableTile(tile.type)) {
      return;
    }
    throw new Error(`Tile (${x}, ${y}) is not a mineable node (type=${String(tile.type)})`);
  }

  function inferNodeResourceOrThrow(state, x, y) {
    const tile = tileAt(state, x, y);
    if (!tile) {
      throw new Error(`Missing tile at (${x}, ${y})`);
    }
    if (typeof getResourceTypeForTile === "function") {
      const value = getResourceTypeForTile(tile);
      if (value) return value;
    }
    if (typeof getResourceForTileType === "function") {
      const value = getResourceForTileType(tile.type);
      if (value) return value;
    }
    if (tile.resource) {
      return tile.resource;
    }
    throw new Error(`Unable to infer resource type for node at (${x}, ${y})`);
  }

  function configureDebugMinerOutput(entity, outputType, outputRate) {
    if (!entity || entity.type !== ENTITY_TYPES.MINER || !entity.state) {
      throw new Error("configureDebugMinerOutput expects a miner entity.");
    }

    entity.state.isOn = true;
    entity.state.isActive = true;
    entity.state.isBroken = false;
    entity.state.outputType = outputType;
    entity.state.outputRate = outputRate;
    entity.state.harvestAccumulator = 0;
  }

  function findExistingShuttleEntity(state) {
    if (!state || !Array.isArray(state.entities)) {
      return null;
    }
    if (state.shuttleEntityId != null) {
      const byId = state.entities.find((entity) => entity.id === state.shuttleEntityId);
      if (byId && byId.type === ENTITY_TYPES.SHUTTLE) {
        return byId;
      }
    }
    return state.entities.find((entity) => entity.type === ENTITY_TYPES.SHUTTLE) || null;
  }

  function findExistingRocketSiteEntity(state) {
    if (!state || !Array.isArray(state.entities)) {
      return null;
    }
    return state.entities.find((entity) => entity.type === ENTITY_TYPES.ROCKET_SITE) || null;
  }

  function getRestrictedCheckpointPreserveIds(state, shuttle) {
    const ids = new Set();
    if (shuttle && shuttle.id != null) {
      ids.add(shuttle.id);
    }
    const rocket = findExistingRocketSiteEntity(state);
    if (rocket && rocket.id != null) {
      ids.add(rocket.id);
    }
    return ids;
  }

  function ensureShuttleOrThrow(state) {
    let shuttle = findExistingShuttleEntity(state);
    if (!shuttle && typeof spawnRestrictedModeShuttle === "function") {
      spawnRestrictedModeShuttle(state);
      shuttle = findExistingShuttleEntity(state);
    }
    if (!shuttle) {
      throw new Error("Restricted shuttle entity is missing.");
    }
    state.shuttleEntityId = shuttle.id;
    return shuttle;
  }

  function restoreShuttleFootprintOnMap(state, shuttle) {
    if (!state || !shuttle) {
      return;
    }

    const facing = (shuttle.state && shuttle.state.facing) || "E";
    const footprint = getFootprintTilesAt(
      shuttle,
      shuttle.tileX,
      shuttle.tileY,
      facing,
      shuttle.state
    );

    for (const tilePos of footprint) {
      if (!isInsideMap(state, tilePos.x, tilePos.y)) {
        continue;
      }
      const tile = tileAt(state, tilePos.x, tilePos.y);
      if (!tile) {
        continue;
      }
      if (tile.entityId != null && tile.entityId !== shuttle.id) {
        continue;
      }
      tile.entityId = shuttle.id;
      tile.entity = shuttle;
      tile.item = ENTITY_TYPES.SHUTTLE;
      tile.colorOverride = null;
    }

    const anchor = tileAt(state, shuttle.tileX, shuttle.tileY);
    if (anchor) {
      const color = typeof getEntityFillRgb === "function"
        ? getEntityFillRgb(ENTITY_TYPES.SHUTTLE)
        : [230, 230, 120];
      const label = typeof getEntityShortLabel === "function"
        ? getEntityShortLabel(ENTITY_TYPES.SHUTTLE)
        : "SH";
      anchor.building = {
        color: color.slice(),
        label,
        name: "Crashed Shuttle",
        entityType: ENTITY_TYPES.SHUTTLE,
        facing,
        entityId: shuttle.id
      };
    }

    state.shuttleEntityId = shuttle.id;
  }

  function stabilizeConnections(state, passes = 4) {
    if (typeof updateConnections !== "function" || !state || !Array.isArray(state.entities)) {
      return;
    }
    const totalPasses = Math.max(1, Number.isFinite(passes) ? Math.floor(passes) : 1);
    for (let i = 0; i < totalPasses; i++) {
      updateConnections(state.entities);
    }
  }

  function parseAtCoordinate(value) {
    if (typeof value !== "string") return null;
    const parts = value.split(",");
    if (parts.length !== 2) return null;
    const x = Number(parts[0]);
    const y = Number(parts[1]);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
    return { x, y };
  }

  function getSnapshotArray(snapshot, key) {
    const value = snapshot && snapshot[key];
    return Array.isArray(value) ? value : [];
  }

  function getPortsForEntityTypeAtFacing(entityType, tileX, tileY, facing) {
    if (typeof ENTITY_PORT_DEFS === "undefined") {
      return [];
    }
    const defs = ENTITY_PORT_DEFS[entityType];
    if (!Array.isArray(defs)) {
      return [];
    }
    return defs.map((port) => {
      const rotated = typeof rotateOffsetFromEast === "function"
        ? rotateOffsetFromEast(port.offset, facing || "E")
        : port.offset;
      return {
        ...port,
        worldX: tileX + rotated.x,
        worldY: tileY + rotated.y
      };
    });
  }

  function inferFacingFromSnapshot(entityType, tileX, tileY, tubeCoordSet) {
    const facings = ["E", "S", "W", "N"];
    let bestFacing = "E";
    let bestScore = -1;

    for (const facing of facings) {
      const ports = getPortsForEntityTypeAtFacing(entityType, tileX, tileY, facing);
      if (!ports.length) {
        continue;
      }
      let inputMatches = 0;
      let outputMatches = 0;
      let totalMatches = 0;
      for (const port of ports) {
        const key = `${port.worldX},${port.worldY}`;
        if (!tubeCoordSet.has(key)) {
          continue;
        }
        totalMatches += 1;
        if (port.kind === "input") {
          inputMatches += 1;
        } else if (port.kind === "output") {
          outputMatches += 1;
        } else if (port.kind === "both") {
          inputMatches += 1;
          outputMatches += 1;
        }
      }
      const score = totalMatches * 10 + Math.min(1, inputMatches) * 3 + Math.min(1, outputMatches) * 3;
      if (score > bestScore) {
        bestScore = score;
        bestFacing = facing;
      }
    }

    return bestFacing;
  }

  function uniqueFacings(candidates) {
    const result = [];
    const seen = new Set();
    for (const facing of candidates) {
      const value = typeof facing === "string" && facing ? facing : "E";
      if (seen.has(value)) continue;
      seen.add(value);
      result.push(value);
    }
    return result;
  }

  function placeEntityWithFacingFallbackOrThrow(state, entityType, tileX, tileY, options, facingCandidates, name) {
    const candidates = uniqueFacings(facingCandidates);
    let lastError = null;
    for (const facing of candidates) {
      try {
        return placeEntityOrThrow(state, entityType, tileX, tileY, {
          facing,
          options,
          name
        });
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError || new Error(`Failed to place ${String(entityType)} at (${tileX}, ${tileY})`);
  }

  function getLatestDebugSnapshot() {
    const candidate = globalScope.__devCheckpointSnapshot || globalScope.__lastConnectionDebug;
    if (!candidate || typeof candidate !== "object") {
      return null;
    }
    return candidate;
  }

  function collectTubeSet(tubeEntries) {
    const set = new Set();
    for (const entry of tubeEntries) {
      const at = parseAtCoordinate(entry && entry.at);
      if (!at) continue;
      set.add(`${at.x},${at.y}`);
    }
    return set;
  }

  function collectTubeNeighborDirections(tubeCoordSet, x, y) {
    const dirs = [];
    for (const step of CARDINAL_NEIGHBORS) {
      const key = `${x + step.x},${y + step.y}`;
      if (tubeCoordSet.has(key)) {
        dirs.push({ x: step.x, y: step.y });
      }
    }
    return dirs;
  }

  function normalizeCardinalFacing(value) {
    if (typeof value !== "string") return null;
    const normalized = value.trim().toUpperCase();
    return (normalized === "E" || normalized === "S" || normalized === "W" || normalized === "N")
      ? normalized
      : null;
  }

  function normalizeTubeShape(value) {
    if (typeof value !== "string") return null;
    const normalized = value.trim().toLowerCase();
    if (normalized === TUBE_SHAPES.STRAIGHT) return TUBE_SHAPES.STRAIGHT;
    if (normalized === TUBE_SHAPES.CORNER) return TUBE_SHAPES.CORNER;
    return null;
  }

  function inferStraightTubeAxis(neighborDirs, dirA, dirB) {
    const dirs = [];
    if (Array.isArray(neighborDirs)) {
      dirs.push(...neighborDirs);
    }
    if (dirA) dirs.push(dirA);
    if (dirB) dirs.push(dirB);

    let hasHorizontal = false;
    let hasVertical = false;
    for (const dir of dirs) {
      if (!dir) continue;
      if (dir.x !== 0) hasHorizontal = true;
      if (dir.y !== 0) hasVertical = true;
    }

    if (hasVertical && !hasHorizontal) return "vertical";
    if (hasHorizontal && !hasVertical) return "horizontal";
    return null;
  }

  function normalizeStraightTubeFacingForAxis(facing, axis) {
    const dir = normalizeCardinalFacing(facing) || "E";
    if (axis === "vertical") {
      return (dir === "E" || dir === "W") ? dir : "E";
    }
    if (axis === "horizontal") {
      return (dir === "N" || dir === "S") ? dir : "S";
    }
    return dir;
  }

  function addUniqueDir(list, dir, seen) {
    if (!dir || !Number.isFinite(dir.x) || !Number.isFinite(dir.y)) {
      return;
    }
    const key = `${dir.x},${dir.y}`;
    if (seen.has(key)) return;
    seen.add(key);
    list.push({ x: dir.x, y: dir.y });
  }

  function pickTubeDirectionPair(entityDirs, neighborDirs) {
    const unique = [];
    const seen = new Set();
    for (const dir of entityDirs) addUniqueDir(unique, dir, seen);
    for (const dir of neighborDirs) addUniqueDir(unique, dir, seen);

    if (entityDirs.length > 0 && neighborDirs.length > 0) {
      for (const first of entityDirs) {
        for (const second of neighborDirs) {
          if (first.x === second.x && first.y === second.y) continue;
          return [first, second];
        }
      }
    }

    if (unique.length >= 2) {
      for (let i = 0; i < unique.length; i++) {
        for (let j = i + 1; j < unique.length; j++) {
          const a = unique[i];
          const b = unique[j];
          if (a.x === -b.x && a.y === -b.y) {
            return [a, b];
          }
        }
      }
      return [unique[0], unique[1]];
    }

    if (unique.length === 1) {
      const first = unique[0];
      return [first, { x: -first.x, y: -first.y }];
    }

    return [{ x: 0, y: -1 }, { x: 0, y: 1 }];
  }

  function buildRestrictedCheckpointFromSnapshotOrThrow(state, snapshot) {
    const shuttle = ensureShuttleOrThrow(state);
    const preserveIds = getRestrictedCheckpointPreserveIds(state, shuttle);
    clearNonShuttleEntities(state, shuttle.id, preserveIds);
    restoreShuttleFootprintOnMap(state, shuttle);

    const tubeEntries = getSnapshotArray(snapshot, "tubes");
    const tubeCoordSet = collectTubeSet(tubeEntries);

    const buildSpecs = [
      { key: "miners", type: ENTITY_TYPES.MINER, name: "Miner" },
      { key: "smelters", type: ENTITY_TYPES.SMELTER, name: "Smelter" },
      { key: "constructors", type: ENTITY_TYPES.CONSTRUCTOR, name: "Constructor" },
      { key: "splitters", type: ENTITY_TYPES.SPLITTER, name: "Splitter" },
      { key: "mergers", type: ENTITY_TYPES.MERGER, name: "Merger" }
    ];

    const entityByDebugId = new Map();
    entityByDebugId.set(1, shuttle);
    entityByDebugId.set(shuttle.id, shuttle);
    const buildingWarnings = [];

    for (const spec of buildSpecs) {
      const entries = getSnapshotArray(snapshot, spec.key)
        .slice()
        .sort((a, b) => (Number(a?.id) || 0) - (Number(b?.id) || 0));
      for (const entry of entries) {
        const at = parseAtCoordinate(entry && entry.at);
        if (!at) {
          buildingWarnings.push(`Skipped ${spec.key} entry with invalid at: ${JSON.stringify(entry)}`);
          continue;
        }

        const inferredFacing = inferFacingFromSnapshot(spec.type, at.x, at.y, tubeCoordSet);
        const preferredFacing = (entry && typeof entry.facing === "string" && entry.facing) || inferredFacing;
        const facingCandidates = [preferredFacing, inferredFacing, "E", "S", "W", "N"];
        const options = {};

        if (spec.type === ENTITY_TYPES.MINER) {
          let inferredResource = null;
          try {
            inferredResource = inferNodeResourceOrThrow(state, at.x, at.y);
          } catch (_ignore) {
            inferredResource = null;
          }
          options.resourceType = (entry && entry.outputType) || inferredResource || RESOURCE_TYPES.IRON_ORE;
          options.isOnResourceNode = true;
        }

        try {
          const placed = placeEntityWithFacingFallbackOrThrow(
            state,
            spec.type,
            at.x,
            at.y,
            options,
            facingCandidates,
            spec.name
          );

          if (entry && entry.id != null) {
            entityByDebugId.set(Number(entry.id), placed);
          }

          if (spec.type === ENTITY_TYPES.MINER && placed.state) {
            if (entry && entry.outputType) {
              placed.state.outputType = entry.outputType;
            }
            if (Number.isFinite(entry && entry.outputRate)) {
              placed.state.outputRate = Number(entry.outputRate);
            }
            if (typeof entry?.isOn === "boolean") {
              placed.state.isOn = entry.isOn;
            }
            if (typeof entry?.isActive === "boolean") {
              placed.state.isActive = entry.isActive;
            }
          }
        } catch (error) {
          buildingWarnings.push(
            `Failed placing ${spec.type} at (${at.x}, ${at.y}): ${error && error.message ? error.message : String(error)}`
          );
        }
      }
    }

    const tubeWarnings = [];
    const sortedTubes = tubeEntries
      .slice()
      .sort((a, b) => (Number(a?.id) || 0) - (Number(b?.id) || 0));

    for (const entry of sortedTubes) {
      const at = parseAtCoordinate(entry && entry.at);
      if (!at) {
        tubeWarnings.push(`Skipped tube entry with invalid at: ${JSON.stringify(entry)}`);
        continue;
      }

      const neighborDirs = collectTubeNeighborDirections(tubeCoordSet, at.x, at.y);
      const entityDirs = [];
      for (const id of [entry && entry.from, entry && entry.to]) {
        if (id == null) continue;
        const mapped = entityByDebugId.get(Number(id));
        if (!mapped) continue;
        try {
          entityDirs.push(directionBetween(at.x, at.y, mapped.tileX, mapped.tileY));
        } catch (_ignore) {
          // ignore invalid direction for this reference
        }
      }

      const snapshotFacing = normalizeCardinalFacing(entry && entry.facing);
      const snapshotShape = normalizeTubeShape(entry && entry.shape);

      const [dirA, dirB] = pickTubeDirectionPair(entityDirs, neighborDirs);
      let tubeConfig = null;
      try {
        tubeConfig = getTubeConfigForDirectionsOrThrow(dirA, dirB);
      } catch (_ignore) {
        tubeConfig = {
          shape: TUBE_SHAPES.STRAIGHT,
          facing: Math.abs(dirA.x) > 0 ? "S" : "E"
        };
      }

      if (snapshotShape) {
        tubeConfig.shape = snapshotShape;
      }
      if (snapshotFacing) {
        tubeConfig.facing = snapshotFacing;
      }

      if (tubeConfig.shape === TUBE_SHAPES.STRAIGHT && !snapshotFacing) {
        const axis = inferStraightTubeAxis(neighborDirs, dirA, dirB);
        tubeConfig.facing = normalizeStraightTubeFacingForAxis(tubeConfig.facing, axis);
      }

      try {
        const tube = placeEntityOrThrow(state, ENTITY_TYPES.TUBE, at.x, at.y, {
          facing: tubeConfig.facing,
          options: { shape: tubeConfig.shape, facing: tubeConfig.facing },
          name: "Tube"
        });
        if (entry && entry.id != null) {
          entityByDebugId.set(Number(entry.id), tube);
        }
      } catch (error) {
        tubeWarnings.push(
          `Failed placing tube at (${at.x}, ${at.y}): ${error && error.message ? error.message : String(error)}`
        );
      }
    }

    stabilizeConnections(state, 4);
    restoreShuttleFootprintOnMap(state, shuttle);

    if (buildingWarnings.length > 0 || tubeWarnings.length > 0) {
      console.warn("DevCheckpoint snapshot placement warnings:", {
        buildingWarnings,
        tubeWarnings
      });
    }
  }

  function buildRestrictedLateGameCheckpointOrThrow(state) {
    const ironPlateBarCount = getRecipeInputCountOrThrow(
      RESOURCE_TYPES.IRON_PLATE,
      RESOURCE_TYPES.IRON_BAR
    );
    const copperPlateBarCount = getRecipeInputCountOrThrow(
      RESOURCE_TYPES.COPPER_PLATE,
      RESOURCE_TYPES.COPPER_BAR
    );
    const electronicsWireCount = getRecipeInputCountOrThrow(
      RESOURCE_TYPES.ELECTRONICS,
      RESOURCE_TYPES.COPPER_WIRE
    );
    const electronicsModularCount = getRecipeInputCountOrThrow(
      RESOURCE_TYPES.ELECTRONICS,
      RESOURCE_TYPES.MODULAR_COMPONENT
    );
    const shipAlloyCopperPlateCount = getRecipeInputCountOrThrow(
      RESOURCE_TYPES.SHIP_ALLOY,
      RESOURCE_TYPES.COPPER_PLATE
    );
    const shipAlloyIronPlateCount = getRecipeInputCountOrThrow(
      RESOURCE_TYPES.SHIP_ALLOY,
      RESOURCE_TYPES.IRON_PLATE
    );
    const smelterOrePerBar = 2;

    const shuttle = ensureShuttleOrThrow(state);
    const preserveIds = getRestrictedCheckpointPreserveIds(state, shuttle);
    clearNonShuttleEntities(state, shuttle.id, preserveIds);

    // Real ore->bar lines into the shuttle.
    ensureMineableNodeOrThrow(state, 18, 10);
    ensureMineableNodeOrThrow(state, 31, 10);

    const ironMiner = placeEntityOrThrow(state, ENTITY_TYPES.MINER, 18, 10, {
      facing: "E",
      options: {
        resourceType: inferNodeResourceOrThrow(state, 18, 10),
        isOnResourceNode: true
      },
      name: "Iron Miner"
    });
    const ironSmelter = placeEntityOrThrow(state, ENTITY_TYPES.SMELTER, 20, 10, {
      facing: "E",
      name: "Iron Smelter"
    });
    connectEntitiesByPortIndexOrThrow(state, ironMiner, "output", 0, ironSmelter, "input", 0);
    connectEntitiesByPortCoordinateOrThrow(
      state,
      ironSmelter,
      "output",
      21,
      10,
      shuttle,
      "input",
      23,
      6
    );

    const copperMiner = placeEntityOrThrow(state, ENTITY_TYPES.MINER, 31, 10, {
      facing: "W",
      options: {
        resourceType: inferNodeResourceOrThrow(state, 31, 10),
        isOnResourceNode: true
      },
      name: "Copper Miner"
    });
    const copperSmelter = placeEntityOrThrow(state, ENTITY_TYPES.SMELTER, 29, 10, {
      facing: "W",
      name: "Copper Smelter"
    });
    connectEntitiesByPortIndexOrThrow(state, copperMiner, "output", 0, copperSmelter, "input", 0);
    connectEntitiesByPortCoordinateOrThrow(
      state,
      copperSmelter,
      "output",
      28,
      10,
      shuttle,
      "input",
      27,
      6
    );

    // Debug miner source nodes for plate/electronics/ship-alloy recipe-rate feeds.
    ensureMineableNodeOrThrow(state, 13, 24); // iron
    ensureMineableNodeOrThrow(state, 16, 24); // iron
    ensureMineableNodeOrThrow(state, 17, 24); // iron
    ensureMineableNodeOrThrow(state, 33, 24); // copper
    ensureMineableNodeOrThrow(state, 34, 24); // copper
    ensureMineableNodeOrThrow(state, 37, 24); // copper

    const ironBarPlateFeed = placeEntityOrThrow(state, ENTITY_TYPES.MINER, 13, 24, {
      facing: "S",
      options: {
        resourceType: inferNodeResourceOrThrow(state, 13, 24),
        isOnResourceNode: true
      },
      name: "Iron Bar Feed"
    });
    configureDebugMinerOutput(ironBarPlateFeed, RESOURCE_TYPES.IRON_BAR, ironPlateBarCount);

    const copperBarPlateFeed = placeEntityOrThrow(state, ENTITY_TYPES.MINER, 37, 24, {
      facing: "S",
      options: {
        resourceType: inferNodeResourceOrThrow(state, 37, 24),
        isOnResourceNode: true
      },
      name: "Copper Bar Feed"
    });
    configureDebugMinerOutput(copperBarPlateFeed, RESOURCE_TYPES.COPPER_BAR, copperPlateBarCount);

    const modularFeed = placeEntityOrThrow(state, ENTITY_TYPES.MINER, 17, 24, {
      facing: "S",
      options: {
        resourceType: inferNodeResourceOrThrow(state, 17, 24),
        isOnResourceNode: true
      },
      name: "Modular Feed"
    });
    configureDebugMinerOutput(modularFeed, RESOURCE_TYPES.MODULAR_COMPONENT, electronicsModularCount);

    const wireFeed = placeEntityOrThrow(state, ENTITY_TYPES.MINER, 33, 24, {
      facing: "S",
      options: {
        resourceType: inferNodeResourceOrThrow(state, 33, 24),
        isOnResourceNode: true
      },
      name: "Wire Feed"
    });
    configureDebugMinerOutput(wireFeed, RESOURCE_TYPES.COPPER_WIRE, electronicsWireCount);

    const ironPlateShipFeed = placeEntityOrThrow(state, ENTITY_TYPES.MINER, 16, 24, {
      facing: "S",
      options: {
        resourceType: inferNodeResourceOrThrow(state, 16, 24),
        isOnResourceNode: true
      },
      name: "Iron Plate Feed"
    });
    configureDebugMinerOutput(
      ironPlateShipFeed,
      RESOURCE_TYPES.IRON_PLATE,
      shipAlloyIronPlateCount
    );

    const copperPlateShipFeed = placeEntityOrThrow(state, ENTITY_TYPES.MINER, 34, 24, {
      facing: "S",
      options: {
        resourceType: inferNodeResourceOrThrow(state, 34, 24),
        isOnResourceNode: true
      },
      name: "Copper Plate Feed"
    });
    configureDebugMinerOutput(
      copperPlateShipFeed,
      RESOURCE_TYPES.COPPER_PLATE,
      shipAlloyCopperPlateCount
    );

    // Late-stage outputs.
    const electronicsConstructor = placeEntityOrThrow(state, ENTITY_TYPES.CONSTRUCTOR, 23, 30, {
      facing: "E",
      name: "Electronics Constructor"
    });
    connectEntitiesByPortIndexOrThrow(
      state,
      modularFeed,
      "output",
      0,
      electronicsConstructor,
      "input",
      0
    );
    connectEntitiesByPortIndexOrThrow(
      state,
      wireFeed,
      "output",
      0,
      electronicsConstructor,
      "input",
      1
    );

    const shipAlloyConstructor = placeEntityOrThrow(state, ENTITY_TYPES.CONSTRUCTOR, 27, 30, {
      facing: "W",
      name: "Ship Alloy Constructor"
    });
    connectEntitiesByPortIndexOrThrow(
      state,
      ironPlateShipFeed,
      "output",
      0,
      shipAlloyConstructor,
      "input",
      0
    );
    connectEntitiesByPortIndexOrThrow(
      state,
      copperPlateShipFeed,
      "output",
      0,
      shipAlloyConstructor,
      "input",
      1
    );

    // Plate constructors feeding shuttle (valid 3-bar constructor recipes).
    const ironPlateConstructor = placeEntityOrThrow(state, ENTITY_TYPES.CONSTRUCTOR, 20, 14, {
      facing: "E",
      name: "Iron Plate Constructor"
    });
    connectEntitiesByPortIndexOrThrow(
      state,
      ironBarPlateFeed,
      "output",
      0,
      ironPlateConstructor,
      "input",
      0
    );
    connectEntitiesByPortCoordinateOrThrow(
      state,
      ironPlateConstructor,
      "output",
      21,
      14,
      shuttle,
      "input",
      25,
      8
    );

    const copperPlateConstructor = placeEntityOrThrow(state, ENTITY_TYPES.CONSTRUCTOR, 30, 14, {
      facing: "W",
      name: "Copper Plate Constructor"
    });
    connectEntitiesByPortIndexOrThrow(
      state,
      copperBarPlateFeed,
      "output",
      0,
      copperPlateConstructor,
      "input",
      0
    );
    connectEntitiesByPortCoordinateOrThrow(
      state,
      copperPlateConstructor,
      "output",
      29,
      14,
      shuttle,
      "input",
      25,
      4
    );

    stabilizeConnections(state, 4);

    // Re-assert fixed debug source rates after connection recompute.
    configureDebugMinerOutput(ironBarPlateFeed, RESOURCE_TYPES.IRON_BAR, ironPlateBarCount);
    configureDebugMinerOutput(copperBarPlateFeed, RESOURCE_TYPES.COPPER_BAR, copperPlateBarCount);
    configureDebugMinerOutput(modularFeed, RESOURCE_TYPES.MODULAR_COMPONENT, electronicsModularCount);
    configureDebugMinerOutput(wireFeed, RESOURCE_TYPES.COPPER_WIRE, electronicsWireCount);
    configureDebugMinerOutput(
      ironPlateShipFeed,
      RESOURCE_TYPES.IRON_PLATE,
      shipAlloyIronPlateCount
    );
    configureDebugMinerOutput(
      copperPlateShipFeed,
      RESOURCE_TYPES.COPPER_PLATE,
      shipAlloyCopperPlateCount
    );

    // Smelters should stay at valid per-recipe throughput (2 ore -> 1 bar).
    ironSmelter.state.inputRate = smelterOrePerBar;
    ironSmelter.state.outputRate = 1;
    copperSmelter.state.inputRate = smelterOrePerBar;
    copperSmelter.state.outputRate = 1;
  }

  function applyRestrictedLateGameSkip() {
    try {
      if (!inGameRestrictedState()) {
        console.warn("DevCheckpoint: restricted mode is required.");
        return false;
      }

      const state = getStateOrThrow();
      const snapshot = getLatestDebugSnapshot();
      if (!snapshot) {
        console.warn(
          "DevCheckpoint: no debug snapshot found. " +
          "Run connection debug (P) first, or set globalThis.__devCheckpointSnapshot."
        );
        return false;
      }
      buildRestrictedCheckpointFromSnapshotOrThrow(state, snapshot);
      const shuttle = ensureShuttleOrThrow(state);
      restoreShuttleFootprintOnMap(state, shuttle);
      console.log("DevCheckpoint: snapshot checkpoint applied.");
      return true;
    } catch (error) {
      console.error("DevCheckpoint failed:", error);
      return false;
    }
  }

  globalScope.DevCheckpoint = Object.freeze({
    applyRestrictedLateGameSkip
  });
})(typeof window !== "undefined" ? window : globalThis);
