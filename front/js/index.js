const base = 'http://localhost:8080'

const criaLinhas = (array = [])=>{
    const base = '<tr> <th>#ID</th> <td>#NOME</td> <td>#TELEFONE1</td> <td>#TELEFONE2</td> <td>#ENDERECO</td></tr>'
    const lista = array.reduce((prev, value)=>{
        return prev + base.replace('#ID', value.id).replace('#NOME',value.nome).replace('#TELEFONE1', value.telefone1).replace('#TELEFONE2', value.telefone2).replace('#ENDERECO', value.endereco)
    }, '')
    const corpoTabela = document.getElementById('corpotabela')
    corpoTabela.innerHTML = lista
}