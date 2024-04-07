<template>
  <div class="shopping-cart">
    <div class="left-section">
      <div class="program-info">
        <h2>Your Personal Program</h2>
        <p class="personal-program">
          Reservation fee for restaurants will be deducted from the final check at the restaurant.
        </p>
        <button class="share" @click="shareCart">share</button>
      </div>
      <div class="cart-items" v-if="!showCheckoutModal">
        <TicketComponent
          :agendaItem="item"
          v-for="(item, index) in tickets"
          :key="index"
          @ticketAdded="handleTicketAdded"
          @ticketRemoved="handleTicketRemoved"
        />
      </div>
      <checkoutComponent
        v-if="showCheckoutModal"
        @cancel="handleCancelCheckout"
        :tickets="tickets"
        :finalPrice="finalPrice"
        :ticketAmount="totalItems"
        :ticketQuantities="ticketQuantities"
      />
    </div>
    <div class="right-section invoice-container">
      <InvoiceComponent
        :tickets="tickets"
        :totalItems="totalItems"
        :subtotal="subtotal"
        :tax="tax"
        :finalPrice="finalPrice"
        @checkout="handleCheckout"
      />
    </div>
  </div>
</template>

<script setup>
import TicketComponent from '../../components/ticket/TicketComponent.vue'
import InvoiceComponent from '../../components/invoice/invoiceComponent.vue'
import checkoutComponent from '../../components/checkout/CheckoutComponent.vue'
import { ref, computed, onMounted } from 'vue'
const tickets = ref([])
const showCheckoutModal = ref(false)

const fetchTickets = () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const cartState = urlParams.get('cart');
    if (cartState) {
      tickets.value = JSON.parse(decodeURIComponent(cartState));
      localStorage.setItem('tickets', JSON.stringify(tickets.value));
    } else {
      const ticketsData = localStorage.getItem('tickets');
      if (ticketsData) {
        const parsedTickets = JSON.parse(ticketsData);
        const groupedTickets = parsedTickets.reduce((acc, ticket) => {
          const existingTicket = acc.find((item) => item.id === ticket.id);
          if (existingTicket) {
            existingTicket.quantity += 1;
          } else {
            ticket.quantity = 1;
            acc.push(ticket);
          }
          return acc;
        }, []);
        tickets.value = groupedTickets;
      } else {
        tickets.value = [];
      }
    }
  } catch (error) {
    console.error('Error fetching tickets:', error);
  }
}

const ticketQuantities = computed(() => {
  return tickets.value.map((ticket) => ({ id: ticket.id, quantity: ticket.quantity }))
})
const totalItems = computed(() => {
  return tickets.value.reduce((total, ticket) => total + ticket.quantity, 0)
})

const subtotal = computed(() => {
  return tickets.value.reduce((total, ticket) => total + ticket.price * ticket.quantity, 0)
})

const tax = computed(() => subtotal.value * 0.09)

const finalPrice = computed(() => {
  const price = subtotal.value + tax.value
  return isNaN(price) ? 0 : price;
})

const shareCart = () => {
  const cartState = encodeURIComponent(JSON.stringify(tickets.value));
  const shareUrl = `${window.location.origin}/shop/?cart=${cartState}`;

  if (navigator.share) {
    navigator.share({
      title: 'My Personal Program',
      text: 'Check out my personal program!',
      url: shareUrl,
    })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error));
  } else {
    console.log('Web Share API is not supported in your browser.');

  }
}

const handleTicketAdded = (agendaItem) => {
  const index = tickets.value.findIndex((ticket) => ticket.id === agendaItem.id)
  if (index !== -1) {
    tickets.value[index].quantity++
  } else {
    agendaItem.quantity = 1
    tickets.value.push(agendaItem)
  }
}

const handleTicketRemoved = (agendaItem) => {
  const index = tickets.value.findIndex((ticket) => ticket.id === agendaItem.id)
  if (index !== -1) {
    if (tickets.value[index].quantity > 1) {
      tickets.value[index].quantity--
    } else {
      tickets.value.splice(index, 1)
    }
  }
}
const handleCheckout = () => {
  showCheckoutModal.value = true
}

const handleCancelCheckout = () => {
  showCheckoutModal.value = false
}
onMounted(fetchTickets)
</script>

<style scoped>
@import './shop.scss';
</style>
