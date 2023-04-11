const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//=========================================
// https://leetcode.com/problems/remove-nth-node-from-end-of-list/
// Given the head of a linked list, remove the nth node from the end of the list and return its head.

// Example 1:
// 1 -> 2 -> 3 -> 4 -> 5
// =>           elim 4
// 1 -> 2 -> 3 -> 5

// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]

// Example 2:
// Input: head = [1], n = 1
// Output: []

// Example 3:
// Input: head = [1,2], n = 1
// Output: [1]
 

// Constraints:
// The number of nodes in the list is sz.
// 1 <= sz <= 30
// 0 <= Node.val <= 100
// 1 <= n <= sz
 
// Follow up: Could you do this in one pass?

var removeNthFromEnd = function(head, n) {
    //2 pointers, 1 at start, the other n nodes ahead.
    //When the second pointer reaches the end, the first will be n steps before the end, eliminate this pointer
    //We encounter 3 possibilities :
    //1) n is smaller than the length of the list, in that case, we delete the element following left
    //2) n is equal to the length of of the list, in that case, we delete the head element
    //3) n is greater than the length of the list, in that case, no element are deleted

    if(n===0){ //don't bother reaching the end
        return head
    }
    
    let left = head
    let right = head
    //Initialize right
    for(let i=0 ; i<n ; i++){
        if(right.next){
            right = right.next
        }else{
            //case 2), n is equal to the length of the list
            if(n-i===1){ //if(!right) works too here
                return head.next
            }
            //case 3), the linked list is shorter than n, we don't eleminate any element and simply return head
            return head
        }
    }

    //case 1)
    //Reach the end
    while(right.next){
        right = right.next
        left = left.next
    }

    left.next = left.next.next

    return head
};

//=========================================
