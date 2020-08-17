const base = 'http://localhost:8080'

const criaLinhas = (array = [])=>{
    const base = '<tr> <th>#ID</th> <td>#NOME</td> <td>#TELEFONE1</td> <td>#TELEFONE2</td> <td>#ENDERECO</td></tr>'
    const lista = array.reduce((prev, value)=>{
        return prev + base.replace('#ID', value.ID).replace('#NOME',value.NOME).replace('#TELEFONE1', value.TELEFONE1).replace('#TELEFONE2', value.TELEFONE2).replace('#ENDERECO', value.ENDERECO)
    }, '')
    const corpoTabela = document.getElementById('corpotabela')
    corpoTabela.innerHTML = lista
}

const getLista = ()=>{
    fetch(`${base}/lista`, {method:'GET'}).then(data=>{
        data.text().then(result=>{
            const resultJSON = JSON.parse(result)
            console.log(resultJSON)
            criaLinhas(resultJSON)
        })
    })
}

getLista()