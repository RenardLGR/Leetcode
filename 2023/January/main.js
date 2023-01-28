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
// https://leetcode.com/problems/fibonacci-number/
// The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

// F(0) = 0, F(1) = 1
// F(n) = F(n - 1) + F(n - 2), for n > 1.
// Given n, calculate F(n).

 

// Example 1:

// Input: n = 2
// Output: 1
// Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
// Example 2:

// Input: n = 3
// Output: 2
// Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
// Example 3:

// Input: n = 4
// Output: 3
// Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.
 

// Constraints:

// 0 <= n <= 30

var fib = function(n) {
    if(n===0){
        return 0
    }
    if(n===1){
        return 1
    }

    //prevprev < prev
    let prevprev = 0
    let prev = 1
    let res = 0
    for(let i=2 ; i<=n ; i++){
        res = prev + prevprev
        prevprev = prev
        prev = res
    }

    return res
};

// console.log(fib(2)); // 1
// console.log(fib(4)); // 3


var fibRec = function(n){
    if(n===0){
        return 0
    }
    if(n===1){
        return 1
    }
    // if(n<2){
    //     return n
    // }
    
    return fibRec(n-2) + fibRec(n-1)

}

// console.log(fibRec(2)); // 1
// console.log(fibRec(4)); // 3

//Way slower and way much memory than the non recursive version

var fibRecMemo = function(n){
    let memo = {}

    return f(n)
    function f(n) {
        if(n<2){
            return n
        }
        
        if(memo[n]){
            return memo[n]
        }else{
            memo[n] = f(n-2) + f(n-1)
            return memo[n]
        }
    }
}

// console.log(fibRecMemo(2)); // 1
// console.log(fibRecMemo(4)); // 3

//not bad memory and time wise

//================================================
// https://leetcode.com/problems/minimum-rounds-to-complete-all-tasks/description/
// You are given a 0-indexed integer array tasks, where tasks[i] represents the difficulty level of a task. In each round, you can complete either 2 or 3 tasks of the same difficulty level.

// Return the minimum rounds required to complete all the tasks, or -1 if it is not possible to complete all the tasks.

 

// Example 1:

// Input: tasks = [2,2,3,3,2,4,4,4,4,4]
// Output: 4
// Explanation: To complete all the tasks, a possible plan is:
// - In the first round, you complete 3 tasks of difficulty level 2. 
// - In the second round, you complete 2 tasks of difficulty level 3. 
// - In the third round, you complete 3 tasks of difficulty level 4. 
// - In the fourth round, you complete 2 tasks of difficulty level 4.  
// It can be shown that all the tasks cannot be completed in fewer than 4 rounds, so the answer is 4.
// Example 2:

// Input: tasks = [2,3,3]
// Output: -1
// Explanation: There is only 1 task of difficulty level 2, but in each round, you can only complete either 2 or 3 tasks of the same difficulty level. Hence, you cannot complete all the tasks, and the answer is -1.
 

// Constraints:

// 1 <= tasks.length <= 105
// 1 <= tasks[i] <= 109

var minimumRounds = function(tasks) {
    // For every element e of N with e > 1 and k of N
    // e can be written either as :
    // k*3
    // k*3 + 2
    // k*3 + 2 + 2
    // Proof :
    // It is true for 2, 3 and 4
    // Every numbers can be written as 3*k + (2 || 3 || 4) 
    // Which make the function return -1 only if a number appears exactly one time

    //Examples : 
    // 4 gives us 2+2 => 2 rounds
    // 5 gives us 3+2 => 2 rounds
    // 6 gives us 3+3 => 2 rounds
    // 7 gives us 3+2+2 => 3 rounds
    // 8 gives us 3+3+2 => 3 rounds
    // for a frequency of f :
    // f%3 = 1 => M.floor(f/3) + 1 rounds
    // f%3 = 2 => M.floor(f/3) + 1 rounds
    // f%3 = 0 => f/3 rounds

    //-1 case
    let res
    tasks.forEach((el, idx, arr) => {
        //if the last index equal the first index, the elment is unique therefore the problem has no solution
        if(arr.indexOf(el) === arr.lastIndexOf(el)){
            res = -1
        }
    })

    if(res === -1){
        return -1
    }

    //working cases
    let frequencies = tasks.reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})

    res = 0
    for(let n in frequencies){
        let f = frequencies[n]
        let mod = f%3

        if(mod === 0){
            res += f/3
        }else{
            res += Math.floor(f/3) + 1
        }
    }

    return res

};

