import { useState } from 'react'

import CareerPathLogin from './login.jsx'
import CareerPathSignup from './signup.jsx'
import HomePage from './homepage.jsx'
import DefaultPage from './default.jsx'
import ExplorePage from './Explore.jsx'
import ResourcesPage from './Resources.jsx'
import InteractiveMindMap from './mindmap.jsx'

import './App.css'

function App() {
  const [page,setpage] = useState("default")

  return (
    <>
    <div>
      {page === "Login" && <CareerPathLogin ToHome={() => setpage("Home")} ToSignup={() => setpage("Sign")} />}
      {page === "Sign" && <CareerPathSignup ToLogin={() => setpage("Login")}  />}
      {page == "Home" && <HomePage ToLogin={() => setpage("Login")}  ToExplore={() => setpage("Explore")}  ToResource={() => setpage("Resources")}  ToMindMap={()=> setpage("Mindmap")}/>}
      {page === "default" && <DefaultPage ToSignup={() => setpage("Sign")} ToLogin={() => setpage("Login")} ToHome={() => setpage("Home")}  />}
      {page === "Explore" && <ExplorePage ToHome={() => setpage("Home")} />}
      {page === "Resources" && <ResourcesPage ToHome={() => setpage("Home")}  />}
      {page === "Mindmap" && <InteractiveMindMap/>}
    </div>
    </>
  )
}

export default App
