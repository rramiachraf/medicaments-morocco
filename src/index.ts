import express from 'express'
import cors from 'cors'

import { route as barcodeRoute } from './routes/barcode'
import { route as priceRoute } from './routes/price'

export const app = express()

app.use(cors({ origin: '*' }))

app.use('/api', barcodeRoute)
app.use('/api', priceRoute)
