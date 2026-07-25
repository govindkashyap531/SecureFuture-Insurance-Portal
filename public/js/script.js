document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("leadForm");
  const message = document.getElementById("message");

  if (form) {

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector('input[type="text"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const mobile = form.querySelector('input[type="tel"]').value.trim();
      const insurance = form.querySelector("select").value;

      if (name.length < 3) {
        alert("Please enter your full name.");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return;
      }

      if (!/^[6-9]\d{9}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
      }

      if (insurance === "") {
        alert("Please select an insurance plan.");
        return;
      }

      fetch("/lead/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          mobile: mobile,
          insuranceType: insurance
        })
      })
      .then(res => res.json())
      .then(data => {
        message.innerHTML = "✅ Thank you! Our insurance advisor will contact you shortly.";
        form.reset();
      })
      .catch(err => {
        console.error(err);
        message.innerHTML = "❌ Something went wrong. Please try again.";
      });

    });

  }

  const links = document.querySelectorAll("nav a");

  links.forEach(link => {
    link.addEventListener("click", () => {
      links.forEach(item => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

});


function calculatePremium() {

    const amount = parseFloat(document.getElementById("amount").value);
    const age = parseInt(document.getElementById("age").value);

    if (!amount || !age) {
        document.getElementById("result").innerHTML =
        "Please enter Amount and Age.";
        return;
    }

    let rate = 0.02;

    if (age <= 30) {
        rate = 0.02;
    } else if (age <= 40) {
        rate = 0.025;
    } else if (age <= 50) {
        rate = 0.03;
    } else if (age <= 60) {
        rate = 0.04;
    } else if (age <= 70) {
        rate = 0.05;
    } else {
        rate = 0.06;
    }

    const premium = (amount * rate).toFixed(2);

    document.getElementById("result").innerHTML =
        "Estimated Premium: ₹" + premium + " / year";
}
