<template>
    <div class="event">
        <h2>Add New Event</h2>
        <form @submit.prevent="submitEvent">
            <div class="form-group">
                <label for="title">Title:</label>
                <input id="title" v-model="newEvent.title" required>
            </div>

            <div class="form-group">
                <label for="startTime">Start Time:</label>
                <input type="datetime-local" id="startTime" v-model="newEvent.startTime" required>
            </div>

            <div class="form-group">
                <label for="endTime">End Time:</label>
                <input type="datetime-local" id="endTime" v-model="newEvent.endTime" required>
            </div>

            <div class="form-group">
                <label for="price">Price:</label>
                <input type="number" id="price" v-model="newEvent.price" required min="0">
            </div>

            <div class="form-group">
                <label for="location">Location:</label>
                <input id="location" v-model="newEvent.location" required>
            </div>

            <div class="form-group">
                <label for="ticketAmount">Ticket Amount:</label>
                <input type="number" id="ticketAmount" v-model="newEvent.ticketAmount" required min="0">
            </div>
            <div class="form-group">
                <label for="eventType">Event Type:</label>
                <select id="eventType" v-model="newEvent.eventType" required>
                    <option value="1">Jazz</option>
                    <option value="2">History</option>
                    <option value="3">Yummy</option>
                    <option value="4">Dance</option>
                </select>
            </div>

            <div class="form-group">
                <label for="pageId">Page ID (same as Event Type):</label>
                <select id="pageId" v-model="newEvent.pageId" required>
                    <option value="1">Jazz</option>
                    <option value="2">History</option>
                    <option value="3">Yummy</option>
                    <option value="4">Dance</option>
                </select>
            </div>

            <button type="submit" class="btn">Add Event</button>
        </form>
    </div>
</template>

<script>
import axios from '../../../axios-auth.js';

export default {
  data() {
    return {
      newEvent: {
        title: '',
        startTime: '',
        endTime: '',
        price: 0,
        location: '',
        ticketAmount: 0,
        eventType: '1', 
        pageId: '1',
      },
    };
  },
  methods: {
    async submitEvent() {
  const eventData = {
    title: this.newEvent.title,
    startTime: this.newEvent.startTime,
    endTime: this.newEvent.endTime,
    price: parseFloat(this.newEvent.price), // Ensure it's a float
    location: this.newEvent.location,
    ticket_amount: parseInt(this.newEvent.ticketAmount, 10), // Ensure it's an integer
    page_id: parseInt(this.newEvent.pageId, 10), // Ensure it's an integer
    detail_page_id: null, // Explicitly set as null
    eventType: parseInt(this.newEvent.eventType, 10) // Ensure it's an integer
  };
  
  try {
    const response = await axios.post('/events', eventData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Success:", response);
    alert('Event added successfully');
    this.$router.go(-1);
  } catch (error) {
    console.error('Failed to add the event:', error);
    alert('Failed to add the event');
  }
    }}
}
    
</script>

<style>
@import 'event.scss';
</style>
