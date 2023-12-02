const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//======================================================
// https://leetcode.com/problems/jump-game/
// You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

// Return true if you can reach the last index, or false otherwise.

// Example 1:
// Input: nums = [2,3,1,1,4]
// Output: true
// Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

// Example 2:
// Input: nums = [3,2,1,0,4]
// Output: false
// Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.

// Constraints:
// 1 <= nums.length <= 104
// 0 <= nums[i] <= 105

var canJump = function(nums) {
    let pos = 0

    while(pos < nums.length-1){
        let optimalTarget = [pos, pos] //[newPos, maxPos] ; i.e. if I go to newPos, I will be able to reach maxPos (and anything between newPos and maxPos, ofc)
        for(let jump=1 ; jump<=nums[pos] ; jump++){
            //jump to the position that would allow me to go the farthest
            if(pos + jump + nums[pos+jump] > optimalTarget[1]) optimalTarget = [pos+jump , pos + jump + nums[pos+jump]]
        }
        //Impossible to go any further
        if(optimalTarget[0] === pos) return false
        pos = optimalTarget[0]
    }
    return true
}

// console.log(canJump([2,3,1,1,4])) // true
// console.log(canJump([3,2,1,0,4])) // false

//It works but the runtime could be better.

//Improving the previous function : when choosing the position that would allow me to go the farthest, make sure that we won't revisit some elements ; improvements in readability too
function canJumpBis(nums){
    let pos = 0 //actual pos
    let maxPos = 0 //max reachable pos
    let checkIndx = 0 //We'll start checking positions from this index

    while(maxPos < nums.length-1){
        let optimalTarget = [pos, pos] //[newPos, maxPos] ; i.e. if I go to newPos, I will be able to reach maxPos (and anything between newPos and maxPos, ofc)
        for(let i=checkIndx ; i<=pos+nums[pos] ; i++){
            if(i+nums[i] > optimalTarget[1]) optimalTarget = [i, i+nums[i]]
        }
        checkIndx = pos+nums[pos]
        pos = optimalTarget[0]
        maxPos = optimalTarget[1]
        //Impossible to go any further
        if(maxPos === pos) return false
    }
    return true
}

// console.log(canJumpBis([0])) // true
// console.log(canJumpBis([1])) // true
// console.log(canJumpBis([2,0])) // true
// console.log(canJumpBis([1,2,0,0])) // true
// console.log(canJumpBis([2,3,1,1,4])) // true
// console.log(canJumpBis([3,2,1,0,4])) // false

// Good efficiency


//Focusing on clarity :
function canJumpTer(nums){
    let pos = 0
    let maxPos = 0

    while(maxPos < nums.length-1){
        if(pos+nums[pos] > maxPos) maxPos = pos+nums[pos]

        if(maxPos >= nums.length-1) return true

        if(maxPos <= pos) return false

        pos++
    }

    return true
}

// console.log(canJumpTer([0])) // true
// console.log(canJumpTer([1])) // true
// console.log(canJumpTer([2,0])) // true
// console.log(canJumpTer([1,2,0,0])) // true
// console.log(canJumpTer([2,3,1,1,4])) // true
// console.log(canJumpTer([3,2,1,0,4])) // false


//================================================
// https://leetcode.com/problems/merge-intervals/
// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

// Example 1:
// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

// Example 2:
// Input: intervals = [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 
// Constraints:
// 1 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti <= endi <= 104

var merge = function(intervals) {
    //Build an array the size of the maximum element inside intervals, set its value to true if the index is inside a interval
    //Loop through this newly build array and build the result
    let arr = []
    intervals.forEach(([start, end]) => {
        for(let i=start ; i<=end ; i++){
            arr[i] = true
        }
    })

    let res = []
    let isIntervalFlag = false
    let interval = [] // [start, end]
    for(let i=0 ; i<arr.length ; i++){
        if(!isIntervalFlag && arr[i]){
            isIntervalFlag = true
            interval[0] = i
        }
        if(isIntervalFlag && !arr[i]){
            isIntervalFlag = false
            interval[1] = i-1
            res.push(interval.slice())
        }
    }
    //Don't forget to include the last interval
    if(isIntervalFlag){
        interval[1] = arr.length-1
        res.push(interval.slice())
    }

    return res
}

