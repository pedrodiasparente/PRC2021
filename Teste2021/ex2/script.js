var axios = require('axios')
var gdb = require('./utils/graphdb')

var prefixes = `

    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    PREFIX owl: <http://www.w3.org/2002/07/owl#>

    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    PREFIX noInferences: <http://www.ontotext.com/explicit>

    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

    PREFIX f: <http://prc.di.uminho.pt/2021/myfamily#>
  `

  var getLink = "http://localhost:7200/repositories/familia?query="


  
  var query = `
  CONSTRUCT { 
      ?s f:temDescendentes ?o .
  } WHERE {
      ?s f:eProgenitorDe+ ?o.
  }
  `

  var encoded = encodeURIComponent(prefixes + query)
  axios.get(getLink + encoded)
        .then(async dados => {
            props = dados.data.split('\n')
            props.forEach(p => {
                if (p =! '\n')
                console.log(p.split('#')[1].split('>')[0] +  ' ' + p.split('#')[2].split('>')[0] +  ' ' + p.split('#')[3].split('>')[0])
            })

            var query2 = `INSERT data { 
                ${dados.data}
            }
              `
            var result = await gdb.execTransaction(query2)
          
      })    
      .catch(erro => console.log(erro))