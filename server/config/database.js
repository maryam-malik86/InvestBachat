const mongoose=require('mongoose')

require('dotenv').config()
const MONGODB_URL = process.env.MONGODB_URL
function dbconnection(){
    mongoose.connect(MONGODB_URL)
    .then(()=>{console.log(`Db is connected ${MONGODB_URL}`)})
    .catch((error)=>{console.log('Db is not connected check it again ',error)})
}

module.exports=dbconnection;
