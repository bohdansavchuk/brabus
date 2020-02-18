"use strict";

let car = document.querySelector(".car-block__wrapper"),
    play = document.getElementById("start"),
    reset = document.getElementById("reset"),
    text = document.getElementById("text"),
    circle = document.querySelectorAll('.car-block__circle'),
    count = 0,
    directionRight = true,
    driveInterval,
    audio = new Audio('audio/1.mp3');


let carDrive = function() {
    driveInterval = requestAnimationFrame(carDrive);
    if(count < 600 && directionRight) {
        count++;
        text.style.transform = 'unset';
        car.style.transform = 'unset';
        car.style.left = count * 2 + "px";
        circle.forEach((item) => {
            item.style.transform = `rotate(${count * 3}deg)`;
        });
    } else {
        count--;
        directionRight = false;
        text.style.transform = 'scale(-1, 1)';
        car.style.transform = 'scale(-1, 1)';
        car.style.left = count * 2 + "px";
        circle.forEach((item) => {
            item.style.transform = `rotate(-${count * 3}deg)`;
        });
        if(count <= 0) {
            directionRight = true;
        }
    }
};

let animate = true;

play.addEventListener("click", function(){
    event.preventDefault();
    if(animate) {
        driveInterval = requestAnimationFrame(carDrive); 
        animate = false;
        audio.play();
    } else {
        animate = true;
        cancelAnimationFrame(driveInterval);
        audio.pause();
    }
});


reset.addEventListener("click", function(){
    event.preventDefault();
    cancelAnimationFrame(driveInterval);
    text.style.transform = 'unset';
    car.style.transform = 'unset';
    car.style.left = 0;
    count = 0;
    animate = true;
    audio.pause();
    audio.currentTime = 0;
});