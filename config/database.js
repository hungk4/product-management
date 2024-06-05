const mongoose = require('mongoose')
module.exports.connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("ket noi database THANH CONG!");
    } catch (error) {
        console.log(error);
        console.log("ket noi database THAT BAI!");
    }
}