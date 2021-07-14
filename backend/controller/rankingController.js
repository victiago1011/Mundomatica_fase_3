const router = require('express').Router();
const Ranking = require('../models/ranking');
const User = require('../models/user');

function ordenByPontuacao(array) {
    let troca;
    do {
        troca = false;
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i]['pontuacao'] < array[i + 1]['pontuacao']) {
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                troca = true;
            }
        }
    } while (troca);
    return array;
}

function ordenByNome(array) {
    let troca;
    do {
        troca = false;
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i]['usuario'] > array[i + 1]['usuario']) {
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                troca = true;
            }
        }
    } while (troca);
    return array;
}

router.get('/', async (req, res) => {
    try {
        const ranking = await Ranking.findAll({
            attributes: ['pontuacao'],
            include: {
                model: User,
                attributes: ['login']
            }
        });

        let arrObj = [];
        ranking.forEach(user => {
            let obj = {
                usuario: user.usuario.login,
                pontuacao: user.pontuacao
            }

            // console.log(obj)
            arrObj.push(obj);
        })

        let arrOrdenado;

        if (req.query['orderBy'] == null) {
            return res.status(400).json({
                err: 'Parâmetro orderBy obrigatório informe se deseja ordenar por pontuacao ou nome'
            })
        }

        if (req.query['orderBy'] !== "nome" && req.query['orderBy'] !== "pontuacao") {
            return res.status(400).json({
                err: 'Informe a ordenação por nome ou pontuacao '
            })
        }

        if (req.query['orderBy'] == "nome") {
            arrOrdenado = ordenByNome(arrObj)
        }

        if (req.query['orderBy'] == "pontuacao") {
            arrOrdenado = ordenByPontuacao(arrObj)
        }
        console.log(arrOrdenado)
        return res.json(arrOrdenado)
    } catch (error) {
        console.log('ERROR:', error);
        return res.status(500).json(error);
    }
});

module.exports = router;