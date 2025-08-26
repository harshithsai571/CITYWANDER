async function renderFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";

  try {
    const res = await fetch("/api/cities");
    const cities = await res.json();

    const popularCities = cities.slice(0, 5)  // Just pick top 5
      .map(city => `<li><a href="/city.html?id=${city._id}">${city.name}</a></li>`)
      .join("");

    footer.innerHTML = `
      <div class="footer-container">
        <div class="footer-section logo">
          <h3>CityWander</h3>
          <p>&copy; ${new Date().getFullYear()} CityWander. All rights reserved.</p>
        </div>
        <div class="footer-section">
          <h4>Popular Cities</h4>
          <ul>${popularCities}</ul>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/index.html">Home</a></li>
            <li><a href="/cities.html">Cities</a></li>
            <li><a href="/login.html">Log In</a></li>
            <li><a href="/signup.html">Sign Up</a></li>
          </ul>
        </div>
      </div>
    `;

    document.body.appendChild(footer);
  } catch (err) {
    console.error("Failed to load footer cities:", err);
  }
}

