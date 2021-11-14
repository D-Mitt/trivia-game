const express = require('express');
const app = express()
const port = 5000

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  console.log(`Production ready`)
  app.use(express.static("client/build"));
}

app.listen(process.env.PORT || port, () => {
  console.log(`Server started!`)
})