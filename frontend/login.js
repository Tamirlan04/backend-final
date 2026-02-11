document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        document.getElementById("msg").innerText = data.message || "Login failed";
        return;
      }

      // 🔑 САМОЕ ВАЖНОЕ
      console.log("Login successful, saving token...");
      localStorage.setItem("token", data.token);

      // 👉 переход в личный кабинет
      console.log("Redirecting to dashboard...");
      window.location.replace("dashboard.html");

    } catch (err) {
      console.error(err);
      document.getElementById("msg").innerText = "Server error. Is the backend running?";
    }
  });
});
