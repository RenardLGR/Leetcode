const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//======================================================
// https://leetcode.com/problems/permutation-sequence/
// The set [1, 2, 3, ..., n] contains a total of n! unique permutations.

// By listing and labeling all of the permutations in order, we get the following sequence for n = 3:

// "123"
// "132"
// "213"
// "231"
// "312"
// "321"
// Given n and k, return the kth permutation sequence.

// Example 1:
// Input: n = 3, k = 3
// Output: "213"

// Example 2:
// Input: n = 4, k = 9
// Output: "2314"

// Example 3:
// Input: n = 3, k = 1
// Output: "123"

// Constraints:

// 1 <= n <= 9
// 1 <= k <= n!

//Very naive approach : build every permutations and select the right one

//This function gives all permutations of the set [1, 2, 3, ..., n]
function permutations(n){
    let res = []
    solve([], [...Array(n+1).keys()].slice(1)) // build [1, 2, 3, ..., n]
    return res
    
    function solve(inP, remaining){
        if(remaining.length === 0){
            res.push(inP.slice())
            return
        }

        for(let i=0 ; i<remaining.length ; i++){
            let newRemaining = remaining.slice(0, i).concat(remaining.slice(i+1))
            solve([...inP, remaining[i]] , newRemaining)
            // let newRemaining = remaining.slice()
            // let cur = newRemaining.splice(i,1)
            // solve(inP.concat(cur) , newRemaining)
        }
    }
}

// console.log(permutations(3))
// console.log(permutations(4))


var getPermutation = function(n, k) {
    const perms = permutations(n)
    return perms[k-1].join("")
}

// console.log(getPermutation(4, 9)) // "2314"
// console.log(getPermutation(4, 6)) // "1432"
// console.log(getPermutation(8, 77)) // "12374856"

// There are n! permutations, the first (n-1)! permutations will start with 1, the second (n-1)! permutations will start with 2, etc.
// Furthermore, inside the first (n-1)! permutations, (n-2)! permutations will start with [1,2,...] and (n-2)! permutations will start with [1,3,...]
// Understanding that, considering the set [1, 2, 3, ..., n] , idx = Math.floor(k / (n-1)!) gives the index of the first number
// We can repeat this process with the set being the previous set minus the number previously found and k' = k - idx*Math.floor(k / (n-1)!) and idx' = Math.floor(k' / (n-2)!)

function getPermutationBis(n, k){
    k--

    let set = [...Array(n+1).keys()].slice(1)
    let res = ""
    while(k > 0){
        let idx = Math.floor(k / factorial(set.length-1))
        let curr = set.splice(Math.floor(k / factorial(set.length-1)) , 1)
        res += curr
        k -= idx*factorial(set.length) //the length was reduced by one two lines above
    }

    return res + set.reduce((acc, cur) => acc+cur, '')

    function factorial(n){
        if(n <= 1) return 1

        return n * factorial(n-1)
    }
}

// console.log(getPermutationBis(4, 9)) // "2314"
// console.log(getPermutationBis(4, 6)) // "1432"
// console.log(getPermutationBis(8, 77)) // "12374856"
// console.log(getPermutationBis(8, 1)) // "12345678"


//Same than above, clearer
function getPermutationTer(n, k){
    k--

    let set = [...Array(n+1).keys()].slice(1)
    let res = ""
    while(k > 0){
        const idx = Math.floor(k / factorial(set.length-1))
        k -= idx*factorial(set.length-1)
        res += set.splice(idx , 1)
    }

    return res + set.reduce((acc, cur) => acc+cur, '')

    function factorial(n){
        if(n <= 1) return 1

        return n * factorial(n-1)
    }
}

// console.log(getPermutationTer(4, 9)) // "2314"
// console.log(getPermutationTer(4, 6)) // "1432"
// console.log(getPermutationTer(8, 77)) // "12374856"
// console.log(getPermutationTer(8, 1)) // "12345678"