// console.log(merge([[1,3],[2,6],[8,10],[15,18]])) // [[1,6],[8,10],[15,18]]
// console.log(merge([[1,4],[4,5]])) // [[1,5]]
// console.log(merge([[1,4],[5,6]])) // [[1,4],[5,6]]

//Apparently [[1,4],[5,6]] doesn't overlap making the above solution WRONG 

function mergeV2(intervals){
    //Sort by start
    //If the start of the following interval is included in the current interval, update its end accordingly, else build a new interval
    intervals.sort((a,b) => a[0]-b[0])

    let res = []
    let inProgressInterval = intervals[0].slice() // [start, end]
    for(let i=0 ; i<intervals.length ; i++){
        let [start, end] = intervals[i]
        //the current interval start is inside the interval being built : update the end if necessary
        if(start>= inProgressInterval[0] && start<=inProgressInterval[1]){
            inProgressInterval[1] = Math.max(inProgressInterval[1], end)
        }
        //the current interval start is NOT inside the interval being built : push the previous one and start building a new one
        else{
            res.push(inProgressInterval.slice())
            inProgressInterval = intervals[i].slice()
        }
    }
    //Don't forget to include the last interval
    res.push(inProgressInterval.slice())

    return res
}

// console.log(mergeV2([[1,3],[2,6],[8,10],[15,18]])) // [[1,6],[8,10],[15,18]]
// console.log(mergeV2([[1,4],[4,5]])) // [[1,5]]
// console.log(mergeV2([[1,4],[5,6]])) // [[1,4],[5,6]]
// console.log(mergeV2([[2,5],[1,4],[7,8],[1,9],[5,12]])) // [[1,12]]

// Good efficiency

// Same program with some ms and lines shaving :
function mergeV2Bis(intervals){
    if(!intervals.length) return []
    intervals.sort((a,b) => a[0]-b[0])

    let res = [intervals[0]]
    for(let [start, end] of intervals){
        if(start <= res[res.length-1][1]) res[res.length-1][1] = Math.max(res[res.length-1][1] , end)
        else res.push([start, end])
    }

    return res
}

// console.log(mergeV2Bis([[1,3],[2,6],[8,10],[15,18]])) // [[1,6],[8,10],[15,18]]
// console.log(mergeV2Bis([[1,4],[4,5]])) // [[1,5]]
// console.log(mergeV2Bis([[1,4],[5,6]])) // [[1,4],[5,6]]
// console.log(mergeV2Bis([[2,5],[1,4],[7,8],[1,9],[5,12]])) // [[1,12]]

//====================================
// https://leetcode.com/problems/insert-interval/
// You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

// Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

// Return intervals after the insertion.


// Example 1:
// Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
// Output: [[1,5],[6,9]]

// Example 2:
// Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// Output: [[1,2],[3,10],[12,16]]
// Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

// Constraints:
// 0 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti <= endi <= 105
// intervals is sorted by starti in ascending order.
// newInterval.length == 2
// 0 <= start <= end <= 105

var insert = function(intervals, newInterval) {
    let res = []

    for(let i=0 ; i<intervals.length ; i++){
        let [start, end] = intervals[i]
        //Those are the first elements
        if(end < newInterval[0]) res.push(intervals[i])
        //This is the serious part
        else{
            let toInsert = [Math.min(start, newInterval[0]) , newInterval[1]]
            let j = i
            while(j<intervals.length && intervals[j][0] <= toInsert[1]){
                toInsert[1] = Math.max(toInsert[1] , intervals[j][1]) // This actually updates only for the last j
                j++
            }
            res.push(toInsert)
            res = res.concat(intervals.slice(j)) //Add the remaining elements
            return res
        }
    }
    //This is the case where newInterval should just be appended to the end
    res.push(newInterval)
    return res
}

