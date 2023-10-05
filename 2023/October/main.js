const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//======================================================
// https://leetcode.com/problems/maximum-subarray/
// Given an integer array nums, find the subarray with the largest sum, and return its sum.

// Example 1:
// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.

// Example 2:
// Input: nums = [1]
// Output: 1
// Explanation: The subarray [1] has the largest sum 1.

// Example 3:
// Input: nums = [5,4,-1,7,8]
// Output: 23
// Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.

// Constraints:
// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104

// Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

//Naive approach : build every arrays, take the biggest
var maxSubArray = function(nums) {
    //I guess a subarray is any Array of length 0<length<=n made from consecutive elements of nums ; with n=nums.length
    let maxSum = nums[0]
    let res = [nums[0]]

    for(let i=0 ; i<nums.length ; i++){
        let localMaxSum = 0
        let localSub = []
        for(let j=i ; j<nums.length ; j++){
            localMaxSum += nums[j]
            localSub.push(nums[j])
            if(localMaxSum > maxSum){
                maxSum = localMaxSum
                res = localSub.slice()
            }
        }
    }

    return maxSum
}

// console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])) // 6 with [4,-1,2,1]
// console.log(maxSubArray([1])) // 1 with [1]
// console.log(maxSubArray([5,4,-1,7,8])) // 23 with [5,4,-1,7,8]
//Time Limit Exceeded

//## approach
function maxSubArrayBis(nums){
    // A subarray is a contiguous non-empty sequence of elements within an array.
    let maximums = Array(nums.length)
    maximums[0] = nums[0]
    let max = maximums[0]

    for(let i=1 ; i<nums.length ; i++){
        maximums[i] = nums[i] + (maximums[i-1] > 0 ? maximums[i-1] : 0)
        max = Math.max(max, maximums[i])
    }
    return max
}

console.log(maxSubArrayBis([-2,1,-3,4,-1,2,1,-5,4])) // 6 with [4,-1,2,1]
console.log(maxSubArrayBis([1])) // 1 with [1]
console.log(maxSubArrayBis([5,4,-1,7,8])) // 23 with [5,4,-1,7,8]
console.log(maxSubArrayBis([1000,-1,-1,-1,1000])) // 1997 with [1000,-1,-1,-1,1000]
console.log(maxSubArrayBis([1000,-1,-1,-1,-1000,1500])) // 1500 with [1500]