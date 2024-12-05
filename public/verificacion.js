document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (fullName === '' || email === '' || password === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Correo electrónico no válido.');
        return;
    }

    alert('Registro exitoso!');
});

function validateEmail(email) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}
