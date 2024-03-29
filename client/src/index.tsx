import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./components/App"
import { store } from "./store/store"
import "./stylesheets/index.css"

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
)
