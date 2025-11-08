// Bouton redirection
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    window.location.href = 'page_ia.html';
});

// Bulles interactives
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Bubble {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.radius = 10 + Math.random() * 20;
        this.speed = 1 + Math.random() * 2;
        this.color = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.5})`;
    }

    update() {
        this.y -= this.speed;
        if (this.y + this.radius < 0) this.reset();
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    isClicked(mx, my) {
        const dx = mx - this.x;
        const dy = my - this.y;
        return dx * dx + dy * dy <= this.radius * this.radius;
    }
}

const bubbles = Array.from({ length: 50 }, () => new Bubble());

// Animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
    });
    requestAnimationFrame(animate);
}

animate();

// Éclater les bulles au clic
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    bubbles.forEach(bubble => {
        if (bubble.isClicked(mx, my)) bubble.reset();
    });
});

// Adapter le canvas à la taille de la fenêtre
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
