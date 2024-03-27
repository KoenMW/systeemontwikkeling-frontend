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
import MollieApiClient from '@mollie/api-client'; 
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

let mollie;

try {
  mollie = new MollieApiClient.default();
  mollie.setApiKey('test_jnzC6g8nrGg7un5GfbkdNTF4xq6eq3');
} catch (error) {
  console.error('Error initializing Mollie API client:', error);
}

const redirectToMollie = async () => {
  try {
    if (!mollie) {
      console.error('Mollie API client is not initialized');
      return;
    }

    const { data: payment } = await mollie.payments.create({
      amount: {
        currency: 'EUR',
        value: '10.00'
      },
      description: 'Tickets',
      redirectUrl: 'https://localhost:5173/checkout-success'
    });

    window.location.href = payment._links.checkout.href;
  } catch (error) {
    console.error('Error creating payment:', error);
  }
};

const cancelCheckout = () => {
  name.value = '';
  email.value = '';
  paymentMethod.value = 'pay-later';
};
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