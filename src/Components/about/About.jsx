
const About = () => {
  return (
    <div
      id="About"
      className="text-white bg-black bg-opacity-30 shadow-xl rounded-lg p-12 mx-4 md:mx-20 overflow-hidden"
    >
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
        About
      </h2>
      <div className="flex flex-col md:flex-row md:justify-center md:gap-12">
        {/* Frontend Developer */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 mb-6 md:mb-0 md:w-1/3">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">
          
          </h3>
          <p className="text-sm md:text-base">
            A passionate Computer Science Engineer. I recently completed my B.Tech in Computer Science and Engineering and am excited to apply my skills and knowledge in the real world. Over the course of my academic journey, I developed a deep interest in web development, software engineering, and problem-solving, and have worked on several projects that fueled my passion for technology.
          </p>
        </div>

       
      </div>
    </div>
  );
};

export default About;
