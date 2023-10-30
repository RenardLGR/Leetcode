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

//Kadane's approach
function maxSubArrayBis(nums){
    //Kadane's approach
    //Kadane's approach tracks the maximum of the current subarray ending at current index (maxEndingHere). We are better off starting a new subarray if adding the current value still yields to a subarray sum smaller than the current value
    let maxEndingHere = [nums[0]]
    let res = nums[0]

    for(let i=1 ; i<nums.length ; i++){
        maxEndingHere[i] = Math.max(maxEndingHere[i-1] + nums[i], nums[i])
        res = Math.max(maxEndingHere[i], res)
    }
    return res
}

// console.log(maxSubArrayBis([-2,1,-3,4,-1,2,1,-5,4])) // 6 with [4,-1,2,1]
// console.log(maxSubArrayBis([1])) // 1 with [1]
// console.log(maxSubArrayBis([5,4,-1,7,8])) // 23 with [5,4,-1,7,8]
// console.log(maxSubArrayBis([1000,-1,-1,-1,1000])) // 1997 with [1000,-1,-1,-1,1000]
// console.log(maxSubArrayBis([1000,-1,-1,-1,-1000,1500])) // 1500 with [1500]
// console.log(maxSubArrayBis([-70,-100,-50])) // -50 with [-50]

//Kadane's approach, other syntax
function maxSubArrayTer(nums){
    //Kadane's approach
    //Kadane's approach tracks the maximum of the current subarray ending at current index (maxEndingHere). We are better off starting a new subarray if adding the current value still yields to a subarray sum smaller than the current value
    let maxEndingHere = Array(nums.length)
    maxEndingHere[0] = nums[0]
    let res = nums[0]

    for(let i=1 ; i<nums.length ; i++){
        //maxEndingHere[i] = (maxEndingHere[i-1] + nums[i] > nums[i] ? maxEndingHere[i-1] + nums[i] : nums[i])
        maxEndingHere[i] = nums[i] + (maxEndingHere[i-1] > 0 ? maxEndingHere[i-1] : 0)
        res = Math.max(maxEndingHere[i], res)
    }
    return res
}

// console.log(maxSubArrayTer([-2,1,-3,4,-1,2,1,-5,4])) // 6 with [4,-1,2,1]
// console.log(maxSubArrayTer([1])) // 1 with [1]
// console.log(maxSubArrayTer([5,4,-1,7,8])) // 23 with [5,4,-1,7,8]
// console.log(maxSubArrayTer([1000,-1,-1,-1,1000])) // 1997 with [1000,-1,-1,-1,1000]
// console.log(maxSubArrayTer([1000,-1,-1,-1,-1000,1500])) // 1500 with [1500]
// console.log(maxSubArrayTer([-70,-100,-50])) // -50 with [-50]

//This syntax is way faster than the previous one, despite having the same approach

//========================================
