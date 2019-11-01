const mongoose = require('mongoose')

if (process.argv.length != 3 || process.argv.length != 5) {
    console.error("wrong params")
    process.exit(1);
}

const password=process.argv[2];
const url = `mongodb+srv://jr:${password}@fso-o7vtd.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true });

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Phone = mongoose.model('Phone', phoneSchema);

if (process.argv.length == 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    const phone = new Phone({
        name: name,
        number: number
    })

    phone.save().then(response => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close();
    })
}
else {
    Phone.find({}).then(response => {
        response.forEach(entry => {
            console.log(entry)
        })
        mongoose.connection.close();
    })
}