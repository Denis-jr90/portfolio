import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "./components/ParticlesBackground";

export default function App() {
  const [profile, setProfile] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [visits, setVisits] = useState(0);

  const [projects] = useState([
    {
      title: "Portfolio Website",
      description:
        "A responsive portfolio website built using React and Tailwind CSS.",
    },
    {
      title: "Fraud Detection System",
      description:
        "Machine learning project for financial fraud detection.",
    },
    {
      title: "Cloud Storage Dashboard",
      description:
        "Cloud-based dashboard system for managing digital files securely.",
    },
    {
      title: "Student Management System",
      description:
        "Full-stack application for managing students and academic records.",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    const count = localStorage.getItem("visits") || 0;
    const newCount = parseInt(count) + 1;
    localStorage.setItem("visits", newCount);
    setVisits(newCount);
  }, []);

  useEffect(() => {
    fetch("https://portfolio-backend-8lg5.onrender.com")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.log(err));
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://portfolio-backend-8lg5.onrender.com/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Message Sent Successfully!");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        alert(data.error || "Failed to send message");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div
      className={
        darkMode
          ? "bg-gray-950 text-white min-h-screen transition-all duration-500 relative"
          : "bg-white text-black min-h-screen transition-all duration-500 relative"
      }
    >
      {/* 🌌 MOVING SCIENCE BACKGROUND */}
      <ParticlesBackground />

      {/* NAVBAR */}
      <nav className="flex flex-wrap justify-between items-center px-6 md:px-10 py-5 bg-black border-b border-gray-800 sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-cyan-400">
          Mr.Ndenje Portfolio
        </h1>

        <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
          <ul className="flex flex-wrap gap-6 text-gray-300">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#admin">Admin</a></li>
          </ul>

          <span className="text-gray-400 text-sm">
            👁 Visits: {visits}
          </span>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-bold"
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-32 px-5"
      >
        <h1 className="text-4xl md:text-7xl font-bold mb-6">
          Hello, I'm <span className="text-cyan-400">Mr.Ndenje</span>
        </h1>

        <div className="mb-6">
          {profile ? (
            <p className="text-cyan-400 text-xl">
              {profile.owner} | {profile.email}
            </p>
          ) : (
            <p className="text-gray-500">Loading profile...</p>
          )}
        </div>

        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Cloud Computing Student | Web Developer | Future Data Scientist
        </p>
      </motion.section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 md:px-10">
        <h2 className="text-4xl font-bold mb-8 text-cyan-400">
          Contact Me
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black text-white border border-gray-700"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black text-white border border-gray-700"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black text-white border border-gray-700"
            required
          />

          <button
            type="submit"
            className="bg-cyan-500 px-8 py-4 rounded-xl font-bold text-black"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 bg-black text-gray-500">
        © 2026 Mr.Ndenje Portfolio
      </footer>
    </div>
  );
}