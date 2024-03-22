<template> 
    <section class="pageContainer">
        <article class="page" v-for="name in pageNames" :key="name.id">
        <h1>{{ name.name }}</h1>
        <button @click="editPage(name)" class="edit">Edit</button>
        <button @click="deletePage(name)" class="delete">Delete</button>
    </article>
</section>

</template>

<script>
import axios from '../../../axios-auth';


export default {
  data() {
    return {
      pageNames: []
    };
  },
  mounted() {
    axios.get('/pages/names')
      .then(response => {
        this.pageNames = response.data;
      })
      .catch(error => {
        console.error('There was an error fetching the content:', error);
      });
  },
  methods: {
    editPage(name) {
      this.$router.push(`/admin/wysiwyg/${name.id}`);
    },
    deletePage(name) {
      if (confirm('Are you sure you want to delete this page?')) {
        axios.delete(`/pages/delete/${name}`)
          .then(() => {
            this.pageNames = this.pageNames.filter(pageName => pageName !== name);
          })
          .catch(error => {
            console.error('There was an error deleting the page:', error);
          });
      }
    }
  }
};

</script>

<style>
@import 'wysiwyg.scss';
</style>