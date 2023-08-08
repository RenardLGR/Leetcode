const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
// ____________________________________________________
// https://leetcode.com/problems/trapping-rain-water/
// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

// Example 1:
// IMG
// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

// Example 2:
// Input: height = [4,2,0,3,2,5]
// Output: 9
 

// Constraints:
// n == height.length
// 1 <= n <= 2 * 104
// 0 <= height[i] <= 105

// Naive : O(n^2)
var trap = function(height) {
    if(!height) return 0
    //Each bar can hold water up to the smallest bar between the highest bars on his left and and the highest bar on his right
    let capacities = []
    height.forEach((h, idx) => {
        let highestLeft = 0
        for (let i=0 ; i<idx ; i++){
            highestLeft = Math.max(highestLeft, height[i])
        }
        let highestRight = 0
        for (let i=idx+1 ; i<height.length ; i++){
            highestRight = Math.max(highestRight, height[i])
        }
        let smallestOfHeights = Math.min(highestLeft, highestRight)
        if(smallestOfHeights > h){
            capacities.push(smallestOfHeights - h)
        }else{
            capacities.push(0)
        }
    })

    return capacities.reduce((acc, cur) => acc+cur, 0)
}

// console.log(trap([0])) // 0
// console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])) // 6
// console.log(trap([4,2,0,3,2,5])) // 9
// console.log(trap([1,2,3,4,5,4,3,2,1])) // 0
// console.log(trap([4,0,0,0,0,0,0,0,1])) // 7
// console.log(trap([4,0,0,0,4,0,0,0,4])) // 24
