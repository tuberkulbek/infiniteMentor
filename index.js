const canvas = document.querySelector("canvas");
const audio = document.querySelector("audio");
const context = canvas.getContext("2d");
const pugDimensions = { width: 353 * 1.2, height: 325 * 1.2 };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.translate(window.innerWidth / 2, window.innerHeight / 2);

const image = new Image();
image.src = "./assets/pug.png"; // Photo credit to Matthew Henry (https://unsplash.com/photos/U5rMrSI7Pn4)

const loopingPugs = 40; // 125 pugs required to cover a full 4K television screen. Tested via Firefox DevTools
const offsetDistance = 120;
let currentOffset = 0;

const movementRange = 1600

const mouseOffset = {
    x: 0,
    y: 0
}

const movementOffset = {
    x: 0,
    y: 0
}

image.onload = () => {
    startLooping();
};

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.setTransform(1, 0, 0, 1, 0, 0); //Reset the canvas context
    context.translate(window.innerWidth / 2, window.innerHeight / 2);
};

window.addEventListener('mousemove', onMouseMove)

function draw(offset, loopCount) {

    let currentPercentage = (loopingPugs - loopCount) / loopingPugs
    context.drawImage(
        image,
        -pugDimensions.width / 2 - offset/2 + (movementOffset.x * currentPercentage),
        -pugDimensions.height / 2 - offset/2 + (movementOffset.y * currentPercentage),
        pugDimensions.width + offset,
        pugDimensions.height + offset
    );
}

function onMouseMove(e) {
    mouseOffset.x = (e.clientX - window.innerWidth / 2) / window.innerWidth / 2 * movementRange
    mouseOffset.y = (e.clientY - window.innerHeight / 2) / window.innerHeight / 2 * movementRange
}

function lerp(start, end, amount) {
    return start*(1-amount)+end*amount
}

function loopDraw() {

    movementOffset.x = lerp(movementOffset.x, mouseOffset.x, 0.05)
    movementOffset.y = lerp(movementOffset.y, mouseOffset.y, 0.05)

    for (let i = loopingPugs; i >= 1; i--) {
        draw(i * offsetDistance + currentOffset, i);
    }

    draw(offsetDistance, 1);

    currentOffset++;
    if (currentOffset >= offsetDistance) {
        currentOffset = 0;
    }

    requestAnimationFrame(loopDraw);
}

function startLooping() {
    requestAnimationFrame(loopDraw);
}

const changeImage = (name) => {
    image.src = `./assets/${name}.png`
    console.log(audio.play())
}

const nartay = document.getElementById("nartay")
const murat = document.getElementById("murat")
const aidoha = document.getElementById("aidoha")
const aidar = document.getElementById("aidar")
const beknar = document.getElementById("beknar")

nartay.addEventListener("click", ()=>{changeImage("Nartay")})
murat.addEventListener("click", ()=>{changeImage("Murat")})
aidoha.addEventListener("click", ()=>{changeImage("Aidoha")})
aidar.addEventListener("click", ()=>{changeImage("Aidar")})
beknar.addEventListener("click", ()=>{changeImage("Beknar")})