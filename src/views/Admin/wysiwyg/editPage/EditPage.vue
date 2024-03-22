<template>
    <section class="">
        test
    </section>
</template>


<script>
import axios from '../../../../axios-auth';

export default {
  data() {
    return {
    };
  },
  mounted() {
    console.log('mounted');
    //get id from url
    const pageName = this.$route.params.id;
    axios.get(`/pages/${pageName}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },

};

</script>