//Same than above, shaving seconds with factorial (and set) implementation
function getPermutationQuater(n, k){
    let set = []
    let factorials = {0:1}

    for(let i=1 ; i<=n ; i++){
        factorials[i] = i * factorials[i-1]
        set.push(i)
    }

    k--
    let res = ""
    while(k > 0){
        const idx = Math.floor(k / factorials[set.length-1])
        k -= idx*factorials[set.length-1]
        res += set.splice(idx , 1)
    }

    return res + set.reduce((acc, cur) => acc+cur, '')
}

// console.log(getPermutationQuater(4, 9)) // "2314"
// console.log(getPermutationQuater(4, 6)) // "1432"
// console.log(getPermutationQuater(8, 77)) // "12374856"
// console.log(getPermutationQuater(8, 1)) // "12345678"

//===============================================
// https://leetcode.com/problems/rotate-list/
// Given the head of a linked list, rotate the list to the right by k places.

// Example 1:
// Input: head = [1,2,3,4,5], k = 2
// Output: [4,5,1,2,3]

// Example 2:
// Input: head = [0,1,2], k = 4
// Output: [2,0,1]

// Constraints:
// The number of nodes in the list is in the range [0, 500].
// -100 <= Node.val <= 100
// 0 <= k <= 2 * 109

// Considering k can be up to 2x10^6 times bigger than the length of the list, it is interesting to find the length of the list first to avoid repetition
// Naive approach, rotate the list by one, repeat as much as needed
var rotateRight = function(head, k) {
    if(!head) return head // empty list case
    if(!head.next) return head // one node case

    let listLen = 1
    let pointer = head
    while(pointer.next){
        listLen++
        pointer = pointer.next
    }

    k = k%listLen
    for(let i=0 ; i<k ; i++){
        head = rotateOne(head)
    }

    return head

    function rotateOne(head){
        if(!head) return head // empty list case
        if(!head.next) return head // one node case

        let prev = head
        let cur = head
        cur = head.next

        while(cur.next){
            prev = prev.next
            cur = cur.next
        }
        //At this point cur is the last node and prev is the penultimate node
        prev.next = null
        cur.next = head
        return cur
    }
    const list1 = {val:1, next:{val:2, next:{val:3, next:{val:4, next:{val:5, next:null}}}}}
    // console.log(JSON.stringify(rotateOne(list1))) // 5,1,2,3,4
}

// console.log(JSON.stringify(rotateRight({val:1, next:{val:2, next:{val:3, next:{val:4, next:{val:5, next:null}}}}} , 2))) // 4,5,1,2,3
// console.log(JSON.stringify(rotateRight({val:1, next:{val:2, next:{val:3, next:{val:4, next:{val:5, next:null}}}}} , 4))) // 2,3,4,5,1
// console.log(JSON.stringify(rotateRight({val:1, next:{val:2, next:{val:3, next:{val:4, next:{val:5, next:null}}}}} , 5))) // 1,2,3,4,5

// Good runtime

// Having a list of length n, we want the k-last nodes to be put in front (k modulus n, ofc)
// Example : list [1,2,3,4,5,6], k = 4
// The k-last elements are [3,4,5,6] and the result should be [3,4,5,6,1,2]
// We will have two pointers, one current and one k steps ahead, once the latter reaches the end, we will know the current one contains the k-last elements 
function rotateRightBis(head, k){
    if(!head) return head // empty list case
    if(!head.next) return head // one node case

    let listLen = 1
    let pointer = head
    while(pointer.next){
        listLen++
        pointer = pointer.next
    }

    k = k%listLen
    if(k===0) return head // rotating as much as number of elements gives the same result

    let cur = head
    let kAhead = head
    for(let i=0 ; i<k ; i++){
        kAhead = kAhead.next
    }

    while(kAhead.next){
        cur = cur.next
        kAhead = kAhead.next
    }
    // At this point we have [head, cur][cur.next, kAhead]
    // And we want [cur.next, kAhead][head, cur]
    let res = cur.next
    cur.next = null
    kAhead.next = head
    return res
}

