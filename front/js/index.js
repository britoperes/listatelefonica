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
    }).catch(e=>{console.log(e)})
}

const postLista = ()=>{
    const nome = document.getElementById('nome').value
    const telefone1 = document.getElementById('telefone1').value
    const telefone2 = document.getElementById('telefone2').value
    const endereco = document.getElementById('endereco').value
    const myHeaders = new Headers({"Content-Type":"application/json"})
    const body = {
        nome,
        telefone1,
        telefone2,
        endereco
    }
    console.log(body)
    console.log(JSON.stringify(body))

    fetch(`${base}/lista`, {method:'POST', body:JSON.stringify(body), headers:myHeaders}).then(data=>{
        data.text().then(text=>{
            console.log(text)
            getLista()
        }).catch(e=>console.error(e))
    })
}

getLista()