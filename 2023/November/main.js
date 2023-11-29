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