// console.log(JSON.stringify(rotateRightBis({val:1, next:{val:2, next:{val:3, next:{val:4, next:{val:5, next:null}}}}} , 2))) // 4,5,1,2,3
// console.log(JSON.stringify(rotateRightBis({val:1, next:{val:2, next:{val:3, next:{val:4, next:{val:5, next:null}}}}} , 4))) // 2,3,4,5,1
// console.log(JSON.stringify(rotateRightBis({val:1, next:{val:2, next:{val:3, next:{val:4, next:{val:5, next:null}}}}} , 5))) // 1,2,3,4,5
// console.log(JSON.stringify(rotateRightBis({val:1, next:{val:2, next:{val:3, next:{val:4, next:{val:5, next:{val:6, next:null}}}}}} , 4))) // 3,4,5,6,1,2

// Shaving one variable at the end
function rotateRightTer(head, k){
    if(!head) return head // empty list case
    if(!head.next) return head // one node case

    let listLen = 1
    let pointer = head
    while(pointer.next){
        listLen++
        pointer = pointer.next
    }

    k = k%listLen
    if(k===0) return head // rotating as much as number of elements gives the same result

    let cur = head
    let kAhead = head
    for(let i=0 ; i<k ; i++){
        kAhead = kAhead.next
    }

    while(kAhead.next){
        cur = cur.next
        kAhead = kAhead.next
    }
    // At this point we have [head, cur][cur.next, kAhead]
    // And we want [cur.next, kAhead][head, cur]
    kAhead.next = head
    head = cur.next
    cur.next = null
    return head
}

// console.log(JSON.stringify(rotateRightTer({val:1, next:{val:2, next:{val:3, next:{val:4, next:{val:5, next:null}}}}} , 2))) // 4,5,1,2,3
// console.log(JSON.stringify(rotateRightTer({val:1, next:{val:2, next:{val:3, next:{val:4, next:{val:5, next:null}}}}} , 4))) // 2,3,4,5,1
// console.log(JSON.stringify(rotateRightTer({val:1, next:{val:2, next:{val:3, next:{val:4, next:{val:5, next:null}}}}} , 5))) // 1,2,3,4,5
// console.log(JSON.stringify(rotateRightTer({val:1, next:{val:2, next:{val:3, next:{val:4, next:{val:5, next:{val:6, next:null}}}}}} , 4))) // 3,4,5,6,1,2

// Good runtime

//=============================================
// https://leetcode.com/problems/unique-paths/
// There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

// Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

// The test cases are generated so that the answer will be less than or equal to 2 * 109.

// Example 1:
// Input: m = 3, n = 7
// Output: 28

// Example 2:
// Input: m = 3, n = 2
// Output: 3
// Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
// 1. Right -> Down -> Down
// 2. Down -> Down -> Right
// 3. Down -> Right -> Down

// Constraints:
// 1 <= m, n <= 100

// Naive : Try every path, count them
var uniquePaths = function(m, n) {
    let res = 0
    solve([0,0])
    return res

    function solve(pos){
        const [row, col] = pos

        if(row===m-1 && col===n-1){
            res++
            return
        }

        if(row < m-1){
            solve([row+1, col])
        }
        if(col < n-1){
            solve([row, col+1])
        }
    }
}

// console.log(uniquePaths(3, 7)) // 28
// console.log(uniquePaths(3, 2)) // 3
// console.log(uniquePaths(2, 2)) // 2
// console.log(uniquePaths(1, 2)) // 1
// console.log(uniquePaths(1, 1)) // 1
// console.log(uniquePaths(3, 5)) // 1

// Too long

