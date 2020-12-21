import {Switch, Route, Redirect, Router} from 'react-router'
import {createBrowserHistory} from "history";
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'

import { apiUrl } from './config'


import { Login, Registration, GamesList, CreateNewGame, Game } from './pages'

function App() {
    axios.defaults.baseURL = apiUrl
    const history = createBrowserHistory();
    const token = localStorage.getItem('token')
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const logOut = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    const routes = token
        ? <Switch>
            <Route exact path='/games' component={GamesList}/>
            <Route exact path='/games/create' component={CreateNewGame}/>
            <Route path='/games/:id' component={Game}/>
            <Route exact path='/404' render={() => <div> not Found</div>}/>
            <Redirect from='/' to='/games'/>
            <Redirect to='/404'/>
        </Switch>
        : <Switch>
            <Route exact path='/register' component={Registration}/>
            <Route exact path='/login' component={Login}/>
            <Redirect to='/login'/>
        </Switch>
    return (
        <Router history={history}>
            <Container>
                <Row className="justify-content-right">
                    <Col md={{ span: 2, offset: 10 }}>
                        {token && <Button variant="secondary" onClick={logOut}>Log out</Button>}
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 10, offset: 0 }}>
                        {routes}
                    </Col>
                </Row>
            </Container>
        </Router>
    );
}

export default App;
