const mongoose = require('mongoose')
const { Schema } = mongoose

const trade = new Schema({
    day: { type: Number, requires: true },
    month: { type: Number, requires: true },
    year: { type: Number, requires: true },
    spendType: {
        type: String,
        enum: [
            'eating & food',
            'rent',
            'water',
            'gas',
            'internet',
            'telephone',
            'TV',
            'transportation',
            'shopping',
            'friend & partner',
            'entertainment',
            'travel',
            'health',
            'charity & donations',
            'family',
            'education',
            'investment',
            'business',
            'insurance',
            'withdraw money',
            'other',
            'update balance'
        ],
    },
    reciveType: {
        type: String,
        enum: [
            'salary',
            'award',
            'be donated',
            'sell stuff',
            'other',
            'update balance'
        ],
    },
    amount: { type: Number, required: true },
    decription: { type: String }
})

const wallet = new Schema({
    userId: { type: String, required: true },
    walletId: { type: Number, required: true },
    walletName: { type: String, required: true, default: 'My wallet' },
    balance: { type: Number, required: true, default: '0' }, //default unit: dollar
    trades: { type: [trade], required: true }
})

module.exports = mongoose.model('wallets', wallet)