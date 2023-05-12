const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//===============================================
// Reverse a linked list.
// Example:
// Input: [1,2,3,4,5]
// Output: [5,4,3,2,1]

function reverseList(head){
    let curr = head
    let temp = null //this is a pointer to the tail of the input list
    let res = null //this is the result, it grows as follow: null -> 1, null -> 2, 1, null -> ... -> 5, 4, 3, 2, 1, null
    while(curr){
        temp = curr.next //initialize the tail
        curr.next = res //keep the first item, append the tail of the output list to it
        res = curr //switch
        curr = temp //switch
    }

    return res
}

let nodeListHead1 = {val:1, next:{val:2, next:{val:3, next:{val:4, next:{val:5, next:null}}}}}
// console.log(reverseList(nodeListHead1))

//=======================================================
// https://leetcode.com/problems/reverse-nodes-in-k-group/
// Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

// k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

// You may not alter the values in the list's nodes, only nodes themselves may be changed.

// Example 1:
// Input: head = [1,2,3,4,5], k = 2
// Output: [2,1,4,3,5]

// Example 2:
// Input: head = [1,2,3,4,5], k = 3
// Output: [3,2,1,4,5]
 
// Constraints:
// The number of nodes in the list is n.
// 1 <= k <= n <= 5000
// 0 <= Node.val <= 1000

// Follow-up: Can you solve the problem in O(1) extra memory space?

var reverseKGroup = function(head, k) {
    // First check if we can make a reverse group, if so build it and append it. If not, append the remaining nodes
    let curr = head
    let temp = null
    let subGroup = null
    // let res = new ListNode(null)
    let res = {val:null, next:null}
    let resHead = res
    let isGroupReversed = true

    while(curr){
        let pointer = curr //pointer will go k nodes ahead to check if we can reverse this group
        //Check if I add a reverse group or the remaining nodes
        for(let i=0 ; i<k ; i++){
            if(!pointer){
                isGroupReversed = false
                break
            }
            pointer = pointer.next
        }
        if(isGroupReversed){
            //Build the reverse sub group
            for(let i=0 ; i<k ; i++){
                temp = curr.next
                curr.next = subGroup
                subGroup = curr
                curr = temp
            }
            //append it
            res.next = subGroup
            subGroup = null
            //move forward so the next append is at the right position
            while(res.next){
                res = res.next
            }
        }else{
            //append the remaining nodes
            res.next = curr
            break
        }
    }

    return resHead.next
}

nodeListHead1 = {val:1, next:{val:2, next:{val:3, next:{val:4, next:{val:5, next:null}}}}}
// console.log(reverseKGroup(nodeListHead1, 5)) // [5, 4, 3, 2, 1]
// console.log(reverseKGroup(nodeListHead1, 2)) // [2, 1, 4, 3, 5]
// console.log(reverseKGroup(nodeListHead1, 3)) // [3, 2, 1, 4, 5]

//Similar idea, faster, we build two lists, append the reversed or non reversed as necessary. Issue is we are creating nodes with the contructor

function reverseKGroupBis(head, k){
    // We build a reversed subGroup and a non reversed subGroup, if it is long enough we append it the reversed one. If not, append the remaining nodes
    let curr = head
    let temp = curr
    let subGroup = null
    let res = new ListNode(null)
    let resHead = res

    while(curr){
        let subGroupLen = 0
        //Non reversed subGroup
        let inCaseSubGroupTooSmall = new ListNode(null)
        let inCaseSubGroupTooSmallHead = inCaseSubGroupTooSmall
        //Build the reverse sub group, as long as there are nodes
        for(let i=0 ; i<k && temp ; i++){
            //Build the non reversed
            let tempNode = new ListNode(curr.val)
            inCaseSubGroupTooSmall.next = tempNode
            inCaseSubGroupTooSmall = inCaseSubGroupTooSmall.next
            //Build the reversed
            temp = curr.next
            curr.next = subGroup
            subGroup = curr
            curr = temp
            subGroupLen++
        }

        //If the subgroup has enough nodes
        if(subGroupLen === k){
            //append it
            res.next = subGroup
            subGroup = null
            //move forward so the next append is at the right position
            while(res.next){
                res = res.next
            }
        }else{
            //append the remaining nodes
            res.next = inCaseSubGroupTooSmallHead.next
            break
        }
    }

    return resHead.next
}

