import express from 'express';
const app = express()
const port = 5000

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})