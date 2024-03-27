const events = ['jazz', 'history', 'dance' , 'yummy'];
const eventIdToEvent = (id) => {
    switch (id) {
        case 1:
            return 'jazz';
        case 2:
            return 'history';
        case 3:
            return 'dance';
        case 4:
            return 'yummy';
        default:
            return 'Invalid event';
    }
}

const dateConverter = (date) => {
    if (typeof date === 'string') {
        return new Date(date);
    }
    return date;
}

/**
 * Event class
 * @param {number} id
 * @param {string} eventName
 * @param {string} location
 * @param {string} startDate
 * @param {string} endDate
 * @param {number} price
 * @param {number} ticketsAvailable
 * @param {string} event
 * @returns Event
 * @constructor
 * @author @KoenMW
 */
export class Event {
    constructor(id, eventName, location, startDate, endDate, price, ticketsAvailable, event) {
        this.id = id;
        this.eventName = eventName;
        this.location = location
        this.startTime = dateConverter(startDate);
        this.endTime = dateConverter(endDate);
        this.price = price;

        this.ticket_amount = ticketsAvailable;
        events.includes(typeof event != 'number') ? this.event = event.toLowerCase() : this.event = eventIdToEvent(Number(event));
    }
}