// Simple confetti implementation
const confetti = () => {
  const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#06B6D4'];
  
  const createConfetti = () => {
    const container = document.getElementById('confetti-canvas');
    if (!container) return;
    
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      const size = Math.random() * 10 + 5;
      
      confetti.style.position = 'absolute';
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.opacity = '0.8';
      confetti.style.zIndex = '1000';
      
      // Starting position
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = '-10px';
      
      // Add confetti to container
      container.appendChild(confetti);
      
      // Animate the confetti
      const animation = confetti.animate(
        [
          { 
            transform: `translate(${Math.random() * 100 - 50}px, 0px) rotate(0deg)`,
            opacity: 0.8 
          },
          { 
            transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight}px) rotate(${Math.random() * 360}deg)`,
            opacity: 0 
          }
        ],
        {
          duration: Math.random() * 2000 + 2000,
          easing: 'cubic-bezier(0,.99,.44,.99)'
        }
      );
      
      // Remove confetti after animation
      animation.onfinish = () => {
        if (container && confetti.parentNode === container) {
          container.removeChild(confetti);
        }
      };
    }
  };
  
  // Create confetti with a slight delay
  setTimeout(createConfetti, 200);
};

export default confetti;