// The idea is to build a 2D array to store the number of unique paths to reach each cell. The number of unique paths to reach the cell (i, j) is the sum of the paths to the cell above (i-1, j) and the cell to the left (i, j-1).
// Example with m=3 and n=7 :
// [s, 1, 1, 1, 1, 1, 1]
// [1, 2, 3, 4, 5, 6, 7]
// [1, 3, 6, 10, 15, 21, 28]
function uniquePathsBis(m, n){
    let grid = Array.from({length:m}, ()=>Array(n))

    // Initialize the top row and left column to 1 since there is only one way to reach each cell in the first row and column
    for (let i=0 ; i<m ; i++) {
        grid[i][0] = 1
    }
    for (let j=0 ; j<n ; j++) {
        grid[0][j] = 1
    }

    // Summ the paths from cell above and to the left
    for(let i=1 ; i<m ; i++){
        for(let j=1 ; j<n ; j++){
            grid[i][j] = grid[i-1][j] + grid[i][j-1]
        }
    }

    // The result is stored in the bottom-right cell
    return grid[m - 1][n - 1]
}

// console.log(uniquePathsBis(3, 7)) // 28
// console.log(uniquePathsBis(3, 2)) // 3
// console.log(uniquePathsBis(2, 2)) // 2
// console.log(uniquePathsBis(1, 2)) // 1
// console.log(uniquePathsBis(1, 1)) // 1
// console.log(uniquePathsBis(3, 5)) // 15

// From : https://leetcode.com/problems/unique-paths/solutions/3994523/98-83-easy-dp-math/
// The number of unique paths can be seen as the number of ways to choose m−1 downs and n−1 rights, regardless of the order. In combinatorial terms, this is equivalent to m-1 choose m+n-2

function uniquePathsTer(m, n){
    return binom(m+n-2, m-1)

    function binom(n, k){
        return factorial(n) / (factorial(k) * factorial(n-k))
    }

    function factorial(n){
        if(n <= 1) return 1

        return n * factorial(n-1)
    }
}

// console.log(uniquePathsTer(3, 7)) // 28
// console.log(uniquePathsTer(3, 2)) // 3
// console.log(uniquePathsTer(2, 2)) // 2
// console.log(uniquePathsTer(1, 2)) // 1
// console.log(uniquePathsTer(1, 1)) // 1
// console.log(uniquePathsTer(3, 5)) // 15

//====================================
// https://leetcode.com/problems/unique-paths-ii/
// You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

// An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.

// Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

// The testcases are generated so that the answer will be less than or equal to 2 * 10^9.

// Example 1:
// Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
// Output: 2
// Explanation: There is one obstacle in the middle of the 3x3 grid above.
// There are two ways to reach the bottom-right corner:
// 1. Right -> Right -> Down -> Down
// 2. Down -> Down -> Right -> Right

// Example 2:
// Input: obstacleGrid = [[0,1],[0,0]]
// Output: 1

// Constraints:
// m == obstacleGrid.length
// n == obstacleGrid[i].length
// 1 <= m, n <= 100
// obstacleGrid[i][j] is 0 or 1.

// Same approach than the previous problem

var uniquePathsWithObstacles = function(obstacleGrid) {
    const m = obstacleGrid.length // number of rows
    const n = obstacleGrid[0].length // number of cols

    if(obstacleGrid[m-1][n-1] === 1) return 0 // edge case obstacle on bottom-right corner

    // Replace every obstacle with a "*"
    for(let i=0 ; i<m ; i++){
        for(let j=0 ; j<n ; j++){
            if(obstacleGrid[i][j]===1) obstacleGrid[i][j]='*'
        }
    }

    // Initialize first row and first col with 1 if possible
    for(let i=0 ; i<n ; i++){
        if(obstacleGrid[0][i] === '*') break
        obstacleGrid[0][i] = 1
    }

    for(let i=0 ; i<m ; i++){
        if(obstacleGrid[i][0] === '*') break
        obstacleGrid[i][0] = 1
    }

    // Summ the paths from cell above and to the left
    for(let i=1 ; i<m ; i++){
        for(let j=1 ; j<n ; j++){
            if(obstacleGrid[i][j] === '*') continue

            let top = obstacleGrid[i-1][j] === '*' ? 0 : obstacleGrid[i-1][j]
            let left = obstacleGrid[i][j-1] === '*' ? 0 : obstacleGrid[i][j-1]
            obstacleGrid[i][j] = top+left
        }
    }

    return obstacleGrid[m-1][n-1]
}