//WORKS BUT TOO SLOW

// console.log(minimumRounds([2,3,3])); // -1
// console.log(minimumRounds([2,2,3,3,2,4,4,4,4,4])); // 4

function minimumRoundsBis(tasks) {
    //Same idea, but we don't need to check the //-1 case, it will appear in our for in loop

    let frequencies = tasks.reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})

    let res = 0
    for(let n in frequencies){
        let f = frequencies[n]
        if(f === 1){ //-1 case
            return -1
        }

        let mod = f%3

        if(mod === 0){
            res += f/3
        }else{
            res += Math.floor(f/3) + 1
        }
    }

    return res
}

//WORKS PERFECTLY FINE :)

// console.log(minimumRoundsBis([2,2,3,3,2,4,4,4,4,4])); // 4


//==================================================
// https://leetcode.com/problems/add-two-numbers/
// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

 

// Example 1:
// 2 -> 4 -> 3
// 5 -> 6 -> 4
// ____________
// 7 -> 0 -> 8

// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.
// Example 2:

// Input: l1 = [0], l2 = [0]
// Output: [0]
// Example 3:

// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]
 

// Constraints:

// The number of nodes in each linked list is in the range [1, 100].
// 0 <= Node.val <= 9
// It is guaranteed that the list represents a number that does not have leading zeros.

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
//  * @param {ListNode} l1
//  * @param {ListNode} l2
//  * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let res = {}

    let val1
    let val2
    let carry = 0
    let next = res

    let isDone = false

    while(!isDone){ //while either of the lists are not finished
        isDone = true
        if(l1.next || l2.next){ //if one of the lists has a next element
            isDone = false
            let node = {} //create empty node we will dig into

            val1 = l1.val===undefined ? 0 : l1.val
            val2 = l2.val===undefined ? 0 : l2.val
            next.val = (val1 + val2 + carry) % 10
            carry = Math.floor((val1 + val2 + carry) / 10)

            next.next = node //append empty node
            next = next.next //dig res as we build

            l1 = l1.next || {val : 0} //dig input
            l2 = l2.next || {val : 0} //dig input
        }else{ //end of both suits
            val1 = l1.val===undefined ? 0 : l1.val
            val2 = l2.val===undefined ? 0 : l2.val
            next.val = (val1 + val2 + carry) % 10
            carry = Math.floor((val1 + val2 + carry) / 10)

            if(carry > 0){ //if there is still a carry
                next.next = {val: 1, next: null}
            }else{
                next.next = null
            }
        }
    }

    return res
};

//=======================================================
// https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
// Given a string s, find the length of the longest 
// substring
//  without repeating characters.

 

// Example 1:

// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
// Example 2:

// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:

// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 

// Constraints:

// 0 <= s.length <= 5 * 104
// s consists of English letters, digits, symbols and spaces.

//How about the case sensitivity ?

