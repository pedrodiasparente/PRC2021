var express = require('express');
var axios = require('axios')
var router = express.Router();

/* GET users listing. */
router.get('/pubs', function(req, res, next) {
    if (req.query.type == null){
    var query = `select * where { ?s rdf:type <http://www.semanticweb.org/owl/owlapi/turtle#Publication> }`
    axios.get('http://epl.di.uminho.pt:8738/api/rdf4j/query/A85919-TP5?query=' + encodeURIComponent(query))
      .then(dados => {
          var pubs = dados.data.results.bindings.map(bind => bind.s.value.split('#')[1])
          res.send(pubs)
      })
      .catch(error => {
          res.send(error)
      })
    }

    else {
      var type = req.query.type
      var query = `select * where { ?s rdf:type <http://www.semanticweb.org/owl/owlapi/turtle#${type}> }`
      axios.get('http://epl.di.uminho.pt:8738/api/rdf4j/query/A85919-TP5?query=' + encodeURIComponent(query))
        .then(dados => {
            var pubs = dados.data.results.bindings.map(bind => bind.s.value.split('#')[1])
            res.send(pubs)
        })
        .catch(error => {
            res.send(error)
        })
    }
});

router.get('/pubs/:id', function (req, res, next) {
    var id = req.params.id
    var query = `select * where { <http://www.semanticweb.org/owl/owlapi/turtle#${id}> ?p ?o }`
    axios.get('http://epl.di.uminho.pt:8738/api/rdf4j/query/A85919-TP5?query=' + encodeURIComponent(query))
      .then(dados => {
          var pubs = dados.data.results.bindings.map(bind => { return ({
              p: bind.p.value.split('#')[1],
              o: (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1]
            })
          })
          res.send(pubs)
      })
      .catch(error => {
          res.send(error)
      })
});

router.get('/authors', function(req, res, next) {
  var query = `select * where { ?s rdf:type <http://www.semanticweb.org/owl/owlapi/turtle#Author> }`
  axios.get('http://epl.di.uminho.pt:8738/api/rdf4j/query/A85919-TP5?query=' + encodeURIComponent(query))
    .then(dados => {
        var pubs = dados.data.results.bindings.map(bind => bind.s.value.split('#')[1])
        res.send(pubs)
    })
    .catch(error => {
        res.send(error)
    })
});

router.get('/authors/:id', function (req, res, next) {
  var id = req.params.id
  var query = `select * where { <http://www.semanticweb.org/owl/owlapi/turtle#${id}> ?p ?o }`
  axios.get('http://epl.di.uminho.pt:8738/api/rdf4j/query/A85919-TP5?query=' + encodeURIComponent(query))
    .then(dados => {
        var pubs = dados.data.results.bindings.map(bind => { return ({
            p: bind.p.value.split('#')[1],
            o: (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1]
          })
        })
        res.send(pubs)
    })
    .catch(error => {
        res.send(error)
    })
});

module.exports = router;