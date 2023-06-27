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

//A bit cleaner :

function searchRotatedSortedBis(nums, target){
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

        //left half is sorted
        if(nums[left] <= nums[middle]){
            //target is in the left half
            if(nums[left] <= target && target <= nums[middle]){
                right = middle - 1

            //target is in the right half
            }else{
                left = middle + 1
            }

        //right half is sorted
        }else{
            //target is in the right half
            if(nums[middle] <= target && target <= nums[right]){
                left = middle + 1

            //target is in the left side
            }else{
                right = middle - 1
            }
        }
    }

    return -1
}

// console.log(searchRotatedSortedBis([4,5,6,7,0,1,2], 0)); //4
// console.log(searchRotatedSortedBis([4,5,6,7,0,1,2], 7)); //3
// console.log(searchRotatedSortedBis([4,5,6,7,0,1,2], 3)); //-1
// console.log(searchRotatedSortedBis([1], 0)); //-1
// console.log(searchRotatedSortedBis([1], 1)); //0
// console.log(searchRotatedSortedBis([1, 3], 2)); //-1
// console.log(searchRotatedSortedBis([4,5,6,7,8,0,1,2], 3)) // -1

//===========================================
// https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
// Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

// If target is not found in the array, return [-1, -1].

// You must write an algorithm with O(log n) runtime complexity.

 

// Example 1:
// Input: nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]

// Example 2:
// Input: nums = [5,7,7,8,8,10], target = 6
// Output: [-1,-1]

// Example 3:
// Input: nums = [], target = 0
// Output: [-1,-1]

// Constraints:

// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109
// nums is a non-decreasing array.
// -109 <= target <= 109

var searchRange = function(nums, target) {
    //Best I can do is n/2
    let min = 0
    let max = nums.length - 1
    while(max >= min){
        if(nums[min] === target && nums[max] === target){
            return [min, max]
        }
        if(nums[min] !== target) min++
        if(nums[max] !== target) max--
    }
    return [-1, -1]
}

// console.log(searchRange([5,7,7,8,8,10], 8)); // [3,4]


var searchRangeBis = function(nums, target) {
    //First search for a value === target,
    //Then try find the start of it and the end of it 
    let left = 0
    let right = nums.length - 1
    let inRange = null
    //search if target is in nums
    while(right >= left){
        let middle = Math.floor((left+right)/2)
        if(nums[middle] === target){
            inRange = middle
            break
        }
        if (nums[middle] < target) {
            left = middle + 1
        } else {
            right = middle - 1
        }
    }

    //target is in nums, search for its start and end
    if(inRange !== null){
        let start = null
        let end = null
        //find start
        left = 0
        right = inRange
        while(right >= left){
            let middle = Math.floor((left+right)/2)
            //The start will be the element where nums[start - 1] < target && nums[start] === target
            if(nums[middle - 1] < target && nums[middle] === target){
                start = middle
                break
            }
            if (nums[middle] < target) {
                left = middle + 1
            } else {
                right = middle - 1
            }
        }
        //if the start has not been found, it means the whole array is made of target
        if(start === null){
            start = 0
        }

        //find end
        left = inRange
        right = nums.length
        while(right >= left){
            let middle = Math.floor((left+right)/2)
            //The end will be the element where nums[end + 1] > target && nums[end] === target
            if(nums[middle + 1] > target && nums[middle] === target){
                end = middle
                break
            }
            if (nums[middle] > target) {
                right = middle - 1
            } else {
                left = middle + 1
            }
        }
        //if the end has not been found, it means the whole array is made of target
        if(end === null){
            end = nums.length - 1
        }
        return [start, end]

    //target is not in nums
    }else{
        return [-1,-1]
    }
}

// console.log(searchRangeBis([5,7,7,8,8,10], 8)); // [3,4]
// console.log(searchRangeBis([1], 1)); // [0,0]

//It works, now let's try all in one step :

