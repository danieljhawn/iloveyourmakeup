document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var form = event.target;
    var formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(function(response) {
        if (response.ok) {
            document.getElementById('success-message').style.display = 'block';
            document.getElementById('error-message').style.display = 'none'; // Hide error message if present
            form.reset();
        } else {
            return response.json().then(function(data) {
                if (Object.hasOwn(data, 'errors')) {
                    alert(data.errors.map(error => error.message).join(", "));
                } else {
                    alert("Oops! There was a problem submitting your form");
                }
            });
        }
    }).catch(function(error) {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('success-message').style.display = 'none'; // Hide success message if present
    });
});
