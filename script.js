// DOM Elements
const introScreen = document.getElementById('intro');
const celebrationScreen = document.getElementById('celebration');
const openGiftBtn = document.getElementById('openGiftBtn');

// Interaction
openGiftBtn.addEventListener('click', () => {
    // 1. Trigger Confetti
    triggerMegaConfetti();
    
    // 2. Play Sound (Optional, browser policies might block auto-audio, keeping visual for now)
    
    // 3. Transition Screens
    introScreen.classList.add('hidden');
    introScreen.classList.remove('active');
    
    setTimeout(() => {
        introScreen.style.display = 'none';
        celebrationScreen.style.display = 'block'; // Make it visible in DOM
        // Small delay to allow CSS transition to catch the display:block
        requestAnimationFrame(() => {
            celebrationScreen.classList.add('visible');
        });
        
        // Retrigger confetti when main screen loads
        setTimeout(triggerMegaConfetti, 500);
    }, 800);
});

// Confetti Effect
function triggerMegaConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.9, 1.0) } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.9, 1.0) } }));
    }, 250);
    
    // Big explosion at start
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff2a6d', '#05d9e8', '#ffd700']
    });
}

// 3D Tilt Effect for Cards
const cards = document.querySelectorAll('.tilt-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});
