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