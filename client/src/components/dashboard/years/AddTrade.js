import { useState } from "react"
import { FloatingLabel, Form, Row, Col, Button } from "react-bootstrap"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import AlertBox from '../../alert/AlertBox'
import { url } from '../../../constants/constants'


function AddTrade(props) {
    const { walletId } = props
    const spendTypes = ['eating & food', 'rent', 'water', 'gas', 'internet', 'telephone', 'TV', 'transportation', 'shopping', 'friend & partner', 'entertainment', 'travel', 'health', 'charity & donations', 'family', 'education', 'investment', 'business', 'insurance', 'withdraw money', 'other']
    const reciveTypes = ['salary', 'award', 'be donated', 'sell stuff', 'other']

    const [alert, setAlert] = useState(null)

    //show-hide add trade form
    function showHideForm() {
        var currentStyle = document.getElementsByClassName('add-trade-form')[0].style
        if (currentStyle.display === 'none')
            currentStyle.display = 'block'
        else
            currentStyle.display = 'none'
    }

    //handleDateChange
    const d = new Date()
    const [date, setDate] = useState(`${d.getFullYear()}-${d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth()}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`)
    function onChangeDate(e) {
        setDate(e.target.value)
    }

    //form
    const [addTradeForm, setAddTradeForm] = useState({
        day: 0,
        month: 0,
        year: 0,
        spendType: 'eating & food',
        reciveType: '',
        amount: 0,
        decription: '',
    })
    function onChangeForm(e) {
        if (e.target.name === 'spendType') {
            setAddTradeForm({ ...addTradeForm, [e.target.name]: e.target.value, reciveType: '' })
        } else if (e.target.name === 'reciveType') {
            setAddTradeForm({ ...addTradeForm, [e.target.name]: e.target.value, spendType: '' })
        } else
            setAddTradeForm({ ...addTradeForm, [e.target.name]: e.target.value })
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
            value={addTradeForm.spendType}
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
            value={addTradeForm.reciveType}
            required>
            {reciveTypes.map((type) =>
                <option>{type}</option>)}
        </select>
    function changeType(type) {
        setType(type)
    }

    //add
    async function addTrade(e) {
        e.preventDefault()
        const newTrade = {
            name: localStorage.getItem('name'),
            walletId,
            trade: {
                day: parseInt(date.substring(8, 10)),
                month: parseInt(date.substring(5, 7)),
                year: parseInt(date.substring(0, 4)),
                spendType: addTradeForm.spendType,
                reciveType: addTradeForm.reciveType,
                amount: localStorage.getItem('currentUnit') === 'USD' ? parseInt(addTradeForm.amount) : parseInt(addTradeForm.amount) / 23500,
                decription: addTradeForm.decription,
            }
        }
        try {
            const respone = await axios.post(url + 'dashboard/trade/addTrade', newTrade)
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
        <div className="add-trade-btn" onClick={showHideForm}>
            <FontAwesomeIcon
                icon={faPlus}
                className="add-trade-btn-icon"
            />
        </div>
        <AlertBox info={alert} />
        <Form className="add-trade-form" style={{ display: 'none' }} onSubmit={addTrade}>
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
            </Row>
            <Row>
                <FloatingLabel className="mb-3" controlId="floatingInput" label={`amount: (${localStorage.getItem('currentUnit')})`}>
                    <Form.Control
                        type="number"
                        name="amount"
                        value={addTradeForm.amount}
                        onChange={onChangeForm}
                        required />
                </FloatingLabel>
            </Row>
            <Row>
                <FloatingLabel className="mb-3" controlId="floatingTextarea2" label="description">
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="decription"
                        value={addTradeForm.decription}
                        onChange={onChangeForm}
                        required />
                </FloatingLabel>
            </Row>
            <Button variant="success" type="submit" style={{ marginRight: '100px', float: 'right' }}>Submit</Button>
        </Form>
    </>)
}

export default AddTrade