document.getElementById("type").addEventListener("change", function() {
    let type = this.value;
    if (type === "student") {
        document.getElementById("studentInputs").style.display = "block";
        document.getElementById("jobInputs").style.display = "none";
    } else {
        document.getElementById("studentInputs").style.display = "none";
        document.getElementById("jobInputs").style.display = "block";
    }
});

document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    let formData = new FormData(this);
    let data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("thankYouMessage").style.display = "block";
            document.getElementById("registrationForm").reset();
        } else {
            alert("Registration failed, please try again.");
        }
    });
});
