const hi = 'HELLO'
const alphaL = 'abcdefghijklmnopqrstuvwxyz'
const alphaU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//===========================================
// https://leetcode.com/problems/rotate-image/
// You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

// You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

// Example 1:
// SEE IMG
// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [[7,4,1],[8,5,2],[9,6,3]]

// Example 2:
// SEE IMG
// Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
// Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
 

// Constraints:
// n == matrix.length == matrix[i].length
// 1 <= n <= 20
// -1000 <= matrix[i][j] <= 1000

function rotateClockwise(matrix){
    /*
    clockwise rotate
    mirror it on the right, then swap following the top-right to bottom-left diagonal symmetry
    1 2 3      3 2 1      7 4 1
    4 5 6  =>  6 5 4  =>  8 5 2
    7 8 9      9 8 7      9 6 3

    5 1 9 11        11 9 1 5        15 13 2 5
    2 4 8 10     => 10 8 4 2    =>  14 3 4 1
    13 3 6 7        7 6 3 13        12 6 8 9
    15 14 12 16     16 12 14 15     16 7 10 11
    */

    //mirror it on the right
    for(let row=0 ; row<matrix.length ; row++){
        for(let col=0 ; col<Math.floor(matrix.length/2) ; col++){
            [matrix[row][col] , matrix[row][matrix.length-1-col]] = [matrix[row][matrix.length-1-col] , matrix[row][col]]
        }
    }

    //swap following the top-right to bottom-left diagonal symmetry
    for(let row=0 ; row<matrix.length ; row++){
        for(let col=0 ; col<matrix.length-row ; col++){
            [matrix[row][col] , matrix[matrix.length-1-col][matrix.length-1-row]] = [matrix[matrix.length-1-col][matrix.length-1-row] , matrix[row][col]]
        }
    }

    return matrix
}

// console.log(rotateClockwise([[1,2,3],[4,5,6],[7,8,9]])) // [[7,4,1],[8,5,2],[9,6,3]]
// console.log(rotateClockwise([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]])) // [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

function rotateCounterclockwise(matrix){
    /*
    counterclockwise rotate
    mirror it on the bottom, then swap following the top-right to bottom-left diagonal symmetry
    1 2 3      7 8 9      3 6 9
    4 5 6  =>  4 5 6  =>  2 5 8
    7 8 9      1 2 3      1 4 7

    5 1 9 11        15 14 12 16     11 10 7 16
    2 4 8 10     => 13 3 6 7    =>  9 8 6 12
    13 3 6 7        2 4 8 10        1 4 3 14
    15 14 12 16     5 1 9 11        5 2 13 15
    */

    //mirror it on the bottom
    for(let row=0 ; row<Math.floor(matrix.length/2) ; row++){
        [matrix[row] , matrix[matrix.length-1-row]] = [matrix[matrix.length-1-row] , matrix[row]]
    }

    //swap following the top-right to bottom-left diagonal symmetry
    for(let row=0 ; row<matrix.length ; row++){
        for(let col=0 ; col<matrix.length-row ; col++){
            [matrix[row][col] , matrix[matrix.length-1-col][matrix.length-1-row]] = [matrix[matrix.length-1-col][matrix.length-1-row] , matrix[row][col]]
        }
    }

    return matrix
}

// console.log(rotateCounterclockwise([[1,2,3],[4,5,6],[7,8,9]])) // [[3,6,9],[2,5,8],[1,4,7]]
// console.log(rotateCounterclockwise([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]])) // [[11,10,7,16],[9,8,6,12],[1,4,3,14],[5,2,13,15]]

//Same idea than before. We can save a bit of time by using a mirroring on the bottom, then swap following the top-left to bottom-right diagonal symmetry which happen to be very easy as it is a swap between matrix[col][row] with matrix[row][col]. The swapping following this diagonal is called the transposed matrix
function rotateClockwiseBis(matrix){
    //mirror it on the bottom
    for(let row=0 ; row<Math.floor(matrix.length/2) ; row++){
        [matrix[row] , matrix[matrix.length-1-row]] = [matrix[matrix.length-1-row] , matrix[row]]
    }

    //swap following the top-left to bottom-right diagonal symmetry
    for(let row=0 ; row<matrix.length ; row++){
        for(let col=0 ; col<row ; col++){
            [matrix[row][col] , matrix[col][row]] = [matrix[col][row] , matrix[row][col]]
        }
    }

    return matrix
}

// console.log(rotateClockwiseBis([[1,2,3],[4,5,6],[7,8,9]])) // [[7,4,1],[8,5,2],[9,6,3]]
// console.log(rotateClockwiseBis([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]])) // [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

