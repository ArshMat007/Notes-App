const colors = [
    'rgba(224, 231, 255, 0.15)',  // light indigo
    'rgba(219, 234, 254, 0.15)',  // soft blue
    'rgba(209, 250, 229, 0.15)',  // mint green
    'rgba(254, 243, 199, 0.15)',  // warm light yellow
    'rgba(255, 228, 230, 0.15)',  // soft pink
    'rgba(221, 214, 254, 0.15)',  // lavender
    'rgba(255, 237, 213, 0.15)',  // peach
    'rgba(243, 232, 255, 0.15)'   // lilac
];


export const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};
