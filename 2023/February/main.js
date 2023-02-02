const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//===============================================
// https://leetcode.com/problems/string-to-integer-atoi/
// Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).

// The algorithm for myAtoi(string s) is as follows:

// Read in and ignore any leading whitespace.
// Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
// Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.
// Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
// If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -231 should be clamped to -231, and integers greater than 231 - 1 should be clamped to 231 - 1.
// Return the integer as the final result.
// Note:

// Only the space character ' ' is considered a whitespace character.
// Do not ignore any characters other than the leading whitespace or the rest of the string after the digits.
 

// Example 1:

// Input: s = "42"
// Output: 42
// Explanation: The underlined characters are what is read in, the caret is the current reader position.
// Step 1: "42" (no characters read because there is no leading whitespace)
//          ^
// Step 2: "42" (no characters read because there is neither a '-' nor '+')
//          ^
// Step 3: "42" ("42" is read in)
//            ^
// The parsed integer is 42.
// Since 42 is in the range [-231, 231 - 1], the final result is 42.
// Example 2:

// Input: s = "   -42"
// Output: -42
// Explanation:
// Step 1: "   -42" (leading whitespace is read and ignored)
//             ^
// Step 2: "   -42" ('-' is read, so the result should be negative)
//              ^
// Step 3: "   -42" ("42" is read in)
//                ^
// The parsed integer is -42.
// Since -42 is in the range [-231, 231 - 1], the final result is -42.
// Example 3:

// Input: s = "4193 with words"
// Output: 4193
// Explanation:
// Step 1: "4193 with words" (no characters read because there is no leading whitespace)
//          ^
// Step 2: "4193 with words" (no characters read because there is neither a '-' nor '+')
//          ^
// Step 3: "4193 with words" ("4193" is read in; reading stops because the next character is a non-digit)
//              ^
// The parsed integer is 4193.
// Since 4193 is in the range [-231, 231 - 1], the final result is 4193.
 

// Constraints:

// 0 <= s.length <= 200
// s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'.

var myAtoi = function(s) {
    let numbers = '0123456789'
    let sign = 1
    let res = 0 //if no digits were read, the res is 0

    while(s[0] === ' '){ //trimming
        s = s.slice(1)
    }

    if(s[0] === '-' || s[0] === '+'){ //read sign
        if(s[0] === '-'){
            sign = -sign
        }
        s = s.slice(1)
    }

    let inRange = true
    while(numbers.includes(s[0]) && inRange){ //parse numbers
        res = res*10
        res += Number(s[0])
        s = s.slice(1)

        if(res > 2**31 - 1 && sign === 1){ //check range 
            res = 2**31 - 1
            inRange = false
        }
        if(res > 2**31 && sign === -1){ //check range
            res = 2**31
            inRange = false
        }
    }

    return res * sign
};

// console.log(myAtoi('-42')) // -42

//======================================================
// https://leetcode.com/problems/median-of-two-sorted-arrays/
// Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

// The overall run time complexity should be O(log (m+n)).

 

// Example 1:

// Input: nums1 = [1,3], nums2 = [2]
// Output: 2.00000
// Explanation: merged array = [1,2,3] and median is 2.
// Example 2:

// Input: nums1 = [1,2], nums2 = [3,4]
// Output: 2.50000
// Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 

// Constraints:

// nums1.length == m
// nums2.length == n
// 0 <= m <= 1000
// 0 <= n <= 1000
// 1 <= m + n <= 2000
// -106 <= nums1[i], nums2[i] <= 106

