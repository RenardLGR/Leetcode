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
// https://leetcode.com/problems/regular-expression-matching/
// Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

// '.' Matches any single character.​​​​
// '*' Matches zero or more of the preceding element.
// The matching should cover the entire input string (not partial).

 

// Example 1:

// Input: s = "aa", p = "a"
// Output: false
// Explanation: "a" does not match the entire string "aa".
// Example 2:

// Input: s = "aa", p = "a*"
// Output: true
// Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
// Example 3:

// Input: s = "ab", p = ".*"
// Output: true
// Explanation: ".*" means "zero or more (*) of any character (.)".
 

// Constraints:

// 1 <= s.length <= 20
// 1 <= p.length <= 30
// s contains only lowercase English letters.
// p contains only lowercase English letters, '.', and '*'.
// It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.

var isMatchTer = function(text, pattern) {
    if (pattern.length === 0) return text.length === 0;
    let firstMatch = (text.length !== 0 && (pattern[0] === text[0] || pattern[0] === '.'));

    if (pattern.length >= 2 && pattern[1] === '*') {
        return (isMatchTer(text, pattern.slice(2)) || 
                (firstMatch && isMatchTer(text.slice(1), pattern)));
    } else {
        return firstMatch && isMatchTer(text.slice(1), pattern.slice(1));
    }
};

// console.log(isMatchTer('zxy', 'abc')) // false
// console.log(isMatchTer('abz', 'abc')) // false
// console.log(isMatchTer('abc', 'abc')); // true
// console.log(isMatchTer('abc', 'abce')); // false
// console.log(isMatchTer('a', 'ab*')); // true
// console.log(isMatchTer('abcdddde', 'abcd*e')); // true
// console.log(isMatchTer('abcdef', 'abcd*f')); // false
// console.log(isMatchTer('abcdee', 'abcde*')); // true
// console.log(isMatchTer('aaaa', 'a.*aaa')); // true
// console.log(isMatchTer('abcdzy', 'ab.*zy')); // true
// console.log(isMatchTer('abcdzy', '.*zy')); // true

const isMatchQuater = (string, pattern) => {
    // early return when pattern is empty
    if (!pattern) {
		// returns true when string and pattern are empty
		// returns false when string contains chars with empty pattern
        return !string;
    }
    
	// check if the current char of the string and pattern match when the string has chars
    const hasFirstCharMatch = Boolean(string) && (pattern[0] === '.' || pattern[0] === string[0]);

    // track when the next character * is next in line in the pattern
    if (pattern[1] === '*') {
        // if next pattern match (after *) is fine with current string, then proceed with it (s, p+2).  That's because the current pattern may be skipped.
        // otherwise check hasFirstCharMatch. That's because if we want to proceed with the current pattern, we must be sure that the current pattern char matches the char
		// If hasFirstCharMatch is true, then do the recursion with next char and current pattern (s+1, p).  That's because current char matches the pattern char. 
        return (
            isMatchQuater(string, pattern.slice(2)) || 
            (hasFirstCharMatch && isMatchQuater(string.slice(1), pattern))
        );
    }
    
    // now we know for sure that we need to do 2 simple actions
	// check the current pattern and string chars
	// if so, then can proceed with next string and pattern chars (s+1, p+1)
    return hasFirstCharMatch ? isMatchQuater(string.slice(1), pattern.slice(1)) : false;
};

// console.log(isMatchTer('zxy', 'abc')) // false
// console.log(isMatchTer('abz', 'abc')) // false
// console.log(isMatchTer('abc', 'abc')); // true
// console.log(isMatchTer('abc', 'abce')); // false
// console.log(isMatchTer('a', 'ab*')); // true
// console.log(isMatchTer('abcdddde', 'abcd*e')); // true
// console.log(isMatchTer('abcdef', 'abcd*f')); // false
// console.log(isMatchTer('abcdee', 'abcde*')); // true
// console.log(isMatchTer('aaaa', 'a.*aaa')); // true
// console.log(isMatchTer('abcdzy', 'ab.*zy')); // true
// console.log(isMatchTer('abcdzy', '.*zy')); // true
//=====================================================
// https://leetcode.com/problems/container-with-most-water/
// You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

