document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  fetch("http://localhost:5000/api/auth/me", {
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    })
    .then(user => {
      document.getElementById("user-info").innerText =
        `Logged in as user ID: ${user.id}`;
    })
    .catch(() => {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });

  document.getElementById("logout").onclick = () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  };
});
