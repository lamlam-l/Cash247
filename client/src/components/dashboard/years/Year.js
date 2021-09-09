import { useContext } from 'react'

import { context } from '../../../contextProvider/context'
import Trade from './Trade'

function Year(props) {
    //get necessary data
    const wallet = props.wallets.filter((wallet) =>
        wallet.walletId == localStorage.getItem('walletId'))[0]
    const { view } = useContext(context)
    return (<div className="year">
        <Trade trade={wallet.trades[0]} view={view} walletId={wallet.walletId}/>
        <Trade trade={wallet.trades[1]} view={view} walletId={wallet.walletId}/>
        <Trade trade={wallet.trades[2]} view={view} walletId={wallet.walletId}/>
        <Trade trade={wallet.trades[3]} view={view} walletId={wallet.walletId}/>
        {/* <Trade trade={wallet.trades[4]} view={view} walletId={wallet.walletId}/> */}
        
    </div>)
}

export default Year

//year