var searchRangeTer = function(nums, target) {
    //Take 4 values, binary search until I find the start and the end
    let start = null // our result
    let end = null // our result
    //our start range that we will binary search
    let startLeft = 0
    let startRight = nums.length - 1
    //our end range that we will binary search
    let endLeft = 0
    let endRight = nums.length - 1

    while(startRight>=startLeft || endRight>=endLeft){
        let startMiddle = Math.floor((startLeft + startRight) / 2)
        let endMiddle = Math.floor((endLeft + endRight) / 2)

        //Binary search the start
        //The start will be the element where nums[start - 1] < target && nums[start] === target OR nums[0] === target
        if((nums[startMiddle - 1] < target && nums[startMiddle] === target) || (nums[startMiddle] === target && startMiddle === 0)){
            start = startMiddle
        }
        if (nums[startMiddle] < target) {
            startLeft = startMiddle + 1
        } else {
            startRight = startMiddle - 1
        }

        //Binary search the end
        //The end will be the element where nums[end + 1] > target && nums[end] === target OR nums[nums.length-1] === target
        if((nums[endMiddle + 1] > target && nums[endMiddle] === target) || (endMiddle === nums.length-1 && nums[endMiddle] === target)){
            end = endMiddle
        }
        if (nums[endMiddle] > target) {
            endRight = endMiddle - 1
        } else {
            endLeft = endMiddle + 1
        }

        //return if we have our result
        if(start !== null && end !== null){
            return [start, end]
        }
    }

    return [-1, -1]
}

// console.log(searchRangeTer([5,7,7,8,8,10], 8)); // [3,4]
// console.log(searchRangeTer([1], 1)); // [0,0]
// console.log(searchRangeTer([5,5,5,5], 5)); // [0,3]

//It works.

//===============================================
// https://leetcode.com/problems/search-insert-position/
// Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

// You must write an algorithm with O(log n) runtime complexity.

// Example 1:
// Input: nums = [1,3,5,6], target = 5
// Output: 2

// Example 2:
// Input: nums = [1,3,5,6], target = 2
// Output: 1

// Example 3:
// Input: nums = [1,3,5,6], target = 7
// Output: 4
 

// Constraints:

// 1 <= nums.length <= 104
// -104 <= nums[i] <= 104
// nums contains distinct values sorted in ascending order.
// -104 <= target <= 104

//That is just binary search

var searchInsert = function(nums, target) {
    //We have 4 possibilities : 
    // - the target is before all nums, return 0
    // - the target is after all nums, return nums.length
    // - nums contains target, return binarySearch
    // - the target is in between two elements of nums, return middle + 1 after the binary search ends
    let left = 0
    let right = nums.length - 1

    if(nums[left] > target){
        return 0
    }
    if(nums[right] < target){
        return nums.length
    }

    //binary search
    while(left <= right){
        let middle = Math.floor((left+right)/2)
        if(nums[middle] === target){
            //case nums contains target
            return middle
        }

        if(nums[middle] > target){
            right = middle - 1
        }else{
            left = middle + 1
        }
    }

    //case target would be in between two elements of nums
    return Math.floor((left+right)/2) + 1
}

// console.log(searchInsert([1,3,5,6], 5)) // 2
// console.log(searchInsert([1,3,5,6], 2)) // 1
// console.log(searchInsert([1,3,5,6], 7)) // 4
// console.log(searchInsert([6], 2)) // 0
// console.log(searchInsert([6], 7)) // 1
// console.log(searchInsert([6, 7, 8], 2)) // 0

//Works like a charm

//========================================
// https://leetcode.com/problems/valid-sudoku/
// Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

// Each row must contain the digits 1-9 without repetition.
// Each column must contain the digits 1-9 without repetition.
// Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
// Note:

// A Sudoku board (partially filled) could be valid but is not necessarily solvable.
// Only the filled cells need to be validated according to the mentioned rules.
 

// Example 1:
// Input: board = 
// [["5","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]]
// Output: true

// Example 2:
// Input: board = 
// [["8","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]]
// Output: false
// Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
 

// Constraints:

// board.length == 9
// board[i].length == 9
// board[i][j] is a digit 1-9 or '.'.

