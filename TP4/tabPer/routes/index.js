var express = require('express');
var router = express.Router();
var axios = require('axios')



var prefixes = `

    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    PREFIX owl: <http://www.w3.org/2002/07/owl#>

    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    PREFIX noInferences: <http://www.ontotext.com/explicit>

    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

    PREFIX el: <http://www.daml.org/2003/01/periodictable/PeriodicTable#>

`



var getLink = "http://www.localhost:7200/repositories/PRC-tpc4-Tab-Periodica" + "?query=" 



/* GET home page. */
router.get('/', function(req, res, next) {

  var query = `SELECT * WHERE { ?s ?p el:Element }`
  var encoded = encodeURIComponent(prefixes + query)

  axios.get(getLink + encoded)

    .then(dados => {

        var props = dados.data.results.bindings.map(bind => bind.s.value.split('#')[1] )

        var elems = []
        props.forEach(a => {
          if (a != null) elems.push(a)
        })

        var query = `SELECT * WHERE { ?s ?p el:Group }`
        var encoded = encodeURIComponent(prefixes + query)

        axios.get(getLink + encoded)

          .then(dados => {

              var props = dados.data.results.bindings.map(bind => bind.s.value.split('#')[1] )

              var groups = []
              props.forEach(a => {
                if (a != null) groups.push(a)
              })

              var query = `SELECT * WHERE { ?s ?p el:Period }`
              var encoded = encodeURIComponent(prefixes + query)

              axios.get(getLink + encoded)

                .then(dados => {

                    var props = dados.data.results.bindings.map(bind => bind.s.value.split('#')[1] )

                    var periods = []
                    props.forEach(a => {
                      if (a != null) periods.push(a)
                    })

                    res.status(200).jsonp({elems: elems, groups: groups, periods: periods})

                })    

                .catch(erro => console.log(erro))

          })    

          .catch(erro => console.log(erro))

     })    

    .catch(erro => console.log(erro))
});

module.exports = router;
