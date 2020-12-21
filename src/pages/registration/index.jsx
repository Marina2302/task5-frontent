import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from "react-bootstrap";
import axios from 'axios'

export function Registration(props) {

    const [login, setLogin ] = useState('')
    const [password, setPassword ] = useState('')
    const [isLoading, setLoading] = useState(false)

    const signup = (e) => {
        e.preventDefault()
        if (isLoading) return

        setLoading(true)

        axios.post('/register', {login, password})
            .then(res => {
                if(res.status === 200) {
                    window.location.href = '/login'
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }

    return <Form>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Registration</Form.Label>
            <Form.Control type="text" placeholder="Enter login" value={login} onChange={e => setLogin(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={signup}>
            Register
        </Button>
        <Link to='/login'>Login</Link>
    </Form>
}
