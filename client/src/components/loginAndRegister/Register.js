import axios from 'axios'
import { Form, Button, Container } from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import { useState } from 'react'
import { Redirect } from 'react-router'

import { url } from '../../constants/constants'
import AlertBox from '../alert/AlertBox'
import style from './style'

function Register() {
    const [registerForm, setRegisterForm] = useState({
        name: "",
        emai: "",
        password: "",
        retypePassword: ""
    })
    const history = useHistory()
    const [alert, setAlert] = useState(null)

    function onChangeForm(e) {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
    }

    async function register(e) {
        e.preventDefault()
        try {
            if (registerForm.password !== registerForm.retypePassword) {
                setAlert({ variant: "danger", message: "retype password does not match your password" })
                setTimeout(() => { setAlert(null) }, 2000)
                return
            }
            const respone = await axios.post(`${url}register`, { name: registerForm.name, email: registerForm.email, password: registerForm.password })
            if (respone.data.success) {
                localStorage.setItem('name', registerForm.name)
                localStorage.setItem('currentUnit', 'USD')
                history.push('/profile')
            } else {
                setAlert({ variant: "danger", message: respone.data.message })
                setTimeout(() => { setAlert(null) }, 2000)
                return
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (localStorage.getItem('name'))
        return <Redirect to="/dashboard" />
    else
        return (<>
            <div style={style.landingImage}>
                <div style={style.landingInner}>
                    <h1 style={style.title}>Sign up</h1>
                    <AlertBox info={alert} />
                    <Container className="w-75">
                        <Form onSubmit={register}>
                            <Form.Group className="mb-3">
                                <Form.Label style={style.text}>Your name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    onChange={onChangeForm}
                                    placeholder="Enter your name"
                                    required />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={style.text}>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    onChange={onChangeForm}
                                    placeholder="Enter your email"
                                    required />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={style.text}>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onChange={onChangeForm}
                                    placeholder="Enter your password"
                                    required />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={style.text}>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="retypePassword"
                                    onChange={onChangeForm}
                                    placeholder="Retype your password"
                                    required />
                            </Form.Group>
                            <Button variant="primary" type="submit">sign up</Button>
                        </Form>
                        <h1 style={style.title}>Already have an account?</h1>
                        <Button variant="primary">
                            <a href="/login" style={style.link}>Sign in here</a>
                        </Button>
                    </Container>
                </div>
            </div>

        </>)
}

export default Register