document.addEventListener("DOMContentLoaded", function() {
    // Simulate content loading
    setTimeout(function() {
        document.querySelector('.preloader').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
    }, 2000); // Longer loading time (5000 milliseconds)
});