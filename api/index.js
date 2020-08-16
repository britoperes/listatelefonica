const { request, json } = require("express");
const express = require ('express')
const mysql = require('mysql')
const app = express()
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'c96b8031',
    database: 'listatelefonica'
})

const dataAtual = ()=>{
    let dB = new Date()
    let data = `${dB.getFullYear()}-${dB.getMonth()}-${dB.getDate()} ${dB.getHours()}:${dB.getMinutes()}`
    return data
}

app.use(express.json())

app.listen(8080,()=>{
    connection.connect(erro=>{
        if(erro){
            console.log('Erro ao acessar banco de dados - ',erro)
            return
        }
        console.log("Conexão feita com sucesso")
        const query = "CREATE TABLE IF NOT EXISTS LISTATELEFONICA(ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, NOME VARCHAR(500), TELEFONE1 VARCHAR(20), TELEFONE2 VARCHAR(20), ENDERECO VARCHAR(500), DATACRIACAO DATETIME, DATAALTERACAO DATETIME)"
        connection.query(query, (erro, dados)=>{
            if(erro){
                console.log("Erro ao criar tabela - ", {erro})
                return
            }
            console.log("Tabela criada corretamente")
        })
    })
})

app.get('/', (requisicao, resposta)=>{
    console.log("Ok!")  
})

app.post('/lista', (req, res)=>{
    let dados = req.body
    let nome = dados.nome
    let telefone1 = dados.telefone1
    let telefone2 = dados.telefone2
    let endereco = dados.endereco
    let data = dataAtual()
    console.log(data)
    let query = `INSERT INTO LISTATELEFONICA(NOME, TELEFONE1, TELEFONE2, ENDERECO, DATACRIACAO) VALUES ('${nome}','${telefone1}', '${telefone2}','${endereco}',CAST('${data}'as DATETIME))`
    connection.query(query, (erro, dados)=>{
        if(erro){
            res.status(400).send({erro})
            return
        }
        res.send({dados})
    })
})

app.get('/lista', (req, res)=>{
    let query = `SELECT * FROM LISTATELEFONICA`
    connection.query(query, (erro, data)=>{
        if(erro){
            res.status(400).send({erro})
            return
        }
        res.send(data)
    })
})

app.put('/lista/:id', (req, res)=>{
    let id = req.params.id
    let dados = req.body
    let data = dataAtual()
    let query = `UPDATE LISTATELEFONICA SET NOME = '${dados.nome}', TELEFONE1 = '${dados.telefone1}', TELEFONE2 = '${dados.telefone2}', ENDERECO = '${dados.endereco}', DATAALTERACAO = '${data}' WHERE ID = ${id}`
    connection.query(query, (erro, dados)=>{
        if(erro){
            res.status(400).send({erro})
            return
        }
        res.send({dados})
    })
})

app.delete('/lista/:id', (req,res)=>{
    let id = req.params.id
    let query = `DELETE FROM LISTATELEFONICA WHERE ID = ${id}`
    connection.query(query,(erro,data)=>{
        if(erro){
            res.status(400).send({erro})
            return
        }
        res.send({data})
    })
})