// console.log(insert([[1,3],[6,9]] , [2,5])) // [[1,5],[6,9]]
// console.log(insert([[1,2],[3,5],[6,7],[8,10],[12,16]] , [4,8])) // [[1,2],[3,10],[12,16]]
// console.log(insert([[1,2],[3,5],[6,7],[8,10],[14,16]] , [12,13])) // [[1,2],[3,5],[6,7],[8,10],[12,13],[14,16]]
// console.log(insert([[1,2],[3,5],[6,7],[8,10],[14,16]] , [15,18])) // [[1,2],[3,5],[6,7],[8,10],[14,18]]
// console.log(insert([[3,5],[6,7],[8,10],[14,16]] , [1,2])) // [[1,2],[3,5],[6,7],[8,10],[14,16]]
// console.log(insert([[3,5],[6,7],[8,10],[14,16]] , [18,20])) // [[3,5],[6,7],[8,10],[14,16],[18,20]]

// Good efficiency

// Very elegant solution :
function insertBis(intervals, newInterval){
    let left = []
    let right = []

    for(let [start, end] of intervals){
        // current interval is smaller than newInterval
        if(end < newInterval[0]) left.push([start, end])

        // current interval is greater than newInterval
        else if(start > newInterval[1]) right.push([start, end])

        // overlapping
        else{
            newInterval[0] = Math.min(newInterval[0] , start)
            newInterval[1] = Math.max(newInterval[1] , end)
        }
    }

    return [...left, newInterval, ...right]
}

// console.log(insertBis([[1,3],[6,9]] , [2,5])) // [[1,5],[6,9]]
// console.log(insertBis([[1,2],[3,5],[6,7],[8,10],[12,16]] , [4,8])) // [[1,2],[3,10],[12,16]]
// console.log(insertBis([[1,2],[3,5],[6,7],[8,10],[14,16]] , [12,13])) // [[1,2],[3,5],[6,7],[8,10],[12,13],[14,16]]
// console.log(insertBis([[1,2],[3,5],[6,7],[8,10],[14,16]] , [15,18])) // [[1,2],[3,5],[6,7],[8,10],[14,18]]
// console.log(insertBis([[3,5],[6,7],[8,10],[14,16]] , [1,2])) // [[1,2],[3,5],[6,7],[8,10],[14,16]]
// console.log(insertBis([[3,5],[6,7],[8,10],[14,16]] , [18,20])) // [[3,5],[6,7],[8,10],[14,16],[18,20]]

//==============================
// https://leetcode.com/problems/length-of-last-word/
// Given a string s consisting of words and spaces, return the length of the last word in the string.
// A word is a maximal substring consisting of non-space characters only.

// Example 1:
// Input: s = "Hello World"
// Output: 5
// Explanation: The last word is "World" with length 5.

// Example 2:
// Input: s = "   fly me   to   the moon  "
// Output: 4
// Explanation: The last word is "moon" with length 4.

// Example 3:
// Input: s = "luffy is still joyboy"
// Output: 6
// Explanation: The last word is "joyboy" with length 6.

// Constraints:
// 1 <= s.length <= 104
// s consists of only English letters and spaces ' '.
// There will be at least one word in s.

var lengthOfLastWord = function(s) {
    let lastWord = ""

    for(let i=s.length-1 ; i>=0 ; i--){
        //skip the trailing spaces
        if(s[i]===" ") continue
        //a word has been found
        else{
            let j = i
            while(j>=0 && s[j]!==" "){
                lastWord = s[j] + lastWord
                j--
            }
            return lastWord.length
        }
    }
}

// console.log(lengthOfLastWord("Hello World")) // 5
// console.log(lengthOfLastWord("     Hellooo    ")) // 7
// console.log(lengthOfLastWord("Helloo    ")) // 6
// console.log(lengthOfLastWord("   fly me   to   the moon  ")) // 4
// console.log(lengthOfLastWord("luffy is still joyboy")) // 6

function lengthOfLastWordBis(s){
    const words = s.trim().split(' ')
    return words[words.length-1].length
}

// console.log(lengthOfLastWordBis("Hello World")) // 5
// console.log(lengthOfLastWordBis("     Hellooo    ")) // 7
// console.log(lengthOfLastWordBis("Helloo    ")) // 6
// console.log(lengthOfLastWordBis("   fly me   to   the moon  ")) // 4
// console.log(lengthOfLastWordBis("luffy is still joyboy")) // 6

function lengthOfLastWordTer(s){
    return s.trim().split(' ').pop().length
}

