const colors = [
  'rgba(219, 234, 254, 0.3)', // very light blue
  'rgba(191, 219, 254, 0.3)', // light blue
  'rgba(147, 197, 253, 0.3)', // soft medium blue
  'rgba(96, 165, 250, 0.3)',  // medium blue
  'rgba(59, 130, 246, 0.3)',  // bright blue
  'rgba(37, 99, 235, 0.3)',   // deep blue
  'rgba(29, 78, 216, 0.3)'    // dark intense blue
];



export const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};
