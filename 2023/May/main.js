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

//Similar idea, faster, we build two lists, append the reversed or non reversed as necessary

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
