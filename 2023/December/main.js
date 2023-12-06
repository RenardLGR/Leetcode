const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//======================================================
// https://leetcode.com/problems/permutation-sequence/
// The set [1, 2, 3, ..., n] contains a total of n! unique permutations.

// By listing and labeling all of the permutations in order, we get the following sequence for n = 3:

// "123"
// "132"
// "213"
// "231"
// "312"
// "321"
// Given n and k, return the kth permutation sequence.

// Example 1:
// Input: n = 3, k = 3
// Output: "213"

// Example 2:
// Input: n = 4, k = 9
// Output: "2314"

// Example 3:
// Input: n = 3, k = 1
// Output: "123"

// Constraints:

// 1 <= n <= 9
// 1 <= k <= n!

//Very naive approach : build every permutations and select the right one

//This function gives all permutations of the set [1, 2, 3, ..., n]
function permutations(n){
    let res = []
    solve([], [...Array(n+1).keys()].slice(1)) // build [1, 2, 3, ..., n]
    return res
    
    function solve(inP, remaining){
        if(remaining.length === 0){
            res.push(inP.slice())
            return
        }

        for(let i=0 ; i<remaining.length ; i++){
            let newRemaining = remaining.slice(0, i).concat(remaining.slice(i+1))
            solve([...inP, remaining[i]] , newRemaining)
            // let newRemaining = remaining.slice()
            // let cur = newRemaining.splice(i,1)
            // solve(inP.concat(cur) , newRemaining)
        }
    }
}

// console.log(permutations(3))
// console.log(permutations(4))


var getPermutation = function(n, k) {
    const perms = permutations(n)
    return perms[k-1].join("")
}

// console.log(getPermutation(4, 9)) // "2314"
// console.log(getPermutation(4, 6)) // "1432"
// console.log(getPermutation(8, 77)) // "12374856"

// There are n! permutations, the first (n-1)! permutations will start with 1, the second (n-1)! permutations will start with 2, etc.
// Furthermore, inside the first (n-1)! permutations, (n-2)! permutations will start with [1,2,...] and (n-2)! permutations will start with [1,3,...]
// Understanding that, considering the set [1, 2, 3, ..., n] , idx = Math.floor(k / (n-1)!) gives the index of the first number
// We can repeat this process with the set being the previous set minus the number previously found and k' = k - idx*Math.floor(k / (n-1)!) and idx' = Math.floor(k' / (n-2)!)

function getPermutationBis(n, k){
    k--

    let set = [...Array(n+1).keys()].slice(1)
    let res = ""
    while(k > 0){
        let idx = Math.floor(k / factorial(set.length-1))
        let curr = set.splice(Math.floor(k / factorial(set.length-1)) , 1)
        res += curr
        k -= idx*factorial(set.length) //the length was reduced by one two lines above
    }

    return res + set.reduce((acc, cur) => acc+cur, '')

    function factorial(n){
        if(n <= 1) return 1

        return n * factorial(n-1)
    }
}

// console.log(getPermutationBis(4, 9)) // "2314"
// console.log(getPermutationBis(4, 6)) // "1432"
// console.log(getPermutationBis(8, 77)) // "12374856"
// console.log(getPermutationBis(8, 1)) // "12345678"


//Same than above, clearer
function getPermutationTer(n, k){
    k--

    let set = [...Array(n+1).keys()].slice(1)
    let res = ""
    while(k > 0){
        const idx = Math.floor(k / factorial(set.length-1))
        k -= idx*factorial(set.length-1)
        res += set.splice(idx , 1)
    }

    return res + set.reduce((acc, cur) => acc+cur, '')

    function factorial(n){
        if(n <= 1) return 1

        return n * factorial(n-1)
    }
}

// console.log(getPermutationTer(4, 9)) // "2314"
// console.log(getPermutationTer(4, 6)) // "1432"
// console.log(getPermutationTer(8, 77)) // "12374856"
// console.log(getPermutationTer(8, 1)) // "12345678"

//Same than above, shaving seconds with factorial (and set) implementation
function getPermutationQuater(n, k){
    let set = []
    let factorials = {0:1}

    for(let i=1 ; i<=n ; i++){
        factorials[i] = i * factorials[i-1]
        set.push(i)
    }

    k--
    let res = ""
    while(k > 0){
        const idx = Math.floor(k / factorials[set.length-1])
        k -= idx*factorials[set.length-1]
        res += set.splice(idx , 1)
    }

    return res + set.reduce((acc, cur) => acc+cur, '')
}

// console.log(getPermutationQuater(4, 9)) // "2314"
// console.log(getPermutationQuater(4, 6)) // "1432"
// console.log(getPermutationQuater(8, 77)) // "12374856"
// console.log(getPermutationQuater(8, 1)) // "12345678"