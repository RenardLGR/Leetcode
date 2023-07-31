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
// https://leetcode.com/problems/combination-sum/
// Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

// The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the 
// frequency
//  of at least one of the chosen numbers is different.

// The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

// Example 1:
// Input: candidates = [2,3,6,7], target = 7
// Output: [[2,2,3],[7]]
// Explanation:
// 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
// 7 is a candidate, and 7 = 7.
// These are the only two combinations.

// Example 2:
// Input: candidates = [2,3,5], target = 8
// Output: [[2,2,2,2],[2,3,3],[3,5]]
// Example 3:

// Input: candidates = [2], target = 1
// Output: []
 

// Constraints:

// 1 <= candidates.length <= 30
// 2 <= candidates[i] <= 40
// All elements of candidates are distinct.
// 1 <= target <= 40

var combinationSum = function(candidates, target) {
    let res = []
    solve([], candidates, 0)
    return res

    function solve(inProgress, remaining, sum){
        if(sum === target){
            res.push(inProgress.slice())
            return
        }

        if(sum > target){
            return
        }

        for(let i=0 ; i<remaining.length ; i++){
            solve([...inProgress, remaining[i]], remaining.slice(i), sum+remaining[i])
        }
    }
};

// console.log(combinationSum([2,3,6,7], 7)); // [ [ 2, 2, 3 ], [ 7 ] ]
// console.log(combinationSum([2,3,5], 8)); // [ [ 2, 2, 2, 2 ], [ 2, 3, 3 ], [ 3, 5 ] ]
// console.log(combinationSum([2] , 1)); // []

var combinationSumBis = function(candidates, target) {
    let res = []
    solve([], candidates, 0)
    return res

    function solve(inProgress, remaining, sum){
        if(sum === target){
            res.push(inProgress.slice())
            return
        }

        for(let i=0 ; i<remaining.length ; i++){
            let newSum = sum+remaining[i]
            if(newSum <= target){
                solve([...inProgress, remaining[i]], remaining.slice(i), sum+remaining[i])
            }
        }
    }
};

// console.log(combinationSumBis([2,3,6,7], 7)); // [ [ 2, 2, 3 ], [ 7 ] ]
// console.log(combinationSumBis([2,3,5], 8)); // [ [ 2, 2, 2, 2 ], [ 2, 3, 3 ], [ 3, 5 ] ]
// console.log(combinationSumBis([2] , 1)); // []

function combinationSumTer(candidates, target){
    let res = []
    solve([], 0, 0)
    return res

    function solve(inProgress, start, sum){
        if(sum === target){
            res.push(inProgress.slice())
            return
        }

        for(let i=start ; i<candidates.length ; i++){
            let newSum = sum + candidates[i]
            if(newSum <= target){
                solve([...inProgress, candidates[i]], i, newSum)
            }
        }
    }
}

// console.log(combinationSumTer([2,3,6,7], 7)); // [ [ 2, 2, 3 ], [ 7 ] ]
// console.log(combinationSumTer([2,3,5], 8)); // [ [ 2, 2, 2, 2 ], [ 2, 3, 3 ], [ 3, 5 ] ]
// console.log(combinationSumTer([2] , 1)); // []


//==================================================
// https://leetcode.com/problems/combination-sum-ii/
// Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

// Each number in candidates may only be used once in the combination.

// Note: The solution set must not contain duplicate combinations.

// Example 1:
// Input: candidates = [10,1,2,7,6,1,5], target = 8
// Output: 
// [ [1,1,6], [1,2,5], [1,7], [2,6] ]

// Example 2:
// Input: candidates = [2,5,2,1,2], target = 5
// Output: 
// [[1,2,2], [5]]

// Constraints:
// 1 <= candidates.length <= 100
// 1 <= candidates[i] <= 50
// 1 <= target <= 30

var combinationSum2 = function(candidates, target) {
    let res = []
    solve([], candidates, 0)

    //remove duplicates
    let set = new Set(res.map(subarr => subarr.join(',')))
    return Array.from(set).map(el => el.split(',').map(dig => +dig))

    function solve(inProgress, remaining, sum){
        if(sum === target){
            res.push(inProgress.slice().sort())
            return
        }

        if(sum > target){
            return
        }

        for(let i=0 ; i<remaining.length ; i++){
            solve([...inProgress, remaining[i]], remaining.slice(i+1), sum+remaining[i])
        }
    }
};

// console.log(combinationSum2([10,1,2,7,6,1,5], 8)); // [ [1,1,6], [1,2,5], [1,7], [2,6] ]
// console.log(combinationSum2([2,5,2,1,2], 5)); // [[1,2,2], [5]]

