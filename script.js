const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('loveButton');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const colors = ['#ffccd5', '#ffb3c1', '#ff8fa3', '#ff4d6d', '#fff0f3'];

class Particle {
    constructor(isHeart = false) {
        this.reset(isHeart);
    }

    reset(isHeart) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 15 + 5;
        this.speed = Math.random() * 2 + 1;
        this.weight = Math.random() * 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? -1 : 1;
        this.type = isHeart ? 'heart' : 'flower';
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillStyle = this.color;

        if (this.type === 'heart') {
            // Drawing a simple heart shape
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, this.size/3, 0, this.size);
            ctx.bezierCurveTo(this.size, this.size/3, this.size/2, -this.size/2, 0, 0);
            ctx.fill();
        } else {
            // Drawing a simple flower shape
            for (let i = 0; i < 5; i++) {
                ctx.rotate(72 * Math.PI / 180);
                ctx.beginPath();
                ctx.ellipse(0, this.size/2, this.size/4, this.size/2, 0, 0, 2 * Math.PI);
                ctx.fill();
            }
            ctx.beginPath();
            ctx.arc(0, 0, this.size/4, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
        }
        ctx.restore();
    }

    update() {
        this.y += this.speed;
        this.angle += this.spin;
        if (this.y > canvas.height) {
            this.reset();
        }
    }
}

function init() {
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

// Add more particles when button is clicked
btn.addEventListener('click', () => {
    for(let i = 0; i < 20; i++) {
        particles.push(new Particle(true)); // Add hearts
    }
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
animate();

document.getElementById('loveButton').addEventListener('click', function() {
    window.location.href = 'page1.html';
});