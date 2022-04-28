const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    username: {type: String},
    msg: {type: String,required: true}
})

const Msg = mongoose.model('msg', msgSchema);
module.exports = Msg;