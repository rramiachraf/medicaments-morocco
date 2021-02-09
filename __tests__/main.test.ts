import request from 'supertest'

import { app } from '../src'

const data = {
  validBarCode: '6118000012726',
  invalidBarCode: '1234',
  validPrice: 25,
  invalidPrice: 20_000_000
}

test('get medicament infos using a valid barcode', done => {
  const { validBarCode } = data
  request(app)
    .get(`/api/barcode/${validBarCode}`)
    .expect(200)
    .end((err, res) => {
      if (err) throw err
      done()
    })
})

test('get medicament infos using an invalid barcode', done => {
  const { invalidBarCode } = data
  request(app)
    .get(`/api/barcode/${invalidBarCode}`)
    .expect(404)
    .end((err, { body }) => {
      if (err) throw err
      expect(body.error).toBe('Not found')
      done()
    })
})

test('search medicaments using a valid price', done => {
  const { validPrice } = data
  request(app)
    .get(`/api/price/${validPrice}`)
    .expect(200)
    .end((err, { body }) => {
      if (err) throw err
      expect(body.results).toBeGreaterThan(0)
      done()
    })
})

test('search medicaments using an invalid price', done => {
  const { invalidPrice } = data
  request(app)
    .get(`/api/price/${invalidPrice}`)
    .expect(200)
    .end((err, { body }) => {
      if (err) throw err
      expect(body.results).toBe(0)
      done()
    })
})