// From : https://www.geeksforgeeks.org/inplace-rotate-square-matrix-by-90-degrees/
// and : https://leetcode.com/problems/rotate-image/solutions/1175496/js-python-java-c-easy-4-way-swap-solution-w-explanation/
// We will consider matrices as having layers of outer elements. For example, the first layer is formed by its 1st row, last column, last row, and 1st column. The second cycle is formed by the 2nd row, second-last column, second-last row, and 2nd column (minus one element on each side). We will rotate elements inside a layer, then going to the next layer and repeat the process. For a matrix of size NxN, there are Math.floor(N/2) layers.

function rotateClockwiseTer(matrix){
    //Loop through layers
    for(let lay=0 ; lay<Math.floor(matrix.length/2) ; lay++){
        //Take the first element of the first row, replace the first element of the last col, which will replace the last element of the last row, which will replace the last element of the first col, which will finally fill the first element of the first row.
        //Repeat this process for the second element of the first row.
        for(let i=0 ; i<matrix.length-1-lay*2 ; i++){
            //start at top left is matrix[lay][lay+i]
            //start at top right is matrix[lay+i][matrix.length-1-lay]
            //start at bottom right is matrix[matrix.length-1-lay][matrix.length-1-lay-i]
            //start at bottom left is matrix[matrix.length-1-lay-i][lay]
            let temp = matrix[lay][lay+i]
            matrix[lay][lay+i] = matrix[matrix.length-1-lay-i][lay]
            matrix[matrix.length-1-lay-i][lay] = matrix[matrix.length-1-lay][matrix.length-1-lay-i]
            matrix[matrix.length-1-lay][matrix.length-1-lay-i] = matrix[lay+i][matrix.length-1-lay]
            matrix[lay+i][matrix.length-1-lay] = temp

        }
    }

    return matrix
}

// console.log(rotateClockwiseTer([[1,2,3],[4,5,6],[7,8,9]])) // [[7,4,1],[8,5,2],[9,6,3]]
// console.log(rotateClockwiseTer([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]])) // [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

//Same principle but for counterclockwise rotation :

function rotateCounterclockwiseBis(matrix){
        //Loop through layers
        for(let lay=0 ; lay<Math.floor(matrix.length/2) ; lay++){
            //Take the first element of the first col, replace the first element of the last row, which will replace the last element of the last col, which will replace the last element of the first row, which will finally fill the first element of the first row.
            //Repeat this process for the second element of the first col.
            for(let i=0 ; i<matrix.length-1-lay*2 ; i++){
                //start at top left is matrix[lay+i][lay]
                //start at bottom left is matrix[matrix.length-1-lay][lay+i]
                //start at bottom right is matrix[matrix.length-1-lay-i][matrix.length-1-lay]
                //start at top right is matrix[lay][matrix.length-1-lay-i]
                let temp = matrix[lay+i][lay]
                matrix[lay+i][lay] = matrix[lay][matrix.length-1-lay-i]
                matrix[lay][matrix.length-1-lay-i] = matrix[matrix.length-1-lay-i][matrix.length-1-lay]
                matrix[matrix.length-1-lay-i][matrix.length-1-lay] = matrix[matrix.length-1-lay][lay+i]
                matrix[matrix.length-1-lay][lay+i] = temp
            }
        }
    
        return matrix
}

// console.log(rotateCounterclockwiseBis([[1,2,3],[4,5,6],[7,8,9]])) // [[3,6,9],[2,5,8],[1,4,7]]
// console.log(rotateCounterclockwiseBis([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]])) // [[11,10,7,16],[9,8,6,12],[1,4,3,14],[5,2,13,15]]
// console.log(rotateCounterclockwiseBis([[1, 2, 3, 4],[ 5, 6, 7, 8 ],[9, 10, 11, 12 ],[13, 14, 15, 16]])) // [[ 4, 8, 12, 16 ],[ 3, 7, 11, 15 ],[ 2, 6, 10, 14 ],[ 1, 5, 9, 13 ]]

//============================================
// https://leetcode.com/problems/group-anagrams/
// Given an array of strings strs, group the anagrams together. You can return the answer in any order.

// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

// Example 1:
// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

// Example 2:
// Input: strs = [""]
// Output: [[""]]

// Example 3:
// Input: strs = ["a"]
// Output: [["a"]]
 
// Constraints:

// 1 <= strs.length <= 104
// 0 <= strs[i].length <= 100
// strs[i] consists of lowercase English letters.


