import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import {Table, Button, Row, Col} from 'react-bootstrap'
import jwt from "jsonwebtoken";
import Qs from 'querystring'

import {Dropdown} from '../../../components'

export function GamesList(props) {
    const token = localStorage.getItem('token')
    const me = jwt.decode(token).sub
    const [games, setGames] = useState([])
    const [tags, setTags] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        Promise.all([
            axios.get('/games')
                .then(res => {
                    if (res.status === 200) {
                        setGames(res.data)
                    }
                }),
            axios.get('/tags')
                .then(res => {
                    if (res.status === 200) {
                        setTags(res.data.map(tag => ({ label: tag, value: tag })))
                    }
                })
        ])
    }, [])

    const joinGame = id => {
        if (isLoading) return
        setIsLoading(true)
        const token = localStorage.getItem('token')

        const {id: userId} = jwt.decode(token)
        axios.post(`/games/${id}/${userId}`)
            .then(res => {
                if (res.status === 200) {
                    props.history.push(`/games/${id}`)
                }
            })
            .catch(() => {
            })
            .finally(() => setIsLoading(false))
    }

    const showGames = () => {

        return (
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Game name</th>
                    <th>Game tags</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {games.map((game, i) => (
                    <tr key={game.id}>
                        <td>{i + 1}</td>
                        <td>{game.name}</td>
                        <td>{game.tags.map(tag => `#${tag}`).join(' ')}</td>
                        <td>{game.playerOne === me || game.playerTwo === me
                            ? <Button variant="primary" onClick={() => props.history.push(`/games/${game.id}`)}>Back to game</Button>
                            : games.playerTwo ?
                                null
                                : <Button variant="success" onClick={() => joinGame(game.id)}>Join</Button>}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        )
    }

    const handleChange = values => {
        axios.get('/games', { params: { tags: values ? values.map(tag => tag.value) : [] }, paramsSerializer: function (params) {
                return Qs.stringify(params, {arrayFormat: 'brackets'})
            }, })
            .then(res => {
                if (res.status === 200) {
                    setGames(res.data)
                }
            })
    }

    return (
        <div>
            <Row className="justify-content-right">
                <Col md={{span: 6, offset: 0}}>
                    <Dropdown options={tags} placeholder="select tags" handleChange={handleChange}/>
                </Col>
                <Col md={{span: 2, offset: 10}}>
                    <Link to='/games/create'>Create new game</Link>
                </Col>
            </Row>
            {showGames()}
        </div>
    )
}
