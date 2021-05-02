var cidades = require('./cidades.json')
var fs = require('fs')

cidades.cidades.forEach(c => {
    let data = `
###  http://www.di.uminho.pt/prc2021/cidades#${c.id}
:${c.id} rdf:type owl:NamedIndividual ;
    :descricao "${c.descrição}" ;
    :distrito "${c.distrito}" ;
    :nome "${c.nome}" ;
    :populacao "${c.população}"^^xsd:int .

    `
    fs.appendFileSync("cidadesIndv.ttl", data)
})

cidades.ligações.forEach(l => {
    let data = `
###  http://www.di.uminho.pt/prc2021/cidades#${l.id}
:${l.id} rdf:type owl:NamedIndividual ;
    :destino :${l.destino} ;
    :origem :${l.origem} ;
    :distancia "${l.distância}"^^xsd:float .

    `
    fs.appendFileSync("cidadesIndv.ttl", data)
})