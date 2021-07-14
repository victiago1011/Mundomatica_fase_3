const router = require('express').Router();
const Alternativa = require('../models/alternativa');
const Question = require('../models/question');
const Ranking = require('../models/ranking');
const UserQuestion = require('../models/userQuestion');
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
    try {
        let token = req.headers['authorization'];
        const tokenPuro = token.split(' ').pop();
        let userId;

        jwt.verify(tokenPuro, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    err: 'Accesso negado'
                });
            }

            userId = decoded.id;
        });

        const userAnswers = await UserQuestion.findAll({
            where: { id_usuario: userId },
            order: [
                ['id', 'DESC']
            ],
            limit: [10],
            include:
            {
                model: Question,
                attributes: ['enunciado', 'pontuacao'],
                include: {
                    model: Alternativa,
                    attributes: ['id', 'valor_alternativa', 'correta']
                }
            }
        });

        console.log(userAnswers)
        console.log(userAnswers.length)
        if (userAnswers.length == 0) {
            console.log("questão não encontrada");
            return res.status(400).json({
                err: 'não encontrada'
            })
        }

        let userPontuacao = 0;
        let alternativaCorreta = 0;
        let acertos = 0;
        let erros = 0;

        userAnswers.forEach(answer => {
            alternativaCorreta = answer.questao.alternativas.find(alternativa => alternativa.correta == true).id;

            console.log('questao: ', answer.questao.enunciado, 'pontuacao: ', answer.questao.pontuacao);
            console.log('resposta usuario: ', answer.resposta_usuario);
            console.log('alternativa correta: ', alternativaCorreta)

            if (alternativaCorreta === answer.resposta_usuario) {
                console.log('user acertou a questão');
                userPontuacao += answer.questao.pontuacao;
                acertos++;
            } else {
                erros++
                console.log('user errou a questão');
            }

            console.log('userPontuacao: ', userPontuacao)
        });
        console.log('user acertou ', acertos, ' e errou ', erros, ' questões, totalizando com ', userPontuacao, 'pontos')

        // inserir a pontuação na tabela de ranking
        const newRanking = await Ranking.create({
            pontuacao: userPontuacao,
            id_usuario: userId
        });

        return res.json({
            id_usuario: newRanking.id_usuario,
            pontuacao: newRanking.pontuacao,
            acertos: acertos,
            erros: erros
        })
    } catch (error) {
        console.log('ERROR:', error);
        return res.status(500).json({
            err: error
        });
    }
});

module.exports = router;