const fs = require('fs');
const readline = require('readline');

async function processLineByLine(file) {
  const fileStream = fs.createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    var lineArray = line.split(',')
    

    var write = `###  http://www.di.uminho.pt/prc2021/afericao#` + lineArray[0] + `
        <http://www.di.uminho.pt/prc2021/afericao#` + lineArray[0] + `> rdf:type owl:NamedIndividual ,
                                                                    :despesa ;
                                                            :pagador :` + lineArray[4] + ` ;
                                                            :data "` + lineArray[2] + `" ;
                                                            :descricao "` + lineArray[5] + `" ;
                                                            :valor "` + lineArray[3] + `"^^xsd:float .\n`
    
    if (lineArray[1] == 'Receita') {
        write = `###  http://www.di.uminho.pt/prc2021/afericao#` + lineArray[0] +`
            <http://www.di.uminho.pt/prc2021/afericao#` + lineArray[0] + `> rdf:type owl:NamedIndividual ,
                                                                        :receita ;
                                                                :pagador :` + lineArray[4] + ` ;
                                                                :data "` + lineArray[2] + `" ;
                                                                :descricao "` + lineArray[5] + `" ;
                                                                :valor "` + lineArray[3] + `"^^xsd:float .\n`
    }

    fs.appendFileSync('mapa.ttl', write)
  }
}

processLineByLine('livro.txt');
