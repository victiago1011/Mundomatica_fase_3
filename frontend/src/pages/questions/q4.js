import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Jumbotron, Container, Form } from 'reactstrap'
import { getToken } from '../../utils/auth'
import MyButton from './MyButton'
import './Questions.css'


class Question4 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question: [],
            resposta_usuario: '',
            redirect: false,
            disabled: true
        }

        this.setResposta = this.setResposta.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    setResposta = (resposta_usuario) => {
        this.setState({
            resposta_usuario,
            disabled: false
        })
    }
    
    componentDidMount() {
        const token = getToken();
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        fetch(`http://localhost:5000/questions`, options)
            .then(question =>
                question.json().then(question => this.setState({ question }))
            )
    }


    render() {
        const { redirect } = this.state
        const { question } = this.state

        if (redirect) {
            return <Redirect to="/question/5" />
        }
        else {
            return (
                <>
                    {question.slice(3, 4).map((question, index) => (
                        <div key={index}>
                            <Container>
                                <Jumbotron className="fundo-questao">
                                    <Container>
                                        <h1><br/>{question.enunciado}</h1><br/>
                                        <MyButton handleClick={this.setResposta} label={question.alternativas[0].valor} /><t />
                                        <MyButton handleClick={this.setResposta} label={question.alternativas[1].valor} />
                                        <MyButton handleClick={this.setResposta} label={question.alternativas[2].valor} />
                                        <MyButton handleClick={this.setResposta} label={question.alternativas[3].valor} />

                                        <Form onSubmit={this.handleSubmit}>
                                            <br />
                                            <h2>SUA RESPOSTA:</h2>
                                            <p id="resposta">{this.state.resposta_usuario}</p>
                                            <button id="submit" type="submit" disabled={this.state.disabled} >Avançar</button>
                                        </Form>
                                    </Container>
                                </Jumbotron>
                            </Container>
                        </div>
                    ))}
                </>
            )
        }
    }// fim do render

    handleSubmit(e) {
        const token = getToken()

        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(this.state)
        }

        fetch("http://localhost:5000/questions/4", options)
            .then(res => {
                if (!res.ok && res.status === 401) {
                    alert('ERRO')
                }
                return res.json()
            }).then(data => {
                this.setState({ redirect: true })
            }).catch(err => console.log(err))

        e.preventDefault()
    }
}

export default Question4