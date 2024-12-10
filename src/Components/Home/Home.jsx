import image1 from '../../picture/image1.gif'
function Home() {
  return (
    <div className="text-white w-full flex flex-col md:flex-row justify-between items-start p-10 md:p-20">
  {/* Text Section */}
  <div className="md:w-1/2 md:pr-10 mt-10">
    <h1 className="text-3xl md:text-6xl font-bold leading-tight tracking-tighter hover:text-blue-400">
      Hello, <br />
      {`I'am Deepak Maurya`}
    </h1>
    <p className="text-sm md:text-2xl mt-4 mb-6 tracking-tight">
      {`A passionate Computer Science Engineer. I recently completed my B.Tech in Computer Science Engineering and i am excited to apply my skills and knowledge in the real world projects with you all.`}
    </p>
    <a href='#Contact'>
    <button className="mt-4 md:mt-10 text-white py-2 px-4 text-sm md:text-lg hover:opacity-85 duration-300 hover:scale-105 font-semibold rounded-3xl bg-[#465697]">
     Contact Me
    </button>
    </a>
    
  </div>

  {/* Image Section */}
  <div className="md:w-1/3 mt-10 mr-20 ml-20">
    <img
      src={image1}
      alt="Profile"
      className="w-full h-auto  rounded-lg shadow-lg"
    />
  </div>
</div>

  )
}

export default Home
