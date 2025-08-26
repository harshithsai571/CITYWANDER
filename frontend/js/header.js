function renderHeader() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const navLinks = `
    <nav>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="cities.html">Cities</a></li>
        <li><a href="travel-guide.html">Travel Tips</a></li>
        ${
          token && isAdmin
            ? `<li><a href="admin.html">Admin Dashboard</a></li>`
            : ""
        }
        ${
          token
            ? `
          <li><a href="#" onclick="logout()">Logout</a></li>
          <li><a href="#"><span style="color:#3366ff; font-weight:bold;">👤 ${username}</span></a></li>
        `
            : `
          <li><a href="login.html" class="btn-login">Log in</a></li>
          <li><a href="signup.html" class="btn-signup">Sign up</a></li>
        `
        }
      </ul>
    </nav>
  `;

  const header = `
    <header class="navbar">
      <div class="container">
        <div class="logo">CityWander</div>
        ${navLinks}
      </div>
    </header>
  `;

  document.body.insertAdjacentHTML("afterbegin", header);
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("isAdmin");
  window.location.href = "index.html";
}

