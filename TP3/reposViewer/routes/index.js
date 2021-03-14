var express = require('express');
var router = express.Router();

var axios = require('axios')

var prefixes = `

    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    PREFIX owl: <http://www.w3.org/2002/07/owl#>

    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    PREFIX noInferences: <http://www.ontotext.com/explicit>

    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

  `

var newPrefixes = ``

router.get('/', function(req, res, next) {
  
  axios.get('http://localhost:7200/rest/repositories')
    .then(dados => {
      res.render('index', { data: (dados.data.map(list => {
        return({
          id: list.id,
          title: list.title,
          uri: list.uri
        })
      }))}
      );
    })
    .catch(erro => console.log(erro))
  
});

/* GET home page. */
router.get('/:repo', function(req, res, next) {

  var getLink = "http://localhost:7200/repositories/" + req.params.repo + "?query=" 

  var query = `SELECT ?s WHERE { ?s rdf:type owl:Class }`

  var encoded = encodeURIComponent(prefixes + query)

  axios.get(getLink + encoded)

  .then(dados => {
    res.render('repo', { data: (dados.data.results.bindings.map(list => {
      return({
        data: list.s.value.split('#')[1],
        repo: req.params.repo
      })
    }))}
    );
    })

    .catch(erro => console.log(erro))
  
});


router.get('/:repo/:class', function(req, res, next) {
  
  var repo = req.params.repo
  var className = req.params.class

  var getLink = "http://localhost:7200/repositories/" + req.params.repo + "?query="

  var query = `SELECT ?s WHERE { ?s rdf:type owl:Class }`

  var encoded = encodeURIComponent(prefixes + query)

  axios.get(getLink + encoded)
    .then(dados => {
      var ontPrefix = `  PREFIX adv: <` + dados.data.results.bindings[0].s.value.split('#')[0] + `#>

      `
      newPrefixes = prefixes + ontPrefix

      var query = `SELECT ?s WHERE { ?s rdf:type adv:` + className + ` }`

      var encoded = encodeURIComponent(newPrefixes + query)

      axios.get(getLink + encoded)

      .then(dados => {

          var props = dados.data.results.bindings.map(bind => {return({
            data:bind.s.value.split('#')[1],
            repo: repo
          })
          })


          console.log(props)
          res.render('indivs', { indivs: props });

      })    

      .catch(erro => console.log(erro))


      })
    .catch(erro => console.log(erro))
});

router.get('/:repo/indivs/:indiv', function(req, res, next) {

  var indiv = req.params.indiv
  var className = req.params.class

  var getLink = "http://localhost:7200/repositories/" + req.params.repo + "?query="

  var query = `SELECT ?s WHERE { ?s rdf:type owl:Class }`

  var encoded = encodeURIComponent(prefixes + query)

  axios.get(getLink + encoded)
    .then(dados => {
      var ontPrefix = `  PREFIX adv: <` + dados.data.results.bindings[0].s.value.split('#')[0] + `#>

      `
      newPrefixes = prefixes + ontPrefix

      var query = `SELECT * WHERE { adv:` + indiv + ` ?p ?o }`

      var encoded = encodeURIComponent(newPrefixes + query)

      axios.get(getLink + encoded)

      .then(dados => {

          var props = dados.data.results.bindings.map(bind => {return({
            p: bind.p.value.split('#')[1],
            o: (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1]
          })
          })


          console.log(props)
          res.render('indiv', { data: props });

      })    

      .catch(erro => console.log(erro))


      })
    .catch(erro => console.log(erro))
});

module.exports = router;
