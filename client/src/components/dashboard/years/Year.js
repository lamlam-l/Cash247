import { useContext } from 'react'

import { context } from '../../../contextProvider/context'
import Trade from './Trade'
import AddTrade from './AddTrade'

function Year(props) {
    //get necessary data
    const wallet = props.wallets.filter((wallet) =>
        wallet.walletId.toString() === localStorage.getItem('walletId'))[0]
    const { view } = useContext(context)
    // wallet.trades.map((trade) => <Trade trade={trade} view={view} walletId={wallet.walletId}/>)
    //<AddTrade walletId={wallet.walletId}/>
    return (<div className="year">
        {
            
        }
        
    </div>)
}

export default Year
