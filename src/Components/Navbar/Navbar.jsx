import { RiCloseLine, RiMenu2Line } from "@remixicon/react";
import { useState } from "react";

function Navbar() {
  const [menu, openMenu] = useState(false);

  return (
    <nav className="flex flex-wrap justify-between md:items-center text-white px-10 pt-6 md:px-20 shadow-lg h-20 ">
      <span className="text-xl font-bold tracking-wide mb-2">Portfolio</span>
      {/* Mobile and desktop menu items */}
      <ul
        className={`${
          menu ? "block" : "hidden"
        } mx-24 mt-4 font-semibold md:mt-0 bg-black px-2 rounded-xl bg-opacity-30 md:border-none text-center md:bg-transparent md:static md:mx-0 md:flex gap-6 mb-4`}
      >
        
        <li>
          <a href="#Education" className="text-md transition-all duration-300 p-1 md:p-0">
            Education
          </a>
              </li>
              <li>
          <a href="#Skills" className="text-md   transition-all duration-300 p-1 md:p-0 ">
            Skill
          </a>
        </li>
        <li>
          <a href="#Projects" className="text-md transition-all duration-300 p-1 md:p-0">
            Project
          </a>
        </li>
        <li>
          <a href="#Contact" className="text-md transition-all duration-300 p-1 md:p-0">
            Contact
          </a>
              </li>
              <li>
          <a href="https://linktr.ee/deepak_maurya112" className="text-md transition-all duration-300 p-1 md:p-0">
            Linktree
          </a>
        </li>
      </ul>

      {/* Hamburger and close icons for mobile */}
      <div className="md:hidden absolute right-10 top-6 transition-all duration-30 ">
        {menu ? (
          <RiCloseLine
            size={30}
            className="cursor-pointer"
            onClick={() => openMenu(!menu)}
          />
        ) : (
          <RiMenu2Line
            size={30}
            className="cursor-pointer"
            onClick={() => openMenu(!menu)}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