//Can we do better for the duplicates ?

function combinationSum2Bis(candidates, target){
    let res = {}
    solve([], candidates, 0)

    return Object.keys(res).map(s => s.split(',').map(d => +d))

    function solve(inProgress, remaining, sum){
        if(sum === target){
            let stringified = inProgress.slice().sort().join(',')
            res[stringified] = true
            return
        }

        if(sum > target){
            return
        }

        for(let i=0 ; i<remaining.length ; i++){
            solve([...inProgress, remaining[i]], remaining.slice(i+1), sum+remaining[i])
        }
    }
}

// console.log(combinationSum2Bis([10,1,2,7,6,1,5], 8)); // [ [1,1,6], [1,2,5], [1,7], [2,6] ]
// console.log(combinationSum2Bis([2,5,2,1,2], 5)); // [[1,2,2], [5]]
// console.log(combinationSum2Bis([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 30)) // too long

function combinationSum2Ter(candidates, target){
    //This version is specifically targeted against the very long and very repeating candidates, I have lost track of the complexity tbh
    let freq = candidates.reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})
    console.log("freq",freq);
    let set = Object.keys(freq).map(d => +d)
    console.log("set:", set);
    let res = {}
    solve([], 0, 0)

    return Object.keys(res).map(s => s.split(',').map(d => +d))

    function solve(inProgress, start, sum){
        // console.log("inProgress:", inProgress, "start:", start, "sum:", sum);
        if(sum === target){
            // console.log(inProgress);
            let stringified = inProgress.slice().sort().join(',')
            res[stringified] = true
            return
        }

        if(sum > target){
            return
        }

        //try each element of the set
        for(let i=start ; i<set.length ; i++){
            //try with various duplications
            for(let j=1 ; j<=freq[''+set[i]] ; j++){
                // console.log(Array(j).fill(set[i]));
                // console.log("j", j);
                let newInP = inProgress.concat(Array(j).fill(set[i]))
                let newSum = sum + set[i]*j
                console.log("inProgress is", newInP, "trying with repeating", set[i], j,"times, remaining is", set.slice(i+1), "sum is now", newSum)
                // console.log("i:", i, "j:", j);
                solve(newInP, i+1, newSum)
            }
        }
    }
}

// console.log(combinationSum2Ter([1,2], 4)); // []
// console.log(combinationSum2Ter([10,1,2,7,6,1,5], 8)); // [ [1,1,6], [1,2,5], [1,7], [2,6] ]
// console.log(combinationSum2Ter([2,5,2,1,2], 5)); // [[1,2,2], [5]]
// console.log(combinationSum2Ter([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 30)) // [1,1,... x30]
// console.log(combinationSum2Ter([14,6,25,9,30,20,33,34,28,30,16,12,31,9,9,12,34,16,25,32,8,7,30,12,33,20,21,29,24,17,27,34,11,17,30,6,32,21,27,17,16,8,24,12,12,28,11,33,10,32,22,13,34,18,12], 27)); //works


function combinationSum2Quater(candidates, target){
    let res = []
    let sorted = candidates.sort((a,b) => a-b)
    solve([], 0, sorted)

    return res

    function solve(inProgress, sum, remaining){
        if(sum === target){
            res.push(inProgress.slice())
            return
        }

        if(sum > target){
            return
        }

        for(let i=0 ; i<remaining.length ; i++){
            let newInP  = inProgress.concat(remaining[i])
            let newSum = sum + remaining[i]
            let newRemaining =  remaining.slice(i+1)

            solve(newInP, newSum, newRemaining)
            // Skip duplicates to avoid duplicate combinations
            while(remaining[i+1] === remaining[i]){
                i++
            }
        }
    }
}

// console.log(combinationSum2Quater([1,2], 4)); // []
// console.log(combinationSum2Quater([10,1,2,7,6,1,5], 8)); // [ [1,1,6], [1,2,5], [1,7], [2,6] ]
// console.log(combinationSum2Quater([2,5,2,1,2], 5)); // [[1,2,2], [5]]
// console.log(combinationSum2Quater([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 30)) // [1,1,... x30]
// console.log(combinationSum2Quater([14,6,25,9,30,20,33,34,28,30,16,12,31,9,9,12,34,16,25,32,8,7,30,12,33,20,21,29,24,17,27,34,11,17,30,6,32,21,27,17,16,8,24,12,12,28,11,33,10,32,22,13,34,18,12], 27)); //works


