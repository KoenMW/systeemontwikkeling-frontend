<template>
  <div class="management">
    <h1>{{ eventName }} Events</h1>
    <button @click="addEvent">Add Event</button>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Location</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Price</th>
          <th>Ticket Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id">
          <td>{{ event.title }}</td>
          <td>{{ event.location }}</td>
          <td>{{ new Date(event.startTime).toLocaleDateString() }}</td>
          <td>{{ new Date(event.endTime).toLocaleDateString() }}</td>
          <td>{{ event.price }}</td>
          <td>{{ event.ticket_amount }}</td>
          <td>
            <button @click="editEvent(event.id)">Edit</button>
            <button @click="deleteEvent(event.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from '../../axios-auth.js'

export default {
  props: ['eventType'],
  data() {
    return {
      events: []
    }
  },
  computed: {
    eventName() {
      const eventTypeNames = {
        1: 'Jazz',
        2: 'History',
        3: 'Yummy',
        4: 'Dance'
      }
      return eventTypeNames[this.eventType] || 'Unknown'
    }
  },
  watch: {
    eventType: {
      immediate: true,
      handler() {
        this.fetchEvents()
      }
    }
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await axios.get(`/events/${this.eventType}`)
        this.events = response.data
      } catch (error) {
        console.error('Failed to fetch events:', error)
      }
    },
    addEvent() {
      // Logic to add an event
      // This might involve navigating to a form view or opening a modal
    },
    editEvent(eventId) {
      // Logic to edit an event
      // This could navigate to an edit form with the eventId as a parameter
    },
    async deleteEvent(eventId) {
      // Logic to delete an event
      try {
        await axios.delete(`/events/delete/${eventId}`)
        // Refresh the list of events after deletion
        this.fetchEvents()
      } catch (error) {
        console.error('Failed to delete event:', error)
      }
    }
  }
}
</script>
<style>
@import 'users.scss';
</style>
