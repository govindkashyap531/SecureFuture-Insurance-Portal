async function loadPlans() {
  const response = await fetch("data/health-plans.json");
  const plans = await response.json();

  const plansList = document.getElementById("plansList");
  const searchBox = document.getElementById("searchBox");

  function showPlans(keyword = "") {
    plansList.innerHTML = "";

    const filtered = plans.filter(plan =>
      plan.company.toLowerCase().includes(keyword.toLowerCase()) ||
      plan.plan.toLowerCase().includes(keyword.toLowerCase())
    );

    filtered.forEach(plan => {
      plansList.innerHTML += `
        <div class="plan-card">

          <img src="images/logo-placeholder.png" alt="${plan.company}">

          <h3>${plan.company}</h3>

          <p>${plan.plan}</p>

          <a href="apply.html" class="btn">Apply Now</a>

          <a href="https://wa.me/916389788659?text=Hello%20I%20am%20interested%20in%20${encodeURIComponent(plan.company)}%20${encodeURIComponent(plan.plan)}"
             target="_blank"
             class="btn">
             WhatsApp
          </a>

        </div>
      `;
    });
  }

  showPlans();

  searchBox.addEventListener("input", function () {
    showPlans(this.value);
  });
}

loadPlans();
