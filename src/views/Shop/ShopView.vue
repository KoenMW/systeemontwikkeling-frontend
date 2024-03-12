<template>
  <div class="shopping-cart">
    <h2>Your Shopping Cart</h2>
    <p v-if="!cart.length">No items in your cart.</p>
    <ul v-else>
      <li v-for="item in cart" :key="item.id">
        {{ item.name }} - €{{ item.price }}
      </li>
    </ul>
    <div class="subtotal">
      <p>Subtotal:</p>
      <p>€{{ subtotal }}</p>
    </div>
    <div class="reservation-fee">
      <p>Reservation fee (restaurants):</p>
      <p>€0 (not applicable)</p>
    </div>
    <div class="final-price">
      <p>Final price (incl. Tax):</p>
      <p>€{{ finalPrice }}</p>
    </div>
    <button @click="goToCheckout">Continue to Checkout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
    };
  },
  computed: {
    subtotal() {
      return this.cart.reduce((total, item) => total + item.price, 0);
    },
    finalPrice() {
      return this.subtotal;
    },
  },
  methods: {
    goToCheckout() {
      // Redirect to checkout page here
      alert("This feature is not implemented yet.");
    },
  },
};
</script>

<style scoped>
/* Add your SCSS styles here */
</style>
