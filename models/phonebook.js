const mongoose = require('mongoose')
const mongoose_validator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true})
    .then(response => {
        console.log("successfully connected to mongodb!")
    })
    .catch(error => console.log("mongdb connect error", error.message)
)

const phoneSchema = new mongoose.Schema({
    name: { 
        type: String,
        minlength: 3,
        unique: true
    },
    number: {
        type: Number,
        minlength: 8,
        unique: true
    }
})

mongoose.plugin(mongoose_validator)

phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;