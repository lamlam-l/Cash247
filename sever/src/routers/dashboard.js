const express = require('express')
const router = express.Router()

const Wallet = require('../controllers/Wallet')
const Trade = require('../controllers/Trade')

router.post('/wallet/getWallets', Wallet.getWallet)
router.post('/wallet/addWallet', Wallet.addWallet)
router.post('/wallet/updateWallet', Wallet.updateWallet)
router.post('/wallet/deleteWallet', Wallet.deleteWallet)

router.post('/trade/addTrade', Trade.addTrade)
router.post('/trade/updateTrade', Trade.updateTrade)
router.post('/trade/deleteTrade', Trade.deleteTrade)

module.exports = router