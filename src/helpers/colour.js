const body = document.querySelector('body');

export const changeBackgroundColour = (colour) => {
    const header = document.querySelector('header');
    const newColour = colours.find(c => c.name === colour) ?? colours[0];
    body.style.backgroundColor = newColour.hex;
    newColour.textColour ? body.style.color = newColour.textColour : body.style.color = '#ffffff';
    header.style.backgroundColor = newColour.hex;
    
}

export const colours = [
    { name: 'default', hex: '#011B2C' },
    { name: 'jazz', hex: '#1F1C1B' },
    { name: 'yummy', hex: '#445A59' },
    { name: 'history', hex: '#EAE2D1', textColour: '#000000'},
    { name: 'dance', hex: '#0000FF' }, // @NickS721: verander naar de kleur die je wilt gebruiken
    { name: 'transparent', hex: 'transparent' },
]