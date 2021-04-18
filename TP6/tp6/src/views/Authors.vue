<template>
  <div class="w3-container">
    <h3>Authors:</h3>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="aut in authors" v-bind:key="aut" @click="goAuthors(aut)"> 
          <td>{{aut}}</td>
        </tr>
      </tbody>
    </table> 
  </div> 
</template>

<script>

import axios from 'axios';

  export default {
    name: 'Authors',

    data() {
      return {
            authors: null,
        };
    },

    created: function() {
      axios.get('http://localhost:8080/jcrpubs/authors')
        .then(res => {
          this.authors = res.data;
        })
    },
    methods: {
      goAuthors(id) {
        this.$router.push('/authors/' + id)
      }
    }
  }
</script>

<style>
  h3 {
    margin-bottom: 5%;
  }
</style>