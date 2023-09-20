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
        //Take the first element of the first row, replace the first element of the last col, which will replace the first element of the last row, which will finally fill the first element of the first row.
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

console.log(rotateClockwiseTer([[1,2,3],[4,5,6],[7,8,9]])) // [[7,4,1],[8,5,2],[9,6,3]]
console.log(rotateClockwiseTer([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]])) // [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]