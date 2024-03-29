const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//==================================
// https://leetcode.com/problems/product-of-array-except-self/description/
// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

// You must write an algorithm that runs in O(n) time and without using the division operation.

// Example 1:
// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]

// Example 2:
// Input: nums = [-1,1,0,-3,3]
// Output: [0,0,9,0,0]

// Constraints:
// 2 <= nums.length <= 105
// -30 <= nums[i] <= 30
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 

// Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)

// Also check : https://www.codewars.com/kata/5b3e609cd58499284100007a/javascript

function productExceptSelf(nums){
    // We have three cases :
    // First case : There are more than 2 zeroes in nums, thus the result is an array full of zeroes
    // Second case : There is only a single zero, thus the array is full of zero but at the index of the zero where it is the product except self
    // Third case : There is no zero.
    // Calculate res[0] normally : res[0] is equal to the product of nums.slice(1)
    // Then knowing res[0], we can conclude that res[1] = res[0] * nums[0] / nums[1]
    // In fact, for every element of res of index n, knowing its predecessor, res[n] = res[n-1] * nums[n-1] / nums[n]

    let res0 = 1
    let zeroes = nums[0] === 0 ? 1 : 0 // number of zeroes
    for(let i=1 ; i<nums.length ; i++){
        if(nums[i] === 0) zeroes++
        res0 *= nums[i]
    }

    //first case
    if(zeroes > 1){
        return Array(nums.length).fill(0)
    }
    //second case
    else if(zeroes === 1){
        let res = Array(nums.length)
        let prod = 1
        let zeroIdx = null
        for(let i=0 ; i<nums.length ; i++){
            if(nums[i] !== 0){
                res[i] = 0
                prod *= nums[i]
            }else{
                zeroIdx = i
            }
        }
        res[zeroIdx] = prod
        return res
    }
    //third case
    else{
        let res = Array(nums.length)
        res[0] = res0
        for(let i=1 ; i<nums.length ; i++){
            res[i] = (res[i-1] * nums[i-1] / nums[i])
        }
        return res
    }
}

// console.log(productExceptSelf([1, 2, 3, 4])) // [24,12,8,6]
// console.log(productExceptSelf([-1,1,0,-3,3])) // [0,0,9,0,0]

// Logic wise O(2n) complexity, but the Array(n).fill(0) takes O(n) + O(n) complexity, we will remove them for next attempt

function productExceptSelfBis(nums){
    let res0 = 1
    let zeroes = nums[0] === 0 ? 1 : 0 // number of zeroes
    for(let i=1 ; i<nums.length ; i++){
        if(nums[i] === 0) zeroes++
        res0 *= nums[i]
    }

    //first case
    if(zeroes > 1){
        let res = []
        for(let i=0 ; i<nums.length ; i++){
            res[i] = 0
        }
        return res
    }
    //second case
    else if(zeroes === 1){
        let res = []
        let prod = 1
        let zeroIdx = null
        for(let i=0 ; i<nums.length ; i++){
            if(nums[i] !== 0){
                res[i] = 0
                prod *= nums[i]
            }else{
                zeroIdx = i
            }
        }
        res[zeroIdx] = prod
        return res
    }
    //third case
    else{
        let res = []
        res[0] = res0
        for(let i=1 ; i<nums.length ; i++){
            res[i] = (res[i-1] * nums[i-1] / nums[i])
        }
        return res
    }
}

//Definitely faster

//Less lines : we just recalculate for nums[n] === 0
var productExceptSelfTer = function(nums) {
    //Calculate res[0] normally : res[0] is equal to the product of nums.slice(1)
    //Then knowing res[0], we can conclude that res[1] = res[0] * nums[0] / nums[1]
    //In fact, for every element of res of index n, knowing its predecessor, res[n] = res[n-1] * nums[n-1] / nums[n]
    //Except, we need to recalculate res[n] if either nums[n] === 0 (division is impossible and if nums[n] was the unique 0, res[n] !== 0)
    let res = []
    res[0] = productButIndex(nums, 0)

    for(let i=1 ; i<nums.length ; i++){
        if(nums[i] === 0){
            res[i] = productButIndex(nums, i)
        }else{
            res[i] = (res[i-1] * nums[i-1] / nums[i])
        }
    }

    return res


    function productButIndex(nums, index){
        let res = 1
        for(let i=0 ; i<nums.length ; i++){
            if(i !== index) res *= nums[i]
        }
        return res
    }
};

