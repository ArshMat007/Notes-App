const colors = [
    '#f28b82', // red
    '#fbbc04', // orange
    '#fff475', // yellow
    '#a7ffeb', // teal
    '#cbf0f8', // blue
    '#aecbfa', // dark blue
    'rgba(215, 174, 251, 1)', 
    '#e6c9a8', // brown
    '#e8eaed', // gray
];

export const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};
