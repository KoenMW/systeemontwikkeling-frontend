<template>
  <div class="shopping-cart-item" :style="{ backgroundImage: 'url(' + agendaItem.image + ')' }">
    <div class="overlay">
      <div class="content">
        <div class="top-section">
          <div class="date-time">{{ formattedDate(agendaItem.startTime) }}</div>
          <div class="item-name">{{ agendaItem.eventName }}</div>
        </div>
        <div class="middle-section">
          <div class="price">Price: €{{ agendaItem.price }}</div>
          <!-- Wrap checkbox and label in a flex container -->
          <div class="checkbox-container">
            <input type="checkbox" id="payNow" v-model="payNow" />
            <label for="payNow">Pay Now</label>
          </div>
        </div>
        <div class="bottom-section">
          <button @click="removeTicket" class="subtract">-</button>
          <div class="ticket-count">{{ tickets }}</div> <!-- Wrapped the number in a div -->
          <button @click="addTicket" class="add">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTicketsStore } from '@/stores/tickets.js'; // Adjust the path as per your project structure
import { formattedDate } from '@/helpers/formatDate';
import { defineProps } from 'vue';

const props = defineProps({
  agendaItem: {
    type: Object,
    required: true
  }
});

console.log(props.agendaItem);
const ticketsStore = useTicketsStore(); // Initialize the tickets store

const tickets = ref(ticketsStore.getTicketsById(props.agendaItem.id)); // Use store method to get tickets count
const payNow = ref(false);

const addTicket = () => {
  if (tickets.value < props.agendaItem.ticket_amount) {
    ticketsStore.addTicket(props.agendaItem); // Add ticket to store
    tickets.value++; // Increment local ticket count
  }
};

const removeTicket = () => {
  if (tickets.value > 0) {
    ticketsStore.removeTicket(props.agendaItem); // Remove ticket from store
    tickets.value--; // Decrement local ticket count
  }
};
</script>

<style scoped>
/* Import variables from variables.scss */
@import '../../assets/variables.scss';

/* Apply styles to buttons */
.subtract,
.add {
  border-radius: 100em;
  background-color: transparent;
  height: 3em;
  width: 3em;
  font-size: 1em;
  border: white 2px solid;
  cursor: pointer;
  margin-right: 1em; /* Increase space between buttons */
  display: flex; /* Use flexbox for alignment */
  justify-content: center; /* Center text horizontally */
  align-items: center; /* Center text vertically */
  margin-top: 1em; /* Add margin to lower the buttons */
  align-self: flex-end; /* Move buttons to the bottom */
}

.subtract {
  color: white;
}

.add {
  border-color: black;
  color: black;
}

/* Style for the number div */
.ticket-count {
  height: 3em; /* Set the same height as the buttons */
  width: 3em; /* Set the same width as the buttons */
  display: flex; /* Use flexbox for alignment */
  justify-content: center; /* Center text horizontally */
  align-items: center; /* Center text vertically */
}

.shopping-cart-item {
  width: 30%; /* Adjust width to fit three cards horizontally */
  margin-right: 3%; /* Add margin between cards */
  margin-bottom: 20px; /* Add margin for spacing */
  height: 200px; /* Adjust height as needed */
  position: relative;
  border-radius: 10px; /* Adjust border-radius for rectangular shape */
  background-size: cover;
  background-position: center;
  border: 2px solid white; /* Add white border */
}

.overlay {
  position: relative;
  padding: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.top-section {
  display: flex;
  justify-content: space-between;
}

.checkbox-container {
  display: flex;
  align-items: center; /* Align items vertically in the center */
}

.checkbox-container label {
  margin-left: 1em; /* Add some space between the checkbox and the label */
}

.date-time {
  font-weight: bold;
}

.middle-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  text-align: left;
  margin-top: 1em; /* Add margin to lower the price */
}

.pay-now {
  background-color: #562799; /* Purple color */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1em; /* Add margin to lower the pay now button */
}

.bottom-section {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
