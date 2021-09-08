import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill, faTable } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'

import { context } from '../../../contextProvider/context'
import AddNewWallet from './AddNewWallet'

function Options() {
    const { view, setView } = useContext(context)


    function changeUnit() {
        if (localStorage.getItem('currentUnit') === 'USD')
            localStorage.setItem('currentUnit', 'VND')
        else
            localStorage.setItem('currentUnit', 'USD')
        window.location.reload(false)
    }

    function changeView() {
        if (view.currentView === 'byDay')
            setView({ currentView: 'byTrade' })
        else
            setView({ currentView: 'byDay' })
    }

    return (<>
        <div className="dashboard-options">
            <div className="add colorTransition">
                <AddNewWallet />
            </div>
            <div className="view">
                <FontAwesomeIcon
                    icon={faMoneyBill}
                    className="colorTransition"
                    onClick={changeUnit}
                />
            </div>
            <div className="search">
                <FontAwesomeIcon
                    icon={faTable}
                    className="colorTransition"
                    onClick={changeView}
                />
            </div>
        </div>
    </>)
}

export default Options