import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [profile, setProfile] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [visits, setVisits] = useState(0);

  // REAL PROJECTS
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

  // CONTACT FORM
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  // Track visits
  useEffect(() => {
    const count = localStorage.getItem("visits") || 0;
    const newCount = parseInt(count) + 1;

    localStorage.setItem("visits", newCount);
    setVisits(newCount);
  }, []);

  // Fetch backend
  useEffect(() => {
    fetch("https://portfolio-backend-8lg5.onrender.com")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.log(err));
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !darkMode;

    setDarkMode(newTheme);

    localStorage.setItem(
      "theme",
      newTheme ? "dark" : "light"
    );
  };

  // Handle form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Message Sent Successfully!");

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div
      className={
        darkMode
          ? "bg-gray-950 text-white min-h-screen transition-all duration-500"
          : "bg-white text-black min-h-screen transition-all duration-500"
      }
    >

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
            className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-bold hover:scale-105 transition"
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>

        </div>

      </nav>

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center py-32 px-5"
      >

        <h1 className="text-4xl md:text-7xl font-bold mb-6">
          Hello, I'm
          <span className="text-cyan-400"> Mr.Ndenje</span>
        </h1>

        <div className="mb-6">
          {profile ? (
            <p className="text-cyan-400 text-xl">
              {profile.name} | {profile.email}
            </p>
          ) : (
            <p className="text-gray-500">
              Loading profile...
            </p>
          )}
        </div>

        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Cloud Computing Student | Web Developer |
          Future Data Scientist
        </p>

        <div className="flex justify-center gap-4 mt-10 flex-wrap">

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-2xl text-lg font-bold transition"
          >
            View My Work
          </motion.button>

          <a href="/denis-cv.pdf" download>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-4 rounded-2xl text-lg font-bold hover:bg-gray-200 transition"
            >
              📄 Download CV
            </motion.button>
          </a>

        </div>

      </motion.section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-6 md:px-10">

        <h2 className="text-4xl font-bold mb-8 text-cyan-400">
          About Me
        </h2>

        <p
          className={
            darkMode
              ? "text-gray-300 leading-8 text-lg max-w-4xl"
              : "text-gray-800 leading-8 text-lg max-w-4xl"
          }
        >
          I am passionate about cloud computing,
          web development, machine learning,
          and data analysis. I enjoy building
          scalable modern applications.
        </p>

      </section>

      {/* SKILLS */}
      <section
        id="skills"
        className={
          darkMode
            ? "py-20 px-6 md:px-10 bg-gray-900"
            : "py-20 px-6 md:px-10 bg-gray-100"
        }
      >

        <h2 className="text-4xl font-bold mb-10 text-cyan-400">
          Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js",
            "Python",
            "SQL",
            "Cloud Computing",
            "Git & GitHub",
          ].map((skill) => (

            <motion.div
              key={skill}
              whileHover={{ scale: 1.05 }}
              className={
                darkMode
                  ? "bg-black text-white p-8 rounded-2xl border border-gray-800"
                  : "bg-white text-black p-8 rounded-2xl border border-gray-300 shadow"
              }
            >

              <h3 className="text-2xl font-bold">
                {skill}
              </h3>

            </motion.div>

          ))}

        </div>

      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 px-6 md:px-10">

        <h2 className="text-4xl font-bold mb-10 text-cyan-400">
          Real Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {projects.map((project, index) => (

            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className={
                darkMode
                  ? "bg-gray-900 p-8 rounded-2xl border border-gray-800"
                  : "bg-gray-100 p-8 rounded-2xl border border-gray-300"
              }
            >

              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                {project.title}
              </h3>

              <p
                className={
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-700"
                }
              >
                {project.description}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* CONTACT FORM */}
      <section
        id="contact"
        className={
          darkMode
            ? "py-20 px-6 md:px-10 bg-gray-900"
            : "py-20 px-6 md:px-10 bg-gray-100"
        }
      >

        <h2 className="text-4xl font-bold mb-8 text-cyan-400">
          Contact Me
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 max-w-2xl"
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={
              darkMode
                ? "w-full p-4 rounded-xl bg-black border border-gray-700 text-white"
                : "w-full p-4 rounded-xl bg-white border border-gray-300 text-black"
            }
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className={
              darkMode
                ? "w-full p-4 rounded-xl bg-black border border-gray-700 text-white"
                : "w-full p-4 rounded-xl bg-white border border-gray-300 text-black"
            }
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            className={
              darkMode
                ? "w-full p-4 rounded-xl bg-black border border-gray-700 text-white"
                : "w-full p-4 rounded-xl bg-white border border-gray-300 text-black"
            }
            required
          ></textarea>

          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl text-black font-bold transition"
          >
            Send Message
          </button>

        </form>

      </section>

      {/* ADMIN PANEL */}
      <section
        id="admin"
        className="py-20 px-6 md:px-10"
      >

        <h2 className="text-4xl font-bold mb-8 text-cyan-400">
          Admin Panel
        </h2>

        <div className="flex flex-wrap gap-4">

          <button className="bg-green-500 px-6 py-3 rounded-xl font-bold">
            Add Project
          </button>

          <button className="bg-yellow-500 px-6 py-3 rounded-xl font-bold text-black">
            Update Profile
          </button>

          <button className="bg-red-500 px-6 py-3 rounded-xl font-bold">
            Delete Project
          </button>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 bg-black text-gray-500 border-t border-gray-800">
        © 2026 Mr.Ndenje Portfolio. All rights reserved.
      </footer>

    </div>
  );
}