const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//===============================================
// https://leetcode.com/problems/longest-common-prefix/
// Write a function to find the longest common prefix string amongst an array of strings.

// If there is no common prefix, return an empty string "".


// Example 1:

// Input: strs = ["flower","flow","flight"]
// Output: "fl"
// Example 2:

// Input: strs = ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.
 

// Constraints:

// 1 <= strs.length <= 200
// 0 <= strs[i].length <= 200
// strs[i] consists of only lowercase English letters.

var longestCommonPrefix = function(strs) {
    let isDone = false
    let maxPrefixLength = 0
    while(!isDone){
        isDone = true
        //for each word, check if the letter at index n exists and is always present. n starts at 0 and increases if the preceding condition is met
        if(strs.every(word => (word[maxPrefixLength] !== undefined) && (word[maxPrefixLength] === strs[0][maxPrefixLength]) )){
            maxPrefixLength++
            isDone = false
        }
    }

    return strs[0].slice(0, maxPrefixLength)
};

// console.log(longestCommonPrefix(["flower","flow","flight"])); // fl
// console.log(longestCommonPrefix(["dog","racecar","car"])); // ""
// console.log(longestCommonPrefix(["dog","dog","dog"])); //dog
// console.log(longestCommonPrefix([""])); // ""

//================================================