// console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]])) // 2
// console.log(uniquePathsWithObstacles([[0,1],[0,0]])) // 1
// console.log(uniquePathsWithObstacles([[0,0],[0,1]])) // 0

// Could better on runtime

// We can skip the first run through the matrix converting 1s to *s by using negative numbers
function uniquePathsWithObstaclesBis(obstacleGrid){
    const m = obstacleGrid.length // number of rows
    const n = obstacleGrid[0].length // number of cols

    if(obstacleGrid[m-1][n-1] === 1) return 0 // edge case obstacle on bottom-right corner

    // Initialize first row and first col with -1 if possible
    for(let i=0 ; i<n ; i++){
        if(obstacleGrid[0][i] === 1) break
        obstacleGrid[0][i] = -1
    }

    for(let i=0 ; i<m ; i++){
        if(obstacleGrid[i][0] === 1) break
        obstacleGrid[i][0] = -1
    }

    // Summ the paths from cell above and to the left
    for(let i=1 ; i<m ; i++){
        for(let j=1 ; j<n ; j++){
            if(obstacleGrid[i][j] === 1) continue

            let top = obstacleGrid[i-1][j] === 1 ? 0 : obstacleGrid[i-1][j]
            let left = obstacleGrid[i][j-1] === 1 ? 0 : obstacleGrid[i][j-1]
            obstacleGrid[i][j] = top+left
        }
    }

    return -obstacleGrid[m-1][n-1]
}

//========================================
// https://leetcode.com/problems/minimum-path-sum/
// Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

// Note: You can only move either down or right at any point in time.

// Example 1:
// Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
// Output: 7
// Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.

// Example 2:
// Input: grid = [[1,2,3],[4,5,6]]
// Output: 12

// Constraints:
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 200
// 0 <= grid[i][j] <= 200


// In the matrix dp, we will keep track of the minimum sum possible to access this cell dp[i][j] which is equal to Math.min(cellAbove, cellLeft) + grid[i][j]
var minPathSum = function(grid) {
    const m = grid.length // number of rows
    const n = grid[0].length // number of cols
    let dp = Array.from({length:m}, ()=>Array(n))
    dp[0][0] = grid[0][0]

    // Initialize the first row, it is grid[0][i] + the cell on the left
    for(let i=1 ; i<n ; i++){
        dp[0][i] = dp[0][i-1] + grid[0][i]
    }

    // Initialize the first col, it is grid[i][0] + the cell above
    for(let i=1 ; i<m ; i++){
        dp[i][0] = dp[i-1][0] + grid[i][0]
    }

    // Keep the minimum between the cell above and the cell on the left
    for(let i=1 ; i<m ; i++){
        for(let j=1 ; j<n ; j++){
            dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
        }
    }

    return dp[m-1][n-1]
}

// console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]])) // 7
// console.log(minPathSum([[1,2,3],[4,5,6]])) // 12

// No need for an extra matrix
var minPathSumBis = function(grid) {
    const m = grid.length // number of rows
    const n = grid[0].length // number of cols

    // Initialize the first row, it is grid[0][i] + the cell on the left
    for(let i=1 ; i<n ; i++){
        grid[0][i] += grid[0][i-1]
    }

    // Initialize the first col, it is grid[i][0] + the cell above
    for(let i=1 ; i<m ; i++){
        grid[i][0] += grid[i-1][0]
    }

    // Keep the minimum between the cell above and the cell on the left
    for(let i=1 ; i<m ; i++){
        for(let j=1 ; j<n ; j++){
            grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1])
        }
    }

    return grid[m-1][n-1]
}

// console.log(minPathSumBis([[1,3,1],[1,5,1],[4,2,1]])) // 7
// console.log(minPathSumBis([[1,2,3],[4,5,6]])) // 12

