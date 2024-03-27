<template>
  <div class="shopping-cart-item">
    <div class="overlay">
      <div class="content">
        <div class="top-section">
          <div class="date-time">{{ formattedDateTime }}</div>
          <div class="item-name">{{ agendaItem.title }}</div>
        </div>
        <div class="middle-section">
          <div class="price">Price: €{{ agendaItem.price }}</div>
          <div class="checkbox-container">
            <input type="checkbox" id="payNow" v-model="payNow" />
            <label for="payNow">Pay Now</label>
          </div>
        </div>
        <div class="bottom-section">
          <button @click="removeTicket" class="subtract">-</button>
          <div class="ticket-count">{{ ticketCount }}</div>
          <button @click="addTicket" class="add">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTicketsStore } from '../../stores/tickets'
import { computed , ref } from 'vue'
import { formattedDate } from '@/helpers/formatDate'

export default {
  props: {
    agendaItem: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ticketStore = useTicketsStore()
    const payNow = ref(false)
    const ticketCount = computed(() => {
      const count = ticketStore.getTicketById(props.agendaItem.id)
      return count > 0 ? count : 1
    })

    const addTicket = () => {
      if (ticketCount.value < props.agendaItem.ticket_amount) {
        ticketStore.addTicket(props.agendaItem.id)
      }
    }

    const removeTicket = () => {
      if (ticketCount.value > 0) {
        ticketStore.removeTicket(props.agendaItem.id)
      }
    }

    const formattedDateTime = computed(() => {
      const startTime = props.agendaItem.startTime
        ? formattedDate(new Date(props.agendaItem.startTime))
        : ''
      const endTime = props.agendaItem.endTime
        ? formattedDate(new Date(props.agendaItem.endTime))
        : ''
      return `${startTime} - ${endTime}`
    })

    return {
      addTicket,
      removeTicket,
      formattedDateTime,
      ticketCount,
      payNow
    }
  }
}
</script>



<style scoped>
.subtract,
.add {
  border-radius: 100em;
  background-color: transparent;
  height: 3em;
  width: 3em;
  font-size: 1em;
  border: white 2px solid;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1em;
}

.subtract {
  color: white;
}

.add {
  border-color: black;
  color: black;
}

.ticket-count {
  height: 3em;
  width: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shopping-cart-item {
  width: 30%;
  margin-right: 3%;
  margin-bottom: 20px;
  height: 200px;
  position: relative;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  border: 2px solid white;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.top-section,
.middle-section,
.bottom-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-container {
  display: flex;
  align-items: center;
}

.checkbox-container label {
  margin-left: 1em;
}

.date-time {
  font-weight: bold;
}

.price {
  text-align: left;
}

.item-name {
  font-weight: bold; 
}
</style>