var isValidSudoku = function(board) {
    //check one by one, rows, cols and 3x3 squares

    //check rows
    for(let i=0 ; i<9 ; i++){
        let seen = {} //keep track of numbers seen in the row
        for(let j=0 ; j<9 ; j++){
            let char = board[i][j]
            if(char !== '.'){
                if(seen[char]){
                    return false
                }else{
                    seen[char] = true
                }
            }
        }
    }

    //check cols
    for(let i=0 ; i<9 ; i++){
        let seen = {} //keep track of numbers seen in the col
        for(let j=0 ; j<9 ; j++){
            let char = board[j][i]
            if(char !== '.'){
                if(seen[char]){
                    return false
                }else{
                    seen[char] = true
                }
            }
        }
    }

    //check 3x3 squares
    for(let line=0 ; line<9 ; line=line+3){
        for(let square=0 ; square<3 ;square++){
            let seen = {} //keep track of numbers seen in the square
            for(let j=line ; j<line+3 ; j++){
                for(let k=square*3 ; k<square*3+3 ; k++){
                    let char = board[j][k]
                    if(char !== '.'){
                        if(seen[char]){
                            return false
                        }else{
                            seen[char] = true
                        }
                    }
                }
            }
        }
    }

    return true
}

// console.log(isValidSudoku([["5","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]])) // true

// console.log(isValidSudoku([["8","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]])) // false

// console.log(isValidSudoku([["9","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]])) // false

//Can we do O(n²) ?

var isValidSudokuBis = function(board) {
    //for each i create a unique seenRow, seenCol and seenSquare

    for(let i=0 ; i<9 ; i++){
        let seenRow = {} //keep track of numbers seen in the row
        let seenCol = {} //keep track of numbers seen in the col
        let seenSquare = {} //keep track of numbers seen in the square, square are from top to bottom, left to right
        for(let j=0 ; j<9 ; j++){
            let charRow = board[i][j]
            let charCol = board[j][i]
            let charSquare = board[Math.floor(i/3)*3 + Math.floor(j/3)][Math.floor(i%3)*3 + (j%3)]
            //console.log(Math.floor(i/3)*3 + Math.floor(j/3) , Math.floor(i%3)*3 + (j%3));

            if((seenRow[charRow] && charRow!=='.') || (seenCol[charCol] && charCol!=='.') || (seenSquare[charSquare] && charSquare!=='.')){
                return false
            }else{
                seenRow[charRow] = true
                seenCol[charCol] = true
                seenSquare[charSquare] = true
            }
        }
    }

    return true
}

// console.log(isValidSudokuBis([["5","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]])) // true

// console.log(isValidSudokuBis([["8","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]])) // false

// console.log(isValidSudokuBis([["9","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]])) // false

//Passed :)

//=================================================
// https://leetcode.com/problems/sudoku-solver/
// Write a program to solve a Sudoku puzzle by filling the empty cells.

// A sudoku solution must satisfy all of the following rules:

// Each of the digits 1-9 must occur exactly once in each row.
// Each of the digits 1-9 must occur exactly once in each column.
// Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
// The '.' character indicates empty cells.

// Do not return anything, modify board in-place instead.


// Example 1:

// Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
// Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
// Explanation: The input board is shown above and the only valid solution is shown below:

// Constraints:

// board.length == 9
// board[i].length == 9
// board[i][j] is a digit or '.'.
// It is guaranteed that the input board has only one solution.

//from my own code https://github.com/RenardLGR/sudoku-solver-react/blob/main/src/components/Game.js

