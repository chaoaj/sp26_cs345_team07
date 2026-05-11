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
{id: 90, at: '7,15', facing: 'W', inputRate: 3, outputRate: 1, …}
1
: 
{id: 91, at: '29,34', facing: 'W', inputRate: 3, outputRate: 1, …}
2
: 
{id: 92, at: '47,34', facing: 'E', inputRate: 3, outputRate: 1, …}
3
: 
{id: 93, at: '26,36', facing: 'W', inputRate: 3, outputRate: 1, …}
4
: 
{id: 94, at: '18,34', facing: 'S', inputRate: 3, outputRate: 1, …}
5
: 
{id: 95, at: '64,46', facing: 'E', inputRate: 3, outputRate: 1, …}
6
: 
{id: 96, at: '30,48', facing: 'S', inputRate: 8, outputRate: 1, …}
7
: 
{id: 97, at: '26,16', facing: 'E', inputRate: 3, outputRate: 1, …}
8
: 
{id: 98, at: '13,39', facing: 'E', inputRate: 3, outputRate: 1, …}
9
: 
{id: 99, at: '22,44', facing: 'W', inputRate: 3, outputRate: 1, …}
10
: 
{id: 100, at: '8,40', facing: 'S', inputRate: 3, outputRate: 1, …}
11
: 
{id: 101, at: '4,44', facing: 'E', inputRate: 3, outputRate: 1, …}
12
: 
{id: 102, at: '39,50', facing: 'E', inputRate: 3, outputRate: 1, …}
13
: 
{id: 103, at: '54,49', facing: 'S', inputRate: 3, outputRate: 1, …}
14
: 
{id: 104, at: '62,53', facing: 'S', inputRate: 3, outputRate: 3, …}
15
: 
{id: 105, at: '64,33', facing: 'E', inputRate: 3, outputRate: 1, …}
16
: 
{id: 106, at: '52,56', facing: 'S', inputRate: 3, outputRate: 3, …}
17
: 
{id: 107, at: '35,62', facing: 'N', inputRate: 4, outputRate: 1, …}
18
: 
{id: 108, at: '5,49', facing: 'W', inputRate: 3, outputRate: 1, …}
19
: 
{id: 109, at: '14,59', facing: 'S', inputRate: 3, outputRate: 1, …}
20
: 
{id: 111, at: '3,59', facing: 'E', inputRate: 3, outputRate: 1, …}
21
: 
{id: 936, at: '13,71', facing: 'E', inputRate: 3, outputRate: 1, …}
22
: 
{id: 1020, at: '56,69', facing: 'W', inputRate: 3, outputRate: 1, …}
23
: 
{id: 1029, at: '66,72', facing: 'S', inputRate: 3, outputRate: 1, …}
24
: 
{id: 1114, at: '24,69', facing: 'E', inputRate: 6, outputRate: 1, …}
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
{id: 142, at: '10,11', facing: 'W', inputRate: 2, outputRate: 2, …}
1
: 
{id: 143, at: '24,13', facing: 'E', inputRate: 2, outputRate: 2, …}
2
: 
{id: 144, at: '34,3', facing: 'N', inputRate: 2, outputRate: 2, …}
3
: 
{id: 145, at: '17,3', facing: 'N', inputRate: 2, outputRate: 2, …}
4
: 
{id: 146, at: '36,16', facing: 'E', inputRate: 2, outputRate: 2, …}
5
: 
{id: 147, at: '31,30', facing: 'W', inputRate: 2, outputRate: 2, …}
6
: 
{id: 148, at: '45,32', facing: 'E', inputRate: 2, outputRate: 2, …}
7
: 
{id: 149, at: '48,25', facing: 'N', inputRate: 2, outputRate: 2, …}
8
: 
{id: 150, at: '2,22', facing: 'W', inputRate: 2, outputRate: 2, …}
9
: 
{id: 151, at: '7,34', facing: 'S', inputRate: 2, outputRate: 2, …}
10
: 
{id: 152, at: '25,24', facing: 'E', inputRate: 2, outputRate: 2, …}
11
: 
{id: 153, at: '16,34', facing: 'E', inputRate: 2, outputRate: 2, …}
12
: 
{id: 154, at: '22,38', facing: 'S', inputRate: 2, outputRate: 2, …}
13
: 
{id: 155, at: '19,47', facing: 'S', inputRate: 2, outputRate: 2, …}
14
: 
{id: 156, at: '55,44', facing: 'E', inputRate: 2, outputRate: 2, …}
15
: 
{id: 157, at: '59,32', facing: 'N', inputRate: 2, outputRate: 2, …}
16
: 
{id: 158, at: '41,42', facing: 'W', inputRate: 2, outputRate: 2, …}
17
: 
{id: 159, at: '47,53', facing: 'S', inputRate: 2, outputRate: 2, …}
18
: 
{id: 160, at: '68,40', facing: 'E', inputRate: 2, outputRate: 2, …}
19
: 
{id: 161, at: '61,49', facing: 'S', inputRate: 2, outputRate: 2, …}
20
: 
{id: 162, at: '57,26', facing: 'N', inputRate: 2, outputRate: 2, …}
21
: 
{id: 163, at: '53,60', facing: 'S', inputRate: 6, outputRate: 6, …}
22
: 
{id: 164, at: '34,44', facing: 'E', inputRate: 2, outputRate: 2, …}
23
: 
{id: 165, at: '10,43', facing: 'E', inputRate: 2, outputRate: 2, …}
24
: 
{id: 166, at: '9,46', facing: 'W', inputRate: 2, outputRate: 2, …}
25
: 
{id: 167, at: '17,57', facing: 'S', inputRate: 2, outputRate: 2, …}
26
: 
{id: 169, at: '3,61', facing: 'N', inputRate: 2, outputRate: 2, …}
27
: 
{id: 170, at: '9,61', facing: 'E', inputRate: 2, outputRate: 2, …}
28
: 
{id: 933, at: '11,68', facing: 'E', inputRate: 2, outputRate: 2, …}
29
: 
{id: 948, at: '16,64', facing: 'E', inputRate: 3, outputRate: 3, …}
30
: 
{id: 998, at: '56,67', facing: 'S', inputRate: 2, outputRate: 2, …}
31
: 
{id: 1013, at: '68,61', facing: 'E', inputRate: 2, outputRate: 2, …}
32
: 
{id: 1064, at: '50,70', facing: 'W', inputRate: 2, outputRate: 2, …}
33
: 
{id: 1106, at: '22,61', facing: 'E', inputRate: 4, outputRate: 4, …}
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
{id: 987, at: '61,61', facing: 'W', inputRate: 0, outputRate: 2, …}
32
: 
{id: 999, at: '62,60', facing: 'E', inputRate: 0, outputRate: 2, …}
33
: 
{id: 1002, at: '62,61', facing: 'S', inputRate: 0, outputRate: 2, …}
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
{id: 34, at: '22,11', facing: 'E', inputRate: 1, outputRate: 1, …}
1
: 
{id: 35, at: '22,13', facing: 'E', inputRate: 1, outputRate: 1, …}
2
: 
{id: 36, at: '12,13', facing: 'W', inputRate: 1, outputRate: 1, …}
3
: 
{id: 37, at: '12,11', facing: 'W', inputRate: 1, outputRate: 1, …}
4
: 
{id: 38, at: '33,30', facing: 'W', inputRate: 1, outputRate: 1, …}
5
: 
{id: 39, at: '33,32', facing: 'W', inputRate: 1, outputRate: 1, …}
6
: 
{id: 40, at: '37,34', facing: 'S', inputRate: 1, outputRate: 1, …}
7
: 
{id: 41, at: '39,34', facing: 'S', inputRate: 1, outputRate: 1, …}
8
: 
{id: 42, at: '43,32', facing: 'E', inputRate: 1, outputRate: 1, …}
9
: 
{id: 43, at: '43,30', facing: 'E', inputRate: 1, outputRate: 1, …}
10
: 
{id: 44, at: '16,15', facing: 'S', inputRate: 1, outputRate: 1, …}
11
: 
{id: 45, at: '18,15', facing: 'S', inputRate: 1, outputRate: 1, …}
12
: 
{id: 46, at: '32,5', facing: 'N', inputRate: 1, outputRate: 1, …}
13
: 
{id: 47, at: '34,5', facing: 'N', inputRate: 1, outputRate: 1, …}
14
: 
{id: 48, at: '15,5', facing: 'N', inputRate: 1, outputRate: 1, …}
15
: 
{id: 49, at: '17,5', facing: 'N', inputRate: 1, outputRate: 1, …}
16
: 
{id: 50, at: '4,22', facing: 'W', inputRate: 1, outputRate: 1, …}
17
: 
{id: 51, at: '4,24', facing: 'W', inputRate: 1, outputRate: 1, …}
18
: 
{id: 52, at: '4,26', facing: 'W', inputRate: 1, outputRate: 1, …}
19
: 
{id: 53, at: '4,28', facing: 'W', inputRate: 1, outputRate: 1, …}
20
: 
{id: 54, at: '7,32', facing: 'S', inputRate: 1, outputRate: 1, …}
21
: 
{id: 55, at: '9,32', facing: 'S', inputRate: 1, outputRate: 1, …}
22
: 
{id: 56, at: '11,33', facing: 'S', inputRate: 1, outputRate: 1, …}
23
: 
{id: 57, at: '13,33', facing: 'S', inputRate: 1, outputRate: 1, …}
24
: 
{id: 58, at: '23,22', facing: 'E', inputRate: 1, outputRate: 1, …}
25
: 
{id: 59, at: '23,24', facing: 'E', inputRate: 1, outputRate: 1, …}
26
: 
{id: 60, at: '20,27', facing: 'E', inputRate: 1, outputRate: 1, …}
27
: 
{id: 61, at: '20,29', facing: 'E', inputRate: 1, outputRate: 1, …}
28
: 
{id: 62, at: '26,43', facing: 'S', inputRate: 2, outputRate: 1, …}
29
: 
{id: 63, at: '53,42', facing: 'E', inputRate: 1, outputRate: 1, …}
30
: 
{id: 64, at: '53,44', facing: 'E', inputRate: 1, outputRate: 1, …}
31
: 
{id: 65, at: '62,40', facing: 'E', inputRate: 1, outputRate: 1, …}
32
: 
{id: 66, at: '62,38', facing: 'E', inputRate: 1, outputRate: 1, …}
33
: 
{id: 67, at: '59,34', facing: 'N', inputRate: 1, outputRate: 1, …}
34
: 
{id: 68, at: '57,34', facing: 'N', inputRate: 1, outputRate: 1, …}
35
: 
{id: 69, at: '43,42', facing: 'W', inputRate: 1, outputRate: 1, …}
36
: 
{id: 70, at: '43,44', facing: 'W', inputRate: 1, outputRate: 1, …}
37
: 
{id: 71, at: '47,47', facing: 'S', inputRate: 1, outputRate: 1, …}
38
: 
{id: 72, at: '49,47', facing: 'S', inputRate: 1, outputRate: 1, …}
39
: 
{id: 73, at: '61,47', facing: 'S', inputRate: 1, outputRate: 1, …}
40
: 
{id: 74, at: '63,47', facing: 'S', inputRate: 1, outputRate: 1, …}
41
: 
{id: 75, at: '55,28', facing: 'N', inputRate: 1, outputRate: 1, …}
42
: 
{id: 76, at: '57,28', facing: 'N', inputRate: 1, outputRate: 1, …}
43
: 
{id: 77, at: '32,42', facing: 'E', inputRate: 1, outputRate: 1, …}
44
: 
{id: 78, at: '32,44', facing: 'E', inputRate: 1, outputRate: 1, …}
45
: 
{id: 79, at: '11,48', facing: 'W', inputRate: 1, outputRate: 1, …}
46
: 
{id: 80, at: '11,46', facing: 'W', inputRate: 1, outputRate: 1, …}
47
: 
{id: 81, at: '12,50', facing: 'W', inputRate: 1, outputRate: 1, …}
48
: 
{id: 82, at: '12,52', facing: 'W', inputRate: 1, outputRate: 1, …}
49
: 
{id: 83, at: '17,55', facing: 'S', inputRate: 1, outputRate: 1, …}
50
: 
{id: 84, at: '19,55', facing: 'S', inputRate: 1, outputRate: 1, …}
51
: 
{id: 87, at: '1,63', facing: 'N', inputRate: 1, outputRate: 1, …}
52
: 
{id: 88, at: '3,63', facing: 'N', inputRate: 1, outputRate: 1, …}
53
: 
{id: 89, at: '4,57', facing: 'S', inputRate: 1, outputRate: 1, …}
54
: 
{id: 929, at: '9,66', facing: 'E', inputRate: 1, outputRate: 1, …}
55
: 
{id: 930, at: '9,68', facing: 'E', inputRate: 1, outputRate: 1, …}
56
: 
{id: 959, at: '5,72', facing: 'S', inputRate: 1, outputRate: 1, …}
57
: 
{id: 994, at: '56,65', facing: 'S', inputRate: 1, outputRate: 1, …}
58
: 
{id: 995, at: '58,65', facing: 'S', inputRate: 1, outputRate: 1, …}
59
: 
{id: 1008, at: '66,59', facing: 'E', inputRate: 1, outputRate: 1, …}
60
: 
{id: 1009, at: '66,61', facing: 'E', inputRate: 1, outputRate: 1, …}
61
: 
{id: 1018, at: '61,65', facing: 'S', inputRate: 1, outputRate: 1, …}
62
: 
{id: 1019, at: '63,65', facing: 'S', inputRate: 1, outputRate: 1, …}
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
{id: 112, at: '14,12', facing: 'W', inputRate: 2, outputRate: 1, …}
1
: 
{id: 113, at: '20,12', facing: 'E', inputRate: 2, outputRate: 1, …}
2
: 
{id: 114, at: '35,31', facing: 'W', inputRate: 2, outputRate: 1, …}
3
: 
{id: 115, at: '41,31', facing: 'E', inputRate: 2, outputRate: 1, …}
4
: 
{id: 116, at: '17,13', facing: 'S', inputRate: 2, outputRate: 1, …}
5
: 
{id: 117, at: '33,7', facing: 'N', inputRate: 2, outputRate: 1, …}
6
: 
{id: 118, at: '16,7', facing: 'N', inputRate: 2, outputRate: 1, …}
7
: 
{id: 119, at: '38,32', facing: 'S', inputRate: 2, outputRate: 1, …}
8
: 
{id: 120, at: '6,23', facing: 'W', inputRate: 2, outputRate: 1, …}
9
: 
{id: 121, at: '6,27', facing: 'W', inputRate: 2, outputRate: 1, …}
10
: 
{id: 122, at: '8,30', facing: 'S', inputRate: 2, outputRate: 1, …}
11
: 
{id: 123, at: '12,31', facing: 'S', inputRate: 2, outputRate: 1, …}
12
: 
{id: 124, at: '21,23', facing: 'E', inputRate: 2, outputRate: 1, …}
13
: 
{id: 125, at: '18,28', facing: 'E', inputRate: 2, outputRate: 1, …}
14
: 
{id: 126, at: '25,30', facing: 'S', inputRate: 2, outputRate: 1, …}
15
: 
{id: 127, at: '45,43', facing: 'W', inputRate: 2, outputRate: 1, …}
16
: 
{id: 128, at: '51,43', facing: 'E', inputRate: 2, outputRate: 1, …}
17
: 
{id: 129, at: '48,45', facing: 'S', inputRate: 2, outputRate: 1, …}
18
: 
{id: 130, at: '60,39', facing: 'E', inputRate: 2, outputRate: 1, …}
19
: 
{id: 131, at: '58,36', facing: 'N', inputRate: 2, outputRate: 1, …}
20
: 
{id: 132, at: '62,45', facing: 'S', inputRate: 2, outputRate: 1, …}
21
: 
{id: 133, at: '56,30', facing: 'N', inputRate: 2, outputRate: 1, …}
22
: 
{id: 134, at: '58,51', facing: 'S', inputRate: 2, outputRate: 1, …}
23
: 
{id: 135, at: '30,43', facing: 'E', inputRate: 2, outputRate: 1, …}
24
: 
{id: 136, at: '13,47', facing: 'W', inputRate: 2, outputRate: 1, …}
25
: 
{id: 137, at: '14,51', facing: 'W', inputRate: 2, outputRate: 1, …}
26
: 
{id: 138, at: '18,53', facing: 'S', inputRate: 2, outputRate: 1, …}
27
: 
{id: 139, at: '4,70', facing: 'S', inputRate: 2, outputRate: 1, …}
28
: 
{id: 141, at: '2,65', facing: 'N', inputRate: 2, outputRate: 1, …}
29
: 
{id: 926, at: '7,67', facing: 'E', inputRate: 2, outputRate: 1, …}
30
: 
{id: 991, at: '57,63', facing: 'S', inputRate: 2, outputRate: 1, …}
31
: 
{id: 1004, at: '64,60', facing: 'E', inputRate: 2, outputRate: 1, …}
32
: 
{id: 1015, at: '62,63', facing: 'S', inputRate: 2, outputRate: 1, …}
length
: 
33
[[Prototype]]
: 
Array(0)
tubes
: 
Array(872)
[0 … 99]
0
: 
{id: 171, at: '17,12', facing: 'E', shape: 'straight', from: 5, …}
1
: 
{id: 172, at: '16,14', facing: 'E', shape: 'straight', from: 116, …}
2
: 
{id: 173, at: '18,14', facing: 'E', shape: 'straight', from: 116, …}
3
: 
{id: 174, at: '15,16', facing: 'E', shape: 'straight', from: 44, …}
4
: 
{id: 175, at: '17,16', facing: 'E', shape: 'straight', from: 45, …}
5
: 
{id: 176, at: '15,18', facing: 'W', shape: 'corner', from: 44, …}
6
: 
{id: 177, at: '32,20', facing: 'W', shape: 'corner', from: 90, …}
7
: 
{id: 178, at: '32,17', facing: 'E', shape: 'corner', from: 90, …}
8
: 
{id: 179, at: '25,10', facing: 'N', shape: 'corner', from: 149, …}
9
: 
{id: 180, at: '35,10', facing: 'S', shape: 'straight', from: 149, …}
10
: 
{id: 181, at: '33,8', facing: 'W', shape: 'straight', from: 6, …}
11
: 
{id: 182, at: '32,6', facing: 'W', shape: 'straight', from: 117, …}
12
: 
{id: 183, at: '34,6', facing: 'W', shape: 'straight', from: 117, …}
13
: 
{id: 184, at: '33,4', facing: 'W', shape: 'straight', from: 46, …}
14
: 
{id: 185, at: '35,4', facing: 'W', shape: 'straight', from: 47, …}
15
: 
{id: 186, at: '34,2', facing: 'W', shape: 'straight', from: 144, …}
16
: 
{id: 187, at: '34,0', facing: 'S', shape: 'corner', from: 144, …}
17
: 
{id: 188, at: '28,6', facing: 'W', shape: 'corner', from: 144, …}
18
: 
{id: 189, at: '28,0', facing: 'E', shape: 'corner', from: 144, …}
19
: 
{id: 190, at: '28,2', facing: 'E', shape: 'straight', from: 144, …}
20
: 
{id: 191, at: '28,3', facing: 'E', shape: 'straight', from: 144, …}
21
: 
{id: 192, at: '28,4', facing: 'E', shape: 'straight', from: 144, …}
22
: 
{id: 193, at: '32,0', facing: 'S', shape: 'straight', from: 144, …}
23
: 
{id: 194, at: '31,0', facing: 'S', shape: 'straight', from: 144, …}
24
: 
{id: 195, at: '30,0', facing: 'S', shape: 'straight', from: 144, …}
25
: 
{id: 196, at: '16,8', facing: 'W', shape: 'straight', from: 7, …}
26
: 
{id: 197, at: '17,6', facing: 'W', shape: 'straight', from: 118, …}
27
: 
{id: 198, at: '15,6', facing: 'W', shape: 'straight', from: 118, …}
28
: 
{id: 199, at: '17,0', facing: 'E', shape: 'corner', from: 145, …}
29
: 
{id: 200, at: '17,2', facing: 'W', shape: 'straight', from: 145, …}
30
: 
{id: 201, at: '25,0', facing: 'S', shape: 'corner', from: 145, …}
31
: 
{id: 202, at: '24,11', facing: 'N', shape: 'corner', from: 146, …}
32
: 
{id: 203, at: '24,8', facing: 'S', shape: 'corner', from: 146, …}
33
: 
{id: 204, at: '22,6', facing: 'N', shape: 'corner', from: 146, …}
34
: 
{id: 205, at: '19,8', facing: 'N', shape: 'corner', from: 146, …}
35
: 
{id: 206, at: '19,2', facing: 'E', shape: 'corner', from: 146, …}
36
: 
{id: 207, at: '4,17', facing: 'E', shape: 'straight', from: 90, …}
37
: 
{id: 208, at: '4,18', facing: 'E', shape: 'straight', from: 90, …}
38
: 
{id: 209, at: '6,20', facing: 'N', shape: 'straight', from: 90, …}
39
: 
{id: 210, at: '7,20', facing: 'N', shape: 'straight', from: 90, …}
40
: 
{id: 211, at: '8,20', facing: 'N', shape: 'straight', from: 90, …}
41
: 
{id: 212, at: '9,20', facing: 'N', shape: 'straight', from: 90, …}
42
: 
{id: 213, at: '10,20', facing: 'N', shape: 'straight', from: 90, …}
43
: 
{id: 214, at: '11,20', facing: 'N', shape: 'straight', from: 90, …}
44
: 
{id: 215, at: '12,20', facing: 'N', shape: 'straight', from: 90, …}
45
: 
{id: 216, at: '13,20', facing: 'N', shape: 'straight', from: 90, …}
46
: 
{id: 217, at: '17,20', facing: 'N', shape: 'straight', from: 90, …}
47
: 
{id: 218, at: '18,20', facing: 'N', shape: 'straight', from: 90, …}
48
: 
{id: 219, at: '19,20', facing: 'N', shape: 'straight', from: 90, …}
49
: 
{id: 220, at: '21,20', facing: 'N', shape: 'straight', from: 90, …}
50
: 
{id: 221, at: '23,20', facing: 'N', shape: 'straight', from: 90, …}
51
: 
{id: 222, at: '22,20', facing: 'N', shape: 'straight', from: 90, …}
52
: 
{id: 223, at: '24,20', facing: 'N', shape: 'straight', from: 90, …}
53
: 
{id: 224, at: '25,20', facing: 'N', shape: 'straight', from: 90, …}
54
: 
{id: 225, at: '26,20', facing: 'N', shape: 'straight', from: 90, …}
55
: 
{id: 226, at: '27,20', facing: 'N', shape: 'straight', from: 90, …}
56
: 
{id: 227, at: '28,20', facing: 'N', shape: 'straight', from: 90, …}
57
: 
{id: 228, at: '29,20', facing: 'N', shape: 'straight', from: 90, …}
58
: 
{id: 229, at: '30,20', facing: 'N', shape: 'straight', from: 90, …}
59
: 
{id: 230, at: '34,17', facing: 'N', shape: 'straight', from: 90, …}
60
: 
{id: 231, at: '35,17', facing: 'N', shape: 'straight', from: 90, …}
61
: 
{id: 232, at: '37,16', facing: 'N', shape: 'straight', from: 146, …}
62
: 
{id: 233, at: '39,16', facing: 'W', shape: 'corner', from: 146, …}
63
: 
{id: 234, at: '39,11', facing: 'S', shape: 'corner', from: 146, …}
64
: 
{id: 235, at: '39,14', facing: 'W', shape: 'straight', from: 146, …}
65
: 
{id: 236, at: '39,13', facing: 'W', shape: 'straight', from: 146, …}
66
: 
{id: 237, at: '37,11', facing: 'S', shape: 'straight', from: 146, …}
67
: 
{id: 238, at: '29,11', facing: 'S', shape: 'straight', from: 146, …}
68
: 
{id: 239, at: '22,8', facing: 'S', shape: 'straight', from: 146, …}
69
: 
{id: 240, at: '21,8', facing: 'S', shape: 'straight', from: 146, …}
70
: 
{id: 241, at: '19,6', facing: 'W', shape: 'straight', from: 146, …}
71
: 
{id: 242, at: '19,5', facing: 'W', shape: 'straight', from: 146, …}
72
: 
{id: 243, at: '19,4', facing: 'W', shape: 'straight', from: 146, …}
73
: 
{id: 244, at: '22,2', facing: 'S', shape: 'corner', from: 146, …}
74
: 
{id: 245, at: '22,4', facing: 'E', shape: 'straight', from: 146, …}
75
: 
{id: 246, at: '39,31', facing: 'N', shape: 'corner', from: 10, …}
76
: 
{id: 247, at: '37,31', facing: 'W', shape: 'corner', from: 9, …}
77
: 
{id: 248, at: '38,31', facing: 'E', shape: 'straight', from: 8, …}
78
: 
{id: 249, at: '37,33', facing: 'E', shape: 'straight', from: 119, …}
79
: 
{id: 250, at: '39,33', facing: 'E', shape: 'straight', from: 119, …}
80
: 
{id: 251, at: '36,37', facing: 'W', shape: 'corner', from: 40, …}
81
: 
{id: 252, at: '38,37', facing: 'N', shape: 'corner', from: 41, …}
82
: 
{id: 253, at: '32,31', facing: 'S', shape: 'straight', from: 39, …}
83
: 
{id: 254, at: '32,29', facing: 'S', shape: 'straight', from: 38, …}
84
: 
{id: 255, at: '29,30', facing: 'E', shape: 'corner', from: 147, …}
85
: 
{id: 256, at: '29,32', facing: 'E', shape: 'straight', from: 147, …}
86
: 
{id: 257, at: '44,31', facing: 'N', shape: 'straight', from: 43, …}
87
: 
{id: 258, at: '44,33', facing: 'N', shape: 'straight', from: 42, …}
88
: 
{id: 259, at: '40,37', facing: 'N', shape: 'straight', from: 41, …}
89
: 
{id: 260, at: '41,37', facing: 'N', shape: 'straight', from: 41, …}
90
: 
{id: 261, at: '42,37', facing: 'N', shape: 'straight', from: 41, …}
91
: 
{id: 262, at: '43,37', facing: 'N', shape: 'straight', from: 41, …}
92
: 
{id: 263, at: '44,37', facing: 'N', shape: 'straight', from: 41, …}
93
: 
{id: 264, at: '45,37', facing: 'N', shape: 'straight', from: 41, …}
94
: 
{id: 265, at: '47,37', facing: 'W', shape: 'corner', from: 41, …}
95
: 
{id: 266, at: '49,31', facing: 'W', shape: 'straight', from: 92, …}
96
: 
{id: 267, at: '49,30', facing: 'W', shape: 'straight', from: 92, …}
97
: 
{id: 268, at: '43,27', facing: 'N', shape: 'straight', from: 91, …}
98
: 
{id: 269, at: '45,27', facing: 'N', shape: 'straight', from: 91, …}
99
: 
{id: 270, at: '44,27', facing: 'N', shape: 'straight', from: 91, …}
[100 … 199]
100
: 
{id: 271, at: '47,27', facing: 'W', shape: 'corner', from: 91, …}
101
: 
{id: 272, at: '49,29', facing: 'W', shape: 'straight', from: 92, …}
102
: 
{id: 273, at: '49,28', facing: 'W', shape: 'straight', from: 92, …}
103
: 
{id: 274, at: '49,27', facing: 'W', shape: 'straight', from: 92, …}
104
: 
{id: 275, at: '49,26', facing: 'W', shape: 'straight', from: 92, …}
105
: 
{id: 276, at: '48,24', facing: 'W', shape: 'straight', from: 149, …}
106
: 
{id: 277, at: '48,23', facing: 'W', shape: 'straight', from: 149, …}
107
: 
{id: 278, at: '48,22', facing: 'W', shape: 'straight', from: 149, …}
108
: 
{id: 279, at: '48,21', facing: 'W', shape: 'straight', from: 149, …}
109
: 
{id: 280, at: '48,20', facing: 'W', shape: 'straight', from: 149, …}
110
: 
{id: 281, at: '48,19', facing: 'W', shape: 'straight', from: 149, …}
111
: 
{id: 282, at: '48,18', facing: 'W', shape: 'straight', from: 149, …}
112
: 
{id: 283, at: '48,17', facing: 'W', shape: 'straight', from: 149, …}
113
: 
{id: 284, at: '48,16', facing: 'W', shape: 'straight', from: 149, …}
114
: 
{id: 285, at: '48,15', facing: 'W', shape: 'straight', from: 149, …}
115
: 
{id: 286, at: '48,14', facing: 'W', shape: 'straight', from: 149, …}
116
: 
{id: 287, at: '48,10', facing: 'S', shape: 'corner', from: 149, …}
117
: 
{id: 288, at: '48,13', facing: 'W', shape: 'straight', from: 149, …}
118
: 
{id: 289, at: '48,12', facing: 'W', shape: 'straight', from: 149, …}
119
: 
{id: 290, at: '8,26', facing: 'N', shape: 'corner', from: 11, …}
120
: 
{id: 291, at: '8,28', facing: 'E', shape: 'corner', from: 13, …}
121
: 
{id: 292, at: '9,27', facing: 'S', shape: 'straight', from: 12, …}
122
: 
{id: 293, at: '7,27', facing: 'S', shape: 'straight', from: 12, …}
123
: 
{id: 294, at: '8,27', facing: 'S', shape: 'straight', from: 12, …}
124
: 
{id: 295, at: '8,23', facing: 'S', shape: 'corner', from: 11, …}
125
: 
{id: 296, at: '5,22', facing: 'S', shape: 'straight', from: 120, …}
126
: 
{id: 297, at: '5,24', facing: 'S', shape: 'straight', from: 120, …}
127
: 
{id: 298, at: '3,23', facing: 'S', shape: 'straight', from: 51, …}
128
: 
{id: 299, at: '3,21', facing: 'S', shape: 'straight', from: 50, …}
129
: 
{id: 300, at: '0,22', facing: 'E', shape: 'corner', from: 150, …}
130
: 
{id: 301, at: '5,26', facing: 'S', shape: 'straight', from: 121, …}
131
: 
{id: 302, at: '5,28', facing: 'S', shape: 'straight', from: 121, …}
132
: 
{id: 303, at: '3,25', facing: 'S', shape: 'straight', from: 52, …}
133
: 
{id: 304, at: '2,27', facing: 'E', shape: 'corner', from: 53, …}
134
: 
{id: 305, at: '1,25', facing: 'E', shape: 'corner', from: 52, …}
135
: 
{id: 306, at: '0,24', facing: 'E', shape: 'straight', from: 150, …}
136
: 
{id: 307, at: '0,25', facing: 'E', shape: 'straight', from: 150, …}
137
: 
{id: 308, at: '0,26', facing: 'E', shape: 'straight', from: 150, …}
138
: 
{id: 309, at: '0,27', facing: 'E', shape: 'straight', from: 150, …}
139
: 
{id: 310, at: '0,28', facing: 'E', shape: 'straight', from: 150, …}
140
: 
{id: 311, at: '0,29', facing: 'E', shape: 'straight', from: 150, …}
141
: 
{id: 312, at: '1,27', facing: 'E', shape: 'straight', from: 52, …}
142
: 
{id: 313, at: '1,28', facing: 'E', shape: 'straight', from: 52, …}
143
: 
{id: 314, at: '1,29', facing: 'E', shape: 'straight', from: 52, …}
144
: 
{id: 315, at: '7,31', facing: 'E', shape: 'straight', from: 122, …}
145
: 
{id: 316, at: '9,31', facing: 'E', shape: 'straight', from: 122, …}
146
: 
{id: 317, at: '6,33', facing: 'E', shape: 'straight', from: 54, …}
147
: 
{id: 318, at: '8,33', facing: 'E', shape: 'straight', from: 55, …}
148
: 
{id: 319, at: '2,30', facing: 'N', shape: 'corner', from: 53, …}
149
: 
{id: 320, at: '5,30', facing: 'S', shape: 'corner', from: 53, …}
150
: 
{id: 321, at: '5,32', facing: 'E', shape: 'straight', from: 53, …}
151
: 
{id: 322, at: '5,33', facing: 'E', shape: 'straight', from: 53, …}
152
: 
{id: 323, at: '5,34', facing: 'E', shape: 'straight', from: 53, …}
153
: 
{id: 324, at: '5,35', facing: 'E', shape: 'straight', from: 53, …}
154
: 
{id: 325, at: '7,35', facing: 'E', shape: 'straight', from: 151, …}
155
: 
{id: 326, at: '5,36', facing: 'E', shape: 'straight', from: 53, …}
156
: 
{id: 327, at: '5,37', facing: 'E', shape: 'straight', from: 53, …}
157
: 
{id: 328, at: '1,31', facing: 'N', shape: 'corner', from: 52, …}
158
: 
{id: 329, at: '4,31', facing: 'S', shape: 'corner', from: 52, …}
159
: 
{id: 330, at: '0,30', facing: 'E', shape: 'straight', from: 150, …}
160
: 
{id: 331, at: '0,31', facing: 'E', shape: 'straight', from: 150, …}
161
: 
{id: 332, at: '0,32', facing: 'E', shape: 'straight', from: 150, …}
162
: 
{id: 333, at: '7,37', facing: 'N', shape: 'corner', from: 151, …}
163
: 
{id: 334, at: '5,38', facing: 'E', shape: 'straight', from: 53, …}
164
: 
{id: 335, at: '5,44', facing: 'N', shape: 'straight', from: 101, …}
165
: 
{id: 336, at: '6,44', facing: 'N', shape: 'straight', from: 101, …}
166
: 
{id: 337, at: '11,43', facing: 'N', shape: 'straight', from: 165, …}
167
: 
{id: 338, at: '12,30', facing: 'E', shape: 'straight', from: 14, …}
168
: 
{id: 339, at: '11,32', facing: 'E', shape: 'straight', from: 123, …}
169
: 
{id: 340, at: '13,32', facing: 'E', shape: 'straight', from: 123, …}
170
: 
{id: 341, at: '10,34', facing: 'E', shape: 'straight', from: 56, …}
171
: 
{id: 342, at: '10,36', facing: 'N', shape: 'corner', from: 56, …}
172
: 
{id: 343, at: '12,35', facing: 'N', shape: 'corner', from: 57, …}
173
: 
{id: 344, at: '13,43', facing: 'W', shape: 'corner', from: 165, …}
174
: 
{id: 345, at: '13,41', facing: 'W', shape: 'straight', from: 165, …}
175
: 
{id: 346, at: '19,26', facing: 'W', shape: 'corner', from: 15, …}
176
: 
{id: 347, at: '19,23', facing: 'E', shape: 'corner', from: 15, …}
177
: 
{id: 348, at: '22,22', facing: 'N', shape: 'straight', from: 124, …}
178
: 
{id: 349, at: '22,24', facing: 'N', shape: 'straight', from: 124, …}
179
: 
{id: 350, at: '24,23', facing: 'N', shape: 'straight', from: 58, …}
180
: 
{id: 351, at: '24,25', facing: 'N', shape: 'straight', from: 59, …}
181
: 
{id: 352, at: '27,24', facing: 'W', shape: 'corner', from: 152, …}
182
: 
{id: 353, at: '27,21', facing: 'E', shape: 'corner', from: 152, …}
183
: 
{id: 354, at: '30,21', facing: 'S', shape: 'corner', from: 152, …}
184
: 
{id: 355, at: '30,26', facing: 'W', shape: 'corner', from: 152, …}
185
: 
{id: 356, at: '30,23', facing: 'E', shape: 'straight', from: 152, …}
186
: 
{id: 357, at: '30,24', facing: 'E', shape: 'straight', from: 152, …}
187
: 
{id: 358, at: '28,26', facing: 'S', shape: 'straight', from: 152, …}
188
: 
{id: 359, at: '27,26', facing: 'S', shape: 'straight', from: 152, …}
189
: 
{id: 360, at: '25,26', facing: 'E', shape: 'corner', from: 152, …}
190
: 
{id: 361, at: '15,28', facing: 'N', shape: 'straight', from: 16, …}
191
: 
{id: 362, at: '16,28', facing: 'N', shape: 'straight', from: 16, …}
192
: 
{id: 363, at: '17,28', facing: 'N', shape: 'straight', from: 16, …}
193
: 
{id: 364, at: '19,27', facing: 'N', shape: 'straight', from: 125, …}
194
: 
{id: 365, at: '19,29', facing: 'N', shape: 'straight', from: 125, …}
195
: 
{id: 366, at: '25,28', facing: 'E', shape: 'straight', from: 152, …}
196
: 
{id: 367, at: '25,29', facing: 'E', shape: 'straight', from: 152, …}
197
: 
{id: 368, at: '23,28', facing: 'S', shape: 'corner', from: 60, …}
198
: 
{id: 369, at: '21,28', facing: 'N', shape: 'straight', from: 60, …}
199
: 
{id: 370, at: '20,20', facing: 'N', shape: 'straight', from: 90, …}
[200 … 299]
200
: 
{id: 371, at: '16,20', facing: 'N', shape: 'straight', from: 90, …}
201
: 
{id: 372, at: '15,20', facing: 'N', shape: 'straight', from: 90, …}
202
: 
{id: 373, at: '14,20', facing: 'N', shape: 'straight', from: 90, …}
203
: 
{id: 374, at: '22,30', facing: 'S', shape: 'corner', from: 61, …}
204
: 
{id: 375, at: '23,30', facing: 'E', shape: 'straight', from: 60, …}
205
: 
{id: 376, at: '23,31', facing: 'E', shape: 'straight', from: 60, …}
206
: 
{id: 377, at: '23,32', facing: 'E', shape: 'straight', from: 60, …}
207
: 
{id: 378, at: '22,33', facing: 'W', shape: 'corner', from: 61, …}
208
: 
{id: 379, at: '14,33', facing: 'N', shape: 'corner', from: 61, …}
209
: 
{id: 380, at: '14,35', facing: 'N', shape: 'straight', from: 57, …}
210
: 
{id: 381, at: '15,35', facing: 'N', shape: 'straight', from: 57, …}
211
: 
{id: 382, at: '19,33', facing: 'N', shape: 'corner', from: 61, …}
212
: 
{id: 383, at: '19,30', facing: 'S', shape: 'corner', from: 61, …}
213
: 
{id: 384, at: '14,30', facing: 'E', shape: 'corner', from: 61, …}
214
: 
{id: 385, at: '17,30', facing: 'S', shape: 'straight', from: 61, …}
215
: 
{id: 386, at: '16,30', facing: 'S', shape: 'straight', from: 61, …}
216
: 
{id: 387, at: '23,34', facing: 'W', shape: 'corner', from: 60, …}
217
: 
{id: 388, at: '21,34', facing: 'S', shape: 'straight', from: 60, …}
218
: 
{id: 389, at: '20,34', facing: 'S', shape: 'straight', from: 60, …}
219
: 
{id: 390, at: '24,31', facing: 'E', shape: 'straight', from: 126, …}
220
: 
{id: 391, at: '24,32', facing: 'E', shape: 'straight', from: 126, …}
221
: 
{id: 392, at: '26,31', facing: 'E', shape: 'straight', from: 126, …}
222
: 
{id: 393, at: '26,32', facing: 'E', shape: 'straight', from: 126, …}
223
: 
{id: 394, at: '26,33', facing: 'E', shape: 'straight', from: 126, …}
224
: 
{id: 395, at: '26,34', facing: 'E', shape: 'straight', from: 126, …}
225
: 
{id: 396, at: '25,36', facing: 'S', shape: 'straight', from: 93, …}
226
: 
{id: 397, at: '18,36', facing: 'N', shape: 'corner', from: 94, …}
227
: 
{id: 398, at: '21,36', facing: 'S', shape: 'corner', from: 94, …}
228
: 
{id: 399, at: '23,36', facing: 'E', shape: 'corner', from: 93, …}
229
: 
{id: 400, at: '26,42', facing: 'E', shape: 'straight', from: 18, …}
230
: 
{id: 401, at: '22,40', facing: 'E', shape: 'straight', from: 154, …}
231
: 
{id: 402, at: '22,41', facing: 'E', shape: 'straight', from: 154, …}
232
: 
{id: 403, at: '22,42', facing: 'E', shape: 'straight', from: 154, …}
233
: 
{id: 404, at: '22,39', facing: 'E', shape: 'straight', from: 154, …}
234
: 
{id: 405, at: '25,47', facing: 'W', shape: 'corner', from: 62, …}
235
: 
{id: 406, at: '25,45', facing: 'E', shape: 'straight', from: 62, …}
236
: 
{id: 407, at: '25,44', facing: 'E', shape: 'straight', from: 62, …}
237
: 
{id: 408, at: '18,41', facing: 'E', shape: 'straight', from: 98, …}
238
: 
{id: 409, at: '18,42', facing: 'E', shape: 'straight', from: 98, …}
239
: 
{id: 410, at: '18,43', facing: 'E', shape: 'straight', from: 98, …}
240
: 
{id: 411, at: '18,44', facing: 'E', shape: 'straight', from: 98, …}
241
: 
{id: 412, at: '18,45', facing: 'E', shape: 'straight', from: 98, …}
242
: 
{id: 413, at: '18,46', facing: 'E', shape: 'straight', from: 98, …}
243
: 
{id: 414, at: '47,43', facing: 'W', shape: 'corner', from: 19, …}
244
: 
{id: 415, at: '49,43', facing: 'N', shape: 'corner', from: 21, …}
245
: 
{id: 416, at: '48,42', facing: 'E', shape: 'straight', from: 20, …}
246
: 
{id: 417, at: '48,43', facing: 'E', shape: 'straight', from: 20, …}
247
: 
{id: 418, at: '48,44', facing: 'E', shape: 'straight', from: 20, …}
248
: 
{id: 419, at: '58,38', facing: 'W', shape: 'corner', from: 24, …}
249
: 
{id: 420, at: '57,39', facing: 'N', shape: 'straight', from: 23, …}
250
: 
{id: 421, at: '58,39', facing: 'N', shape: 'straight', from: 23, …}
251
: 
{id: 422, at: '59,39', facing: 'N', shape: 'straight', from: 23, …}
252
: 
{id: 423, at: '44,42', facing: 'S', shape: 'straight', from: 127, …}
253
: 
{id: 424, at: '44,44', facing: 'S', shape: 'straight', from: 127, …}
254
: 
{id: 425, at: '52,44', facing: 'N', shape: 'straight', from: 128, …}
255
: 
{id: 426, at: '52,42', facing: 'N', shape: 'straight', from: 128, …}
256
: 
{id: 427, at: '49,46', facing: 'E', shape: 'straight', from: 129, …}
257
: 
{id: 428, at: '47,46', facing: 'E', shape: 'straight', from: 129, …}
258
: 
{id: 429, at: '61,40', facing: 'N', shape: 'straight', from: 130, …}
259
: 
{id: 430, at: '61,38', facing: 'N', shape: 'straight', from: 130, …}
260
: 
{id: 431, at: '59,35', facing: 'W', shape: 'straight', from: 131, …}
261
: 
{id: 432, at: '57,35', facing: 'W', shape: 'straight', from: 131, …}
262
: 
{id: 433, at: '54,43', facing: 'N', shape: 'straight', from: 63, …}
263
: 
{id: 434, at: '54,45', facing: 'N', shape: 'straight', from: 64, …}
264
: 
{id: 435, at: '57,40', facing: 'N', shape: 'straight', from: 22, …}
265
: 
{id: 436, at: '59,40', facing: 'S', shape: 'corner', from: 22, …}
266
: 
{id: 437, at: '57,44', facing: 'S', shape: 'corner', from: 156, …}
267
: 
{id: 438, at: '59,43', facing: 'N', shape: 'corner', from: 22, …}
268
: 
{id: 439, at: '62,43', facing: 'S', shape: 'corner', from: 22, …}
269
: 
{id: 440, at: '58,33', facing: 'W', shape: 'straight', from: 68, …}
270
: 
{id: 441, at: '60,33', facing: 'W', shape: 'straight', from: 67, …}
271
: 
{id: 442, at: '64,39', facing: 'W', shape: 'corner', from: 66, …}
272
: 
{id: 443, at: '59,30', facing: 'E', shape: 'corner', from: 157, …}
273
: 
{id: 444, at: '61,30', facing: 'N', shape: 'straight', from: 157, …}
274
: 
{id: 445, at: '62,30', facing: 'N', shape: 'straight', from: 157, …}
275
: 
{id: 446, at: '64,37', facing: 'W', shape: 'straight', from: 66, …}
276
: 
{id: 447, at: '64,36', facing: 'W', shape: 'straight', from: 66, …}
277
: 
{id: 448, at: '64,35', facing: 'W', shape: 'straight', from: 66, …}
278
: 
{id: 449, at: '64,41', facing: 'S', shape: 'corner', from: 65, …}
279
: 
{id: 450, at: '64,43', facing: 'E', shape: 'straight', from: 65, …}
280
: 
{id: 451, at: '64,44', facing: 'E', shape: 'straight', from: 65, …}
281
: 
{id: 452, at: '64,48', facing: 'W', shape: 'straight', from: 161, …}
282
: 
{id: 453, at: '46,49', facing: 'W', shape: 'corner', from: 71, …}
283
: 
{id: 454, at: '48,49', facing: 'N', shape: 'corner', from: 72, …}
284
: 
{id: 455, at: '42,43', facing: 'S', shape: 'straight', from: 70, …}
285
: 
{id: 456, at: '42,41', facing: 'S', shape: 'straight', from: 69, …}
286
: 
{id: 457, at: '57,46', facing: 'E', shape: 'straight', from: 156, …}
287
: 
{id: 458, at: '57,47', facing: 'E', shape: 'straight', from: 156, …}
288
: 
{id: 459, at: '50,49', facing: 'N', shape: 'straight', from: 72, …}
289
: 
{id: 460, at: '51,49', facing: 'N', shape: 'straight', from: 72, …}
290
: 
{id: 461, at: '52,49', facing: 'N', shape: 'straight', from: 72, …}
291
: 
{id: 462, at: '52,51', facing: 'S', shape: 'straight', from: 103, …}
292
: 
{id: 463, at: '51,51', facing: 'S', shape: 'straight', from: 103, …}
293
: 
{id: 464, at: '50,51', facing: 'S', shape: 'straight', from: 103, …}
294
: 
{id: 465, at: '48,51', facing: 'E', shape: 'corner', from: 103, …}
295
: 
{id: 466, at: '66,46', facing: 'W', shape: 'corner', from: 95, …}
296
: 
{id: 467, at: '66,39', facing: 'N', shape: 'corner', from: 105, …}
297
: 
{id: 468, at: '66,35', facing: 'E', shape: 'straight', from: 105, …}
298
: 
{id: 469, at: '66,36', facing: 'E', shape: 'straight', from: 105, …}
299
: 
{id: 470, at: '66,37', facing: 'E', shape: 'straight', from: 105, …}
[300 … 399]
300
: 
{id: 471, at: '61,46', facing: 'E', shape: 'straight', from: 132, …}
301
: 
{id: 472, at: '63,46', facing: 'E', shape: 'straight', from: 132, …}
302
: 
{id: 473, at: '60,48', facing: 'E', shape: 'straight', from: 73, …}
303
: 
{id: 474, at: '62,48', facing: 'E', shape: 'straight', from: 74, …}
304
: 
{id: 475, at: '61,51', facing: 'N', shape: 'corner', from: 161, …}
305
: 
{id: 476, at: '64,51', facing: 'W', shape: 'corner', from: 161, …}
306
: 
{id: 477, at: '64,49', facing: 'W', shape: 'straight', from: 161, …}
307
: 
{id: 478, at: '66,41', facing: 'E', shape: 'corner', from: 95, …}
308
: 
{id: 479, at: '66,44', facing: 'W', shape: 'straight', from: 95, …}
309
: 
{id: 480, at: '66,43', facing: 'W', shape: 'straight', from: 95, …}
310
: 
{id: 481, at: '56,32', facing: 'W', shape: 'straight', from: 25, …}
311
: 
{id: 482, at: '56,31', facing: 'W', shape: 'straight', from: 25, …}
312
: 
{id: 483, at: '55,29', facing: 'W', shape: 'straight', from: 133, …}
313
: 
{id: 484, at: '57,29', facing: 'W', shape: 'straight', from: 133, …}
314
: 
{id: 485, at: '56,27', facing: 'W', shape: 'straight', from: 75, …}
315
: 
{id: 486, at: '58,27', facing: 'W', shape: 'straight', from: 76, …}
316
: 
{id: 487, at: '57,24', facing: 'S', shape: 'corner', from: 162, …}
317
: 
{id: 488, at: '55,24', facing: 'S', shape: 'straight', from: 162, …}
318
: 
{id: 489, at: '54,24', facing: 'S', shape: 'straight', from: 162, …}
319
: 
{id: 490, at: '52,24', facing: 'E', shape: 'corner', from: 162, …}
320
: 
{id: 491, at: '52,26', facing: 'E', shape: 'straight', from: 162, …}
321
: 
{id: 492, at: '52,27', facing: 'E', shape: 'straight', from: 162, …}
322
: 
{id: 493, at: '52,28', facing: 'E', shape: 'straight', from: 162, …}
323
: 
{id: 494, at: '52,29', facing: 'E', shape: 'straight', from: 162, …}
324
: 
{id: 495, at: '52,30', facing: 'E', shape: 'straight', from: 162, …}
325
: 
{id: 496, at: '52,31', facing: 'E', shape: 'straight', from: 162, …}
326
: 
{id: 497, at: '52,32', facing: 'E', shape: 'straight', from: 162, …}
327
: 
{id: 498, at: '52,33', facing: 'E', shape: 'straight', from: 162, …}
328
: 
{id: 499, at: '52,35', facing: 'N', shape: 'corner', from: 162, …}
329
: 
{id: 500, at: '55,35', facing: 'S', shape: 'corner', from: 162, …}
330
: 
{id: 501, at: '55,38', facing: 'E', shape: 'straight', from: 162, …}
331
: 
{id: 502, at: '55,37', facing: 'E', shape: 'straight', from: 162, …}
332
: 
{id: 503, at: '55,39', facing: 'E', shape: 'straight', from: 162, …}
333
: 
{id: 504, at: '55,40', facing: 'E', shape: 'straight', from: 162, …}
334
: 
{id: 505, at: '55,42', facing: 'N', shape: 'corner', from: 162, …}
335
: 
{id: 506, at: '58,42', facing: 'S', shape: 'corner', from: 162, …}
336
: 
{id: 507, at: '58,44', facing: 'E', shape: 'straight', from: 162, …}
337
: 
{id: 508, at: '58,45', facing: 'E', shape: 'straight', from: 162, …}
338
: 
{id: 509, at: '58,46', facing: 'E', shape: 'straight', from: 162, …}
339
: 
{id: 510, at: '58,47', facing: 'E', shape: 'straight', from: 162, …}
340
: 
{id: 511, at: '58,48', facing: 'E', shape: 'straight', from: 162, …}
341
: 
{id: 512, at: '58,50', facing: 'E', shape: 'straight', from: 162, …}
342
: 
{id: 513, at: '58,49', facing: 'E', shape: 'straight', from: 162, …}
343
: 
{id: 514, at: '47,54', facing: 'E', shape: 'straight', from: 159, …}
344
: 
{id: 515, at: '47,56', facing: 'N', shape: 'corner', from: 159, …}
345
: 
{id: 516, at: '49,56', facing: 'N', shape: 'straight', from: 159, …}
346
: 
{id: 517, at: '70,40', facing: 'S', shape: 'corner', from: 160, …}
347
: 
{id: 518, at: '70,42', facing: 'E', shape: 'straight', from: 160, …}
348
: 
{id: 519, at: '70,43', facing: 'E', shape: 'straight', from: 160, …}
349
: 
{id: 520, at: '70,44', facing: 'E', shape: 'straight', from: 160, …}
350
: 
{id: 521, at: '70,45', facing: 'E', shape: 'straight', from: 160, …}
351
: 
{id: 522, at: '70,46', facing: 'E', shape: 'straight', from: 160, …}
352
: 
{id: 523, at: '70,48', facing: 'E', shape: 'straight', from: 160, …}
353
: 
{id: 524, at: '70,49', facing: 'E', shape: 'straight', from: 160, …}
354
: 
{id: 525, at: '70,47', facing: 'E', shape: 'straight', from: 160, …}
355
: 
{id: 526, at: '70,50', facing: 'E', shape: 'straight', from: 160, …}
356
: 
{id: 527, at: '70,51', facing: 'E', shape: 'straight', from: 160, …}
357
: 
{id: 528, at: '70,53', facing: 'W', shape: 'corner', from: 160, …}
358
: 
{id: 529, at: '68,53', facing: 'S', shape: 'straight', from: 160, …}
359
: 
{id: 530, at: '67,53', facing: 'S', shape: 'straight', from: 160, …}
360
: 
{id: 531, at: '66,53', facing: 'S', shape: 'straight', from: 160, …}
361
: 
{id: 532, at: '65,53', facing: 'S', shape: 'straight', from: 160, …}
362
: 
{id: 533, at: '64,53', facing: 'S', shape: 'straight', from: 160, …}
363
: 
{id: 534, at: '54,58', facing: 'E', shape: 'corner', from: 104, …}
364
: 
{id: 535, at: '56,58', facing: 'S', shape: 'straight', from: 104, …}
365
: 
{id: 536, at: '57,58', facing: 'S', shape: 'straight', from: 104, …}
366
: 
{id: 537, at: '58,58', facing: 'S', shape: 'straight', from: 104, …}
367
: 
{id: 538, at: '59,58', facing: 'S', shape: 'straight', from: 104, …}
368
: 
{id: 539, at: '53,62', facing: 'W', shape: 'corner', from: 163, …}
369
: 
{id: 540, at: '50,62', facing: 'N', shape: 'corner', from: 163, …}
370
: 
{id: 541, at: '50,60', facing: 'W', shape: 'straight', from: 163, …}
371
: 
{id: 542, at: '50,59', facing: 'W', shape: 'straight', from: 163, …}
372
: 
{id: 543, at: '50,57', facing: 'S', shape: 'corner', from: 163, …}
373
: 
{id: 544, at: '48,57', facing: 'S', shape: 'straight', from: 163, …}
374
: 
{id: 545, at: '47,57', facing: 'S', shape: 'straight', from: 163, …}
375
: 
{id: 546, at: '46,57', facing: 'S', shape: 'straight', from: 163, …}
376
: 
{id: 547, at: '45,57', facing: 'S', shape: 'straight', from: 163, …}
377
: 
{id: 548, at: '44,57', facing: 'S', shape: 'straight', from: 163, …}
378
: 
{id: 549, at: '43,57', facing: 'S', shape: 'straight', from: 163, …}
379
: 
{id: 550, at: '42,57', facing: 'S', shape: 'straight', from: 163, …}
380
: 
{id: 551, at: '41,57', facing: 'S', shape: 'straight', from: 163, …}
381
: 
{id: 552, at: '40,57', facing: 'S', shape: 'straight', from: 163, …}
382
: 
{id: 553, at: '39,57', facing: 'S', shape: 'straight', from: 163, …}
383
: 
{id: 554, at: '37,57', facing: 'N', shape: 'corner', from: 163, …}
384
: 
{id: 555, at: '37,55', facing: 'W', shape: 'straight', from: 163, …}
385
: 
{id: 556, at: '37,54', facing: 'W', shape: 'straight', from: 163, …}
386
: 
{id: 557, at: '37,53', facing: 'W', shape: 'straight', from: 163, …}
387
: 
{id: 558, at: '37,52', facing: 'W', shape: 'straight', from: 163, …}
388
: 
{id: 559, at: '37,50', facing: 'W', shape: 'straight', from: 163, …}
389
: 
{id: 560, at: '37,51', facing: 'W', shape: 'straight', from: 163, …}
390
: 
{id: 561, at: '37,48', facing: 'S', shape: 'corner', from: 163, …}
391
: 
{id: 562, at: '24,48', facing: 'N', shape: 'straight', from: 155, …}
392
: 
{id: 563, at: '25,48', facing: 'N', shape: 'straight', from: 155, …}
393
: 
{id: 564, at: '26,48', facing: 'N', shape: 'straight', from: 155, …}
394
: 
{id: 565, at: '27,48', facing: 'N', shape: 'straight', from: 155, …}
395
: 
{id: 566, at: '28,48', facing: 'N', shape: 'straight', from: 155, …}
396
: 
{id: 567, at: '34,48', facing: 'S', shape: 'straight', from: 163, …}
397
: 
{id: 568, at: '35,48', facing: 'S', shape: 'straight', from: 163, …}
398
: 
{id: 569, at: '33,48', facing: 'S', shape: 'straight', from: 163, …}
399
: 
{id: 570, at: '32,48', facing: 'S', shape: 'straight', from: 163, …}
[400 … 499]
400
: 
{id: 571, at: '30,49', facing: 'E', shape: 'straight', from: 96, …}
401
: 
{id: 572, at: '30,50', facing: 'E', shape: 'straight', from: 96, …}
402
: 
{id: 573, at: '4,20', facing: 'N', shape: 'corner', from: 90, …}
403
: 
{id: 574, at: '4,15', facing: 'E', shape: 'corner', from: 90, …}
404
: 
{id: 575, at: '6,15', facing: 'S', shape: 'straight', from: 90, …}
405
: 
{id: 576, at: '9,11', facing: 'S', shape: 'straight', from: 142, …}
406
: 
{id: 577, at: '7,11', facing: 'E', shape: 'corner', from: 142, …}
407
: 
{id: 578, at: '7,13', facing: 'E', shape: 'straight', from: 142, …}
408
: 
{id: 579, at: '13,18', facing: 'S', shape: 'straight', from: 44, …}
409
: 
{id: 580, at: '11,18', facing: 'S', shape: 'straight', from: 44, …}
410
: 
{id: 581, at: '12,18', facing: 'S', shape: 'straight', from: 44, …}
411
: 
{id: 582, at: '10,18', facing: 'S', shape: 'straight', from: 44, …}
412
: 
{id: 583, at: '7,18', facing: 'N', shape: 'corner', from: 44, …}
413
: 
{id: 584, at: '9,18', facing: 'S', shape: 'straight', from: 44, …}
414
: 
{id: 585, at: '13,13', facing: 'S', shape: 'straight', from: 112, …}
415
: 
{id: 586, at: '13,11', facing: 'S', shape: 'straight', from: 112, …}
416
: 
{id: 587, at: '11,10', facing: 'S', shape: 'straight', from: 37, …}
417
: 
{id: 588, at: '11,12', facing: 'S', shape: 'straight', from: 36, …}
418
: 
{id: 589, at: '23,12', facing: 'N', shape: 'straight', from: 34, …}
419
: 
{id: 590, at: '23,14', facing: 'N', shape: 'straight', from: 35, …}
420
: 
{id: 591, at: '21,13', facing: 'N', shape: 'straight', from: 113, …}
421
: 
{id: 592, at: '21,11', facing: 'N', shape: 'straight', from: 113, …}
422
: 
{id: 593, at: '16,12', facing: 'W', shape: 'corner', from: 3, …}
423
: 
{id: 594, at: '18,12', facing: 'N', shape: 'corner', from: 4, …}
424
: 
{id: 595, at: '17,11', facing: 'E', shape: 'straight', from: 5, …}
425
: 
{id: 596, at: '16,4', facing: 'W', shape: 'straight', from: 48, …}
426
: 
{id: 597, at: '18,4', facing: 'W', shape: 'straight', from: 49, …}
427
: 
{id: 598, at: '19,0', facing: 'N', shape: 'straight', from: 145, …}
428
: 
{id: 599, at: '20,0', facing: 'N', shape: 'straight', from: 145, …}
429
: 
{id: 600, at: '21,0', facing: 'N', shape: 'straight', from: 145, …}
430
: 
{id: 601, at: '22,0', facing: 'N', shape: 'straight', from: 145, …}
431
: 
{id: 602, at: '23,0', facing: 'N', shape: 'straight', from: 145, …}
432
: 
{id: 603, at: '25,2', facing: 'E', shape: 'straight', from: 145, …}
433
: 
{id: 604, at: '25,3', facing: 'E', shape: 'straight', from: 145, …}
434
: 
{id: 605, at: '25,4', facing: 'E', shape: 'straight', from: 145, …}
435
: 
{id: 606, at: '25,8', facing: 'W', shape: 'straight', from: 149, …}
436
: 
{id: 607, at: '28,11', facing: 'S', shape: 'straight', from: 146, …}
437
: 
{id: 608, at: '27,11', facing: 'S', shape: 'straight', from: 146, …}
438
: 
{id: 609, at: '26,11', facing: 'S', shape: 'straight', from: 146, …}
439
: 
{id: 610, at: '27,10', facing: 'S', shape: 'straight', from: 149, …}
440
: 
{id: 611, at: '28,10', facing: 'S', shape: 'straight', from: 149, …}
441
: 
{id: 612, at: '29,10', facing: 'S', shape: 'straight', from: 149, …}
442
: 
{id: 613, at: '30,10', facing: 'S', shape: 'straight', from: 149, …}
443
: 
{id: 614, at: '31,10', facing: 'S', shape: 'straight', from: 149, …}
444
: 
{id: 615, at: '33,10', facing: 'S', shape: 'straight', from: 149, …}
445
: 
{id: 616, at: '34,10', facing: 'S', shape: 'straight', from: 149, …}
446
: 
{id: 617, at: '31,11', facing: 'S', shape: 'straight', from: 146, …}
447
: 
{id: 618, at: '32,11', facing: 'S', shape: 'straight', from: 146, …}
448
: 
{id: 619, at: '33,11', facing: 'S', shape: 'straight', from: 146, …}
449
: 
{id: 620, at: '34,11', facing: 'S', shape: 'straight', from: 146, …}
450
: 
{id: 621, at: '35,11', facing: 'S', shape: 'straight', from: 146, …}
451
: 
{id: 622, at: '36,11', facing: 'S', shape: 'straight', from: 146, …}
452
: 
{id: 623, at: '30,11', facing: 'S', shape: 'straight', from: 146, …}
453
: 
{id: 624, at: '36,10', facing: 'S', shape: 'straight', from: 149, …}
454
: 
{id: 625, at: '37,10', facing: 'S', shape: 'straight', from: 149, …}
455
: 
{id: 626, at: '38,10', facing: 'S', shape: 'straight', from: 149, …}
456
: 
{id: 627, at: '39,10', facing: 'S', shape: 'straight', from: 149, …}
457
: 
{id: 628, at: '40,10', facing: 'S', shape: 'straight', from: 149, …}
458
: 
{id: 629, at: '41,10', facing: 'S', shape: 'straight', from: 149, …}
459
: 
{id: 630, at: '43,10', facing: 'S', shape: 'straight', from: 149, …}
460
: 
{id: 631, at: '44,10', facing: 'S', shape: 'straight', from: 149, …}
461
: 
{id: 632, at: '45,10', facing: 'S', shape: 'straight', from: 149, …}
462
: 
{id: 633, at: '46,10', facing: 'S', shape: 'straight', from: 149, …}
463
: 
{id: 634, at: '42,10', facing: 'S', shape: 'straight', from: 149, …}
464
: 
{id: 635, at: '32,10', facing: 'S', shape: 'straight', from: 149, …}
465
: 
{id: 636, at: '29,27', facing: 'N', shape: 'straight', from: 91, …}
466
: 
{id: 637, at: '30,27', facing: 'N', shape: 'straight', from: 91, …}
467
: 
{id: 638, at: '31,27', facing: 'N', shape: 'straight', from: 91, …}
468
: 
{id: 639, at: '32,27', facing: 'N', shape: 'straight', from: 91, …}
469
: 
{id: 640, at: '33,27', facing: 'N', shape: 'straight', from: 91, …}
470
: 
{id: 641, at: '34,27', facing: 'N', shape: 'straight', from: 91, …}
471
: 
{id: 642, at: '35,27', facing: 'N', shape: 'straight', from: 91, …}
472
: 
{id: 643, at: '36,27', facing: 'N', shape: 'straight', from: 91, …}
473
: 
{id: 644, at: '37,27', facing: 'N', shape: 'straight', from: 91, …}
474
: 
{id: 645, at: '38,27', facing: 'N', shape: 'straight', from: 91, …}
475
: 
{id: 646, at: '39,27', facing: 'N', shape: 'straight', from: 91, …}
476
: 
{id: 647, at: '40,27', facing: 'N', shape: 'straight', from: 91, …}
477
: 
{id: 648, at: '41,27', facing: 'N', shape: 'straight', from: 91, …}
478
: 
{id: 649, at: '42,27', facing: 'N', shape: 'straight', from: 91, …}
479
: 
{id: 650, at: '34,32', facing: 'S', shape: 'straight', from: 114, …}
480
: 
{id: 651, at: '34,30', facing: 'S', shape: 'straight', from: 114, …}
481
: 
{id: 652, at: '42,30', facing: 'N', shape: 'straight', from: 115, …}
482
: 
{id: 653, at: '42,32', facing: 'N', shape: 'straight', from: 115, …}
483
: 
{id: 654, at: '38,35', facing: 'E', shape: 'straight', from: 41, …}
484
: 
{id: 655, at: '36,35', facing: 'E', shape: 'straight', from: 40, …}
485
: 
{id: 656, at: '34,37', facing: 'S', shape: 'straight', from: 40, …}
486
: 
{id: 657, at: '33,37', facing: 'S', shape: 'straight', from: 40, …}
487
: 
{id: 658, at: '32,37', facing: 'S', shape: 'straight', from: 40, …}
488
: 
{id: 659, at: '31,37', facing: 'S', shape: 'straight', from: 40, …}
489
: 
{id: 660, at: '38,30', facing: 'E', shape: 'straight', from: 8, …}
490
: 
{id: 661, at: '49,34', facing: 'W', shape: 'corner', from: 92, …}
491
: 
{id: 662, at: '49,32', facing: 'W', shape: 'straight', from: 92, …}
492
: 
{id: 663, at: '27,34', facing: 'N', shape: 'corner', from: 91, …}
493
: 
{id: 664, at: '27,32', facing: 'W', shape: 'straight', from: 91, …}
494
: 
{id: 665, at: '27,31', facing: 'W', shape: 'straight', from: 91, …}
495
: 
{id: 666, at: '27,30', facing: 'W', shape: 'straight', from: 91, …}
496
: 
{id: 667, at: '27,29', facing: 'W', shape: 'straight', from: 91, …}
497
: 
{id: 668, at: '29,37', facing: 'N', shape: 'corner', from: 40, …}
498
: 
{id: 669, at: '27,27', facing: 'E', shape: 'corner', from: 91, …}
499
: 
{id: 670, at: '17,17', facing: 'E', shape: 'straight', from: 45, …}
[500 … 599]
500
: 
{id: 671, at: '17,19', facing: 'N', shape: 'corner', from: 45, …}
501
: 
{id: 672, at: '26,13', facing: 'S', shape: 'corner', from: 143, …}
502
: 
{id: 673, at: '26,19', facing: 'W', shape: 'corner', from: 45, …}
503
: 
{id: 674, at: '19,19', facing: 'N', shape: 'straight', from: 45, …}
504
: 
{id: 675, at: '20,19', facing: 'N', shape: 'straight', from: 45, …}
505
: 
{id: 676, at: '21,19', facing: 'N', shape: 'straight', from: 45, …}
506
: 
{id: 677, at: '22,19', facing: 'N', shape: 'straight', from: 45, …}
507
: 
{id: 678, at: '23,19', facing: 'N', shape: 'straight', from: 45, …}
508
: 
{id: 679, at: '24,19', facing: 'N', shape: 'straight', from: 45, …}
509
: 
{id: 680, at: '28,16', facing: 'W', shape: 'corner', from: 97, …}
510
: 
{id: 681, at: '28,14', facing: 'W', shape: 'straight', from: 97, …}
511
: 
{id: 682, at: '28,12', facing: 'E', shape: 'corner', from: 97, …}
512
: 
{id: 683, at: '31,12', facing: 'S', shape: 'corner', from: 97, …}
513
: 
{id: 684, at: '31,15', facing: 'N', shape: 'corner', from: 97, …}
514
: 
{id: 685, at: '33,15', facing: 'N', shape: 'straight', from: 97, …}
515
: 
{id: 686, at: '34,15', facing: 'N', shape: 'straight', from: 97, …}
516
: 
{id: 687, at: '35,15', facing: 'N', shape: 'straight', from: 97, …}
517
: 
{id: 688, at: '13,36', facing: 'S', shape: 'corner', from: 56, …}
518
: 
{id: 689, at: '18,39', facing: 'S', shape: 'corner', from: 98, …}
519
: 
{id: 690, at: '15,39', facing: 'N', shape: 'straight', from: 98, …}
520
: 
{id: 691, at: '16,39', facing: 'N', shape: 'straight', from: 98, …}
521
: 
{id: 692, at: '22,47', facing: 'N', shape: 'corner', from: 62, …}
522
: 
{id: 693, at: '20,44', facing: 'E', shape: 'corner', from: 99, …}
523
: 
{id: 694, at: '20,46', facing: 'E', shape: 'straight', from: 99, …}
524
: 
{id: 695, at: '28,40', facing: 'S', shape: 'corner', from: 17, …}
525
: 
{id: 696, at: '28,43', facing: 'N', shape: 'corner', from: 17, …}
526
: 
{id: 697, at: '31,42', facing: 'N', shape: 'straight', from: 135, …}
527
: 
{id: 698, at: '31,44', facing: 'N', shape: 'straight', from: 135, …}
528
: 
{id: 699, at: '33,43', facing: 'N', shape: 'straight', from: 77, …}
529
: 
{id: 700, at: '33,45', facing: 'N', shape: 'straight', from: 78, …}
530
: 
{id: 701, at: '36,44', facing: 'W', shape: 'corner', from: 164, …}
531
: 
{id: 702, at: '26,39', facing: 'N', shape: 'corner', from: 164, …}
532
: 
{id: 703, at: '36,39', facing: 'S', shape: 'corner', from: 164, …}
533
: 
{id: 704, at: '36,41', facing: 'W', shape: 'straight', from: 164, …}
534
: 
{id: 705, at: '36,42', facing: 'W', shape: 'straight', from: 164, …}
535
: 
{id: 706, at: '33,39', facing: 'S', shape: 'straight', from: 164, …}
536
: 
{id: 707, at: '32,39', facing: 'S', shape: 'straight', from: 164, …}
537
: 
{id: 708, at: '31,39', facing: 'S', shape: 'straight', from: 164, …}
538
: 
{id: 709, at: '30,39', facing: 'S', shape: 'straight', from: 164, …}
539
: 
{id: 710, at: '29,39', facing: 'S', shape: 'straight', from: 164, …}
540
: 
{id: 711, at: '34,39', facing: 'S', shape: 'straight', from: 164, …}
541
: 
{id: 712, at: '28,39', facing: 'S', shape: 'straight', from: 164, …}
542
: 
{id: 713, at: '9,37', facing: 'N', shape: 'straight', from: 151, …}
543
: 
{id: 714, at: '11,37', facing: 'S', shape: 'corner', from: 151, …}
544
: 
{id: 715, at: '11,40', facing: 'W', shape: 'corner', from: 151, …}
545
: 
{id: 716, at: '5,40', facing: 'N', shape: 'corner', from: 53, …}
546
: 
{id: 717, at: '8,42', facing: 'N', shape: 'corner', from: 100, …}
547
: 
{id: 718, at: '7,44', facing: 'N', shape: 'straight', from: 101, …}
548
: 
{id: 719, at: '8,44', facing: 'N', shape: 'straight', from: 101, …}
549
: 
{id: 720, at: '9,44', facing: 'N', shape: 'straight', from: 101, …}
550
: 
{id: 721, at: '0,33', facing: 'E', shape: 'straight', from: 150, …}
551
: 
{id: 722, at: '0,34', facing: 'E', shape: 'straight', from: 150, …}
552
: 
{id: 723, at: '0,35', facing: 'E', shape: 'straight', from: 150, …}
553
: 
{id: 724, at: '0,36', facing: 'E', shape: 'straight', from: 150, …}
554
: 
{id: 725, at: '0,37', facing: 'E', shape: 'straight', from: 150, …}
555
: 
{id: 726, at: '0,38', facing: 'E', shape: 'straight', from: 150, …}
556
: 
{id: 727, at: '0,39', facing: 'E', shape: 'straight', from: 150, …}
557
: 
{id: 728, at: '0,40', facing: 'E', shape: 'straight', from: 150, …}
558
: 
{id: 729, at: '4,33', facing: 'E', shape: 'straight', from: 52, …}
559
: 
{id: 730, at: '4,34', facing: 'E', shape: 'straight', from: 52, …}
560
: 
{id: 731, at: '4,35', facing: 'E', shape: 'straight', from: 52, …}
561
: 
{id: 732, at: '4,36', facing: 'E', shape: 'straight', from: 52, …}
562
: 
{id: 733, at: '4,37', facing: 'E', shape: 'straight', from: 52, …}
563
: 
{id: 734, at: '4,39', facing: 'E', shape: 'straight', from: 52, …}
564
: 
{id: 735, at: '4,38', facing: 'E', shape: 'straight', from: 52, …}
565
: 
{id: 736, at: '4,40', facing: 'E', shape: 'straight', from: 52, …}
566
: 
{id: 737, at: '4,41', facing: 'E', shape: 'straight', from: 52, …}
567
: 
{id: 738, at: '4,42', facing: 'E', shape: 'straight', from: 52, …}
568
: 
{id: 739, at: '0,41', facing: 'E', shape: 'straight', from: 150, …}
569
: 
{id: 740, at: '4,47', facing: 'W', shape: 'corner', from: 150, …}
570
: 
{id: 741, at: '0,47', facing: 'N', shape: 'corner', from: 150, …}
571
: 
{id: 742, at: '0,42', facing: 'E', shape: 'straight', from: 150, …}
572
: 
{id: 743, at: '0,43', facing: 'E', shape: 'straight', from: 150, …}
573
: 
{id: 744, at: '0,44', facing: 'E', shape: 'straight', from: 150, …}
574
: 
{id: 745, at: '0,45', facing: 'E', shape: 'straight', from: 150, …}
575
: 
{id: 746, at: '2,47', facing: 'N', shape: 'straight', from: 150, …}
576
: 
{id: 747, at: '14,39', facing: 'N', shape: 'straight', from: 98, …}
577
: 
{id: 748, at: '40,42', facing: 'S', shape: 'straight', from: 158, …}
578
: 
{id: 749, at: '38,42', facing: 'E', shape: 'corner', from: 158, …}
579
: 
{id: 750, at: '38,44', facing: 'E', shape: 'straight', from: 158, …}
580
: 
{id: 751, at: '38,45', facing: 'E', shape: 'straight', from: 158, …}
581
: 
{id: 752, at: '38,46', facing: 'E', shape: 'straight', from: 158, …}
582
: 
{id: 753, at: '38,47', facing: 'E', shape: 'straight', from: 158, …}
583
: 
{id: 754, at: '38,48', facing: 'E', shape: 'straight', from: 158, …}
584
: 
{id: 755, at: '38,49', facing: 'E', shape: 'straight', from: 158, …}
585
: 
{id: 756, at: '38,50', facing: 'E', shape: 'straight', from: 158, …}
586
: 
{id: 757, at: '38,51', facing: 'E', shape: 'straight', from: 158, …}
587
: 
{id: 758, at: '38,52', facing: 'E', shape: 'straight', from: 158, …}
588
: 
{id: 759, at: '38,53', facing: 'E', shape: 'straight', from: 158, …}
589
: 
{id: 760, at: '43,49', facing: 'N', shape: 'corner', from: 71, …}
590
: 
{id: 761, at: '43,46', facing: 'S', shape: 'corner', from: 71, …}
591
: 
{id: 762, at: '41,46', facing: 'S', shape: 'straight', from: 71, …}
592
: 
{id: 763, at: '39,46', facing: 'E', shape: 'corner', from: 71, …}
593
: 
{id: 764, at: '38,54', facing: 'E', shape: 'straight', from: 158, …}
594
: 
{id: 765, at: '38,56', facing: 'N', shape: 'corner', from: 158, …}
595
: 
{id: 766, at: '40,56', facing: 'N', shape: 'straight', from: 158, …}
596
: 
{id: 767, at: '42,56', facing: 'W', shape: 'corner', from: 158, …}
597
: 
{id: 768, at: '42,53', facing: 'S', shape: 'corner', from: 158, …}
598
: 
{id: 769, at: '39,53', facing: 'N', shape: 'corner', from: 158, …}
599
: 
{id: 770, at: '39,48', facing: 'E', shape: 'straight', from: 71, …}
[600 … 699]
600
: 
{id: 771, at: '46,50', facing: 'S', shape: 'corner', from: 102, …}
601
: 
{id: 772, at: '46,52', facing: 'E', shape: 'straight', from: 102, …}
602
: 
{id: 773, at: '40,50', facing: 'N', shape: 'straight', from: 102, …}
603
: 
{id: 774, at: '41,50', facing: 'N', shape: 'straight', from: 102, …}
604
: 
{id: 775, at: '42,50', facing: 'N', shape: 'straight', from: 102, …}
605
: 
{id: 776, at: '43,50', facing: 'N', shape: 'straight', from: 102, …}
606
: 
{id: 777, at: '44,50', facing: 'N', shape: 'straight', from: 102, …}
607
: 
{id: 778, at: '57,49', facing: 'W', shape: 'corner', from: 156, …}
608
: 
{id: 779, at: '54,51', facing: 'W', shape: 'corner', from: 103, …}
609
: 
{id: 780, at: '59,53', facing: 'N', shape: 'corner', from: 134, …}
610
: 
{id: 781, at: '62,58', facing: 'W', shape: 'corner', from: 104, …}
611
: 
{id: 782, at: '60,58', facing: 'S', shape: 'straight', from: 104, …}
612
: 
{id: 783, at: '62,56', facing: 'E', shape: 'straight', from: 104, …}
613
: 
{id: 784, at: '62,54', facing: 'E', shape: 'straight', from: 104, …}
614
: 
{id: 785, at: '62,55', facing: 'E', shape: 'straight', from: 104, …}
615
: 
{id: 786, at: '64,30', facing: 'S', shape: 'corner', from: 157, …}
616
: 
{id: 787, at: '66,33', facing: 'S', shape: 'corner', from: 105, …}
617
: 
{id: 788, at: '57,56', facing: 'W', shape: 'corner', from: 134, …}
618
: 
{id: 789, at: '57,53', facing: 'E', shape: 'straight', from: 134, …}
619
: 
{id: 790, at: '57,54', facing: 'E', shape: 'straight', from: 134, …}
620
: 
{id: 791, at: '57,52', facing: 'E', shape: 'straight', from: 134, …}
621
: 
{id: 792, at: '54,56', facing: 'S', shape: 'straight', from: 134, …}
622
: 
{id: 793, at: '55,56', facing: 'S', shape: 'straight', from: 134, …}
623
: 
{id: 794, at: '50,56', facing: 'N', shape: 'straight', from: 159, …}
624
: 
{id: 795, at: '52,57', facing: 'E', shape: 'straight', from: 106, …}
625
: 
{id: 796, at: '52,58', facing: 'E', shape: 'straight', from: 106, …}
626
: 
{id: 797, at: '52,59', facing: 'E', shape: 'straight', from: 106, …}
627
: 
{id: 798, at: '30,51', facing: 'E', shape: 'straight', from: 96, …}
628
: 
{id: 799, at: '30,52', facing: 'E', shape: 'straight', from: 96, …}
629
: 
{id: 800, at: '30,53', facing: 'E', shape: 'straight', from: 96, …}
630
: 
{id: 801, at: '30,54', facing: 'E', shape: 'straight', from: 96, …}
631
: 
{id: 802, at: '30,55', facing: 'E', shape: 'straight', from: 96, …}
632
: 
{id: 803, at: '30,56', facing: 'E', shape: 'straight', from: 96, …}
633
: 
{id: 804, at: '30,57', facing: 'E', shape: 'straight', from: 96, …}
634
: 
{id: 805, at: '30,58', facing: 'E', shape: 'straight', from: 96, …}
635
: 
{id: 806, at: '30,59', facing: 'E', shape: 'straight', from: 96, …}
636
: 
{id: 807, at: '30,60', facing: 'E', shape: 'straight', from: 96, …}
637
: 
{id: 808, at: '30,62', facing: 'E', shape: 'straight', from: 96, …}
638
: 
{id: 809, at: '30,63', facing: 'E', shape: 'straight', from: 96, …}
639
: 
{id: 810, at: '30,61', facing: 'E', shape: 'straight', from: 96, …}
640
: 
{id: 811, at: '30,64', facing: 'E', shape: 'straight', from: 96, …}
641
: 
{id: 812, at: '30,65', facing: 'E', shape: 'straight', from: 96, …}
642
: 
{id: 813, at: '30,66', facing: 'E', shape: 'straight', from: 96, …}
643
: 
{id: 814, at: '30,67', facing: 'E', shape: 'straight', from: 96, …}
644
: 
{id: 815, at: '32,62', facing: 'E', shape: 'corner', from: 26, …}
645
: 
{id: 816, at: '32,65', facing: 'N', shape: 'corner', from: 26, …}
646
: 
{id: 817, at: '38,62', facing: 'S', shape: 'corner', from: 27, …}
647
: 
{id: 818, at: '38,64', facing: 'W', shape: 'straight', from: 27, …}
648
: 
{id: 819, at: '31,60', facing: 'E', shape: 'corner', from: 107, …}
649
: 
{id: 820, at: '35,60', facing: 'S', shape: 'corner', from: 107, …}
650
: 
{id: 821, at: '33,60', facing: 'S', shape: 'straight', from: 107, …}
651
: 
{id: 822, at: '31,62', facing: 'E', shape: 'straight', from: 107, …}
652
: 
{id: 823, at: '31,63', facing: 'E', shape: 'straight', from: 107, …}
653
: 
{id: 824, at: '31,65', facing: 'E', shape: 'straight', from: 107, …}
654
: 
{id: 825, at: '31,66', facing: 'E', shape: 'straight', from: 107, …}
655
: 
{id: 826, at: '31,64', facing: 'E', shape: 'straight', from: 107, …}
656
: 
{id: 827, at: '31,67', facing: 'E', shape: 'straight', from: 107, …}
657
: 
{id: 828, at: '31,68', facing: 'E', shape: 'straight', from: 107, …}
658
: 
{id: 829, at: '31,69', facing: 'E', shape: 'straight', from: 107, …}
659
: 
{id: 830, at: '31,70', facing: 'E', shape: 'straight', from: 107, …}
660
: 
{id: 831, at: '31,71', facing: 'E', shape: 'straight', from: 107, …}
661
: 
{id: 832, at: '22,48', facing: 'E', shape: 'corner', from: 155, …}
662
: 
{id: 833, at: '22,51', facing: 'W', shape: 'corner', from: 155, …}
663
: 
{id: 834, at: '19,51', facing: 'N', shape: 'corner', from: 155, …}
664
: 
{id: 835, at: '19,49', facing: 'W', shape: 'straight', from: 155, …}
665
: 
{id: 836, at: '19,48', facing: 'W', shape: 'straight', from: 155, …}
666
: 
{id: 837, at: '31,73', facing: 'W', shape: 'corner', from: 107, …}
667
: 
{id: 838, at: '27,73', facing: 'N', shape: 'corner', from: 107, …}
668
: 
{id: 839, at: '29,73', facing: 'S', shape: 'straight', from: 107, …}
669
: 
{id: 840, at: '30,69', facing: 'W', shape: 'corner', from: 96, …}
670
: 
{id: 841, at: '15,50', facing: 'N', shape: 'corner', from: 28, …}
671
: 
{id: 842, at: '15,47', facing: 'S', shape: 'corner', from: 28, …}
672
: 
{id: 843, at: '12,46', facing: 'S', shape: 'straight', from: 136, …}
673
: 
{id: 844, at: '12,48', facing: 'S', shape: 'straight', from: 136, …}
674
: 
{id: 845, at: '10,45', facing: 'S', shape: 'straight', from: 80, …}
675
: 
{id: 846, at: '10,47', facing: 'S', shape: 'straight', from: 79, …}
676
: 
{id: 847, at: '16,51', facing: 'S', shape: 'straight', from: 29, …}
677
: 
{id: 848, at: '15,51', facing: 'S', shape: 'straight', from: 29, …}
678
: 
{id: 849, at: '13,50', facing: 'S', shape: 'straight', from: 137, …}
679
: 
{id: 850, at: '13,52', facing: 'S', shape: 'straight', from: 137, …}
680
: 
{id: 851, at: '10,51', facing: 'E', shape: 'corner', from: 82, …}
681
: 
{id: 852, at: '10,49', facing: 'S', shape: 'straight', from: 81, …}
682
: 
{id: 853, at: '11,49', facing: 'S', shape: 'straight', from: 81, …}
683
: 
{id: 854, at: '8,49', facing: 'E', shape: 'corner', from: 81, …}
684
: 
{id: 855, at: '8,52', facing: 'W', shape: 'corner', from: 81, …}
685
: 
{id: 856, at: '5,52', facing: 'N', shape: 'corner', from: 81, …}
686
: 
{id: 857, at: '5,46', facing: 'E', shape: 'corner', from: 166, …}
687
: 
{id: 858, at: '7,46', facing: 'S', shape: 'straight', from: 166, …}
688
: 
{id: 859, at: '8,46', facing: 'S', shape: 'straight', from: 166, …}
689
: 
{id: 860, at: '18,52', facing: 'E', shape: 'straight', from: 30, …}
690
: 
{id: 861, at: '17,54', facing: 'E', shape: 'straight', from: 138, …}
691
: 
{id: 862, at: '19,54', facing: 'E', shape: 'straight', from: 138, …}
692
: 
{id: 863, at: '16,56', facing: 'E', shape: 'straight', from: 83, …}
693
: 
{id: 864, at: '18,56', facing: 'E', shape: 'straight', from: 84, …}
694
: 
{id: 865, at: '17,59', facing: 'W', shape: 'corner', from: 167, …}
695
: 
{id: 866, at: '10,59', facing: 'N', shape: 'corner', from: 82, …}
696
: 
{id: 867, at: '12,59', facing: 'N', shape: 'straight', from: 82, …}
697
: 
{id: 868, at: '10,53', facing: 'E', shape: 'straight', from: 82, …}
698
: 
{id: 869, at: '10,57', facing: 'E', shape: 'straight', from: 82, …}
699
: 
{id: 870, at: '10,54', facing: 'E', shape: 'straight', from: 82, …}
[700 … 799]
700
: 
{id: 871, at: '10,56', facing: 'E', shape: 'straight', from: 82, …}
701
: 
{id: 872, at: '10,55', facing: 'E', shape: 'straight', from: 82, …}
702
: 
{id: 873, at: '4,69', facing: 'E', shape: 'straight', from: 31, …}
703
: 
{id: 874, at: '3,72', facing: 'W', shape: 'corner', from: 139, …}
704
: 
{id: 875, at: '0,72', facing: 'N', shape: 'corner', from: 139, …}
705
: 
{id: 879, at: '5,71', facing: 'E', shape: 'straight', from: 139, …}
706
: 
{id: 880, at: '7,74', facing: 'N', shape: 'straight', from: 959, …}
707
: 
{id: 881, at: '9,74', facing: 'N', shape: 'straight', from: 959, …}
708
: 
{id: 882, at: '10,74', facing: 'N', shape: 'straight', from: 959, …}
709
: 
{id: 883, at: '11,74', facing: 'N', shape: 'straight', from: 959, …}
710
: 
{id: 884, at: '8,74', facing: 'N', shape: 'straight', from: 959, …}
711
: 
{id: 885, at: '6,67', facing: 'N', shape: 'straight', from: 32, …}
712
: 
{id: 890, at: '3,49', facing: 'E', shape: 'corner', from: 108, …}
713
: 
{id: 891, at: '2,67', facing: 'N', shape: 'corner', from: 33, …}
714
: 
{id: 892, at: '1,64', facing: 'W', shape: 'straight', from: 141, …}
715
: 
{id: 893, at: '3,64', facing: 'W', shape: 'straight', from: 141, …}
716
: 
{id: 894, at: '2,62', facing: 'W', shape: 'straight', from: 87, …}
717
: 
{id: 895, at: '4,62', facing: 'W', shape: 'straight', from: 88, …}
718
: 
{id: 896, at: '0,69', facing: 'W', shape: 'straight', from: 139, …}
719
: 
{id: 897, at: '0,70', facing: 'W', shape: 'straight', from: 139, …}
720
: 
{id: 898, at: '0,66', facing: 'W', shape: 'straight', from: 139, …}
721
: 
{id: 899, at: '0,68', facing: 'W', shape: 'straight', from: 139, …}
722
: 
{id: 900, at: '0,67', facing: 'W', shape: 'straight', from: 139, …}
723
: 
{id: 901, at: '0,65', facing: 'W', shape: 'straight', from: 139, …}
724
: 
{id: 902, at: '0,64', facing: 'W', shape: 'straight', from: 139, …}
725
: 
{id: 903, at: '0,63', facing: 'W', shape: 'straight', from: 139, …}
726
: 
{id: 904, at: '0,62', facing: 'W', shape: 'straight', from: 139, …}
727
: 
{id: 905, at: '3,51', facing: 'E', shape: 'straight', from: 108, …}
728
: 
{id: 906, at: '3,52', facing: 'E', shape: 'straight', from: 108, …}
729
: 
{id: 907, at: '3,54', facing: 'N', shape: 'corner', from: 108, …}
730
: 
{id: 908, at: '0,60', facing: 'W', shape: 'straight', from: 139, …}
731
: 
{id: 909, at: '0,59', facing: 'W', shape: 'straight', from: 139, …}
732
: 
{id: 910, at: '0,58', facing: 'W', shape: 'straight', from: 139, …}
733
: 
{id: 911, at: '0,61', facing: 'W', shape: 'straight', from: 139, …}
734
: 
{id: 912, at: '4,59', facing: 'N', shape: 'straight', from: 111, …}
735
: 
{id: 913, at: '6,59', facing: 'S', shape: 'corner', from: 111, …}
736
: 
{id: 914, at: '6,62', facing: 'N', shape: 'corner', from: 111, …}
737
: 
{id: 915, at: '8,62', facing: 'N', shape: 'straight', from: 111, …}
738
: 
{id: 916, at: '7,60', facing: 'N', shape: 'corner', from: 108, …}
739
: 
{id: 917, at: '7,54', facing: 'S', shape: 'corner', from: 108, …}
740
: 
{id: 918, at: '7,56', facing: 'E', shape: 'straight', from: 108, …}
741
: 
{id: 919, at: '7,58', facing: 'E', shape: 'straight', from: 108, …}
742
: 
{id: 920, at: '7,57', facing: 'E', shape: 'straight', from: 108, …}
743
: 
{id: 921, at: '5,54', facing: 'N', shape: 'straight', from: 108, …}
744
: 
{id: 922, at: '4,55', facing: 'S', shape: 'corner', from: 139, …}
745
: 
{id: 923, at: '0,55', facing: 'E', shape: 'corner', from: 139, …}
746
: 
{id: 924, at: '0,57', facing: 'W', shape: 'straight', from: 139, …}
747
: 
{id: 925, at: '2,55', facing: 'N', shape: 'straight', from: 139, …}
748
: 
{id: 927, at: '8,66', facing: 'N', shape: 'straight', from: 926, …}
749
: 
{id: 928, at: '8,68', facing: 'N', shape: 'straight', from: 926, …}
750
: 
{id: 931, at: '10,67', facing: 'N', shape: 'straight', from: 929, …}
751
: 
{id: 932, at: '10,69', facing: 'N', shape: 'straight', from: 930, …}
752
: 
{id: 934, at: '13,68', facing: 'S', shape: 'corner', from: 933, …}
753
: 
{id: 935, at: '13,74', facing: 'W', shape: 'corner', from: 959, …}
754
: 
{id: 937, at: '11,61', facing: 'S', shape: 'corner', from: 170, …}
755
: 
{id: 939, at: '11,63', facing: 'E', shape: 'straight', from: 170, …}
756
: 
{id: 941, at: '11,65', facing: 'N', shape: 'corner', from: 170, …}
757
: 
{id: 942, at: '14,60', facing: 'E', shape: 'straight', from: 109, …}
758
: 
{id: 943, at: '14,61', facing: 'E', shape: 'straight', from: 109, …}
759
: 
{id: 944, at: '14,63', facing: 'N', shape: 'corner', from: 109, …}
760
: 
{id: 945, at: '13,65', facing: 'N', shape: 'straight', from: 170, …}
761
: 
{id: 946, at: '14,65', facing: 'N', shape: 'straight', from: 170, …}
762
: 
{id: 947, at: '15,65', facing: 'N', shape: 'straight', from: 170, …}
763
: 
{id: 953, at: '15,71', facing: 'N', shape: 'straight', from: 936, …}
764
: 
{id: 955, at: '14,71', facing: 'N', shape: 'straight', from: 936, …}
765
: 
{id: 960, at: '4,74', facing: 'N', shape: 'corner', from: 959, …}
766
: 
{id: 961, at: '6,74', facing: 'N', shape: 'straight', from: 959, …}
767
: 
{id: 988, at: '60,61', facing: 'S', shape: 'straight', from: 987, …}
768
: 
{id: 989, at: '59,61', facing: 'S', shape: 'straight', from: 987, …}
769
: 
{id: 990, at: '57,61', facing: 'E', shape: 'corner', from: 987, …}
770
: 
{id: 992, at: '56,64', facing: 'E', shape: 'straight', from: 991, …}
771
: 
{id: 993, at: '58,64', facing: 'E', shape: 'straight', from: 991, …}
772
: 
{id: 996, at: '55,66', facing: 'E', shape: 'straight', from: 994, …}
773
: 
{id: 997, at: '57,66', facing: 'E', shape: 'straight', from: 995, …}
774
: 
{id: 1003, at: '63,60', facing: 'N', shape: 'straight', from: 999, …}
775
: 
{id: 1006, at: '65,59', facing: 'N', shape: 'straight', from: 1004, …}
776
: 
{id: 1007, at: '65,61', facing: 'N', shape: 'straight', from: 1004, …}
777
: 
{id: 1010, at: '67,60', facing: 'N', shape: 'straight', from: 1008, …}
778
: 
{id: 1012, at: '67,62', facing: 'N', shape: 'straight', from: 1009, …}
779
: 
{id: 1014, at: '62,62', facing: 'E', shape: 'straight', from: 1002, …}
780
: 
{id: 1016, at: '61,64', facing: 'E', shape: 'straight', from: 1015, …}
781
: 
{id: 1017, at: '63,64', facing: 'E', shape: 'straight', from: 1015, …}
782
: 
{id: 1021, at: '56,72', facing: 'N', shape: 'corner', from: 1018, …}
783
: 
{id: 1022, at: '60,72', facing: 'W', shape: 'corner', from: 1018, …}
784
: 
{id: 1023, at: '58,72', facing: 'S', shape: 'straight', from: 1018, …}
785
: 
{id: 1024, at: '60,66', facing: 'E', shape: 'straight', from: 1018, …}
786
: 
{id: 1025, at: '60,67', facing: 'E', shape: 'straight', from: 1018, …}
787
: 
{id: 1026, at: '60,68', facing: 'E', shape: 'straight', from: 1018, …}
788
: 
{id: 1027, at: '60,69', facing: 'E', shape: 'straight', from: 1018, …}
789
: 
{id: 1028, at: '60,70', facing: 'E', shape: 'straight', from: 1018, …}
790
: 
{id: 1030, at: '62,66', facing: 'E', shape: 'straight', from: 1019, …}
791
: 
{id: 1031, at: '62,67', facing: 'E', shape: 'straight', from: 1019, …}
792
: 
{id: 1032, at: '62,68', facing: 'E', shape: 'straight', from: 1019, …}
793
: 
{id: 1033, at: '62,69', facing: 'E', shape: 'straight', from: 1019, …}
794
: 
{id: 1034, at: '62,72', facing: 'N', shape: 'corner', from: 1019, …}
795
: 
{id: 1035, at: '62,70', facing: 'E', shape: 'straight', from: 1019, …}
796
: 
{id: 1036, at: '64,72', facing: 'N', shape: 'straight', from: 1019, …}
797
: 
{id: 1037, at: '70,61', facing: 'S', shape: 'corner', from: 1013, …}
798
: 
{id: 1038, at: '70,72', facing: 'W', shape: 'corner', from: 1013, …}
799
: 
{id: 1039, at: '70,63', facing: 'E', shape: 'straight', from: 1013, …}
[800 … 871]
800
: 
{id: 1040, at: '70,64', facing: 'E', shape: 'straight', from: 1013, …}
801
: 
{id: 1041, at: '70,65', facing: 'E', shape: 'straight', from: 1013, …}
802
: 
{id: 1042, at: '70,66', facing: 'E', shape: 'straight', from: 1013, …}
803
: 
{id: 1043, at: '70,67', facing: 'E', shape: 'straight', from: 1013, …}
804
: 
{id: 1044, at: '70,68', facing: 'E', shape: 'straight', from: 1013, …}
805
: 
{id: 1045, at: '70,69', facing: 'E', shape: 'straight', from: 1013, …}
806
: 
{id: 1046, at: '70,70', facing: 'E', shape: 'straight', from: 1013, …}
807
: 
{id: 1047, at: '68,72', facing: 'S', shape: 'straight', from: 1013, …}
808
: 
{id: 1048, at: '66,74', facing: 'W', shape: 'corner', from: 1029, …}
809
: 
{id: 1049, at: '64,74', facing: 'S', shape: 'straight', from: 1029, …}
810
: 
{id: 1050, at: '63,74', facing: 'S', shape: 'straight', from: 1029, …}
811
: 
{id: 1051, at: '62,74', facing: 'S', shape: 'straight', from: 1029, …}
812
: 
{id: 1052, at: '61,74', facing: 'S', shape: 'straight', from: 1029, …}
813
: 
{id: 1053, at: '60,74', facing: 'S', shape: 'straight', from: 1029, …}
814
: 
{id: 1054, at: '59,74', facing: 'S', shape: 'straight', from: 1029, …}
815
: 
{id: 1055, at: '58,74', facing: 'S', shape: 'straight', from: 1029, …}
816
: 
{id: 1056, at: '57,74', facing: 'S', shape: 'straight', from: 1029, …}
817
: 
{id: 1057, at: '56,74', facing: 'S', shape: 'straight', from: 1029, …}
818
: 
{id: 1059, at: '55,69', facing: 'S', shape: 'straight', from: 1020, …}
819
: 
{id: 1060, at: '54,69', facing: 'S', shape: 'straight', from: 1020, …}
820
: 
{id: 1061, at: '53,69', facing: 'S', shape: 'straight', from: 1020, …}
821
: 
{id: 1062, at: '52,69', facing: 'S', shape: 'straight', from: 1020, …}
822
: 
{id: 1063, at: '51,69', facing: 'S', shape: 'straight', from: 1020, …}
823
: 
{id: 1065, at: '54,74', facing: 'N', shape: 'corner', from: 1029, …}
824
: 
{id: 1066, at: '54,71', facing: 'S', shape: 'corner', from: 1029, …}
825
: 
{id: 1068, at: '52,71', facing: 'S', shape: 'straight', from: 1029, …}
826
: 
{id: 1069, at: '51,71', facing: 'S', shape: 'straight', from: 1029, …}
827
: 
{id: 1070, at: '49,70', facing: 'S', shape: 'straight', from: 1064, …}
828
: 
{id: 1071, at: '48,70', facing: 'S', shape: 'straight', from: 1064, …}
829
: 
{id: 1072, at: '47,70', facing: 'S', shape: 'straight', from: 1064, …}
830
: 
{id: 1073, at: '46,70', facing: 'S', shape: 'straight', from: 1064, …}
831
: 
{id: 1074, at: '45,70', facing: 'S', shape: 'straight', from: 1064, …}
832
: 
{id: 1075, at: '44,70', facing: 'S', shape: 'straight', from: 1064, …}
833
: 
{id: 1076, at: '43,70', facing: 'S', shape: 'straight', from: 1064, …}
834
: 
{id: 1077, at: '42,70', facing: 'S', shape: 'straight', from: 1064, …}
835
: 
{id: 1078, at: '41,70', facing: 'S', shape: 'straight', from: 1064, …}
836
: 
{id: 1079, at: '40,70', facing: 'S', shape: 'straight', from: 1064, …}
837
: 
{id: 1080, at: '39,70', facing: 'S', shape: 'straight', from: 1064, …}
838
: 
{id: 1081, at: '37,70', facing: 'E', shape: 'corner', from: 1064, …}
839
: 
{id: 1083, at: '37,74', facing: 'W', shape: 'corner', from: 1064, …}
840
: 
{id: 1084, at: '37,72', facing: 'E', shape: 'straight', from: 1064, …}
841
: 
{id: 1085, at: '35,74', facing: 'S', shape: 'straight', from: 1064, …}
842
: 
{id: 1086, at: '34,74', facing: 'S', shape: 'straight', from: 1064, …}
843
: 
{id: 1087, at: '33,74', facing: 'S', shape: 'straight', from: 1064, …}
844
: 
{id: 1088, at: '32,74', facing: 'S', shape: 'straight', from: 1064, …}
845
: 
{id: 1089, at: '31,74', facing: 'S', shape: 'straight', from: 1064, …}
846
: 
{id: 1090, at: '30,74', facing: 'S', shape: 'straight', from: 1064, …}
847
: 
{id: 1091, at: '29,74', facing: 'S', shape: 'straight', from: 1064, …}
848
: 
{id: 1092, at: '28,74', facing: 'S', shape: 'straight', from: 1064, …}
849
: 
{id: 1093, at: '27,74', facing: 'S', shape: 'straight', from: 1064, …}
850
: 
{id: 1094, at: '18,64', facing: 'W', shape: 'corner', from: 948, …}
851
: 
{id: 1095, at: '18,60', facing: 'E', shape: 'corner', from: 948, …}
852
: 
{id: 1096, at: '18,62', facing: 'W', shape: 'straight', from: 948, …}
853
: 
{id: 1097, at: '17,71', facing: 'W', shape: 'corner', from: 936, …}
854
: 
{id: 1098, at: '17,69', facing: 'W', shape: 'straight', from: 936, …}
855
: 
{id: 1099, at: '17,68', facing: 'W', shape: 'straight', from: 936, …}
856
: 
{id: 1100, at: '17,66', facing: 'E', shape: 'corner', from: 936, …}
857
: 
{id: 1101, at: '20,66', facing: 'W', shape: 'corner', from: 936, …}
858
: 
{id: 1102, at: '20,64', facing: 'W', shape: 'straight', from: 936, …}
859
: 
{id: 1103, at: '20,62', facing: 'E', shape: 'corner', from: 936, …}
860
: 
{id: 1104, at: '20,60', facing: 'N', shape: 'straight', from: 948, …}
861
: 
{id: 1105, at: '21,60', facing: 'N', shape: 'straight', from: 948, …}
862
: 
{id: 1110, at: '26,74', facing: 'S', shape: 'straight', from: 1064, …}
863
: 
{id: 1115, at: '24,61', facing: 'S', shape: 'corner', from: 1106, …}
864
: 
{id: 1116, at: '24,63', facing: 'E', shape: 'straight', from: 1106, …}
865
: 
{id: 1117, at: '24,64', facing: 'E', shape: 'straight', from: 1106, …}
866
: 
{id: 1118, at: '24,65', facing: 'E', shape: 'straight', from: 1106, …}
867
: 
{id: 1119, at: '24,66', facing: 'E', shape: 'straight', from: 1106, …}
868
: 
{id: 1120, at: '24,67', facing: 'E', shape: 'straight', from: 1106, …}
869
: 
{id: 1121, at: '24,74', facing: 'N', shape: 'corner', from: 1064, …}
870
: 
{id: 1122, at: '24,72', facing: 'W', shape: 'straight', from: 1064, …}
871
: 
{id: 1123, at: '24,71', facing: 'W', shape: 'straight', from: 1064, …}
length
: 
872`

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
