const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//=====================================
// https://leetcode.com/problems/next-permutation/
// A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

// For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].
// The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

// For example, the next permutation of arr = [1,2,3] is [1,3,2].
// Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
// While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.
// Given an array of integers nums, find the next permutation of nums.

// The replacement must be in place and use only constant extra memory.

// Example 1:
// Input: nums = [1,2,3]
// Output: [1,3,2]

// Example 2:
// Input: nums = [3,2,1]
// Output: [1,2,3]

// Example 3:
// Input: nums = [1,1,5]
// Output: [1,5,1]
 

// Constraints:

// 1 <= nums.length <= 100
// 0 <= nums[i] <= 100

var nextPermutation = function(nums) {
    //if a[0] > a[1] > ... > a[length-1] then reverse the array
    //otherwise switch the last item where a[n-1] < a[n] with the smallest item that is strictly higher than a[n-1] and sort the remaining numbers increasingly
    //Example : [8, 9, 5, 7, 6, 4, 2]
    //the last item where a[n-1] < a[n] is a[n-1] = 5, we take the smallest item that is strictly higher than a[n-1] and after it, so 6 and sort the remaining numbers increasingly. So 5 is switched with 6 :
    // [8, 9, 6, 7, 5, 4, 2] and now we need to sort the remaining numbers after 6 :
    // [8, 9, 6, 2, 4, 5, 7]

    let lastSwitchIdx = null

    for(let i=1 ; i<nums.length ; i++){
        if(nums[i-1] < nums[i]){
            lastSwitchIdx = i-1
        }
    }

    if(lastSwitchIdx === null){
        //if array is in decreasing order
        return nums.reverse()
    }else{
        let switchCandidateIdx = lastSwitchIdx + 1 //as a side note switchCandidateIdx > lastSwitchIdx always
        //find the smallest item that is strictly higher than a[n-1] and after it
        for(let i=lastSwitchIdx ; i<nums.length ; i++){
            if(nums[i] < nums[switchCandidateIdx] && nums[i] > nums[lastSwitchIdx]){
                switchCandidateIdx = i
            }
        }

        //switch the candidate with a[n-1]
        let temp = nums[switchCandidateIdx]
        nums[switchCandidateIdx] = nums[lastSwitchIdx]
        nums[lastSwitchIdx] = temp

        //sort the remaining elements increasingly
        let isDone = false
        //quicksort sort
        while(!isDone){
            isDone = true
            for(let j=lastSwitchIdx+2 ; j<nums.length ; j++){
                if(nums[j-1] > nums[j]){
                    isDone = false
                    let temp = nums[j-1]
                    nums[j-1] = nums[j]
                    nums[j] = temp
                }
            }
        }
    }

    return nums
}

// console.log(nextPermutation([1, 2, 3])); //[ 1, 3, 2 ]
// console.log(nextPermutation([3, 2, 1])); //[ 1, 2, 3 ]
// console.log(nextPermutation([1, 1, 5])); //[ 1, 5, 1 ]
// console.log(nextPermutation([1, 3, 2])); //[ 2, 1, 3 ]
// console.log(nextPermutation([1, 6, 4, 3, 2])); //[ 2, 1, 3, 4, 6 ]
// console.log(nextPermutation([9, 8, 5, 7, 6, 4, 3, 2, 1])); // [9, 8, 6, 1, 2, 3, 4, 5, 7]

//Excellent time complexity, the replacement is also indeed made in place

//============================================
// https://leetcode.com/problems/longest-valid-parentheses/
// Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses 
// substring

// Example 1:
// Input: s = "(()"
// Output: 2
// Explanation: The longest valid parentheses substring is "()".

// Example 2:
// Input: s = ")()())"
// Output: 4
// Explanation: The longest valid parentheses substring is "()()".

// Example 3:
// Input: s = ""
// Output: 0
 

// Constraints:

// 0 <= s.length <= 3 * 104
// s[i] is '(', or ')'.


var longestValidParentheses = function(s) {
    //a valid result will start with an opening parentheses, let's start our search from that
    //A valid set of parentheses will have the same number of opening and closing ones
    //In other words, if '(' is +1 and ')' -1, we have a set once it goes back to zero, which can increase in size if we have other valid sets, but if it goes below 0, it won't be able to increase size
    let res = 0

    for(let i=0 ; i<s.length ; i++){
        if(s[i] === '('){
            let val = 1
            for(let j=i+1 ; j<s.length ; j++){
                if(s[j] === '('){
                    val++
                }else if(s[j] === ')'){
                    val--
                }
                if(val === 0){
                    let len = j-i + 1
                    if(len > res){
                        res = len
                    }
                }
                if(val < 0){
                    i=j
                    break
                }
            }
        }
    }

    return res
}