//Naive thinking : Get the freq of each string, consider it as its "signature" then group together those sharing the same freq
var groupAnagrams = function(strs) {
    let freqs = strs.map(s => {
        let freq = s.split('').reduce((acc, cur) => {
            acc[cur] = (acc[cur] || 0) + 1
            return acc
        }, {})
        //alphabetically sorting the keys
        return Object.keys(freq).sort().reduce((acc, cur) => {
            acc[cur] = freq[cur]
            return acc
        }, {})
    })

    //Getting the indices of each strings sharing the same "signature". The signature will be a stringify JSON Object and will serve as keys
    let groupedFreqs = {}
    freqs.forEach((freq, idx) => {
        let key = JSON.stringify(freq)
        if(!groupedFreqs.hasOwnProperty(key)) groupedFreqs[key] = []
        groupedFreqs[key].push(idx)
    })

    //Finally, from the saved indices, return the expected result
    let res = []
    for(let arrayOfIndices in groupedFreqs){
        res.push(groupedFreqs[arrayOfIndices].map(i => strs[i]))
    }

    return res
};

// console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"])) // [["bat"],["nat","tan"],["ate","eat","tea"]]

//What an horrible code... but working

//Small improve of the naive thinking : Instead of keeping track of the indices, keep track of the strings instead
function groupAnagramsBis(strs){
    let freqs = strs.map(s => {
        let freq = s.split('').reduce((acc, cur) => {
            acc[cur] = (acc[cur] || 0) + 1
            return acc
        }, {})
        //alphabetically sorting the keys
        return Object.keys(freq).sort().reduce((acc, cur) => {
            acc[cur] = freq[cur]
            return acc
        }, {})
    })

    //Getting the indices of each strings sharing the same "signature". The signature will be a stringify JSON Object and will serve as keys
    let groupedFreqs = {}
    freqs.forEach((freq, idx) => {
        let key = JSON.stringify(freq)
        if(!groupedFreqs.hasOwnProperty(key)) groupedFreqs[key] = []
        groupedFreqs[key].push(strs[idx])
        // groupedFreqs[key] = groupedFreqs[key] ? groupedFreqs[key].concat(strs[idx]) : [].concat(strs[idx])
    })

    //Finally, from the saved strings, return the expected result
    let res = []
    for(let arrayOfStrings in groupedFreqs){
        res.push(groupedFreqs[arrayOfStrings])
    }

    return res
}

// console.log(groupAnagramsBis(["eat","tea","tan","ate","nat","bat"])) // [["bat"],["nat","tan"],["ate","eat","tea"]]

//Just keep an Object with the alphabetically sorted string as key...
function groupAnagramsTer(strs){
    let groupedAnagrams = strs.reduce((acc, cur) => {
        let sorted = cur.split('').sort()
        acc[sorted] = (acc[sorted] || []).concat(cur)
        return acc
    }, {})

    let res = []
    for(let signature in groupedAnagrams){
        res.push(groupedAnagrams[signature])
    }
    return res
    //return Object.values(groupedAnagrams)
}

// console.log(groupAnagramsTer(["eat","tea","tan","ate","nat","bat"])) // [["bat"],["nat","tan"],["ate","eat","tea"]]

//Let's try with a single reduce :
function groupAnagramsQuater(strs){
    return strs.reduce((acc, cur) => {
        let tempIdx = acc.findIndex(subArr => areAnagrams(subArr[0], cur))
        if(tempIdx === -1) acc.push([cur])
        else acc[tempIdx].push(cur)
        return acc
    }, [])

    function areAnagrams(word1, word2){
        if(word1.length !== word2.length) return false

        let freq = {}
        for(let char of word1){
            freq[char] = (freq[char] || 0) + 1
        }

        for(let char of word2){
            if(!freq.hasOwnProperty(char)) return false
            freq[char]--
        }

        for(let char in freq){
            if(freq[char] !== 0) return false
        }

        return true
    }
}

// console.log(groupAnagramsQuater(["eat","tea","tan","ate","nat","bat"])) // [ [ 'eat', 'tea', 'ate' ], [ 'tan', 'nat' ], [ 'bat' ] ]
// The findIndex makes this option bad in complexity.

//Going back to the signature method, instead of the sorted string, by mapping a character to a prime number, we can use the product of each character. This method works if strings are not too long, so the result of our product is not too big.
//Lower case letters char code range from 97 to 122 included

function groupAnagramsQuinquies(strs){
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101] //26 primes for each characters
    const map = {}
    strs.forEach(s => {
        let prod = s.split('').reduce((acc, cur) => acc * primes[cur.charCodeAt() - 97], 1)
        map[prod] ? map[prod].push(s) : map[prod] = [s]
    })

    return Object.values(map)
}

// console.log(groupAnagramsQuinquies(["eat","tea","tan","ate","nat","bat"])) // [ [ 'bat' ], [ 'eat', 'tea', 'ate' ], [ 'tan', 'nat' ] ]

//==========================================
