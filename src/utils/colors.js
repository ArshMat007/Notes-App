const colors = [
    'rgba(117, 163, 237, 0.25)',  // bright cool blue
    'rgba(144, 238, 144, 0.25)',  // soft lime green
    'rgba(255, 202, 40, 0.25)',   // warm amber yellow
    'rgba(255, 128, 171, 0.25)',  // vibrant pink
    'rgba(179, 136, 255, 0.25)',  // violet-purple
    'rgba(255, 167, 38, 0.25)',   // rich orange
    'rgba(77, 208, 225, 0.25)',   // cyan blue
    'rgba(244, 143, 177, 0.25)'   // soft rose
];



export const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};
