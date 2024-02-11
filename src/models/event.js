const events = ['jazz', 'history', 'music'];


const validate = (event) => {
    if (events.includes(event)) return true;
    console.error('Invalid event');
    return false;
}

export class Event {
    constructor(eventName, location, startDate, endDate, price, ticketsAvailable, event) {
        if (typeof eventName !== 'string') throw new Error('Invalid eventName');
        if (typeof location !== 'string') throw new Error('Invalid location');
        if (typeof startDate !== 'string') throw new Error('Invalid startDate');
        if (typeof endDate !== 'string') throw new Error('Invalid endDate');
        if (typeof price !== 'number') throw new Error('Invalid price');
        if (typeof ticketsAvailable !== 'number') throw new Error('Invalid ticketsAvailable');
        if (typeof event !== 'string') throw new Error('Invalid event');


        this.eventName = eventName;
        this.location = location
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.ticketsAvailable = ticketsAvailable;
        if (validate(event)) {
            this.event = event;
        }
    }
}