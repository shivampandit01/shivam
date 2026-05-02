// 1. Cinematic Preloader
let ytPlayerReady = false;
let ytPlayer;

function onYouTubeIframeAPIReady() { ytPlayerReady = true; }

window.addEventListener('load', () => {
    let progress = 0;
    const progressEl = document.querySelector('.progress');
    const counterEl = document.querySelector('.counter');
    const preloader = document.querySelector('.preloader');
    const mainWrapper = document.querySelector('.main-wrapper');

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        if (progress > 100) progress = 100;
        
        progressEl.style.width = `${progress}%`;
        counterEl.innerText = `${progress}%`;

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                gsap.to(preloader, { opacity: 0, duration: 1, onComplete: () => {
                    preloader.style.display = 'none';
                    gsap.to(mainWrapper, { opacity: 1, duration: 0.5 });
                    gsap.from(".reveal-text h1", { y: 150, opacity: 0, duration: 1.5, stagger: 0.2, ease: "power4.out" });
                }});
            }, 500);
        }
    }, 100);
});

// 2. Hacker Text Scramble
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
document.querySelectorAll('.scramble-text, .scramble-btn').forEach(el => {
    el.addEventListener('mouseover', event => {
        let iterations = 0;
        const targetText = event.target.dataset.value || event.target.innerText;
        clearInterval(el.interval);
        
        el.interval = setInterval(() => {
            event.target.innerText = targetText.split("")
                .map((letter, index) => {
                    if(index < iterations) return targetText[index];
                    return letters[Math.floor(Math.random() * letters.length)];
                }).join("");
            
            if(iterations >= targetText.length) clearInterval(el.interval);
            iterations += 1 / 3;
        }, 30);
    });
});

// 3. Lenis Smooth Scrolling
const lenis = new Lenis({ duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
let rawScrollVelocity = 0;
lenis.on('scroll', (e) => { rawScrollVelocity = e.velocity; });

function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
gsap.registerPlugin(ScrollTrigger);

// 4. Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`; cursorDot.style.top = `${mouseY}px`;
});

function animateCursor() {
    let dx = mouseX - outlineX; let dy = mouseY - outlineY;
    outlineX += dx * 0.2; outlineY += dy * 0.2;
    cursorOutline.style.left = `${outlineX}px`; cursorOutline.style.top = `${outlineY}px`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mouseover', (e) => {
    const isHoverable = e.target.closest('a') || e.target.closest('.video-thumbnail') || e.target.closest('.close-btn') || e.target.closest('.scramble-text');
    if(isHoverable) {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.borderColor = '#00ffcc';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    } else {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.borderColor = 'rgba(255,255,255,0.5)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    }
});

// 5. THREE.JS: Deep Space Warp Engine
const canvasContainer = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.0015);
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.z = 200;

const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
renderer.setClearColor(0x000000);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
canvasContainer.appendChild(renderer.domElement);

const starCount = 8000;
const starGeometry = new THREE.BufferGeometry();
const starPositions = new Float32Array(starCount * 3);
const starColors = new Float32Array(starCount * 3);
const color = new THREE.Color();

