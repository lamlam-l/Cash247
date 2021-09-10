import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import { url } from '../../../constants/constants'
import AlertBox from '../../alert/AlertBox'

function UpdateWalletForm(props) {
    const { oldWalletName, oldBalance, walletId } = props
    const name = localStorage.getItem('name')

    const [alert, setAlert] = useState(null)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [updateWalletForm, setUpdateWalletForm] = useState({
        walletName: oldWalletName,
        balance: oldBalance
    })
    function onChangeForm(e) {
        setUpdateWalletForm({ ...updateWalletForm, [e.target.name]: e.target.value })
    }
    async function updateWalletInfo(e) {
        e.preventDefault()
        try {
            console.log(123)
            const respone = await axios.post(`${url}dashboard/wallet/updateWallet`, {
                name,
                walletId,
                newWallet: { newWalletName: updateWalletForm.walletName, newBalance: updateWalletForm.balance }
            })
            if (respone.data.success)
                window.location.reload(false)
            else {
                setAlert({ variant: "danger", message: respone.data.message })
                setTimeout(() => { setAlert(null) }, 2000)
                return
            }
        } catch (error) {
            setAlert({ variant: "danger", message: error.message })
            setTimeout(() => { setAlert(null) }, 2000)
            return
        }
    }
    return (<>
        <FontAwesomeIcon
            icon={faEdit}
            className="colorTransition walletEdit"
            onClick={handleShow}
        />
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Update wallet info</Modal.Title>
            </Modal.Header>
            <AlertBox info={alert} />
            <Modal.Body>
                <Form onSubmit={updateWalletInfo}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="walletName"
                            type="text"
                            placeholder="Enter new wallet name"
                            value={updateWalletForm.walletName}
                            onChange={onChangeForm}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Balance ({localStorage.getItem('currentUnit')})</Form.Label>
                        <Form.Control
                            name="balance"
                            type="number"
                            placeholder="Enter new balance"
                            value={updateWalletForm.balance}
                            onChange={onChangeForm}
                            required
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" type="submit">Update</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    </>)
}

export default UpdateWalletForm