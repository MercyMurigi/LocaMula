document.getElementById('waitlist-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    if (email && validateEmail(email)) {
        alert("Thank you for joining the waitlist!");
        document.getElementById('email').value = ''; // Clear the email input
    } else {
        alert("Please enter a valid email address.");
    }
});

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

