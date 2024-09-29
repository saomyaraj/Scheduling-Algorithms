document.addEventListener("DOMContentLoaded", function() {
    // Simulate content loading
    setTimeout(function() {
        document.querySelector('.preloader').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
    }, 2000); // Longer loading time (5000 milliseconds)
});

document.addEventListener('DOMContentLoaded', function() {
    const codeSnippet = document.getElementById('codeSnippet');
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy Code';
    copyButton.className = 'copy-button';
    copyButton.addEventListener('click', function() {
        const code = codeSnippet.querySelector('code').innerText;
        navigator.clipboard.writeText(code)
            .then(() => {
                alert('Code copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    });
    codeSnippet.parentNode.insertBefore(copyButton, codeSnippet.nextSibling);
});