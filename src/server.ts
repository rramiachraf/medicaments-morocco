import { app } from './'

const port = process.env.PORT || 8080

app.listen(port, () => {
  const { NODE_ENV } = process.env
  const env = NODE_ENV === 'production' ? '[PRODUCTION]' : '[DEVELOPMENT]'

  console.log(env, 'Server is up and running on', port)
})