// console.log(productExceptSelfTer([1, 2, 3, 4])) // [24,12,8,6]
// console.log(productExceptSelfTer([-1,1,0,-3,3])) // [0,0,9,0,0]

function productExceptSelfQuater(nums){
    // res[i] is the product of (the product of elements from nums[0] to nums[i-1] (the elements on its left)) and (the product of elements from nums[n-1] to nums[i+1] (the elements on its right))
    // we will have two Arrays containing the product of (from nums[0] to nums[n-1]) and (from nums[n-1] to nums[0])
    const n = nums.length

    let leftToRight = [nums[0]]
    for(let i=1 ; i<n ; i++){
        leftToRight[i] = leftToRight[i-1] * nums[i]
    }

    let rightToLeft = []
    rightToLeft[n-1] = nums[n-1]
    for(let i=n-2 ; i>=0 ; i--){
        rightToLeft[i] = rightToLeft[i+1] * nums[i]
    }

    let res = []
    res[0] = rightToLeft[1]
    res[n-1] = leftToRight[n-2]
    for(let i=1 ; i<n-1 ; i++){
        res[i] = leftToRight[i-1] * rightToLeft[i+1]
    }

    return res
}

// console.log(productExceptSelfQuater([1, 2, 3, 4])) // [24,12,8,6]
// console.log(productExceptSelfQuater([-1,1,0,-3,3])) // [0,0,9,0,0]

// Meh speed
// We can have cleaner indices, logic remains the same
function productExceptSelfQuinqies(nums){
    const n = nums.length

    let leftToRight = [1]
    for(let i=1 ; i<n ; i++){
        leftToRight[i] = leftToRight[i-1] * nums[i-1]
    }

    let rightToLeft = []
    rightToLeft[n-1] = 1
    for(let i=n-2 ; i>=0 ; i--){
        rightToLeft[i] = rightToLeft[i+1] * nums[i+1]
    }

    let res = []
    for(let i=0 ; i<n ; i++){
        res[i] = leftToRight[i] * rightToLeft[i]
    }

    return res
}

// console.log(productExceptSelfQuinqies([1, 2, 3, 4])) // [24,12,8,6]
// console.log(productExceptSelfQuinqies([-1,1,0,-3,3])) // [0,0,9,0,0]

function productExceptSelfSexies(nums){
    // Cleaner version of three cases algo, early return if more than two zeroes are found

    let prod = 1
    let zeroIdx = null
    for(let i=0 ; i<nums.length ; i++){
        if(nums[i] === 0 && zeroIdx === null){
            zeroIdx = i
        }else if(nums[i] === 0){
            // case more than 2 zeroes
            return Array.from({length : nums.length}, (_) => 0)
        }else{
            prod *= nums[i]
        }
    }
    if(zeroIdx !== null){
        //case 1 zero
        let res = Array.from({length : nums.length}, (_) => 0)
        res[zeroIdx] = prod
        return res
    }
    //case no zero
    return nums.map(e => prod / e)
}

// console.log(productExceptSelfSexies([1, 2, 3, 4])) // [24,12,8,6]
// console.log(productExceptSelfSexies([-1,1,0,-3,3])) // [0,0,9,0,0]
// console.log(productExceptSelfSexies([4, 7, 3, 6, 2, 11, 14, 4, 7, 5])) // [5433120, 3104640, 7244160, 3622080, 10866240, 1975680, 1552320, 5433120, 3104640, 4346496]

function productExceptSelfSepties(nums){
    //Yet another syntax for the three cases algo
    let zeroes = 0
    let prod = 1
    for(let el of nums){
        if(el === 0){
            if(++zeroes === 2){
                break
            }
        }else{
            prod *= el
        }
    }

    if(zeroes === 0){
        return nums.map(e => prod / e)
    }else{
        if(zeroes === 1){
            let res = Array.from({length : nums.length}, (_) => 0)
            res[nums.indexOf(0)] = prod
            return res
        }else{
            return Array.from({length : nums.length}, (_) => 0)
        }
    }
}

// console.log(productExceptSelfSepties([1, 2, 3, 4])) // [24,12,8,6]
// console.log(productExceptSelfSepties([-1,1,0,-3,3])) // [0,0,9,0,0]
// console.log(productExceptSelfSepties([4, 7, 3, 6, 2, 11, 14, 4, 7, 5])) // [5433120, 3104640, 7244160, 3622080, 10866240, 1975680, 1552320, 5433120, 3104640, 4346496]

//Fastest version