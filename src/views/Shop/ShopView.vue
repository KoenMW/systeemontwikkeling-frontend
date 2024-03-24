<template>
  <div class="shopping-cart">
    <div class="left-section">
      <div class="program-info">
        <h2>Your Personal Program</h2>
        <p class="personal-program">
          Reservation fee for restaurants will be deducted from the final check at the restaurant.
        </p>
      </div>
      <div class="button-container">
        <button class="agenda-view-button" @click="toggleView('agenda')">View Agenda</button>
        <button class="normal-view-button" @click="toggleView('normal')">Normal View</button>
      </div>
      <div v-if="!showCheckoutModal" class="cart-items" :class="{ 'agenda-view': isAgendaView }">
        <!-- Render TicketComponent or AgendaItem based on isAgendaView -->
        <template v-if="!isAgendaView">
          <TicketComponent
            :ticket="ticket"
            v-for="ticket in tickets"
            :key="ticket.id"
          />
        </template>
        <template v-else>
          <AgendaItem
            :ticket="ticket"
            v-for="ticket in tickets"
            :key="ticket.id"
          />
        </template>
      </div>
      <!-- Show CheckoutComponent when showCheckoutModal is true -->
      <CheckoutComponent v-if="showCheckoutModal" @cancel="cancelCheckout" />
    </div>
    <div class="right-section">
      <div class="invoice">
        <div class="cart-summary" v-if="tickets.length > 0">
          <div class="total-items">
            <p class="label">{{ tickets.length }} Items <span class="value"></span></p>
          </div>
          <div class="subtotal">
            <p class="label">Subtotal: <span class="value">€{{ subtotal }}</span></p>
          </div>
          <hr class="separator">
          <div class="ticket-list">
            <div v-for="ticket in tickets" :key="ticket.id">
              <p>{{ ticket.eventName }} €{{ ticket.price }}</p>
            </div>
          </div>
          <div class="total-tax">
            <p class="label">Total Tax (9%): <span class="value">€{{ tax }}</span></p>
          </div>
          <hr class="separator">
          <div class="final-price">
            <p class="label">Final price (incl. Tax): <span class="value">€{{ finalPrice }}</span></p>
          </div>
        </div>
        <div v-else>
          <p>No items in the cart.</p>
        </div>
        <!-- Continue to Checkout button -->
        <button class="checkout-button" @click="showCheckoutModal = true" v-if="tickets.length > 0">Continue to Checkout</button>
        <!-- Checkout Modal -->
        <!-- Removed checkout modal content from here -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useTicketsStore } from '@/stores/tickets.js'; // Adjust the path as per your project structure
import TicketComponent from '../../components/ticket/TicketComponent.vue';
import AgendaItem from '@/components/agendaItem/AgendaItem.vue';
import CheckoutComponent from '@/components/checkout/CheckoutComponent.vue';

export default {
  components: {
    TicketComponent,
    AgendaItem,
    CheckoutComponent,
  },
  setup() {
    const ticketsStore = useTicketsStore();

    const tickets = computed(() => ticketsStore.tickets);
    const subtotal = computed(() => tickets.value.reduce((total, ticket) => total + ticket.price * ticket.ticket_amount, 0));
    const tax = computed(() => (subtotal.value * 0.09).toFixed(2));
    const finalPrice = computed(() => (parseFloat(subtotal.value) + parseFloat(tax.value)).toFixed(2));

    const toggleView = (view) => {
      ticketsStore.toggleView(view);
    };

    const cancelCheckout = () => {
      ticketsStore.cancelCheckout();
    };

    return {
      tickets,
      subtotal,
      tax,
      finalPrice,
      toggleView,
      cancelCheckout,
      isAgendaView: ticketsStore.isAgendaView,
      showCheckoutModal: ticketsStore.showCheckoutModal,
    };
  },
};
</script>


<style scoped>
/* Add your SCSS styles here */

.shopping-cart {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%; /* Set width to 100% */
}

.left-section {
  flex: 2; /* Set to take up 2/3 of the available width */
  margin-left: 10px; /* Add some space between sections */
}

.right-section {
  flex: 1; /* Set to take up 1/3 of the available width */
  margin-right: 10px; /* Add some space between sections */
}

.invoice {
  border: 2px solid white; /* Add white border */
  border-radius: 10px; /* Rounded borders */
  padding: 10px;
  width: calc(25% - 20px); /* Set a smaller fixed width for the invoice */
  height: 300px; /* Set a longer height for the invoice */
  position: absolute; /* Position the invoice absolutely */
  top: 100px; /* Set distance from the top */
  right: 20px; /* Set distance from the right */
}

.cart-summary {
  text-align: left;
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
}

.value {
  margin-left: 10px; /* Add space between label and value */
}

.cart-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 20px;
  width: 100%; /* Set width to 100% */
}

.cart-items.agenda-view {
  flex-direction: column;
}

.cart-items .ticket-item {
  width: calc(50% - 10px); /* Adjust width to 50% minus the margin between items */
  margin-right: 10px; /* Add some space between items */
  margin-bottom: 10px; /* Add some space between rows */
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
  margin-bottom: 5px;
}

.value {
  text-align: right;
  margin-left: 10px; /* Add space between label and value */
}

.button-container {
  display: flex;
  flex-direction: column; /* Adjust to column layout */
  align-items: flex-start; /* Align buttons to the left */
}

.checkout-button {
  background-color: #562799; /* Purple color */
  color: white;
  border: none;
  padding: 15px 40px; /* Larger padding */
  border-radius: 5px;
  cursor: pointer;
  margin: auto; /* Center horizontally */
  display: block; /* Make it a block-level element */
  position: absolute; /* Position it absolutely */
  bottom: 20px; /* Set distance from the bottom */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Center horizontally */
  font-size: 16px; /* Increase font size */
}


.separator {
  border-top: 1px solid #562799; /* Purple color */
  margin: 10px 0;
}

</style>