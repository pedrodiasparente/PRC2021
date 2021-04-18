<template>
  <div class="w3-container">
    <h3 class="w3-header w3-blue">Autor {{ida}}</h3>
    <table class="w3-table-all">
        <tr>
            <th>Predicado</th><th>Objeto</th>
        </tr>
        <tr v-for="(triplo, i) in dados" :key="i">
            <td>{{triplo.p}}</td><td>{{triplo.o}}</td>
        </tr>
    </table>
  </div> 
</template>
<script>
import axios from 'axios';

  export default {
    name: 'Aut',

    props: ["ida"],

    data() {
      return {
            dados: null,
        };
    },

    created: function() {
      axios.get('http://localhost:8080/jcrpubs/authors/' + this.ida)
        .then(res => {
          this.dados = res.data 
        })
    }
  }
</script>

<style>
  h3 {
    margin-bottom: 5%;
  }
</style>