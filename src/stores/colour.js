import { defineStore } from "pinia";
import { ref } from "vue";

export const useColourStore = defineStore('colour', () => {
    const colour = ref('home');
    const changeColour = (newColour) => {
        colour.value = newColour;
    }
    return {
        colour,
        changeColour
    };
});