import Navbar from "./header.js";
document.getElementById("header").innerHTML = Navbar();

const handleSignUpFormSubmit = async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !email || !password) {
    alert("All fields are required.");
    return;
  }

  const newUser = { username, email, password };

  const response = await axios.post("http://localhost:5000/users/signup", newUser);

  if (response.status === 200) {
    alert("Sign-up successful!");
    document.getElementById("signup-form").reset();
    window.location.href = "/Blog%20Management%20System/view/login.html";  
  } else {
    alert(response.data.message || "Failed to create user");
  }
};

document.getElementById("signup-form").addEventListener("submit", handleSignUpFormSubmit);
