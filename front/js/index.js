const base = 'http://localhost:8080'

const criaLinhas = (array = [])=>{
    const botaoDelete = '<button onclick = "deleteLista(#ID)" type="button" class="btn btn-danger">deletar</button>'
    const botaoAlterar = '<button onclick = "alterarLista(#ID)"type="button" class="btn btn-warning">Alterar</button>'
    const base = `<tr id='item#ID'> <th>#ID</th> <td>#NOME</td> <td>#TELEFONE1</td> <td>#TELEFONE2</td> <td>#ENDERECO</td> <td>${botaoDelete}</td><td>${botaoAlterar}</td></tr>`
    const lista = array.reduce((prev, value)=>{
        return prev + base.replace('#ID', value.ID).replace('#NOME',value.NOME).replace('#TELEFONE1', value.TELEFONE1).replace('#TELEFONE2', value.TELEFONE2).replace('#ENDERECO', value.ENDERECO).replace('#ID', value.ID).replace('#ID', value.ID).replace('#ID', value.ID)
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

const alterarLista = (id)=>{
    const item = document.querySelectorAll(`#item${id} td`)
    document.getElementById('botaoInserir').setAttribute('disabled','true')
    document.getElementById('botaoAlterar').setAttribute('onclick',`putLista(${id})`)
    document.getElementById('botaoAlterar').removeAttribute('disabled')
    document.getElementById('nome').value = item[0].textContent
    document.getElementById('telefone1').value = item[1].textContent
    document.getElementById('telefone2').value= item[2].textContent
    document.getElementById('endereco').value= item[3].textContent
}

const putLista = (id)=>{
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
    fetch(`${base}/lista/${id}`,{method:'PUT', body:JSON.stringify(body), headers:myHeaders}).then(data=>{
        data.text().then(text=>{
            getLista()
            limpaCampos()
            document.getElementById('botaoAlterar').setAttribute('disabled','true')
            document.getElementById('botaoAlterar').removeAttribute('onclick')
            document.getElementById('botaoInserir').removeAttribute('disabled')
        })
    }).catch(e=>console.error(e))
}

const limpaCampos = ()=>{
    document.getElementById('nome').value = ''
    document.getElementById('telefone1').value = ''
    document.getElementById('telefone2').value= ''
    document.getElementById('endereco').value= ''
    document.getElementById('nome').focus()
}
getLista()