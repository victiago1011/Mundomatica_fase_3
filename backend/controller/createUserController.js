const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { check, body, validationResult } = require('express-validator');

require('dotenv').config();

router.post('/', [
    check('login', "Login é um campo obrigatório")
        .trim().escape().notEmpty(),
    check('password', "Senha é um campo obrigatório")
        .trim().escape().notEmpty()
], async (req, res) => {
    try {
        const erros = validationResult(req);

        const contextoErros = {
            erros: erros.array(),
        };

        console.log(erros);

        if (!erros.isEmpty() || contextoErros.erros.length > 0) {
            return res.status(422).json(contextoErros);
        } else {
            const user = await User.findOne({
                where: { login: req.body.login }
            });

            if (user) {
                console.log('Já existe usuário com esse login');
                return res.status(400).json({
                    err: 'Já existe usuário com esse login'
                })
            }

            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (err) {
                    console.log('Erro ao gerar hash para a senha', err);
                } else {
                    console.log('hash: ', hash);

                    const newUser = await User.create({
                        login: req.body.login,
                        password: hash,
                    });

                    return res.json({
                        msg: 'Usuário criado com sucesso!',
                        user: newUser.login
                    })
                }
            })

        }
    } catch (error) {
        console.log('ERROR:', error);
        return res.status(500).json({
            err: error
        });
    }
});

module.exports = router;