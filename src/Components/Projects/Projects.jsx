import { ProjectCard } from "./ProjectCard";
import img2 from "../../Assests/Screenshot (2).png"
import img1 from "../../Assests/Screenshot (4).png"
import img3 from "../../Assests/Screenshot (3).png"
const Projects = () => {
  return (
    <section id="Projects" className="bg-gray-900 m-5 text-white py-16 px-6 md:px-20 rounded-lg shadow-xl">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">My Project</h2>
        
        <div className="flex flex-wrap justify-center gap-8">
          <ProjectCard 
             title="AI Mock Interview"
             image={img2}    
            demoLink='https://prep-genin.vercel.app/'  
            srcCode='https://github.com/deepakmaurya1378/Prep-genin'      
            main="A web-based application that simulates mock technical interviews using AI, providing real-time feedback based on your answers."
          />
          <ProjectCard 
            title="Currency Converter"
            image={img3}  
            demoLink='https://currency-converter-two-orpin.vercel.app/'
            srcCode='https://github.com/deepakmaurya1378/Currency-Converter'
            main="Developed a web-based currency converter that allows users to convert amounts between different currencies in real-time."
          />
                  {/* Add more ProjectCard components as needed */}
                <ProjectCard
                title="Tic Tac Toe"
                image={img1}  
            demoLink='https://tic-tak-toe-dusky.vercel.app/'
            srcCode='https://github.com/deepakmaurya1378/Tic-Tak'
            
                main="A web-based game that simulates the classic Tic Tac Toe game. Players alternate marking spaces and aim to get three marks in a row."
                />
                  
        </div>
      </div>
    </section>
  );
};

export default Projects;
