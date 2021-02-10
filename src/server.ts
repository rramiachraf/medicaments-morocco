import { app } from './'

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(
    `${
      process.env.NODE_ENV === 'production'
        ? '[PRODUCTION]'
        : '[DEVELOPMENT]'
    }`,
    'Server is up and running on',
    port
  )
})
