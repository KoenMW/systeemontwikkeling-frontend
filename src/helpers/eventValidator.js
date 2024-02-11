const events = ['jazz', 'history', 'music'];


export const validate = (event) => {
    if (events.includes(event)) return true;
    console.error('Invalid event');
    return false;
}