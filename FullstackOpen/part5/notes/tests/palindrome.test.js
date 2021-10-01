// jest expects by default that the names of test files contain .test
// convention is to name test files with extension .test.js

// import the function to be tested and assign it to a variable called palindrome
const palindrome = require('../utils/for_testing').palindrome

// first parameter of the test function is the test description as a string
// the second parameter is a function that defines the functionality for the test case
test('palindrome of a', () => {
    const result = palindrome('a')
    // expect wraps the resulting value into an object that offers a collection of matcher functions. We are comparing two strings, so we use the toBe matcher
    expect(result).toBe('a')
})

test('palindrome of react', () => {
    const result = palindrome('react')
    expect(result).toBe('tcaer')
})

test('palindrome of releveler', () => {
    const result = palindrome('releveler')
    expect(result).toBe('releveler')
})