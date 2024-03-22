<template>
  <section class="editSection">
    <bannerComponent :title="pageData.name" :description="pageData.intro" :image="pageData.picture" />

    <section id="" v-if="infoText.length > 0">
        <div v-for="info in infoText" :key="info.id">
            <h2>{{info.title}}</h2>
            <p>{{info.content}}</p>
        </div>
    </section>

    <section id="cards">
        <CardComponent v-for="card in pageData.cards" :key="card.name" :title="card.title" :description="card.text" :image="card.picture"/>
    </section>
  </section>

</template>


<script>
import axios from '../../../../axios-auth';
import bannerComponent from '@/components/banner/bannerComponent.vue';
import CardComponent from '@/components/card/CardComponent.vue';

export default {
  data() {
        return {
            pageData: {},
            events: [],
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
        console.log(this.pageData.name);
        this.pageData.infoText.forEach((info) => {
          this.infoText.push(info);
        })
        this.pageData.events.forEach((event) => {
          this.events.push(event);
        })
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    bannerComponent,
    CardComponent
  }

};

</script>

<style>
@import 'EditPage.scss'
</style>