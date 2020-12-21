import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from "react-bootstrap";
import axios from 'axios'

export function Login(props) {

    const [login, setLogin ] = useState('')
    const [password, setPassword ] = useState('')
    const [isLoading, setLoading] = useState(false)

    const signin = (e) => {
        e.preventDefault()
        if (isLoading) return

        setLoading(true)

        axios.post('/auth', {login, password})
            .then(res => {
                if(res.status === 200) {
                    localStorage.setItem('token', res.data.token)
                    window.location.href = '/games'
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }

    return <Form>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Login</Form.Label>
            <Form.Control type="text" placeholder="Enter login" value={login} onChange={e => setLogin(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={signin}>
            Login
        </Button>
        <Link style={{ margin: "0 20px"}} to='/register'>Register</Link>

    </Form>
}
