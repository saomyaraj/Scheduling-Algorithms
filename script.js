document.addEventListener("DOMContentLoaded", function() {
    // Simulate content loading
    setTimeout(function() {
        document.querySelector('.preloader').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
    }, 2000); // Longer loading time (5000 milliseconds)
});

let tl = gsap.timeline();

    tl.from(".container, .buttons-container", {
        y: 50,
        duration: 1.5,
        delay: 2,
        opacity: 0,
        stagger: 0.3
    });