nodeListHead1 = {val:1, next:{val:2, next:{val:3, next:{val:4, next:{val:5, next:null}}}}}
// console.log(reverseKGroupBis(nodeListHead1, 5)) // [5, 4, 3, 2, 1]
// console.log(reverseKGroupBis(nodeListHead1, 2)) // [2, 1, 4, 3, 5]
// console.log(reverseKGroupBis(nodeListHead1, 3)) // [3, 2, 1, 4, 5]

//=================================================
// https://leetcode.com/problems/remove-duplicates-from-sorted-array/
// Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

// Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

// Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
// Return k.
// Custom Judge:

// The judge will test your solution with the following code:

// int[] nums = [...]; // Input array
// int[] expectedNums = [...]; // The expected answer with correct length

// int k = removeDuplicates(nums); // Calls your implementation

// assert k == expectedNums.length;
// for (int i = 0; i < k; i++) {
//     assert nums[i] == expectedNums[i];
// }
// If all assertions pass, then your solution will be accepted.


// Example 1:
// Input: nums = [1,1,2]
// Output: 2, nums = [1,2,_]
// Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).

// Example 2:
// Input: nums = [0,0,1,1,1,2,2,3,3,4]
// Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
// Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).
 

// Constraints:

// 1 <= nums.length <= 3 * 104
// -100 <= nums[i] <= 100
// nums is sorted in non-decreasing order.

var removeDuplicates = function(nums) {
    //Three pointers :
    //one is i and run through the array one by one
    //one is start and points to a start of a sequence of numbers (so the first number that is equal to its successor)
    //one is toReplace and points to a replacable number, so the first number that has the same value as his predecessor, it will from there increase by one each time we have a new duplicate
    //And one boolean :
    //one check sets the first replacable value if not found yet
    //When a new number is found, replace it, set new start
    //And we keep track of how many unique numbers we have with res
    if(nums.length === 0){
        return 0
    }

    let start = 0
    let toReplace = -Infinity
    let isFirstSpotInit = false
    let res = 1 //how many unique numbers

    for(let i=1 ; i<nums.length ; i++){
        if(nums[i] === nums[start]){
            //duplicate number
            if(!isFirstSpotInit){
                //initialize the first spot that can be replaced
                isFirstSpotInit = true
                toReplace = i
            }
        }else{
            //if different numbers, sets a new start, make a replace
            nums[toReplace] = nums[i]
            toReplace++
            res++
            start = i
        }
    }

    //console.log(nums);
    return res
}

// console.log(removeDuplicates([1,1,2])); // 2, nums = [ 1, 2, 2 ]
// console.log(removeDuplicates([1,1,1,1,1,1,2])); // 2, nums = [ 1, 2, 1, 1, 1, 1, 2 ]
// console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4])); // 5, nums = [0, 1, 2, 3, 4, 2, 2, 3, 3, 4]
// console.log(removeDuplicates([0, 1, 2, 3, 4, 5])); // 6, nums = [ 0, 1, 2, 3, 4, 5, '-Infinity': 5 ]
// console.log(removeDuplicates([1])); // 1, nums = [ 1 ]
// console.log(removeDuplicates([1, 1])); // 1, nums = [ 1, 1 ]
// console.log(removeDuplicates([1, 1, 1, 1, 1])); // 1, nums = [ 1, 1, 1, 1, 1 ]

