import axios from 'axios'
import { useState } from 'react'
import { Redirect } from 'react-router'

import { url } from '../../constants/constants'
import Loading from '../loading/Loading'

function Repost() {
    const [report, setReport] = useState({
        view: <Loading />,
        onLoading: true
    })
    axios.post(`${url}dashboard/wallet/getWallets`, {
        name: localStorage.getItem('name')
    }).then((respone) => {
        const wallets = respone.data.wallets
        if (report.onLoading) {
            if (wallets.length === 0) {
                setReport({
                    view: <Redirect to="/dashboard" />,
                    onLoading: false,
                })
            } else {
                console.log(wallets)
                setReport({
                    view: <h1>report</h1>,
                    onLoading: false
                })
            }

        }
    }).catch((error) => {
        console.log(error)
    })

    return (<>
        {report.view}
    </>)
}

export default Repost