//=======================================
// https://leetcode.com/problems/valid-number/
// A valid number can be split up into these components (in order):

// A decimal number or an integer.
// (Optional) An 'e' or 'E', followed by an integer.
// A decimal number can be split up into these components (in order):

// (Optional) A sign character (either '+' or '-').
// One of the following formats:
// One or more digits, followed by a dot '.'.
// One or more digits, followed by a dot '.', followed by one or more digits.
// A dot '.', followed by one or more digits.
// An integer can be split up into these components (in order):

// (Optional) A sign character (either '+' or '-').
// One or more digits.
// For example, all the following are valid numbers: ["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"], while the following are not valid numbers: ["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"].

// Given a string s, return true if s is a valid number.


// Example 1:
// Input: s = "0"
// Output: true

// Example 2:
// Input: s = "e"
// Output: false

// Example 3:
// Input: s = "."
// Output: false

// Constraints:
// 1 <= s.length <= 20
// s consists of only English letters (both uppercase and lowercase), digits (0-9), plus '+', minus '-', or dot '.'.


// Got bored trying to solve every debatable edge cases.
// From : https://leetcode.com/problems/valid-number/solutions/1209315/js-python-java-c-easy-character-conditional-solution-w-explanation/

// To solve this problem, we should should just make a list of the possible error conditions and then check for each one.

// The error conditions are:

// More than one exponent character ('e'/'E'), or seeing an 'e'/'E' when a number has not yet been seen.
// More than one sign, or a sign appearing after a decimal or number have been seen. This gets reset when passing an 'e'/'E'.
// More than one decimal, or a decimal appearing after an 'e'/'E' has been seen.
// Any other non-number character appearing.
// Reaching the end of S without an active number.
// To help with this process, we can set up some boolean flags for the different things of which we're keeping track (num, exp, sign, dec). We'll also need to remember to reset all flags except exp when we find an 'e'/'E', as we're starting a new integer expression

var isNumber = function(S) {
    let exp = false, sign = false, num = false, dec = false
    for (let c of S)
        if (c >= '0' && c <= '9') num = true     
        else if (c === 'e' || c === 'E')
            if (exp || !num) return false
            else exp = true, sign = false, num = false, dec = false
        else if (c === '+' || c === '-')
            if (sign || num || dec) return false
            else sign = true
        else if (c === '.')
            if (dec || exp) return false
            else dec = true
        else return false
    return num
}

//========================================
// https://leetcode.com/problems/plus-one/
// You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

// Increment the large integer by one and return the resulting array of digits.


// Example 1:
// Input: digits = [1,2,3]
// Output: [1,2,4]
// Explanation: The array represents the integer 123.
// Incrementing by one gives 123 + 1 = 124.
// Thus, the result should be [1,2,4].

// Example 2:
// Input: digits = [4,3,2,1]
// Output: [4,3,2,2]
// Explanation: The array represents the integer 4321.
// Incrementing by one gives 4321 + 1 = 4322.
// Thus, the result should be [4,3,2,2].

// Example 3:
// Input: digits = [9]
// Output: [1,0]
// Explanation: The array represents the integer 9.
// Incrementing by one gives 9 + 1 = 10.
// Thus, the result should be [1,0].

// Constraints:
// 1 <= digits.length <= 100
// 0 <= digits[i] <= 9
// digits does not contain any leading 0's.

var plusOne = function(digits) {
    let carry = false
    let i = digits.length - 1

    do {
        digits[i] = (digits[i] + 1) % 10
        carry = (digits[i] === 0)
        i--
    } while(carry && i>=0)

    if(carry) digits.unshift(1)

    return digits
}

// console.log(plusOne([0])) // [1]
// console.log(plusOne([9])) // [1,0]
// console.log(plusOne([4,3,2,1])) // [4,3,2,2]
// console.log(plusOne([9,9,9,9])) // [1,0,0,0,0]

// Excellent runtime

//========================================
// https://leetcode.com/problems/add-binary/
// Given two binary strings a and b, return their sum as a binary string.

