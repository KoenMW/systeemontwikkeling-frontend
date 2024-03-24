<template>
  <div class="checkout">
    <div class="input-group">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" placeholder="Enter your name">
    </div>
    <div class="input-group">
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="email" placeholder="Enter your email">
    </div>
    <div class="payment-options">
      <label v-for="(option, index) in paymentOptions" :key="index" class="payment-option">
        <input type="radio" :id="'paymentOption_' + index" :value="option.value" v-model="paymentMethod">
        <img :src="option.image" :alt="option.alt" />
      </label>
    </div>
    <div class="button-container">
      <button class="cancel-button" @click="cancelCheckout">Cancel</button>
      <button class="checkout-button" @click="confirmCheckout">Checkout</button>
    </div>
  </div>
</template>

<script>
// Import your images
import payLater from '@/assets/images/shop/paymentMethods/paylater.png';
import visa from '@/assets/images/shop/paymentMethods/visa.png';
import ideal from '@/assets/images/shop/paymentMethods/ideal.png';

export default {
  data() {
    return {
      name: '',
      username: '',
      email: '',
      paymentMethod: 'pay-later', // Default payment method
      paymentOptions: [
        { value: 'pay-later', image: payLater, alt: 'Pay Later' },
        { value: 'visa', image: visa, alt: 'Visa' },
        { value: 'ideal', image: ideal, alt: 'iDeal' }
      ]
    };
  },
  methods: {
    confirmCheckout() {
      // Display an alert when the user clicks Checkout
      alert('Checkout confirmed!');
      
      // Log the details to the console (optional)
      console.log('Name:', this.name);
      console.log('Username:', this.username);
      console.log('Email:', this.email);
      console.log('Payment Method:', this.paymentMethod);
      
      // Once payment is confirmed, you can emit an event or perform other actions as needed
    },
    cancelCheckout() {
      this.$emit('cancel'); // Emit the cancel event
      this.name = '';
      this.username = '';
      this.email = '';
      this.paymentMethod = 'pay-later'; // Reset payment method to default
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
.checkout {
  margin-top: 20px;
  padding: 20px;
  border: 2px solid white;
  border-radius: 20px;
  text-align: center; /* Center-align content */
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

.payment-option input[type="radio"] {
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
