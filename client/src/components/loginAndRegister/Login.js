import axios from 'axios'
import { Form, Button, Container } from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import { useState } from 'react'
import { Redirect } from 'react-router'

import { url } from '../../constants/constants'
import AlertBox from '../alert/AlertBox'
import style from './style'

function Login() {
    const [loginForm, setLoginForm] = useState({
        name: "",
        password: ""
    })
    const history = useHistory()
    const [alert, setAlert] = useState(null)

    function onChangeForm(e) {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    async function login(e) {
        e.preventDefault()
        try {
            const respone = await axios.post(`${url}login`, { name: loginForm.name, password: loginForm.password })
            if (respone.data.success) {
                localStorage.setItem('name', loginForm.name)
                localStorage.setItem('currentUnit', 'USD')
                localStorage.setItem('say', 'bao mat level max :)   chua hoc ve he thong dang nhap, dang ky, khoa cong khai, khoa rieng tu cac thu... nen chi biet lam moi nhu the nay')
                history.push('/dashboard')
            } else {
                setAlert({ variant: "danger", message: respone.data.message })
                setTimeout(() => { setAlert(null) }, 2000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (localStorage.getItem('name'))
        return <Redirect to="/dashboard" />
    else
        return (
            <div style={style.landingImage}>
                <div style={style.landingInner}>
                    <h1 style={style.title}>Sign in to cash247</h1>
                    <AlertBox info={alert} />
                    <Container className="w-75">
                        <Form onSubmit={login}>
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
                                <Form.Label style={style.text}>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onChange={onChangeForm}
                                    placeholder="Enter your password"
                                    required />
                            </Form.Group>
                            <Button variant="primary" type="submit">Sign in</Button>
                        </Form>
                        <h1 style={style.title}>Don't have an account?</h1>
                        <Button variant="primary">
                            <a href="/register" style={style.link}>Sign up here</a>
                        </Button>
                    </Container>
                </div>

            </div>
        )
}

export default Login