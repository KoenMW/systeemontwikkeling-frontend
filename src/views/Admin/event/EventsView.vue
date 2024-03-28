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
import axios from '../../../axios-auth.js'

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
      this.$router.push({ name: 'addEvent' })
    },
    editEvent(eventId) {
      this.$router.push({ name: 'editEvent', params: { eventId } });
    },
    async deleteEvent(eventId) {
      if (confirm('Are you sure you want to delete this event? This cannot be undone.')) {
        try {
          await axios.delete(`/events/delete/${eventId}`);
          alert('Event deleted successfully.');
          this.fetchEvents(); // Refresh the list of events
        } catch (error) {
          console.error('Failed to delete event:', error);
          alert('There was a problem deleting the event. Please try again later.');
        }
      }
    }
  }
}
</script>
<style>
@import '../user/users.scss';
</style>
