// dev-checkpoint-snapshot.js
// Source-of-truth snapshot consumed by dev-checkpoint.js.

(function initDevCheckpointSnapshot(globalScope) {
  "use strict";

  const RAW_DEBUG_SNAPSHOT = `
{miners: Array(8), tubes: Array(245), splitters: Array(8), mergers: Array(8), smelters: Array(16), …}
constructors
: 
Array(4)
0
: 
{id: 268, at: '7,15', facing: 'W', inputRate: 3, outputRate: 1, …}
1
: 
{id: 280, at: '26,15', facing: 'E', inputRate: 3, outputRate: 1, …}
2
: 
{id: 518, at: '29,34', facing: 'W', inputRate: 3, outputRate: 1, …}
3
: 
{id: 536, at: '47,34', facing: 'E', inputRate: 3, outputRate: 1, …}
length
: 
4
[[Prototype]]
: 
Array(0)
mergers
: 
Array(8)
0
: 
{id: 267, at: '10,11', facing: 'W', inputRate: 2, outputRate: 2, …}
1
: 
{id: 279, at: '24,13', facing: 'E', inputRate: 2, outputRate: 2, …}
2
: 
{id: 380, at: '34,3', facing: 'N', inputRate: 2, outputRate: 2, …}
3
: 
{id: 403, at: '17,3', facing: 'N', inputRate: 2, outputRate: 2, …}
4
: 
{id: 486, at: '36,16', facing: 'E', inputRate: 2, outputRate: 2, …}
5
: 
{id: 521, at: '31,30', facing: 'W', inputRate: 2, outputRate: 2, …}
6
: 
{id: 533, at: '45,32', facing: 'E', inputRate: 2, outputRate: 2, …}
7
: 
{id: 578, at: '48,25', facing: 'N', inputRate: 2, outputRate: 2, …}
length
: 
8
[[Prototype]]
: 
Array(0)
miners
: 
Array(8)
0
: 
{id: 284, at: '16,10', facing: 'S', inputRate: 0, outputRate: 2, …}
1
: 
{id: 285, at: '18,10', facing: 'S', inputRate: 0, outputRate: 2, …}
2
: 
{id: 298, at: '17,10', facing: 'S', inputRate: 0, outputRate: 2, …}
3
: 
{id: 371, at: '33,9', facing: 'N', inputRate: 0, outputRate: 2, …}
4
: 
{id: 396, at: '16,9', facing: 'N', inputRate: 0, outputRate: 2, …}
5
: 
{id: 500, at: '38,29', facing: 'S', inputRate: 0, outputRate: 2, …}
6
: 
{id: 501, at: '37,29', facing: 'S', inputRate: 0, outputRate: 2, …}
7
: 
{id: 502, at: '39,29', facing: 'S', inputRate: 0, outputRate: 2, …}
length
: 
8
[[Prototype]]
: 
Array(0)
smelters
: 
Array(16)
0
: 
{id: 6, at: '22,11', facing: 'E', inputRate: 1, outputRate: 1, …}
1
: 
{id: 7, at: '22,13', facing: 'E', inputRate: 1, outputRate: 1, …}
2
: 
{id: 10, at: '12,13', facing: 'W', inputRate: 1, outputRate: 1, …}
3
: 
{id: 11, at: '12,11', facing: 'W', inputRate: 1, outputRate: 1, …}
4
: 
{id: 12, at: '33,30', facing: 'W', inputRate: 1, outputRate: 1, …}
5
: 
{id: 13, at: '33,32', facing: 'W', inputRate: 1, outputRate: 1, …}
6
: 
{id: 14, at: '37,34', facing: 'S', inputRate: 1, outputRate: 1, …}
7
: 
{id: 15, at: '39,34', facing: 'S', inputRate: 1, outputRate: 1, …}
8
: 
{id: 16, at: '43,32', facing: 'E', inputRate: 1, outputRate: 1, …}
9
: 
{id: 17, at: '43,30', facing: 'E', inputRate: 1, outputRate: 1, …}
10
: 
{id: 304, at: '16,15', facing: 'S', inputRate: 1, outputRate: 1, …}
11
: 
{id: 305, at: '18,15', facing: 'S', inputRate: 1, outputRate: 1, …}
12
: 
{id: 376, at: '32,5', facing: 'N', inputRate: 1, outputRate: 1, …}
13
: 
{id: 377, at: '34,5', facing: 'N', inputRate: 1, outputRate: 1, …}
14
: 
{id: 401, at: '15,5', facing: 'N', inputRate: 1, outputRate: 1, …}
15
: 
{id: 402, at: '17,5', facing: 'N', inputRate: 1, outputRate: 1, …}
length
: 
16
[[Prototype]]
: 
Array(0)
splitters
: 
Array(8)
0
: 
{id: 20, at: '14,12', facing: 'W', inputRate: 2, outputRate: 1, …}
1
: 
{id: 22, at: '20,12', facing: 'E', inputRate: 2, outputRate: 1, …}
2
: 
{id: 23, at: '35,31', facing: 'W', inputRate: 2, outputRate: 1, …}
3
: 
{id: 25, at: '41,31', facing: 'E', inputRate: 2, outputRate: 1, …}
4
: 
{id: 301, at: '17,13', facing: 'S', inputRate: 2, outputRate: 1, …}
5
: 
{id: 373, at: '33,7', facing: 'N', inputRate: 2, outputRate: 1, …}
6
: 
{id: 398, at: '16,7', facing: 'N', inputRate: 2, outputRate: 1, …}
7
: 
{id: 507, at: '38,32', facing: 'S', inputRate: 2, outputRate: 1, …}
length
: 
8
[[Prototype]]
: 
Array(0)
tubes
: 
Array(245)
[0 … 99]
0
: 
{id: 29, at: '16,4', facing: 'E', shape: 'straight', from: 401, …}
1
: 
{id: 30, at: '18,4', facing: 'E', shape: 'straight', from: 402, …}
2
: 
{id: 33, at: '19,0', facing: 'S', shape: 'straight', from: 403, …}
3
: 
{id: 34, at: '20,0', facing: 'S', shape: 'straight', from: 403, …}
4
: 
{id: 35, at: '21,0', facing: 'S', shape: 'straight', from: 403, …}
5
: 
{id: 36, at: '22,0', facing: 'S', shape: 'straight', from: 403, …}
6
: 
{id: 37, at: '23,0', facing: 'S', shape: 'straight', from: 403, …}
7
: 
{id: 39, at: '25,2', facing: 'E', shape: 'straight', from: 403, …}
8
: 
{id: 40, at: '25,3', facing: 'E', shape: 'straight', from: 403, …}
9
: 
{id: 41, at: '25,4', facing: 'E', shape: 'straight', from: 403, …}
10
: 
{id: 61, at: '13,11', facing: 'S', shape: 'straight', from: 20, …}
11
: 
{id: 62, at: '13,13', facing: 'S', shape: 'straight', from: 20, …}
12
: 
{id: 65, at: '21,13', facing: 'S', shape: 'straight', from: 22, …}
13
: 
{id: 66, at: '21,11', facing: 'S', shape: 'straight', from: 22, …}
14
: 
{id: 71, at: '13,18', facing: 'S', shape: 'straight', from: 304, …}
15
: 
{id: 72, at: '12,18', facing: 'S', shape: 'straight', from: 304, …}
16
: 
{id: 73, at: '11,18', facing: 'S', shape: 'straight', from: 304, …}
17
: 
{id: 74, at: '10,18', facing: 'S', shape: 'straight', from: 304, …}
18
: 
{id: 75, at: '9,18', facing: 'S', shape: 'straight', from: 304, …}
19
: 
{id: 77, at: '7,16', facing: 'E', shape: 'straight', from: 304, …}
20
: 
{id: 87, at: '19,18', facing: 'S', shape: 'straight', from: 305, …}
21
: 
{id: 88, at: '20,18', facing: 'S', shape: 'straight', from: 305, …}
22
: 
{id: 89, at: '21,18', facing: 'S', shape: 'straight', from: 305, …}
23
: 
{id: 90, at: '22,18', facing: 'S', shape: 'straight', from: 305, …}
24
: 
{id: 91, at: '23,18', facing: 'S', shape: 'straight', from: 305, …}
25
: 
{id: 92, at: '24,18', facing: 'S', shape: 'straight', from: 305, …}
26
: 
{id: 95, at: '26,16', facing: 'E', shape: 'straight', from: 305, …}
27
: 
{id: 140, at: '36,11', facing: 'S', shape: 'straight', from: 486, …}
28
: 
{id: 141, at: '35,11', facing: 'S', shape: 'straight', from: 486, …}
29
: 
{id: 142, at: '34,11', facing: 'S', shape: 'straight', from: 486, …}
30
: 
{id: 143, at: '33,11', facing: 'S', shape: 'straight', from: 486, …}
31
: 
{id: 144, at: '32,11', facing: 'S', shape: 'straight', from: 486, …}
32
: 
{id: 145, at: '31,11', facing: 'S', shape: 'straight', from: 486, …}
33
: 
{id: 146, at: '30,11', facing: 'S', shape: 'straight', from: 486, …}
34
: 
{id: 147, at: '28,11', facing: 'S', shape: 'straight', from: 486, …}
35
: 
{id: 149, at: '27,11', facing: 'S', shape: 'straight', from: 486, …}
36
: 
{id: 150, at: '26,11', facing: 'S', shape: 'straight', from: 486, …}
37
: 
{id: 163, at: '38,30', facing: 'E', shape: 'straight', from: 500, …}
38
: 
{id: 165, at: '34,30', facing: 'S', shape: 'straight', from: 23, …}
39
: 
{id: 166, at: '34,32', facing: 'S', shape: 'straight', from: 23, …}
40
: 
{id: 169, at: '42,32', facing: 'S', shape: 'straight', from: 25, …}
41
: 
{id: 170, at: '42,30', facing: 'S', shape: 'straight', from: 25, …}
42
: 
{id: 173, at: '36,35', facing: 'E', shape: 'straight', from: 14, …}
43
: 
{id: 174, at: '38,35', facing: 'E', shape: 'straight', from: 15, …}
44
: 
{id: 179, at: '34,37', facing: 'S', shape: 'straight', from: 14, …}
45
: 
{id: 180, at: '33,37', facing: 'S', shape: 'straight', from: 14, …}
46
: 
{id: 181, at: '32,37', facing: 'S', shape: 'straight', from: 14, …}
47
: 
{id: 182, at: '31,37', facing: 'S', shape: 'straight', from: 14, …}
48
: 
{id: 184, at: '29,35', facing: 'E', shape: 'straight', from: 14, …}
49
: 
{id: 186, at: '29,33', facing: 'E', shape: 'straight', from: 521, …}
50
: 
{id: 209, at: '29,27', facing: 'S', shape: 'straight', from: 518, …}
51
: 
{id: 210, at: '30,27', facing: 'S', shape: 'straight', from: 518, …}
52
: 
{id: 211, at: '31,27', facing: 'S', shape: 'straight', from: 518, …}
53
: 
{id: 212, at: '32,27', facing: 'S', shape: 'straight', from: 518, …}
54
: 
{id: 213, at: '33,27', facing: 'S', shape: 'straight', from: 518, …}
55
: 
{id: 214, at: '34,27', facing: 'S', shape: 'straight', from: 518, …}
56
: 
{id: 215, at: '35,27', facing: 'S', shape: 'straight', from: 518, …}
57
: 
{id: 216, at: '36,27', facing: 'S', shape: 'straight', from: 518, …}
58
: 
{id: 217, at: '37,27', facing: 'S', shape: 'straight', from: 518, …}
59
: 
{id: 218, at: '38,27', facing: 'S', shape: 'straight', from: 518, …}
60
: 
{id: 219, at: '39,27', facing: 'S', shape: 'straight', from: 518, …}
61
: 
{id: 220, at: '40,27', facing: 'S', shape: 'straight', from: 518, …}
62
: 
{id: 221, at: '41,27', facing: 'S', shape: 'straight', from: 518, …}
63
: 
{id: 222, at: '42,27', facing: 'S', shape: 'straight', from: 518, …}
64
: 
{id: 238, at: '33,10', facing: 'S', shape: 'straight', from: 578, …}
65
: 
{id: 239, at: '34,10', facing: 'S', shape: 'straight', from: 578, …}
66
: 
{id: 241, at: '36,10', facing: 'S', shape: 'straight', from: 578, …}
67
: 
{id: 242, at: '38,10', facing: 'S', shape: 'straight', from: 578, …}
68
: 
{id: 243, at: '39,10', facing: 'S', shape: 'straight', from: 578, …}
69
: 
{id: 244, at: '40,10', facing: 'S', shape: 'straight', from: 578, …}
70
: 
{id: 245, at: '37,10', facing: 'S', shape: 'straight', from: 578, …}
71
: 
{id: 246, at: '41,10', facing: 'S', shape: 'straight', from: 578, …}
72
: 
{id: 247, at: '42,10', facing: 'S', shape: 'straight', from: 578, …}
73
: 
{id: 250, at: '46,10', facing: 'S', shape: 'straight', from: 578, …}
74
: 
{id: 251, at: '45,10', facing: 'S', shape: 'straight', from: 578, …}
75
: 
{id: 252, at: '44,10', facing: 'S', shape: 'straight', from: 578, …}
76
: 
{id: 253, at: '43,10', facing: 'S', shape: 'straight', from: 578, …}
77
: 
{id: 254, at: '32,10', facing: 'S', shape: 'straight', from: 578, …}
78
: 
{id: 255, at: '31,10', facing: 'S', shape: 'straight', from: 578, …}
79
: 
{id: 256, at: '29,10', facing: 'S', shape: 'straight', from: 578, …}
80
: 
{id: 257, at: '30,10', facing: 'S', shape: 'straight', from: 578, …}
81
: 
{id: 258, at: '28,10', facing: 'S', shape: 'straight', from: 578, …}
82
: 
{id: 260, at: '27,10', facing: 'S', shape: 'straight', from: 578, …}
83
: 
{id: 261, at: '25,8', facing: 'E', shape: 'straight', from: 578, …}
84
: 
{id: 264, at: '7,18', facing: 'N', shape: 'corner', from: 304, …}
85
: 
{id: 265, at: '11,12', facing: 'S', shape: 'straight', from: 10, …}
86
: 
{id: 266, at: '11,10', facing: 'S', shape: 'straight', from: 11, …}
87
: 
{id: 269, at: '9,11', facing: 'S', shape: 'straight', from: 267, …}
88
: 
{id: 270, at: '7,11', facing: 'E', shape: 'corner', from: 267, …}
89
: 
{id: 271, at: '7,13', facing: 'E', shape: 'straight', from: 267, …}
90
: 
{id: 272, at: '7,14', facing: 'E', shape: 'straight', from: 267, …}
91
: 
{id: 273, at: '6,15', facing: 'S', shape: 'straight', from: 268, …}
92
: 
{id: 274, at: '4,15', facing: 'E', shape: 'corner', from: 268, …}
93
: 
{id: 275, at: '4,20', facing: 'N', shape: 'corner', from: 268, …}
94
: 
{id: 276, at: '26,18', facing: 'W', shape: 'corner', from: 305, …}
95
: 
{id: 277, at: '23,12', facing: 'N', shape: 'straight', from: 6, …}
96
: 
{id: 278, at: '23,14', facing: 'N', shape: 'straight', from: 7, …}
97
: 
{id: 281, at: '26,13', facing: 'S', shape: 'corner', from: 279, …}
98
: 
{id: 286, at: '16,12', facing: 'W', shape: 'corner', from: 284, …}
99
: 
{id: 287, at: '18,12', facing: 'N', shape: 'corner', from: 285, …}
[100 … 199]
100
: 
{id: 299, at: '17,11', facing: 'E', shape: 'straight', from: 298, …}
101
: 
{id: 300, at: '17,12', facing: 'E', shape: 'straight', from: 298, …}
102
: 
{id: 302, at: '16,14', facing: 'E', shape: 'straight', from: 301, …}
103
: 
{id: 303, at: '18,14', facing: 'E', shape: 'straight', from: 301, …}
104
: 
{id: 306, at: '15,16', facing: 'E', shape: 'straight', from: 304, …}
105
: 
{id: 307, at: '17,16', facing: 'E', shape: 'straight', from: 305, …}
106
: 
{id: 308, at: '15,18', facing: 'W', shape: 'corner', from: 304, …}
107
: 
{id: 309, at: '17,18', facing: 'N', shape: 'corner', from: 305, …}
108
: 
{id: 323, at: '32,20', facing: 'W', shape: 'corner', from: 268, …}
109
: 
{id: 324, at: '32,17', facing: 'E', shape: 'corner', from: 268, …}
110
: 
{id: 328, at: '25,10', facing: 'N', shape: 'corner', from: 578, …}
111
: 
{id: 370, at: '35,10', facing: 'S', shape: 'straight', from: 578, …}
112
: 
{id: 372, at: '33,8', facing: 'W', shape: 'straight', from: 371, …}
113
: 
{id: 374, at: '32,6', facing: 'W', shape: 'straight', from: 373, …}
114
: 
{id: 375, at: '34,6', facing: 'W', shape: 'straight', from: 373, …}
115
: 
{id: 378, at: '33,4', facing: 'W', shape: 'straight', from: 376, …}
116
: 
{id: 379, at: '35,4', facing: 'W', shape: 'straight', from: 377, …}
117
: 
{id: 381, at: '34,2', facing: 'W', shape: 'straight', from: 380, …}
118
: 
{id: 382, at: '34,0', facing: 'S', shape: 'corner', from: 380, …}
119
: 
{id: 383, at: '28,6', facing: 'W', shape: 'corner', from: 380, …}
120
: 
{id: 384, at: '28,0', facing: 'E', shape: 'corner', from: 380, …}
121
: 
{id: 385, at: '28,2', facing: 'E', shape: 'straight', from: 380, …}
122
: 
{id: 386, at: '28,3', facing: 'E', shape: 'straight', from: 380, …}
123
: 
{id: 387, at: '28,4', facing: 'E', shape: 'straight', from: 380, …}
124
: 
{id: 388, at: '32,0', facing: 'S', shape: 'straight', from: 380, …}
125
: 
{id: 389, at: '31,0', facing: 'S', shape: 'straight', from: 380, …}
126
: 
{id: 390, at: '30,0', facing: 'S', shape: 'straight', from: 380, …}
127
: 
{id: 397, at: '16,8', facing: 'W', shape: 'straight', from: 396, …}
128
: 
{id: 399, at: '17,6', facing: 'W', shape: 'straight', from: 398, …}
129
: 
{id: 400, at: '15,6', facing: 'W', shape: 'straight', from: 398, …}
130
: 
{id: 404, at: '17,0', facing: 'E', shape: 'corner', from: 403, …}
131
: 
{id: 405, at: '17,2', facing: 'W', shape: 'straight', from: 403, …}
132
: 
{id: 406, at: '25,0', facing: 'S', shape: 'corner', from: 403, …}
133
: 
{id: 407, at: '24,11', facing: 'N', shape: 'corner', from: 486, …}
134
: 
{id: 408, at: '24,8', facing: 'S', shape: 'corner', from: 486, …}
135
: 
{id: 420, at: '22,6', facing: 'N', shape: 'corner', from: 486, …}
136
: 
{id: 422, at: '19,8', facing: 'N', shape: 'corner', from: 486, …}
137
: 
{id: 426, at: '19,2', facing: 'E', shape: 'corner', from: 486, …}
138
: 
{id: 430, at: '4,17', facing: 'E', shape: 'straight', from: 268, …}
139
: 
{id: 431, at: '4,18', facing: 'E', shape: 'straight', from: 268, …}
140
: 
{id: 432, at: '6,20', facing: 'N', shape: 'straight', from: 268, …}
141
: 
{id: 433, at: '7,20', facing: 'N', shape: 'straight', from: 268, …}
142
: 
{id: 434, at: '8,20', facing: 'N', shape: 'straight', from: 268, …}
143
: 
{id: 435, at: '9,20', facing: 'N', shape: 'straight', from: 268, …}
144
: 
{id: 436, at: '10,20', facing: 'N', shape: 'straight', from: 268, …}
145
: 
{id: 437, at: '11,20', facing: 'N', shape: 'straight', from: 268, …}
146
: 
{id: 438, at: '12,20', facing: 'N', shape: 'straight', from: 268, …}
147
: 
{id: 439, at: '13,20', facing: 'N', shape: 'straight', from: 268, …}
148
: 
{id: 440, at: '14,20', facing: 'N', shape: 'straight', from: 268, …}
149
: 
{id: 441, at: '15,20', facing: 'N', shape: 'straight', from: 268, …}
150
: 
{id: 442, at: '16,20', facing: 'N', shape: 'straight', from: 268, …}
151
: 
{id: 443, at: '17,20', facing: 'N', shape: 'straight', from: 268, …}
152
: 
{id: 444, at: '18,20', facing: 'N', shape: 'straight', from: 268, …}
153
: 
{id: 445, at: '19,20', facing: 'N', shape: 'straight', from: 268, …}
154
: 
{id: 446, at: '20,20', facing: 'N', shape: 'straight', from: 268, …}
155
: 
{id: 447, at: '21,20', facing: 'N', shape: 'straight', from: 268, …}
156
: 
{id: 448, at: '23,20', facing: 'N', shape: 'straight', from: 268, …}
157
: 
{id: 449, at: '22,20', facing: 'N', shape: 'straight', from: 268, …}
158
: 
{id: 450, at: '24,20', facing: 'N', shape: 'straight', from: 268, …}
159
: 
{id: 451, at: '25,20', facing: 'N', shape: 'straight', from: 268, …}
160
: 
{id: 452, at: '26,20', facing: 'N', shape: 'straight', from: 268, …}
161
: 
{id: 453, at: '27,20', facing: 'N', shape: 'straight', from: 268, …}
162
: 
{id: 454, at: '28,20', facing: 'N', shape: 'straight', from: 268, …}
163
: 
{id: 455, at: '29,20', facing: 'N', shape: 'straight', from: 268, …}
164
: 
{id: 456, at: '30,20', facing: 'N', shape: 'straight', from: 268, …}
165
: 
{id: 459, at: '34,17', facing: 'N', shape: 'straight', from: 268, …}
166
: 
{id: 460, at: '35,17', facing: 'N', shape: 'straight', from: 268, …}
167
: 
{id: 461, at: '27,15', facing: 'N', shape: 'straight', from: 280, …}
168
: 
{id: 462, at: '28,15', facing: 'N', shape: 'straight', from: 280, …}
169
: 
{id: 463, at: '29,15', facing: 'N', shape: 'straight', from: 280, …}
170
: 
{id: 464, at: '30,15', facing: 'N', shape: 'straight', from: 280, …}
171
: 
{id: 465, at: '31,15', facing: 'N', shape: 'straight', from: 280, …}
172
: 
{id: 466, at: '32,15', facing: 'N', shape: 'straight', from: 280, …}
173
: 
{id: 467, at: '33,15', facing: 'N', shape: 'straight', from: 280, …}
174
: 
{id: 468, at: '34,15', facing: 'N', shape: 'straight', from: 280, …}
175
: 
{id: 469, at: '35,15', facing: 'N', shape: 'straight', from: 280, …}
176
: 
{id: 472, at: '37,16', facing: 'N', shape: 'straight', from: 486, …}
177
: 
{id: 473, at: '39,16', facing: 'W', shape: 'corner', from: 486, …}
178
: 
{id: 474, at: '39,11', facing: 'S', shape: 'corner', from: 486, …}
179
: 
{id: 475, at: '39,14', facing: 'W', shape: 'straight', from: 486, …}
180
: 
{id: 476, at: '39,13', facing: 'W', shape: 'straight', from: 486, …}
181
: 
{id: 477, at: '37,11', facing: 'S', shape: 'straight', from: 486, …}
182
: 
{id: 478, at: '29,11', facing: 'S', shape: 'straight', from: 486, …}
183
: 
{id: 479, at: '22,8', facing: 'S', shape: 'straight', from: 486, …}
184
: 
{id: 480, at: '21,8', facing: 'S', shape: 'straight', from: 486, …}
185
: 
{id: 481, at: '19,6', facing: 'W', shape: 'straight', from: 486, …}
186
: 
{id: 482, at: '19,5', facing: 'W', shape: 'straight', from: 486, …}
187
: 
{id: 483, at: '19,4', facing: 'W', shape: 'straight', from: 486, …}
188
: 
{id: 484, at: '22,2', facing: 'S', shape: 'corner', from: 486, …}
189
: 
{id: 485, at: '22,4', facing: 'E', shape: 'straight', from: 486, …}
190
: 
{id: 503, at: '39,31', facing: 'N', shape: 'corner', from: 502, …}
191
: 
{id: 504, at: '37,31', facing: 'W', shape: 'corner', from: 501, …}
192
: 
{id: 505, at: '38,31', facing: 'E', shape: 'straight', from: 500, …}
193
: 
{id: 508, at: '37,33', facing: 'E', shape: 'straight', from: 507, …}
194
: 
{id: 509, at: '39,33', facing: 'E', shape: 'straight', from: 507, …}
195
: 
{id: 515, at: '36,37', facing: 'W', shape: 'corner', from: 14, …}
196
: 
{id: 516, at: '38,37', facing: 'N', shape: 'corner', from: 15, …}
197
: 
{id: 517, at: '29,37', facing: 'N', shape: 'corner', from: 14, …}
198
: 
{id: 519, at: '32,31', facing: 'S', shape: 'straight', from: 13, …}
199
: 
{id: 520, at: '32,29', facing: 'S', shape: 'straight', from: 12, …}
[200 … 244]
200
: 
{id: 522, at: '29,30', facing: 'E', shape: 'corner', from: 521, …}
201
: 
{id: 523, at: '29,32', facing: 'E', shape: 'straight', from: 521, …}
202
: 
{id: 525, at: '27,34', facing: 'N', shape: 'corner', from: 518, …}
203
: 
{id: 526, at: '27,32', facing: 'W', shape: 'straight', from: 518, …}
204
: 
{id: 527, at: '27,31', facing: 'W', shape: 'straight', from: 518, …}
205
: 
{id: 528, at: '27,30', facing: 'W', shape: 'straight', from: 518, …}
206
: 
{id: 529, at: '27,29', facing: 'W', shape: 'straight', from: 518, …}
207
: 
{id: 530, at: '27,27', facing: 'E', shape: 'corner', from: 518, …}
208
: 
{id: 531, at: '44,31', facing: 'N', shape: 'straight', from: 17, …}
209
: 
{id: 532, at: '44,33', facing: 'N', shape: 'straight', from: 16, …}
210
: 
{id: 534, at: '47,32', facing: 'S', shape: 'corner', from: 533, …}
211
: 
{id: 537, at: '40,37', facing: 'N', shape: 'straight', from: 15, …}
212
: 
{id: 538, at: '41,37', facing: 'N', shape: 'straight', from: 15, …}
213
: 
{id: 539, at: '42,37', facing: 'N', shape: 'straight', from: 15, …}
214
: 
{id: 540, at: '43,37', facing: 'N', shape: 'straight', from: 15, …}
215
: 
{id: 541, at: '44,37', facing: 'N', shape: 'straight', from: 15, …}
216
: 
{id: 542, at: '45,37', facing: 'N', shape: 'straight', from: 15, …}
217
: 
{id: 543, at: '47,37', facing: 'W', shape: 'corner', from: 15, …}
218
: 
{id: 544, at: '47,35', facing: 'W', shape: 'straight', from: 15, …}
219
: 
{id: 545, at: '49,34', facing: 'W', shape: 'corner', from: 536, …}
220
: 
{id: 546, at: '49,32', facing: 'W', shape: 'straight', from: 536, …}
221
: 
{id: 547, at: '49,31', facing: 'W', shape: 'straight', from: 536, …}
222
: 
{id: 548, at: '49,30', facing: 'W', shape: 'straight', from: 536, …}
223
: 
{id: 569, at: '43,27', facing: 'N', shape: 'straight', from: 518, …}
224
: 
{id: 570, at: '45,27', facing: 'N', shape: 'straight', from: 518, …}
225
: 
{id: 572, at: '44,27', facing: 'N', shape: 'straight', from: 518, …}
226
: 
{id: 573, at: '47,27', facing: 'W', shape: 'corner', from: 518, …}
227
: 
{id: 574, at: '49,29', facing: 'W', shape: 'straight', from: 536, …}
228
: 
{id: 575, at: '49,28', facing: 'W', shape: 'straight', from: 536, …}
229
: 
{id: 576, at: '49,27', facing: 'W', shape: 'straight', from: 536, …}
230
: 
{id: 577, at: '49,26', facing: 'W', shape: 'straight', from: 536, …}
231
: 
{id: 579, at: '48,24', facing: 'W', shape: 'straight', from: 578, …}
232
: 
{id: 580, at: '48,23', facing: 'W', shape: 'straight', from: 578, …}
233
: 
{id: 581, at: '48,22', facing: 'W', shape: 'straight', from: 578, …}
234
: 
{id: 582, at: '48,21', facing: 'W', shape: 'straight', from: 578, …}
235
: 
{id: 583, at: '48,20', facing: 'W', shape: 'straight', from: 578, …}
236
: 
{id: 584, at: '48,19', facing: 'W', shape: 'straight', from: 578, …}
237
: 
{id: 585, at: '48,18', facing: 'W', shape: 'straight', from: 578, …}
238
: 
{id: 586, at: '48,17', facing: 'W', shape: 'straight', from: 578, …}
239
: 
{id: 587, at: '48,16', facing: 'W', shape: 'straight', from: 578, …}
240
: 
{id: 588, at: '48,15', facing: 'W', shape: 'straight', from: 578, …}
241
: 
{id: 589, at: '48,14', facing: 'W', shape: 'straight', from: 578, …}
242
: 
{id: 590, at: '48,10', facing: 'S', shape: 'corner', from: 578, …}
243
: 
{id: 591, at: '48,13', facing: 'W', shape: 'straight', from: 578, …}
244
: 
{id: 592, at: '48,12', facing: 'W', shape: 'straight', from: 578, …}
length
: 
245
  `

  function parseNullableNumber(rawValue) {
    if (rawValue == null) return null;
    const value = String(rawValue).trim();
    if (value === "null") return null;
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
  }

  function extractMatchValue(line, regex) {
    const match = line.match(regex);
    return match ? match[1] : null;
  }

  function extractQuotedValue(line, key) {
    const pattern = new RegExp(
      String.raw`${key}\s*:\s*['"“”‘’]([^'"“”‘’]+)['"“”‘’]`,
      "i"
    );
    const value = extractMatchValue(line, pattern);
    return value != null ? value : null;
  }

  function parseSnapshotText(rawText) {
    const parsed = {
      miners: [],
      constructors: [],
      mergers: [],
      smelters: [],
      splitters: [],
      tubes: []
    };

    const knownSections = new Set([
      "miners",
      "constructors",
      "mergers",
      "smelters",
      "splitters",
      "tubes"
    ]);
    let section = null;

    for (const row of rawText.split(/\r?\n/)) {
      const line = row.trim();
      if (!line) continue;

      if (knownSections.has(line)) {
        section = line;
        continue;
      }
      if (!section || !line.startsWith("{id:")) {
        continue;
      }

      const idValue = extractMatchValue(line, /id:\s*(\d+)/i);
      const atValue = extractQuotedValue(line, "at");
      if (idValue == null || atValue == null) {
        continue;
      }

      const entry = {
        id: Number(idValue),
        at: atValue
      };

      const facingRaw = extractQuotedValue(line, "facing");
      const facingValue = facingRaw ? String(facingRaw).trim().charAt(0).toUpperCase() : null;
      if (facingValue) {
        entry.facing = facingValue;
      }

      if (section === "tubes") {
        const shapeValue = extractQuotedValue(line, "shape");
        if (shapeValue) {
          entry.shape = String(shapeValue).trim().toLowerCase();
        }

        const fromToken = extractMatchValue(line, /from:\s*([^,\s}]+)/);
        const toToken = extractMatchValue(line, /to:\s*([^,\s}]+)/);
        const componentToken = extractMatchValue(line, /component:\s*([^,\s}]+)/);
        if (fromToken != null) entry.from = parseNullableNumber(fromToken);
        if (toToken != null) entry.to = parseNullableNumber(toToken);
        if (componentToken != null) entry.component = parseNullableNumber(componentToken);
      }

      parsed[section].push(entry);
    }

    return parsed;
  }

  function uniqueById(entries) {
    const map = new Map();
    for (const entry of entries) {
      if (!entry || !Number.isFinite(entry.id)) continue;
      map.set(entry.id, entry);
    }
    return Array.from(map.values()).sort((a, b) => a.id - b.id);
  }

  const parsedSnapshot = parseSnapshotText(RAW_DEBUG_SNAPSHOT);

  globalScope.__devCheckpointSnapshot = {
    miners: uniqueById(parsedSnapshot.miners),
    tubes: uniqueById(parsedSnapshot.tubes),
    splitters: uniqueById(parsedSnapshot.splitters),
    mergers: uniqueById(parsedSnapshot.mergers),
    smelters: uniqueById(parsedSnapshot.smelters),
    constructors: uniqueById(parsedSnapshot.constructors)
  };

  const counts = {
    miners: globalScope.__devCheckpointSnapshot.miners.length,
    tubes: globalScope.__devCheckpointSnapshot.tubes.length,
    splitters: globalScope.__devCheckpointSnapshot.splitters.length,
    mergers: globalScope.__devCheckpointSnapshot.mergers.length,
    smelters: globalScope.__devCheckpointSnapshot.smelters.length,
    constructors: globalScope.__devCheckpointSnapshot.constructors.length
  };
  if (counts.tubes === 0) {
    console.warn("DevCheckpoint snapshot parsed zero tubes.", counts);
  }
})(typeof window !== "undefined" ? window : globalThis);
