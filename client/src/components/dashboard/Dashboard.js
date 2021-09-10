import { useState } from 'react'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'

import { url } from '../../constants/constants'
import Year from './years/Year'
import Options from './options/Options'
import ChangeWallet from './changeWallet/ChangeWallet'
import Detail from './details/Details'
import AddNewWallet from './options/AddNewWallet'
import Loading from '../loading/Loading'

function Dashboard() {

    const [dashboard, setDashboard] = useState({
        view: <Loading />,
        onLoading: true
    })

    axios.post(`${url}dashboard/wallet/getWallets`, {
        name: localStorage.getItem('name')
    }).then((respone) => {
        const wallets = respone.data.wallets
        if (dashboard.onLoading) {
            if (wallets.length === 0) {
                console.log(wallets)
                setDashboard({
                    view: <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' , height: '100vh' }}>
                        <AddNewWallet bigger/>
                    </div>,
                    onLoading: false
                })

            } else {
                if (!localStorage.getItem('walletId'))
                    localStorage.setItem('walletId', 1)
                setDashboard({
                    view: <div className="w3-animate-top dashboard">
                        <Row>
                            <Col>
                                <div className="detail-layout">
                                    <Detail wallet={wallets[localStorage.getItem('walletId') - 1]} />
                                </div>
                            </Col>
                            <Col>
                                <Year wallets={wallets} />
                            </Col>
                            <Col>
                                <div className="option-layout">
                                    <Options />
                                    <br />

                                </div>
                                <div className="changeWallet-layout">
                                    <ChangeWallet wallets={wallets} />
                                </div>
                            </Col>
                        </Row>

                    </div>,
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
