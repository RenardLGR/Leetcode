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
    //Each bar can hold water up to the smallest bar between the highest bars on his left and and the highest bar on his right
    //For each height, we will search these bars (bounds)
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


// Same idea, but more efficient, we will store the highest bar on the left for each value, by looping from the other side, we will be able to know the highest bars on his left and and the highest bar on his right (bounds)
// O(2n) time
function trapBis(height){
    // We will store the highest bar on the left for each value, by looping from the other side, we will be able to know the highest bars on his left and and the highest bar on his right (bounds)
    // O(2n) time
    let res = 0
    let highestBarOnTheLeft = []
    let highestLeft = 0
    height.forEach(h => {
        highestBarOnTheLeft.push(highestLeft)
        highestLeft = Math.max(h, highestLeft)
    })

    let highestRight = 0
    for(let i=height.length-1 ; i>=0 ; i--){
        let smallestOfHeights = Math.min(highestBarOnTheLeft[i], highestRight)
        if(height[i] < smallestOfHeights){
            res += smallestOfHeights - height[i]
        }
        highestRight = Math.max(height[i], highestRight)
    }

    return res
}

// console.log(trapBis([0,1,0,2,1,0,1,3,2,1,2,1])) // 6


//Two pointer at both extremities
function trapTer(height){
    let res = 0
    let l = 0
    let r = height.length - 1
    let maxL = 0
    let maxR = 0
    while(l < r){
        maxL = Math.max(maxL, height[l])
        if(height[l] < maxL){
            res += maxL - height[l]
        }

        maxR = Math.max(maxR, height[r])
        if(height[r] < maxR){
            res += maxR - height[r]
        }

        height[l] < height[r] ? l++ : r--
    }

    return res
}

console.log(trapTer([0,1,0,2,1,0,1,3,2,1,2,1])) // 6
console.log(trapTer([0, 2, 0, 4, 0, 4, 0])) // 6