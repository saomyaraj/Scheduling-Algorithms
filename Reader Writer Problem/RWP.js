document.addEventListener("DOMContentLoaded", function() {
    // Simulate content loading
    setTimeout(function() {
        document.querySelector('.preloader').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
    }, 2000); // Longer loading time (2000 milliseconds)
});

document.addEventListener('DOMContentLoaded', function() {
    const writerCodeSnippet = document.getElementById('writerCodeSnippet');
    const writerCopyButtonHTML = '<button class="copy-button" onclick="copyCode(\'writerCodeSnippet\')">Copy Code</button>';
    writerCodeSnippet.insertAdjacentHTML('afterend', writerCopyButtonHTML);

    const readerCodeSnippet = document.getElementById('readerCodeSnippet');
    const readerCopyButtonHTML = '<button class="copy-button" onclick="copyCode(\'readerCodeSnippet\')">Copy Code</button>';
    readerCodeSnippet.insertAdjacentHTML('afterend', readerCopyButtonHTML);
});

function copyCode(codeSnippetId) {
    const codeSnippet = document.getElementById(codeSnippetId);
    const code = codeSnippet.querySelector('code').innerText;
    navigator.clipboard.writeText(code)
        .then(() => {
            alert('Code copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

let tl = gsap.timeline();

    tl.from(".container, .heading, .intro, .cases, .variables, .functions, .writer, .reader, .conclusion", {
        y: 50,
        duration: 1.5,
        delay: 2,
        opacity: 0,
        stagger: 0.3
    });