// Cleanest :
function combinationSum2Quinquies(candidates, target){
    let res = []
    let sorted = candidates.sort((a,b) => a-b)

    solve([], 0, 0)

    return res

    function solve(inProgress, start, sum){
        if(sum > target) return
        if(sum === target){
            res.push(inProgress)
            return
        }

        for(let i=start ; i<sorted.length ; i++){
            // no duplicates
            if(i !== start && sorted[i] === sorted[i-1]) continue
            solve([...inProgress, sorted[i]], i+1, sum+sorted[i])
        }
    }
}

// console.log(combinationSum2Quinquies([1,2], 4)); // []
// console.log(combinationSum2Quinquies([10,1,2,7,6,1,5], 8)); // [ [1,1,6], [1,2,5], [1,7], [2,6] ]
// console.log(combinationSum2Quinquies([2,5,2,1,2], 5)); // [[1,2,2], [5]]
// console.log(combinationSum2Quinquies([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 30)) // [1,1,... x30]
// console.log(combinationSum2Quinquies([14,6,25,9,30,20,33,34,28,30,16,12,31,9,9,12,34,16,25,32,8,7,30,12,33,20,21,29,24,17,27,34,11,17,30,6,32,21,27,17,16,8,24,12,12,28,11,33,10,32,22,13,34,18,12], 27)); //works

//Backtracking : (actually fastest, we don't create a new array at each recursive call)
function combinationSum2Sexies(candidates, target){
    let res = []
    let sorted = candidates.sort((a,b) => a-b)

    solve([], 0, 0)

    return res

    function solve(inProgress, start, sum){
        if(sum > target) return
        if(sum === target){
            res.push(inProgress.slice())
            return
        }

        for(let i=start ; i<sorted.length ; i++){
            // no duplicates
            if(i !== start && sorted[i] === sorted[i-1]) continue
            inProgress.push(sorted[i])
            solve(inProgress, i+1, sum+sorted[i])
            inProgress.pop()
        }
    }
}

// console.log(combinationSum2Sexies([1,2], 4)); // []
// console.log(combinationSum2Sexies([10,1,2,7,6,1,5], 8)); // [ [1,1,6], [1,2,5], [1,7], [2,6] ]
// console.log(combinationSum2Sexies([2,5,2,1,2], 5)); // [[1,2,2], [5]]
// console.log(combinationSum2Sexies([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 30)) // [1,1,... x30]
// console.log(combinationSum2Sexies([14,6,25,9,30,20,33,34,28,30,16,12,31,9,9,12,34,16,25,32,8,7,30,12,33,20,21,29,24,17,27,34,11,17,30,6,32,21,27,17,16,8,24,12,12,28,11,33,10,32,22,13,34,18,12], 27)); //works

//==============================================
// https://leetcode.com/problems/first-missing-positive/
// Given an unsorted integer array nums, return the smallest missing positive integer.

// You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.


// Example 1:
// Input: nums = [1,2,0]
// Output: 3
// Explanation: The numbers in the range [1,2] are all in the array.

// Example 2:
// Input: nums = [3,4,-1,1]
// Output: 2
// Explanation: 1 is in the array but 2 is missing.

// Example 3:
// Input: nums = [7,8,9,11,12]
// Output: 1
// Explanation: The smallest positive integer 1 is missing.
 

// Constraints:

// 1 <= nums.length <= 105
// -231 <= nums[i] <= 231 - 1


// Can't think of a way in O(1) space complexity nor O(n) time complexity (this is O(2n) so not that bad)
var firstMissingPositive = function(nums) {
    let isPresent = [0] //initialize at 0 so we return 1 if we can't add any element to isPresent

    for(let i=0 ; i<nums.length ; i++){
        if(nums[i] > 0){
            isPresent[nums[i]] = true
        }
    }
    //isPresent will have for last element the maximum of nums and a length of maximum of nums - 1

    for(let i=0 ; i<isPresent.length ; i++){
        if(i !== 0 && isPresent[i] === undefined) return i
    }
    //if every element of isPresent is defined, we want the last element + 1 ; i.e. isPresent.length
    return isPresent.length
}

// console.log(firstMissingPositive([1,2,0])); // 3
// console.log(firstMissingPositive([3,4,-1,1])); // 2
// console.log(firstMissingPositive([7,8,9,11,12])); // 1
// console.log(firstMissingPositive([0])); // 1
// console.log(firstMissingPositive([-1,-5,-2,-4])); // 1

