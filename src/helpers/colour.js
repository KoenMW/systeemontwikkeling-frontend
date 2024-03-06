const body = document.querySelector('body');
//const header = document.querySelector('header'); // @NickS721: verander naar de juiste selector van je header

export const changeBackgroundColour = (colour) => {
    const newColour = colours.find(c => c.name === colour).hex ?? colours[0].hex;
    body.style.backgroundColor = newColour;
    //header.style.backgroundColor = newColour; // @NickS721: als je de header ook wilt veranderen, uncomment deze regel
}

export const colours = [
    { name: 'default', hex: '#011B2C' },
    { name: 'jazz', hex: '#1F1C1B' },
    { name: 'yummy', hex: '#445A59' },
    { name: 'history', hex: '#EAE2D1' },
    { name: 'dance', hex: '#0000FF' }, // @NickS721: verander naar de kleur die je wilt gebruiken
    { name: 'transparent', hex: 'transparent' },
]