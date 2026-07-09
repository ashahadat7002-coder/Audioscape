const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

const audioFile = document.getElementById("audioFile");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");




const themeSelect = document.getElementById("themeSelect");
const fullscreenBtn = document.getElementById("fullscreenBtn");

const currentTheme = document.getElementById("currentTheme");
const fpsCounter = document.getElementById("fpsCounter");

let audio;
let audioContext;
let analyser;
let source;

let dataArray;
let bufferLength;
let particles = [];
let animationStarted = false;
let visualizerMode = "rgb";
let bassValue = 0;
let midValue = 0;
let trebleValue = 0;
let lastFrame = performance.now();
let fps = 0;
themeSelect.addEventListener("change", function () {

    visualizerMode = this.value;


    if(visualizerMode === "rgb"){

        currentTheme.textContent = "RGB Spectrum";

    }

    else if(visualizerMode === "blue"){

        currentTheme.textContent = "Deep Blue";

    }

    else if(visualizerMode === "3band"){

        currentTheme.textContent = "3 Band Spectrum";

    }

});
class Particle {

    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 3 + 1;

        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;

        this.alpha = Math.random();
    }

    update(speed = 1) {

    this.x += this.speedX * speed;

    this.y += this.speedY * speed;

    if (
        this.x < 0 ||
        this.x > canvas.width ||
        this.y < 0 ||
        this.y > canvas.height
    ) {

        this.reset();

    }

}

}

// Create particles
for (let i = 0; i < 120; i++) {

    particles.push(new Particle());

}

audioFile.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    audio = new Audio();

    audio.src = URL.createObjectURL(file);


    audio.addEventListener("loadedmetadata", function(){

        progress.max = audio.duration;

        duration.textContent = formatTime(audio.duration);

    });
    audio.addEventListener("timeupdate", function(){

        progress.value = audio.currentTime;

        currentTime.textContent = formatTime(audio.currentTime);

    });
    progress.addEventListener("input", function(){

        if(audio){

            audio.currentTime = this.value;
 
        }

    });

    audioContext = new AudioContext();

    analyser = audioContext.createAnalyser();

    analyser.fftSize = 512;

    source = audioContext.createMediaElementSource(audio);

    source.connect(analyser);

    analyser.connect(audioContext.destination);

    bufferLength = analyser.frequencyBinCount;

    dataArray = new Uint8Array(bufferLength);

});
playBtn.addEventListener("click", async function () {

    if (!audio) return;

    if (audioContext.state === "suspended") {
        await audioContext.resume();
    }

    audio.play();

    if (!animationStarted) {
        animationStarted = true;
        animate();
    }

});
pauseBtn.addEventListener("click", function(){

    if(audio){

        audio.pause();

    }

});
stopBtn.addEventListener("click", function(){

    if(audio){

        audio.pause();

        audio.currentTime = 0;

    }

});


fullscreenBtn.addEventListener("click", function(){

    const visualizerSection = document.querySelector(".visualizer-section");

    if(!document.fullscreenElement){

        visualizerSection.requestFullscreen();

    }
    else{

        document.exitFullscreen();

    }

});


document.addEventListener("fullscreenchange", function(){

    if(document.fullscreenElement){

        canvas.width = window.innerWidth;

        canvas.height = window.innerHeight;

    }
    else{

        resizeCanvas();

    }

});
volume.addEventListener("input", function(){

    if(audio){

        audio.volume = this.value;

    }

});


function animate() {

    requestAnimationFrame(animate);

    let now = performance.now();

    fps = Math.round(1000 / (now - lastFrame));

    lastFrame = now;

    fpsCounter.textContent = fps;


    if (!analyser) return;

    analyser.getByteFrequencyData(dataArray);
    analyzeFrequencyBands();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const radius = 150;
    const bars = 128;

    let bass = 0;

    for (let i = 0; i < 15; i++) {
        bass += dataArray[i];
    }

    bass /= 15;

    drawBackground(centerX, centerY);

    drawSpectrum(centerX, centerY, radius, bars);

    drawCenterPulse(centerX, centerY, bass);

    drawParticles(bass);

}
function analyzeFrequencyBands(){

    let bass = 0;
    let mid = 0;
    let treble = 0;


    // Bass frequencies
    for(let i = 0; i < 20; i++){

        bass += dataArray[i];

    }


    // Mid frequencies
    for(let i = 20; i < 100; i++){

        mid += dataArray[i];

    }


    // Treble frequencies
    for(let i = 100; i < 200; i++){

        treble += dataArray[i];

    }


    bassValue = bass / 20;

    midValue = mid / 80;

    trebleValue = treble / 100;

}
function drawBackground(centerX, centerY) {

    const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        50,
        centerX,
        centerY,
        canvas.width
    );

    gradient.addColorStop(0, "#111827");
    gradient.addColorStop(1, "#020617");

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, canvas.width, canvas.height);

}
function drawSpectrum(centerX, centerY, radius, bars) {

    for (let i = 0; i < bars; i++) {

        const value = dataArray[i];

        const angle = (i / bars) * Math.PI * 2;

        const barLength = value * 0.8;

        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;

        const x2 = centerX + Math.cos(angle) * (radius + barLength);
        const y2 = centerY + Math.sin(angle) * (radius + barLength);

        const hue = (i / bars) * 360;

        ctx.beginPath();

        ctx.lineWidth = 4;

        if (visualizerMode === "rgb") {

            ctx.strokeStyle = `hsl(${hue},100%,50%)`;
            ctx.shadowColor = `hsl(${hue},100%,50%)`;

        }
        else if (visualizerMode === "blue") {

            ctx.strokeStyle = "#00bfff";
            ctx.shadowColor = "#00bfff";

        }
        else if (visualizerMode === "3band") {

            if(i < bars/3){

                ctx.strokeStyle = `rgb(${bassValue+100},50,50)`;
                ctx.shadowColor = "red";

            }

            else if(i < bars*2/3){

                ctx.strokeStyle = `rgb(50,${midValue+100},50)`;
                ctx.shadowColor = "lime";

            }

            else{

                ctx.strokeStyle = `rgb(50,100,${trebleValue+100})`;
                ctx.shadowColor = "cyan";

            }

        } 

        ctx.shadowBlur = 20;

        ctx.moveTo(x1, y1);

        ctx.lineTo(x2, y2);

        ctx.stroke();

    }

}
function drawCenterPulse(centerX, centerY, bass) {

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        60 + bass * 0.15,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "rgba(255,255,255,0.08)";

    ctx.fill();

    ctx.lineWidth = 3;

    ctx.strokeStyle = "#ffffff";

    ctx.shadowBlur = 30;

    ctx.shadowColor = "#ffffff";

    ctx.stroke();

}
function drawParticles(bass) {

    particles.forEach(particle => {

        particle.update(1 + bass * 0.01);

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size + bass * 0.02,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(255,255,255,${particle.alpha})`;

        ctx.shadowBlur = 20;

        ctx.shadowColor = "white";

        ctx.fill();

    });

}

function resizeCanvas() {

    canvas.width = canvas.clientWidth;

    canvas.height = canvas.clientHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


document.addEventListener("fullscreenchange", function(){

    resizeCanvas();

});
function formatTime(seconds){

    let min = Math.floor(seconds / 60);

    let sec = Math.floor(seconds % 60);


    if(sec < 10){

        sec = "0" + sec;

    }


    return `${min}:${sec}`;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);