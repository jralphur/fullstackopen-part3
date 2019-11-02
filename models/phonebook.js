const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true})
    .then(response => {
        console.log("successfully connected to mongodb!")
    })
    .catch(error => console.log("mongdb connect error", error.message)
)

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String
})

phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;