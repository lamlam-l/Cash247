const Wallets = require('../models/wallet')
const Users = require('../models/users')


class Wallet {


    //POST /dashboard/wallet/getWallets
    async getWallet(req, res) {
        const { name } = req.body
        try {
            const user = await Users.findOne({ name })
            if (!user)
                return res.json({ success: false, messgae: 'user not found' })

            const wallets = await Wallets.find({ userId: user._id.toString() })

            res.json({ success: true, wallets })
        } catch (error) {
            return res.json({ success: false, message: error.message })
        }
    }


    //POST /dashboard/wallet/addWallet
    async addWallet(req, res) {
        const { name } = req.body
        const { walletName, balance } = req.body.wallet
        try {
            //verified
            const user = await Users.findOne({ name })
            if (!user)
                return res.json({ success: false, messgae: 'user not found' })

            //save
            const userId = user._id.toString()
            const wallets = await Wallets.find({ userId })
            const wallet = Wallets({
                userId,
                walletId: wallets.length + 1,
                walletName,
                balance,
                trades: []
            })
            await wallet.save()
            res.json({ success: true, message: 'wallet added!' })

        } catch (error) {
            return res.json({ success: false, message: error.message })
        }
    }


    //POST /dashboard/wallet/updateWallet
    async updateWallet(req, res) {
        const { name, walletId } = req.body
        var { newWalletName, newBalance } = req.body.newWallet
        try {
            //verified
            const user = await Users.findOne({ name })
            if (!user)
                return res.json({ success: false, messgae: 'user not found' })
            const wallet = (await Wallets.find({ userId: user._id.toString() }))
                .filter((wallet) => wallet.walletId == walletId)[0]
            if (!wallet)
                return res.json({ success: false, message: 'wallet not found' })
            if (newWalletName == '')
                newWalletName = wallet.walletName
            //save
            const d = new Date()
            if (newBalance < wallet.balance) {
                const updateBalanceTrade = {
                    day: d.getDate(),
                    month: d.getMonth(),
                    year: d.getFullYear(),
                    spendType: 'update balance',
                    amount: wallet.balance - newBalance,
                    decription: 'update wallet balance'
                }
                wallet.trades.push(updateBalanceTrade)
                await Wallets.findOneAndUpdate({ userId: wallet.userId, walletId: wallet.walletId }, {
                    walletName: newWalletName,
                    balance: newBalance,
                    trades: wallet.trades
                })

            } else if (newBalance > wallet.balance) {
                const updateBalanceTrade = {
                    day: d.getDate(),
                    month: d.getMonth(),
                    year: d.getFullYear(),
                    reciveType: 'update balance',
                    amount: newBalance - wallet.balance,
                    decription: 'update wallet balance'
                }
                wallet.trades.push(updateBalanceTrade)
                await Wallets.findOneAndUpdate({ userId: wallet.userId, walletId: wallet.walletId }, {
                    walletName: newWalletName,
                    balance: newBalance,
                    trades: wallet.trades
                })

            } else {
                await Wallets.findOneAndUpdate({ userId: wallet.userId, walletId: wallet.walletId }, {
                    walletName: newWalletName,
                    balance: newBalance,
                    trades: wallet.trades
                })
            }

            return res.json({ success: true, message: 'wallet updated!' })
        } catch (error) {
            return res.json({ success: false, message: error.message })
        }
    }
    

    //POST /dashboard/wallet/deleteWallet
    async deleteWallet(req, res) {
        const { name, walletId } = req.body
        try {
            //verified
            const user = await Users.findOne({ name })
            if (!user)
                return res.json({ success: false, messgae: 'user not found' })
            const wallet = (await Wallets.find({ userId: user._id.toString() }))
                .filter((wallet) => wallet.walletId == walletId)[0]
            if (!wallet)
                return res.json({ success: false, message: 'wallet not found' })

            //save
            const wallets = (await Wallets.find({ userId: user._id.toString() }))
            await Wallets.findOneAndDelete({ walletId })
            wallets.map(async (wallet) => {
                if (wallet.walletId > walletId) {
                    wallet.walletId--
                    await Wallets(wallet).save()
                }
            })
            return res.json({ success: true, message: 'wallet deleted!' })
        } catch (error) {
            return res.json({ success: false, message: error.message })
        }
    }

}

module.exports = new Wallet