function solveSudoku(puzzle) {
    //put 0s instead of '.', put Numbers instead of Strings
    for(let line=0 ; line<9 ; line++){
        for(let col=0 ; col<9 ; col++){
            puzzle[line][col] = puzzle[line][col] === '.' ? 0 : Number(puzzle[line][col])
        }
    }

    //puzzle is an array of lines which is an array of cells
    let puzzlePossibilities = buildPuzzlePossibilities(puzzle)
    //puzzlePossibilities is the same array, with a list of possibilities instead of zeroes (other number unchanged)

    let isDone = false
    let it = 1000

    while(!isDone && it>0){
        isDone = true
        it--
        for(let line=0 ; line<9 ; line++){ //goes line by line
            for(let index=0 ; index<9 ; index++){ //goes index by index so cols by cols
                if(puzzle[line][index]===0){//if it is a zero, try to find the number //if a zero is found, the algo is not done
                    findNumberByElimination(line, index)
                    isDone = false
                }
            }
        }
        findNumberInsideUnit()
    }

    //revert it back to Strings instead of Numbers
    for(let line=0 ; line<9 ; line++){
        for(let col=0 ; col<9 ; col++){
            puzzle[line][col] = '' + puzzle[line][col]
        }
    }


    //HELPERS

    //puzzlePossibilities builder
    //From a puzzle containing zeroes for unknown numbers, returns a puzzle with every zeroes replaced by an array of possibilities
    function buildPuzzlePossibilities(puzzle){
        let res = []
        for(let l=0 ; l<9 ; l++){ //create shallow cpy of puzzle
            res.push(puzzle[l].slice())
        }

        for(let line=0 ; line<9 ; line++){ //goes line by line
            for(let index=0 ; index<9 ; index++){ //goes index by index so cols by cols
                if(res[line][index]===0){//if it is a zero, find the array of possibilities
                    let temp = [] //array of possibilities I will populate
                    let arrLine = generateLine(line, puzzle)
                    let arrCol = generateCol(index, puzzle)
                    let arrSquare = generateSquare(line, index, puzzle)
                    for(let k=1 ; k<=9 ; k++){ //k is a number between 1 and 9 that will be added to the possibilities
                        if(!arrLine.includes(k) && !arrCol.includes(k) && !arrSquare.includes(k)){
                            temp.push(k)
                        }
                    }
                    res[line][index] = temp.slice() //changing zero with array of possibilities
                }
            }
        }
        return res
    }


    //Algo 1 defined in explanation (elimination) - mutate puzzle
    function findNumberByElimination(coordLine, coordIndex){
        let arrOfPossibilities = puzzlePossibilities[coordLine][coordIndex].slice()
        if(arrOfPossibilities.length === 1){
            puzzle[coordLine][coordIndex] = arrOfPossibilities[0]
            puzzlePossibilities = buildPuzzlePossibilities(puzzle)
        }
    }

    //Algo 2 defined in explanation (indirect elimination) - mutate puzzle
    function findNumberInsideUnit(){
        checkEveryLines()
        checkEveryCols()
        checkEverySquares()

        //Given an array of possibilities of a unit like : 
        //arrPossibilities = [2, 3, [5, 6], [5, 6, 7, 8], 1, [5, 6, 7, 8], [5, 9], [6, 7, 8], [5, 6]]
        //The 9 in only appearing in one element, meaning the 9 is here.
        //We will determine the frequencies of elements inside an array of possibilities
        //If one of these frequencies is 1, we will find the array containing it, with its index, we will modify cpy (our working puzzle)
        function checkEveryLines(){
            for(let k=0 ; k<9 ; k++){ //from 0th line to 8th line
                let linePossibilities = generateLine(k, puzzlePossibilities)
                //linePossibilities = [2, 3, [5, 6], [5, 6, 7, 8], 1, [5, 6, 7, 8], [5, 9], [6, 7, 8], [5, 6]]
                let frequencies = linePossibilities.reduce((acc, cur) => {
                    if(Array.isArray(cur)){
                        cur.forEach(n => acc[n] = (acc[n] || 0) + 1)
                    }
                    return acc
                }, {})
                for(let number in frequencies){
                    if(frequencies[number] === 1){
                        linePossibilities.forEach((p, idx) => {
                            if(Array.isArray(p)){
                                if(p.includes(+number)){
                                    puzzle[k][idx] = Number(number) //k is the line while idx should be the col
                                    puzzlePossibilities = buildPuzzlePossibilities(puzzle) //refresh the possibilities puzzle
                                }
                            }
                        })
                    }
                }
            }
        }

        function checkEveryCols(){
            for(let k=0 ; k<9 ; k++){
                let colPossibilities = generateCol(k, puzzlePossibilities)
                //colPossibilities = [2, 3, [5, 6], [5, 6, 7, 8], 1, [5, 6, 7, 8], [5, 9], [6, 7, 8], [5, 6]]
                let frequencies = colPossibilities.reduce((acc, cur) => {
                    if(Array.isArray(cur)){
                        cur.forEach(n => acc[n] = (acc[n] || 0) + 1)
                    }
                    return acc
                }, {})
                for(let number in frequencies){
                    if(frequencies[number] === 1){
                        colPossibilities.forEach((p, idx) => {
                            if(Array.isArray(p)){
                                if(p.includes(+number)){
                                    puzzle[idx][k] = Number(number)
                                    puzzlePossibilities = buildPuzzlePossibilities(puzzle)
                                }
                            }
                        })
                    }
                }
            }
        }

        function checkEverySquares() {
            for (let lines = 0; lines < 9; lines = lines + 3) {
                for (let cols = 0; cols < 9; cols = cols + 3) {
                    let squarePossibilities = generateSquare(lines, cols, puzzlePossibilities) //we take the square according to its top left element
                    //squarePossibilities = [2, 3, [5, 6], [5, 6, 7, 8], 1, [5, 6, 7, 8], [5, 9], [6, 7, 8], [5, 6]]
                    let frequencies = squarePossibilities.reduce((acc, cur) => {
                        if (Array.isArray(cur)) {
                            cur.forEach(n => acc[n] = (acc[n] || 0) + 1)
                        }
                        return acc
                    }, {})
                    for (let number in frequencies) {
                        if (frequencies[number] === 1) {
                            squarePossibilities.forEach((p, idx) => {
                                if (Array.isArray(p)) {
                                    if (p.includes(+number)) {
                                        puzzle[lines + Math.floor(idx / 3)][cols + idx % 3] = Number(number) //indicies navigation trickeries
                                        puzzlePossibilities = buildPuzzlePossibilities(puzzle)
                                    }
                                }
                            })
                        }
                    }
                }
            }
        }
    }


    //given a line (col) and a puzzle, returns the whole line
    function generateLine(coordIndex, puzzle){
        return Array.isArray(puzzle[coordIndex]) ? puzzle[coordIndex].slice() : puzzle[coordIndex]
    }

    //given an index (col) and a puzzle, returns the whole column
    function generateCol(coordIndex, puzzle){
        let res = []
        for(let i=0 ; i<9 ; i++){
            res.push(Array.isArray(puzzle[i][coordIndex]) ? puzzle[i][coordIndex].slice() : puzzle[i][coordIndex])
        }
        return res
    }

    //given a line, an index (col) and a puzzle, returns the whole square ; read left to right, top to bottom
    function generateSquare(coordLine, coordCol, puzzle){
        let res = []
        for(let i=Math.floor(coordLine/3)*3 ; i<Math.floor(coordLine/3)*3+3 ; i++){
            for(let j=Math.floor(coordCol/3)*3 ; j<Math.floor(coordCol/3)*3+3 ; j++){
                res.push(Array.isArray(puzzle[i][j]) ? puzzle[i][j].slice() : puzzle[i][j])
            }
        }
        return res
    }

}
// Explanation :

