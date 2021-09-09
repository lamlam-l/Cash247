import { useState } from 'react'
import axios from 'axios'

import { url } from '../../constants/constants'
import Year from './years/Year'
import Details from './details/Details'
import Options from './options/Options'
import ChangeWallet from './changeWallet/ChangeWallet'
import Detail from './details/Details'

function Dashboard() {

    const [dashboard, setDashboard] = useState({
        view: <h1>loading...</h1>,
        onLoading: true
    })

    axios.post(`${url}dashboard/wallet/getWallets`, {
        name: localStorage.getItem('name')
    }).then((respone) => {
        const wallets = respone.data.wallets
        if (dashboard.onLoading) {
            if (wallets.length === 0) {
                setDashboard({
                    view: <h1>no wallet</h1>,
                    onLoading: false
                })
            } else {
                if (!localStorage.getItem('walletId'))
                    localStorage.setItem('walletId', 1)
                setDashboard({
                    view: <>
                        {/* <Detail wallet={wallets[localStorage.getItem('walletId')]} />
                        <Options /> */}
                        <Year wallets={wallets} />
                    </>,
                    onLoading: false
                })

            }
        }
    }).catch((error) => {
        console.log(error)
    })

    return (<>
        {dashboard.view}
    </>)
}

export default Dashboard
