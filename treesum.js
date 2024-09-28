const arr = [5,7,[4,[2],8,[1,3],2],[9,[]],1,8];

function treeSum (array) {
    let result = 0;
    array.forEach(element => {
        if(typeof element === 'number'){
            result += element;
        } 
        if(Array.isArray(element) && element.length > 0) {
            result += treeSum(element);
        }
    });
    return result;
}

console.log(treeSum(arr));