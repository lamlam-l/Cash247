import { Row, Col } from 'react-bootstrap'

import AddTrade from "./AddTrade"
import DeleteTrade from "./DeleteTrade"
import Decription from "./Decription"

function Trade(props) {
    //get necessary data
    const { trade, view } = props
    const unit = localStorage.getItem('currentUnit')

    //amount
    var aspect
    switch (unit) {
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
    const amountFormated = new Intl.NumberFormat('us-US', { style: 'currency', currency: unit })
        .format(trade.amount * aspect)
    var amount
    if (trade.spendType)
        amount = <p className='volatility-positive'>+{amountFormated}</p>
    else if (trade.reciveType)
        amount = <p className='volatility-negative'>-{amountFormated}</p>
    else
        amount = <p className='volatility-nochange'>{amountFormated}</p>

    //type
    const type = trade.spendType ? trade.spendType : trade.reciveType
    console.log(view.currentView === 'byTrade')

    //get day
    const d = new Date()
    d.setFullYear(trade.year)
    d.setMonth(trade.month)
    d.setDate(trade.day)
    const week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const dayInWeek = week[d.getDay()]

    if (view.currentView === 'byDay') {
        return (
            <Row className="trade">
                <Col xs={3}>
                    <h2 className="title">{trade.day}</h2>
                </Col>
                <Col xs={3}>
                    <h4 className="type">{type}</h4>
                </Col>
                <Col xs={3}>
                    <h4 className="amount">{amount}</h4>
                </Col>
                <Col xs={1} className="description">
                    <Decription />
                </Col>
                <Col xs={1} className="addTrade">
                    <AddTrade />
                </Col>
                <Col xs={1} className="deleteTrade">
                    <DeleteTrade />
                </Col>
            </Row>)
    } else if (view.currentView === 'byTrade') {
        return (<Row className="trade">
            <Col xs={3}>
                <h2 className="title-by-trade">{type}</h2>
            </Col>
            <Col xs={3}>
                <h4 className="type">{trade.day}</h4>
                <p className="dayInWeek">{dayInWeek}</p>
            </Col>
            <Col xs={3}>
                <h4 className="amount">{amount}</h4>
            </Col>
            <Col xs={1} className="description">
                <Decription />
            </Col>
            <Col xs={1} className="addTrade">
                <AddTrade />
            </Col>
            <Col xs={1} className="deleteTrade">
                <DeleteTrade />
            </Col>
        </Row>)
    }
}

export default Trade