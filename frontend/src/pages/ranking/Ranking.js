import React from 'react'
import { Table, Button, Jumbotron, Container, Row, Col, Label, Form, FormGroup, Input, } from 'reactstrap'
import './Ranking.css'
import logo from "../../img/logo.png"
import { getToken } from '../../utils/auth'

class Ranking extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            usuario: [],
            pontuacao: [],
            disabled_point: true,
            disabled_user: false
        }
    }

    componentDidMount() {
        const token = getToken();
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
                
        fetch(`http://localhost:5000/ranking?orderBy=pontuacao`, options)
            .then(user =>
                user.json().then(usuario => this.setState({ usuario }))
            )
    }

    handleChangeUser = event => {
        const token = getToken()
        const options = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        this.setState({
            disabled_point: false,
            disabled_user: true
        })

        fetch(`http://localhost:5000/ranking?orderBy=nome`, options)
            .then(user =>
                user.json().then(usuario => this.setState({ usuario }))
            )
    }

    ordenarPontuacao = event => {
        const token = getToken()
        const options = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        this.setState({
            disabled_point: true,
            disabled_user: false
        })

        fetch(`http://localhost:5000/ranking?orderBy=pontuacao`, options)
            .then(user =>
                user.json().then(usuario => this.setState({ usuario }))
            )
    }

    render() {
        const { usuario } = this.state;
        console.log("backend retorna: ", usuario)

        return (
            <>
                <header>
                    <Row>
                        <Col md="4">
                            <div id="logo-ranking">
                                <img src={logo} />
                            </div>
                        </Col>
                        <Col md="4">
                            <br />
                            <h1>Ranking</h1>
                        </Col>
                        <Col md="4">
                            <br />
                            <Button href="./question/1" className="jogar" color="warning" size="lg">Jogar</Button>
                        </Col>
                    </Row>
                </header>
                <Container>
                    <h5>Ordenar por: &nbsp;
                    <Button onClick={this.ordenarPontuacao} disabled={this.state.disabled_point}>Pontuação</Button>
                    <Button onClick={this.handleChangeUser} disabled={this.state.disabled_user}>Usuário</Button>

                    </h5>
                    <Jumbotron className="jumbotron">
                            <Container>
                                <Table bordered className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Usuario</th>
                                            <th>Pontuação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {usuario.map((user, index) => {
                                        return (
                                        <tr>
                                            <th key={index}>{index+1}</th>
                                            <td>{user.usuario}</td>
                                            <td>{user.pontuacao}</td>
                                        </tr>
                                                )
                                        })}
                                    </tbody>
                                </Table>
                            </Container>
                    </Jumbotron>
                </Container>
            </>
        )//fim do return
    }//fim do render
}// fim da classe Ranking

export default Ranking