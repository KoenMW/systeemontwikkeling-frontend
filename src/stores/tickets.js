import { defineStore } from "pinia";
import { ref } from "vue";

const getTicketsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('tickets') || '[]')._value || [];
}

export const useTicketsStore = defineStore('tickets', () => {
    const tickets = ref(getTicketsFromLocalStorage());

    const addTicket = (ticket) => {
        tickets.value.push(ticket);
        localStorage.setItem('tickets', JSON.stringify(tickets));
    }

    const removeTicket = (ticket) => {
        const index = tickets.value.findIndex(t => t.id === ticket.id);
        tickets.value.splice(index, 1);
        localStorage.setItem('tickets', JSON.stringify(tickets));
    }

    const getTicketsById = (id) => {
        return tickets.value.filter(t => t.id === id).length;
    }
    
    return {
        tickets,
        addTicket,
        removeTicket,
        getTicketsById
    };

});