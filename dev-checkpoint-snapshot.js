// dev-checkpoint-snapshot.js
// Source-of-truth snapshot consumed by dev-checkpoint.js.

(function initDevCheckpointSnapshot(globalScope) {
  "use strict";


const RAW_DEBUG_SNAPSHOT = `
constructors
: 
Array(25)
0
: 
{id: 100, at: '7,15', facing: 'W', inputRate: 3, outputRate: 1, …}
1
: 
{id: 101, at: '29,34', facing: 'W', inputRate: 3, outputRate: 1, …}
2
: 
{id: 102, at: '47,34', facing: 'E', inputRate: 3, outputRate: 1, …}
3
: 
{id: 103, at: '26,36', facing: 'W', inputRate: 3, outputRate: 1, …}
4
: 
{id: 104, at: '18,34', facing: 'S', inputRate: 3, outputRate: 1, …}
5
: 
{id: 105, at: '64,46', facing: 'E', inputRate: 3, outputRate: 1, …}
6
: 
{id: 106, at: '30,48', facing: 'S', inputRate: 8, outputRate: 1, …}
7
: 
{id: 107, at: '26,16', facing: 'E', inputRate: 3, outputRate: 1, …}
8
: 
{id: 108, at: '13,39', facing: 'E', inputRate: 3, outputRate: 1, …}
9
: 
{id: 109, at: '22,44', facing: 'W', inputRate: 3, outputRate: 1, …}
10
: 
{id: 110, at: '8,40', facing: 'S', inputRate: 3, outputRate: 1, …}
11
: 
{id: 111, at: '4,44', facing: 'E', inputRate: 3, outputRate: 1, …}
12
: 
{id: 112, at: '39,50', facing: 'E', inputRate: 3, outputRate: 1, …}
13
: 
{id: 113, at: '54,49', facing: 'S', inputRate: 3, outputRate: 1, …}
14
: 
{id: 114, at: '62,53', facing: 'S', inputRate: 3, outputRate: 3, …}
15
: 
{id: 115, at: '64,33', facing: 'E', inputRate: 3, outputRate: 1, …}
16
: 
{id: 116, at: '52,56', facing: 'S', inputRate: 3, outputRate: 3, …}
17
: 
{id: 117, at: '35,62', facing: 'N', inputRate: 4, outputRate: 1, …}
18
: 
{id: 118, at: '5,49', facing: 'W', inputRate: 3, outputRate: 1, …}
19
: 
{id: 119, at: '14,59', facing: 'S', inputRate: 3, outputRate: 1, …}
20
: 
{id: 120, at: '3,59', facing: 'E', inputRate: 3, outputRate: 1, …}
21
: 
{id: 121, at: '13,71', facing: 'E', inputRate: 3, outputRate: 1, …}
22
: 
{id: 122, at: '56,69', facing: 'W', inputRate: 3, outputRate: 1, …}
23
: 
{id: 123, at: '66,72', facing: 'S', inputRate: 3, outputRate: 1, …}
24
: 
{id: 124, at: '24,70', facing: 'E', inputRate: 6, outputRate: 1, …}
length
: 
25
[[Prototype]]
: 
Array(0)
mergers
: 
Array(34)
0
: 
{id: 158, at: '10,11', facing: 'W', inputRate: 2, outputRate: 2, …}
1
: 
{id: 159, at: '24,13', facing: 'E', inputRate: 2, outputRate: 2, …}
2
: 
{id: 160, at: '34,3', facing: 'N', inputRate: 2, outputRate: 2, …}
3
: 
{id: 161, at: '17,3', facing: 'N', inputRate: 2, outputRate: 2, …}
4
: 
{id: 162, at: '36,16', facing: 'E', inputRate: 2, outputRate: 2, …}
5
: 
{id: 163, at: '31,30', facing: 'W', inputRate: 2, outputRate: 2, …}
6
: 
{id: 164, at: '45,32', facing: 'E', inputRate: 2, outputRate: 2, …}
7
: 
{id: 165, at: '48,25', facing: 'N', inputRate: 2, outputRate: 2, …}
8
: 
{id: 166, at: '2,22', facing: 'W', inputRate: 2, outputRate: 2, …}
9
: 
{id: 167, at: '7,34', facing: 'S', inputRate: 2, outputRate: 2, …}
10
: 
{id: 168, at: '25,24', facing: 'E', inputRate: 2, outputRate: 2, …}
11
: 
{id: 169, at: '16,34', facing: 'E', inputRate: 2, outputRate: 2, …}
12
: 
{id: 170, at: '22,38', facing: 'S', inputRate: 2, outputRate: 2, …}
13
: 
{id: 171, at: '19,47', facing: 'S', inputRate: 2, outputRate: 2, …}
14
: 
{id: 172, at: '55,44', facing: 'E', inputRate: 2, outputRate: 2, …}
15
: 
{id: 173, at: '59,32', facing: 'N', inputRate: 2, outputRate: 2, …}
16
: 
{id: 174, at: '41,42', facing: 'W', inputRate: 2, outputRate: 2, …}
17
: 
{id: 175, at: '47,53', facing: 'S', inputRate: 2, outputRate: 2, …}
18
: 
{id: 176, at: '68,40', facing: 'E', inputRate: 2, outputRate: 2, …}
19
: 
{id: 177, at: '61,49', facing: 'S', inputRate: 2, outputRate: 2, …}
20
: 
{id: 178, at: '57,26', facing: 'N', inputRate: 2, outputRate: 2, …}
21
: 
{id: 179, at: '53,60', facing: 'S', inputRate: 6, outputRate: 6, …}
22
: 
{id: 180, at: '34,44', facing: 'E', inputRate: 2, outputRate: 2, …}
23
: 
{id: 181, at: '10,43', facing: 'E', inputRate: 2, outputRate: 2, …}
24
: 
{id: 182, at: '9,46', facing: 'W', inputRate: 2, outputRate: 2, …}
25
: 
{id: 183, at: '17,57', facing: 'S', inputRate: 2, outputRate: 2, …}
26
: 
{id: 184, at: '3,61', facing: 'N', inputRate: 2, outputRate: 2, …}
27
: 
{id: 185, at: '9,61', facing: 'E', inputRate: 2, outputRate: 2, …}
28
: 
{id: 186, at: '11,68', facing: 'E', inputRate: 2, outputRate: 2, …}
29
: 
{id: 187, at: '16,64', facing: 'E', inputRate: 3, outputRate: 3, …}
30
: 
{id: 188, at: '56,67', facing: 'S', inputRate: 2, outputRate: 2, …}
31
: 
{id: 189, at: '68,61', facing: 'E', inputRate: 2, outputRate: 2, …}
32
: 
{id: 190, at: '50,70', facing: 'W', inputRate: 2, outputRate: 2, …}
33
: 
{id: 191, at: '22,61', facing: 'E', inputRate: 4, outputRate: 4, …}
length
: 
34
[[Prototype]]
: 
Array(0)
miners
: 
Array(34)
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
23
: 
{id: 26, at: '34,65', facing: 'W', inputRate: 0, outputRate: 2, …}
24
: 
{id: 27, at: '38,65', facing: 'N', inputRate: 0, outputRate: 2, …}
25
: 
{id: 28, at: '17,50', facing: 'W', inputRate: 0, outputRate: 2, …}
26
: 
{id: 29, at: '17,51', facing: 'W', inputRate: 0, outputRate: 2, …}
27
: 
{id: 30, at: '18,51', facing: 'S', inputRate: 0, outputRate: 2, …}
28
: 
{id: 31, at: '4,68', facing: 'S', inputRate: 0, outputRate: 2, …}
29
: 
{id: 32, at: '5,67', facing: 'E', inputRate: 0, outputRate: 2, …}
30
: 
{id: 33, at: '4,67', facing: 'W', inputRate: 0, outputRate: 2, …}
31
: 
{id: 34, at: '61,61', facing: 'W', inputRate: 0, outputRate: 2, …}
32
: 
{id: 35, at: '62,60', facing: 'E', inputRate: 0, outputRate: 2, …}
33
: 
{id: 36, at: '62,61', facing: 'S', inputRate: 0, outputRate: 2, …}
length
: 
34
[[Prototype]]
: 
Array(0)
smelters
: 
Array(63)
0
: 
{id: 37, at: '22,11', facing: 'E', inputRate: 1, outputRate: 1, …}
1
: 
{id: 38, at: '22,13', facing: 'E', inputRate: 1, outputRate: 1, …}
2
: 
{id: 39, at: '12,13', facing: 'W', inputRate: 1, outputRate: 1, …}
3
: 
{id: 40, at: '12,11', facing: 'W', inputRate: 1, outputRate: 1, …}
4
: 
{id: 41, at: '33,30', facing: 'W', inputRate: 1, outputRate: 1, …}
5
: 
{id: 42, at: '33,32', facing: 'W', inputRate: 1, outputRate: 1, …}
6
: 
{id: 43, at: '37,34', facing: 'S', inputRate: 1, outputRate: 1, …}
7
: 
{id: 44, at: '39,34', facing: 'S', inputRate: 1, outputRate: 1, …}
8
: 
{id: 45, at: '43,32', facing: 'E', inputRate: 1, outputRate: 1, …}
9
: 
{id: 46, at: '43,30', facing: 'E', inputRate: 1, outputRate: 1, …}
10
: 
{id: 47, at: '16,15', facing: 'S', inputRate: 1, outputRate: 1, …}
11
: 
{id: 48, at: '18,15', facing: 'S', inputRate: 1, outputRate: 1, …}
12
: 
{id: 49, at: '32,5', facing: 'N', inputRate: 1, outputRate: 1, …}
13
: 
{id: 50, at: '34,5', facing: 'N', inputRate: 1, outputRate: 1, …}
14
: 
{id: 51, at: '15,5', facing: 'N', inputRate: 1, outputRate: 1, …}
15
: 
{id: 52, at: '17,5', facing: 'N', inputRate: 1, outputRate: 1, …}
16
: 
{id: 53, at: '4,22', facing: 'W', inputRate: 1, outputRate: 1, …}
17
: 
{id: 54, at: '4,24', facing: 'W', inputRate: 1, outputRate: 1, …}
18
: 
{id: 55, at: '4,26', facing: 'W', inputRate: 1, outputRate: 1, …}
19
: 
{id: 56, at: '4,28', facing: 'W', inputRate: 1, outputRate: 1, …}
20
: 
{id: 57, at: '7,32', facing: 'S', inputRate: 1, outputRate: 1, …}
21
: 
{id: 58, at: '9,32', facing: 'S', inputRate: 1, outputRate: 1, …}
22
: 
{id: 59, at: '11,33', facing: 'S', inputRate: 1, outputRate: 1, …}
23
: 
{id: 60, at: '13,33', facing: 'S', inputRate: 1, outputRate: 1, …}
24
: 
{id: 61, at: '23,22', facing: 'E', inputRate: 1, outputRate: 1, …}
25
: 
{id: 62, at: '23,24', facing: 'E', inputRate: 1, outputRate: 1, …}
26
: 
{id: 63, at: '20,27', facing: 'E', inputRate: 1, outputRate: 1, …}
27
: 
{id: 64, at: '20,29', facing: 'E', inputRate: 1, outputRate: 1, …}
28
: 
{id: 65, at: '26,43', facing: 'S', inputRate: 2, outputRate: 1, …}
29
: 
{id: 66, at: '53,42', facing: 'E', inputRate: 1, outputRate: 1, …}
30
: 
{id: 67, at: '53,44', facing: 'E', inputRate: 1, outputRate: 1, …}
31
: 
{id: 68, at: '62,40', facing: 'E', inputRate: 1, outputRate: 1, …}
32
: 
{id: 69, at: '62,38', facing: 'E', inputRate: 1, outputRate: 1, …}
33
: 
{id: 70, at: '59,34', facing: 'N', inputRate: 1, outputRate: 1, …}
34
: 
{id: 71, at: '57,34', facing: 'N', inputRate: 1, outputRate: 1, …}
35
: 
{id: 72, at: '43,42', facing: 'W', inputRate: 1, outputRate: 1, …}
36
: 
{id: 73, at: '43,44', facing: 'W', inputRate: 1, outputRate: 1, …}
37
: 
{id: 74, at: '47,47', facing: 'S', inputRate: 1, outputRate: 1, …}
38
: 
{id: 75, at: '49,47', facing: 'S', inputRate: 1, outputRate: 1, …}
39
: 
{id: 76, at: '61,47', facing: 'S', inputRate: 1, outputRate: 1, …}
40
: 
{id: 77, at: '63,47', facing: 'S', inputRate: 1, outputRate: 1, …}
41
: 
{id: 78, at: '55,28', facing: 'N', inputRate: 1, outputRate: 1, …}
42
: 
{id: 79, at: '57,28', facing: 'N', inputRate: 1, outputRate: 1, …}
43
: 
{id: 80, at: '32,42', facing: 'E', inputRate: 1, outputRate: 1, …}
44
: 
{id: 81, at: '32,44', facing: 'E', inputRate: 1, outputRate: 1, …}
45
: 
{id: 82, at: '11,48', facing: 'W', inputRate: 1, outputRate: 1, …}
46
: 
{id: 83, at: '11,46', facing: 'W', inputRate: 1, outputRate: 1, …}
47
: 
{id: 84, at: '12,50', facing: 'W', inputRate: 1, outputRate: 1, …}
48
: 
{id: 85, at: '12,52', facing: 'W', inputRate: 1, outputRate: 1, …}
49
: 
{id: 86, at: '17,55', facing: 'S', inputRate: 1, outputRate: 1, …}
50
: 
{id: 87, at: '19,55', facing: 'S', inputRate: 1, outputRate: 1, …}
51
: 
{id: 88, at: '1,63', facing: 'N', inputRate: 1, outputRate: 1, …}
52
: 
{id: 89, at: '3,63', facing: 'N', inputRate: 1, outputRate: 1, …}
53
: 
{id: 90, at: '4,57', facing: 'S', inputRate: 1, outputRate: 1, …}
54
: 
{id: 91, at: '9,66', facing: 'E', inputRate: 1, outputRate: 1, …}
55
: 
{id: 92, at: '9,68', facing: 'E', inputRate: 1, outputRate: 1, …}
56
: 
{id: 93, at: '5,72', facing: 'S', inputRate: 1, outputRate: 1, …}
57
: 
{id: 94, at: '56,65', facing: 'S', inputRate: 1, outputRate: 1, …}
58
: 
{id: 95, at: '58,65', facing: 'S', inputRate: 1, outputRate: 1, …}
59
: 
{id: 96, at: '66,59', facing: 'E', inputRate: 1, outputRate: 1, …}
60
: 
{id: 97, at: '66,61', facing: 'E', inputRate: 1, outputRate: 1, …}
61
: 
{id: 98, at: '61,65', facing: 'S', inputRate: 1, outputRate: 1, …}
62
: 
{id: 99, at: '63,65', facing: 'S', inputRate: 1, outputRate: 1, …}
length
: 
63
[[Prototype]]
: 
Array(0)
splitters
: 
Array(33)
0
: 
{id: 125, at: '14,12', facing: 'W', inputRate: 2, outputRate: 1, …}
1
: 
{id: 126, at: '20,12', facing: 'E', inputRate: 2, outputRate: 1, …}
2
: 
{id: 127, at: '35,31', facing: 'W', inputRate: 2, outputRate: 1, …}
3
: 
{id: 128, at: '41,31', facing: 'E', inputRate: 2, outputRate: 1, …}
4
: 
{id: 129, at: '17,13', facing: 'S', inputRate: 2, outputRate: 1, …}
5
: 
{id: 130, at: '33,7', facing: 'N', inputRate: 2, outputRate: 1, …}
6
: 
{id: 131, at: '16,7', facing: 'N', inputRate: 2, outputRate: 1, …}
7
: 
{id: 132, at: '38,32', facing: 'S', inputRate: 2, outputRate: 1, …}
8
: 
{id: 133, at: '6,23', facing: 'W', inputRate: 2, outputRate: 1, …}
9
: 
{id: 134, at: '6,27', facing: 'W', inputRate: 2, outputRate: 1, …}
10
: 
{id: 135, at: '8,30', facing: 'S', inputRate: 2, outputRate: 1, …}
11
: 
{id: 136, at: '12,31', facing: 'S', inputRate: 2, outputRate: 1, …}
12
: 
{id: 137, at: '21,23', facing: 'E', inputRate: 2, outputRate: 1, …}
13
: 
{id: 138, at: '18,28', facing: 'E', inputRate: 2, outputRate: 1, …}
14
: 
{id: 139, at: '25,30', facing: 'S', inputRate: 2, outputRate: 1, …}
15
: 
{id: 140, at: '45,43', facing: 'W', inputRate: 2, outputRate: 1, …}
16
: 
{id: 141, at: '51,43', facing: 'E', inputRate: 2, outputRate: 1, …}
17
: 
{id: 142, at: '48,45', facing: 'S', inputRate: 2, outputRate: 1, …}
18
: 
{id: 143, at: '60,39', facing: 'E', inputRate: 2, outputRate: 1, …}
19
: 
{id: 144, at: '58,36', facing: 'N', inputRate: 2, outputRate: 1, …}
20
: 
{id: 145, at: '62,45', facing: 'S', inputRate: 2, outputRate: 1, …}
21
: 
{id: 146, at: '56,30', facing: 'N', inputRate: 2, outputRate: 1, …}
22
: 
{id: 147, at: '58,51', facing: 'S', inputRate: 2, outputRate: 1, …}
23
: 
{id: 148, at: '30,43', facing: 'E', inputRate: 2, outputRate: 1, …}
24
: 
{id: 149, at: '13,47', facing: 'W', inputRate: 2, outputRate: 1, …}
25
: 
{id: 150, at: '14,51', facing: 'W', inputRate: 2, outputRate: 1, …}
26
: 
{id: 151, at: '18,53', facing: 'S', inputRate: 2, outputRate: 1, …}
27
: 
{id: 152, at: '4,70', facing: 'S', inputRate: 2, outputRate: 1, …}
28
: 
{id: 153, at: '2,65', facing: 'N', inputRate: 2, outputRate: 1, …}
29
: 
{id: 154, at: '7,67', facing: 'E', inputRate: 2, outputRate: 1, …}
30
: 
{id: 155, at: '57,63', facing: 'S', inputRate: 2, outputRate: 1, …}
31
: 
{id: 156, at: '64,60', facing: 'E', inputRate: 2, outputRate: 1, …}
32
: 
{id: 157, at: '62,63', facing: 'S', inputRate: 2, outputRate: 1, …}
length
: 
33
[[Prototype]]
: 
Array(0)
tubes
: 
Array(877)
[0 … 99]
0
: 
{id: 192, at: '17,12', facing: 'E', shape: 'straight', from: 5, …}
1
: 
{id: 193, at: '16,14', facing: 'E', shape: 'straight', from: 129, …}
2
: 
{id: 194, at: '18,14', facing: 'E', shape: 'straight', from: 129, …}
3
: 
{id: 195, at: '15,16', facing: 'E', shape: 'straight', from: 47, …}
4
: 
{id: 196, at: '17,16', facing: 'E', shape: 'straight', from: 48, …}
5
: 
{id: 197, at: '15,18', facing: 'W', shape: 'corner', from: 47, …}
6
: 
{id: 198, at: '32,20', facing: 'W', shape: 'corner', from: 100, …}
7
: 
{id: 199, at: '32,17', facing: 'E', shape: 'corner', from: 100, …}
8
: 
{id: 200, at: '25,10', facing: 'N', shape: 'corner', from: 165, …}
9
: 
{id: 201, at: '35,10', facing: 'S', shape: 'straight', from: 165, …}
10
: 
{id: 202, at: '33,8', facing: 'W', shape: 'straight', from: 6, …}
11
: 
{id: 203, at: '32,6', facing: 'W', shape: 'straight', from: 130, …}
12
: 
{id: 204, at: '34,6', facing: 'W', shape: 'straight', from: 130, …}
13
: 
{id: 205, at: '33,4', facing: 'W', shape: 'straight', from: 49, …}
14
: 
{id: 206, at: '35,4', facing: 'W', shape: 'straight', from: 50, …}
15
: 
{id: 207, at: '34,2', facing: 'W', shape: 'straight', from: 160, …}
16
: 
{id: 208, at: '34,0', facing: 'S', shape: 'corner', from: 160, …}
17
: 
{id: 209, at: '28,6', facing: 'W', shape: 'corner', from: 160, …}
18
: 
{id: 210, at: '28,0', facing: 'E', shape: 'corner', from: 160, …}
19
: 
{id: 211, at: '28,2', facing: 'E', shape: 'straight', from: 160, …}
20
: 
{id: 212, at: '28,3', facing: 'E', shape: 'straight', from: 160, …}
21
: 
{id: 213, at: '28,4', facing: 'E', shape: 'straight', from: 160, …}
22
: 
{id: 214, at: '32,0', facing: 'S', shape: 'straight', from: 160, …}
23
: 
{id: 215, at: '31,0', facing: 'S', shape: 'straight', from: 160, …}
24
: 
{id: 216, at: '30,0', facing: 'S', shape: 'straight', from: 160, …}
25
: 
{id: 217, at: '16,8', facing: 'W', shape: 'straight', from: 7, …}
26
: 
{id: 218, at: '17,6', facing: 'W', shape: 'straight', from: 131, …}
27
: 
{id: 219, at: '15,6', facing: 'W', shape: 'straight', from: 131, …}
28
: 
{id: 220, at: '17,0', facing: 'E', shape: 'corner', from: 161, …}
29
: 
{id: 221, at: '17,2', facing: 'W', shape: 'straight', from: 161, …}
30
: 
{id: 222, at: '25,0', facing: 'S', shape: 'corner', from: 161, …}
31
: 
{id: 223, at: '24,11', facing: 'N', shape: 'corner', from: 162, …}
32
: 
{id: 224, at: '24,8', facing: 'S', shape: 'corner', from: 162, …}
33
: 
{id: 225, at: '22,6', facing: 'N', shape: 'corner', from: 162, …}
34
: 
{id: 226, at: '19,8', facing: 'N', shape: 'corner', from: 162, …}
35
: 
{id: 227, at: '19,2', facing: 'E', shape: 'corner', from: 162, …}
36
: 
{id: 228, at: '4,17', facing: 'E', shape: 'straight', from: 100, …}
37
: 
{id: 229, at: '4,18', facing: 'E', shape: 'straight', from: 100, …}
38
: 
{id: 230, at: '6,20', facing: 'N', shape: 'straight', from: 100, …}
39
: 
{id: 231, at: '7,20', facing: 'N', shape: 'straight', from: 100, …}
40
: 
{id: 232, at: '8,20', facing: 'N', shape: 'straight', from: 100, …}
41
: 
{id: 233, at: '9,20', facing: 'N', shape: 'straight', from: 100, …}
42
: 
{id: 234, at: '10,20', facing: 'N', shape: 'straight', from: 100, …}
43
: 
{id: 235, at: '11,20', facing: 'N', shape: 'straight', from: 100, …}
44
: 
{id: 236, at: '12,20', facing: 'N', shape: 'straight', from: 100, …}
45
: 
{id: 237, at: '13,20', facing: 'N', shape: 'straight', from: 100, …}
46
: 
{id: 238, at: '17,20', facing: 'N', shape: 'straight', from: 100, …}
47
: 
{id: 239, at: '18,20', facing: 'N', shape: 'straight', from: 100, …}
48
: 
{id: 240, at: '19,20', facing: 'N', shape: 'straight', from: 100, …}
49
: 
{id: 241, at: '21,20', facing: 'N', shape: 'straight', from: 100, …}
50
: 
{id: 242, at: '23,20', facing: 'N', shape: 'straight', from: 100, …}
51
: 
{id: 243, at: '22,20', facing: 'N', shape: 'straight', from: 100, …}
52
: 
{id: 244, at: '24,20', facing: 'N', shape: 'straight', from: 100, …}
53
: 
{id: 245, at: '25,20', facing: 'N', shape: 'straight', from: 100, …}
54
: 
{id: 246, at: '26,20', facing: 'N', shape: 'straight', from: 100, …}
55
: 
{id: 247, at: '27,20', facing: 'N', shape: 'straight', from: 100, …}
56
: 
{id: 248, at: '28,20', facing: 'N', shape: 'straight', from: 100, …}
57
: 
{id: 249, at: '29,20', facing: 'N', shape: 'straight', from: 100, …}
58
: 
{id: 250, at: '30,20', facing: 'N', shape: 'straight', from: 100, …}
59
: 
{id: 251, at: '34,17', facing: 'N', shape: 'straight', from: 100, …}
60
: 
{id: 252, at: '35,17', facing: 'N', shape: 'straight', from: 100, …}
61
: 
{id: 253, at: '37,16', facing: 'N', shape: 'straight', from: 162, …}
62
: 
{id: 254, at: '39,16', facing: 'W', shape: 'corner', from: 162, …}
63
: 
{id: 255, at: '39,11', facing: 'S', shape: 'corner', from: 162, …}
64
: 
{id: 256, at: '39,14', facing: 'W', shape: 'straight', from: 162, …}
65
: 
{id: 257, at: '39,13', facing: 'W', shape: 'straight', from: 162, …}
66
: 
{id: 258, at: '37,11', facing: 'S', shape: 'straight', from: 162, …}
67
: 
{id: 259, at: '29,11', facing: 'S', shape: 'straight', from: 162, …}
68
: 
{id: 260, at: '22,8', facing: 'S', shape: 'straight', from: 162, …}
69
: 
{id: 261, at: '21,8', facing: 'S', shape: 'straight', from: 162, …}
70
: 
{id: 262, at: '19,6', facing: 'W', shape: 'straight', from: 162, …}
71
: 
{id: 263, at: '19,5', facing: 'W', shape: 'straight', from: 162, …}
72
: 
{id: 264, at: '19,4', facing: 'W', shape: 'straight', from: 162, …}
73
: 
{id: 265, at: '22,2', facing: 'S', shape: 'corner', from: 162, …}
74
: 
{id: 266, at: '22,4', facing: 'E', shape: 'straight', from: 162, …}
75
: 
{id: 267, at: '39,31', facing: 'N', shape: 'corner', from: 10, …}
76
: 
{id: 268, at: '37,31', facing: 'W', shape: 'corner', from: 9, …}
77
: 
{id: 269, at: '38,31', facing: 'E', shape: 'straight', from: 8, …}
78
: 
{id: 270, at: '37,33', facing: 'E', shape: 'straight', from: 132, …}
79
: 
{id: 271, at: '39,33', facing: 'E', shape: 'straight', from: 132, …}
80
: 
{id: 272, at: '36,37', facing: 'W', shape: 'corner', from: 43, …}
81
: 
{id: 273, at: '38,37', facing: 'N', shape: 'corner', from: 44, …}
82
: 
{id: 274, at: '32,31', facing: 'S', shape: 'straight', from: 42, …}
83
: 
{id: 275, at: '32,29', facing: 'S', shape: 'straight', from: 41, …}
84
: 
{id: 276, at: '29,30', facing: 'E', shape: 'corner', from: 163, …}
85
: 
{id: 277, at: '29,32', facing: 'E', shape: 'straight', from: 163, …}
86
: 
{id: 278, at: '44,31', facing: 'N', shape: 'straight', from: 46, …}
87
: 
{id: 279, at: '44,33', facing: 'N', shape: 'straight', from: 45, …}
88
: 
{id: 280, at: '40,37', facing: 'N', shape: 'straight', from: 44, …}
89
: 
{id: 281, at: '41,37', facing: 'N', shape: 'straight', from: 44, …}
90
: 
{id: 282, at: '42,37', facing: 'N', shape: 'straight', from: 44, …}
91
: 
{id: 283, at: '43,37', facing: 'N', shape: 'straight', from: 44, …}
92
: 
{id: 284, at: '44,37', facing: 'N', shape: 'straight', from: 44, …}
93
: 
{id: 285, at: '45,37', facing: 'N', shape: 'straight', from: 44, …}
94
: 
{id: 286, at: '47,37', facing: 'W', shape: 'corner', from: 44, …}
95
: 
{id: 287, at: '49,31', facing: 'W', shape: 'straight', from: 102, …}
96
: 
{id: 288, at: '49,30', facing: 'W', shape: 'straight', from: 102, …}
97
: 
{id: 289, at: '43,27', facing: 'N', shape: 'straight', from: 101, …}
98
: 
{id: 290, at: '45,27', facing: 'N', shape: 'straight', from: 101, …}
99
: 
{id: 291, at: '44,27', facing: 'N', shape: 'straight', from: 101, …}
[100 … 199]
100
: 
{id: 292, at: '47,27', facing: 'W', shape: 'corner', from: 101, …}
101
: 
{id: 293, at: '49,29', facing: 'W', shape: 'straight', from: 102, …}
102
: 
{id: 294, at: '49,28', facing: 'W', shape: 'straight', from: 102, …}
103
: 
{id: 295, at: '49,27', facing: 'W', shape: 'straight', from: 102, …}
104
: 
{id: 296, at: '49,26', facing: 'W', shape: 'straight', from: 102, …}
105
: 
{id: 297, at: '48,24', facing: 'W', shape: 'straight', from: 165, …}
106
: 
{id: 298, at: '48,23', facing: 'W', shape: 'straight', from: 165, …}
107
: 
{id: 299, at: '48,22', facing: 'W', shape: 'straight', from: 165, …}
108
: 
{id: 300, at: '48,21', facing: 'W', shape: 'straight', from: 165, …}
109
: 
{id: 301, at: '48,20', facing: 'W', shape: 'straight', from: 165, …}
110
: 
{id: 302, at: '48,19', facing: 'W', shape: 'straight', from: 165, …}
111
: 
{id: 303, at: '48,18', facing: 'W', shape: 'straight', from: 165, …}
112
: 
{id: 304, at: '48,17', facing: 'W', shape: 'straight', from: 165, …}
113
: 
{id: 305, at: '48,16', facing: 'W', shape: 'straight', from: 165, …}
114
: 
{id: 306, at: '48,15', facing: 'W', shape: 'straight', from: 165, …}
115
: 
{id: 307, at: '48,14', facing: 'W', shape: 'straight', from: 165, …}
116
: 
{id: 308, at: '48,10', facing: 'S', shape: 'corner', from: 165, …}
117
: 
{id: 309, at: '48,13', facing: 'W', shape: 'straight', from: 165, …}
118
: 
{id: 310, at: '48,12', facing: 'W', shape: 'straight', from: 165, …}
119
: 
{id: 311, at: '8,26', facing: 'N', shape: 'corner', from: 11, …}
120
: 
{id: 312, at: '8,28', facing: 'E', shape: 'corner', from: 13, …}
121
: 
{id: 313, at: '9,27', facing: 'S', shape: 'straight', from: 12, …}
122
: 
{id: 314, at: '7,27', facing: 'S', shape: 'straight', from: 12, …}
123
: 
{id: 315, at: '8,27', facing: 'S', shape: 'straight', from: 12, …}
124
: 
{id: 316, at: '8,23', facing: 'S', shape: 'corner', from: 11, …}
125
: 
{id: 317, at: '5,22', facing: 'S', shape: 'straight', from: 133, …}
126
: 
{id: 318, at: '5,24', facing: 'S', shape: 'straight', from: 133, …}
127
: 
{id: 319, at: '3,23', facing: 'S', shape: 'straight', from: 54, …}
128
: 
{id: 320, at: '3,21', facing: 'S', shape: 'straight', from: 53, …}
129
: 
{id: 321, at: '0,22', facing: 'E', shape: 'corner', from: 166, …}
130
: 
{id: 322, at: '5,26', facing: 'S', shape: 'straight', from: 134, …}
131
: 
{id: 323, at: '5,28', facing: 'S', shape: 'straight', from: 134, …}
132
: 
{id: 324, at: '3,25', facing: 'S', shape: 'straight', from: 55, …}
133
: 
{id: 325, at: '2,27', facing: 'E', shape: 'corner', from: 56, …}
134
: 
{id: 326, at: '1,25', facing: 'E', shape: 'corner', from: 55, …}
135
: 
{id: 327, at: '0,24', facing: 'E', shape: 'straight', from: 166, …}
136
: 
{id: 328, at: '0,25', facing: 'E', shape: 'straight', from: 166, …}
137
: 
{id: 329, at: '0,26', facing: 'E', shape: 'straight', from: 166, …}
138
: 
{id: 330, at: '0,27', facing: 'E', shape: 'straight', from: 166, …}
139
: 
{id: 331, at: '0,28', facing: 'E', shape: 'straight', from: 166, …}
140
: 
{id: 332, at: '0,29', facing: 'E', shape: 'straight', from: 166, …}
141
: 
{id: 333, at: '1,27', facing: 'E', shape: 'straight', from: 55, …}
142
: 
{id: 334, at: '1,28', facing: 'E', shape: 'straight', from: 55, …}
143
: 
{id: 335, at: '1,29', facing: 'E', shape: 'straight', from: 55, …}
144
: 
{id: 336, at: '7,31', facing: 'E', shape: 'straight', from: 135, …}
145
: 
{id: 337, at: '9,31', facing: 'E', shape: 'straight', from: 135, …}
146
: 
{id: 338, at: '6,33', facing: 'E', shape: 'straight', from: 57, …}
147
: 
{id: 339, at: '8,33', facing: 'E', shape: 'straight', from: 58, …}
148
: 
{id: 340, at: '2,30', facing: 'N', shape: 'corner', from: 56, …}
149
: 
{id: 341, at: '5,30', facing: 'S', shape: 'corner', from: 56, …}
150
: 
{id: 342, at: '5,32', facing: 'E', shape: 'straight', from: 56, …}
151
: 
{id: 343, at: '5,33', facing: 'E', shape: 'straight', from: 56, …}
152
: 
{id: 344, at: '5,34', facing: 'E', shape: 'straight', from: 56, …}
153
: 
{id: 345, at: '5,35', facing: 'E', shape: 'straight', from: 56, …}
154
: 
{id: 346, at: '7,35', facing: 'E', shape: 'straight', from: 167, …}
155
: 
{id: 347, at: '5,36', facing: 'E', shape: 'straight', from: 56, …}
156
: 
{id: 348, at: '5,37', facing: 'E', shape: 'straight', from: 56, …}
157
: 
{id: 349, at: '1,31', facing: 'N', shape: 'corner', from: 55, …}
158
: 
{id: 350, at: '4,31', facing: 'S', shape: 'corner', from: 55, …}
159
: 
{id: 351, at: '0,30', facing: 'E', shape: 'straight', from: 166, …}
160
: 
{id: 352, at: '0,31', facing: 'E', shape: 'straight', from: 166, …}
161
: 
{id: 353, at: '0,32', facing: 'E', shape: 'straight', from: 166, …}
162
: 
{id: 354, at: '7,37', facing: 'N', shape: 'corner', from: 167, …}
163
: 
{id: 355, at: '5,38', facing: 'E', shape: 'straight', from: 56, …}
164
: 
{id: 356, at: '5,44', facing: 'N', shape: 'straight', from: 111, …}
165
: 
{id: 357, at: '6,44', facing: 'N', shape: 'straight', from: 111, …}
166
: 
{id: 358, at: '11,43', facing: 'N', shape: 'straight', from: 181, …}
167
: 
{id: 359, at: '12,30', facing: 'E', shape: 'straight', from: 14, …}
168
: 
{id: 360, at: '11,32', facing: 'E', shape: 'straight', from: 136, …}
169
: 
{id: 361, at: '13,32', facing: 'E', shape: 'straight', from: 136, …}
170
: 
{id: 362, at: '10,34', facing: 'E', shape: 'straight', from: 59, …}
171
: 
{id: 363, at: '10,36', facing: 'N', shape: 'corner', from: 59, …}
172
: 
{id: 364, at: '12,35', facing: 'N', shape: 'corner', from: 60, …}
173
: 
{id: 365, at: '13,43', facing: 'W', shape: 'corner', from: 181, …}
174
: 
{id: 366, at: '13,41', facing: 'W', shape: 'straight', from: 181, …}
175
: 
{id: 367, at: '19,26', facing: 'W', shape: 'corner', from: 15, …}
176
: 
{id: 368, at: '19,23', facing: 'E', shape: 'corner', from: 15, …}
177
: 
{id: 369, at: '22,22', facing: 'N', shape: 'straight', from: 137, …}
178
: 
{id: 370, at: '22,24', facing: 'N', shape: 'straight', from: 137, …}
179
: 
{id: 371, at: '24,23', facing: 'N', shape: 'straight', from: 61, …}
180
: 
{id: 372, at: '24,25', facing: 'N', shape: 'straight', from: 62, …}
181
: 
{id: 373, at: '27,24', facing: 'W', shape: 'corner', from: 168, …}
182
: 
{id: 374, at: '27,21', facing: 'E', shape: 'corner', from: 168, …}
183
: 
{id: 375, at: '30,21', facing: 'S', shape: 'corner', from: 168, …}
184
: 
{id: 376, at: '30,26', facing: 'W', shape: 'corner', from: 168, …}
185
: 
{id: 377, at: '30,23', facing: 'E', shape: 'straight', from: 168, …}
186
: 
{id: 378, at: '30,24', facing: 'E', shape: 'straight', from: 168, …}
187
: 
{id: 379, at: '28,26', facing: 'S', shape: 'straight', from: 168, …}
188
: 
{id: 380, at: '27,26', facing: 'S', shape: 'straight', from: 168, …}
189
: 
{id: 381, at: '25,26', facing: 'E', shape: 'corner', from: 168, …}
190
: 
{id: 382, at: '15,28', facing: 'N', shape: 'straight', from: 16, …}
191
: 
{id: 383, at: '16,28', facing: 'N', shape: 'straight', from: 16, …}
192
: 
{id: 384, at: '17,28', facing: 'N', shape: 'straight', from: 16, …}
193
: 
{id: 385, at: '19,27', facing: 'N', shape: 'straight', from: 138, …}
194
: 
{id: 386, at: '19,29', facing: 'N', shape: 'straight', from: 138, …}
195
: 
{id: 387, at: '25,28', facing: 'E', shape: 'straight', from: 168, …}
196
: 
{id: 388, at: '25,29', facing: 'E', shape: 'straight', from: 168, …}
197
: 
{id: 389, at: '23,28', facing: 'S', shape: 'corner', from: 63, …}
198
: 
{id: 390, at: '21,28', facing: 'N', shape: 'straight', from: 63, …}
199
: 
{id: 391, at: '20,20', facing: 'N', shape: 'straight', from: 100, …}
[200 … 299]
200
: 
{id: 392, at: '16,20', facing: 'N', shape: 'straight', from: 100, …}
201
: 
{id: 393, at: '15,20', facing: 'N', shape: 'straight', from: 100, …}
202
: 
{id: 394, at: '14,20', facing: 'N', shape: 'straight', from: 100, …}
203
: 
{id: 395, at: '22,30', facing: 'S', shape: 'corner', from: 64, …}
204
: 
{id: 396, at: '23,30', facing: 'E', shape: 'straight', from: 63, …}
205
: 
{id: 397, at: '23,31', facing: 'E', shape: 'straight', from: 63, …}
206
: 
{id: 398, at: '23,32', facing: 'E', shape: 'straight', from: 63, …}
207
: 
{id: 399, at: '22,33', facing: 'W', shape: 'corner', from: 64, …}
208
: 
{id: 400, at: '14,33', facing: 'N', shape: 'corner', from: 64, …}
209
: 
{id: 401, at: '14,35', facing: 'N', shape: 'straight', from: 60, …}
210
: 
{id: 402, at: '15,35', facing: 'N', shape: 'straight', from: 60, …}
211
: 
{id: 403, at: '19,33', facing: 'N', shape: 'corner', from: 64, …}
212
: 
{id: 404, at: '19,30', facing: 'S', shape: 'corner', from: 64, …}
213
: 
{id: 405, at: '14,30', facing: 'E', shape: 'corner', from: 64, …}
214
: 
{id: 406, at: '17,30', facing: 'S', shape: 'straight', from: 64, …}
215
: 
{id: 407, at: '16,30', facing: 'S', shape: 'straight', from: 64, …}
216
: 
{id: 408, at: '23,34', facing: 'W', shape: 'corner', from: 63, …}
217
: 
{id: 409, at: '21,34', facing: 'S', shape: 'straight', from: 63, …}
218
: 
{id: 410, at: '20,34', facing: 'S', shape: 'straight', from: 63, …}
219
: 
{id: 411, at: '24,31', facing: 'E', shape: 'straight', from: 139, …}
220
: 
{id: 412, at: '24,32', facing: 'E', shape: 'straight', from: 139, …}
221
: 
{id: 413, at: '26,31', facing: 'E', shape: 'straight', from: 139, …}
222
: 
{id: 414, at: '26,32', facing: 'E', shape: 'straight', from: 139, …}
223
: 
{id: 415, at: '26,33', facing: 'E', shape: 'straight', from: 139, …}
224
: 
{id: 416, at: '26,34', facing: 'E', shape: 'straight', from: 139, …}
225
: 
{id: 417, at: '25,36', facing: 'S', shape: 'straight', from: 103, …}
226
: 
{id: 418, at: '18,36', facing: 'N', shape: 'corner', from: 104, …}
227
: 
{id: 419, at: '21,36', facing: 'S', shape: 'corner', from: 104, …}
228
: 
{id: 420, at: '23,36', facing: 'E', shape: 'corner', from: 103, …}
229
: 
{id: 421, at: '26,42', facing: 'E', shape: 'straight', from: 18, …}
230
: 
{id: 422, at: '22,40', facing: 'E', shape: 'straight', from: 170, …}
231
: 
{id: 423, at: '22,41', facing: 'E', shape: 'straight', from: 170, …}
232
: 
{id: 424, at: '22,42', facing: 'E', shape: 'straight', from: 170, …}
233
: 
{id: 425, at: '22,39', facing: 'E', shape: 'straight', from: 170, …}
234
: 
{id: 426, at: '25,47', facing: 'W', shape: 'corner', from: 65, …}
235
: 
{id: 427, at: '25,45', facing: 'E', shape: 'straight', from: 65, …}
236
: 
{id: 428, at: '25,44', facing: 'E', shape: 'straight', from: 65, …}
237
: 
{id: 429, at: '18,41', facing: 'E', shape: 'straight', from: 108, …}
238
: 
{id: 430, at: '18,42', facing: 'E', shape: 'straight', from: 108, …}
239
: 
{id: 431, at: '18,43', facing: 'E', shape: 'straight', from: 108, …}
240
: 
{id: 432, at: '18,44', facing: 'E', shape: 'straight', from: 108, …}
241
: 
{id: 433, at: '18,45', facing: 'E', shape: 'straight', from: 108, …}
242
: 
{id: 434, at: '18,46', facing: 'E', shape: 'straight', from: 108, …}
243
: 
{id: 435, at: '47,43', facing: 'W', shape: 'corner', from: 19, …}
244
: 
{id: 436, at: '49,43', facing: 'N', shape: 'corner', from: 21, …}
245
: 
{id: 437, at: '48,42', facing: 'E', shape: 'straight', from: 20, …}
246
: 
{id: 438, at: '48,43', facing: 'E', shape: 'straight', from: 20, …}
247
: 
{id: 439, at: '48,44', facing: 'E', shape: 'straight', from: 20, …}
248
: 
{id: 440, at: '58,38', facing: 'W', shape: 'corner', from: 24, …}
249
: 
{id: 441, at: '57,39', facing: 'N', shape: 'straight', from: 23, …}
250
: 
{id: 442, at: '58,39', facing: 'N', shape: 'straight', from: 23, …}
251
: 
{id: 443, at: '59,39', facing: 'N', shape: 'straight', from: 23, …}
252
: 
{id: 444, at: '44,42', facing: 'S', shape: 'straight', from: 140, …}
253
: 
{id: 445, at: '44,44', facing: 'S', shape: 'straight', from: 140, …}
254
: 
{id: 446, at: '52,44', facing: 'N', shape: 'straight', from: 141, …}
255
: 
{id: 447, at: '52,42', facing: 'N', shape: 'straight', from: 141, …}
256
: 
{id: 448, at: '49,46', facing: 'E', shape: 'straight', from: 142, …}
257
: 
{id: 449, at: '47,46', facing: 'E', shape: 'straight', from: 142, …}
258
: 
{id: 450, at: '61,40', facing: 'N', shape: 'straight', from: 143, …}
259
: 
{id: 451, at: '61,38', facing: 'N', shape: 'straight', from: 143, …}
260
: 
{id: 452, at: '59,35', facing: 'W', shape: 'straight', from: 144, …}
261
: 
{id: 453, at: '57,35', facing: 'W', shape: 'straight', from: 144, …}
262
: 
{id: 454, at: '54,43', facing: 'N', shape: 'straight', from: 66, …}
263
: 
{id: 455, at: '54,45', facing: 'N', shape: 'straight', from: 67, …}
264
: 
{id: 456, at: '57,40', facing: 'N', shape: 'straight', from: 22, …}
265
: 
{id: 457, at: '59,40', facing: 'S', shape: 'corner', from: 22, …}
266
: 
{id: 458, at: '57,44', facing: 'S', shape: 'corner', from: 172, …}
267
: 
{id: 459, at: '59,43', facing: 'N', shape: 'corner', from: 22, …}
268
: 
{id: 460, at: '62,43', facing: 'S', shape: 'corner', from: 22, …}
269
: 
{id: 461, at: '58,33', facing: 'W', shape: 'straight', from: 71, …}
270
: 
{id: 462, at: '60,33', facing: 'W', shape: 'straight', from: 70, …}
271
: 
{id: 463, at: '64,39', facing: 'W', shape: 'corner', from: 69, …}
272
: 
{id: 464, at: '59,30', facing: 'E', shape: 'corner', from: 173, …}
273
: 
{id: 465, at: '61,30', facing: 'N', shape: 'straight', from: 173, …}
274
: 
{id: 466, at: '62,30', facing: 'N', shape: 'straight', from: 173, …}
275
: 
{id: 467, at: '64,37', facing: 'W', shape: 'straight', from: 69, …}
276
: 
{id: 468, at: '64,36', facing: 'W', shape: 'straight', from: 69, …}
277
: 
{id: 469, at: '64,35', facing: 'W', shape: 'straight', from: 69, …}
278
: 
{id: 470, at: '64,41', facing: 'S', shape: 'corner', from: 68, …}
279
: 
{id: 471, at: '64,43', facing: 'E', shape: 'straight', from: 68, …}
280
: 
{id: 472, at: '64,44', facing: 'E', shape: 'straight', from: 68, …}
281
: 
{id: 473, at: '64,48', facing: 'W', shape: 'straight', from: 177, …}
282
: 
{id: 474, at: '46,49', facing: 'W', shape: 'corner', from: 74, …}
283
: 
{id: 475, at: '48,49', facing: 'N', shape: 'corner', from: 75, …}
284
: 
{id: 476, at: '42,43', facing: 'S', shape: 'straight', from: 73, …}
285
: 
{id: 477, at: '42,41', facing: 'S', shape: 'straight', from: 72, …}
286
: 
{id: 478, at: '57,46', facing: 'E', shape: 'straight', from: 172, …}
287
: 
{id: 479, at: '57,47', facing: 'E', shape: 'straight', from: 172, …}
288
: 
{id: 480, at: '50,49', facing: 'N', shape: 'straight', from: 75, …}
289
: 
{id: 481, at: '51,49', facing: 'N', shape: 'straight', from: 75, …}
290
: 
{id: 482, at: '52,49', facing: 'N', shape: 'straight', from: 75, …}
291
: 
{id: 483, at: '52,51', facing: 'S', shape: 'straight', from: 113, …}
292
: 
{id: 484, at: '51,51', facing: 'S', shape: 'straight', from: 113, …}
293
: 
{id: 485, at: '50,51', facing: 'S', shape: 'straight', from: 113, …}
294
: 
{id: 486, at: '48,51', facing: 'E', shape: 'corner', from: 113, …}
295
: 
{id: 487, at: '66,46', facing: 'W', shape: 'corner', from: 105, …}
296
: 
{id: 488, at: '66,39', facing: 'N', shape: 'corner', from: 115, …}
297
: 
{id: 489, at: '66,35', facing: 'E', shape: 'straight', from: 115, …}
298
: 
{id: 490, at: '66,36', facing: 'E', shape: 'straight', from: 115, …}
299
: 
{id: 491, at: '66,37', facing: 'E', shape: 'straight', from: 115, …}
[300 … 399]
300
: 
{id: 492, at: '61,46', facing: 'E', shape: 'straight', from: 145, …}
301
: 
{id: 493, at: '63,46', facing: 'E', shape: 'straight', from: 145, …}
302
: 
{id: 494, at: '60,48', facing: 'E', shape: 'straight', from: 76, …}
303
: 
{id: 495, at: '62,48', facing: 'E', shape: 'straight', from: 77, …}
304
: 
{id: 496, at: '61,51', facing: 'N', shape: 'corner', from: 177, …}
305
: 
{id: 497, at: '64,51', facing: 'W', shape: 'corner', from: 177, …}
306
: 
{id: 498, at: '64,49', facing: 'W', shape: 'straight', from: 177, …}
307
: 
{id: 499, at: '66,41', facing: 'E', shape: 'corner', from: 105, …}
308
: 
{id: 500, at: '66,44', facing: 'W', shape: 'straight', from: 105, …}
309
: 
{id: 501, at: '66,43', facing: 'W', shape: 'straight', from: 105, …}
310
: 
{id: 502, at: '56,32', facing: 'W', shape: 'straight', from: 25, …}
311
: 
{id: 503, at: '56,31', facing: 'W', shape: 'straight', from: 25, …}
312
: 
{id: 504, at: '55,29', facing: 'W', shape: 'straight', from: 146, …}
313
: 
{id: 505, at: '57,29', facing: 'W', shape: 'straight', from: 146, …}
314
: 
{id: 506, at: '56,27', facing: 'W', shape: 'straight', from: 78, …}
315
: 
{id: 507, at: '58,27', facing: 'W', shape: 'straight', from: 79, …}
316
: 
{id: 508, at: '57,24', facing: 'S', shape: 'corner', from: 178, …}
317
: 
{id: 509, at: '55,24', facing: 'S', shape: 'straight', from: 178, …}
318
: 
{id: 510, at: '54,24', facing: 'S', shape: 'straight', from: 178, …}
319
: 
{id: 511, at: '52,24', facing: 'E', shape: 'corner', from: 178, …}
320
: 
{id: 512, at: '52,26', facing: 'E', shape: 'straight', from: 178, …}
321
: 
{id: 513, at: '52,27', facing: 'E', shape: 'straight', from: 178, …}
322
: 
{id: 514, at: '52,28', facing: 'E', shape: 'straight', from: 178, …}
323
: 
{id: 515, at: '52,29', facing: 'E', shape: 'straight', from: 178, …}
324
: 
{id: 516, at: '52,30', facing: 'E', shape: 'straight', from: 178, …}
325
: 
{id: 517, at: '52,31', facing: 'E', shape: 'straight', from: 178, …}
326
: 
{id: 518, at: '52,32', facing: 'E', shape: 'straight', from: 178, …}
327
: 
{id: 519, at: '52,33', facing: 'E', shape: 'straight', from: 178, …}
328
: 
{id: 520, at: '52,35', facing: 'N', shape: 'corner', from: 178, …}
329
: 
{id: 521, at: '55,35', facing: 'S', shape: 'corner', from: 178, …}
330
: 
{id: 522, at: '55,38', facing: 'E', shape: 'straight', from: 178, …}
331
: 
{id: 523, at: '55,37', facing: 'E', shape: 'straight', from: 178, …}
332
: 
{id: 524, at: '55,39', facing: 'E', shape: 'straight', from: 178, …}
333
: 
{id: 525, at: '55,40', facing: 'E', shape: 'straight', from: 178, …}
334
: 
{id: 526, at: '55,42', facing: 'N', shape: 'corner', from: 178, …}
335
: 
{id: 527, at: '58,42', facing: 'S', shape: 'corner', from: 178, …}
336
: 
{id: 528, at: '58,44', facing: 'E', shape: 'straight', from: 178, …}
337
: 
{id: 529, at: '58,45', facing: 'E', shape: 'straight', from: 178, …}
338
: 
{id: 530, at: '58,46', facing: 'E', shape: 'straight', from: 178, …}
339
: 
{id: 531, at: '58,47', facing: 'E', shape: 'straight', from: 178, …}
340
: 
{id: 532, at: '58,48', facing: 'E', shape: 'straight', from: 178, …}
341
: 
{id: 533, at: '58,50', facing: 'E', shape: 'straight', from: 178, …}
342
: 
{id: 534, at: '58,49', facing: 'E', shape: 'straight', from: 178, …}
343
: 
{id: 535, at: '47,54', facing: 'E', shape: 'straight', from: 175, …}
344
: 
{id: 536, at: '47,56', facing: 'N', shape: 'corner', from: 175, …}
345
: 
{id: 537, at: '49,56', facing: 'N', shape: 'straight', from: 175, …}
346
: 
{id: 538, at: '70,40', facing: 'S', shape: 'corner', from: 176, …}
347
: 
{id: 539, at: '70,42', facing: 'E', shape: 'straight', from: 176, …}
348
: 
{id: 540, at: '70,43', facing: 'E', shape: 'straight', from: 176, …}
349
: 
{id: 541, at: '70,44', facing: 'E', shape: 'straight', from: 176, …}
350
: 
{id: 542, at: '70,45', facing: 'E', shape: 'straight', from: 176, …}
351
: 
{id: 543, at: '70,46', facing: 'E', shape: 'straight', from: 176, …}
352
: 
{id: 544, at: '70,48', facing: 'E', shape: 'straight', from: 176, …}
353
: 
{id: 545, at: '70,49', facing: 'E', shape: 'straight', from: 176, …}
354
: 
{id: 546, at: '70,47', facing: 'E', shape: 'straight', from: 176, …}
355
: 
{id: 547, at: '70,50', facing: 'E', shape: 'straight', from: 176, …}
356
: 
{id: 548, at: '70,51', facing: 'E', shape: 'straight', from: 176, …}
357
: 
{id: 549, at: '70,53', facing: 'W', shape: 'corner', from: 176, …}
358
: 
{id: 550, at: '68,53', facing: 'S', shape: 'straight', from: 176, …}
359
: 
{id: 551, at: '67,53', facing: 'S', shape: 'straight', from: 176, …}
360
: 
{id: 552, at: '66,53', facing: 'S', shape: 'straight', from: 176, …}
361
: 
{id: 553, at: '65,53', facing: 'S', shape: 'straight', from: 176, …}
362
: 
{id: 554, at: '64,53', facing: 'S', shape: 'straight', from: 176, …}
363
: 
{id: 555, at: '54,58', facing: 'E', shape: 'corner', from: 114, …}
364
: 
{id: 556, at: '56,58', facing: 'S', shape: 'straight', from: 114, …}
365
: 
{id: 557, at: '57,58', facing: 'S', shape: 'straight', from: 114, …}
366
: 
{id: 558, at: '58,58', facing: 'S', shape: 'straight', from: 114, …}
367
: 
{id: 559, at: '59,58', facing: 'S', shape: 'straight', from: 114, …}
368
: 
{id: 560, at: '53,62', facing: 'W', shape: 'corner', from: 179, …}
369
: 
{id: 561, at: '50,62', facing: 'N', shape: 'corner', from: 179, …}
370
: 
{id: 562, at: '50,60', facing: 'W', shape: 'straight', from: 179, …}
371
: 
{id: 563, at: '50,59', facing: 'W', shape: 'straight', from: 179, …}
372
: 
{id: 564, at: '50,57', facing: 'S', shape: 'corner', from: 179, …}
373
: 
{id: 565, at: '48,57', facing: 'S', shape: 'straight', from: 179, …}
374
: 
{id: 566, at: '47,57', facing: 'S', shape: 'straight', from: 179, …}
375
: 
{id: 567, at: '46,57', facing: 'S', shape: 'straight', from: 179, …}
376
: 
{id: 568, at: '45,57', facing: 'S', shape: 'straight', from: 179, …}
377
: 
{id: 569, at: '44,57', facing: 'S', shape: 'straight', from: 179, …}
378
: 
{id: 570, at: '43,57', facing: 'S', shape: 'straight', from: 179, …}
379
: 
{id: 571, at: '42,57', facing: 'S', shape: 'straight', from: 179, …}
380
: 
{id: 572, at: '41,57', facing: 'S', shape: 'straight', from: 179, …}
381
: 
{id: 573, at: '40,57', facing: 'S', shape: 'straight', from: 179, …}
382
: 
{id: 574, at: '39,57', facing: 'S', shape: 'straight', from: 179, …}
383
: 
{id: 575, at: '37,57', facing: 'N', shape: 'corner', from: 179, …}
384
: 
{id: 576, at: '37,55', facing: 'W', shape: 'straight', from: 179, …}
385
: 
{id: 577, at: '37,54', facing: 'W', shape: 'straight', from: 179, …}
386
: 
{id: 578, at: '37,53', facing: 'W', shape: 'straight', from: 179, …}
387
: 
{id: 579, at: '37,52', facing: 'W', shape: 'straight', from: 179, …}
388
: 
{id: 580, at: '37,50', facing: 'W', shape: 'straight', from: 179, …}
389
: 
{id: 581, at: '37,51', facing: 'W', shape: 'straight', from: 179, …}
390
: 
{id: 582, at: '37,48', facing: 'S', shape: 'corner', from: 179, …}
391
: 
{id: 583, at: '24,48', facing: 'N', shape: 'straight', from: 171, …}
392
: 
{id: 584, at: '25,48', facing: 'N', shape: 'straight', from: 171, …}
393
: 
{id: 585, at: '26,48', facing: 'N', shape: 'straight', from: 171, …}
394
: 
{id: 586, at: '27,48', facing: 'N', shape: 'straight', from: 171, …}
395
: 
{id: 587, at: '28,48', facing: 'N', shape: 'straight', from: 171, …}
396
: 
{id: 588, at: '34,48', facing: 'S', shape: 'straight', from: 179, …}
397
: 
{id: 589, at: '35,48', facing: 'S', shape: 'straight', from: 179, …}
398
: 
{id: 590, at: '33,48', facing: 'S', shape: 'straight', from: 179, …}
399
: 
{id: 591, at: '32,48', facing: 'S', shape: 'straight', from: 179, …}
[400 … 499]
400
: 
{id: 592, at: '30,49', facing: 'E', shape: 'straight', from: 106, …}
401
: 
{id: 593, at: '30,50', facing: 'E', shape: 'straight', from: 106, …}
402
: 
{id: 594, at: '4,20', facing: 'N', shape: 'corner', from: 100, …}
403
: 
{id: 595, at: '4,15', facing: 'E', shape: 'corner', from: 100, …}
404
: 
{id: 596, at: '6,15', facing: 'S', shape: 'straight', from: 100, …}
405
: 
{id: 597, at: '9,11', facing: 'S', shape: 'straight', from: 158, …}
406
: 
{id: 598, at: '7,11', facing: 'E', shape: 'corner', from: 158, …}
407
: 
{id: 599, at: '7,13', facing: 'E', shape: 'straight', from: 158, …}
408
: 
{id: 600, at: '13,18', facing: 'S', shape: 'straight', from: 47, …}
409
: 
{id: 601, at: '11,18', facing: 'S', shape: 'straight', from: 47, …}
410
: 
{id: 602, at: '12,18', facing: 'S', shape: 'straight', from: 47, …}
411
: 
{id: 603, at: '10,18', facing: 'S', shape: 'straight', from: 47, …}
412
: 
{id: 604, at: '7,18', facing: 'N', shape: 'corner', from: 47, …}
413
: 
{id: 605, at: '9,18', facing: 'S', shape: 'straight', from: 47, …}
414
: 
{id: 606, at: '13,13', facing: 'S', shape: 'straight', from: 125, …}
415
: 
{id: 607, at: '13,11', facing: 'S', shape: 'straight', from: 125, …}
416
: 
{id: 608, at: '11,10', facing: 'S', shape: 'straight', from: 40, …}
417
: 
{id: 609, at: '11,12', facing: 'S', shape: 'straight', from: 39, …}
418
: 
{id: 610, at: '23,12', facing: 'N', shape: 'straight', from: 37, …}
419
: 
{id: 611, at: '23,14', facing: 'N', shape: 'straight', from: 38, …}
420
: 
{id: 612, at: '21,13', facing: 'N', shape: 'straight', from: 126, …}
421
: 
{id: 613, at: '21,11', facing: 'N', shape: 'straight', from: 126, …}
422
: 
{id: 614, at: '16,12', facing: 'W', shape: 'corner', from: 3, …}
423
: 
{id: 615, at: '18,12', facing: 'N', shape: 'corner', from: 4, …}
424
: 
{id: 616, at: '17,11', facing: 'E', shape: 'straight', from: 5, …}
425
: 
{id: 617, at: '16,4', facing: 'W', shape: 'straight', from: 51, …}
426
: 
{id: 618, at: '18,4', facing: 'W', shape: 'straight', from: 52, …}
427
: 
{id: 619, at: '19,0', facing: 'N', shape: 'straight', from: 161, …}
428
: 
{id: 620, at: '20,0', facing: 'N', shape: 'straight', from: 161, …}
429
: 
{id: 621, at: '21,0', facing: 'N', shape: 'straight', from: 161, …}
430
: 
{id: 622, at: '22,0', facing: 'N', shape: 'straight', from: 161, …}
431
: 
{id: 623, at: '23,0', facing: 'N', shape: 'straight', from: 161, …}
432
: 
{id: 624, at: '25,2', facing: 'E', shape: 'straight', from: 161, …}
433
: 
{id: 625, at: '25,8', facing: 'W', shape: 'straight', from: 165, …}
434
: 
{id: 626, at: '28,11', facing: 'S', shape: 'straight', from: 162, …}
435
: 
{id: 627, at: '27,11', facing: 'S', shape: 'straight', from: 162, …}
436
: 
{id: 628, at: '26,11', facing: 'S', shape: 'straight', from: 162, …}
437
: 
{id: 629, at: '27,10', facing: 'S', shape: 'straight', from: 165, …}
438
: 
{id: 630, at: '28,10', facing: 'S', shape: 'straight', from: 165, …}
439
: 
{id: 631, at: '29,10', facing: 'S', shape: 'straight', from: 165, …}
440
: 
{id: 632, at: '30,10', facing: 'S', shape: 'straight', from: 165, …}
441
: 
{id: 633, at: '31,10', facing: 'S', shape: 'straight', from: 165, …}
442
: 
{id: 634, at: '33,10', facing: 'S', shape: 'straight', from: 165, …}
443
: 
{id: 635, at: '34,10', facing: 'S', shape: 'straight', from: 165, …}
444
: 
{id: 636, at: '31,11', facing: 'S', shape: 'straight', from: 162, …}
445
: 
{id: 637, at: '32,11', facing: 'S', shape: 'straight', from: 162, …}
446
: 
{id: 638, at: '33,11', facing: 'S', shape: 'straight', from: 162, …}
447
: 
{id: 639, at: '34,11', facing: 'S', shape: 'straight', from: 162, …}
448
: 
{id: 640, at: '35,11', facing: 'S', shape: 'straight', from: 162, …}
449
: 
{id: 641, at: '36,11', facing: 'S', shape: 'straight', from: 162, …}
450
: 
{id: 642, at: '30,11', facing: 'S', shape: 'straight', from: 162, …}
451
: 
{id: 643, at: '36,10', facing: 'S', shape: 'straight', from: 165, …}
452
: 
{id: 644, at: '37,10', facing: 'S', shape: 'straight', from: 165, …}
453
: 
{id: 645, at: '38,10', facing: 'S', shape: 'straight', from: 165, …}
454
: 
{id: 646, at: '39,10', facing: 'S', shape: 'straight', from: 165, …}
455
: 
{id: 647, at: '40,10', facing: 'S', shape: 'straight', from: 165, …}
456
: 
{id: 648, at: '41,10', facing: 'S', shape: 'straight', from: 165, …}
457
: 
{id: 649, at: '43,10', facing: 'S', shape: 'straight', from: 165, …}
458
: 
{id: 650, at: '44,10', facing: 'S', shape: 'straight', from: 165, …}
459
: 
{id: 651, at: '45,10', facing: 'S', shape: 'straight', from: 165, …}
460
: 
{id: 652, at: '46,10', facing: 'S', shape: 'straight', from: 165, …}
461
: 
{id: 653, at: '42,10', facing: 'S', shape: 'straight', from: 165, …}
462
: 
{id: 654, at: '32,10', facing: 'S', shape: 'straight', from: 165, …}
463
: 
{id: 655, at: '29,27', facing: 'N', shape: 'straight', from: 101, …}
464
: 
{id: 656, at: '30,27', facing: 'N', shape: 'straight', from: 101, …}
465
: 
{id: 657, at: '31,27', facing: 'N', shape: 'straight', from: 101, …}
466
: 
{id: 658, at: '32,27', facing: 'N', shape: 'straight', from: 101, …}
467
: 
{id: 659, at: '33,27', facing: 'N', shape: 'straight', from: 101, …}
468
: 
{id: 660, at: '34,27', facing: 'N', shape: 'straight', from: 101, …}
469
: 
{id: 661, at: '35,27', facing: 'N', shape: 'straight', from: 101, …}
470
: 
{id: 662, at: '36,27', facing: 'N', shape: 'straight', from: 101, …}
471
: 
{id: 663, at: '37,27', facing: 'N', shape: 'straight', from: 101, …}
472
: 
{id: 664, at: '38,27', facing: 'N', shape: 'straight', from: 101, …}
473
: 
{id: 665, at: '39,27', facing: 'N', shape: 'straight', from: 101, …}
474
: 
{id: 666, at: '40,27', facing: 'N', shape: 'straight', from: 101, …}
475
: 
{id: 667, at: '41,27', facing: 'N', shape: 'straight', from: 101, …}
476
: 
{id: 668, at: '42,27', facing: 'N', shape: 'straight', from: 101, …}
477
: 
{id: 669, at: '34,32', facing: 'S', shape: 'straight', from: 127, …}
478
: 
{id: 670, at: '34,30', facing: 'S', shape: 'straight', from: 127, …}
479
: 
{id: 671, at: '42,30', facing: 'N', shape: 'straight', from: 128, …}
480
: 
{id: 672, at: '42,32', facing: 'N', shape: 'straight', from: 128, …}
481
: 
{id: 673, at: '38,35', facing: 'E', shape: 'straight', from: 44, …}
482
: 
{id: 674, at: '36,35', facing: 'E', shape: 'straight', from: 43, …}
483
: 
{id: 675, at: '34,37', facing: 'S', shape: 'straight', from: 43, …}
484
: 
{id: 676, at: '33,37', facing: 'S', shape: 'straight', from: 43, …}
485
: 
{id: 677, at: '32,37', facing: 'S', shape: 'straight', from: 43, …}
486
: 
{id: 678, at: '31,37', facing: 'S', shape: 'straight', from: 43, …}
487
: 
{id: 679, at: '38,30', facing: 'E', shape: 'straight', from: 8, …}
488
: 
{id: 680, at: '49,34', facing: 'W', shape: 'corner', from: 102, …}
489
: 
{id: 681, at: '49,32', facing: 'W', shape: 'straight', from: 102, …}
490
: 
{id: 682, at: '27,34', facing: 'N', shape: 'corner', from: 101, …}
491
: 
{id: 683, at: '27,32', facing: 'W', shape: 'straight', from: 101, …}
492
: 
{id: 684, at: '27,31', facing: 'W', shape: 'straight', from: 101, …}
493
: 
{id: 685, at: '27,30', facing: 'W', shape: 'straight', from: 101, …}
494
: 
{id: 686, at: '27,29', facing: 'W', shape: 'straight', from: 101, …}
495
: 
{id: 687, at: '29,37', facing: 'N', shape: 'corner', from: 43, …}
496
: 
{id: 688, at: '27,27', facing: 'E', shape: 'corner', from: 101, …}
497
: 
{id: 689, at: '17,17', facing: 'E', shape: 'straight', from: 48, …}
498
: 
{id: 690, at: '17,19', facing: 'N', shape: 'corner', from: 48, …}
499
: 
{id: 691, at: '26,13', facing: 'S', shape: 'corner', from: 159, …}
[500 … 599]
500
: 
{id: 692, at: '26,19', facing: 'W', shape: 'corner', from: 48, …}
501
: 
{id: 693, at: '19,19', facing: 'N', shape: 'straight', from: 48, …}
502
: 
{id: 694, at: '20,19', facing: 'N', shape: 'straight', from: 48, …}
503
: 
{id: 695, at: '21,19', facing: 'N', shape: 'straight', from: 48, …}
504
: 
{id: 696, at: '22,19', facing: 'N', shape: 'straight', from: 48, …}
505
: 
{id: 697, at: '23,19', facing: 'N', shape: 'straight', from: 48, …}
506
: 
{id: 698, at: '24,19', facing: 'N', shape: 'straight', from: 48, …}
507
: 
{id: 699, at: '28,16', facing: 'W', shape: 'corner', from: 107, …}
508
: 
{id: 700, at: '28,14', facing: 'W', shape: 'straight', from: 107, …}
509
: 
{id: 701, at: '28,12', facing: 'E', shape: 'corner', from: 107, …}
510
: 
{id: 702, at: '31,12', facing: 'S', shape: 'corner', from: 107, …}
511
: 
{id: 703, at: '31,15', facing: 'N', shape: 'corner', from: 107, …}
512
: 
{id: 704, at: '33,15', facing: 'N', shape: 'straight', from: 107, …}
513
: 
{id: 705, at: '34,15', facing: 'N', shape: 'straight', from: 107, …}
514
: 
{id: 706, at: '35,15', facing: 'N', shape: 'straight', from: 107, …}
515
: 
{id: 707, at: '13,36', facing: 'S', shape: 'corner', from: 59, …}
516
: 
{id: 708, at: '18,39', facing: 'S', shape: 'corner', from: 108, …}
517
: 
{id: 709, at: '15,39', facing: 'N', shape: 'straight', from: 108, …}
518
: 
{id: 710, at: '16,39', facing: 'N', shape: 'straight', from: 108, …}
519
: 
{id: 711, at: '22,47', facing: 'N', shape: 'corner', from: 65, …}
520
: 
{id: 712, at: '20,44', facing: 'E', shape: 'corner', from: 109, …}
521
: 
{id: 713, at: '20,46', facing: 'E', shape: 'straight', from: 109, …}
522
: 
{id: 714, at: '28,40', facing: 'S', shape: 'corner', from: 17, …}
523
: 
{id: 715, at: '28,43', facing: 'N', shape: 'corner', from: 17, …}
524
: 
{id: 716, at: '31,42', facing: 'N', shape: 'straight', from: 148, …}
525
: 
{id: 717, at: '31,44', facing: 'N', shape: 'straight', from: 148, …}
526
: 
{id: 718, at: '33,43', facing: 'N', shape: 'straight', from: 80, …}
527
: 
{id: 719, at: '33,45', facing: 'N', shape: 'straight', from: 81, …}
528
: 
{id: 720, at: '36,44', facing: 'W', shape: 'corner', from: 180, …}
529
: 
{id: 721, at: '26,39', facing: 'N', shape: 'corner', from: 180, …}
530
: 
{id: 722, at: '36,39', facing: 'S', shape: 'corner', from: 180, …}
531
: 
{id: 723, at: '36,41', facing: 'W', shape: 'straight', from: 180, …}
532
: 
{id: 724, at: '36,42', facing: 'W', shape: 'straight', from: 180, …}
533
: 
{id: 725, at: '33,39', facing: 'S', shape: 'straight', from: 180, …}
534
: 
{id: 726, at: '32,39', facing: 'S', shape: 'straight', from: 180, …}
535
: 
{id: 727, at: '31,39', facing: 'S', shape: 'straight', from: 180, …}
536
: 
{id: 728, at: '30,39', facing: 'S', shape: 'straight', from: 180, …}
537
: 
{id: 729, at: '29,39', facing: 'S', shape: 'straight', from: 180, …}
538
: 
{id: 730, at: '34,39', facing: 'S', shape: 'straight', from: 180, …}
539
: 
{id: 731, at: '28,39', facing: 'S', shape: 'straight', from: 180, …}
540
: 
{id: 732, at: '9,37', facing: 'N', shape: 'straight', from: 167, …}
541
: 
{id: 733, at: '11,37', facing: 'S', shape: 'corner', from: 167, …}
542
: 
{id: 734, at: '11,40', facing: 'W', shape: 'corner', from: 167, …}
543
: 
{id: 735, at: '5,40', facing: 'N', shape: 'corner', from: 56, …}
544
: 
{id: 736, at: '8,42', facing: 'N', shape: 'corner', from: 110, …}
545
: 
{id: 737, at: '7,44', facing: 'N', shape: 'straight', from: 111, …}
546
: 
{id: 738, at: '8,44', facing: 'N', shape: 'straight', from: 111, …}
547
: 
{id: 739, at: '9,44', facing: 'N', shape: 'straight', from: 111, …}
548
: 
{id: 740, at: '0,33', facing: 'E', shape: 'straight', from: 166, …}
549
: 
{id: 741, at: '0,34', facing: 'E', shape: 'straight', from: 166, …}
550
: 
{id: 742, at: '0,35', facing: 'E', shape: 'straight', from: 166, …}
551
: 
{id: 743, at: '0,36', facing: 'E', shape: 'straight', from: 166, …}
552
: 
{id: 744, at: '0,37', facing: 'E', shape: 'straight', from: 166, …}
553
: 
{id: 745, at: '0,38', facing: 'E', shape: 'straight', from: 166, …}
554
: 
{id: 746, at: '0,39', facing: 'E', shape: 'straight', from: 166, …}
555
: 
{id: 747, at: '0,40', facing: 'E', shape: 'straight', from: 166, …}
556
: 
{id: 748, at: '4,33', facing: 'E', shape: 'straight', from: 55, …}
557
: 
{id: 749, at: '4,34', facing: 'E', shape: 'straight', from: 55, …}
558
: 
{id: 750, at: '4,35', facing: 'E', shape: 'straight', from: 55, …}
559
: 
{id: 751, at: '4,36', facing: 'E', shape: 'straight', from: 55, …}
560
: 
{id: 752, at: '4,37', facing: 'E', shape: 'straight', from: 55, …}
561
: 
{id: 753, at: '4,39', facing: 'E', shape: 'straight', from: 55, …}
562
: 
{id: 754, at: '4,38', facing: 'E', shape: 'straight', from: 55, …}
563
: 
{id: 755, at: '4,40', facing: 'E', shape: 'straight', from: 55, …}
564
: 
{id: 756, at: '4,41', facing: 'E', shape: 'straight', from: 55, …}
565
: 
{id: 757, at: '4,42', facing: 'E', shape: 'straight', from: 55, …}
566
: 
{id: 758, at: '0,41', facing: 'E', shape: 'straight', from: 166, …}
567
: 
{id: 759, at: '4,47', facing: 'W', shape: 'corner', from: 166, …}
568
: 
{id: 760, at: '0,47', facing: 'N', shape: 'corner', from: 166, …}
569
: 
{id: 761, at: '0,42', facing: 'E', shape: 'straight', from: 166, …}
570
: 
{id: 762, at: '0,43', facing: 'E', shape: 'straight', from: 166, …}
571
: 
{id: 763, at: '0,44', facing: 'E', shape: 'straight', from: 166, …}
572
: 
{id: 764, at: '0,45', facing: 'E', shape: 'straight', from: 166, …}
573
: 
{id: 765, at: '2,47', facing: 'N', shape: 'straight', from: 166, …}
574
: 
{id: 766, at: '14,39', facing: 'N', shape: 'straight', from: 108, …}
575
: 
{id: 767, at: '40,42', facing: 'S', shape: 'straight', from: 174, …}
576
: 
{id: 768, at: '38,42', facing: 'E', shape: 'corner', from: 174, …}
577
: 
{id: 769, at: '38,44', facing: 'E', shape: 'straight', from: 174, …}
578
: 
{id: 770, at: '38,45', facing: 'E', shape: 'straight', from: 174, …}
579
: 
{id: 771, at: '38,46', facing: 'E', shape: 'straight', from: 174, …}
580
: 
{id: 772, at: '38,47', facing: 'E', shape: 'straight', from: 174, …}
581
: 
{id: 773, at: '38,48', facing: 'E', shape: 'straight', from: 174, …}
582
: 
{id: 774, at: '38,49', facing: 'E', shape: 'straight', from: 174, …}
583
: 
{id: 775, at: '38,50', facing: 'E', shape: 'straight', from: 174, …}
584
: 
{id: 776, at: '38,51', facing: 'E', shape: 'straight', from: 174, …}
585
: 
{id: 777, at: '38,52', facing: 'E', shape: 'straight', from: 174, …}
586
: 
{id: 778, at: '38,53', facing: 'E', shape: 'straight', from: 174, …}
587
: 
{id: 779, at: '43,49', facing: 'N', shape: 'corner', from: 74, …}
588
: 
{id: 780, at: '43,46', facing: 'S', shape: 'corner', from: 74, …}
589
: 
{id: 781, at: '41,46', facing: 'S', shape: 'straight', from: 74, …}
590
: 
{id: 782, at: '39,46', facing: 'E', shape: 'corner', from: 74, …}
591
: 
{id: 783, at: '38,54', facing: 'E', shape: 'straight', from: 174, …}
592
: 
{id: 784, at: '38,56', facing: 'N', shape: 'corner', from: 174, …}
593
: 
{id: 785, at: '40,56', facing: 'N', shape: 'straight', from: 174, …}
594
: 
{id: 786, at: '42,56', facing: 'W', shape: 'corner', from: 174, …}
595
: 
{id: 787, at: '42,53', facing: 'S', shape: 'corner', from: 174, …}
596
: 
{id: 788, at: '39,53', facing: 'N', shape: 'corner', from: 174, …}
597
: 
{id: 789, at: '39,48', facing: 'E', shape: 'straight', from: 74, …}
598
: 
{id: 790, at: '46,50', facing: 'S', shape: 'corner', from: 112, …}
599
: 
{id: 791, at: '46,52', facing: 'E', shape: 'straight', from: 112, …}
[600 … 699]
600
: 
{id: 792, at: '40,50', facing: 'N', shape: 'straight', from: 112, …}
601
: 
{id: 793, at: '41,50', facing: 'N', shape: 'straight', from: 112, …}
602
: 
{id: 794, at: '42,50', facing: 'N', shape: 'straight', from: 112, …}
603
: 
{id: 795, at: '43,50', facing: 'N', shape: 'straight', from: 112, …}
604
: 
{id: 796, at: '44,50', facing: 'N', shape: 'straight', from: 112, …}
605
: 
{id: 797, at: '57,49', facing: 'W', shape: 'corner', from: 172, …}
606
: 
{id: 798, at: '54,51', facing: 'W', shape: 'corner', from: 113, …}
607
: 
{id: 799, at: '59,53', facing: 'N', shape: 'corner', from: 147, …}
608
: 
{id: 800, at: '62,58', facing: 'W', shape: 'corner', from: 114, …}
609
: 
{id: 801, at: '60,58', facing: 'S', shape: 'straight', from: 114, …}
610
: 
{id: 802, at: '62,56', facing: 'E', shape: 'straight', from: 114, …}
611
: 
{id: 803, at: '62,54', facing: 'E', shape: 'straight', from: 114, …}
612
: 
{id: 804, at: '62,55', facing: 'E', shape: 'straight', from: 114, …}
613
: 
{id: 805, at: '64,30', facing: 'S', shape: 'corner', from: 173, …}
614
: 
{id: 806, at: '66,33', facing: 'S', shape: 'corner', from: 115, …}
615
: 
{id: 807, at: '57,56', facing: 'W', shape: 'corner', from: 147, …}
616
: 
{id: 808, at: '57,53', facing: 'E', shape: 'straight', from: 147, …}
617
: 
{id: 809, at: '57,54', facing: 'E', shape: 'straight', from: 147, …}
618
: 
{id: 810, at: '57,52', facing: 'E', shape: 'straight', from: 147, …}
619
: 
{id: 811, at: '54,56', facing: 'S', shape: 'straight', from: 147, …}
620
: 
{id: 812, at: '55,56', facing: 'S', shape: 'straight', from: 147, …}
621
: 
{id: 813, at: '50,56', facing: 'N', shape: 'straight', from: 175, …}
622
: 
{id: 814, at: '52,57', facing: 'E', shape: 'straight', from: 116, …}
623
: 
{id: 815, at: '52,58', facing: 'E', shape: 'straight', from: 116, …}
624
: 
{id: 816, at: '52,59', facing: 'E', shape: 'straight', from: 116, …}
625
: 
{id: 817, at: '30,51', facing: 'E', shape: 'straight', from: 106, …}
626
: 
{id: 818, at: '30,52', facing: 'E', shape: 'straight', from: 106, …}
627
: 
{id: 819, at: '30,53', facing: 'E', shape: 'straight', from: 106, …}
628
: 
{id: 820, at: '30,54', facing: 'E', shape: 'straight', from: 106, …}
629
: 
{id: 821, at: '30,55', facing: 'E', shape: 'straight', from: 106, …}
630
: 
{id: 822, at: '30,56', facing: 'E', shape: 'straight', from: 106, …}
631
: 
{id: 823, at: '30,57', facing: 'E', shape: 'straight', from: 106, …}
632
: 
{id: 824, at: '30,58', facing: 'E', shape: 'straight', from: 106, …}
633
: 
{id: 825, at: '30,59', facing: 'E', shape: 'straight', from: 106, …}
634
: 
{id: 826, at: '30,60', facing: 'E', shape: 'straight', from: 106, …}
635
: 
{id: 827, at: '30,62', facing: 'E', shape: 'straight', from: 106, …}
636
: 
{id: 828, at: '30,63', facing: 'E', shape: 'straight', from: 106, …}
637
: 
{id: 829, at: '30,61', facing: 'E', shape: 'straight', from: 106, …}
638
: 
{id: 830, at: '30,64', facing: 'E', shape: 'straight', from: 106, …}
639
: 
{id: 831, at: '30,65', facing: 'E', shape: 'straight', from: 106, …}
640
: 
{id: 832, at: '30,66', facing: 'E', shape: 'straight', from: 106, …}
641
: 
{id: 833, at: '30,67', facing: 'E', shape: 'straight', from: 106, …}
642
: 
{id: 834, at: '32,62', facing: 'E', shape: 'corner', from: 26, …}
643
: 
{id: 835, at: '32,65', facing: 'N', shape: 'corner', from: 26, …}
644
: 
{id: 836, at: '38,62', facing: 'S', shape: 'corner', from: 27, …}
645
: 
{id: 837, at: '38,64', facing: 'W', shape: 'straight', from: 27, …}
646
: 
{id: 838, at: '31,60', facing: 'E', shape: 'corner', from: 117, …}
647
: 
{id: 839, at: '35,60', facing: 'S', shape: 'corner', from: 117, …}
648
: 
{id: 840, at: '33,60', facing: 'S', shape: 'straight', from: 117, …}
649
: 
{id: 841, at: '31,62', facing: 'E', shape: 'straight', from: 117, …}
650
: 
{id: 842, at: '31,63', facing: 'E', shape: 'straight', from: 117, …}
651
: 
{id: 843, at: '31,65', facing: 'E', shape: 'straight', from: 117, …}
652
: 
{id: 844, at: '31,66', facing: 'E', shape: 'straight', from: 117, …}
653
: 
{id: 845, at: '31,64', facing: 'E', shape: 'straight', from: 117, …}
654
: 
{id: 846, at: '31,67', facing: 'E', shape: 'straight', from: 117, …}
655
: 
{id: 847, at: '31,68', facing: 'E', shape: 'straight', from: 117, …}
656
: 
{id: 848, at: '31,69', facing: 'E', shape: 'straight', from: 117, …}
657
: 
{id: 849, at: '31,70', facing: 'E', shape: 'straight', from: 117, …}
658
: 
{id: 850, at: '31,71', facing: 'E', shape: 'straight', from: 117, …}
659
: 
{id: 851, at: '22,48', facing: 'E', shape: 'corner', from: 171, …}
660
: 
{id: 852, at: '22,51', facing: 'W', shape: 'corner', from: 171, …}
661
: 
{id: 853, at: '19,51', facing: 'N', shape: 'corner', from: 171, …}
662
: 
{id: 854, at: '19,49', facing: 'W', shape: 'straight', from: 171, …}
663
: 
{id: 855, at: '19,48', facing: 'W', shape: 'straight', from: 171, …}
664
: 
{id: 856, at: '31,73', facing: 'W', shape: 'corner', from: 117, …}
665
: 
{id: 857, at: '27,73', facing: 'N', shape: 'corner', from: 117, …}
666
: 
{id: 858, at: '29,73', facing: 'S', shape: 'straight', from: 117, …}
667
: 
{id: 859, at: '15,50', facing: 'N', shape: 'corner', from: 28, …}
668
: 
{id: 860, at: '15,47', facing: 'S', shape: 'corner', from: 28, …}
669
: 
{id: 861, at: '12,46', facing: 'S', shape: 'straight', from: 149, …}
670
: 
{id: 862, at: '12,48', facing: 'S', shape: 'straight', from: 149, …}
671
: 
{id: 863, at: '10,45', facing: 'S', shape: 'straight', from: 83, …}
672
: 
{id: 864, at: '10,47', facing: 'S', shape: 'straight', from: 82, …}
673
: 
{id: 865, at: '16,51', facing: 'S', shape: 'straight', from: 29, …}
674
: 
{id: 866, at: '15,51', facing: 'S', shape: 'straight', from: 29, …}
675
: 
{id: 867, at: '13,50', facing: 'S', shape: 'straight', from: 150, …}
676
: 
{id: 868, at: '13,52', facing: 'S', shape: 'straight', from: 150, …}
677
: 
{id: 869, at: '10,51', facing: 'E', shape: 'corner', from: 85, …}
678
: 
{id: 870, at: '10,49', facing: 'S', shape: 'straight', from: 84, …}
679
: 
{id: 871, at: '11,49', facing: 'S', shape: 'straight', from: 84, …}
680
: 
{id: 872, at: '8,49', facing: 'E', shape: 'corner', from: 84, …}
681
: 
{id: 873, at: '8,52', facing: 'W', shape: 'corner', from: 84, …}
682
: 
{id: 874, at: '5,52', facing: 'N', shape: 'corner', from: 84, …}
683
: 
{id: 875, at: '5,46', facing: 'E', shape: 'corner', from: 182, …}
684
: 
{id: 876, at: '7,46', facing: 'S', shape: 'straight', from: 182, …}
685
: 
{id: 877, at: '8,46', facing: 'S', shape: 'straight', from: 182, …}
686
: 
{id: 878, at: '18,52', facing: 'E', shape: 'straight', from: 30, …}
687
: 
{id: 879, at: '17,54', facing: 'E', shape: 'straight', from: 151, …}
688
: 
{id: 880, at: '19,54', facing: 'E', shape: 'straight', from: 151, …}
689
: 
{id: 881, at: '16,56', facing: 'E', shape: 'straight', from: 86, …}
690
: 
{id: 882, at: '18,56', facing: 'E', shape: 'straight', from: 87, …}
691
: 
{id: 883, at: '17,59', facing: 'W', shape: 'corner', from: 183, …}
692
: 
{id: 884, at: '10,59', facing: 'N', shape: 'corner', from: 85, …}
693
: 
{id: 885, at: '12,59', facing: 'N', shape: 'straight', from: 85, …}
694
: 
{id: 886, at: '10,53', facing: 'E', shape: 'straight', from: 85, …}
695
: 
{id: 887, at: '10,57', facing: 'E', shape: 'straight', from: 85, …}
696
: 
{id: 888, at: '10,54', facing: 'E', shape: 'straight', from: 85, …}
697
: 
{id: 889, at: '10,56', facing: 'E', shape: 'straight', from: 85, …}
698
: 
{id: 890, at: '10,55', facing: 'E', shape: 'straight', from: 85, …}
699
: 
{id: 891, at: '4,69', facing: 'E', shape: 'straight', from: 31, …}
[700 … 799]
700
: 
{id: 892, at: '3,72', facing: 'W', shape: 'corner', from: 152, …}
701
: 
{id: 893, at: '0,72', facing: 'N', shape: 'corner', from: 152, …}
702
: 
{id: 894, at: '5,71', facing: 'E', shape: 'straight', from: 152, …}
703
: 
{id: 895, at: '7,74', facing: 'N', shape: 'straight', from: 93, …}
704
: 
{id: 896, at: '9,74', facing: 'N', shape: 'straight', from: 93, …}
705
: 
{id: 897, at: '10,74', facing: 'N', shape: 'straight', from: 93, …}
706
: 
{id: 898, at: '11,74', facing: 'N', shape: 'straight', from: 93, …}
707
: 
{id: 899, at: '8,74', facing: 'N', shape: 'straight', from: 93, …}
708
: 
{id: 900, at: '6,67', facing: 'N', shape: 'straight', from: 32, …}
709
: 
{id: 901, at: '3,49', facing: 'E', shape: 'corner', from: 118, …}
710
: 
{id: 902, at: '2,67', facing: 'N', shape: 'corner', from: 33, …}
711
: 
{id: 903, at: '1,64', facing: 'W', shape: 'straight', from: 153, …}
712
: 
{id: 904, at: '3,64', facing: 'W', shape: 'straight', from: 153, …}
713
: 
{id: 905, at: '2,62', facing: 'W', shape: 'straight', from: 88, …}
714
: 
{id: 906, at: '4,62', facing: 'W', shape: 'straight', from: 89, …}
715
: 
{id: 907, at: '0,69', facing: 'W', shape: 'straight', from: 152, …}
716
: 
{id: 908, at: '0,70', facing: 'W', shape: 'straight', from: 152, …}
717
: 
{id: 909, at: '0,66', facing: 'W', shape: 'straight', from: 152, …}
718
: 
{id: 910, at: '0,68', facing: 'W', shape: 'straight', from: 152, …}
719
: 
{id: 911, at: '0,67', facing: 'W', shape: 'straight', from: 152, …}
720
: 
{id: 912, at: '0,65', facing: 'W', shape: 'straight', from: 152, …}
721
: 
{id: 913, at: '0,64', facing: 'W', shape: 'straight', from: 152, …}
722
: 
{id: 914, at: '0,63', facing: 'W', shape: 'straight', from: 152, …}
723
: 
{id: 915, at: '0,62', facing: 'W', shape: 'straight', from: 152, …}
724
: 
{id: 916, at: '3,51', facing: 'E', shape: 'straight', from: 118, …}
725
: 
{id: 917, at: '3,52', facing: 'E', shape: 'straight', from: 118, …}
726
: 
{id: 918, at: '3,54', facing: 'N', shape: 'corner', from: 118, …}
727
: 
{id: 919, at: '0,60', facing: 'W', shape: 'straight', from: 152, …}
728
: 
{id: 920, at: '0,59', facing: 'W', shape: 'straight', from: 152, …}
729
: 
{id: 921, at: '0,58', facing: 'W', shape: 'straight', from: 152, …}
730
: 
{id: 922, at: '0,61', facing: 'W', shape: 'straight', from: 152, …}
731
: 
{id: 923, at: '4,59', facing: 'N', shape: 'straight', from: 120, …}
732
: 
{id: 924, at: '6,59', facing: 'S', shape: 'corner', from: 120, …}
733
: 
{id: 925, at: '6,62', facing: 'N', shape: 'corner', from: 120, …}
734
: 
{id: 926, at: '8,62', facing: 'N', shape: 'straight', from: 120, …}
735
: 
{id: 927, at: '7,60', facing: 'N', shape: 'corner', from: 118, …}
736
: 
{id: 928, at: '7,54', facing: 'S', shape: 'corner', from: 118, …}
737
: 
{id: 929, at: '7,56', facing: 'E', shape: 'straight', from: 118, …}
738
: 
{id: 930, at: '7,58', facing: 'E', shape: 'straight', from: 118, …}
739
: 
{id: 931, at: '7,57', facing: 'E', shape: 'straight', from: 118, …}
740
: 
{id: 932, at: '5,54', facing: 'N', shape: 'straight', from: 118, …}
741
: 
{id: 933, at: '4,55', facing: 'S', shape: 'corner', from: 152, …}
742
: 
{id: 934, at: '0,55', facing: 'E', shape: 'corner', from: 152, …}
743
: 
{id: 935, at: '0,57', facing: 'W', shape: 'straight', from: 152, …}
744
: 
{id: 936, at: '2,55', facing: 'N', shape: 'straight', from: 152, …}
745
: 
{id: 937, at: '8,66', facing: 'N', shape: 'straight', from: 154, …}
746
: 
{id: 938, at: '8,68', facing: 'N', shape: 'straight', from: 154, …}
747
: 
{id: 939, at: '10,67', facing: 'N', shape: 'straight', from: 91, …}
748
: 
{id: 940, at: '10,69', facing: 'N', shape: 'straight', from: 92, …}
749
: 
{id: 941, at: '13,68', facing: 'S', shape: 'corner', from: 186, …}
750
: 
{id: 942, at: '13,74', facing: 'W', shape: 'corner', from: 93, …}
751
: 
{id: 943, at: '11,61', facing: 'S', shape: 'corner', from: 185, …}
752
: 
{id: 944, at: '11,63', facing: 'E', shape: 'straight', from: 185, …}
753
: 
{id: 945, at: '11,65', facing: 'N', shape: 'corner', from: 185, …}
754
: 
{id: 946, at: '14,60', facing: 'E', shape: 'straight', from: 119, …}
755
: 
{id: 947, at: '14,61', facing: 'E', shape: 'straight', from: 119, …}
756
: 
{id: 948, at: '14,63', facing: 'N', shape: 'corner', from: 119, …}
757
: 
{id: 949, at: '13,65', facing: 'N', shape: 'straight', from: 185, …}
758
: 
{id: 950, at: '14,65', facing: 'N', shape: 'straight', from: 185, …}
759
: 
{id: 951, at: '15,65', facing: 'N', shape: 'straight', from: 185, …}
760
: 
{id: 952, at: '15,71', facing: 'N', shape: 'straight', from: 121, …}
761
: 
{id: 953, at: '14,71', facing: 'N', shape: 'straight', from: 121, …}
762
: 
{id: 954, at: '4,74', facing: 'N', shape: 'corner', from: 93, …}
763
: 
{id: 955, at: '6,74', facing: 'N', shape: 'straight', from: 93, …}
764
: 
{id: 956, at: '60,61', facing: 'S', shape: 'straight', from: 34, …}
765
: 
{id: 957, at: '59,61', facing: 'S', shape: 'straight', from: 34, …}
766
: 
{id: 958, at: '57,61', facing: 'E', shape: 'corner', from: 34, …}
767
: 
{id: 959, at: '56,64', facing: 'E', shape: 'straight', from: 155, …}
768
: 
{id: 960, at: '58,64', facing: 'E', shape: 'straight', from: 155, …}
769
: 
{id: 961, at: '55,66', facing: 'E', shape: 'straight', from: 94, …}
770
: 
{id: 962, at: '57,66', facing: 'E', shape: 'straight', from: 95, …}
771
: 
{id: 963, at: '63,60', facing: 'N', shape: 'straight', from: 35, …}
772
: 
{id: 964, at: '65,59', facing: 'N', shape: 'straight', from: 156, …}
773
: 
{id: 965, at: '65,61', facing: 'N', shape: 'straight', from: 156, …}
774
: 
{id: 966, at: '67,60', facing: 'N', shape: 'straight', from: 96, …}
775
: 
{id: 967, at: '67,62', facing: 'N', shape: 'straight', from: 97, …}
776
: 
{id: 968, at: '62,62', facing: 'E', shape: 'straight', from: 36, …}
777
: 
{id: 969, at: '61,64', facing: 'E', shape: 'straight', from: 157, …}
778
: 
{id: 970, at: '63,64', facing: 'E', shape: 'straight', from: 157, …}
779
: 
{id: 971, at: '56,72', facing: 'N', shape: 'corner', from: 98, …}
780
: 
{id: 972, at: '60,72', facing: 'W', shape: 'corner', from: 98, …}
781
: 
{id: 973, at: '58,72', facing: 'S', shape: 'straight', from: 98, …}
782
: 
{id: 974, at: '60,66', facing: 'E', shape: 'straight', from: 98, …}
783
: 
{id: 975, at: '60,67', facing: 'E', shape: 'straight', from: 98, …}
784
: 
{id: 976, at: '60,68', facing: 'E', shape: 'straight', from: 98, …}
785
: 
{id: 977, at: '60,69', facing: 'E', shape: 'straight', from: 98, …}
786
: 
{id: 978, at: '60,70', facing: 'E', shape: 'straight', from: 98, …}
787
: 
{id: 979, at: '62,66', facing: 'E', shape: 'straight', from: 99, …}
788
: 
{id: 980, at: '62,67', facing: 'E', shape: 'straight', from: 99, …}
789
: 
{id: 981, at: '62,68', facing: 'E', shape: 'straight', from: 99, …}
790
: 
{id: 982, at: '62,69', facing: 'E', shape: 'straight', from: 99, …}
791
: 
{id: 983, at: '62,72', facing: 'N', shape: 'corner', from: 99, …}
792
: 
{id: 984, at: '62,70', facing: 'E', shape: 'straight', from: 99, …}
793
: 
{id: 985, at: '64,72', facing: 'N', shape: 'straight', from: 99, …}
794
: 
{id: 986, at: '70,61', facing: 'S', shape: 'corner', from: 189, …}
795
: 
{id: 987, at: '70,72', facing: 'W', shape: 'corner', from: 189, …}
796
: 
{id: 988, at: '70,63', facing: 'E', shape: 'straight', from: 189, …}
797
: 
{id: 989, at: '70,64', facing: 'E', shape: 'straight', from: 189, …}
798
: 
{id: 990, at: '70,65', facing: 'E', shape: 'straight', from: 189, …}
799
: 
{id: 991, at: '70,66', facing: 'E', shape: 'straight', from: 189, …}
[800 … 876]
800
: 
{id: 992, at: '70,67', facing: 'E', shape: 'straight', from: 189, …}
801
: 
{id: 993, at: '70,68', facing: 'E', shape: 'straight', from: 189, …}
802
: 
{id: 994, at: '70,69', facing: 'E', shape: 'straight', from: 189, …}
803
: 
{id: 995, at: '70,70', facing: 'E', shape: 'straight', from: 189, …}
804
: 
{id: 996, at: '68,72', facing: 'S', shape: 'straight', from: 189, …}
805
: 
{id: 997, at: '66,74', facing: 'W', shape: 'corner', from: 123, …}
806
: 
{id: 998, at: '64,74', facing: 'S', shape: 'straight', from: 123, …}
807
: 
{id: 999, at: '63,74', facing: 'S', shape: 'straight', from: 123, …}
808
: 
{id: 1000, at: '62,74', facing: 'S', shape: 'straight', from: 123, …}
809
: 
{id: 1001, at: '61,74', facing: 'S', shape: 'straight', from: 123, …}
810
: 
{id: 1002, at: '60,74', facing: 'S', shape: 'straight', from: 123, …}
811
: 
{id: 1003, at: '59,74', facing: 'S', shape: 'straight', from: 123, …}
812
: 
{id: 1004, at: '58,74', facing: 'S', shape: 'straight', from: 123, …}
813
: 
{id: 1005, at: '57,74', facing: 'S', shape: 'straight', from: 123, …}
814
: 
{id: 1006, at: '56,74', facing: 'S', shape: 'straight', from: 123, …}
815
: 
{id: 1007, at: '55,69', facing: 'S', shape: 'straight', from: 122, …}
816
: 
{id: 1008, at: '54,69', facing: 'S', shape: 'straight', from: 122, …}
817
: 
{id: 1009, at: '53,69', facing: 'S', shape: 'straight', from: 122, …}
818
: 
{id: 1010, at: '52,69', facing: 'S', shape: 'straight', from: 122, …}
819
: 
{id: 1011, at: '51,69', facing: 'S', shape: 'straight', from: 122, …}
820
: 
{id: 1012, at: '54,74', facing: 'N', shape: 'corner', from: 123, …}
821
: 
{id: 1013, at: '54,71', facing: 'S', shape: 'corner', from: 123, …}
822
: 
{id: 1014, at: '52,71', facing: 'S', shape: 'straight', from: 123, …}
823
: 
{id: 1015, at: '51,71', facing: 'S', shape: 'straight', from: 123, …}
824
: 
{id: 1016, at: '49,70', facing: 'S', shape: 'straight', from: 190, …}
825
: 
{id: 1017, at: '48,70', facing: 'S', shape: 'straight', from: 190, …}
826
: 
{id: 1018, at: '47,70', facing: 'S', shape: 'straight', from: 190, …}
827
: 
{id: 1019, at: '46,70', facing: 'S', shape: 'straight', from: 190, …}
828
: 
{id: 1020, at: '45,70', facing: 'S', shape: 'straight', from: 190, …}
829
: 
{id: 1021, at: '44,70', facing: 'S', shape: 'straight', from: 190, …}
830
: 
{id: 1022, at: '43,70', facing: 'S', shape: 'straight', from: 190, …}
831
: 
{id: 1023, at: '42,70', facing: 'S', shape: 'straight', from: 190, …}
832
: 
{id: 1024, at: '41,70', facing: 'S', shape: 'straight', from: 190, …}
833
: 
{id: 1025, at: '40,70', facing: 'S', shape: 'straight', from: 190, …}
834
: 
{id: 1026, at: '39,70', facing: 'S', shape: 'straight', from: 190, …}
835
: 
{id: 1027, at: '37,70', facing: 'E', shape: 'corner', from: 190, …}
836
: 
{id: 1028, at: '37,74', facing: 'W', shape: 'corner', from: 190, …}
837
: 
{id: 1029, at: '37,72', facing: 'E', shape: 'straight', from: 190, …}
838
: 
{id: 1030, at: '35,74', facing: 'S', shape: 'straight', from: 190, …}
839
: 
{id: 1031, at: '34,74', facing: 'S', shape: 'straight', from: 190, …}
840
: 
{id: 1032, at: '33,74', facing: 'S', shape: 'straight', from: 190, …}
841
: 
{id: 1033, at: '32,74', facing: 'S', shape: 'straight', from: 190, …}
842
: 
{id: 1034, at: '31,74', facing: 'S', shape: 'straight', from: 190, …}
843
: 
{id: 1035, at: '30,74', facing: 'S', shape: 'straight', from: 190, …}
844
: 
{id: 1036, at: '29,74', facing: 'S', shape: 'straight', from: 190, …}
845
: 
{id: 1037, at: '28,74', facing: 'S', shape: 'straight', from: 190, …}
846
: 
{id: 1038, at: '27,74', facing: 'S', shape: 'straight', from: 190, …}
847
: 
{id: 1039, at: '18,64', facing: 'W', shape: 'corner', from: 187, …}
848
: 
{id: 1040, at: '18,60', facing: 'E', shape: 'corner', from: 187, …}
849
: 
{id: 1041, at: '18,62', facing: 'W', shape: 'straight', from: 187, …}
850
: 
{id: 1042, at: '17,71', facing: 'W', shape: 'corner', from: 121, …}
851
: 
{id: 1043, at: '17,69', facing: 'W', shape: 'straight', from: 121, …}
852
: 
{id: 1044, at: '17,68', facing: 'W', shape: 'straight', from: 121, …}
853
: 
{id: 1045, at: '17,66', facing: 'E', shape: 'corner', from: 121, …}
854
: 
{id: 1046, at: '20,66', facing: 'W', shape: 'corner', from: 121, …}
855
: 
{id: 1047, at: '20,64', facing: 'W', shape: 'straight', from: 121, …}
856
: 
{id: 1048, at: '20,62', facing: 'E', shape: 'corner', from: 121, …}
857
: 
{id: 1049, at: '20,60', facing: 'N', shape: 'straight', from: 187, …}
858
: 
{id: 1050, at: '21,60', facing: 'N', shape: 'straight', from: 187, …}
859
: 
{id: 1051, at: '26,74', facing: 'S', shape: 'straight', from: 190, …}
860
: 
{id: 1052, at: '24,61', facing: 'S', shape: 'corner', from: 191, …}
861
: 
{id: 1053, at: '24,63', facing: 'E', shape: 'straight', from: 191, …}
862
: 
{id: 1054, at: '24,64', facing: 'E', shape: 'straight', from: 191, …}
863
: 
{id: 1055, at: '24,65', facing: 'E', shape: 'straight', from: 191, …}
864
: 
{id: 1056, at: '24,66', facing: 'E', shape: 'straight', from: 191, …}
865
: 
{id: 1057, at: '24,67', facing: 'E', shape: 'straight', from: 191, …}
866
: 
{id: 1058, at: '24,74', facing: 'N', shape: 'corner', from: 190, …}
867
: 
{id: 1059, at: '24,72', facing: 'W', shape: 'straight', from: 190, …}
868
: 
{id: 1060, at: '24,68', facing: 'E', shape: 'straight', from: 191, …}
869
: 
{id: 1061, at: '30,70', facing: 'W', shape: 'corner', from: 106, …}
870
: 
{id: 1062, at: '30,68', facing: 'E', shape: 'straight', from: 106, …}
871
: 
{id: 1063, at: '25,3', facing: 'E', shape: 'straight', from: 161, …}
872
: 
{id: 1064, at: '25,4', facing: 'E', shape: 'straight', from: 161, …}
873
: 
{id: 1065, at: '24,6', facing: 'N', shape: 'straight', from: 162, …}
874
: 
{id: 1066, at: '26,6', facing: 'S', shape: 'straight', from: 160, …}
875
: 
{id: 1067, at: '25,7', facing: 'W', shape: 'straight', from: 165, …}
876
: 
{id: 1068, at: '25,5', facing: 'E', shape: 'straight', from: 161, …}
length
: 
877`

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
