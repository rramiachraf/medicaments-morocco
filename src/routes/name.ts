import { Router } from 'express'
import fetch from 'node-fetch'

const route = Router()

route.get('/name', async (req, res) => {
  try {
    switch (req.query.keyword) {
      case 'starts':
        const url = `https://medicament.ma/?choice=specialite&keyword=starts&s=${req.query.query}`
        const response = await fetch(url)
        const { status } = response
        if (status === 404) {
          throw new Error('Not found')
        }
        const html = await response.text()
        default:
            throw new Error('keyword can only be "starts" or "end"')
    }
  } catch (e) {}
})
