## MUNDOMÁTICA :earth_africa:
### Um novo jeito de ensinar Matemática
#### Faculdade SENAI - Florianópolis - 2021.1
#### Curso de Análise e desenvolvimento de sistemas

<br/>Este projeto consiste em um jogo de matemática, em que o usuário pode entrar com seu login e senha, e tentar responder o questionário, que possui dez (10) perguntas e quatro (4) alternativas em cada questão. 

Ao final da partida, o usuário pode verificar sua pontuação e comparar com os outros jogadores já listados no Ranking. <br/>

------------------------------------

## Instruções :scroll:

Crie uma pasta (no seu computador) para o projeto, exemplo: Projeto.

Após fazer o Download e extrair os arquivos para essa pasta que você criou, será necessário seguir alguns passos: 

* Instalar o Node.js (versão 14.17.3 LTS recomendada) - [Baixar Node.js](https://nodejs.org/en)

<br/> **Acessar Terminal**

* Acessar o diretório que vc criou (ex.: Projeto), depois acessar a pasta baixada >>> :file_folder:backend
* Digitar o seguinte comando:  `npm install` >>> serve para instalar a pasta :file_folder:node_modules dentro do diretório backend

* Voltar para o diretório Projeto (comando: `cd ..`), acessar a outra pasta baixada >>> :file_folder:frontend
* Digitar o seguinte comando:  `npm install` >>> serve para instalar a pasta :file_folder:node_modules dentro do diretório frontend

<br/>**Criar arquivo .env**

Será necessário criar um arquivo :bookmark_tabs: com o nome `.env` dentro da pasta :file_folder: backend
Este arquivo deve conter os seguintes dados:
- DBHOST=`é onde está hospedado seu banco de dados`
- DBUSER=`ex.: admin`
- DBPASS=`ex.: admin`
- DBNAME=`ex.: projeto`
- SECRET=`ex.: "projeto_secreto"`

<br/> **Executar Frontend e Backend**

Para executar os dois ao mesmo tempo, é necessário abrir dois terminais, entrar em cada diretório, e digitar o comando: `npm start`

Para cancelar a execução, basta apertar `Ctrl+c` no terminal.


------------------------------------

## Tecnologias Utilizadas :computer:	

#### BACKEND
* Javascript
* Node.js
* Nodemon
* Express
* Cors
* JWT
* Bcrypt
* Sequelize


#### FRONTEND
* React
* Reactstrap (React + Bootstrap)
* HTML
* CSS
* Javascript


#### SGBD
* MySQL
* Dotenv

------------------------------------
## Autores :pencil2:

- Matheus Alberto Rosa
- Victor Hugo Rodrigues Santiago
- Vinícius Rodrigues Santiago
- Yuri Furtado Ranieri

