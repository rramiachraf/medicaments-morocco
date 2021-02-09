import express from 'express'

import { route as barcodeRoute } from './routes/barcode'
import { route as priceRoute } from './routes/price'

export const app = express()

app.use('/api', barcodeRoute)
app.use('/api', priceRoute)
