<!--
    author: @KoenMW
-->

<template>

    <section id="qrReader">
        <QrcodeStream @detect="onDetect"></QrcodeStream>
    </section>

    <section v-if="orderData.checkedIn">
        <h2>Order is already checked in</h2>
    </section>
    <section id="orderData" v-if="orderData.id && !orderData.checkedIn && !unknownCode">
        <h2>Order data</h2>
        <p>Order payed: {{ !!orderData.paymentDate }}</p>
        <p>Tickets for: {{ orderData.title}}</p>
        <p>location: {{ orderData.location }}</p>
        <p>Start time: {{ formattedDate(orderData.startTime) }}</p>
        <p>End time: {{ formattedDate(orderData.endTime) }}</p>
        <button @click="checkin" v-if="!orderData.checkedIn && !!orderData.paymentDate">check in</button>
        <button @click="clearData">clear</button>
    </section>

    <section v-if="unknownCode">
        <h2>Unknown qr-code</h2>
    </section>
</template>


<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import { formattedDate } from '@/helpers/formatDate';
import axios from 'axios';

export default {
    props: {

    },
    components: {
        QrcodeStream
    },
    data() {
        return {
            orderData: {},
            unknownCode: false
        }
    },
    methods: {
         onDetect (detectedCodes) {
            this.checkCode(detectedCodes[0].rawValue);
         },
         checkCode (code) {
            console.log('code: ', code);

            axios.get(`${import.meta.env.VITE_API_URL}/orders/check/${code}`)
                .then(response => {
                    this.unknownCode = false;
                    console.log('response: ', response);
                    this.orderData = response.data;
                })
                .catch(error => {
                    console.log(error);
                    this.unknownCode = true;
                });
         },
         clearData () {
            this.orderData = {};
         },
         checkin () {
            axios.put(`${import.meta.env.VITE_API_URL}/orders/checkin`, { id: this.orderData.id, checkedIn: true })
                .then(response => {
                    console.log('response: ', response);
                    this.orderData.checkedIn = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
         },
         formattedDate (date) {
            return formattedDate(new Date(date));
         }
    }
}

</script>

<style scoped>
@import './Employee.scss';
</style>