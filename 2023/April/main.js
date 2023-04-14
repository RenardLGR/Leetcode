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
// https://leetcode.com/problems/valid-parentheses/
// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.
 

// Example 1:

// Input: s = "()"
// Output: true
// Example 2:

// Input: s = "()[]{}"
// Output: true
// Example 3:

// Input: s = "(]"
// Output: false
 

// Constraints:

// 1 <= s.length <= 104
// s consists of parentheses only '()[]{}'.

var isValidParantheses = function(s) {
    //replace every '()', '[]' and '{}' with an empty string, repeat until done. If the string is till not empty return false

    if(s === '') return false

    let pattern = /\(\)|\[\]|\{\}/g
    let isDone = false
    while(!isDone){
        isDone = true
        if(pattern.test(s)){
            s = s.replace(pattern, '')
            isDone = false
        }
    }

    return s === ""
};

// console.log(isValidParantheses("{[()]}")); //true
// console.log(isValidParantheses("()(())")); //true
// console.log(isValidParantheses("[(])")); //false

function isValidParanthesesBis(s){
    //This could be viewed as stack, last in first out with an opening parentheses adding to the stack. 
    let mirror = {
        ')' : '(',
        ']' : '[',
        '}' : '{'
    }
    let stack = []

    for(let i=0 ; i<s.length ; i++){
        if( '([{'.includes(s[i]) ){
            stack.push(s[i])
        }else{
            if(stack[stack.length-1] === mirror[s[i]]){
                stack.pop()
            }else{
                return false
            }
        }
    }

    return stack.length === 0
}

// console.log(isValidParanthesesBis("{[()]}")); //true
// console.log(isValidParanthesesBis("()(())")); //true
// console.log(isValidParanthesesBis("[(])")); //false

//=========================================
