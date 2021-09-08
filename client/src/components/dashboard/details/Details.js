import { Card } from 'react-bootstrap'

import UpdateWalletForm from './UpdateWalletForm'

function Detail(props) {
    const wallet = props.wallet
    const trades = wallet.trades

    //unit
    const currentUnit = localStorage.getItem('currentUnit')
    var aspect
    switch (currentUnit) {
        case 'USD':
            aspect = 1
            break
        case 'VND':
            aspect = 23500
            break
        default:
            aspect = 1
            break
    }

    var balance = new Intl.NumberFormat('us-US', { style: 'currency', currency: currentUnit }).format(wallet.balance * aspect)

    //volatility
    const d = new Date()
    const tradesThisMonth = trades.filter((trade) => (trade.year === d.getFullYear()) && (trade.month === d.getMonth()))
    var volatility = 0
    tradesThisMonth.map((trade) => {
        if (trade.spendType)
            volatility -= trade.amount
        else
            volatility += trade.amount
    })
    const volatilityFormated = new Intl.NumberFormat('us-US', { style: 'currency', currency: currentUnit }).format(volatility * aspect)
    var volatilityToShow
    if (volatility > 0)
        volatilityToShow = <p className='volatility-positive'>+{volatilityFormated}</p>
    else if (volatility < 0)
        volatilityToShow = <p className='volatility-negative'>{volatilityFormated}</p>
    else
        volatilityToShow = <p className='volatility-nochange'>{volatilityFormated}</p>

    return (<>
        <Card className='dashboard-details'>
            <Card.Body>
                <UpdateWalletForm oldWalletName={wallet.walletName} oldBalance={wallet.balance} walletId={wallet.walletId} />
                <Card.Title>{wallet.walletName}</Card.Title>
                <hr />
                <Card.Text>Balance: {balance}</Card.Text>
                <Card.Text>Owner: you</Card.Text>
                <Card.Text>Volatility this month: {volatilityToShow}</Card.Text>
                <Card.Link href="#">view full report</Card.Link>
            </Card.Body>
        </Card>
    </>)
}

export default Detail