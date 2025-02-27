// Hamburger Menu
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Form Handling
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const formMessage = document.getElementById('form-message');

    if (name && email && subject && message) {
        fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message })
        })
        .then(response => response.json())
        .then(data => {
            formMessage.textContent = data.message; 
            formMessage.className = 'form-message success';
            this.reset();
        })
        .catch(error => {
            formMessage.textContent = 'Error sending the message.';
            formMessage.className = 'form-message error';
        });

        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 3000);
    } else {
        formMessage.textContent = 'Please fill out all fields.';
        formMessage.className = 'form-message error';
    }
});