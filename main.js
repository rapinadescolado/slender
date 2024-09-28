// DECLARAR VARIAVEIS
const camera = document.getElementsByClassName("camera")[0];
var rotate = 0;
var x = 4000;
var y = 50;
var z = 4000;
const acceptedkeys = ["KeyW", "KeyA", "KeyS", "KeyD"];
var keys = [];
var mouseX = 0;
var mouseY = 0;
var speed = 1;
var cameradowntimer = 0;
const light = document.getElementById("light");

const slender = document.getElementById("slender");
const slenderImg = document.getElementById("slenderImg");
var slenderX = 0;
var slenderZ = 0;
var slenderRotate = 0;
var slendersensibility;




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
const playerCode = setInterval(() => {
    if (mouseX > 130 || mouseX < -130) {
        rotate -= mouseX/400;
        rotate = rotate > 360 ? 0 : rotate;
        rotate = rotate < 0 ? 360 : rotate;
    }

    if (mouseY < 100) {
        light.style.backgroundImage = "url(img/flashlight.png)";
    } else {
        light.style.backgroundImage = "url(img/dark.png)";
    }


    let radians = rotate * (Math.PI / 180);

    if (keys.includes("KeyW")) {
        x -= Math.sin(radians) * (speed * 1.5);
        z += Math.cos(radians) * (speed * 1.5);
    };
    if (keys.includes("KeyA")) {
        radians = (rotate + 90) * (Math.PI / 180);
        x -= Math.sin(radians) * speed;
        z += Math.cos(radians) * speed;
    };
    if (keys.includes("KeyS")) {
        radians = (rotate + 180) * (Math.PI / 180);
        x -= Math.sin(radians) * 1;
        z += Math.cos(radians) * 1;
    };
    if (keys.includes("KeyD")) {
        radians = (rotate - 90) * (Math.PI / 180);
        x -= Math.sin(radians) * speed;
        z += Math.cos(radians) * speed;
    };

    if (mouseY > 200) {
        camera.style.top = "-15%"
        speed = 2;
        if (cameradowntimer == 0) {
            slendersensibility = Math.floor(Math.random()*10) ;
        }
        cameradowntimer += 0.01;
    } else {
        camera.style.top = "50%"
        speed = 1;
        slendersensibility = 0;
        cameradowntimer = 0;
    }

    camera.style.transform = `perspective(1000px) translateY(${y}px) translateZ(1000px) rotateX(90deg) rotateZ(${rotate}deg) translate(${-(x)}px, ${-8000 + z}px)`;
    slenderCode()
}, 10);


function slenderCode() {
    let deltaX = x - slenderX;
    let deltaZ = z - slenderZ;
    slenderRotate = 90 + (Math.atan2(deltaZ, deltaX)) * 180 / Math.PI;

    if (cameradowntimer > slendersensibility) {
        let slenderradians = slenderRotate * (Math.PI / 180);
        slenderX += Math.sin(slenderradians) * 10;
        slenderZ -= Math.cos(slenderradians) * 10;
        slenderImg.style.opacity = "0";
    } else {
        slenderImg.style.opacity = "1";
    }

    slender.style.transform = `translate(${-25+slenderX}px, ${-25-(slenderZ)}px)`;
    slenderImg.style.transform = `translateZ(57px) rotateX(-90deg) rotateY(${(slenderRotate - 180)}deg)`;
};