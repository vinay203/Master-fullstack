const person = {
    name: "Vinay",
    age: 20,
    city: "Hyderabad"
}

const { name, ...rest } = person

console.log(name)
console.log(rest)