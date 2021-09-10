import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Accordion, Badge } from 'react-bootstrap'

import { context } from '../../../contextProvider/context'
import Trade from './Trade'
import AddTrade from './AddTrade'

function Year(props) {
    //get necessary data
    const wallet = props.wallets.filter((wallet) =>
        wallet.walletId.toString() === localStorage.getItem('walletId'))[0]
    const trades = wallet.trades
    const { view } = useContext(context)

    //on loading
    const [onLoad, setOnLoad] = useState(false)

    //date
    const d = new Date()

    //current year
    const allYear = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
    const [year, setYear] = useState(d.getFullYear())

    //set year
    if (!onLoad)
    setTimeout(() => {
        document.getElementsByClassName('trade-list')[0].style.transform = `translate(${-800* (d.getFullYear() - 2020)}px)`
        setOnLoad(true)
    }, 100);

    function switchYear(status) {
        const tradeList = document.getElementsByClassName('trade-list')[0]
        if (status === 'next') {
            if (year + 1 <= 2030) {
                setYear(year + 1)
                tradeList.style.transform = `translate(${-800 * (year - 2020 + 1)}px)`
            }
        } else {
            if (year - 1 >= 2020) {
                setYear(year - 1)
                tradeList.style.transform = `translate(${-800 * (year - 2020 - 1)}px)`
            }
        }
    }

    //create trade list
    function createTradeList(year) {
        return (<div className="month-in-year"><Accordion defaultActiveKey={d.getMonth().toString()}>
            {
                ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, id) => {
                    const tradeInMonth = trades.filter((trade) => trade.month === id + 1 && trade.year === year)
                    if (tradeInMonth.length !== 0 || (id === d.getMonth() && year === d.getFullYear()))
                        return <Accordion.Item eventKey={id.toString()}>
                            <Accordion.Header><h5>{month}</h5> <Badge pill bg="secondary" style={{ marginLeft: '20px' }}>({tradeInMonth.length} trade)</Badge></Accordion.Header>
                            <Accordion.Body>
                                {
                                    view.currentView === 'byDay' ?
                                        tradeInMonth.sort((a, b) => {
                                            if (a.day > b.day)
                                                return 1
                                            if (a.day < b.day)
                                                return -1
                                        }).map((trade) => <Trade trade={trade} view={view} walletId={wallet.walletId} />) :
                                        (tradeInMonth.filter((trade) => trade.spendType).sort((a, b) => {
                                            if (a.spendType > b.spendType)
                                                return 1
                                            if (a.spendType < b.spendType)
                                                return -1
                                        }).map((trade) => <Trade trade={trade} view={view} walletId={wallet.walletId} />)).concat(
                                            tradeInMonth.filter((trade) => trade.reciveType).sort((a, b) => {
                                                if (a.reciveType > b.reciveType)
                                                    return 1
                                                if (a.reciveType < b.reciveType)
                                                    return -1
                                            }).map((trade) => <Trade trade={trade} view={view} walletId={wallet.walletId} />)
                                        )
                                }
                                {d.getMonth() === id && d.getFullYear() === year ?
                                    <AddTrade walletId={wallet.walletId} /> : <div></div>
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                    else
                        return <></>
                })
            }
        </Accordion></div>)
    }

    // wallet.trades.map((trade) => <Trade trade={trade} view={view} walletId={wallet.walletId}/>)
    //<AddTrade walletId={wallet.walletId}/>

    return (<div className="year">
        <div className="switch-year">
            <FontAwesomeIcon
                icon={faChevronLeft}
                className="add-trade-btn-icon colorTransition"
                onClick={() => switchYear('previous')}
            />
            <p>{year}</p>
            <FontAwesomeIcon
                icon={faChevronRight}
                className="add-trade-btn-icon colorTransition"
                onClick={() => switchYear('next')} />
        </div>
        <div className="trade-list">
            {allYear.map((year) => createTradeList(year))}
        </div>
    </div>)
}

export default Year
