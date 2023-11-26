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
console.log(merge([[1,4],[5,6]])) // [[1,4],[5,6]]

//Apparently [[1,4],[5,6]] doesn't overlap making the above solution WRONG 