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
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const emit = defineEmits(['cancel'])
const router = useRouter()

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
    cardElement = elements.create('card', {
      style: {
        base: {
          color: '#ffffff' 
        }
      }
    })
    cardElement.mount(cardElementContainer.value)
  }
})

async function redirectToStripe() {
  if (!stripe || !cardElement) {
    console.error('Stripe or cardElement is not properly initialized.')
    return
  }

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
    const response = await axios.post('/payment', paymentData)

    if (!response.data.clientSecret) {
      console.error('No client secret received.')
      return
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      response.data.clientSecret
    )
    if (confirmError) {
      console.error('Error confirming card payment:', confirmError)
      return
    }

    if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded:', paymentIntent)
      await sendOrder()
      router.push('/success')
    } else {
      console.log('Payment failed:', paymentIntent)
    }
  } catch (error) {
    console.error('Error redirecting to Stripe:', error)
  }
}

async function sendOrder() {
  try {
    const userId = localStorage.getItem('userId')
    const formattedTickets = props.tickets.map((ticket) => ({
      id: ticket.id,
      quantity: ticket.quantity
    }))
    const jwtToken = localStorage.getItem('jwt')
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
    const response = await axios.post('/orders', {
      userId: userId,
      tickets: formattedTickets
    })
    if (response.status === 200) {
      console.log('Tickets sent successfully')
    } else {
      console.error('Error sending tickets:', response)
    }
  } catch (error) {
    console.error('Error sending tickets:', error)
  }
}

const cancelCheckout = () => {
  emit('cancel')
}
</script>

<style scoped>
@import './checkout.scss';
</style>
