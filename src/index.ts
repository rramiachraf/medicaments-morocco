import express from 'express'
import cors from 'cors'

import { route as barcodeRoute } from './routes/barcode'
import { route as priceRoute } from './routes/price'
import { route as providerRoute } from './routes/provider'

const routes = [barcodeRoute, priceRoute, providerRoute]

export const app = express()

app.use(cors({ origin: '*' }))

routes.forEach(route => app.use('/api', route))
