import './App.css'
import { Routes, Route } from 'react-router'

import Navbar from './components/Navbar/Navbar'

// * Page components
import Home from './components/Home/Home'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </main>
    </>
  )
}

export default App
