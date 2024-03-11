const eventIdToEvent = (id) => {
    switch (id) {
        case 1:
            return 'jazz';
        case 2:
            return 'history';
        case 3:
            return 'music';
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

export class Event {
    constructor(id, eventName, location, startDate, endDate, price, ticketsAvailable, event) {
        this.id = id;
        this.eventName = eventName;
        this.location = location
        this.startTime = dateConverter(startDate);
        this.endTime = dateConverter(endDate);
        this.price = price;

        this.ticket_amount = ticketsAvailable;
        
        this.event = eventIdToEvent(Number(event));
    }
}