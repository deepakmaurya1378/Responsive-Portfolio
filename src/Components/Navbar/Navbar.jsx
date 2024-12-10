import { useState } from "react";

function Navbar() {
  const [menu, openMenu] = useState(false);

  return (
    <nav className="flex justify-between items-center text-white px-6 md:px-20 py-4 shadow-lg bg-gray-900">
     
      <span className="text-2xl font-bold tracking-wide">Portfolio</span>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex gap-8 font-semibold">
        <li>
          <a href="#Education" className="hover:text-gray-400 transition">
            Education
          </a>
        </li>
        <li>
          <a href="#Skills" className="hover:text-gray-400 transition">
            Skills
          </a>
        </li>
        <li>
          <a href="#Projects" className="hover:text-gray-400 transition">
            Projects
          </a>
        </li>
        <li>
          <a href="#Contact" className="hover:text-gray-400 transition">
            Contact
          </a>
        </li>
        <li>
          <a
            href="https://linktr.ee/deepak_maurya112"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
          >
            Linktree
          </a>
        </li>
      </ul>

      {/* Hamburger Menu Button */}
      <button
        className="md:hidden flex flex-col items-center justify-center space-y-1"
        onClick={() => openMenu(!menu)}
        aria-label="Toggle Menu"
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-transform ${
            menu ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-white transition-opacity ${
            menu ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-white transition-transform ${
            menu ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </button>

      {/* Sliding Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white z-50 transform ${
          menu ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 shadow-lg`}
      >
        <button
          className="absolute top-4 right-4 text-2xl focus:outline-none"
          onClick={() => openMenu(false)}
          aria-label="Close Menu"
        >
          ✕
        </button>
        <ul className="flex flex-col gap-6 mt-16 font-semibold text-center">
          <li>
            <a
              href="#Education"
              className="hover:text-gray-400 transition"
              onClick={() => openMenu(false)}
            >
              Education
            </a>
          </li>
          <li>
            <a
              href="#Skills"
              className="hover:text-gray-400 transition"
              onClick={() => openMenu(false)}
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#Projects"
              className="hover:text-gray-400 transition"
              onClick={() => openMenu(false)}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#Contact"
              className="hover:text-gray-400 transition"
              onClick={() => openMenu(false)}
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="https://linktr.ee/deepak_maurya112"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
              onClick={() => openMenu(false)}
            >
              Linktree
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
