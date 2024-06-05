const { response } = require('express')
const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url =
  `mongodb+srv://test:${password}@cluster0.m9hgcng.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name : String,
  number : String,
})

const phoneModel = mongoose.model('phoneBook',phoneSchema)

const addPerson = () =>{
  const phoneBookEntry = new phoneModel({
    name : name,
    number : number
  })

  phoneBookEntry.save().then(result =>{
    console.log(`added ${name} with number ${number} to the phonebook`)
    mongoose.connection.close()
  })
}

const findPerson = () => {
  console.log("im at find person");
  phoneModel.find({}).then(result =>{
    result.forEach(person => console.log(person))
    mongoose.connection.close()
  })
}


switch(process.argv.length){
  case 2:
    console.log('give password as argument')
    process.exit(1)
    break
  case 3:
    findPerson()
    break
  case 4:
    console.log("please include name/number when inputting new data")
    process.exit(1)
    break
  case 5:
    addPerson()
    break
}
