<template>
  <div class="shopping-cart">
    <!-- Left Section -->
    <div class="left-section">
      <div class="program-info">
        <h2>Your Personal Program</h2>
        <p class="personal-program">
          Reservation fee for restaurants will be deducted from the final check at the restaurant.
        </p>
      </div>
      <div class="cart-items" v-if="!showCheckoutModal">
        <TicketComponent
          :agendaItem="ticket"
          v-for="ticket in uniqueTickets"
          :key="ticket.id"
        />
      </div>
      <CheckoutComponent v-if="showCheckoutModal" @cancel="cancelCheckout" />
    </div>

    <div class="right-section">
      <div class="invoice">
        <div class="cart-summary">
          <div class="total-items">
            <p class="label">{{ uniqueTickets.length }} Items <span class="value"></span></p>
          </div>
          <div class="subtotal">
            <p class="label">
              Subtotal: <span class="value">€{{ subtotal }}</span>
            </p>
          </div>
          <hr class="separator" />
          <div class="ticket-list" v-if="!showCheckoutModal">
            <div v-for="ticket in uniqueTickets" :key="ticket.id" class="ticket-item">
              <p>{{ ticket.title }}</p>
              <p>Price: €{{ ticket.price }}</p>
            </div>
          </div>
          <div class="total-tax">
            <p class="label">
              Total Tax (9%): <span class="value">€{{ tax }}</span>
            </p>
          </div>
          <hr class="separator" />
          <div class="final-price">
            <p class="label">
              Final price (incl. Tax): <span class="value">€{{ finalPrice }}</span>
            </p>
          </div>
          <button class="checkout-button" @click="showCheckoutModal = true" v-if="!showCheckoutModal && uniqueTickets.length > 0">
            Continue to Checkout
          </button>
          <div v-if="uniqueTickets.length === 0">
            <p>No items in the cart.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import TicketComponent from '../../components/ticket/TicketComponent.vue'; 
import CheckoutComponent from '../../components/checkout/CheckoutComponent.vue';
import { computed, onMounted, ref } from 'vue';
import { useTicketsStore } from '@/stores/tickets.js';

const ticketsStore = useTicketsStore();
const showCheckoutModal = ref(false); 

onMounted(() => {
  const storedTickets = JSON.parse(localStorage.getItem('tickets')) || []; 
  const uniqueTicketIds = [...new Set(storedTickets)];
  
  ticketsStore.fetchTicketDetails(uniqueTicketIds);
});

const uniqueTickets = computed(() => {
  const ticketMap = new Map();
  ticketsStore.tickets.forEach(ticket => {
    ticketMap.set(ticket.id, ticket);
  });
  return Array.from(ticketMap.values());
});

const subtotal = computed(() => {
  return uniqueTickets.value.reduce((acc, ticket) => acc + ticket.price, 0);
});

const tax = computed(() => subtotal.value * 0.09);
const finalPrice = computed(() => subtotal.value + tax.value);

const cancelCheckout = () => {
  showCheckoutModal.value = false;
};
</script>


<style scoped>

.shopping-cart {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%; 
}

.left-section {
  flex: 2;
  margin-left: 10px; 
}

.right-section {
  flex: 1; 
  margin-right: 10px;
}

.invoice-container {
  width: 100%; 
  overflow-x: auto;
}

.invoice {
  border: 2px solid white; 
  border-radius: 10px; 
  padding: 10px;
  min-width: 400px; 
}

.cart-summary {
  text-align: left;
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
}

.value {
  margin-left: 10px;
}

.cart-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 20px;
  width: 100%; 
}

.cart-items.agenda-view {
  flex-direction: column;
}

.cart-items .ticket-item {
  width: calc(50% - 10px); 
  margin-right: 10px; 
  margin-bottom: 10px; 
}

.program-info {
  margin-bottom: 20px;
}

.personal-program {
  font-size: 14px;
}

.invoice {
  text-align: left;
}

.label {
  text-align: left;
}
.value {
  text-align: right;
  margin-left: 10px;
}

.checkout-button {
  background-color: #562799; 
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%; 
  font-size: 16px; 
}

.separator {
  border-top: 1px solid #562799;
  margin: 10px 0;
}
</style>