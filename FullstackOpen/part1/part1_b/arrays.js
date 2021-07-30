const t = [1, -1, 3]
t.push(5)

console.log(t.length)   // 4 is printed
console.log(t[1])       // -1 is printed

t.forEach(value => {
    console.log(value)
})                      // numbers 1, -1, 3, 5 are printed, each to own line


// concat creates a new array. React uses techniques from functional programming often.
// One characteristic of the functional programming paradigm is the use of immutable data structures
const another_t = [1, -1, 3]

const t2 = another_t.concat(5)

console.log(another_t)          // [1, -1, 3] is printed
console.log(t2)         // [1, -1, 3, 5] is printed


//  map creates a _new_ array
const t3 = [1,2,3]
const m1 = t3.map(value => value *2)
console.log(m1)         // [2, 4, 6] is printed
const m2 = t3.map(value => '<li>' + value + '</li>')
console.log(m2)


//  destructuring assignment
const t4 = [1,2,3,4,5]
const [first, second, ...rest] = t4
console.log(first, second)      // 1,2 is printed
console.log(rest)               // [3,4,5] is printed