var lengthOfLongestSubstring = function(s) {
    //We will build every non-repetitive longest substring starting from each char 
    let maxLen = 0
    let maxWord = ""

    let tempLen = 0
    let tempWord = ""
    let seen = {}
    let startIndex = 0

    for(let i=0 ; i<s.length ; i++){
        if(seen[s[i]] === undefined){ //keep building
            seen[s[i]] = 1
            tempLen++
            tempWord += s[i]
        }else{ //new substring
            if(tempLen > maxLen){ //check if valable candidate
                maxLen = tempLen
                maxWord = tempWord
            }
            //initialize new substring
            i = startIndex + 1 //back peddaling to startIndex + 1 (0,1,2, ...)
            tempLen = 1
            tempWord = s[i]
            seen = {}
            seen[s[i]] = 1
            startIndex = i //back peddaling to startIndex + 1 (0,1,2, ...)
        }
    }

    if(tempLen > maxLen){ //at the end of the loop, check if the last substring is a valable candidate
        maxLen = tempLen
        maxWord = tempWord
    }
    //console.log(maxWord);
    return maxLen
}

// console.log(lengthOfLongestSubstring("abcabcbb")); // "abc" of length 3
// console.log(lengthOfLongestSubstring("bbbbb")); // "b" of length 1
// console.log(lengthOfLongestSubstring("pwwkew")); // "wke" of length 3
// console.log(lengthOfLongestSubstring("dvdf")); // "vdf" of length 3
// console.log(lengthOfLongestSubstring("abcdeafghijklmnop")); // "bcdeafghijklmnop" of length 16

//Works but horrible in terms of efficiency


var lengthOfLongestSubstringBis = function(s){
    //We will build every non-repetitive longest substring starting from each char
    //same than before but cleare syntax
    let maxLen = 0
    let maxWord = ""

    for(let i=0 ; i<s.length ; i++){ //for each char
        let tempLen = 1
        let tempWord = s[i]
        let seen = {}
        seen[s[i]] = 1
        let j = i

        while((s[j+1] !== undefined) && seen[s[j+1]] === undefined){ //while there is a following char AND this char is not in seen
            j++
            seen[s[j]] = 1
            tempLen++
            tempWord += s[j]
        }

        if(tempLen > maxLen){ //check if valable candidate
            maxLen = tempLen
            maxWord = tempWord
        }
    }
    //console.log(maxWord);
    return maxLen
}

// console.log(lengthOfLongestSubstringBis("abcabcbb")); // "abc" of length 3
// console.log(lengthOfLongestSubstringBis("bbbbb")); // "b" of length 1
// console.log(lengthOfLongestSubstringBis("pwwkew")); // "wke" of length 3
// console.log(lengthOfLongestSubstringBis("dvdf")); // "vdf" of length 3
// console.log(lengthOfLongestSubstringBis("abcdeafghijklmnop")); // "bcdeafghijklmnop" of length 16

//Works but horrible in terms of efficiency


var lengthOfLongestSubstringTer = function(s){
    //Sliding window algorithm
    //As long as there is no duplicates in window/substring, increase it to the right, if there is, delete from the left until there is not
    let res = 0
    let left = 0
    let right = 0

    let seen = {}
    
    while(right < s.length){
        let charToAdd = s[right] 
        seen[charToAdd] = (seen[charToAdd] || 0) + 1

        while(seen[charToAdd] > 1){
            let charToRemove = s[left]
            left++
            seen[charToRemove]--
        }

        res = Math.max(res, right - left + 1)

        right++
    }

    return res
}

// console.log(lengthOfLongestSubstringTer("abcabcbb")); // "abc" of length 3
// console.log(lengthOfLongestSubstringTer("bbbbb")); // "b" of length 1
// console.log(lengthOfLongestSubstringTer("pwwkew")); // "wke" of length 3
// console.log(lengthOfLongestSubstringTer("dvdf")); // "vdf" of length 3
// console.log(lengthOfLongestSubstringTer("cdd")); // "cd" of length 2
// console.log(lengthOfLongestSubstringTer("abba")); //"ab" of length 2
// console.log(lengthOfLongestSubstringTer("abcdeafghijklmnop")); // "bcdeafghijklmnop" of length 16

//=======================================================
// https://leetcode.com/problems/longest-palindromic-substring/
// Given a string s, return the longest 
// palindromic
 
