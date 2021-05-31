var express = require('express');
var router = express.Router();
var axios = require('axios')

var prefixes = `

    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    PREFIX owl: <http://www.w3.org/2002/07/owl#>

    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    PREFIX noInferences: <http://www.ontotext.com/explicit>

    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

    PREFIX e: <http://www.di.uminho.pt/prc2021/teste2021/ex1#>
  `

  var getLink = "http://localhost:7200/repositories/EMD?query="

/* GET home page. */
router.get('/api/emd', function(req, res, next) {
  
  var query = `SELECT * WHERE { 
      ?s e:id ?i .
      ?s e:data ?d .
      ?s e:resultado ?r .
   }`

  if (req.query.res == 'OK') {
    var query = `SELECT * WHERE { 
      ?s e:id ?i .
      ?s e:data ?d .
      ?s e:resultado ?r .
      filter(?r = true)
   }`
  }

  var encoded = encodeURIComponent(prefixes + query)
  axios.get(getLink + encoded)
      .then(dados => {
          var props = dados.data.results.bindings.map(bind => {
            return({
              nome:bind.s.value.split('#')[1],
              data: bind.d.value,
              id:bind.i.value,
              resultado:bind.r.value
            })
          })
          console.log(props)
          res.status(200).jsonp({props})
      })    
      .catch(erro => console.log(erro))
});

router.get('/api/emd/:id', function(req, res, next) {
  
  var query = `SELECT * WHERE {
      ?s e:index ?in .
      ?s e:praticaModalidade ?m .
      ?s e:temClube ?c .
      ?s e:idade ?id .
      ?s e:morada ?mo .
      ?s e:email ?e .
      ?s e:federado ?f .
      ?s e:genero ?g .
      ?s e:id ?i .
      ?s e:data ?d .
      ?s e:resultado ?r .
      filter(?i = '` + req.params.id + `')
   }`

  var encoded = encodeURIComponent(prefixes + query)
  axios.get(getLink + encoded)
      .then(dados => {
          var props = dados.data.results.bindings.map(bind => {
            return({
              nome:bind.s.value.split('#')[1],
              data: bind.d.value,
              id:bind.i.value,
              resultado:bind.r.value,
              modalidade:bind.m.value.split('#')[1],
              clube:bind.c.value.split('#')[1],
              index:bind.in.value,
              idade:bind.id.value,
              morada:bind.mo.value,
              email:bind.e.value,
              federado:bind.f.value,
              genero:bind.g.value
            })
          })
          console.log(props)
          res.status(200).jsonp({props})
      })    
      .catch(erro => console.log(erro))
});


router.get('/api/modalidades', function(req, res, next) {
  
  var query = `SELECT * WHERE { 
      ?m rdf:type e:Modalidade
   }`

  var encoded = encodeURIComponent(prefixes + query)
  axios.get(getLink + encoded)
      .then(dados => {
          var props = dados.data.results.bindings.map(bind => {
            return {modalidade:bind.m.value.split('#')[1]}
          })
          console.log(props)
          res.status(200).jsonp({props})
      })    
      .catch(erro => console.log(erro))
});

router.get('/api/modalidades/:id', function(req, res, next) {
  
  var query = `SELECT * WHERE { 
      ?s e:id ?i .
      ?s e:data ?d .
      ?s e:resultado ?r .
      ?s e:praticaModalidade e:` + req.params.id + `
   }`

  var encoded = encodeURIComponent(prefixes + query)
  axios.get(getLink + encoded)
      .then(dados => {
          var props = dados.data.results.bindings.map(bind => {
            return({
              nome:bind.s.value.split('#')[1],
              data: bind.d.value,
              id:bind.i.value,
              resultado:bind.r.value
            })
          })
          console.log(props)
          res.status(200).jsonp({props})
      })    
      .catch(erro => console.log(erro))
});

router.get('/api/atletas', function(req, res, next) {
  
  if(req.query.gen == 'M' || req.query.gen == 'F'){
    var query = `SELECT * WHERE { 
      ?s e:genero ?g
      filter(?g = '` + req.query.gen + `')
   } order by asc (?s)`
  }

  if(req.query.clube) {
    var query = `SELECT * WHERE { 
      ?s e:temClube e:` + req.query.clube + `
    } order by asc (?s)`
  }
  

  var encoded = encodeURIComponent(prefixes + query)
  axios.get(getLink + encoded)
      .then(dados => {
          var props = dados.data.results.bindings.map(bind => {
            return({
              nome:bind.s.value.split('#')[1]
            })
          })
          console.log(props)
          res.status(200).jsonp({props})
      })    
      .catch(erro => console.log(erro))
});

module.exports = router;
