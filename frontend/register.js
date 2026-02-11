async function register() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Registration failed");
    return;
  }

  alert("Registered successfully");
  window.location.href = "login.html";
}
