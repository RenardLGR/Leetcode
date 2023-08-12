const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
// =======================================
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

// console.log(trapTer([0,1,0,2,1,0,1,3,2,1,2,1])) // 6
// console.log(trapTer([0, 2, 0, 4, 0, 4, 0])) // 6

//================================================
// https://leetcode.com/problems/multiply-strings/
// Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.

// Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.


// Example 1:
// Input: num1 = "2", num2 = "3"
// Output: "6"

// Example 2:
// Input: num1 = "123", num2 = "456"
// Output: "56088"
 

// Constraints:

// 1 <= num1.length, num2.length <= 200
// num1 and num2 consist of digits only.
// Both num1 and num2 do not contain any leading zero, except the number 0 itself.

// From https://www.codewars.com/kata/55911ef14065454c75000062/train/javascript

function addition(a,b){
    let carry = false
    let res = ''
    let maxLength = Math.max(a.length, b.length)

    a = "0".repeat(maxLength) + a
    b = "0".repeat(maxLength) + b
    a = a.slice(a.length - maxLength, a.length)
    b = b.slice(b.length - maxLength, b.length)

    for(let i=maxLength-1 ; i>=0 ; i--){
        let temp = +a[i] + +b[i]
        if(carry) temp++
        carry = (temp >= 10)
        res = temp%10 + res
    }

    if(carry) res = 1 + res

    return res
}

// console.log(addition("35825", "3")); // 35828
// console.log(addition("35825", "70000")); // 105825

//We will follow the standard model :

//     123
// x    12
// _______
//     246
// +  123.
// _______
//    1476

function multiply(a,b){
    if(a==='0' || b==='0') return '0'

    let sumOperands = []
    for(let i=b.length-1 ; i>=0 ; i--){
        let zeroes = '0'.repeat(b.length-1 - i) //these are the "dots"
        let carry = 0
        let sumOperand = ''
        for(let j=a.length-1 ; j>=0 ; j--){
            let temp = (+b[i] * +a[j]) + carry
            sumOperand = temp%10 + sumOperand
            carry = Math.floor(temp/10)
        }
        sumOperand = carry + sumOperand + zeroes
        sumOperands.push('' + sumOperand)
    }

    let res = sumOperands.reduce((acc, curr) => addition(acc, curr))

    while(res[0] === "0" && res.length>1) res = res.slice(1)
    return res
}

// NOTE : we don't handle negative nor decimal inputs here

// We can consider 123 x 12 to be (100+20+3) x (10+2)
// In other words, we multiply each digits of one with each digits of the other, we rearrange to keep track of the zeroes and don't forget the carry
// Let's have an array containing our result and work with its indices

function multiplyBis(a, b){
    if(a==='0' || b==='0') return '0'
    
    let res = Array(a.length + b.length).fill(0)

    for(let idxA=a.length-1 ; idxA>=0 ; idxA--){
        for(let idxB=b.length-1 ; idxB>=0 ; idxB--){
            let resIdx = idxA + idxB + 1
            let sum = res[resIdx] + Number(a[idxA]) * Number(b[idxB])
            let carry = Math.floor(sum/10)
            let remainder = sum % 10

            res[resIdx] = remainder
            res[resIdx-1] += carry
            if(res[resIdx-1] > 10){
                res[resIdx-1] -= 10
                res[resIdx-2]++
            }
        }
    }
    if (res[0] === 0) res.shift()
    return res.join('')
}

// console.log(multiplyBis('123', '12')); // "1476"

//==========================================
// https://leetcode.com/problems/wildcard-matching/
// Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where:

// '?' Matches any single character.
// '*' Matches any sequence of characters (including the empty sequence).
// The matching should cover the entire input string (not partial).


// Example 1:
// Input: s = "aa", p = "a"
// Output: false
// Explanation: "a" does not match the entire string "aa".

// Example 2:
// Input: s = "aa", p = "*"
// Output: true
// Explanation: '*' matches any sequence.

// Example 3:
// Input: s = "cb", p = "?a"
// Output: false
// Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.
 

// Constraints:
// 0 <= s.length, p.length <= 2000
// s contains only lowercase English letters.
// p contains only lowercase English letters, '?' or '*'.

// CtrlC/CtrlV from https://leetcode.com/problems/wildcard-matching/solutions/1228581/backtracking-97-faster-javascript-version-of-official-solution-es6/

// Approach: Backtracking
// Algorithm:

// Initiate 3 pointers:
// pointer for pattern-index
// pointer for string-index
// pointer for temporary-index when we encounter "*" in pattern
// Initiate a variable for storing index-position of star "*"
// both string pointer and pattern pointer are moved forward by 1 step whenever:
// chars in string and pattern match OR
// char in string matches with "?" in pattern
// Only pattern pointer is moved by a step when we encounter a "*"
// Only string pointer is moved when a char doesn't match with char in pattern
// The starIndex acts as a reference point during entire iteration
// The temp-index along with string-index are constantly updated when chars in pattern and string do not match.
// Code:

const isMatch = function (string, pattern) {
  let s = 0, p = 0;
  let starIdx = -1, pointer = -1;

  while (s < string.length) {
    if ((p < pattern.length && string[s] === pattern[p]) || pattern[p] === "?") {
      s++;
      p++;
    } 
	else if (p < pattern.length && pattern[p] === "*") {
      starIdx = p;
      pointer = s;
      p++;
    } 
	else if (starIdx === -1) return false;
    else {
      p = starIdx + 1;
      s = pointer + 1;
      pointer = s;
    }
  }
  for (let idx = p; idx < pattern.length; idx++) {
    if (pattern[idx] !== "*") return false;
  }
  return true;
}

// console.log(isMatch("aa", "a")) // false
// console.log(isMatch("aa", "*")) // true
// console.log(isMatch("cb", "?a")) // false
// console.log(isMatch("cb", "?b")) // true

