import { app } from './'

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log('server is up and running on', port)
})