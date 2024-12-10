import { FaJava, FaPython, FaJs, FaReact, FaNodeJs, FaGithub } from "react-icons/fa";
import { SiMysql, SiMongodb, SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { DiCss3, DiHtml5 } from "react-icons/di";



const Skills = () => {
  return (
    
    <section
      id="Skills"
      className="bg-gray-900 m-5 text-white py-16 px-6 md:px-20 rounded-lg shadow-xl"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Programming Languages */}
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 flex items-center">
              Programming Languages
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaJava className="mr-2 size-7" /> Java
              </li>
              <li className="flex items-center">
                <FaPython className="mr-2 size-7" /> Python
              </li>
              <li className="flex items-center">
                <FaJs className="mr-2 size-7" /> JavaScript
              </li>
              <li className="flex items-center">
                <SiMysql className="mr-2 size-7" /> SQL
              </li>
            </ul>
          </div>

          {/* Web Technologies & Developer Tools */}
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 flex items-center">
              Web Technologies & Developer Tools
            </h3>
            <ul className="space-y-2 ">
              <li className="flex items-center">
                <DiHtml5 className="mr-2 size-7" /> HTML
              </li>
              <li className="flex items-center">
                <DiCss3 className="mr-2 size-7" /> CSS
              </li>
              <li className="flex items-center">
                <SiTailwindcss className="mr-2 size-7" /> Tailwind CSS
              </li>
              {/* Developer Tools */}
              <li className="flex items-center">
                <FaGithub className="mr-2 size-7" /> GitHub
              </li>
              <li className="flex items-center ">
                <FaJava className="mr-2 size-7" /> Intelije 
              </li>
              <li className="flex items-center ml-7">
                  VS Code
              </li>
            </ul>
          </div>

          {/* Frameworks and Tools */}
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 flex items-center">
              Frameworks & Tools
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaReact className="mr-2 size-7" /> React
              </li>
              <li className="flex items-center">
                <SiNextdotjs className="mr-2 size-7" /> Next.js
              </li>
              <li className="flex items-center">
                <FaNodeJs className="mr-2 size-7" /> Node.js
              </li>
              <li className="flex items-center">
                <SiMongodb className="mr-2 size-7" /> MongoDB
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    
  );
};

export default Skills;
