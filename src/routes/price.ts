import { Router } from 'express'
import fetch from 'node-fetch'

import { getSearches } from '../response'

export const route = Router()

route.get('/price/:price', async (req, res) => {
  try {
    const { price } = req.params
    const url = `https://medicament.ma/?choice=price&s=${price}`
    const response = await fetch(url)
    const { status } = response
    if (status === 404) {
      throw new Error('Not found')
    }
    const html = await response.text()
    res.json(getSearches(html))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})