// console.log(longestValidParentheses("(()")); // 2
// console.log(longestValidParentheses(")()())")); // 4

//Works, somehow slow, let's make it cleaner :

function longestValidParenthesesBis(s){
    //a valid result will start with an opening parentheses, let's start our search from that
    //A valid set of parentheses will have the same number of opening and closing ones
    //In other words, if '(' is +1 and ')' -1, we have a set once it goes back to zero, which can increase in size if we have other valid sets, but if it goes below 0, it won't be able to increase size
    let res = 0

    for(let i=0 ; i<s.length-res ; i++){
        if(s[i] === '('){
            let val = 1
            for(let j=i+1 ; j<s.length ; j++){
                steps++
                val += (s[j] === '(') ? 1 : -1
                if(val === 0){
                    let len = j-i + 1
                    res = (len > res) ? len : res
                }
                if(val < 0){
                    i=j
                    break
                }
            }
        }
    }

    return res
}

// console.log(longestValidParenthesesBis("(()")); // 2
// console.log(longestValidParenthesesBis(")()())")); // 4

function longestValidParenthesesTer(s){
    //stack method, a '(' adds an element to the stack, we register its index-1, a ')' removes an element from the stack
    //the difference of index between the last element of the stack (after the remove) is the length of the current parentheses set
    let res = 0
    let start = false
    let stack = []

    for(let i=0 ; i<s.length ; i++){
        if(s[i] === '(' && !start){
            start = true
            //starting at i would'nt work
            stack = [i-1]
        }
        if(start){
            if(s[i] === '(') stack.push(i)
            if(s[i] === ')'){
                stack.pop()
                if(stack.length === 0){
                    //this case is too many ')'
                    start = false
                    continue
                }else{
                    res = Math.max(i-stack[stack.length-1], res)
                }
            }

        }
    }

    return res
}

// console.log(longestValidParenthesesTer("(()")); // 2
// console.log(longestValidParenthesesTer(")()())")); // 4
// console.log(longestValidParenthesesTer("(()(()")); // 2

//=============================================================
// https://leetcode.com/problems/search-in-rotated-sorted-array/
// There is an integer array nums sorted in ascending order (with distinct values).

// Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

// Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

// You must write an algorithm with O(log n) runtime complexity.

// Example 1:
// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4

// Example 2:
// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1

// Example 3:
// Input: nums = [1], target = 0
// Output: -1
 

// Constraints:

// 1 <= nums.length <= 5000
// -104 <= nums[i] <= 104
// All values of nums are unique.
// nums is an ascending array that is possibly rotated.
// -104 <= target <= 104

function binarySearch(sortedArr, target) {
    let min = 0
    let max = sortedArr.length - 1
    while (max - min >= 0) {
        let middle = Math.floor((min + max) / 2)
        if (sortedArr[middle] === target) {
            return middle
        } else {
            if (sortedArr[middle] < target) {
                min = middle + 1
            } else {
                max = middle - 1
            }
        }
    }
    return -1
}
// console.log(binarySearch([1, 2, 3, 5, 7, 8, 9], 3));
// console.log(binarySearch([1, 2, 3, 5, 7, 8, 9], 6));


function searchRotatedSorted(nums, target){
    //We'll cut nums in half, naturally, one half will be sorted and the other not
    //At some point both are sorted when we cut right at the start of the pivot
    //We'll find where of the two halves the target is and keep cutting the remaining half
    let left = 0
    let right = nums.length-1
    while(right - left >= 0){
        let middle = Math.floor((right + left)/2)
        if(nums[middle] === target){
            return middle
        }

        if(nums[left] <= nums[middle] && target <= nums[middle] && target >= nums[left]){
            //case left half is sorted and target is in its range
            right = middle - 1
        }else if(nums[middle] <= nums[right] && target >= nums[middle] && target <= nums[right]){
            //case right half is sorted and target is in its range
            left = middle + 1
        }else if(nums[left] <= nums[middle] && !(target <= nums[middle] && target >= nums[left])){
            //case left half is sorted and target is NOT in its range
            left = middle + 1
        }else if(nums[middle] <= nums[right] && !(target >= nums[middle] && target <= nums[right])){
            //case right half is sorted and target is NOT in its range
            right = middle - 1
        }
    }

    return -1
}

// console.log(searchRotatedSorted([4,5,6,7,0,1,2], 0)); //4
// console.log(searchRotatedSorted([4,5,6,7,0,1,2], 7)); //3
// console.log(searchRotatedSorted([4,5,6,7,0,1,2], 3)); //-1
// console.log(searchRotatedSorted([1], 0)); //-1
// console.log(searchRotatedSorted([1], 1)); //0
// console.log(searchRotatedSorted([1, 3], 2)); //-1
// console.log(searchRotatedSorted([4,5,6,7,8,0,1,2], 3)) // -1

//===========================================