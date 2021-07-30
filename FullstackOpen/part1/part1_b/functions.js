const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1+p2
}

const result = sum(1,5)
console.log(result)

// if there is just a single paramter, we can exclude the parentheses from the definition
const square = p => {
    console.log(p)
    return p*p
}

//  if the function only contains a single expression then the braces are not needed
const new_square = p => p*p

const t = [1,2,3]
const tSquared = t.map(p => p*p)    // tSquared is now [1,4,9]

// the older way to define a function
function product(a,b) {
    return a*b
}

const new_result = product(2,6)     // result is now 12
