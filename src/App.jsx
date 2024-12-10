
import  Connect  from "./Components/Connect/Connect"
import  Connect1  from "./Components/Connect/Connect1"
import Education from "./Components/Education/Education"
import Home from "./Components/Home/Home"
import Navbar from "./Components/Navbar/Navbar"
import Skills from "./Components/Skill/Skill"
import DR from "./Components/DownloadResume/Dr"
import Projects from "./Components/Projects/Projects"

function App() {

  return (
    <div className="bg-[#171d32] h-auto w-full overflow-hidden">
      <Navbar />
      <Home />
      <Education />
      <Skills />
      <Projects/>
      <Connect />
      <DR/>
      <Connect1/>
    </div>
  )
}

export default App
