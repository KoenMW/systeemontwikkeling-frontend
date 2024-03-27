import { defineStore } from 'pinia';
import axios from '../axios-auth';

/**
 * Tickets store
 * @author @KoenMW
 */
export const useTicketsStore = defineStore('tickets',  {
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
            return response.data; 
          })
        );

        this.tickets = ticketDetails.flat();
      } catch (error) {
        console.error('Error fetching ticket details:', error);
      }
    },
    addTicket(ticketId) {
      this.tickets.push(ticketId);
      localStorage.setItem('tickets', JSON.stringify(this.tickets));
    },
    removeTicket(ticketId) {
      this.tickets = this.tickets.filter((ticket) => ticket !== ticketId);
      localStorage.setItem('tickets', JSON.stringify(this.tickets));
    },
    getTicketById(ticketId) {
      return this.tickets.filter((ticket) => ticket === ticketId).length || 0;
    },
  },
});