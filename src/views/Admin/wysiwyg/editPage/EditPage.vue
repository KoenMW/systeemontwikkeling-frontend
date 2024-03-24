<template>
    <section class="banner">
        <div class="text-content">
          <input type="text" v-model="pageData.name" class="title pageEditField"/>
          <textarea type="text" v-model="pageData.intro" class="content pageEditField" ></textarea>
        </div>
        <div class="image">
          <img :src="pageData.picture" :alt="pageData.title" v-if="pageData.picture"/>
          <input type="file" @change="onFileChange($event, pageData)" class="fileInput" accept="image/*"/>
        </div>
        
    </section>
    
    <section id="" v-if="infoText.length > 0">
        <div v-for="info in infoText" :key="info.id">
        <div class="image">
          <img :src="info.picture" :alt="info.title" v-if="info.picture"/>
          <input type="file" @change="onFileChange($event, info)" class="fileInput" accept="image/*"/>
        </div>
          <input type="text" v-model="info.title" class="title pageEditField"/>
          <textarea type="text" v-model="info.content" class="content pageEditField"></textarea>
          <button @click="deleteInfo(info.id)">Delete</button>
        </div>
    </section>

    <section class="cards">
      <section class="card" v-for="card in pageData.cards" :key="card.id">
        <div class="image">
          <img :src="card.picture" :alt="card.title" v-if="card.picture"/>
          <input type="file" @change="onFileChange($event, card)" class="fileInput" accept="image/*"/>
        </div>
        <input type="text" v-model="card.title" class="title pageEditField"/>
        <textarea type="text" v-model="card.text" class="text pageEditField"></textarea>
        <button @click="deleteCard(card.id)">Delete</button>
      </section>
  </section>

</template>


<script>
import axios from '../../../../axios-auth';

export default {
  data() {
        return {
            pageData: {},
            infoText: []
        }
  },
  mounted() {
    console.log('mounted');
    //get id from url
    const pageName = this.$route.params.id;
    axios.get(`/pages/${pageName}`)
      .then(response => {
        this.pageData = response.data;
        this.pageData.infoText.forEach((info) => {
          this.infoText.push(info);
        })
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onFileChange(e, imageProperty) {
      const file = e.target.files[0];
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        alert('File size is too big. Max size is 2MB');
        return;
      }

      // convert image to base64
      const reader = new FileReader();
      reader.onload = e => {
        imageProperty.picture = e.target.result;
      };

      reader.onerror = error => {
        console.log('Error: ', error);
      };
      reader.readAsDataURL(file);
    },
    deleteInfo(id) {
      this.infoText = this.infoText.filter(info => info.id !== id);
    },
    deleteCard(id) {
      this.pageData.cards = this.pageData.cards.filter(card => card.id !== id);
    }
  }

};

</script>

<style>
@import 'EditPage.scss'
</style>