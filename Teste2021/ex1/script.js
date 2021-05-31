var json = require('./emd.json')
var fs = require('fs')

var clubes = []

var modalidades = []

var atletas = []

json.forEach(a => {
    fs.appendFileSync('emdInd.ttl', `###  http://www.di.uminho.pt/prc2021/teste2021/ex1#${a.nome.primeiro}_${a.nome.último}
    :${a.nome.primeiro}_${a.nome.último} rdf:type owl:NamedIndividual ,
                            :Atleta ;
                   :praticaModalidade :${a.modalidade.replace(/\s/g, '_')} ;
                   :temClube :${a.clube.replace(/\s/g, '_')} ;
                   :data "${a.dataEMD}" ;
                   :email "${a.email}" ;
                   :federado "${a.federado}"^^xsd:boolean ;
                   :genero "${a.género}" ;
                   :id "${a._id}" ;
                   :idade ${a.idade} ;
                   :index ${a.index} ;
                   :morada "${a.morada}" ;
                   :resultado "${a.resultado}"^^xsd:boolean .
            
                                                        
                                                        `)
    if(!atletas.includes(a.nome)) atletas.push(a.nome)
    if(!clubes.includes(a.clube)) clubes.push(a.clube.replace(/\s/g, '_'))
    if(!modalidades.includes(a.modalidade)) modalidades.push(a.modalidade.replace(/\s/g, '_'))
})

fs.appendFileSync('emdInd.ttl', `###  http://www.di.uminho.pt/prc2021/teste2021/ex1#EMD
    :EMD rdf:type owl:NamedIndividual ,
                  :EMD ;
         `)

atletas.forEach(a => {
    
    fs.appendFileSync('emdInd.ttl', `:temAtleta :${a.primeiro}_${a.último} ;
                                                        `)
})

clubes.forEach(c => {
    
    fs.appendFileSync('emdInd.ttl', `###  http://www.di.uminho.pt/prc2021/teste2021/ex1#${c}
    :${c} rdf:type owl:NamedIndividual ,
                     :Clube .
                     

                                                        `)
})

modalidades.forEach(m => {
    
    fs.appendFileSync('emdInd.ttl', `###  http://www.di.uminho.pt/prc2021/teste2021/ex1#${m}
    :${m} rdf:type owl:NamedIndividual ,
                      :Modalidade .
                     

                                                        `)
})