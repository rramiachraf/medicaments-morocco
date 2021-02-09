import { Router } from 'express'
import fetch from 'node-fetch'

import { getInfos } from '../response'

export const route = Router()

route.get('/barcode/:barcode', async (req, res) => {
  try {
    const { barcode } = req.params
    const url = `https://medicament.ma/?choice=barcode&s=${barcode}`
    const response = await fetch(url)
    const { status } = response
    if (status === 404) {
      throw new Error('Not found')
    }
    const html = await response.text()
    res.json(getInfos(html))
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
})
