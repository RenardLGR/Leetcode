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
// https://leetcode.com/problems/3sum/
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

// Notice that the solution set must not contain duplicate triplets.

 

// Example 1:

// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation: 
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.
// Example 2:

// Input: nums = [0,1,1]
// Output: []
// Explanation: The only possible triplet does not sum up to 0.
// Example 3:

// Input: nums = [0,0,0]
// Output: [[0,0,0]]
// Explanation: The only possible triplet sums up to 0.
 

// Constraints:

// 3 <= nums.length <= 3000
// -105 <= nums[i] <= 105

var threeSum = function(nums) {
    //Check every combinations of 3
    //Keep those with a sum equal to zero and are not already found

    // Note: We will store the results as a 3 sorted numbers-long String sparated by : so the unicity of each triplets can be easily found.

    let res = []
    solve([], nums, 0)

    return res.map(tri => tri.split(':').map(c => +c))

    function solve(inProgress, workingArr, len){
        // Base/Exit case
        if(len===3){
            //If the sum is equal to 0
            if(inProgress.reduce((acc, cur)=>acc+cur,0)===0){
                let possibleTriplet = inProgress.sort((a,b) => a-b).join(':')
                if(!res.includes(possibleTriplet)){ //if the triplet is new
                    res.push(possibleTriplet)
                }
            }
            return
        }

        for(let i=0 ; i<workingArr.length ; i++){
            solve([...inProgress, workingArr[i]], workingArr.slice(i+1), len+1)
        }
    }
}

// console.log(threeSum([-1,0,1,2,-1,-4])); //[ [ -1, 0, 1 ], [ -1, -1, 2 ] ]
// console.log(threeSum([3,0,-2,-1,1,2])); //[ [ -2, -1, 3 ], [ -2, 0, 2 ], [ -1, 0, 1 ] ]

//Works but too slow. This approach has a complexity of O(n^3)



function threeSumBis(nums){
    //We will have a map storing every sums of two elements like so :
    // memo = {'first elem + second elem': 'index1,index2'}
    //Once memo initialized, we will loop one more time through nums, if memo[-nums[i]] exists,we have a correct triplet
    //Example nums = [-6, -5, 11, 5]
    //We have memo = {
    //  ...
    //  '-11': ['0,1' , '1,0']
    //  '-5': ['0,3' , '3,0']
    //  ...
    // }
    // To which, once we loop through nums once again, 10 (and 5) will be a good candidate and we will be able to extract every index (and so every value) to get a sum equal to 0

    // Note: We will store the results as a 3 sorted numbers-long String sparated by : so the unicity of each triplets can be easily found.

    let res = []

    let memo = {}

    for(let i=0 ; i<nums.length ; i++){
        for(let j=0 ; j<nums.length ; j++){
            if(i !== j){
                memo[nums[i]+nums[j]] = (memo[nums[i]+nums[j]] || []).concat(`${i},${j}`)
            }
        }
    }

    // console.log(memo);

    for(let i=0 ; i<nums.length ; i++){
        if(memo[-nums[i]]){ //if we have a match

            memo[-nums[i]].forEach(couple => {
                let memoCouple = couple.split(',').map(e => +e)
    
                if(i!==memoCouple[0] && i!==memoCouple[1]){ //all indices should be unique
                    let triplet = [nums[memoCouple[0]], nums[memoCouple[1]], nums[i]].sort((a,b) => a-b).join(':')
                    if(!res.includes(triplet)){ //if the triplet is new
                        res.push(triplet)
                    }
                }
            })
        }
    }

    //return readable format
    return res.map(tri => tri.split(':').map(c => +c))
}

// console.log(threeSumBis([-1,0,1,2,-1,-4])); //[ [ -1, -1, 2 ], [ -1, 0, 1 ] ]
// console.log(threeSumBis([3,0,-2,-1,1,2])); //[ [ -2, -1, 3 ], [ -2, 0, 2 ], [ -1, 0, 1 ] ]

//Works but too slow and too much memory needed. This approach has a complexity of O(n^2 + n)

function threeSumTer(nums){
    //Testing every triplets with triple for loops
    //Same approach than the first one, but no recursion
    let res = []

    for(let i=0 ; i<nums.length ; i++){
        for(let j=0 ; j<nums.length ; j++){
            if(i !== j){
                let sum = nums[i] + nums[j]
                nums.forEach((e, idx) => {
                    if(sum+e === 0){
                        if(idx!==i && idx!==j){
                            let triplet = [nums[i], nums[j], e].sort((a,b) => a-b).join(':')
                            if(!res.includes(triplet)){ //if the triplet is new
                                res.push(triplet)
                            }
                        }
                    }
                })
            }
        }
    }

    return res.map(tri => tri.split(':').map(c => +c))
}

// console.log(threeSumTer([-1,0,1,2,-1,-4])); //[ [ -1, -1, 2 ], [ -1, 0, 1 ] ]
// console.log(threeSumTer([3,0,-2,-1,1,2])); //[ [ -2, -1, 3 ], [ -2, 0, 2 ], [ -1, 0, 1 ] ]

//Works, easy to understand but too slow O(n^3) complexity

function threeSumQuater(nums) {
    //See : https://youtu.be/jXZDUdHRbhY?t=430
    // https://www.geeksforgeeks.org/find-a-triplet-that-sum-to-a-given-value/
    
    //Sort the array
    //Loops through the sorted array, let left be i+1 and right be arr.length-1
    //If the sum is smaller than the required sum, increment the first pointer.
    //Else, If the sum is bigger, Decrease the end pointer to reduce the sum.
    //Else, if the sum of elements at two-pointer is equal to given sum then add the triplet and increase+deacrease.

    let res = []

    nums.sort((a, b) => a - b)

    //Sum should be equal to 0, but our program actually work with any number
    let target = 0

    for (let i = 0; i < nums.length; i++) {
        let left = i + 1
        let right = nums.length - 1
        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right]

            //if triplet is good, add it if necessary, update left and right
            if (sum === target) {
                let triplet = [nums[i], nums[left], nums[right]].sort((a, b) => a - b).join(':')
                if (!res.includes(triplet)) { //if the triplet is new
                    res.push(triplet)
                }
                left++
                right--
            }

            //if sum is smaller than target, increase left (sum will therefore increase)
            if(sum < target){
                left++
            }

            //if sum is greater than target, decrease right (sum will therefore decrease)
            if(sum > target){
                right--
            }
        }
    }

    return res.map(tri => tri.split(':').map(c => +c))
}

// console.log(threeSumQuater([-1,0,1,2,-1,-4])); //[ [ -1, -1, 2 ], [ -1, 0, 1 ] ]
// console.log(threeSumQuater([3,0,-2,-1,1,2])); //[ [ -2, -1, 3 ], [ -2, 0, 2 ], [ -1, 0, 1 ] ]

//Works and didn't exceed time limit

//=====================================
