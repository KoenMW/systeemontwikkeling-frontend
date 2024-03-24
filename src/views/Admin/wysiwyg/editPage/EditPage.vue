<template>
  <button @click="savePage" class="savePage button">Save</button>
    <section class="banner">
        <div class="text-content">
          <input type="text" v-model="pageData.name" class="title pageEditField" placeholder="title"/>
          <textarea type="text" v-model="pageData.intro" class="content pageEditField" placeholder="page intro"></textarea>
        </div>
        <div class="image">
          <img :src="pageData.picture" :alt="pageData.title" v-if="pageData.picture"/>
          <input type="file" @change="onFileChange($event, pageData)" class="fileInput" accept="image/*"/>
        </div>
        
    </section>
    
    <section>
        <div v-for="info in infoText" :key="info.id">
          <div class="image">
            <img :src="info.picture" :alt="info.title" v-if="info.picture"/>
            <input type="file" @change="onFileChange($event, info)" class="fileInput" accept="image/*"/>
          </div>
          <input type="text" v-model="info.title" class="title pageEditField" placeholder="title"/>
          <textarea type="text" v-model="info.content" class="content pageEditField" placeholder="info text"></textarea>
          <button @click="deleteInfo(info.id)">Delete</button>
        </div>
        <button @click="addInfo" class="add button">Add info text</button>
    </section>

    <section class="cards">
      <section class="card" v-for="card in pageData.cards" :key="card.id">
        <div class="image">
          <img :src="card.picture" :alt="card.title" v-if="card.picture"/>
          <input type="file" @change="onFileChange($event, card)" class="fileInput" accept="image/*"/>
        </div>
        <input type="text" v-model="card.title" class="title pageEditField" placeholder="title"/>
        <textarea type="text" v-model="card.text" class="text pageEditField" placeholder="card text"></textarea>
        <button @click="deleteCard(card.id)">Delete</button>
      </section>
      <button @click="addCard" class="add button">Add Card</button>
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
    const pageId = this.$route.params.id;
    axios.get(`/pages/${pageId}`)
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
    },
    addInfo() {
      this.infoText.push({
        id: Date.now(),
        title: '',
        content: '',
        picture: ''
      });
    },
    addCard() {
      this.pageData.cards.push({
        id: Date.now(),
        title: '',
        text: '',
        picture: ''
      });
    },
    savePage() {
      // dit moet waarschijnlijk anders
      axios.put(`/pages/${this.pageData.id}`, this.pageData)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

};

</script>

<style>
@import 'EditPage.scss'
</style>