var findMedianSortedArrays = function(nums1, nums2) {
    //knowing the length of nums1 and nums2 and let Sl the sum of the lengths, we can conclude the median is at the index Math.floor(Sl/2) for an odd Sl and indices ( (Sl/2)-1 + sl/2 ) / 2 for an even Sl
    //We will find these values by keeping having a pointer on each array increasing as we build the merged array

    let sumLength = nums1.length + nums2.length

    if(sumLength%2 === 0){ //even total length : mean of the median elements
        let targetIdx1 = sumLength/2 - 1
        let targetIdx2 = sumLength/2
        let pointer1 = 0
        let pointer2 = 0
        let mergedArray = []
        while(mergedArray.length <= (sumLength/2 + 1) ){
            if(nums1[pointer1] !== undefined && nums2[pointer2] !== undefined){ // if they are both defined, take the smallest of the two, else just take the one that is defined
                if(nums1[pointer1] >= nums2[pointer2]){
                    mergedArray.push(nums2[pointer2])
                    pointer2++
                }else{
                    mergedArray.push(nums1[pointer1])
                    pointer1++
                }
            }else{
                if(nums1[pointer1] !== undefined){
                    mergedArray.push(nums1[pointer1])
                    pointer1++
                }else{
                    mergedArray.push(nums2[pointer2])
                    pointer2++
                }
            }
        }
        return (mergedArray[targetIdx1] + mergedArray[targetIdx2] ) / 2

    }else{ //odd total length
        let targetIdx = Math.floor(sumLength/2)
        let pointer1 = 0
        let pointer2 = 0
        let mergedArray = []
        while(mergedArray.length < Math.ceil(sumLength/2)){
            if(nums1[pointer1] !== undefined && nums2[pointer2] !== undefined){ // if they are both defined, take the smallest of the two, else just take the one that is defined
                if(nums1[pointer1] >= nums2[pointer2]){
                    mergedArray.push(nums2[pointer2])
                    pointer2++
                }else{
                    mergedArray.push(nums1[pointer1])
                    pointer1++
                }
            }else{
                if(nums1[pointer1] !== undefined){
                    mergedArray.push(nums1[pointer1])
                    pointer1++
                }else{
                    mergedArray.push(nums2[pointer2])
                    pointer2++
                }
            }
        }
        return mergedArray[targetIdx]
    }
};

// console.log(findMedianSortedArrays([1,3] , [2])); // 2
// console.log(findMedianSortedArrays([1,2] , [3,4])); // 2.5

//It works but there is room for improvement : we can do without storing the mergedArray

var findMedianSortedArraysBis = function(nums1, nums2) {
    let sumLength = nums1.length + nums2.length
    if(sumLength%2 === 0){ //even total length : mean of the median elements
        let currIdx = 0
        let current
        let before
        let pointer1 = 0
        let pointer2 = 0
        while(currIdx <= sumLength/2){
            before = current
            if(nums1[pointer1] !== undefined && nums2[pointer2] !== undefined){ // if they are both defined, take the smallest of the two, else just take the one that is defined
                if(nums1[pointer1] >= nums2[pointer2]){
                    current = nums2[pointer2]
                    pointer2++
                }else{
                    current = nums1[pointer1]
                    pointer1++
                }
            }else{
                if(nums1[pointer1] !== undefined){
                    current = nums1[pointer1]
                    pointer1++
                }else{
                    current = nums2[pointer2]
                    pointer2++
                }
            }
            currIdx++
        }
        return (current + before) / 2
    }else{ //odd total length
        let currIdx = 0
        let pointer1 = 0
        let pointer2 = 0
        let current
        while(currIdx <= Math.floor(sumLength/2)){
            if(nums1[pointer1] !== undefined && nums2[pointer2] !== undefined){ // if they are both defined, take the smallest of the two, else just take the one that is defined
                if(nums1[pointer1] >= nums2[pointer2]){
                    current = nums2[pointer2]
                    pointer2++
                }else{
                    current = nums1[pointer1]
                    pointer1++
                }
            }else{
                if(nums1[pointer1] !== undefined){
                    current = nums1[pointer1]
                    pointer1++
                }else{
                    current = nums2[pointer2]
                    pointer2++
                }
            }
            currIdx++
        }

        return current
    }
}

// console.log(findMedianSortedArraysBis([1,3] , [2])); // 2
// console.log(findMedianSortedArraysBis([1,2] , [3,4])); // 2.5

//==================================================
// https://leetcode.com/problems/palindrome-number/description/
// Given an integer x, return true if x is a 
// palindrome
// , and false otherwise.

 

// Example 1:

// Input: x = 121
// Output: true
// Explanation: 121 reads as 121 from left to right and from right to left.
// Example 2:

// Input: x = -121
// Output: false
// Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
// Example 3:

// Input: x = 10
// Output: false
// Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
 

// Constraints:

// -231 <= x <= 231 - 1
 

// Follow up: Could you solve it without converting the integer to a string?

var isPalindrome = function(x) {
    if(x < 0){
        return false
    }else{
        let rev = 0
        let cpy = x
        while(cpy > 0){
            rev = rev * 10
            rev += cpy%10
            cpy = Math.floor(cpy/10)
        }
        return rev === x
    }
}

// console.log(isPalindrome(121));
// console.log(isPalindrome(122));

//=========================================================
