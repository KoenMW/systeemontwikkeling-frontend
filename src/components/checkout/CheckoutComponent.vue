<template>
  <div class="checkout">
    <div class="input-group">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" placeholder="Enter your name" />
    </div>
    <div class="input-group">
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="email" placeholder="Enter your email" />
    </div>
    <div class="payment-options">
      <label v-for="(option, index) in paymentOptions" :key="index" class="payment-option">
        <input
          type="radio"
          :id="'paymentOption_' + index"
          :value="option.value"
          v-model="paymentMethod"
        />
        <img :src="option.image" :alt="option.alt" />
      </label>
    </div>
    <div class="button-container">
      <button class="cancel-button" @click="cancelCheckout">Cancel</button>
      <button class="checkout-button" @click="redirectToMollie">Checkout</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import payLater from '@/assets/images/shop/paymentMethods/paylater.png';
import visa from '@/assets/images/shop/paymentMethods/visa.png';
import ideal from '@/assets/images/shop/paymentMethods/ideal.png';

const name = ref('');
const email = ref('');
const paymentMethod = ref('pay-later'); 
const paymentOptions = ref([
  { value: 'pay-later', image: payLater, alt: 'Pay Later' },
  { value: 'visa', image: visa, alt: 'Visa' },
  { value: 'ideal', image: ideal, alt: 'iDeal' }
]);

import Stripe from 'stripe';

// verplaats dit naar een .env file
const stripe = new Stripe('sk_test_51Oyw6jDaMnaVygG5Lpod1wrePHAlBM0CSPMLZo8oV0MMqsomNNtmYpsiehpq32lHIQh3Mf5NNuJnMSZHGXCCaEoD00FhRyeRTK');

stripe.customers
  .create({
    email: 'customer@example.com',
  })
  .then((customer) => {
    // have access to the customer object
    return stripe.invoiceItems
      .create({
        customer: customer.id, // set the customer id
        amount: 2500, // 25
        currency: 'usd',
        description: 'One-time setup fee',
      })
      .then((invoiceItem) => {
        return stripe.invoices.create({
          collection_method: 'send_invoice',
          customer: invoiceItem.customer,
        });
      })
      .then((invoice) => {
        console.log(invoice);
        // New invoice created on a new customer
      })
      .catch((err) => {
        console.error(err);
        // Deal with an error
      });
  });
</script>

<style scoped>

.checkout {
  margin-top: 20px;
  padding: 20px;
  border: 2px solid white;
  border-radius: 20px;
  text-align: center; 
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.input-group label {
  flex: 1;
  margin-right: 10px;
  color: white;
  font-weight: bold;
}

.input-group input {
  flex: 2;
  width: 100%;
  padding: 10px;
  border: 2px solid white;
  border-radius: 20px;
  background-color: transparent;
  color: white;
}

.payment-options {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.payment-option {
  display: flex;
  align-items: center;
  margin: 0 10px;
}

.payment-option input[type='radio'] {
  margin-right: 5px;
}

.payment-option img {
  width: 100px;
  height: auto;
  cursor: pointer;
}

.button-container {
  display: flex;
  justify-content: center;
}

.checkout-button,
.cancel-button {
  background-color: #562799;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  margin: 0 10px;
}

.checkout-button:hover,
.cancel-button:hover {
  background-color: #450f73;
}
</style>