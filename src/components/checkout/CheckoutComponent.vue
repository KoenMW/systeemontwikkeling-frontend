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
    <div class="card-element" ref="cardElementContainer"></div>
    <div class="button-container">
      <button class="cancel-button" @click="cancelCheckout">Cancel</button>
      <button class="checkout-button" @click="redirectToStripe">Checkout</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import axios from '../../axios-auth'

const name = ref('')
const email = ref('')

let stripe = null
let cardElement = null
const props = defineProps({
  finalPrice: Number,
  tickets: Array
})
let cardElementContainer = ref(null)

onMounted(async () => {
  stripe = await loadStripe(import.meta.env.VITE_VUE_APP_STRIPE_PUBLIC_KEY)
  if (stripe) {
    const elements = stripe.elements()
    cardElement = elements.create('card')
    cardElement.mount(cardElementContainer.value)
  }
})
async function redirectToStripe() {
  if (stripe && cardElement) {
    try {
      const { token, error } = await stripe.createToken(cardElement)

      if (error) {
        console.error('Error creating card token:', error)
        return
      }

      if (!token) {
        console.error('No token received.')
        return
      }

      const paymentData = {
        amount: props.finalPrice * 100,
        currency: 'eur',
        payment_method_data: {
          type: 'card',
          card: {
            token: token.id
          }
        },
        email: email.value
      }
      console.log('Payment data:', paymentData)
      const response = await axios.post('/payment', paymentData)

      if (response.data.clientSecret) {
        const { paymentIntent, error } = await stripe.confirmCardPayment(response.data.clientSecret)

        if (error) {
          console.error('Error confirming card payment:', error)
          return
        }
        if (paymentIntent.status === 'succeeded') {
          console.log('Payment succeeded:', paymentIntent)
          try {
            const token = localStorage.getItem('jwt')
            const response = await axios.post(
              '/orders',
              {
                tickets: props.tickets
              },
              {
                headers: {
                  Authorization: `Bearer ${token}` 
                }
              }
            )
            if (response.status === 200) {
              console.log('Tickets sent successfully')
            } else {
              console.error('Failed to send tickets:', response)
            }
          } catch (error) {
            console.error('Error sending tickets:', error)
          }
        } else {
          console.log('Payment failed:', paymentIntent)
        }
      } else {
        console.error('No client secret received.')
      }
    } catch (error) {
      console.error('Error redirecting to Stripe:', error)
    }
  } else {
    console.error('Stripe or cardElement is not properly initialized.')
  }
}

const cancelCheckout = () => {
  this.$emit('cancel')
}
</script>

<style scoped>
@import './checkout.scss';
</style>