// Example 1:
// Input: a = "11", b = "1"
// Output: "100"

// Example 2:
// Input: a = "1010", b = "1011"
// Output: "10101"

// Constraints:
// 1 <= a.length, b.length <= 104
// a and b consist only of '0' or '1' characters.
// Each string does not contain leading zeros except for the zero itself.


var addBinary = function(a, b) {
    let res = ""
    let i = 0
    let carry = 0

    while(a[a.length-1-i]!==undefined || b[b.length-1-i]!==undefined){
        let sum = +(a[a.length-1-i] || 0) + +(b[b.length-1-i] || 0) + carry
        carry = (sum >= 2) ? 1 : 0
        res = (sum%2) + res
        i++
    }

    if(carry) res = 1 + res
    return "" + res
}

// console.log(addBinary("11", "1")) // "100"
// console.log(addBinary("1010", "1011")) // "10101"
// console.log(addBinary("1111", "1111")) // "11110"


// Skip last check
var addBinaryBis = function(a, b) {
    let res = ""
    let i = 0
    let carry = 0

    while(a[a.length-1-i]!==undefined || b[b.length-1-i]!==undefined || carry){
        let sum = +(a[a.length-1-i] || 0) + +(b[b.length-1-i] || 0) + carry
        carry = (sum >= 2) ? 1 : 0
        res = (sum%2) + res
        i++
    }

    return "" + res
}

// console.log(addBinaryBis("11", "1")) // "100"
// console.log(addBinaryBis("1010", "1011")) // "10101"
// console.log(addBinaryBis("1111", "1111")) // "11110"

// Full adder inspiration : 
// There are 3 inputs, a, b and carry (order doesn't matter), 110 leads to 0 and carry=1 ; 111 leads to 1 and carry=1 ; 100 and 000 are easy 
function addBinaryTer(a, b){
    let res = ""
    let i = 0
    let carry = 0

    while(a[a.length-1-i]!==undefined || b[b.length-1-i]!==undefined || carry){
        res = (a[a.length-1-i] ^ b[b.length-1-i] ^ carry) + res
        carry = (a[a.length-1-i] & b[b.length-1-i]) | ( (a[a.length-1-i] ^ b[b.length-1-i])  & carry)
        // carry = (a[a.length-1-i] & b[b.length-1-i]) | (a[a.length-1-i] & carry) | (b[b.length-1-i] & carry)
        i++
    }

    return res
}

// console.log(addBinaryTer("11", "1")) // "100"
// console.log(addBinaryTer("1010", "1011")) // "10101"
// console.log(addBinaryTer("1111", "1111")) // "11110"

//=============================
// https://leetcode.com/problems/text-justification/
// Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

// You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

// Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

// For the last line of text, it should be left-justified, and no extra space is inserted between words.

// Note:
// A word is defined as a character sequence consisting of non-space characters only.
// Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
// The input array words contains at least one word.


// Example 1:
// Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
// Output:
// [
//    "This    is    an",
//    "example  of text",
//    "justification.  "
// ]

// Example 2:
// Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
// Output:
// [
//   "What   must   be",
//   "acknowledgment  ",
//   "shall be        "
// ]
// Explanation: Note that the last line is "shall be    " instead of "shall     be", because the last line must be left-justified instead of fully-justified.
// Note that the second line is also left-justified because it contains only one word.

// Example 3:
// Input: words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], maxWidth = 20
// Output:
// [
//   "Science  is  what we",
//   "understand      well",
//   "enough to explain to",
//   "a  computer.  Art is",
//   "everything  else  we",
//   "do                  "
// ]

// Constraints:
// 1 <= words.length <= 300
// 1 <= words[i].length <= 20
// words[i] consists of only English letters and symbols.
// 1 <= maxWidth <= 100
// words[i].length <= maxWidth

