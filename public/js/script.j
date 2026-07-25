const form = document.getElementById("leadForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    mobile: document.getElementById("mobile").value
  };

  document.getElementById("msg").innerHTML =
    "✅ Thank you! Your request has been received.";

  console.log(data);

  form.reset();
});
