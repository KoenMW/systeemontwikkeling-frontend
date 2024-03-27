/**
 * format date to string with format HH:MM
 * @param {*} date 
 * @returns string
 * @author @KoenMW
 */
export const formattedDate = (date) => {
    if (!date || typeof date.getHours !== 'function' || typeof date.getMinutes !== 'function') {
        return ''; // Return an empty string or handle the undefined/null case as appropriate
    }
    
    // Extract hours and minutes from the date object
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
};
