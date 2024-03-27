import { defineStore } from 'pinia';
import axios from '../axios-auth';

export const useTicketsStore = defineStore('tickets', {
   state: () => ({
        tickets: JSON.parse(localStorage.getItem('tickets')) ?? []
    }),
  actions: {
    async fetchTicketDetails(ticketIds) {
      try {
        const uniqueTicketIds = [...new Set(ticketIds)];

        const ticketDetails = await Promise.all(
          uniqueTicketIds.map(async (ticketId) => {
            const response = await axios.get(`/event/${ticketId}`);
            return response.data; // Assuming the response contains ticket details
          })
        );

        // Flatten the array of ticket details and store them
        this.tickets = ticketDetails.flat();
      } catch (error) {
        console.error('Error fetching ticket details:', error);
      }
    },
    addTicket(ticketId) {
      // Add the ticket ID to the tickets array in the store
      this.tickets.push(ticketId);
      localStorage.setItem('tickets', JSON.stringify(this.tickets));
    },
    removeTicket(ticketId) {
      // Remove the ticket with the given ID from the tickets array in the store
      this.tickets = this.tickets.filter((ticket) => ticket !== ticketId);
      // Update the localStorage with the updated tickets array
      localStorage.setItem('tickets', JSON.stringify(this.tickets));
    },
    getTicketById(ticketId) {
      // Count the occurrences of the ticket with the given ID in the tickets array 
      return this.tickets.filter((ticket) => ticket === ticketId).length || 0;
    },
  },
});
