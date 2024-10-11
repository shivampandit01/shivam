// Particle Animation Background
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: 'rgba(255, 255, 255, 0.7)',
        velocityX: (Math.random() - 0.5) * 2,
        velocityY: (Math.random() - 0.5) * 2,
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        // Bounce particles off the walls
        if (particle.x < 0 || particle.x > canvas.width) particle.velocityX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.velocityY *= -1;
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();

const videos = [
    { id: "jMC37hP2PRA", title: "Coffe Shop" },
    { id: "2Mgm0uIS9cI", title: "Gotham" },
    { id: "DInfaA1SdH4", title: "Houses" },
    { id: "nTwD-XscPmU", title: "Weater Forcast" },
    { id: "phdcUBrqpWw", title: "Satellite" },
    { id: "lLUWxrwUx6c", title: "Volcanic Environment" },
    { id: "5IFnQuZnClY", title: "Rocks VFX" },
    { id: "X8DCpUG6atE", title: "Astroids" },
    { id: "8yMxNuvIYxM", title: "Mini Solar System (Motion Graphics)" },
    { id: "t0HNhI8eNsA", title: "Planet Axio 11" },
    { id: "NPjgwcAI2NQ", title: "Netflix Logo animation" },
    { id: "mgLYei4-Q30", title: "Fire Dude" },
    { id: "8KzZN1_mnw4", title: "Zoetrope" },
    { id: "kHZFULrdV1k", title: "Abstract Animation" },
    { id: "AlQFOrY-LsU", title: "Logo Animation" },
    { id: "wnGRCWJhNr0", title: "Spaceship VFX" },
    // Add more videos here...
];

const videoGrid = document.querySelector('.video-grid');

// Generate the video thumbnails and titles dynamically
videos.forEach(video => {
    const videoThumbnail = document.createElement('div');
    videoThumbnail.classList.add('video-thumbnail');
    videoThumbnail.innerHTML = `
        <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="${video.title}">
        <p>${video.title}</p>
    `;
    videoGrid.appendChild(videoThumbnail);

    // Click event to play the video in a modal
    videoThumbnail.addEventListener('click', () => {
        document.getElementById('youtube-iframe').src = `https://www.youtube.com/embed/${video.id}?autoplay=1`;
        document.getElementById('video-modal').style.display = 'block';
    });
});

// Modal close functionality
const modal = document.getElementById('video-modal');
const closeModal = document.getElementsByClassName('close')[0];

closeModal.onclick = function() {
    modal.style.display = 'none';
    document.getElementById('youtube-iframe').src = ""; // Stop the video
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.getElementById('youtube-iframe').src = ""; // Stop the video
    }
}
