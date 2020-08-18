const base = 'http://localhost:8080'

const criaLinhas = (array = [])=>{
    const botaoDelete = '<button onclick = "deleteLista(#ID)" type="button" class="btn btn-danger">deletar</button>'
    const base = `<tr> <th>#ID</th> <td>#NOME</td> <td>#TELEFONE1</td> <td>#TELEFONE2</td> <td>#ENDERECO</td> <td>${botaoDelete}</td></tr>`
    const lista = array.reduce((prev, value)=>{
        return prev + base.replace('#ID', value.ID).replace('#NOME',value.NOME).replace('#TELEFONE1', value.TELEFONE1).replace('#TELEFONE2', value.TELEFONE2).replace('#ENDERECO', value.ENDERECO).replace('#ID', value.ID)
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
    const inputNome = document.getElementById('nome')
    let nome = inputNome.value
    let telefone1 = document.getElementById('telefone1').value
    let telefone2 = document.getElementById('telefone2').value
    let endereco = document.getElementById('endereco').value
    let myHeaders = new Headers({"Content-Type":"application/json"})
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
            getLista()
            limpaCampos()
        }).catch(e=>console.error(e))
    })
}

const deleteLista = (id)=>{
    console.log(id)
    fetch(`${base}/lista/${id}`, {method:'DELETE'}).then(data=>{
        data.text().then(data=> getLista())
    })
}

const limpaCampos = ()=>{ //nao funciona
    let nome = document.getElementById('nome').textContent
    nome = ''
    let telefone1 = document.getElementById('telefone1').value
    telefone1 = ''
    let telefone2 = document.getElementById('telefone2').value
    telefone2 = ''
    let endereco = document.getElementById('endereco').value
    endereco =''
    let inputNome = document.getElementById('nome')
    inputNome.focus()
}
getLista()