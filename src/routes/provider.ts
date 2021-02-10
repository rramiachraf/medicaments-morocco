import { Router } from 'express'
import fetch from 'node-fetch'

import { resultsPage } from '../helpers/response'

export const route = Router()

route.get('/provider/:providerID', async (req, res) => {
  try {
    const { page } = req.query
    const { providerID } = req.params
    const url =
      Number(page) > 0
        ? `https://medicament.ma/page/${page}?choice=fournisseur&s=${providerID}`
        : `https://medicament.ma/?choice=fournisseur&s=${providerID}`
    const response = await fetch(url)
    const { status } = response
    if (status === 404) {
      throw new Error('Not found')
    }
    const html = await response.text()
    res.json(resultsPage(html))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})