// substring
//  in s.

 

// Example 1:

// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.
// Example 2:

// Input: s = "cbbd"
// Output: "bb"
 

// Constraints:

// 1 <= s.length <= 1000
// s consist of only digits and English letters.

var longestPalindrome = function(s) {
    if(s.length <= 1){ //edge case
        return s
    }

    //for each letter, find the same letter starting from the end, check if left+1 === right-1, do that until left and right join : we have a palindrome ; O(n**3) complexity
    let maxLength = 1 //case of no palindrome should be initialized at first element
    let res = s[0] //case of no palindrome should be initialized at first element

    for(leftIdx=0 ; leftIdx<s.length ; leftIdx++){
        let left = s[leftIdx]
        for(let rightIdx=s.length-1 ; rightIdx>leftIdx ; rightIdx--){ //look for the end of a palindrome
            let right = s[rightIdx]
            if(left === right){ //we might have a palindrome
                let tempLength = 0
                let expectedLength = rightIdx - leftIdx + 1 //if every item (in between left&right) is mirrorred, that should be the length of the palindrome
                let k = 0
                let palindrome = ''
                while( (s[leftIdx+k] === s[rightIdx-k]) && (leftIdx+k <= rightIdx-k) ){ //check if item are mirrorred, stop when they meet
                    tempLength += (leftIdx+k === rightIdx-k) ? 1 : 2 //add 1 when they meet, 2 otherwise
                    palindrome = palindrome.slice(0, palindrome.length/2) + ( (leftIdx+k === rightIdx-k) ? s[leftIdx+k] : s[leftIdx+k]+s[rightIdx-k] ) + palindrome.slice(palindrome.length/2) //build palindrome
                    k++
                }
                if(tempLength === expectedLength){ //if it is indeed a palindrome
                    if(expectedLength > maxLength){ //if the palindrome is longer
                        maxLength = expectedLength
                        res = palindrome
                    }
                }
            }
        }
    }

    return res
}

// console.log(longestPalindrome('a')); // 'a' of length 1
// console.log(longestPalindrome('ac')); // 'a' of length 1
// console.log(longestPalindrome('babad')); // 'bab' of length 3
// console.log(longestPalindrome('cbbd')); // 'bb' of length 2
// console.log(longestPalindrome('0123abcba0')); // 'abcba' of length 5

//Seems to work but too long

function longestPalindromeBis(s){
    if(s.length <= 1){ //edge case
        return s
    }

    //Expand around a center : two cases : the center is null (baab), the center is not null (cbabc)
    let maxLen = 0
    let maxPalindrome = ''
    for(let i=0 ; i<s.length ; i++){
        //with center
        let palindrome = s[i]
        let length = 1
        let k=1
        while( (s[i-k] === s[i+k]) && s[i-k] && s[i+k]){
            palindrome = s[i-k] + palindrome + s[i+k]
            k++
            length += 2
        }

        if(length > maxLen){
            maxLen = length
            maxPalindrome = palindrome
        }

        //with null center
        let left = i
        let right = i+1
        let palindrome2 = ''
        let length2 = 0
        while(s[left] === s[right] && s[left] && s[right]){
            palindrome2 = s[left] + palindrome2 + s[right]
            length2 += 2
            left--
            right++
        }

        if(length2 > maxLen){
            maxLen = length2
            maxPalindrome = palindrome2
        }
    }

    return maxPalindrome
}

// console.log(longestPalindromeBis('a')); // 'a' of length 1
// console.log(longestPalindromeBis('ac')); // 'a' of length 1
// console.log(longestPalindromeBis('babad')); // 'bab' of length 3
// console.log(longestPalindromeBis('cbbd')); // 'bb' of length 2
// console.log(longestPalindromeBis('0123abcba0')); // 'abcba' of length 5

