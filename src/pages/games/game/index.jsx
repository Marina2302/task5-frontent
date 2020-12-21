import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import jwt from "jsonwebtoken";
import { Link } from 'react-router-dom'

export function Game(props) {
    const token = localStorage.getItem('token')
    const gameId = props.match.params.id;
    const userId = jwt.decode(token).id
    const me = jwt.decode(token).sub
    const [game, setGame] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    let timeout;

    const fetchGame = () => axios.get(`/games/${gameId}`)
        .then(res => {
            if (res.status === 200) {
                setGame(res.data)
            }
        })
        .catch(() => {
        })
        .finally(() => {
            if (!game || (game && !game.winner)) {
                console.log(game)
                setTimeoutRequest(game)
            }
        })

    const setTimeoutRequest = () => {
        clearTimeout(timeout)

        timeout = setTimeout(() => fetchGame(), 1000)
    }

    useEffect(() => {
        fetchGame()
        setTimeoutRequest()
        return clearTimeout(timeout)
    }, [gameId])

    const moves = {
        moveOne: 'MOVE_ONE',
        moveTwo: 'MOVE_TWO',
        moveThree: 'MOVE_THREE',
        moveFour: 'MOVE_FOUR',
        moveFive: 'MOVE_FIVE',
        moveSix: 'MOVE_SIX',
        moveSeven: 'MOVE_SEVEN',
        moveEight: 'MOVE_EIGHT',
        moveNine: 'MOVE_NINE'
    }

    const onClick = key => {
        if (game.turn === me && !game[key] && !isLoading && !game.winner) {
            setIsLoading(true)

            axios.post(`/games/move`, {userId, move: moves[key], gameId})
                .finally(() => setIsLoading(false))
        }
    }
    const style = {
        border: "2px solid #ec0c2b",
        fontSize: "30px",
        fontWeight: "800",
        cursor: "pointer",
        outline: "none",
    };

    const Square = ({value, onClick}) => (
        <button style={style} onClick={onClick}>
            {value}
        </button>
    );

    const Board = ({squares, onClick}) => (
        <div style={style}>
            {squares.map((square, i) => (
                <Square key={i} value={square} onClick={() => onClick(i)}/>
            ))}
        </div>
    );

    const defineRelation = key => game[key] ? game[key] === game.playerOne ? 'X' : 'O' : null

    const renderField = () => {
        if (game.winner) {
            return (
                <div>Winner is {game.winner}</div>
            )
        }
        return game.playerTwo
            ? (
                <div style={{
                    border: "4px solid #ec0c2b",
                    borderRadius: "10px",
                    width: "250px",
                    height: "250px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
                }}>
                    <Square value={defineRelation('moveOne')} onClick={() => onClick("moveOne")}/>
                    <Square value={defineRelation('moveTwo')} onClick={() => onClick("moveTwo")}/>
                    <Square value={defineRelation('moveThree')} onClick={() => onClick("moveThree")}/>
                    <Square value={defineRelation('moveFour')} onClick={() => onClick("moveFour")}/>
                    <Square value={defineRelation('moveFive')} onClick={() => onClick("moveFive")}/>
                    <Square value={defineRelation('moveSix')} onClick={() => onClick("moveSix")}/>
                    <Square value={defineRelation('moveSeven')} onClick={() => onClick("moveSeven")}/>
                    <Square value={defineRelation('moveEight')} onClick={() => onClick("moveEight")}/>
                    <Square value={defineRelation('moveNine')} onClick={() => onClick("moveNine")}/>

                </div>
            )
            : <div>Witting for a second player</div>
    }

    const renderGame = () => {
        if (game) {
            return (
                <div>
                    <div>
                        <span>Game </span>
                        <span>{game.name}</span>
                        <span> between </span>
                        <span>{game.playerOne}</span>
                        <span> and </span>
                        <span>{game.playerTwo}</span>
                    </div>
                    <div>{game.tags.map(tag => `#${tag}`).join(' ')}</div>
                    <div>
                        {renderField()}
                    </div>
                    <Link to='/games'>Back to games list</Link>
                </div>
            )
        }
        return null
    }

    return (
        <div>
            {renderGame()}
        </div>
    )
}
