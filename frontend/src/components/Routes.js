import React from 'react'

import {Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import Login from '../pages/login/Login.js'
import Register from '../pages/login/Register.js'
import Ranking from '../pages/ranking/Ranking.js'
import Question1 from '../pages/questions/q1'
import Question2 from '../pages/questions/q2'
import Question3 from '../pages/questions/q3'
import Question4 from '../pages/questions/q4'
import Question5 from '../pages/questions/q5'
import Question6 from '../pages/questions/q6'
import Question7 from '../pages/questions/q7'
import Question8 from '../pages/questions/q8'
import Question9 from '../pages/questions/q9'
import Question10 from '../pages/questions/q10'
import Pontuacao from '../pages/pontuacao/Pontuacao.js'
import NotFound from './NotFound'

import { isAuth } from '../utils/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuth() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/', state: { from: props.location }  }} />
        )
    )}/>
)

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/register" component={Register} />
            <PrivateRoute path="/ranking" component={Ranking} />
            <PrivateRoute path="/question/1" component={Question1} />
            <PrivateRoute path="/question/2" component={Question2} />
            <PrivateRoute path="/question/3" component={Question3} />
            <PrivateRoute path="/question/4" component={Question4} />
            <PrivateRoute path="/question/5" component={Question5} />
            <PrivateRoute path="/question/6" component={Question6} />
            <PrivateRoute path="/question/7" component={Question7} />
            <PrivateRoute path="/question/8" component={Question8} />
            <PrivateRoute path="/question/9" component={Question9} />
            <PrivateRoute path="/question/10" component={Question10} />
            <PrivateRoute path="/pontuacao" component={Pontuacao} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)

export default Routes