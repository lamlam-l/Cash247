import axios from 'axios'
import { useState } from 'react'
import { Card, Container, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faKey } from '@fortawesome/free-solid-svg-icons'

import { url } from '../../constants/constants'
import style from './style'
import AlertBox from '../alert/AlertBox'

function Profile() {
    const [renderUser, setRenderUser] = useState({
        name: 'loading...',
        email: 'loading...',
        createdAt: '..........',
        updatedAt: '..........',
        isLoaded: false,
    })
    const [updatedUser, setUpdatedUser] = useState({
        name: renderUser.name,
        email: renderUser.email,
        password: '',
        newPassword: '',
        retypePassword: '',

    })
    const [showEdit, setShowEdit] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [alert, setAlert] = useState(null)
    const name = localStorage.getItem('name')
    var crAt = renderUser.createdAt
    var udAt = renderUser.updatedAt

    //__________post data to render user profile__________
    axios.post(`${url}profile`, { name }).then((respone) => {
        let user = respone.data.user
        if (!renderUser.isLoaded) {
            user.isLoaded = true
            setRenderUser(user)
            setUpdatedUser(user)
        }
    }).catch((error) => {
        console.log(error)
    })

    //__________handle form changing__________
    function onChangeForm(e) {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value })
    }

    //__________modal show & hide box__________
    const handleCloseEdit = () => setShowEdit(false)
    const handleShowEdit = () => setShowEdit(true)
    const handleClosePassword = () => setShowPassword(false)
    const handleShowPassword = () => setShowPassword(true)

    //__________update user profile__________
    async function update() {
        try {
            const respone = await axios.post(`${url}profile/update`, { name: renderUser.name, newUser: { name: updatedUser.name, email: updatedUser.email } })
            if (respone.data.success) {
                localStorage.setItem('name', updatedUser.name)
                window.location.reload(false)
            } else {
                setAlert({ variant: 'danger', message: respone.data.message })
                setTimeout(() => { setAlert(null) }, 2000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //__________change password__________
    async function changePassword() {
        try {
            if (updatedUser.newPassword !== updatedUser.retypePassword) {
                setAlert({ variant: 'danger', message: 'retype password does not match!' })
                setTimeout(() => { setAlert(null) }, 2000)
                return
            }
            const respone = await axios.post(`${url}profile/changePassword`, { name: renderUser.name, currentPassword: updatedUser.password, newPassword: updatedUser.newPassword })
            if (respone.data.success) {
                window.location.reload(false)
            } else {
                setAlert({ variant: 'danger', message: respone.data.message })
                setTimeout(() => { setAlert(null) }, 2000)
                return
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (<>
        <Container className="mt-4">
            <Card>
                <Card.Header as="h5">Profile
                    <FontAwesomeIcon
                        icon={faEdit}
                        style={style.edit}
                        className="colorTransition"
                        onClick={handleShowEdit} />
                    <FontAwesomeIcon
                        icon={faKey}
                        style={style.edit}
                        className="colorTransition"
                        onClick={handleShowPassword} />
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={3}>
                            <Card.Title>Name:</Card.Title>
                        </Col>
                        <Col xs={9}>
                            <Card><Card.Body><Card.Text>{renderUser.name}</Card.Text></Card.Body></Card>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xs={3}>
                            <Card.Title>Email: </Card.Title>
                        </Col>
                        <Col xs={9}>
                            <Card><Card.Body><Card.Text>{renderUser.email}</Card.Text></Card.Body></Card>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xs={3}>
                            <Card.Title>Account created at: </Card.Title>
                        </Col>
                        <Col xs={9}>
                            <Card><Card.Body><Card.Text>{crAt.substring(8, 10)} / {crAt.substring(5, 7)} / {crAt.substring(0, 4)}</Card.Text></Card.Body></Card>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xs={3}>
                            <Card.Title>Last modified: </Card.Title>
                        </Col>
                        <Col xs={9}>
                            <Card><Card.Body><Card.Text>{udAt.substring(8, 10)} / {udAt.substring(5, 7)} / {udAt.substring(0, 4)}</Card.Text></Card.Body></Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>

        <Modal
            show={showEdit}
            onHide={handleCloseEdit}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edit your profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AlertBox info={alert} />
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="name"
                            type="text"
                            placeholder="Enter new name"
                            value={updatedUser.name}
                            onChange={onChangeForm}
                            required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            placeholder="Enter new email"
                            value={updatedUser.email}
                            onChange={onChangeForm} />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>close</Button>
                <Button variant="primary" onClick={update}>update</Button>
            </Modal.Footer>
        </Modal>

        <Modal
            show={showPassword}
            onHide={handleClosePassword}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AlertBox info={alert} />
                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label>Current password</Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={onChangeForm} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>New password</Form.Label>
                        <Form.Control
                            name="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            onChange={onChangeForm} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Retype password</Form.Label>
                        <Form.Control
                            name="retypePassword"
                            type="password"
                            placeholder="retype your password"
                            onChange={onChangeForm} />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClosePassword}>close</Button>
                <Button variant="primary" onClick={changePassword}>change</Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default Profile