// console.log(lengthOfLastWordTer("Hello World")) // 5
// console.log(lengthOfLastWordTer("     Hellooo    ")) // 7
// console.log(lengthOfLastWordTer("Helloo    ")) // 6
// console.log(lengthOfLastWordTer("   fly me   to   the moon  ")) // 4
// console.log(lengthOfLastWordTer("luffy is still joyboy")) // 6

//Beats 98% :O - built in methods are lightning fast

function lengthOfLastWordQuater(s){
    const trimmed = s.trim()
    return trimmed.length - trimmed.lastIndexOf(' ') - 1
}

// console.log(lengthOfLastWordQuater("Hello World")) // 5
// console.log(lengthOfLastWordQuater("     Hellooo    ")) // 7
// console.log(lengthOfLastWordQuater("Helloo    ")) // 6
// console.log(lengthOfLastWordQuater("   fly me   to   the moon  ")) // 4
// console.log(lengthOfLastWordQuater("luffy is still joyboy")) // 6

//Another take on firs solution, but we need only the length
function lengthOfLastWordQuinqies(s){
    for(let i=s.length-1 ; i>=0 ; i--){
        //skip the trailing spaces
        if(s[i]===" ") continue
        //a word has been found
        else{
            let j = i
            while(j>=0 && s[j]!==" "){
                j--
            }
            return i-j
        }
    }
}

// console.log(lengthOfLastWordQuinqies("Hello World")) // 5
// console.log(lengthOfLastWordQuinqies("     Hellooo    ")) // 7
// console.log(lengthOfLastWordQuinqies("Helloo    ")) // 6
// console.log(lengthOfLastWordQuinqies("   fly me   to   the moon  ")) // 4
// console.log(lengthOfLastWordQuinqies("luffy is still joyboy")) // 6

//==========================================
// https://leetcode.com/problems/spiral-matrix-ii/
// Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.

// Example 1:
// Input: n = 3
// Output: [[1,2,3],[8,9,4],[7,6,5]]

// Example 2:
// Input: n = 1
// Output: [[1]]

// Constraints:
// 1 <= n <= 20

var generateMatrix = function(n) {
    if(n === 1) return [[1]]
    const directions = {
        'right' : 'down',
        'down' : 'left',
        'left' : 'up',
        'up' : 'right'
    }

    let spiral = Array.from({ length: n }, () => Array(n))
    spiral[0][0] = 1
    let dir = 'right'
    let ct = 2
    let coord = [0, 0] // [row, col]

    while(ct <= n*n){
        //Fill a row (or a col), check if the following cell is available, i.e. in bounds and not already assigned, if so assign it, else change direction
        if(dir === 'right'){
            if(isAvailable([coord[0] , coord[1]+1])) {
                coord = [coord[0] , coord[1]+1]
                spiral[coord[0]][coord[1]] = ct
                ct ++
            }
            else dir = directions[dir]
        }
        else if(dir === 'down'){
            if(isAvailable([coord[0]+1 , coord[1]])) {
                coord = [coord[0]+1 , coord[1]]
                spiral[coord[0]][coord[1]] = ct
                ct ++
            }
            else dir = directions[dir]
        }
        else if(dir === 'left'){
            if(isAvailable([coord[0] , coord[1]-1])) {
                coord = [coord[0] , coord[1]-1]
                spiral[coord[0]][coord[1]] = ct
                ct ++
            }
            else dir = directions[dir]
        }
        else if(dir === 'up'){
            if(isAvailable([coord[0]-1 , coord[1]])) {
                coord = [coord[0]-1 , coord[1]]
                spiral[coord[0]][coord[1]] = ct
                ct ++
            }
            else dir = directions[dir]
        }
    }

    return spiral

    function isAvailable(coord){
        return coord[0]>=0 && coord[0]<n && coord[1]>=0 && coord[1]<n && !spiral[coord[0]][coord[1]]
    }
}

// console.log(generateMatrix(1)) // [[1]]
// console.log(generateMatrix(2)) // [ [ 1, 2 ], [ 4, 3 ] ]
// console.log(generateMatrix(3)) // [ [ 1, 2, 3 ], [ 8, 9, 4 ], [ 7, 6, 5 ] ]
// console.log(generateMatrix(4)) // [ [ 1, 2, 3, 4 ], [ 12, 13, 14, 5 ], [ 11, 16, 15, 6 ], [ 10, 9, 8, 7 ] ]

//Excellent runtime