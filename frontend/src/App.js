import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RICAImportPermit from "./pages/RICAImportPermit"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<RICAImportPermit />} />
          
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
