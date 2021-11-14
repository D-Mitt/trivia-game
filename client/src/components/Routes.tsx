import React from "react"
import { Route, Routes as R } from "react-router-dom"
import "../stylesheets/index.css"
import Home from "./home/Home"

const NotFound = () => {
  return (
    <div className={"dark-mode-background"}>
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
      <Route path="*" element={<NotFound/>} />
    </R>
  )
}

export default Routes
