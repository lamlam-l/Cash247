import axios from 'axios'
import { useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import AlertBox from '../../alert/AlertBox'
import { url } from '../../../constants/constants'

function EditTrade(props) {
    //get data
    const { walletId, trade } = props
    //All types
    const spendTypes = ['eating & food', 'rent', 'water', 'gas', 'internet', 'telephone', 'TV', 'transportation', 'shopping', 'friend & partner', 'entertainment', 'travel', 'health', 'charity & donations', 'family', 'education', 'investment', 'business', 'insurance', 'withdraw money', 'other']
    const reciveTypes = ['salary', 'award', 'be donated', 'sell stuff', 'other']

    //modal
    const [modalShow, setModalShow] = useState(false)
    function showModal() {
        setModalShow(true)
    }
    function hideModal() {
        setModalShow(false)
    }

    //form
    const [editTradeForm, setEditTradeForm] = useState({
        day: trade.day,
        month: trade.month,
        year: trade.year,
        spendType: trade.spendType ? trade.spendType : '',
        reciveType: trade.reciveType ? trade.reciveType : '',
        amount: localStorage.getItem('currentUnit') === 'USD' ? trade.amount : trade.amount * 23500,
        decription: trade.decription,
    })
    function onChangeForm(e) {
        if (e.target.name === 'spendType') {
            setEditTradeForm({ ...editTradeForm, [e.target.name]: e.target.value, reciveType: '' })
        } else if (e.target.name === 'reciveType') {
            setEditTradeForm({ ...editTradeForm, [e.target.name]: e.target.value, spendType: '' })
        } else
            setEditTradeForm({ ...editTradeForm, [e.target.name]: e.target.value })
    }

    //show recive type or spend type
    const [type, setType] = useState('spend')
    var typesToShow
    if (type === 'spend')
        typesToShow = <select
            className="form-select"
            aria-label="Default select example"
            onChange={onChangeForm}
            name="spendType"
            value={editTradeForm.spendType}
            required>
            {spendTypes.map((type) =>
                <option>{type}</option>)}
        </select>
    else if (type === 'recive')
        typesToShow = <select
            className="form-select"
            aria-label="Default select example"
            onChange={onChangeForm}
            name="reciveType"
            value={editTradeForm.reciveType}
            required>
            {reciveTypes.map((type) =>
                <option>{type}</option>)}
        </select>
    function changeType(type) {
        setType(type)
    }


    //handleDateChange
    const [date, setDate] = useState(`${trade.year}-${trade.month < 10 ? '0' + trade.month : trade.month}-${trade.day < 10 ? '0' + trade.day : trade.day}`)
    function onChangeDate(e) {
        setDate(e.target.value)
    }

    //alert box
    const [alert, setAlert] = useState(null)

    //send edit form
    async function edit(e) {
        e.preventDefault()
        try {
            console.log(walletId, trade._id, date, editTradeForm) //2022-02-05 8-10, 5-7, 0-4
            const respone = await axios.post(url + 'dashboard/trade/updateTrade', {
                name: localStorage.getItem('name'),
                walletId,
                tradeId: trade._id,
                trade: {
                    newDay: parseInt(date.substring(8, 10)),
                    newMonth: parseInt(date.substring(5, 7)),
                    newYear: parseInt(date.substring(0, 4)),
                    newSpendType: editTradeForm.spendType,
                    newReciveType: editTradeForm.reciveType,
                    newAmount: localStorage.getItem('currentUnit') === 'USD' ? editTradeForm.amount : editTradeForm.amount / 23500,
                    newDecription: editTradeForm.decription,
                }
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
            icon={faEdit}
            className="colorTransition"
            onClick={showModal} />
        <Modal
            show={modalShow}
            onHide={hideModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Edit trade</Modal.Title>
            </Modal.Header>
            <AlertBox info={alert} />
            <Modal.Body>
                <Form onSubmit={edit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <div className="container-radio">
                                    <ul className="list">
                                        <li className="list__item">
                                            <input type="radio" className="radio-btn" name="choice" id="a-opt" />
                                            <label htmlFor="a-opt" className="label" onClick={() => changeType('spend')}>spend</label>
                                        </li>

                                        <li className="list__item">
                                            <input type="radio" className="radio-btn" name="choice" id="b-opt" />
                                            <label htmlFor="b-opt" className="label" onClick={() => changeType('recive')}>recive</label>
                                        </li>
                                    </ul>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                {typesToShow}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>date (mm-dd-yyyy)</Form.Label>
                                <input
                                    className="input-date"
                                    type="date"
                                    name="tdate"
                                    min="2020-01-01"
                                    max="2030-12-31"
                                    value={date}
                                    onChange={onChangeDate}
                                    required>
                                </input>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3">
                            <Form.Label>amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                value={editTradeForm.amount}
                                onChange={onChangeForm}
                                required />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="decription"
                                value={editTradeForm.decription}
                                onChange={onChangeForm}
                                required />
                        </Form.Group>
                    </Row>

                    <Modal.Footer>
                        <Button onClick={hideModal} variant="secondary">Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>

            </Modal.Body>
        </Modal>
    </>)
}

export default EditTrade