//Do we actually need to loop through isPresent to find the first non present element ?
//We will loop through isPresent as we go
//This function initialize firstMissing at 1, each time, it will check if isPresent[firstMissing] exists, if so it will try with the next one
function firstMissingPositiveBis(nums){
    let isPresent = [0] //initialize at 0 so we return 1 if we can't add any element to isPresent
    let firstMissing = 1 //initialized at 1, if later I find a 1, try with 2, and 3, and so on

    for(let i=0 ; i<nums.length ; i++){
        if(nums[i] > 0){
            isPresent[nums[i]] = true

            while(isPresent[firstMissing]){
                firstMissing++
            }
        }
    }

    return firstMissing
}

// console.log(firstMissingPositiveBis([1,2,0])); // 3
// console.log(firstMissingPositiveBis([3,4,-1,1])); // 2
// console.log(firstMissingPositiveBis([7,8,9,11,12])); // 1
// console.log(firstMissingPositiveBis([0])); // 1
// console.log(firstMissingPositiveBis([-1,-5,-2,-4])); // 1

//Indeed slightly faster

function firstMissingPositiveTer(nums){
    nums.push(0) // I want at least a 0 in every arrays, so fistMissing can normally start (push is O(1) complexity)
    let firstMissing = 1
    let maxLength = nums.length //nums will have a length corresponding to its biggest element, we actually want to loop only through the element given
    for(let i=0 ; i<maxLength ; i++){
        //check if we can increase firstMissing and do it if possible
        while(nums[firstMissing] === firstMissing){
            firstMissing++
        }

        //Put every number at its index, ignore negative numbers
        if(nums[i] >= 0){
            let temp = nums[i] //this number will go at its index
            do{
                //switching
                let tempVal = nums[temp] //save the element we are about to replace with its index
                nums[temp] = temp //replace the element with its index
                temp = tempVal //repeat, now we want to place the element we saved and place it at its index, unless the element we saved is undefined (numbered saved was greater than nums.length-1), negative, or already at its place (prevent infinite looping and takes care of duplicates)

            }
            while(temp !== undefined && temp !== nums[temp] && temp >= 0)

        }
    }
    // console.log(nums);
    return firstMissing
}

// console.log(firstMissingPositiveTer([1,2,0])); // 3
// console.log(firstMissingPositiveTer([3,4,-1,1])); // 2
// console.log(firstMissingPositiveTer([3,1,4,2])); // 5
// console.log(firstMissingPositiveTer([7,8,9,11,12])); // 1
// console.log(firstMissingPositiveTer([0])); // 1
// console.log(firstMissingPositiveTer([-1,-5,-2,-4])); // 1
// console.log(firstMissingPositiveTer([1])); // 2
// console.log(firstMissingPositiveTer([5])); // 1
// console.log(firstMissingPositiveTer([0,2,2,1,1])); // 3
// console.log(firstMissingPositiveTer([2147483647])); // 1

function firstMissingPositiveQuater(nums){
    nums.push(0) // I want at least a 0 in every arrays, so fistMissing can normally start (push is O(1) complexity)
    let firstMissing = 1
    let maxLength = nums.length //nums will have a length corresponding to its biggest element, we actually want to loop only through the element given
    for(let i=0 ; i<maxLength ; i++){
        //check if we can increase firstMissing and do it if possible
        while(nums[firstMissing] === firstMissing){
            firstMissing++
        }

        //Put every number at its index, ignore negative numbers, ignore huge numbers too
        if(nums[i] >= 0 && nums[i] <= maxLength){
            let temp = nums[i] //this number will go at its index
            do{
                //switching
                let tempVal = nums[temp] //save the element we are about to replace with its index
                nums[temp] = temp //replace the element with its index
                temp = tempVal //repeat, now we want to place the element we saved and place it at its index, unless the element we saved is undefined (numbered saved was greater than nums.length-1), negative, already at its place (prevent infinite looping and takes care of duplicates), or too big to make a difference

            }
            while(temp !== undefined && temp !== nums[temp] && temp >= 0 && temp <= maxLength)

        }
    }
    console.log(nums);
    return firstMissing
}

// console.log(firstMissingPositiveQuater([1,2,0])); // 3
// console.log(firstMissingPositiveQuater([3,4,-1,1])); // 2
// console.log(firstMissingPositiveQuater([3,1,4,2])); // 5
// console.log(firstMissingPositiveQuater([7,8,9,11,12])); // 1
// console.log(firstMissingPositiveQuater([0])); // 1
// console.log(firstMissingPositiveQuater([-1,-5,-2,-4])); // 1
// console.log(firstMissingPositiveQuater([1])); // 2
// console.log(firstMissingPositiveQuater([5])); // 1
// console.log(firstMissingPositiveQuater([0,2,2,1,1])); // 3
// console.log(firstMissingPositiveQuater([2147483647])); // 1
// console.log(firstMissingPositiveQuater([2147483647, 5, -1000, 25255])); // 1