for(let i = 0; i < starCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 2000;
    starPositions[i+1] = (Math.random() - 0.5) * 2000;
    starPositions[i+2] = (Math.random() - 0.5) * 2000;
    
    // Multi-colored space effect
    const colorChoice = Math.random();
    if(colorChoice > 0.8) color.setHex(0xffffff); // White
    else if (colorChoice > 0.4) color.setHex(0x00ffcc); // Cyan
    else color.setHex(0x0055ff); // Deep Blue
    
    starColors[i] = color.r;
    starColors[i+1] = color.g;
    starColors[i+2] = color.b;
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

const starMaterial = new THREE.PointsMaterial({
    size: 1.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Warp Drive Mechanic
let isWarping = false;
let warpFactor = 0;

document.addEventListener('mousedown', (e) => {
    // Only warp if they aren't clicking a link or video card
    if(!e.target.closest('a') && !e.target.closest('.video-thumbnail') && !e.target.closest('.close-btn') && !e.target.closest('.modal-content')) {
        isWarping = true;
    }
});
document.addEventListener('mouseup', () => { isWarping = false; });

let targetCameraX = 0; let targetCameraY = 0;
const windowHalfX = window.innerWidth / 2; const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    targetCameraX = (event.clientX - windowHalfX) * 0.05;
    targetCameraY = (event.clientY - windowHalfY) * 0.05;
});

let smoothVelocity = 0;

function animate3D() {
    requestAnimationFrame(animate3D);

    camera.position.x += (targetCameraX - camera.position.x) * 0.05;
    camera.position.y += (-targetCameraY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    smoothVelocity += (Math.abs(rawScrollVelocity) - smoothVelocity) * 0.1;
    
    // Smoothly accelerate to Warp 30
    const targetWarp = isWarping ? 30 : 0;
    warpFactor += (targetWarp - warpFactor) * 0.05;
    
    const positions = starGeometry.attributes.position.array;
    const currentSpeed = 0.5 + (smoothVelocity * 0.15) + warpFactor;

    for(let i = 0; i < starCount * 3; i += 3) {
        positions[i+2] += currentSpeed; 
        if(positions[i+2] > 200) {
            positions[i+2] = -1500;
            positions[i] = (Math.random() - 0.5) * 2000;
            positions[i+1] = (Math.random() - 0.5) * 2000;
        }
    }
    
    // Stretch stars into light speed lines
    stars.scale.z = 1 + (smoothVelocity * 0.05) + (warpFactor * 0.8);
    starGeometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
}
animate3D();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 6. YouTube Data
const videos = [
    { id: "jMC37hP2PRA", title: "Coffe Shop" },
    { id: "2Mgm0uIS9cI", title: "Gotham" },
    { id: "DInfaA1SdH4", title: "Houses" },
    { id: "nTwD-XscPmU", title: "Weater Forcast" },
    { id: "phdcUBrqpWw", title: "Satellite" },
    { id: "lLUWxrwUx6c", title: "Volcanic Environment" },
    { id: "5IFnQuZnClY", title: "Rocks VFX" },
    { id: "X8DCpUG6atE", title: "Astroids" },
    { id: "8yMxNuvIYxM", title: "Mini Solar System" },
    { id: "t0HNhI8eNsA", title: "Planet Axio 11" },
    { id: "NPjgwcAI2NQ", title: "Netflix Logo" },
    { id: "mgLYei4-Q30", title: "Fire Dude" },
    { id: "8KzZN1_mnw4", title: "Zoetrope" },
    { id: "kHZFULrdV1k", title: "Abstract Animation" },
    { id: "AlQFOrY-LsU", title: "Logo Animation" },
    { id: "wnGRCWJhNr0", title: "Spaceship VFX" }
];

const videoGrid = document.querySelector('.video-grid');
const modal = document.getElementById('video-modal');
const titleDisplay = document.querySelector('.video-title-display');

function loadYouTubeVideo(videoId) {
    if(!ytPlayerReady) return;
    if (ytPlayer) { ytPlayer.loadVideoById(videoId); } 
    else {
        ytPlayer = new YT.Player('youtube-player', {
            height: '100%', width: '100%', videoId: videoId,
            playerVars: { 'autoplay': 1, 'rel': 0, 'modestbranding': 1, 'controls': 1 },
        });
    }
}

videos.forEach(video => {
    const videoThumbnail = document.createElement('div');
    videoThumbnail.classList.add('video-thumbnail');
    
    videoThumbnail.innerHTML = `
        <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="${video.title}">
        <div class="video-info">
            <p>${video.title}</p>
        </div>
    `;
    videoGrid.appendChild(videoThumbnail);

    videoThumbnail.addEventListener('click', () => {
        titleDisplay.innerText = video.title; 
        loadYouTubeVideo(video.id); 
        
        modal.style.display = 'flex';
        gsap.fromTo(modal, {opacity: 0}, {opacity: 1, duration: 0.3});
        document.body.style.overflow = 'hidden';
        lenis.stop(); 
    });
});

function closeVideo() {
    gsap.to(modal, {
        opacity: 0, duration: 0.3, 
        onComplete: () => {
            modal.style.display = 'none';
            if(ytPlayer) ytPlayer.stopVideo(); 
            document.body.style.overflow = 'auto'; 
            lenis.start(); 
        }
    });
}

document.querySelector('.close-btn').addEventListener('click', closeVideo);
document.querySelector('.modal-backdrop').addEventListener('click', closeVideo);

gsap.utils.toArray('.gs-reveal').forEach(function(elem) {
    gsap.fromTo(elem, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: elem, start: "top 85%" } }
    );
});