var fullJustify = function(words, maxWidth) {
    let res = []
    let currLine = []
    let currLineLen = 0 // (spaces ignored here)

    while(words.length){
        // If adding a word, and considering the single space between each word, would make the line too long, then the line is complete
        if(words[0].length + currLineLen + currLine.length > maxWidth){
            let line = ""
            //One word line is just the word and spaces until the line is complete, more tha one word line is trickier
            if(currLine.length !== 1){
                // Let's say I have 7 spaces and 6 word (so 5 spots in between word to put spaces in), my distribution should be : 2,2,1,1,1
                // To do so, we will take the ceil of the division availableSpaces / (number of spots still available to put spaces in)
                let availableSpaces = maxWidth - currLineLen
                for(let i=0 ; i<currLine.length-1 ; i++){
                    let spacesToAdd = Math.ceil(availableSpaces / (currLine.length-1-i) )
                    currLine[i] += ' '.repeat(spacesToAdd)
                    availableSpaces -= spacesToAdd
                }
                line = currLine.join('')
            }else{
                line = currLine[0]
                // Complete the line with spaces 
                while(line.length < maxWidth) line += ' '
            }
            res.push(line)
            currLine = []
            currLineLen = 0
        }
        // Add word to the line
        else{
            currLine.push(words[0])
            currLineLen += words[0].length
            words.shift()
        }
    }

    //Last line :
    let line = currLine.join(' ')
    while(line.length < maxWidth) line += ' '
    res.push(line)

    return res
}

// console.log(fullJustify(["This", "is", "an", "example", "of", "text", "justification."], 16))
// [
//     "This    is    an",
//     "example  of text",
//     "justification.  "
// ]

// console.log(fullJustify(["What","must","be","acknowledgment","shall","be"], 16))
// [
//     "What   must   be",
//     "acknowledgment  ",
//     "shall be        "
// ]

// console.log(fullJustify(["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], 20))
// [
//     "Science  is  what we",
//     "understand      well",
//     "enough to explain to",
//     "a  computer.  Art is",
//     "everything  else  we",
//     "do                  "
// ]

//===========================================
// https://leetcode.com/problems/sqrtx/
// Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.

// You must not use any built-in exponent function or operator.

// For example, do not use pow(x, 0.5) in c++ or x ** 0.5 in python. 

// Example 1:
// Input: x = 4
// Output: 2
// Explanation: The square root of 4 is 2, so we return 2.

// Example 2:
// Input: x = 8
// Output: 2
// Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.

// Constraints:
// 0 <= x <= 231 - 1


//Naive : square very number until n**2 >= x
var mySqrt = function(x) {
    let res = 0
    while(res * res < x){
        res++
    }
    if(res * res === x) return res
    return res - 1
}

// console.log(mySqrt(0)) // 0
// console.log(mySqrt(1)) // 1
// console.log(mySqrt(2)) // 1
// console.log(mySqrt(8)) // 2
// console.log(mySqrt(16)) // 4

// Obviously the runtime can be better


// Knowing how many digits n there is in x, we cn conclude sqrt(x) has ceil(n/2) digits
// Example : sqrt(10000) = 100 and sqrt(99999) ~= 316 so for a 5 digits x, sqrt(x) has ceil(n/2) digits
// Having a good idea where sqrt(x) is, we will then do a dichotomy
function mySqrtBis(x){
    if(x === 0) return 0
    const lenX = (''+x).length
    let left = Math.pow(10, Math.ceil(lenX/2)-1)
    let right = Math.pow(10, Math.ceil(lenX/2)+1)

    while(right-left > 1){
        let middle = Math.ceil((right+left)/2)
        if(middle*middle > x){
            right = middle
        }else{
            left = middle
        }
    }

    return left
}

// console.log(mySqrtBis(0)) // 0
// console.log(mySqrtBis(1)) // 1
// console.log(mySqrtBis(2)) // 1
// console.log(mySqrtBis(8)) // 2
// console.log(mySqrtBis(16)) // 4
// console.log(mySqrtBis(200)) // 14
// console.log(mySqrtBis(255025)) // 505

// Good runtime