function removeDuplicatesBis(nums){
    let set = new Set(nums)
    Array.from(set).forEach((el, idx)=>nums[idx]=el)
    // console.log(nums)
    return set.size
}

// console.log(removeDuplicatesBis([1,1,2]));
// console.log(removeDuplicatesBis([0,0,1,1,1,2,2,3,3,4])); // 5, nums = [ 0, 1, 2, 3, 4 ]
// console.log(removeDuplicatesBis([1, 1, 1, 1, 1])); // 1 nums = [1]

//=========================================
// https://leetcode.com/problems/remove-element/
// Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.

// Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:

// Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.
// Return k.
// Custom Judge:

// The judge will test your solution with the following code:

// int[] nums = [...]; // Input array
// int val = ...; // Value to remove
// int[] expectedNums = [...]; // The expected answer with correct length.
                            // It is sorted with no values equaling val.

// int k = removeElement(nums, val); // Calls your implementation

// assert k == expectedNums.length;
// sort(nums, 0, k); // Sort the first k elements of nums
// for (int i = 0; i < actualLength; i++) {
//     assert nums[i] == expectedNums[i];
// }
// If all assertions pass, then your solution will be accepted.

 

// Example 1:
// Input: nums = [3,2,2,3], val = 3
// Output: 2, nums = [2,2,_,_]
// Explanation: Your function should return k = 2, with the first two elements of nums being 2.
// It does not matter what you leave beyond the returned k (hence they are underscores).

// Example 2:
// Input: nums = [0,1,2,2,3,0,4,2], val = 2
// Output: 5, nums = [0,1,4,0,3,_,_,_]
// Explanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
// Note that the five elements can be returned in any order.
// It does not matter what you leave beyond the returned k (hence they are underscores).
 

// Constraints:

// 0 <= nums.length <= 100
// 0 <= nums[i] <= 50
// 0 <= val <= 100

var removeElement = function(nums, val) {
    //Two pointer:
    //one is i and run through the array one by one
    //one is toReplace and replace nums[toReplace] with nums[i] only if nums[i] is different than val, filtering out val and keeping the order (even if it is not necessary)
    let toReplace = 0
    for(let i=0 ; i<nums.length ; i++){
        if(nums[i] !== val){
            nums[toReplace] = nums[i]
            toReplace++
        }
        //else toReplace is not increased, the next replace will hence take the spot of an unwated value
    }

    // console.log(nums)
    return toReplace
}

// console.log(removeElement([3,2,2,3], 3)) // 2, nums = [2,2,_,_]
// console.log(removeElement([0,1,2,2,3,0,4,2], 2)) // 5, nums = [0, 1, 3, 0, 4, _, _, _]
// console.log(removeElement([0,1,2,3,4,5], 6)) // 6, nums = [0,1,2,3,4,5]

function removeElementBis(nums, val){
    if(nums.length === 0){
        return 0
    }
    //Two pointers:
    //One left, at the start of the array
    //One right, at the end of the array
    //If nums[left] is equal to val, replace it with the first num[right] that is not equal to val and decrease right
    //Do these switches until left and right meet, increase res as necessary

    let left = 0
    let right = nums.length-1
    let res = 0
    while(left<=right){
        if(nums[left] !== val){
            left++
            res++
        }else{
            if(nums[right] !== val){
                nums[left] = nums[right]
                left++
                right--
                res++
            }else{
                right--
            }
        }
    }

    // console.log(nums);
    return res
}

// console.log(removeElementBis([1,1,1,1,1,1], 1)); // 0 nums = [_,_,...]
// console.log(removeElementBis([3,2,2,3], 3)); // 2, nums = [2,2,_,_]
// console.log(removeElementBis([0,1,2,2,3,0,4,2], 2)); // 5, nums = [0, 1, 4, 0, 3, _, _, _]
// console.log(removeElementBis([0,1,2,3,4,5], 6)); // 6, nums = [0,1,2,3,4,5]