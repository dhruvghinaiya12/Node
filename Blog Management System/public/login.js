import Navbar from "./header.js";

document.getElementById("header").innerHTML = Navbar();

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Both email and password are required.");
    return;
  }

  const UserLogin={email, password}
  const response = await axios.post("http://localhost:5000/users/login", UserLogin);

  if (response.data.message === "Login successful") {
    alert("Login successful!");
    window.location.href = "/Blog%20Management%20System/view/dashboard.html";
  } else {
    alert(response.data.message || "An error occurred. Please try again.");
  }
});
