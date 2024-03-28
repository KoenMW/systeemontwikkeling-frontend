<template>
  <div v-if="event" class="event">
    <h2>Edit Event</h2>
    <form @submit.prevent="updateEvent">
      <div class="form-group">
        <label for="title">Title:</label>
        <input id="title" v-model="event.title" required>
      </div>

      <div class="form-group">
        <label for="startTime">Start Time:</label>
        <input type="datetime-local" id="startTime" v-model="event.startTime" required>
      </div>

      <div class="form-group">
        <label for="endTime">End Time:</label>
        <input type="datetime-local" id="endTime" v-model="event.endTime" required>
      </div>

      <div class="form-group">
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="event.price" required min="0">
      </div>

      <div class="form-group">
        <label for="location">Location:</label>
        <input id="location" v-model="event.location" required>
      </div>

      <div class="form-group">
        <label for="ticket_amount">Ticket Amount:</label>
        <input type="number" id="ticket_amount" v-model="event.ticket_amount" required min="0">
      </div>

      <button type="submit" class="btn">Update Event</button>
    </form>
  </div>
  <div v-else>Loading event data...</div>
</template>


<script>
import axios from '../../../axios-auth.js';

export default {
  data() {
    return {
      event: {
        title: '',
        startTime: '',
        endTime: '',
        price: 0,
        location: '',
        ticket_amount: 0,
      },
    };
  },
  async mounted() {
    const eventId = this.$route.params.eventId;
    console.log("Editing event ID:", eventId); // Debugging line

    try {
      const response = await axios.get(`/events/id/${eventId}`);
      console.log("Event details fetched:", response.data); // Debugging line
      this.event = response.data;
    } catch (error) {
      console.error('Failed to fetch event details:', error);
    }
  },
  methods: {
    async updateEvent() {
      try {
        await axios.put(`/events/update/${this.event.id}`, this.event);
        this.$router.go(-1);
      } catch (error) {
        console.error('Failed to update event:', error);
      }
    },
  },
};
</script>
<style>
@import 'event.scss';
</style>