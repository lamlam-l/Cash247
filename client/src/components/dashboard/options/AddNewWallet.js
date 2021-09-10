import axios from 'axios'
import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { url } from '../../../constants/constants'
import AlertBox from '../../alert/AlertBox'

function AddNewWallet(props) {
    const [show, setShow] = useState(false)
    const [alert, setAlert] = useState(null)
    const [addWalletForm, setAddWalletForm] = useState({
        walletName: '',
        balance: 0,
    })

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    function onChangeForm(e) {
        setAddWalletForm({ ...addWalletForm, [e.target.name]: e.target.value })
    }

    async function addWallet(e) {
        e.preventDefault()
        try {
            const respone = await axios.post(`${url}dashboard/wallet/addwallet`, {
                name: localStorage.getItem('name'),
                wallet: {
                    walletName: addWalletForm.walletName,
                    balance: addWalletForm.balance
                }
            })
            if (respone.data.success) {
                console.log(respone)
                window.location.reload(false)
            }
            else {
                setAlert({ variant: "danger", message: respone.data.message })
                setTimeout(() => { setAlert(null) }, 2000)
                return
            }
            console.log(respone.data)
        } catch (error) {
            setAlert({ variant: "danger", message: error.message })
            setTimeout(() => { setAlert(null) }, 2000)
            return
        }
    }

    return (
        <>
            <FontAwesomeIcon
                icon={faPlus}
                className="colorTransition"
                onClick={handleShow}
                style={{ fontSize: props.bigger ? '100px' : '' }}
            />
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AlertBox info={alert} />
                    <Form onSubmit={addWallet}>
                        <Form.Group className="mb-3">
                            <Form.Label>Wallet name</Form.Label>
                            <Form.Control
                                name="walletName"
                                type="text"
                                placeholder="Enter wallet name"
                                value={addWalletForm.walletName}
                                onChange={onChangeForm}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Balance ({localStorage.getItem('currentUnit')})</Form.Label>
                            <Form.Control
                                name="balance"
                                type="number"
                                placeholder="Enter balance"
                                value={addWalletForm.balance}
                                onChange={onChangeForm}
                                required
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" type="submit">Add</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>



            </Modal>
        </>
    )
}

export default AddNewWallet