//Algo 1 : Finding the number by elimination
//                        We know it can't be 8, 9 from the col
// var puzzle = [                   |
//             [0,0,0,| 0,0,0,| 0,0,0],
//             [0,0,0,| 0,0,0,| 0,0,0],
//             [0,0,0,| 0,0,0,| 0,0,0],
//            _________________________
//             [0,0,0,| 0,0,0,| 1,2,0], -- We know it can't be 1, 2, 3 from the square
//             [0,0,0,| 0,0,0,| 0,3,0],
//             [0,0,0,| 4,5,6,| 0,0,X], -- We know it can't be 4, 5, 6 from the line : It must be a 7
//            _________________________
//             [0,6,0,| 0,0,0,| 0,0,0],
//             [0,0,0,| 0,0,0,| 0,0,8],
//             [0,0,0,| 0,0,0,| 0,0,9]];

//So if there is one and only one number between 1 and 9 that is in neither of those lists (line, col, square), I can add it here

//Algo 2 : Finding inside a unit (line, col, square) the only place where a number can be (indirect elimination)
//                  We know the 4 can't be on this col
// var puzzle = [               |
//             [0,0,0,| 0,0,4,| 0,7,0], --We know the 4 can't be on this line
//             [0,4,0,| 0,0,0,| 0,0,0], --We know the 4 can't be on this line
//             [0,0,0,| 0,0,0,| 0,X,8], --Inside this square the 4 can only be placed here
//            _________________________
//             [0,0,0,| 0,0,0,| 1,2,0],
//             [0,0,0,| 0,0,0,| 4,3,0],
//             [0,0,0,| 4,5,6,| 0,0,X], 
//            _________________________
//             [0,6,0,| 0,0,0,| 0,0,0],
//             [0,0,0,| 0,0,0,| 0,0,8],
//             [0,0,0,| 0,0,0,| 0,0,9]];

