const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//==========================================
// https://leetcode.com/problems/count-and-say/
// The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

// countAndSay(1) = "1"
// countAndSay(n) is the way you would "say" the digit string from countAndSay(n-1), which is then converted into a different digit string.
// To determine how you "say" a digit string, split it into the minimal number of substrings such that each substring contains exactly one unique digit. Then for each substring, say the number of digits, then say the digit. Finally, concatenate every said digit.

// For example, the saying and conversion for digit string "3322251":


// Given a positive integer n, return the nth term of the count-and-say sequence.


// Example 1:
// Input: n = 1
// Output: "1"
// Explanation: This is the base case.

// Example 2:
// Input: n = 4
// Output: "1211"
// Explanation:
// countAndSay(1) = "1"
// countAndSay(2) = say "1" = one 1 = "11"
// countAndSay(3) = say "11" = two 1's = "21"
// countAndSay(4) = say "21" = one 2 + one 1 = "12" + "11" = "1211"

// Constraints:

// 1 <= n <= 30

var countAndSay = function(n) {
    if(n === 1) return "1"

    let temp = "1"

    for(let i=1 ; i<n ; i++){
        temp = convert(temp)
    }

    return temp

    function convert(s){
        // "3322251" => "23 32 15 11" (no spaces)
        let res = ""
        for(let i=0 ; i<s.length ; i++){
            let num = s[i]
            let nTimes = 1
            let j = i + 1
            while(s[j] === s[i]){
                nTimes++
                j++
            }
            res += nTimes + num
            i = j-1
        }

        return res
    }
    // console.log(convert("1")); // "11"
    // console.log(convert("3322251")); // "23321511"
};

// console.log(countAndSay(1)); // "1"
// console.log(countAndSay(2)); // "11"
// console.log(countAndSay(3)); // "21"
// console.log(countAndSay(4)); // "1211"

//============================================
