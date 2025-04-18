const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 200;

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    });
}

function updateStars() {
    stars.forEach(star => {
        star.x -= star.speed;
        if (star.x < 0) {
            star.x = canvas.width;
        }
    });
}

function animate() {
    drawStars();
    updateStars();
    requestAnimationFrame(animate);
}

animate();