//Given a unit (line, col, square) map the list of cells with a list of numbers possible ; if one of these lists has a single element, I can add it here
//This function will run through every lines searching for a case like that, then every cols, then every squares

let sudokuBoard = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]

// solveSudoku(sudokuBoard)

// console.log(sudokuBoard); //works

//The board given are too complex for this simple algo

let hardSudokuBoard = [[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]]

// solveSudoku(hardSudokuBoard)

// console.log(hardSudokuBoard); //doesn't find each cells

//using backtracking : 

function solveSudokuBis(board){
    tryCell()

    function tryCell(){
        for(let row=0 ; row<9 ; row++){
            for(let col=0 ; col<9 ; col++){
                if(board[row][col] === '.'){
                    //try a number
                    for(let num=1 ; num<=9 ; num++){
                        if(isNumValid(row, col, num, board)){
                            //try a valid number
                            board[row][col] = '' + num
                            //call recursively tryCell again, if it returns true, the board is completed, end every recursion
                            if(tryCell()){
                                return true
                            }else{
                                //backtrack
                                board[row][col] = '.'
                            }
                        }
                    }
                    //if no nums were valid : will backtrack
                    return false
                }
            }
        }
        return true
    }


    //helper func : return boolean if a number can be put in this position according to this board
    function isNumValid(row, col, num, board){
        num = '' + num
        for(let i=0 ; i<9 ; i++){
        
            if(board[row][i] === num) return false
            
            if(board[i][col] === num) return false
            
            const currentMatrixRow = Math.floor(row/3)        
            const currentMatrixCol = Math.floor(col/3)
    
            const currentRow =  3 * currentMatrixRow + Math.floor(i/3)        
            const currentCol = 3 * currentMatrixCol + i%3 
     
            
            if(board[currentRow][currentCol] === num ) return false
            
        }
        return true
    }
}

// solveSudokuBis(sudokuBoard)
// solveSudokuBis(hardSudokuBoard)

// console.log(sudokuBoard); //works
// console.log(hardSudokuBoard); //works

//rather similar implementation than above, using backtracking

function solveSudokuTer(board){
    for(let row=0 ; row<9 ; row++){
        for(let col=0 ; col<9 ; col++){
            if(board[row][col] === '.'){
                for(let num = 1 ; num<=9 ; num++){
                    if(isNumValid(row, col, num, board)){
                        board[row][col] = '' + num
                        if(solveSudokuTer(board)){
                            //call recursively again, if it returns true, the board is completed, end every recursion
                            return true
                        }else{
                            //backtrack
                            board[row][col] = '.'
                        }
                    }
                }
                //if no nums were possible, the board is wrong, backtrack
                return false
            }
        }
    }

    //the board is complete
    return true


    //helper func : return boolean if a number can be put in this position according to this board
    function isNumValid(row, col, num, board){
        num = '' + num
        for(let i=0 ; i<9 ; i++){
        
            if(board[row][i] === num) return false
            
            if(board[i][col] === num) return false
            
            const currentMatrixRow = Math.floor(row/3)        
            const currentMatrixCol = Math.floor(col/3)
    
            const currentRow =  3 * currentMatrixRow + Math.floor(i/3)        
            const currentCol = 3 * currentMatrixCol + i%3 
        
            
            if(board[currentRow][currentCol] === num ) return false
            
        }
        return true
    }
}

// solveSudokuTer(sudokuBoard)
// solveSudokuTer(hardSudokuBoard)

// console.log(sudokuBoard); //works
// console.log(hardSudokuBoard); //works