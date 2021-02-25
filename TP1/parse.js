var alunos = require('./alunos.json');
var docentes = require('./docentes.json');
var ucs = require('./ucs.json');

var fs = require('fs');

var file = writeDocentes()
file += writeUcs()
file += writeAlunos()

fs.writeFile('ontology.ttl', file, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

function writeDocentes() {
    var file = ''

    docentes.docentes.forEach(d => {
        file+= '<http://www.di.uminho.pt/prc2021/uc#' + d._id+ '> '
        file+= 'rdf:type owl:NamedIndividual,\n'
        var count = 1
        d.type.forEach(t => {
            if (count == d.type.length) file+= '                                                 <http://www.di.uminho.pt/prc2021/uc#' + t + '> ;\n'
            else {
                file+= '<http://www.di.uminho.pt/prc2021/uc#' + t + '> , '
                count++
            }
        })
        file+= '                                        <http://www.di.uminho.pt/prc2021/uc#ensina> '
        count = 1
        d.ensina.forEach(e => {
            if (count == d.ensina.length) file+= '<http://www.di.uminho.pt/prc2021/uc#' + e + '> ;\n'
            else {
                file+= '<http://www.di.uminho.pt/prc2021/uc#' + e + '> , '
                count++
            }
        })
        file+= '                                        <http://www.di.uminho.pt/prc2021/uc#nome> "' + d.nome + '" .\n\n\n'
    })

    return file
}

function writeUcs() {
    var file = ''

    ucs.ucs.forEach(u => {
        file+= '<http://www.di.uminho.pt/prc2021/uc#' + u._id+ '> '
        file+= 'rdf:type owl:NamedIndividual,\n'
        var count = 1
        u.type.forEach(t => {
            if (count == u.type.length) file+= '                                                      <http://www.di.uminho.pt/prc2021/uc#' + t + '> ;\n'
            else {
                file+= '<http://www.di.uminho.pt/prc2021/uc#' + t + '> , '
                count++
            }
        })
        file+= '                                             <http://www.di.uminho.pt/prc2021/uc#éEnsinadaPor> '
        count = 1
        u.éEnsinadaPor.forEach(e => {
            if (count == u.éEnsinadaPor.length) file+= '<http://www.di.uminho.pt/prc2021/uc#' + e + '> ;\n'
            else {
                file+= '<http://www.di.uminho.pt/prc2021/uc#' + e + '> , '
                count++
            }
        })
        file+= '                                             <http://www.di.uminho.pt/prc2021/uc#anoLetivo> "' + u.anoLetivo + '" ;\n'
        file+= '                                             <http://www.di.uminho.pt/prc2021/uc#designação> "' + u.designação + '" .\n\n\n'
    })

    return file
}

function writeAlunos() {
    var file = ''

    alunos.alunos.forEach(a => {
        file+= '<http://www.di.uminho.pt/prc2021/uc#' + a._id+ '> '
        file+= 'rdf:type owl:NamedIndividual,\n'
        var count = 1
        a.type.forEach(t => {
            if (count == a.type.length) file+= '                                                 <http://www.di.uminho.pt/prc2021/uc#' + t + '> ;\n'
            else {
                file+= '<http://www.di.uminho.pt/prc2021/uc#' + t + '> , '
                count++
            }
        })
        file+= '                                        <http://www.di.uminho.pt/prc2021/uc#frequenta> '
        count = 1
        a.frequenta.forEach(f => {
            if (count == a.frequenta.length) file+= '<http://www.di.uminho.pt/prc2021/uc#' + f + '> ;\n'
            else {
                file+= '<http://www.di.uminho.pt/prc2021/uc#' + f + '> , '
                count++
            }
        })
        file+= '                                        <http://www.di.uminho.pt/prc2021/uc#nome> "' + a.nome + '" .\n\n\n'
    })

    return file
}