// Find two lines that together with the x-axis form a container, such that the container contains the most water.

// Return the maximum amount of water a container can store.

// Notice that you may not slant the container.

// Example 1:

// Input: height = [1,8,6,2,5,4,8,3,7]
// Output: 49
// Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49. Because we can create a box between col 8 and col 7 of length 7 and max height 7.
// Example 2:

// Input: height = [1,1]
// Output: 1
 

// Constraints:

// n == height.length
// 2 <= n <= 105
// 0 <= height[i] <= 104

var maxArea = function(height) {
    // naive : length between i and j multiplied by min(height[i], height[j]) : (j-i)*min(height[i], height[j])
    let volMax = 0
    for(let i=0 ; i<height.length ; i++){
        for(let j=i+1 ; j<height.length ; j++){
            let temp = (j-i) * Math.min(height[i], height[j])
            if(temp > volMax){
                volMax = temp
            }
        }
    }

    return volMax
}

// console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49
//Too long

//Improvement : keep track of the minHeight, if (height[j] < minHeight), no need to even bother trying, it won't work

var maxAreaBis = function(height) {
    // naive : length between i and j multiplied by min(height[i], height[j]) : (j-i)*min(height[i], height[j])
    // Improvement : keep track of the minHeight, if (height[j] < minHeight), no need to even bother trying, it won't work
    let volMax = 0
    let minHeight = 0
    for(let i=0 ; i<height.length ; i++){
        if(height[i] < minHeight){
            continue
        }
        for(let j=i+1 ; j<height.length ; j++){
            let temp = (j-i) * Math.min(height[i], height[j])
            if(temp > volMax){
                volMax = temp
                minHeight = Math.min(height[i], height[j])
            }
        }
    }

    return volMax
}

// console.log(maxAreaBis([1,8,6,2,5,4,8,3,7])); // 49

//============================================
// https://leetcode.com/problems/middle-of-the-linked-list/description/
// Given the head of a singly linked list, return the middle node of the linked list.

// If there are two middle nodes, return the second middle node.

// Example 1:
// Input: head = [1,2,3,4,5]
// Output: [3,4,5]
// Explanation: The middle node of the list is node 3.

// Example 2:
// Input: head = [1,2,3,4,5,6]
// Output: [4,5,6]
// Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.
 

// Constraints:

// The number of nodes in the list is in the range [1, 100].
// 1 <= Node.val <= 100

//Naive : run through the whole linked list keeping track of its length ; run through again stoping at length/2

// Efficient : use two pointers, one running one by one, the other running two by two, when the fats pointer reaches the end, the first one is at the middle.

var middleNode = function(head) {
    let fast = head
    let slow = head

    while(fast.next !== null){
        fast = fast.next
        if(fast.next !== null){
            fast = fast.next
        }
        slow = slow.next
    }

    return slow
};

var middleNodeBis = function(head){
    let fast = head
    let slow = head

    while(fast && fast.next){
        fast = fast.next.next
        slow = slow.next
    }

    return slow
}

//========================================
// https://leetcode.com/problems/integer-to-roman/

// Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

// Symbol       Value
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

// Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

// I can be placed before V (5) and X (10) to make 4 and 9. 
// X can be placed before L (50) and C (100) to make 40 and 90. 
// C can be placed before D (500) and M (1000) to make 400 and 900.
// Given an integer, convert it to a roman numeral.

 

// Example 1:

// Input: num = 3
// Output: "III"
// Explanation: 3 is represented as 3 ones.
// Example 2:

// Input: num = 58
// Output: "LVIII"
// Explanation: L = 50, V = 5, III = 3.
// Example 3:

// Input: num = 1994
// Output: "MCMXCIV"
// Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
 

// Constraints:

// 1 <= num <= 3999

