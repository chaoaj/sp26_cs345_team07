// dev-checkpoint-snapshot.js
// Source-of-truth snapshot consumed by dev-checkpoint.js.

(function initDevCheckpointSnapshot(globalScope) {
  "use strict";


const RAW_DEBUG_SNAPSHOT = `
constructors
: 
Array(17)
0
: 
{id: 71, at: '7,15', facing: 'W', inputRate: 3, outputRate: 1, …}
1
: 
{id: 72, at: '26,15', facing: 'E', inputRate: 3, outputRate: 1, …}
2
: 
{id: 73, at: '29,34', facing: 'W', inputRate: 3, outputRate: 1, …}
3
: 
{id: 74, at: '47,34', facing: 'E', inputRate: 3, outputRate: 1, …}
4
: 
{id: 75, at: '2,34', facing: 'S', inputRate: 3, outputRate: 1, …}
5
: 
{id: 76, at: '7,40', facing: 'S', inputRate: 3, outputRate: 1, …}
6
: 
{id: 77, at: '13,38', facing: 'E', inputRate: 3, outputRate: 1, …}
7
: 
{id: 78, at: '26,36', facing: 'W', inputRate: 3, outputRate: 1, …}
8
: 
{id: 79, at: '18,34', facing: 'S', inputRate: 3, outputRate: 1, …}
9
: 
{id: 80, at: '22,45', facing: 'W', inputRate: 3, outputRate: 1, …}
10
: 
{id: 81, at: '64,32', facing: 'E', inputRate: 3, outputRate: 1, …}
11
: 
{id: 82, at: '64,46', facing: 'E', inputRate: 3, outputRate: 1, …}
12
: 
{id: 83, at: '41,49', facing: 'S', inputRate: 3, outputRate: 1, …}
13
: 
{id: 84, at: '55,49', facing: 'S', inputRate: 3, outputRate: 1, …}
14
: 
{id: 85, at: '52,56', facing: 'S', inputRate: 3, outputRate: 3, …}
15
: 
{id: 86, at: '61,53', facing: 'S', inputRate: 3, outputRate: 3, …}
16
: 
{id: 87, at: '30,48', facing: 'S', inputRate: 8, outputRate: 1, …}
length
: 
17
[[Prototype]]
: 
Array(0)
mergers
: 
Array(24)
0
: 
{id: 112, at: '10,11', facing: 'W', inputRate: 2, outputRate: 2, …}
1
: 
{id: 113, at: '24,13', facing: 'E', inputRate: 2, outputRate: 2, …}
2
: 
{id: 114, at: '34,3', facing: 'N', inputRate: 2, outputRate: 2, …}
3
: 
{id: 115, at: '17,3', facing: 'N', inputRate: 2, outputRate: 2, …}
4
: 
{id: 116, at: '36,16', facing: 'E', inputRate: 2, outputRate: 2, …}
5
: 
{id: 117, at: '31,30', facing: 'W', inputRate: 2, outputRate: 2, …}
6
: 
{id: 118, at: '45,32', facing: 'E', inputRate: 2, outputRate: 2, …}
7
: 
{id: 119, at: '48,25', facing: 'N', inputRate: 2, outputRate: 2, …}
8
: 
{id: 120, at: '2,22', facing: 'W', inputRate: 2, outputRate: 2, …}
9
: 
{id: 121, at: '7,34', facing: 'S', inputRate: 2, outputRate: 2, …}
10
: 
{id: 122, at: '9,43', facing: 'E', inputRate: 2, outputRate: 2, …}
11
: 
{id: 123, at: '25,24', facing: 'E', inputRate: 2, outputRate: 2, …}
12
: 
{id: 124, at: '32,41', facing: 'E', inputRate: 2, outputRate: 2, …}
13
: 
{id: 125, at: '16,34', facing: 'E', inputRate: 2, outputRate: 2, …}
14
: 
{id: 126, at: '22,38', facing: 'S', inputRate: 2, outputRate: 2, …}
15
: 
{id: 127, at: '19,47', facing: 'S', inputRate: 2, outputRate: 2, …}
16
: 
{id: 128, at: '55,44', facing: 'E', inputRate: 2, outputRate: 2, …}
17
: 
{id: 129, at: '59,32', facing: 'N', inputRate: 2, outputRate: 2, …}
18
: 
{id: 130, at: '41,42', facing: 'W', inputRate: 2, outputRate: 2, …}
19
: 
{id: 131, at: '47,53', facing: 'S', inputRate: 2, outputRate: 2, …}
20
: 
{id: 132, at: '68,40', facing: 'E', inputRate: 2, outputRate: 2, …}
21
: 
{id: 133, at: '61,49', facing: 'S', inputRate: 2, outputRate: 2, …}
22
: 
{id: 134, at: '57,26', facing: 'N', inputRate: 2, outputRate: 2, …}
23
: 
{id: 135, at: '53,60', facing: 'S', inputRate: 6, outputRate: 6, …}
length
: 
24
[[Prototype]]
: 
Array(0)
miners
: 
Array(23)
0
: 
{id: 3, at: '16,10', facing: 'S', inputRate: 0, outputRate: 2, …}
1
: 
{id: 4, at: '18,10', facing: 'S', inputRate: 0, outputRate: 2, …}
2
: 
{id: 5, at: '17,10', facing: 'S', inputRate: 0, outputRate: 2, …}
3
: 
{id: 6, at: '33,9', facing: 'N', inputRate: 0, outputRate: 2, …}
4
: 
{id: 7, at: '16,9', facing: 'N', inputRate: 0, outputRate: 2, …}
5
: 
{id: 8, at: '38,29', facing: 'S', inputRate: 0, outputRate: 2, …}
6
: 
{id: 9, at: '37,29', facing: 'S', inputRate: 0, outputRate: 2, …}
7
: 
{id: 10, at: '39,29', facing: 'S', inputRate: 0, outputRate: 2, …}
8
: 
{id: 11, at: '10,26', facing: 'W', inputRate: 0, outputRate: 2, …}
9
: 
{id: 12, at: '10,27', facing: 'W', inputRate: 0, outputRate: 2, …}
10
: 
{id: 13, at: '10,28', facing: 'W', inputRate: 0, outputRate: 2, …}
11
: 
{id: 14, at: '12,29', facing: 'S', inputRate: 0, outputRate: 2, …}
12
: 
{id: 15, at: '17,26', facing: 'E', inputRate: 0, outputRate: 2, …}
13
: 
{id: 16, at: '14,28', facing: 'E', inputRate: 0, outputRate: 2, …}
14
: 
{id: 17, at: '26,40', facing: 'E', inputRate: 0, outputRate: 2, …}
15
: 
{id: 18, at: '26,41', facing: 'S', inputRate: 0, outputRate: 2, …}
16
: 
{id: 19, at: '47,41', facing: 'S', inputRate: 0, outputRate: 2, …}
17
: 
{id: 20, at: '48,41', facing: 'S', inputRate: 0, outputRate: 2, …}
18
: 
{id: 21, at: '49,41', facing: 'S', inputRate: 0, outputRate: 2, …}
19
: 
{id: 22, at: '56,40', facing: 'E', inputRate: 0, outputRate: 2, …}
20
: 
{id: 23, at: '56,39', facing: 'E', inputRate: 0, outputRate: 2, …}
21
: 
{id: 24, at: '56,38', facing: 'E', inputRate: 0, outputRate: 2, …}
22
: 
{id: 25, at: '56,33', facing: 'N', inputRate: 0, outputRate: 2, …}
length
: 
23
[[Prototype]]
: 
Array(0)
smelters
: 
Array(45)
0
: 
{id: 26, at: '22,11', facing: 'E', inputRate: 1, outputRate: 1, …}
1
: 
{id: 27, at: '22,13', facing: 'E', inputRate: 1, outputRate: 1, …}
2
: 
{id: 28, at: '12,13', facing: 'W', inputRate: 1, outputRate: 1, …}
3
: 
{id: 29, at: '12,11', facing: 'W', inputRate: 1, outputRate: 1, …}
4
: 
{id: 30, at: '33,30', facing: 'W', inputRate: 1, outputRate: 1, …}
5
: 
{id: 31, at: '33,32', facing: 'W', inputRate: 1, outputRate: 1, …}
6
: 
{id: 32, at: '37,34', facing: 'S', inputRate: 1, outputRate: 1, …}
7
: 
{id: 33, at: '39,34', facing: 'S', inputRate: 1, outputRate: 1, …}
8
: 
{id: 34, at: '43,32', facing: 'E', inputRate: 1, outputRate: 1, …}
9
: 
{id: 35, at: '43,30', facing: 'E', inputRate: 1, outputRate: 1, …}
10
: 
{id: 36, at: '16,15', facing: 'S', inputRate: 1, outputRate: 1, …}
11
: 
{id: 37, at: '18,15', facing: 'S', inputRate: 1, outputRate: 1, …}
12
: 
{id: 38, at: '32,5', facing: 'N', inputRate: 1, outputRate: 1, …}
13
: 
{id: 39, at: '34,5', facing: 'N', inputRate: 1, outputRate: 1, …}
14
: 
{id: 40, at: '15,5', facing: 'N', inputRate: 1, outputRate: 1, …}
15
: 
{id: 41, at: '17,5', facing: 'N', inputRate: 1, outputRate: 1, …}
16
: 
{id: 42, at: '4,22', facing: 'W', inputRate: 1, outputRate: 1, …}
17
: 
{id: 43, at: '4,24', facing: 'W', inputRate: 1, outputRate: 1, …}
18
: 
{id: 44, at: '4,26', facing: 'W', inputRate: 1, outputRate: 1, …}
19
: 
{id: 45, at: '4,28', facing: 'W', inputRate: 1, outputRate: 1, …}
20
: 
{id: 46, at: '7,32', facing: 'S', inputRate: 1, outputRate: 1, …}
21
: 
{id: 47, at: '9,32', facing: 'S', inputRate: 1, outputRate: 1, …}
22
: 
{id: 48, at: '11,33', facing: 'S', inputRate: 1, outputRate: 1, …}
23
: 
{id: 49, at: '13,33', facing: 'S', inputRate: 1, outputRate: 1, …}
24
: 
{id: 50, at: '23,22', facing: 'E', inputRate: 1, outputRate: 1, …}
25
: 
{id: 51, at: '23,24', facing: 'E', inputRate: 1, outputRate: 1, …}
26
: 
{id: 52, at: '20,27', facing: 'E', inputRate: 1, outputRate: 1, …}
27
: 
{id: 53, at: '20,29', facing: 'E', inputRate: 1, outputRate: 1, …}
28
: 
{id: 54, at: '30,39', facing: 'E', inputRate: 1, outputRate: 1, …}
29
: 
{id: 55, at: '30,41', facing: 'E', inputRate: 1, outputRate: 1, …}
30
: 
{id: 56, at: '26,43', facing: 'S', inputRate: 2, outputRate: 1, …}
31
: 
{id: 57, at: '53,42', facing: 'E', inputRate: 1, outputRate: 1, …}
32
: 
{id: 58, at: '53,44', facing: 'E', inputRate: 1, outputRate: 1, …}
33
: 
{id: 59, at: '62,40', facing: 'E', inputRate: 1, outputRate: 1, …}
34
: 
{id: 60, at: '62,38', facing: 'E', inputRate: 1, outputRate: 1, …}
35
: 
{id: 61, at: '59,34', facing: 'N', inputRate: 1, outputRate: 1, …}
36
: 
{id: 62, at: '57,34', facing: 'N', inputRate: 1, outputRate: 1, …}
37
: 
{id: 63, at: '43,42', facing: 'W', inputRate: 1, outputRate: 1, …}
38
: 
{id: 64, at: '43,44', facing: 'W', inputRate: 1, outputRate: 1, …}
39
: 
{id: 65, at: '47,47', facing: 'S', inputRate: 1, outputRate: 1, …}
40
: 
{id: 66, at: '49,47', facing: 'S', inputRate: 1, outputRate: 1, …}
41
: 
{id: 67, at: '61,47', facing: 'S', inputRate: 1, outputRate: 1, …}
42
: 
{id: 68, at: '63,47', facing: 'S', inputRate: 1, outputRate: 1, …}
43
: 
{id: 69, at: '55,28', facing: 'N', inputRate: 1, outputRate: 1, …}
44
: 
{id: 70, at: '57,28', facing: 'N', inputRate: 1, outputRate: 1, …}
length
: 
45
[[Prototype]]
: 
Array(0)
splitters
: 
Array(24)
0
: 
{id: 88, at: '14,12', facing: 'W', inputRate: 2, outputRate: 1, …}
1
: 
{id: 89, at: '20,12', facing: 'E', inputRate: 2, outputRate: 1, …}
2
: 
{id: 90, at: '35,31', facing: 'W', inputRate: 2, outputRate: 1, …}
3
: 
{id: 91, at: '41,31', facing: 'E', inputRate: 2, outputRate: 1, …}
4
: 
{id: 92, at: '17,13', facing: 'S', inputRate: 2, outputRate: 1, …}
5
: 
{id: 93, at: '33,7', facing: 'N', inputRate: 2, outputRate: 1, …}
6
: 
{id: 94, at: '16,7', facing: 'N', inputRate: 2, outputRate: 1, …}
7
: 
{id: 95, at: '38,32', facing: 'S', inputRate: 2, outputRate: 1, …}
8
: 
{id: 96, at: '6,23', facing: 'W', inputRate: 2, outputRate: 1, …}
9
: 
{id: 97, at: '6,27', facing: 'W', inputRate: 2, outputRate: 1, …}
10
: 
{id: 98, at: '8,30', facing: 'S', inputRate: 2, outputRate: 1, …}
11
: 
{id: 99, at: '12,31', facing: 'S', inputRate: 2, outputRate: 1, …}
12
: 
{id: 100, at: '21,23', facing: 'E', inputRate: 2, outputRate: 1, …}
13
: 
{id: 101, at: '18,28', facing: 'E', inputRate: 2, outputRate: 1, …}
14
: 
{id: 102, at: '28,40', facing: 'E', inputRate: 2, outputRate: 1, …}
15
: 
{id: 103, at: '25,30', facing: 'S', inputRate: 2, outputRate: 1, …}
16
: 
{id: 104, at: '45,43', facing: 'W', inputRate: 2, outputRate: 1, …}
17
: 
{id: 105, at: '51,43', facing: 'E', inputRate: 2, outputRate: 1, …}
18
: 
{id: 106, at: '48,45', facing: 'S', inputRate: 2, outputRate: 1, …}
19
: 
{id: 107, at: '60,39', facing: 'E', inputRate: 2, outputRate: 1, …}
20
: 
{id: 108, at: '58,36', facing: 'N', inputRate: 2, outputRate: 1, …}
21
: 
{id: 109, at: '62,45', facing: 'S', inputRate: 2, outputRate: 1, …}
22
: 
{id: 110, at: '56,30', facing: 'N', inputRate: 2, outputRate: 1, …}
23
: 
{id: 111, at: '58,51', facing: 'S', inputRate: 2, outputRate: 1, …}
length
: 
24
[[Prototype]]
: 
Array(0)
tubes
: 
Array(619)
[0 … 99]
0
: 
{id: 136, at: '17,12', facing: 'E', shape: 'straight', from: 5, …}
1
: 
{id: 137, at: '16,14', facing: 'E', shape: 'straight', from: 92, …}
2
: 
{id: 138, at: '18,14', facing: 'E', shape: 'straight', from: 92, …}
3
: 
{id: 139, at: '15,16', facing: 'E', shape: 'straight', from: 36, …}
4
: 
{id: 140, at: '17,16', facing: 'E', shape: 'straight', from: 37, …}
5
: 
{id: 141, at: '15,18', facing: 'W', shape: 'corner', from: 36, …}
6
: 
{id: 142, at: '17,18', facing: 'N', shape: 'corner', from: 37, …}
7
: 
{id: 143, at: '32,20', facing: 'W', shape: 'corner', from: 71, …}
8
: 
{id: 144, at: '32,17', facing: 'E', shape: 'corner', from: 71, …}
9
: 
{id: 145, at: '25,10', facing: 'N', shape: 'corner', from: 119, …}
10
: 
{id: 146, at: '35,10', facing: 'S', shape: 'straight', from: 119, …}
11
: 
{id: 147, at: '33,8', facing: 'W', shape: 'straight', from: 6, …}
12
: 
{id: 148, at: '32,6', facing: 'W', shape: 'straight', from: 93, …}
13
: 
{id: 149, at: '34,6', facing: 'W', shape: 'straight', from: 93, …}
14
: 
{id: 150, at: '33,4', facing: 'W', shape: 'straight', from: 38, …}
15
: 
{id: 151, at: '35,4', facing: 'W', shape: 'straight', from: 39, …}
16
: 
{id: 152, at: '34,2', facing: 'W', shape: 'straight', from: 114, …}
17
: 
{id: 153, at: '34,0', facing: 'S', shape: 'corner', from: 114, …}
18
: 
{id: 154, at: '28,6', facing: 'W', shape: 'corner', from: 114, …}
19
: 
{id: 155, at: '28,0', facing: 'E', shape: 'corner', from: 114, …}
20
: 
{id: 156, at: '28,2', facing: 'E', shape: 'straight', from: 114, …}
21
: 
{id: 157, at: '28,3', facing: 'E', shape: 'straight', from: 114, …}
22
: 
{id: 158, at: '28,4', facing: 'E', shape: 'straight', from: 114, …}
23
: 
{id: 159, at: '32,0', facing: 'S', shape: 'straight', from: 114, …}
24
: 
{id: 160, at: '31,0', facing: 'S', shape: 'straight', from: 114, …}
25
: 
{id: 161, at: '30,0', facing: 'S', shape: 'straight', from: 114, …}
26
: 
{id: 162, at: '16,8', facing: 'W', shape: 'straight', from: 7, …}
27
: 
{id: 163, at: '17,6', facing: 'W', shape: 'straight', from: 94, …}
28
: 
{id: 164, at: '15,6', facing: 'W', shape: 'straight', from: 94, …}
29
: 
{id: 165, at: '17,0', facing: 'E', shape: 'corner', from: 115, …}
30
: 
{id: 166, at: '17,2', facing: 'W', shape: 'straight', from: 115, …}
31
: 
{id: 167, at: '25,0', facing: 'S', shape: 'corner', from: 115, …}
32
: 
{id: 168, at: '24,11', facing: 'N', shape: 'corner', from: 116, …}
33
: 
{id: 169, at: '24,8', facing: 'S', shape: 'corner', from: 116, …}
34
: 
{id: 170, at: '22,6', facing: 'N', shape: 'corner', from: 116, …}
35
: 
{id: 171, at: '19,8', facing: 'N', shape: 'corner', from: 116, …}
36
: 
{id: 172, at: '19,2', facing: 'E', shape: 'corner', from: 116, …}
37
: 
{id: 173, at: '4,17', facing: 'E', shape: 'straight', from: 71, …}
38
: 
{id: 174, at: '4,18', facing: 'E', shape: 'straight', from: 71, …}
39
: 
{id: 175, at: '6,20', facing: 'N', shape: 'straight', from: 71, …}
40
: 
{id: 176, at: '7,20', facing: 'N', shape: 'straight', from: 71, …}
41
: 
{id: 177, at: '8,20', facing: 'N', shape: 'straight', from: 71, …}
42
: 
{id: 178, at: '9,20', facing: 'N', shape: 'straight', from: 71, …}
43
: 
{id: 179, at: '10,20', facing: 'N', shape: 'straight', from: 71, …}
44
: 
{id: 180, at: '11,20', facing: 'N', shape: 'straight', from: 71, …}
45
: 
{id: 181, at: '12,20', facing: 'N', shape: 'straight', from: 71, …}
46
: 
{id: 182, at: '13,20', facing: 'N', shape: 'straight', from: 71, …}
47
: 
{id: 183, at: '17,20', facing: 'N', shape: 'straight', from: 71, …}
48
: 
{id: 184, at: '18,20', facing: 'N', shape: 'straight', from: 71, …}
49
: 
{id: 185, at: '19,20', facing: 'N', shape: 'straight', from: 71, …}
50
: 
{id: 186, at: '21,20', facing: 'N', shape: 'straight', from: 71, …}
51
: 
{id: 187, at: '23,20', facing: 'N', shape: 'straight', from: 71, …}
52
: 
{id: 188, at: '22,20', facing: 'N', shape: 'straight', from: 71, …}
53
: 
{id: 189, at: '24,20', facing: 'N', shape: 'straight', from: 71, …}
54
: 
{id: 190, at: '25,20', facing: 'N', shape: 'straight', from: 71, …}
55
: 
{id: 191, at: '26,20', facing: 'N', shape: 'straight', from: 71, …}
56
: 
{id: 192, at: '27,20', facing: 'N', shape: 'straight', from: 71, …}
57
: 
{id: 193, at: '28,20', facing: 'N', shape: 'straight', from: 71, …}
58
: 
{id: 194, at: '29,20', facing: 'N', shape: 'straight', from: 71, …}
59
: 
{id: 195, at: '30,20', facing: 'N', shape: 'straight', from: 71, …}
60
: 
{id: 196, at: '34,17', facing: 'N', shape: 'straight', from: 71, …}
61
: 
{id: 197, at: '35,17', facing: 'N', shape: 'straight', from: 71, …}
62
: 
{id: 198, at: '27,15', facing: 'N', shape: 'straight', from: 72, …}
63
: 
{id: 199, at: '28,15', facing: 'N', shape: 'straight', from: 72, …}
64
: 
{id: 200, at: '29,15', facing: 'N', shape: 'straight', from: 72, …}
65
: 
{id: 201, at: '30,15', facing: 'N', shape: 'straight', from: 72, …}
66
: 
{id: 202, at: '31,15', facing: 'N', shape: 'straight', from: 72, …}
67
: 
{id: 203, at: '32,15', facing: 'N', shape: 'straight', from: 72, …}
68
: 
{id: 204, at: '33,15', facing: 'N', shape: 'straight', from: 72, …}
69
: 
{id: 205, at: '34,15', facing: 'N', shape: 'straight', from: 72, …}
70
: 
{id: 206, at: '35,15', facing: 'N', shape: 'straight', from: 72, …}
71
: 
{id: 207, at: '37,16', facing: 'N', shape: 'straight', from: 116, …}
72
: 
{id: 208, at: '39,16', facing: 'W', shape: 'corner', from: 116, …}
73
: 
{id: 209, at: '39,11', facing: 'S', shape: 'corner', from: 116, …}
74
: 
{id: 210, at: '39,14', facing: 'W', shape: 'straight', from: 116, …}
75
: 
{id: 211, at: '39,13', facing: 'W', shape: 'straight', from: 116, …}
76
: 
{id: 212, at: '37,11', facing: 'S', shape: 'straight', from: 116, …}
77
: 
{id: 213, at: '29,11', facing: 'S', shape: 'straight', from: 116, …}
78
: 
{id: 214, at: '22,8', facing: 'S', shape: 'straight', from: 116, …}
79
: 
{id: 215, at: '21,8', facing: 'S', shape: 'straight', from: 116, …}
80
: 
{id: 216, at: '19,6', facing: 'W', shape: 'straight', from: 116, …}
81
: 
{id: 217, at: '19,5', facing: 'W', shape: 'straight', from: 116, …}
82
: 
{id: 218, at: '19,4', facing: 'W', shape: 'straight', from: 116, …}
83
: 
{id: 219, at: '22,2', facing: 'S', shape: 'corner', from: 116, …}
84
: 
{id: 220, at: '22,4', facing: 'E', shape: 'straight', from: 116, …}
85
: 
{id: 221, at: '39,31', facing: 'N', shape: 'corner', from: 10, …}
86
: 
{id: 222, at: '37,31', facing: 'W', shape: 'corner', from: 9, …}
87
: 
{id: 223, at: '38,31', facing: 'E', shape: 'straight', from: 8, …}
88
: 
{id: 224, at: '37,33', facing: 'E', shape: 'straight', from: 95, …}
89
: 
{id: 225, at: '39,33', facing: 'E', shape: 'straight', from: 95, …}
90
: 
{id: 226, at: '36,37', facing: 'W', shape: 'corner', from: 32, …}
91
: 
{id: 227, at: '38,37', facing: 'N', shape: 'corner', from: 33, …}
92
: 
{id: 229, at: '32,31', facing: 'S', shape: 'straight', from: 31, …}
93
: 
{id: 230, at: '32,29', facing: 'S', shape: 'straight', from: 30, …}
94
: 
{id: 231, at: '29,30', facing: 'E', shape: 'corner', from: 117, …}
95
: 
{id: 232, at: '29,32', facing: 'E', shape: 'straight', from: 117, …}
96
: 
{id: 239, at: '44,31', facing: 'N', shape: 'straight', from: 35, …}
97
: 
{id: 240, at: '44,33', facing: 'N', shape: 'straight', from: 34, …}
98
: 
{id: 241, at: '47,32', facing: 'S', shape: 'corner', from: 118, …}
99
: 
{id: 242, at: '40,37', facing: 'N', shape: 'straight', from: 33, …}
[100 … 199]
100
: 
{id: 243, at: '41,37', facing: 'N', shape: 'straight', from: 33, …}
101
: 
{id: 244, at: '42,37', facing: 'N', shape: 'straight', from: 33, …}
102
: 
{id: 245, at: '43,37', facing: 'N', shape: 'straight', from: 33, …}
103
: 
{id: 246, at: '44,37', facing: 'N', shape: 'straight', from: 33, …}
104
: 
{id: 247, at: '45,37', facing: 'N', shape: 'straight', from: 33, …}
105
: 
{id: 248, at: '47,37', facing: 'W', shape: 'corner', from: 33, …}
106
: 
{id: 249, at: '47,35', facing: 'W', shape: 'straight', from: 33, …}
107
: 
{id: 252, at: '49,31', facing: 'W', shape: 'straight', from: 74, …}
108
: 
{id: 253, at: '49,30', facing: 'W', shape: 'straight', from: 74, …}
109
: 
{id: 254, at: '43,27', facing: 'N', shape: 'straight', from: 73, …}
110
: 
{id: 255, at: '45,27', facing: 'N', shape: 'straight', from: 73, …}
111
: 
{id: 256, at: '44,27', facing: 'N', shape: 'straight', from: 73, …}
112
: 
{id: 257, at: '47,27', facing: 'W', shape: 'corner', from: 73, …}
113
: 
{id: 258, at: '49,29', facing: 'W', shape: 'straight', from: 74, …}
114
: 
{id: 259, at: '49,28', facing: 'W', shape: 'straight', from: 74, …}
115
: 
{id: 260, at: '49,27', facing: 'W', shape: 'straight', from: 74, …}
116
: 
{id: 261, at: '49,26', facing: 'W', shape: 'straight', from: 74, …}
117
: 
{id: 262, at: '48,24', facing: 'W', shape: 'straight', from: 119, …}
118
: 
{id: 263, at: '48,23', facing: 'W', shape: 'straight', from: 119, …}
119
: 
{id: 264, at: '48,22', facing: 'W', shape: 'straight', from: 119, …}
120
: 
{id: 265, at: '48,21', facing: 'W', shape: 'straight', from: 119, …}
121
: 
{id: 266, at: '48,20', facing: 'W', shape: 'straight', from: 119, …}
122
: 
{id: 267, at: '48,19', facing: 'W', shape: 'straight', from: 119, …}
123
: 
{id: 268, at: '48,18', facing: 'W', shape: 'straight', from: 119, …}
124
: 
{id: 269, at: '48,17', facing: 'W', shape: 'straight', from: 119, …}
125
: 
{id: 270, at: '48,16', facing: 'W', shape: 'straight', from: 119, …}
126
: 
{id: 271, at: '48,15', facing: 'W', shape: 'straight', from: 119, …}
127
: 
{id: 272, at: '48,14', facing: 'W', shape: 'straight', from: 119, …}
128
: 
{id: 273, at: '48,10', facing: 'S', shape: 'corner', from: 119, …}
129
: 
{id: 274, at: '48,13', facing: 'W', shape: 'straight', from: 119, …}
130
: 
{id: 275, at: '48,12', facing: 'W', shape: 'straight', from: 119, …}
131
: 
{id: 276, at: '8,26', facing: 'N', shape: 'corner', from: 11, …}
132
: 
{id: 277, at: '8,28', facing: 'E', shape: 'corner', from: 13, …}
133
: 
{id: 278, at: '9,27', facing: 'S', shape: 'straight', from: 12, …}
134
: 
{id: 279, at: '7,27', facing: 'S', shape: 'straight', from: 12, …}
135
: 
{id: 280, at: '8,27', facing: 'S', shape: 'straight', from: 12, …}
136
: 
{id: 281, at: '8,23', facing: 'S', shape: 'corner', from: 11, …}
137
: 
{id: 282, at: '5,22', facing: 'S', shape: 'straight', from: 96, …}
138
: 
{id: 283, at: '5,24', facing: 'S', shape: 'straight', from: 96, …}
139
: 
{id: 284, at: '3,23', facing: 'S', shape: 'straight', from: 43, …}
140
: 
{id: 285, at: '3,21', facing: 'S', shape: 'straight', from: 42, …}
141
: 
{id: 286, at: '0,22', facing: 'E', shape: 'corner', from: 120, …}
142
: 
{id: 287, at: '5,26', facing: 'S', shape: 'straight', from: 97, …}
143
: 
{id: 288, at: '5,28', facing: 'S', shape: 'straight', from: 97, …}
144
: 
{id: 289, at: '3,25', facing: 'S', shape: 'straight', from: 44, …}
145
: 
{id: 290, at: '2,27', facing: 'E', shape: 'corner', from: 45, …}
146
: 
{id: 291, at: '1,25', facing: 'E', shape: 'corner', from: 44, …}
147
: 
{id: 292, at: '0,24', facing: 'E', shape: 'straight', from: 120, …}
148
: 
{id: 293, at: '0,25', facing: 'E', shape: 'straight', from: 120, …}
149
: 
{id: 294, at: '0,26', facing: 'E', shape: 'straight', from: 120, …}
150
: 
{id: 295, at: '0,27', facing: 'E', shape: 'straight', from: 120, …}
151
: 
{id: 296, at: '0,28', facing: 'E', shape: 'straight', from: 120, …}
152
: 
{id: 297, at: '0,29', facing: 'E', shape: 'straight', from: 120, …}
153
: 
{id: 298, at: '1,27', facing: 'E', shape: 'straight', from: 44, …}
154
: 
{id: 299, at: '1,28', facing: 'E', shape: 'straight', from: 44, …}
155
: 
{id: 300, at: '1,29', facing: 'E', shape: 'straight', from: 44, …}
156
: 
{id: 301, at: '7,31', facing: 'E', shape: 'straight', from: 98, …}
157
: 
{id: 302, at: '9,31', facing: 'E', shape: 'straight', from: 98, …}
158
: 
{id: 303, at: '6,33', facing: 'E', shape: 'straight', from: 46, …}
159
: 
{id: 304, at: '8,33', facing: 'E', shape: 'straight', from: 47, …}
160
: 
{id: 305, at: '2,30', facing: 'N', shape: 'corner', from: 45, …}
161
: 
{id: 306, at: '5,30', facing: 'S', shape: 'corner', from: 45, …}
162
: 
{id: 307, at: '5,32', facing: 'E', shape: 'straight', from: 45, …}
163
: 
{id: 308, at: '5,33', facing: 'E', shape: 'straight', from: 45, …}
164
: 
{id: 309, at: '5,34', facing: 'E', shape: 'straight', from: 45, …}
165
: 
{id: 310, at: '5,35', facing: 'E', shape: 'straight', from: 45, …}
166
: 
{id: 311, at: '7,35', facing: 'E', shape: 'straight', from: 121, …}
167
: 
{id: 312, at: '5,36', facing: 'E', shape: 'straight', from: 45, …}
168
: 
{id: 313, at: '5,37', facing: 'E', shape: 'straight', from: 45, …}
169
: 
{id: 314, at: '1,31', facing: 'N', shape: 'corner', from: 44, …}
170
: 
{id: 315, at: '4,31', facing: 'S', shape: 'corner', from: 44, …}
171
: 
{id: 316, at: '0,30', facing: 'E', shape: 'straight', from: 120, …}
172
: 
{id: 317, at: '0,31', facing: 'E', shape: 'straight', from: 120, …}
173
: 
{id: 318, at: '0,32', facing: 'E', shape: 'straight', from: 120, …}
174
: 
{id: 319, at: '0,34', facing: 'N', shape: 'corner', from: 120, …}
175
: 
{id: 320, at: '4,34', facing: 'W', shape: 'corner', from: 44, …}
176
: 
{id: 321, at: '2,35', facing: 'E', shape: 'straight', from: 75, …}
177
: 
{id: 322, at: '2,36', facing: 'E', shape: 'straight', from: 75, …}
178
: 
{id: 323, at: '2,37', facing: 'E', shape: 'straight', from: 75, …}
179
: 
{id: 324, at: '7,37', facing: 'N', shape: 'corner', from: 121, …}
180
: 
{id: 325, at: '10,37', facing: 'S', shape: 'corner', from: 121, …}
181
: 
{id: 326, at: '5,38', facing: 'E', shape: 'straight', from: 45, …}
182
: 
{id: 327, at: '5,40', facing: 'N', shape: 'corner', from: 45, …}
183
: 
{id: 328, at: '10,40', facing: 'W', shape: 'corner', from: 121, …}
184
: 
{id: 329, at: '8,40', facing: 'S', shape: 'straight', from: 121, …}
185
: 
{id: 330, at: '7,42', facing: 'N', shape: 'corner', from: 76, …}
186
: 
{id: 331, at: '2,38', facing: 'E', shape: 'straight', from: 75, …}
187
: 
{id: 332, at: '2,39', facing: 'E', shape: 'straight', from: 75, …}
188
: 
{id: 333, at: '2,40', facing: 'E', shape: 'straight', from: 75, …}
189
: 
{id: 334, at: '2,41', facing: 'E', shape: 'straight', from: 75, …}
190
: 
{id: 335, at: '2,42', facing: 'E', shape: 'straight', from: 75, …}
191
: 
{id: 336, at: '2,44', facing: 'N', shape: 'corner', from: 75, …}
192
: 
{id: 337, at: '4,44', facing: 'N', shape: 'straight', from: 75, …}
193
: 
{id: 338, at: '5,44', facing: 'N', shape: 'straight', from: 75, …}
194
: 
{id: 339, at: '6,44', facing: 'N', shape: 'straight', from: 75, …}
195
: 
{id: 340, at: '7,44', facing: 'N', shape: 'straight', from: 75, …}
196
: 
{id: 341, at: '8,44', facing: 'N', shape: 'straight', from: 75, …}
197
: 
{id: 342, at: '10,43', facing: 'N', shape: 'straight', from: 122, …}
198
: 
{id: 343, at: '11,43', facing: 'N', shape: 'straight', from: 122, …}
199
: 
{id: 344, at: '12,30', facing: 'E', shape: 'straight', from: 14, …}
[200 … 299]
200
: 
{id: 345, at: '11,32', facing: 'E', shape: 'straight', from: 99, …}
201
: 
{id: 346, at: '13,32', facing: 'E', shape: 'straight', from: 99, …}
202
: 
{id: 347, at: '10,34', facing: 'E', shape: 'straight', from: 48, …}
203
: 
{id: 348, at: '10,36', facing: 'N', shape: 'corner', from: 48, …}
204
: 
{id: 349, at: '12,35', facing: 'N', shape: 'corner', from: 49, …}
205
: 
{id: 350, at: '13,36', facing: 'S', shape: 'corner', from: 48, …}
206
: 
{id: 351, at: '13,43', facing: 'W', shape: 'corner', from: 122, …}
207
: 
{id: 352, at: '13,41', facing: 'W', shape: 'straight', from: 122, …}
208
: 
{id: 353, at: '13,40', facing: 'W', shape: 'straight', from: 122, …}
209
: 
{id: 354, at: '13,39', facing: 'W', shape: 'straight', from: 122, …}
210
: 
{id: 355, at: '14,38', facing: 'N', shape: 'straight', from: 77, …}
211
: 
{id: 356, at: '15,38', facing: 'N', shape: 'straight', from: 77, …}
212
: 
{id: 357, at: '19,26', facing: 'W', shape: 'corner', from: 15, …}
213
: 
{id: 358, at: '19,23', facing: 'E', shape: 'corner', from: 15, …}
214
: 
{id: 359, at: '22,22', facing: 'N', shape: 'straight', from: 100, …}
215
: 
{id: 360, at: '22,24', facing: 'N', shape: 'straight', from: 100, …}
216
: 
{id: 361, at: '24,23', facing: 'N', shape: 'straight', from: 50, …}
217
: 
{id: 362, at: '24,25', facing: 'N', shape: 'straight', from: 51, …}
218
: 
{id: 363, at: '27,24', facing: 'W', shape: 'corner', from: 123, …}
219
: 
{id: 364, at: '27,21', facing: 'E', shape: 'corner', from: 123, …}
220
: 
{id: 365, at: '30,21', facing: 'S', shape: 'corner', from: 123, …}
221
: 
{id: 366, at: '30,26', facing: 'W', shape: 'corner', from: 123, …}
222
: 
{id: 367, at: '30,23', facing: 'E', shape: 'straight', from: 123, …}
223
: 
{id: 368, at: '30,24', facing: 'E', shape: 'straight', from: 123, …}
224
: 
{id: 369, at: '28,26', facing: 'S', shape: 'straight', from: 123, …}
225
: 
{id: 370, at: '27,26', facing: 'S', shape: 'straight', from: 123, …}
226
: 
{id: 371, at: '25,26', facing: 'E', shape: 'corner', from: 123, …}
227
: 
{id: 372, at: '15,28', facing: 'N', shape: 'straight', from: 16, …}
228
: 
{id: 373, at: '16,28', facing: 'N', shape: 'straight', from: 16, …}
229
: 
{id: 374, at: '17,28', facing: 'N', shape: 'straight', from: 16, …}
230
: 
{id: 375, at: '19,27', facing: 'N', shape: 'straight', from: 101, …}
231
: 
{id: 376, at: '19,29', facing: 'N', shape: 'straight', from: 101, …}
232
: 
{id: 377, at: '25,28', facing: 'E', shape: 'straight', from: 123, …}
233
: 
{id: 378, at: '25,29', facing: 'E', shape: 'straight', from: 123, …}
234
: 
{id: 379, at: '23,28', facing: 'S', shape: 'corner', from: 52, …}
235
: 
{id: 380, at: '21,28', facing: 'N', shape: 'straight', from: 52, …}
236
: 
{id: 381, at: '20,20', facing: 'N', shape: 'straight', from: 71, …}
237
: 
{id: 382, at: '16,20', facing: 'N', shape: 'straight', from: 71, …}
238
: 
{id: 383, at: '15,20', facing: 'N', shape: 'straight', from: 71, …}
239
: 
{id: 384, at: '14,20', facing: 'N', shape: 'straight', from: 71, …}
240
: 
{id: 385, at: '27,40', facing: 'N', shape: 'straight', from: 17, …}
241
: 
{id: 386, at: '29,39', facing: 'N', shape: 'straight', from: 102, …}
242
: 
{id: 387, at: '29,41', facing: 'N', shape: 'straight', from: 102, …}
243
: 
{id: 388, at: '31,40', facing: 'N', shape: 'straight', from: 54, …}
244
: 
{id: 389, at: '31,42', facing: 'N', shape: 'straight', from: 55, …}
245
: 
{id: 390, at: '34,41', facing: 'W', shape: 'corner', from: 124, …}
246
: 
{id: 391, at: '34,38', facing: 'S', shape: 'corner', from: 124, …}
247
: 
{id: 392, at: '32,38', facing: 'S', shape: 'straight', from: 124, …}
248
: 
{id: 393, at: '31,38', facing: 'S', shape: 'straight', from: 124, …}
249
: 
{id: 394, at: '30,38', facing: 'S', shape: 'straight', from: 124, …}
250
: 
{id: 395, at: '29,38', facing: 'S', shape: 'straight', from: 124, …}
251
: 
{id: 396, at: '28,38', facing: 'S', shape: 'straight', from: 124, …}
252
: 
{id: 398, at: '22,30', facing: 'S', shape: 'corner', from: 53, …}
253
: 
{id: 399, at: '23,30', facing: 'E', shape: 'straight', from: 52, …}
254
: 
{id: 400, at: '23,31', facing: 'E', shape: 'straight', from: 52, …}
255
: 
{id: 401, at: '23,32', facing: 'E', shape: 'straight', from: 52, …}
256
: 
{id: 402, at: '22,33', facing: 'W', shape: 'corner', from: 53, …}
257
: 
{id: 403, at: '14,33', facing: 'N', shape: 'corner', from: 53, …}
258
: 
{id: 404, at: '14,35', facing: 'N', shape: 'straight', from: 49, …}
259
: 
{id: 405, at: '15,35', facing: 'N', shape: 'straight', from: 49, …}
260
: 
{id: 406, at: '19,33', facing: 'N', shape: 'corner', from: 53, …}
261
: 
{id: 407, at: '19,30', facing: 'S', shape: 'corner', from: 53, …}
262
: 
{id: 408, at: '14,30', facing: 'E', shape: 'corner', from: 53, …}
263
: 
{id: 409, at: '17,30', facing: 'S', shape: 'straight', from: 53, …}
264
: 
{id: 410, at: '16,30', facing: 'S', shape: 'straight', from: 53, …}
265
: 
{id: 411, at: '23,34', facing: 'W', shape: 'corner', from: 52, …}
266
: 
{id: 412, at: '21,34', facing: 'S', shape: 'straight', from: 52, …}
267
: 
{id: 413, at: '20,34', facing: 'S', shape: 'straight', from: 52, …}
268
: 
{id: 414, at: '19,34', facing: 'S', shape: 'straight', from: 52, …}
269
: 
{id: 415, at: '24,31', facing: 'E', shape: 'straight', from: 103, …}
270
: 
{id: 416, at: '24,32', facing: 'E', shape: 'straight', from: 103, …}
271
: 
{id: 417, at: '26,31', facing: 'E', shape: 'straight', from: 103, …}
272
: 
{id: 418, at: '26,32', facing: 'E', shape: 'straight', from: 103, …}
273
: 
{id: 419, at: '26,33', facing: 'E', shape: 'straight', from: 103, …}
274
: 
{id: 420, at: '26,34', facing: 'E', shape: 'straight', from: 103, …}
275
: 
{id: 421, at: '26,38', facing: 'N', shape: 'corner', from: 124, …}
276
: 
{id: 422, at: '26,35', facing: 'E', shape: 'straight', from: 103, …}
277
: 
{id: 423, at: '25,36', facing: 'S', shape: 'straight', from: 78, …}
278
: 
{id: 424, at: '17,34', facing: 'N', shape: 'straight', from: 125, …}
279
: 
{id: 425, at: '18,36', facing: 'N', shape: 'corner', from: 79, …}
280
: 
{id: 426, at: '16,38', facing: 'N', shape: 'straight', from: 77, …}
281
: 
{id: 427, at: '18,38', facing: 'S', shape: 'corner', from: 77, …}
282
: 
{id: 428, at: '21,36', facing: 'S', shape: 'corner', from: 79, …}
283
: 
{id: 429, at: '23,36', facing: 'E', shape: 'corner', from: 78, …}
284
: 
{id: 430, at: '26,42', facing: 'E', shape: 'straight', from: 18, …}
285
: 
{id: 431, at: '22,40', facing: 'E', shape: 'straight', from: 126, …}
286
: 
{id: 432, at: '22,41', facing: 'E', shape: 'straight', from: 126, …}
287
: 
{id: 433, at: '22,42', facing: 'E', shape: 'straight', from: 126, …}
288
: 
{id: 434, at: '22,43', facing: 'E', shape: 'straight', from: 126, …}
289
: 
{id: 435, at: '22,39', facing: 'E', shape: 'straight', from: 126, …}
290
: 
{id: 436, at: '22,44', facing: 'E', shape: 'straight', from: 126, …}
291
: 
{id: 437, at: '22,47', facing: 'N', shape: 'corner', from: 56, …}
292
: 
{id: 438, at: '25,47', facing: 'W', shape: 'corner', from: 56, …}
293
: 
{id: 439, at: '25,45', facing: 'E', shape: 'straight', from: 56, …}
294
: 
{id: 440, at: '25,44', facing: 'E', shape: 'straight', from: 56, …}
295
: 
{id: 441, at: '20,45', facing: 'E', shape: 'corner', from: 80, …}
296
: 
{id: 442, at: '18,40', facing: 'E', shape: 'straight', from: 77, …}
297
: 
{id: 443, at: '18,41', facing: 'E', shape: 'straight', from: 77, …}
298
: 
{id: 444, at: '18,42', facing: 'E', shape: 'straight', from: 77, …}
299
: 
{id: 445, at: '18,43', facing: 'E', shape: 'straight', from: 77, …}
[300 … 399]
300
: 
{id: 446, at: '18,44', facing: 'E', shape: 'straight', from: 77, …}
301
: 
{id: 447, at: '18,45', facing: 'E', shape: 'straight', from: 77, …}
302
: 
{id: 448, at: '18,46', facing: 'E', shape: 'straight', from: 77, …}
303
: 
{id: 449, at: '19,48', facing: 'E', shape: 'straight', from: 127, …}
304
: 
{id: 450, at: '19,49', facing: 'E', shape: 'straight', from: 127, …}
305
: 
{id: 451, at: '47,43', facing: 'W', shape: 'corner', from: 19, …}
306
: 
{id: 452, at: '49,43', facing: 'N', shape: 'corner', from: 21, …}
307
: 
{id: 453, at: '48,42', facing: 'E', shape: 'straight', from: 20, …}
308
: 
{id: 454, at: '48,43', facing: 'E', shape: 'straight', from: 20, …}
309
: 
{id: 455, at: '48,44', facing: 'E', shape: 'straight', from: 20, …}
310
: 
{id: 456, at: '58,38', facing: 'W', shape: 'corner', from: 24, …}
311
: 
{id: 457, at: '57,39', facing: 'N', shape: 'straight', from: 23, …}
312
: 
{id: 458, at: '58,39', facing: 'N', shape: 'straight', from: 23, …}
313
: 
{id: 459, at: '59,39', facing: 'N', shape: 'straight', from: 23, …}
314
: 
{id: 460, at: '44,42', facing: 'S', shape: 'straight', from: 104, …}
315
: 
{id: 461, at: '44,44', facing: 'S', shape: 'straight', from: 104, …}
316
: 
{id: 462, at: '52,44', facing: 'N', shape: 'straight', from: 105, …}
317
: 
{id: 463, at: '52,42', facing: 'N', shape: 'straight', from: 105, …}
318
: 
{id: 464, at: '49,46', facing: 'E', shape: 'straight', from: 106, …}
319
: 
{id: 465, at: '47,46', facing: 'E', shape: 'straight', from: 106, …}
320
: 
{id: 466, at: '61,40', facing: 'N', shape: 'straight', from: 107, …}
321
: 
{id: 467, at: '61,38', facing: 'N', shape: 'straight', from: 107, …}
322
: 
{id: 468, at: '59,35', facing: 'W', shape: 'straight', from: 108, …}
323
: 
{id: 469, at: '57,35', facing: 'W', shape: 'straight', from: 108, …}
324
: 
{id: 470, at: '54,43', facing: 'N', shape: 'straight', from: 57, …}
325
: 
{id: 471, at: '54,45', facing: 'N', shape: 'straight', from: 58, …}
326
: 
{id: 472, at: '57,40', facing: 'N', shape: 'straight', from: 22, …}
327
: 
{id: 473, at: '59,40', facing: 'S', shape: 'corner', from: 22, …}
328
: 
{id: 474, at: '57,44', facing: 'S', shape: 'corner', from: 128, …}
329
: 
{id: 475, at: '59,43', facing: 'N', shape: 'corner', from: 22, …}
330
: 
{id: 476, at: '62,43', facing: 'S', shape: 'corner', from: 22, …}
331
: 
{id: 477, at: '58,33', facing: 'W', shape: 'straight', from: 62, …}
332
: 
{id: 478, at: '60,33', facing: 'W', shape: 'straight', from: 61, …}
333
: 
{id: 479, at: '64,39', facing: 'W', shape: 'corner', from: 60, …}
334
: 
{id: 480, at: '59,30', facing: 'E', shape: 'corner', from: 129, …}
335
: 
{id: 481, at: '61,30', facing: 'N', shape: 'straight', from: 129, …}
336
: 
{id: 482, at: '62,30', facing: 'N', shape: 'straight', from: 129, …}
337
: 
{id: 483, at: '64,30', facing: 'S', shape: 'corner', from: 129, …}
338
: 
{id: 484, at: '64,37', facing: 'W', shape: 'straight', from: 60, …}
339
: 
{id: 485, at: '64,36', facing: 'W', shape: 'straight', from: 60, …}
340
: 
{id: 486, at: '64,35', facing: 'W', shape: 'straight', from: 60, …}
341
: 
{id: 487, at: '64,34', facing: 'W', shape: 'straight', from: 60, …}
342
: 
{id: 488, at: '64,33', facing: 'W', shape: 'straight', from: 60, …}
343
: 
{id: 489, at: '64,41', facing: 'S', shape: 'corner', from: 59, …}
344
: 
{id: 490, at: '64,43', facing: 'E', shape: 'straight', from: 59, …}
345
: 
{id: 491, at: '64,44', facing: 'E', shape: 'straight', from: 59, …}
346
: 
{id: 492, at: '64,45', facing: 'E', shape: 'straight', from: 59, …}
347
: 
{id: 493, at: '64,48', facing: 'W', shape: 'straight', from: 133, …}
348
: 
{id: 494, at: '64,47', facing: 'W', shape: 'straight', from: 133, …}
349
: 
{id: 495, at: '46,49', facing: 'W', shape: 'corner', from: 65, …}
350
: 
{id: 496, at: '48,49', facing: 'N', shape: 'corner', from: 66, …}
351
: 
{id: 497, at: '42,43', facing: 'S', shape: 'straight', from: 64, …}
352
: 
{id: 498, at: '42,41', facing: 'S', shape: 'straight', from: 63, …}
353
: 
{id: 499, at: '39,42', facing: 'E', shape: 'corner', from: 130, …}
354
: 
{id: 500, at: '39,49', facing: 'N', shape: 'corner', from: 130, …}
355
: 
{id: 501, at: '44,49', facing: 'S', shape: 'straight', from: 65, …}
356
: 
{id: 502, at: '43,49', facing: 'S', shape: 'straight', from: 65, …}
357
: 
{id: 503, at: '42,49', facing: 'S', shape: 'straight', from: 65, …}
358
: 
{id: 504, at: '39,44', facing: 'E', shape: 'straight', from: 130, …}
359
: 
{id: 505, at: '39,45', facing: 'E', shape: 'straight', from: 130, …}
360
: 
{id: 506, at: '39,46', facing: 'E', shape: 'straight', from: 130, …}
361
: 
{id: 507, at: '39,47', facing: 'E', shape: 'straight', from: 130, …}
362
: 
{id: 508, at: '57,49', facing: 'W', shape: 'corner', from: 128, …}
363
: 
{id: 509, at: '57,46', facing: 'E', shape: 'straight', from: 128, …}
364
: 
{id: 510, at: '57,47', facing: 'E', shape: 'straight', from: 128, …}
365
: 
{id: 511, at: '50,49', facing: 'N', shape: 'straight', from: 66, …}
366
: 
{id: 512, at: '51,49', facing: 'N', shape: 'straight', from: 66, …}
367
: 
{id: 513, at: '52,49', facing: 'N', shape: 'straight', from: 66, …}
368
: 
{id: 514, at: '53,49', facing: 'N', shape: 'straight', from: 66, …}
369
: 
{id: 515, at: '54,49', facing: 'N', shape: 'straight', from: 66, …}
370
: 
{id: 516, at: '41,51', facing: 'N', shape: 'corner', from: 83, …}
371
: 
{id: 517, at: '55,51', facing: 'W', shape: 'corner', from: 84, …}
372
: 
{id: 518, at: '53,51', facing: 'S', shape: 'straight', from: 84, …}
373
: 
{id: 519, at: '52,51', facing: 'S', shape: 'straight', from: 84, …}
374
: 
{id: 520, at: '51,51', facing: 'S', shape: 'straight', from: 84, …}
375
: 
{id: 521, at: '43,51', facing: 'N', shape: 'straight', from: 83, …}
376
: 
{id: 522, at: '44,51', facing: 'N', shape: 'straight', from: 83, …}
377
: 
{id: 523, at: '46,51', facing: 'S', shape: 'corner', from: 83, …}
378
: 
{id: 524, at: '50,51', facing: 'S', shape: 'straight', from: 84, …}
379
: 
{id: 525, at: '48,51', facing: 'E', shape: 'corner', from: 84, …}
380
: 
{id: 526, at: '66,46', facing: 'W', shape: 'corner', from: 82, …}
381
: 
{id: 527, at: '66,32', facing: 'S', shape: 'corner', from: 81, …}
382
: 
{id: 528, at: '66,39', facing: 'N', shape: 'corner', from: 81, …}
383
: 
{id: 529, at: '66,34', facing: 'E', shape: 'straight', from: 81, …}
384
: 
{id: 530, at: '66,35', facing: 'E', shape: 'straight', from: 81, …}
385
: 
{id: 531, at: '66,36', facing: 'E', shape: 'straight', from: 81, …}
386
: 
{id: 532, at: '66,37', facing: 'E', shape: 'straight', from: 81, …}
387
: 
{id: 533, at: '61,46', facing: 'E', shape: 'straight', from: 109, …}
388
: 
{id: 534, at: '63,46', facing: 'E', shape: 'straight', from: 109, …}
389
: 
{id: 535, at: '60,48', facing: 'E', shape: 'straight', from: 67, …}
390
: 
{id: 536, at: '62,48', facing: 'E', shape: 'straight', from: 68, …}
391
: 
{id: 537, at: '61,51', facing: 'N', shape: 'corner', from: 133, …}
392
: 
{id: 538, at: '64,51', facing: 'W', shape: 'corner', from: 133, …}
393
: 
{id: 539, at: '64,49', facing: 'W', shape: 'straight', from: 133, …}
394
: 
{id: 540, at: '66,41', facing: 'E', shape: 'corner', from: 82, …}
395
: 
{id: 541, at: '66,44', facing: 'W', shape: 'straight', from: 82, …}
396
: 
{id: 542, at: '66,43', facing: 'W', shape: 'straight', from: 82, …}
397
: 
{id: 543, at: '56,32', facing: 'W', shape: 'straight', from: 25, …}
398
: 
{id: 544, at: '56,31', facing: 'W', shape: 'straight', from: 25, …}
399
: 
{id: 545, at: '55,29', facing: 'W', shape: 'straight', from: 110, …}
[400 … 499]
400
: 
{id: 546, at: '57,29', facing: 'W', shape: 'straight', from: 110, …}
401
: 
{id: 547, at: '56,27', facing: 'W', shape: 'straight', from: 69, …}
402
: 
{id: 548, at: '58,27', facing: 'W', shape: 'straight', from: 70, …}
403
: 
{id: 549, at: '57,24', facing: 'S', shape: 'corner', from: 134, …}
404
: 
{id: 550, at: '55,24', facing: 'S', shape: 'straight', from: 134, …}
405
: 
{id: 551, at: '54,24', facing: 'S', shape: 'straight', from: 134, …}
406
: 
{id: 552, at: '52,24', facing: 'E', shape: 'corner', from: 134, …}
407
: 
{id: 553, at: '52,26', facing: 'E', shape: 'straight', from: 134, …}
408
: 
{id: 554, at: '52,27', facing: 'E', shape: 'straight', from: 134, …}
409
: 
{id: 555, at: '52,28', facing: 'E', shape: 'straight', from: 134, …}
410
: 
{id: 556, at: '52,29', facing: 'E', shape: 'straight', from: 134, …}
411
: 
{id: 557, at: '52,30', facing: 'E', shape: 'straight', from: 134, …}
412
: 
{id: 558, at: '52,31', facing: 'E', shape: 'straight', from: 134, …}
413
: 
{id: 559, at: '52,32', facing: 'E', shape: 'straight', from: 134, …}
414
: 
{id: 560, at: '52,33', facing: 'E', shape: 'straight', from: 134, …}
415
: 
{id: 561, at: '52,35', facing: 'N', shape: 'corner', from: 134, …}
416
: 
{id: 562, at: '55,35', facing: 'S', shape: 'corner', from: 134, …}
417
: 
{id: 563, at: '55,38', facing: 'E', shape: 'straight', from: 134, …}
418
: 
{id: 564, at: '55,37', facing: 'E', shape: 'straight', from: 134, …}
419
: 
{id: 565, at: '55,39', facing: 'E', shape: 'straight', from: 134, …}
420
: 
{id: 566, at: '55,40', facing: 'E', shape: 'straight', from: 134, …}
421
: 
{id: 567, at: '55,42', facing: 'N', shape: 'corner', from: 134, …}
422
: 
{id: 568, at: '58,42', facing: 'S', shape: 'corner', from: 134, …}
423
: 
{id: 569, at: '58,44', facing: 'E', shape: 'straight', from: 134, …}
424
: 
{id: 570, at: '58,45', facing: 'E', shape: 'straight', from: 134, …}
425
: 
{id: 571, at: '58,46', facing: 'E', shape: 'straight', from: 134, …}
426
: 
{id: 572, at: '58,47', facing: 'E', shape: 'straight', from: 134, …}
427
: 
{id: 573, at: '58,48', facing: 'E', shape: 'straight', from: 134, …}
428
: 
{id: 574, at: '58,50', facing: 'E', shape: 'straight', from: 134, …}
429
: 
{id: 575, at: '58,49', facing: 'E', shape: 'straight', from: 134, …}
430
: 
{id: 576, at: '57,53', facing: 'W', shape: 'corner', from: 111, …}
431
: 
{id: 577, at: '59,53', facing: 'N', shape: 'corner', from: 111, …}
432
: 
{id: 578, at: '54,53', facing: 'E', shape: 'corner', from: 111, …}
433
: 
{id: 579, at: '54,56', facing: 'W', shape: 'corner', from: 111, …}
434
: 
{id: 580, at: '47,54', facing: 'E', shape: 'straight', from: 131, …}
435
: 
{id: 581, at: '47,56', facing: 'N', shape: 'corner', from: 131, …}
436
: 
{id: 582, at: '49,56', facing: 'N', shape: 'straight', from: 131, …}
437
: 
{id: 583, at: '50,56', facing: 'N', shape: 'straight', from: 131, …}
438
: 
{id: 584, at: '51,56', facing: 'N', shape: 'straight', from: 131, …}
439
: 
{id: 585, at: '52,57', facing: 'E', shape: 'straight', from: 85, …}
440
: 
{id: 586, at: '52,58', facing: 'E', shape: 'straight', from: 85, …}
441
: 
{id: 587, at: '70,40', facing: 'S', shape: 'corner', from: 132, …}
442
: 
{id: 588, at: '70,42', facing: 'E', shape: 'straight', from: 132, …}
443
: 
{id: 589, at: '70,43', facing: 'E', shape: 'straight', from: 132, …}
444
: 
{id: 590, at: '70,44', facing: 'E', shape: 'straight', from: 132, …}
445
: 
{id: 591, at: '70,45', facing: 'E', shape: 'straight', from: 132, …}
446
: 
{id: 592, at: '70,46', facing: 'E', shape: 'straight', from: 132, …}
447
: 
{id: 593, at: '70,48', facing: 'E', shape: 'straight', from: 132, …}
448
: 
{id: 594, at: '70,49', facing: 'E', shape: 'straight', from: 132, …}
449
: 
{id: 595, at: '70,47', facing: 'E', shape: 'straight', from: 132, …}
450
: 
{id: 596, at: '70,50', facing: 'E', shape: 'straight', from: 132, …}
451
: 
{id: 597, at: '70,51', facing: 'E', shape: 'straight', from: 132, …}
452
: 
{id: 598, at: '70,53', facing: 'W', shape: 'corner', from: 132, …}
453
: 
{id: 599, at: '68,53', facing: 'S', shape: 'straight', from: 132, …}
454
: 
{id: 600, at: '67,53', facing: 'S', shape: 'straight', from: 132, …}
455
: 
{id: 601, at: '66,53', facing: 'S', shape: 'straight', from: 132, …}
456
: 
{id: 602, at: '65,53', facing: 'S', shape: 'straight', from: 132, …}
457
: 
{id: 603, at: '63,53', facing: 'S', shape: 'straight', from: 132, …}
458
: 
{id: 604, at: '62,53', facing: 'S', shape: 'straight', from: 132, …}
459
: 
{id: 605, at: '64,53', facing: 'S', shape: 'straight', from: 132, …}
460
: 
{id: 606, at: '52,59', facing: 'E', shape: 'straight', from: 85, …}
461
: 
{id: 607, at: '54,58', facing: 'E', shape: 'corner', from: 86, …}
462
: 
{id: 608, at: '61,58', facing: 'W', shape: 'corner', from: 86, …}
463
: 
{id: 609, at: '56,58', facing: 'S', shape: 'straight', from: 86, …}
464
: 
{id: 610, at: '57,58', facing: 'S', shape: 'straight', from: 86, …}
465
: 
{id: 611, at: '58,58', facing: 'S', shape: 'straight', from: 86, …}
466
: 
{id: 612, at: '59,58', facing: 'S', shape: 'straight', from: 86, …}
467
: 
{id: 613, at: '61,54', facing: 'E', shape: 'straight', from: 86, …}
468
: 
{id: 614, at: '61,55', facing: 'E', shape: 'straight', from: 86, …}
469
: 
{id: 615, at: '61,56', facing: 'E', shape: 'straight', from: 86, …}
470
: 
{id: 616, at: '53,62', facing: 'W', shape: 'corner', from: 135, …}
471
: 
{id: 617, at: '50,62', facing: 'N', shape: 'corner', from: 135, …}
472
: 
{id: 618, at: '50,60', facing: 'W', shape: 'straight', from: 135, …}
473
: 
{id: 619, at: '50,59', facing: 'W', shape: 'straight', from: 135, …}
474
: 
{id: 620, at: '50,57', facing: 'S', shape: 'corner', from: 135, …}
475
: 
{id: 621, at: '48,57', facing: 'S', shape: 'straight', from: 135, …}
476
: 
{id: 622, at: '47,57', facing: 'S', shape: 'straight', from: 135, …}
477
: 
{id: 623, at: '46,57', facing: 'S', shape: 'straight', from: 135, …}
478
: 
{id: 624, at: '45,57', facing: 'S', shape: 'straight', from: 135, …}
479
: 
{id: 625, at: '44,57', facing: 'S', shape: 'straight', from: 135, …}
480
: 
{id: 626, at: '43,57', facing: 'S', shape: 'straight', from: 135, …}
481
: 
{id: 627, at: '42,57', facing: 'S', shape: 'straight', from: 135, …}
482
: 
{id: 628, at: '41,57', facing: 'S', shape: 'straight', from: 135, …}
483
: 
{id: 629, at: '40,57', facing: 'S', shape: 'straight', from: 135, …}
484
: 
{id: 630, at: '39,57', facing: 'S', shape: 'straight', from: 135, …}
485
: 
{id: 631, at: '19,51', facing: 'N', shape: 'corner', from: 127, …}
486
: 
{id: 632, at: '22,51', facing: 'W', shape: 'corner', from: 127, …}
487
: 
{id: 633, at: '22,48', facing: 'E', shape: 'corner', from: 127, …}
488
: 
{id: 634, at: '37,57', facing: 'N', shape: 'corner', from: 135, …}
489
: 
{id: 635, at: '37,55', facing: 'W', shape: 'straight', from: 135, …}
490
: 
{id: 636, at: '37,54', facing: 'W', shape: 'straight', from: 135, …}
491
: 
{id: 637, at: '37,53', facing: 'W', shape: 'straight', from: 135, …}
492
: 
{id: 638, at: '37,52', facing: 'W', shape: 'straight', from: 135, …}
493
: 
{id: 639, at: '37,50', facing: 'W', shape: 'straight', from: 135, …}
494
: 
{id: 640, at: '37,51', facing: 'W', shape: 'straight', from: 135, …}
495
: 
{id: 641, at: '37,48', facing: 'S', shape: 'corner', from: 135, …}
496
: 
{id: 642, at: '24,48', facing: 'N', shape: 'straight', from: 127, …}
497
: 
{id: 643, at: '25,48', facing: 'N', shape: 'straight', from: 127, …}
498
: 
{id: 644, at: '26,48', facing: 'N', shape: 'straight', from: 127, …}
499
: 
{id: 645, at: '27,48', facing: 'N', shape: 'straight', from: 127, …}
[500 … 599]
500
: 
{id: 646, at: '28,48', facing: 'N', shape: 'straight', from: 127, …}
501
: 
{id: 647, at: '29,48', facing: 'N', shape: 'straight', from: 127, …}
502
: 
{id: 648, at: '34,48', facing: 'S', shape: 'straight', from: 135, …}
503
: 
{id: 649, at: '35,48', facing: 'S', shape: 'straight', from: 135, …}
504
: 
{id: 650, at: '33,48', facing: 'S', shape: 'straight', from: 135, …}
505
: 
{id: 651, at: '32,48', facing: 'S', shape: 'straight', from: 135, …}
506
: 
{id: 652, at: '31,48', facing: 'S', shape: 'straight', from: 135, …}
507
: 
{id: 653, at: '30,49', facing: 'E', shape: 'straight', from: 87, …}
508
: 
{id: 654, at: '30,50', facing: 'E', shape: 'straight', from: 87, …}
509
: 
{id: 655, at: '4,20', facing: 'N', shape: 'corner', from: 71, …}
510
: 
{id: 656, at: '4,15', facing: 'E', shape: 'corner', from: 71, …}
511
: 
{id: 657, at: '6,15', facing: 'S', shape: 'straight', from: 71, …}
512
: 
{id: 658, at: '9,11', facing: 'S', shape: 'straight', from: 112, …}
513
: 
{id: 659, at: '7,11', facing: 'E', shape: 'corner', from: 112, …}
514
: 
{id: 660, at: '7,13', facing: 'E', shape: 'straight', from: 112, …}
515
: 
{id: 661, at: '7,14', facing: 'E', shape: 'straight', from: 112, …}
516
: 
{id: 662, at: '13,18', facing: 'S', shape: 'straight', from: 36, …}
517
: 
{id: 663, at: '11,18', facing: 'S', shape: 'straight', from: 36, …}
518
: 
{id: 664, at: '12,18', facing: 'S', shape: 'straight', from: 36, …}
519
: 
{id: 665, at: '10,18', facing: 'S', shape: 'straight', from: 36, …}
520
: 
{id: 666, at: '7,18', facing: 'N', shape: 'corner', from: 36, …}
521
: 
{id: 667, at: '9,18', facing: 'S', shape: 'straight', from: 36, …}
522
: 
{id: 668, at: '7,16', facing: 'W', shape: 'straight', from: 36, …}
523
: 
{id: 669, at: '13,13', facing: 'S', shape: 'straight', from: 88, …}
524
: 
{id: 670, at: '13,11', facing: 'S', shape: 'straight', from: 88, …}
525
: 
{id: 671, at: '11,10', facing: 'S', shape: 'straight', from: 29, …}
526
: 
{id: 672, at: '11,12', facing: 'S', shape: 'straight', from: 28, …}
527
: 
{id: 673, at: '19,18', facing: 'N', shape: 'straight', from: 37, …}
528
: 
{id: 674, at: '20,18', facing: 'N', shape: 'straight', from: 37, …}
529
: 
{id: 675, at: '21,18', facing: 'N', shape: 'straight', from: 37, …}
530
: 
{id: 676, at: '22,18', facing: 'N', shape: 'straight', from: 37, …}
531
: 
{id: 677, at: '23,18', facing: 'N', shape: 'straight', from: 37, …}
532
: 
{id: 678, at: '24,18', facing: 'N', shape: 'straight', from: 37, …}
533
: 
{id: 679, at: '26,18', facing: 'W', shape: 'corner', from: 37, …}
534
: 
{id: 680, at: '26,16', facing: 'W', shape: 'straight', from: 37, …}
535
: 
{id: 681, at: '26,13', facing: 'S', shape: 'corner', from: 113, …}
536
: 
{id: 682, at: '23,12', facing: 'N', shape: 'straight', from: 26, …}
537
: 
{id: 683, at: '23,14', facing: 'N', shape: 'straight', from: 27, …}
538
: 
{id: 684, at: '21,13', facing: 'N', shape: 'straight', from: 89, …}
539
: 
{id: 685, at: '21,11', facing: 'N', shape: 'straight', from: 89, …}
540
: 
{id: 686, at: '16,12', facing: 'W', shape: 'corner', from: 3, …}
541
: 
{id: 687, at: '18,12', facing: 'N', shape: 'corner', from: 4, …}
542
: 
{id: 688, at: '17,11', facing: 'E', shape: 'straight', from: 5, …}
543
: 
{id: 689, at: '16,4', facing: 'W', shape: 'straight', from: 40, …}
544
: 
{id: 690, at: '18,4', facing: 'W', shape: 'straight', from: 41, …}
545
: 
{id: 691, at: '19,0', facing: 'N', shape: 'straight', from: 115, …}
546
: 
{id: 692, at: '20,0', facing: 'N', shape: 'straight', from: 115, …}
547
: 
{id: 693, at: '21,0', facing: 'N', shape: 'straight', from: 115, …}
548
: 
{id: 694, at: '22,0', facing: 'N', shape: 'straight', from: 115, …}
549
: 
{id: 695, at: '23,0', facing: 'N', shape: 'straight', from: 115, …}
550
: 
{id: 696, at: '25,2', facing: 'E', shape: 'straight', from: 115, …}
551
: 
{id: 697, at: '25,3', facing: 'E', shape: 'straight', from: 115, …}
552
: 
{id: 698, at: '25,4', facing: 'E', shape: 'straight', from: 115, …}
553
: 
{id: 699, at: '25,8', facing: 'W', shape: 'straight', from: 119, …}
554
: 
{id: 700, at: '28,11', facing: 'S', shape: 'straight', from: 116, …}
555
: 
{id: 701, at: '27,11', facing: 'S', shape: 'straight', from: 116, …}
556
: 
{id: 702, at: '26,11', facing: 'S', shape: 'straight', from: 116, …}
557
: 
{id: 703, at: '27,10', facing: 'S', shape: 'straight', from: 119, …}
558
: 
{id: 704, at: '28,10', facing: 'S', shape: 'straight', from: 119, …}
559
: 
{id: 705, at: '29,10', facing: 'S', shape: 'straight', from: 119, …}
560
: 
{id: 706, at: '30,10', facing: 'S', shape: 'straight', from: 119, …}
561
: 
{id: 707, at: '31,10', facing: 'S', shape: 'straight', from: 119, …}
562
: 
{id: 708, at: '33,10', facing: 'S', shape: 'straight', from: 119, …}
563
: 
{id: 709, at: '34,10', facing: 'S', shape: 'straight', from: 119, …}
564
: 
{id: 710, at: '31,11', facing: 'S', shape: 'straight', from: 116, …}
565
: 
{id: 711, at: '32,11', facing: 'S', shape: 'straight', from: 116, …}
566
: 
{id: 712, at: '33,11', facing: 'S', shape: 'straight', from: 116, …}
567
: 
{id: 713, at: '34,11', facing: 'S', shape: 'straight', from: 116, …}
568
: 
{id: 714, at: '35,11', facing: 'S', shape: 'straight', from: 116, …}
569
: 
{id: 715, at: '36,11', facing: 'S', shape: 'straight', from: 116, …}
570
: 
{id: 716, at: '30,11', facing: 'S', shape: 'straight', from: 116, …}
571
: 
{id: 717, at: '36,10', facing: 'S', shape: 'straight', from: 119, …}
572
: 
{id: 718, at: '37,10', facing: 'S', shape: 'straight', from: 119, …}
573
: 
{id: 719, at: '38,10', facing: 'S', shape: 'straight', from: 119, …}
574
: 
{id: 720, at: '39,10', facing: 'S', shape: 'straight', from: 119, …}
575
: 
{id: 721, at: '40,10', facing: 'S', shape: 'straight', from: 119, …}
576
: 
{id: 722, at: '41,10', facing: 'S', shape: 'straight', from: 119, …}
577
: 
{id: 723, at: '43,10', facing: 'S', shape: 'straight', from: 119, …}
578
: 
{id: 724, at: '44,10', facing: 'S', shape: 'straight', from: 119, …}
579
: 
{id: 725, at: '45,10', facing: 'S', shape: 'straight', from: 119, …}
580
: 
{id: 726, at: '46,10', facing: 'S', shape: 'straight', from: 119, …}
581
: 
{id: 727, at: '42,10', facing: 'S', shape: 'straight', from: 119, …}
582
: 
{id: 728, at: '32,10', facing: 'S', shape: 'straight', from: 119, …}
583
: 
{id: 729, at: '29,33', facing: 'E', shape: 'straight', from: 117, …}
584
: 
{id: 730, at: '29,27', facing: 'N', shape: 'straight', from: 73, …}
585
: 
{id: 731, at: '30,27', facing: 'N', shape: 'straight', from: 73, …}
586
: 
{id: 732, at: '31,27', facing: 'N', shape: 'straight', from: 73, …}
587
: 
{id: 733, at: '32,27', facing: 'N', shape: 'straight', from: 73, …}
588
: 
{id: 734, at: '33,27', facing: 'N', shape: 'straight', from: 73, …}
589
: 
{id: 735, at: '34,27', facing: 'N', shape: 'straight', from: 73, …}
590
: 
{id: 736, at: '35,27', facing: 'N', shape: 'straight', from: 73, …}
591
: 
{id: 737, at: '36,27', facing: 'N', shape: 'straight', from: 73, …}
592
: 
{id: 738, at: '37,27', facing: 'N', shape: 'straight', from: 73, …}
593
: 
{id: 739, at: '38,27', facing: 'N', shape: 'straight', from: 73, …}
594
: 
{id: 740, at: '39,27', facing: 'N', shape: 'straight', from: 73, …}
595
: 
{id: 741, at: '40,27', facing: 'N', shape: 'straight', from: 73, …}
596
: 
{id: 742, at: '41,27', facing: 'N', shape: 'straight', from: 73, …}
597
: 
{id: 743, at: '42,27', facing: 'N', shape: 'straight', from: 73, …}
598
: 
{id: 744, at: '34,32', facing: 'S', shape: 'straight', from: 90, …}
599
: 
{id: 745, at: '34,30', facing: 'S', shape: 'straight', from: 90, …}
[600 … 618]
600
: 
{id: 746, at: '42,30', facing: 'N', shape: 'straight', from: 91, …}
601
: 
{id: 747, at: '42,32', facing: 'N', shape: 'straight', from: 91, …}
602
: 
{id: 748, at: '38,35', facing: 'E', shape: 'straight', from: 33, …}
603
: 
{id: 749, at: '36,35', facing: 'E', shape: 'straight', from: 32, …}
604
: 
{id: 750, at: '34,37', facing: 'S', shape: 'straight', from: 32, …}
605
: 
{id: 751, at: '33,37', facing: 'S', shape: 'straight', from: 32, …}
606
: 
{id: 752, at: '32,37', facing: 'S', shape: 'straight', from: 32, …}
607
: 
{id: 753, at: '31,37', facing: 'S', shape: 'straight', from: 32, …}
608
: 
{id: 754, at: '38,30', facing: 'E', shape: 'straight', from: 8, …}
609
: 
{id: 755, at: '49,34', facing: 'W', shape: 'corner', from: 74, …}
610
: 
{id: 756, at: '49,32', facing: 'W', shape: 'straight', from: 74, …}
611
: 
{id: 757, at: '27,34', facing: 'N', shape: 'corner', from: 73, …}
612
: 
{id: 758, at: '27,32', facing: 'W', shape: 'straight', from: 73, …}
613
: 
{id: 759, at: '27,31', facing: 'W', shape: 'straight', from: 73, …}
614
: 
{id: 760, at: '27,30', facing: 'W', shape: 'straight', from: 73, …}
615
: 
{id: 761, at: '27,29', facing: 'W', shape: 'straight', from: 73, …}
616
: 
{id: 762, at: '29,37', facing: 'N', shape: 'corner', from: 32, …}
617
: 
{id: 763, at: '29,35', facing: 'W', shape: 'straight', from: 32, …}
618
: 
{id: 764, at: '27,27', facing: 'E', shape: 'corner', from: 73, …}
length
: 
619
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

  function detectSectionHeader(line, knownSections) {
    if (!line) return null;

    const direct = line.match(/^(miners|constructors|mergers|smelters|splitters|tubes)\b/i);
    if (direct) {
      const section = direct[1].toLowerCase();
      return knownSections.has(section) ? section : null;
    }

    // Handle compact lines such as "constructors: Array(17)".
    if (/array\s*\(/i.test(line)) {
      const embedded = line.match(/\b(miners|constructors|mergers|smelters|splitters|tubes)\b/i);
      if (embedded) {
        const section = embedded[1].toLowerCase();
        return knownSections.has(section) ? section : null;
      }
    }

    return null;
  }

  function extractEntryLine(line) {
    if (!line) return null;
    // Accept both:
    // - "{id: 1, ...}"
    // - "0: {id: 1, ...}"
    const normalized = line.replace(/^\s*\d+\s*:\s*/, "");
    const idx = normalized.indexOf("{id:");
    if (idx < 0) return null;
    return normalized.slice(idx);
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

      const detectedSection = detectSectionHeader(line, knownSections);
      if (detectedSection) {
        section = detectedSection;
        continue;
      }
      if (!section) {
        continue;
      }

      const entryLine = extractEntryLine(line);
      if (!entryLine) {
        continue;
      }

      const idValue = extractMatchValue(entryLine, /id:\s*(\d+)/i);
      const atValue = extractQuotedValue(entryLine, "at");
      if (idValue == null || atValue == null) {
        continue;
      }

      const entry = {
        id: Number(idValue),
        at: atValue
      };

      const facingRaw = extractQuotedValue(entryLine, "facing");
      const facingValue = facingRaw ? String(facingRaw).trim().charAt(0).toUpperCase() : null;
      if (facingValue) {
        entry.facing = facingValue;
      }

      if (section === "tubes") {
        const shapeValue = extractQuotedValue(entryLine, "shape");
        if (shapeValue) {
          entry.shape = String(shapeValue).trim().toLowerCase();
        }

        const fromToken = extractMatchValue(entryLine, /from:\s*([^,\s}]+)/);
        const toToken = extractMatchValue(entryLine, /to:\s*([^,\s}]+)/);
        const componentToken = extractMatchValue(entryLine, /component:\s*([^,\s}]+)/);
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
