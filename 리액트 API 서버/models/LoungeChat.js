const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const loungeChatSchema = new Schema({
    nickname: {
        type: String,
        reuired: true,
    },
    password: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
})

const LoungeChat = mongoose.model('loungeChats', loungeChatSchema);
module.exports = LoungeChat