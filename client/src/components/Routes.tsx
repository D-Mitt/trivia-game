import React from "react"
import { Route, Routes as R } from "react-router-dom"
import "../stylesheets/index.css"
import Game from "./game/Game"
import Home from "./home/Home"

const NotFound = () => {
  return (
    <div className="mt-5 dark-mode-background">
      <h1>Sorry, page not found</h1>
    </div>
  )
}

const Routes = (): JSX.Element => {
  return (
    <R>
      <Route 
        path="/"
        element={<Home />}
      />
      <Route 
        path="/games/:id"
        element={<Game />}
      />
      <Route path="*" element={<NotFound/>} />
    </R>
  )
}

export default Routes
