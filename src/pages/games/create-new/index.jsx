import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from "react-bootstrap";
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Dropdown } from '../../../components'

export function CreateNewGame(props) {

    const [tags, setTags ] = useState([])
    const [existingTags, setExistingTags ] = useState([])
    const [name, setName ] = useState('')
    const [isLoading, setLoading] = useState(false)

    const handleChange = values => {
        setTags(values)
    }

    useEffect(() => {
        axios.get('tags')
            .then(res => {
                if (res.status === 200) {
                    setExistingTags(res.data.map(tag => ({ label: tag, value: tag })))
                }
            })
    },[])

    const create = (e) => {
        e.preventDefault()
        if (isLoading) return

        setLoading(true)
        const token = localStorage.getItem('token')

        const playerOne = jwt.decode(token).id

        axios.post('/games', {name, tags: tags ? tags.map(tag => tag.value) : [], playerOne })
            .then(res => {
                if(res.status === 200) {
                    props.history.push(`/games/${res.data.id}`)
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }

    return <Form>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter game name" value={name} onChange={e => setName(e.target.value)}/>
        </Form.Group>
        <Form.Group >
            <Form.Label>Tags</Form.Label>
            <Dropdown options={existingTags} handleChange={handleChange} placeholder='Select tags' />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={create}>
            Create new game
        </Button>
        <Link style={{ margin: '0 20px' }} to='/games'>Back to all games</Link>
    </Form>
}