var intToRoman = function(num) {
    //num is lesser or equal than 3999
    let n = num
    let thousands = Math.floor(n/1000)
    n = n-1000*thousands
    let hundreds = Math.floor(n/100)
    n= n-100*hundreds
    let tens = Math.floor(n/10)
    let units = n-10*tens

    let res = ''
    res+= 'M'.repeat(thousands)
    res+= (hundreds===9 ? 'CM' : hundreds>=5 ? 'D'+'C'.repeat(hundreds-5) : hundreds===4 ? 'CD' : 'C'.repeat(hundreds))
    res+= (tens===9 ? 'XC' : tens>=5 ? 'L'+'X'.repeat(tens-5) : tens===4 ? 'XL' : 'X'.repeat(tens))
    res+= (units===9 ? 'IX' : units>=5 ? 'V'+'I'.repeat(units-5) : units===4 ? 'IV' : 'I'.repeat(units))
    return res
};

function intToRomanBis(num) {
    const val = [1000,900,500,400,100,90,50,40,10,9,5,4,1]
    const rom = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]

    let res = ''
    for(let i=0 ; i<val.length ; i++){
        while(num >= val[i]){
            res += rom[i]
            num -= val[i]
        }
    }

    return res
}

// console.log(intToRomanBis(1994)); // MCMXCIV

//============================================
// https://leetcode.com/problems/roman-to-integer/
// Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

// Symbol       Value
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

// Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

// I can be placed before V (5) and X (10) to make 4 and 9. 
// X can be placed before L (50) and C (100) to make 40 and 90. 
// C can be placed before D (500) and M (1000) to make 400 and 900.
// Given a roman numeral, convert it to an integer.

 

// Example 1:

// Input: s = "III"
// Output: 3
// Explanation: III = 3.
// Example 2:

// Input: s = "LVIII"
// Output: 58
// Explanation: L = 50, V= 5, III = 3.
// Example 3:

// Input: s = "MCMXCIV"
// Output: 1994
// Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
 

// Constraints:

// 1 <= s.length <= 15
// s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').
// It is guaranteed that s is a valid roman numeral in the range [1, 3999].

var romanToInt = function(s) {
    // let roman = {
    //     I:1,
    //     IV:4,
    //     V:5,
    //     IX:9,
    //     X:10,
    //     XL:40,
    //     L:50,
    //     XC:90,
    //     C:100,
    //     CD:400,
    //     D:500,
    //     CM:900,
    //     M:1000
    // }

    let res = 0

    while(s[0]==='M'){ //this handles the thousands
        res+=1000
        s = s.slice(1)
    }

    //hundreds
    if(s.slice(0, 2) === 'CM'){
        res+=900
        s = s.slice(2)
    }else if(s.slice(0, 2) === 'CD'){
        res+=400
        s = s.slice(2)
    }else if(s.slice(0, 1) === 'D'){
        res+=500
        s = s.slice(1)
    }

    while(s[0]==='C'){ //this handles the hundreds in the cases of 100, 200, 300, 600, 700, 800
        res+=100
        s = s.slice(1)
    }

    //tens
    if(s.slice(0, 2) === 'XC'){
        res+=90
        s = s.slice(2)
    }else if(s.slice(0, 2) === 'XL'){
        res+=40
        s = s.slice(2)
    }else if(s.slice(0, 1) === 'L'){
        res+=50
        s = s.slice(1)
    }

    while(s[0]==='X'){ //this handles the tens in the cases of 10, 20, 30, 60, 70, 80
        res+=10
        s = s.slice(1)
    }

    //units
    if(s.slice(0, 2) === 'IX'){
        res+=9
        s = s.slice(2)
    }else if(s.slice(0, 2) === 'IV'){
        res+=4
        s = s.slice(2)
    }else if(s.slice(0, 1) === 'V'){
        res+=5
        s = s.slice(1)
    }

    while(s[0]==='I'){ //this handles the tens in the cases of 1, 2, 3, 6, 7, 8
        res+=1
        s = s.slice(1)
    }

    return res
};


function romanToIntBis(s) {
    const val = [1000,900,500,400,100,90,50,40,10,9,5,4,1]
    const rom = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]

    let res = 0
    while(s.length > 0){
        let cur = s.slice(0, 2)

        if(rom.includes(cur)){
            res += val[rom.indexOf(cur)]
            s = s.slice(2)
        }else{
            cur = s.slice(0, 1)
            res += val[rom.indexOf(cur)]
            s = s.slice(1)
        }
    }

    return res
}

// console.log(romanToIntBis("MCMXCIV")); // 1994