//Works well, let's do some dryness :
function longestPalindromeTer(s){
    if(s.length <= 1){ //edge case
        return s
    }

    //Expand around a center : two cases : the center is null (baab), the center is not null (cbabc)
    let maxLen = 0
    let maxPalindrome = ''
    for(let i=0 ; i<s.length ; i++){

        for(let k=0 ; k<=1 ; k++){ //k = 0 is with center, k = 1 is null center 
            let palindrome = ''
            let length = 0
            let left = i
            let right = left + k
            while(s[left] === s[right] && s[left] && s[right]){
                if(left === right){ //initialization case for palindrome with a center
                    palindrome = s[left]
                    length++
                    left--
                    right++
                }else{
                    palindrome = s[left] + palindrome + s[right]
                    length += 2
                    left--
                    right++
                }
            }

            if(length > maxLen){
                maxLen = length
                maxPalindrome = palindrome
            }
        }
    }

    return maxPalindrome
}

// console.log(longestPalindromeTer('a')); // 'a' of length 1
// console.log(longestPalindromeTer('ac')); // 'a' of length 1
// console.log(longestPalindromeTer('babad')); // 'bab' of length 3
// console.log(longestPalindromeTer('cbbd')); // 'bb' of length 2
// console.log(longestPalindromeTer('0123abcba0')); // 'abcba' of length 5

//===========================================================
// https://leetcode.com/problems/zigzag-conversion/
// The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

// P   A   H   N
// A P L S I I G
// Y   I   R
// And then read line by line: "PAHNAPLSIIGYIR"

// Write the code that will take a string and make this conversion given a number of rows:

// string convert(string s, int numRows);
 

// Example 1:

// Input: s = "PAYPALISHIRING", numRows = 3
// Output: "PAHNAPLSIIGYIR"
// Example 2:

// Input: s = "PAYPALISHIRING", numRows = 4
// Output: "PINALSIGYAHRPI"
// Explanation:
// P     I    N
// A   L S  I G
// Y A   H R
// P     I
// Example 3:

// Input: s = "A", numRows = 1
// Output: "A"
 

// Constraints:

// 1 <= s.length <= 1000
// s consists of English letters (lower-case and upper-case), ',' and '.'.
// 1 <= numRows <= 1000

var convertZigzag = function(s, numRows) {
    if (numRows === 1){
        return s
    }
    if(numRows === 2){
        let even = ''
        let odd = ''
        for(let i=0 ; i<s.length ; i++){
            if(i%2===0){
                even += s[i]
            }else{
                odd += s[i]
            }
        }
        return even + odd
    }
    //We'll define an array of array of cols with a value if there is a char at this rowIdx, 0 otherwise, idx 0 is at the bottom.
    //numRows is stricly bigger than 2
    let arr = [] 
    let down = true
    let rowIdx = numRows
    for(let i=0 ; i<s.length ; i++){
        if(down){
            let tempArr = s.slice(i, i+numRows).split('')
            while(tempArr.length < numRows){
                tempArr.push(0)
            }
            arr.push(tempArr)
            i += numRows-1
            down = false
            rowIdx = numRows-2
        }else{
            let tempArr = Array(numRows).fill(0)
            tempArr[rowIdx] = s[i]
            arr.push(tempArr)
            if(rowIdx === 1){
                down = true
            }else{
                rowIdx--
            }
        }
    }

    //console.log(arr);
    let res = ''
    for(let j=0 ; j<numRows ; j++){
        arr.forEach(subarr => {
            if(subarr[j] !== 0){
                res += subarr[j]
            }
        })
    }

    return res
};

// console.log(convertZigzag("PAYPALISHIRING", 2)); // PYAIHRNAPLSIIG
// console.log(convertZigzag("PAYPALISHIRING", 3)); // PAHNAPLSIIGYIR
// console.log(convertZigzag("PAYPALISHIRING", 4)); // PINALSIGYAHRPI

//It works although not that fast

//===============================================
