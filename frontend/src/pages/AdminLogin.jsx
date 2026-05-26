import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        alert("Login successful 🚀");
        window.location.href = "/admin";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Error logging in");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <form
        onSubmit={login}
        className="bg-gray-900 p-10 rounded-2xl w-[350px]"
      >
        <h1 className="text-2xl font-bold mb-6 text-cyan-400">
          Admin Login
        </h1>

        <input
          className="w-full p-3 mb-4 bg-black rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 bg-black rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-cyan-500 p-3 rounded font-bold"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}