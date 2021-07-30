const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD'
}

const object2 = {
    name: 'Full Stack web application development',
    level: 'intermediate studies',
    size: 5
}

const object3 = {
    name: {
        first: 'Dan',
        last: 'Abramov'
    },
    grades: [2,3,5,3],
    department: 'University of Illinois - Urbana-Champaign'
}

// can access properties of an object using dot notation or by brackets
console.log(object1.name)       // Arto Hellas is printed
const fieldName = 'age'
console.log(object1[fieldName]) // 35 is printed
console.log(object1['age'])     // 35 is printed

// can also add properties to an object on the fly by either using dot notation or brackets
object1.address = 'Helsinki'
object1['secret number'] = 12341
