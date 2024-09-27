// DECLARAR VARIAVEIS
const camera = document.getElementsByClassName("camera")[0];
var rotate = 0;
var x = -3500;
var y = 50;
var z = -3500;
const acceptedkeys = ["KeyW", "KeyA", "KeyS", "KeyD"];
var keys = [];
var mouseX = 0;
var mouseY = 0;
var speed = 1;

// LISTA DE TECLAS SENDO PRESSIONADAS SIMULTANEAMENTE
document.addEventListener("keydown", (event) => {
    if (acceptedkeys.includes(event.code) && keys.includes(event.code) == false) {
        keys.push(event.code);
    }
});
document.addEventListener("keyup", (event) => {
    if (keys.includes(event.code)) {
        keys.splice(keys.indexOf(event.code),1);
    };
});

// MOUSE DETECTION
document.addEventListener("mousemove", (event) => {
    mouseX = event.screenX - (window.innerWidth/2);
    mouseY = event.screenY - (window.innerHeight/2);
})

// CODE LOOP
const loop = setInterval(() => {
    rotate -= mouseX/400;
    rotate = rotate > 360 ? 0 : rotate;
    rotate = rotate < 0 ? 360 : rotate;

    let radians = rotate * (Math.PI / 180);

    if (keys.includes("KeyW")) {
        x += Math.sin(radians) * (speed * 1.5);
        z += Math.cos(radians) * (speed * 1.5);
    };
    if (keys.includes("KeyA")) {
        radians = (rotate - 90) * (Math.PI / 180);
        x -= Math.sin(radians) * speed;
        z -= Math.cos(radians) * speed;
    };
    if (keys.includes("KeyS")) {
        radians = (rotate) * (Math.PI / 180);
        x -= Math.sin(radians) * 1;
        z -= Math.cos(radians) * 1;
    };
    if (keys.includes("KeyD")) {
        radians = (rotate + 90) * (Math.PI / 180);
        x -= Math.sin(radians) * speed;
        z -= Math.cos(radians) * speed;
    };

    if (mouseY > 200) {
        camera.style.top = "-15%"
        speed = 2;
    } else {
        camera.style.top = "50%"
        speed = 1;
    }

    camera.style.transform = `perspective(1000px) translateY(${y}px) translateZ(1000px) rotateX(90deg) rotateZ(${rotate}deg) translate(${x}px, ${z}px)`;
}, 10);