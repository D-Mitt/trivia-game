import * as React from "react"
import { BrowserRouter } from "react-router-dom"
import "../stylesheets/App.css"
import Routes from "./Routes"

const App = (): JSX.Element => {
  return (
    <div className="App">
      <main>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      </main>
    </div>
  )
}

export default App
