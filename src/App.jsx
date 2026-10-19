import { useEffect, useState } from "react"
import Connect from "./Components/Connect/Connect"
import Connect1 from "./Components/Connect/Connect1"
import Education from "./Components/Education/Education"
import Home from "./Components/Home/Home"
import Navbar from "./Components/Navbar/Navbar"
import Skills from "./Components/Skill/Skill"
import Projects from "./Components/Projects/Projects"
import Experience from "./Components/Experience/Experience"
import Highlights from "./Components/Highlights/Highlights"
import About from "./Components/about/About"
import TechGraph from "./Components/Graph/TechGraph"
import Game from "./game/Game"

function App() {
  // New visits open the classic view; a refresh in the same tab keeps you in the game.
  const [mode, setMode] = useState(() => {
    try {
      return sessionStorage.getItem("pq-mode") === "game" ? "game" : "classic"
    } catch {
      return "classic"
    }
  })

  useEffect(() => {
    try {
      sessionStorage.setItem("pq-mode", mode)
    } catch {
      /* storage blocked */
    }
    window.scrollTo(0, 0)
  }, [mode])

  if (mode === "game") return <Game onClassic={() => setMode("classic")} />

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-950">
      <Navbar onPlay={() => setMode("game")} />
      <main>
        <Home />
        <Highlights />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <TechGraph />
        <Connect />
      </main>
      <Connect1 onPlay={() => setMode("game")} />
    </div>
  )
}

export default App
