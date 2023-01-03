const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================================
// https://leetcode.com/problems/detect-capital/
// We define the usage of capitals in a word to be right when one of the following cases holds:

// All letters in this word are capitals, like "USA".
// All letters in this word are not capitals, like "leetcode".
// Only the first letter in this word is capital, like "Google".
// Given a string word, return true if the usage of capitals in it is right.

 

// Example 1:

// Input: word = "USA"
// Output: true
// Example 2:

// Input: word = "FlaG"
// Output: false
 

// Constraints:

// 1 <= word.length <= 100
// word consists of lowercase and uppercase English letters.

var detectCapitalUse = function(word) {
    if(word.toUpperCase() === word || word.toLowerCase() === word){ //case is consistant
        return true
    }else{
        return word.slice(1).toLowerCase() === word.slice(1)
    }
};

// console.log(detectCapitalUse("USA")); // true
// console.log(detectCapitalUse("leetcode")); // true
// console.log(detectCapitalUse("FlaG")); // false


//================================================================
// https://leetcode.com/problems/two-sum/
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

 

// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]
 

// Constraints:

// 2 <= nums.length <= 104
// -109 <= nums[i] <= 109
// -109 <= target <= 109
// Only one valid answer exists.
 

// Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?

var twoSum = function(nums, target) {
    //double loop, second loop is starting from the index of the first loop, so we don't check same couples
    //O(n²)
    for(let i=0 ; i<nums.length ; i++){
        for(let j=i+1 ; j<nums.length ; j++){
            if(nums[i]+nums[j] === target){
                return [i, j]
            }
        }
    }
    return null //if no solution was found (but it shouldn't happen)
}

const twoSumBis = function(nums, target) {
    const comp = {};
    for(let i=0; i<nums.length; i++){
        if(comp[nums[i] ]>=0){
            return [ comp[nums[i] ] , i]
        }
        comp[target-nums[i]] = i
    }
};

// console.log(twoSum([2,7,11,15] , 9)); // [ 0, 1 ]
// console.log(twoSumBis([2,7,11,15] , 9)); // [ 0, 1 ]

//===================================================
// https://leetcode.com/problems/delete-columns-to-make-sorted/
// You are given an array of n strings strs, all of the same length.

// The strings can be arranged such that there is one on each line, making a grid. For example, strs = ["abc", "bce", "cae"] can be arranged as:

// abc
// bce
// cae
// You want to delete the columns that are not sorted lexicographically. In the above example (0-indexed), columns 0 ('a', 'b', 'c') and 2 ('c', 'e', 'e') are sorted while column 1 ('b', 'c', 'a') is not, so you would delete column 1.

// Return the number of columns that you will delete.

 

// Example 1:

// Input: strs = ["cba","daf","ghi"]
// Output: 1
// Explanation: The grid looks as follows:
//   cba
//   daf
//   ghi
// Columns 0 and 2 are sorted, but column 1 is not, so you only need to delete 1 column.
// Example 2:

// Input: strs = ["a","b"]
// Output: 0
// Explanation: The grid looks as follows:
//   a
//   b
// Column 0 is the only column and is sorted, so you will not delete any columns.
// Example 3:

// Input: strs = ["zyx","wvu","tsr"]
// Output: 3
// Explanation: The grid looks as follows:
//   zyx
//   wvu
//   tsr
// All 3 columns are not sorted, so you will delete all 3.
 

// Constraints:

// n == strs.length
// 1 <= n <= 100
// 1 <= strs[i].length <= 1000
// strs[i] consists of lowercase English letters.

var minDeletionSize = function(strs) {
    let res = 0
    for(let i=0 ; i<strs[0].length ; i++){ //loops through cols
        let col = []
        for(let j=0 ; j<strs.length ; j++){ //loops through lines
            col.push(strs[j][i])
        }
        let sortedCol = col.slice().sort()
        let toDelete = false
        sortedCol.forEach((el, idx) => {
            if(el !== col[idx]){
                toDelete = true
            }
        })
        //colud be faster here and just check if every element is alphabetically greater than its predecessor, otherwise set toDelete to true
        //see below
        res += toDelete ? 1 : 0
    }

    return res
};

// console.log(minDeletionSize(["cba","daf","ghi"])); // 1
// console.log(minDeletionSize(["a","b"])); // 0
// console.log(minDeletionSize(["zyx","wvu","tsr"])); // 3

var minDeletionSizeBis = function(strs) {
    let res = 0
    for(let i=0 ; i<strs[0].length ; i++){ //loops through cols
        let col = []
        for(let j=0 ; j<strs.length ; j++){ //loops through lines
            col.push(strs[j][i])
            //do we even need to push it if we know the predecessor is alphabetically greater???
            //see below
        }
        let toDelete = false

        for(let k=1 ; k<col.length ; k++){
            if(col[k] < col[k-1]){
                toDelete = true
                break
            }
        }
        res += toDelete ? 1 : 0
    }

    return res
};

// console.log(minDeletionSizeBis(["cba","daf","ghi"])); // 1
// console.log(minDeletionSizeBis(["a","b"])); // 0
// console.log(minDeletionSizeBis(["zyx","wvu","tsr"])); // 3

var minDeletionSizeTer = function(strs) {
    let res = 0
    for(let i=0 ; i<strs[0].length ; i++){ //loops through cols
        let col = []
        let toDelete = false
        for(let j=0 ; j<strs.length ; j++){ //loops through lines
            let lastElem = col.slice(-1)[0]
            if(lastElem === undefined || strs[j][i] > lastElem){
                col.push(strs[j][i])
            }else{
                toDelete = true
                break
            }
            //do we even need the col array if we are are just checking the last elem anyway???
            //toDelete is not needed aswell, as we are just increasing once we see an anomaly
            //see below
        }

        res += toDelete ? 1 : 0
    }

    return res
};

// console.log(minDeletionSizeTer(["cba","daf","ghi"])); // 1
// console.log(minDeletionSizeTer(["a","b"])); // 0
// console.log(minDeletionSizeTer(["zyx","wvu","tsr"])); // 3

var minDeletionSizeQuater = function(strs) {
    let res = 0
    for(let i=0 ; i<strs[0].length ; i++){ //loops through cols
        let prevElem = strs[0][i] //initialization
        // let toDelete = false
        for(let j=1 ; j<strs.length ; j++){ //loops through lines
            if(strs[j][i] < prevElem){
                // toDelete = true
                res++
                break
            }
            prevElem=strs[j][i]
        }

        // res += toDelete ? 1 : 0
    }

    return res
};

// console.log(minDeletionSizeQuater(["cba","daf","ghi"])); // 1
// console.log(minDeletionSizeQuater(["a","b"])); // 0
// console.log(minDeletionSizeQuater(["zyx","wvu","tsr"])); // 3

//===============================================
