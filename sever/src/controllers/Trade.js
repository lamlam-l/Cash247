const Wallets = require('../models/wallet')
const Users = require('../models/users')

class Trade {


    //POST /dashboard/trade/addTrade
    async addTrade(req, res) {
        const { name, walletId } = req.body
        const { day, month, year, spendType, reciveType, amount, decription } = req.body.trade
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
            const d = new Date()
            if (reciveType) {
                wallet.balance += amount
                console.log(undefined == 0)
                wallet.trades.push({
                    day: !day ? d.getDate() : day,
                    month: !month ? d.getMonth() : month,
                    year: !year ? d.getFullYear() : year,
                    reciveType,
                    amount,
                    decription,
                })
                await wallet.save()
                return res.json({ success: true, message: 'trade added!' })
            }
            if (spendType) {
                wallet.balance -= amount
                console.log(undefined == 0)
                wallet.trades.push({
                    day: !day ? d.getDate() : day,
                    month: !month ? d.getMonth() : month,
                    year: !year ? d.getFullYear() : year,
                    spendType,
                    amount,
                    decription,
                })
                await wallet.save()
                return res.json({ success: true, message: 'trade added!', wallet })
            }

        } catch (error) {
            return res.json({ success: false, message: error.message })
        }
    }


    //POST /dashboard/trade/updateTrade
    async updateTrade(req, res) {
        const { name, walletId, tradeId } = req.body
        const { newDay, newMonth, newYear, newSpendType, newReciveType, newAmount, newDecription } = req.body.trade
        try {
            //verified
            const user = await Users.findOne({ name })
            if (!user)
                return res.json({ success: false, messgae: 'user not found' })
            const wallet = (await Wallets.find({ userId: user._id.toString() }))
                .filter((wallet) => wallet.walletId == walletId)[0]
            if (!wallet)
                return res.json({ success: false, message: 'wallet not found' })
            const trade = wallet.trades.filter((trade) => trade._id.toString() == tradeId)[0]
            if (!trade)
                return res.json({ success: false, message: 'trade not found' })

            //save
            trade.day = !newDay ? trade.day : newDay
            trade.month = !newMonth ? trade.month : newMonth
            trade.year = !newYear ? trade.year : newYear
            trade.decription = !newDecription ? trade.decription : newDecription
            if (trade.spendType) {
                wallet.balance += trade.amount
                trade.spendType = undefined
            } else {
                wallet.balance -= trade.amount
                trade.reciveType = undefined
            }
            if (newSpendType) {
                wallet.balance -= newAmount
                trade.spendType = newSpendType
            } else {
                wallet.balance += newAmount
                trade.reciveType = newReciveType
            }
            trade.amount = newAmount
            await wallet.save()
            res.json({ success: true, message: "trade updated!", wallet })
        } catch (error) {
            return res.json({ success: false, message: error.message })
        }
    }


    //dashboard/trade/deleteTrade
    async deleteTrade(req, res) {
        const { name, walletId, tradeId } = req.body
        try {
            //verified
            const user = await Users.findOne({ name })
            if (!user)
                return res.json({ success: false, messgae: 'user not found' })
            const wallet = (await Wallets.find({ userId: user._id.toString() }))
                .filter((wallet) => wallet.walletId == walletId)[0]
            if (!wallet)
                return res.json({ success: false, message: 'wallet not found' })
            const trade = wallet.trades.filter((trade) => trade._id.toString() == tradeId)[0]
            if (!trade)
                return res.json({ success: false, message: 'trade not found' })

            //save
            if (trade.reciveType)
                wallet.balance -= trade.amount
            else
                wallet.balance += trade.amount
            wallet.trades.splice(wallet.trades.indexOf(trade), 1)
            await wallet.save()
            return res.json({ success: true, mesasge: 'trade deleted' })
        } catch (error) {
            return res.json({ success: false, message: error.message })
        }
    }

}

module.exports = new Trade