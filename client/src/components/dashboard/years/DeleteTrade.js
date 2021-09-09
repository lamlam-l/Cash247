import { useState } from 'react';
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { url } from '../../../constants/constants'
import AlertBox from '../../alert/AlertBox'

function DeleteTrade(props) {
    const { walletId, trade } = props

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [alert, setAlert] = useState(null)

    async function deleteTrade() {
        try {
            const respone = await axios.post(url + 'dashboard/trade/deleteTrade', {
                name: localStorage.getItem('name'),
                walletId,
                tradeId: trade._id
            })
            if (respone.data.success) {
                window.location.reload(false)
            } else {
                setAlert({ variant: 'danger', message: respone.data.message })
                setTimeout(() => { setAlert(null) }, 2000)
                return
            }
        } catch (error) {
            setAlert({ variant: 'danger', message: error.message })
            setTimeout(() => { setAlert(null) }, 2000)
            return
        }
    }


    return (<>
        <FontAwesomeIcon
            icon={faTrash}
            className="colorTransition"
            onClick={handleShow}
        />
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Do you want to delete this trade ?</Modal.Title>
                <AlertBox info={alert} />
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>NO</Button>
                <Button variant="danger" onClick={deleteTrade}>YES</Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default DeleteTrade