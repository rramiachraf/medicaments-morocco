import request from 'supertest'

import { app } from '../src'

const data = {
  validBarCode: '6118000012726',
  invalidBarCode: '1234',
  validPrice: 25,
  invalidPrice: 20_000_000,
  validProvider: 10906,
  invalidProvider: 1
}

test('get medicament infos using a valid barcode', done => {
  request(app)
    .get(`/api/barcode/${data.validBarCode}`)
    .expect(200)
    .end((err, res) => {
      if (err) throw err
      done()
    })
})

test('get medicament infos using an invalid barcode', done => {
  request(app)
    .get(`/api/barcode/${data.invalidBarCode}`)
    .expect(404)
    .end((err, { body }) => {
      if (err) throw err
      expect(body.error).toBe('Not found')
      done()
    })
})

test('search medicaments using a valid price', done => {
  request(app)
    .get(`/api/price/${data.validPrice}`)
    .expect(200)
    .end((err, { body }) => {
      if (err) throw err
      expect(body.results).toBeGreaterThan(0)
      done()
    })
})

test('search medicaments using an invalid price', done => {
  request(app)
    .get(`/api/price/${data.invalidPrice}`)
    .expect(200)
    .end((err, { body }) => {
      if (err) throw err
      expect(body.results).toBe(0)
      done()
    })
})

test('search medicaments using a valid provider', done => {
  request(app)
    .get(`/api/provider/${data.validProvider}`)
    .expect(200)
    .end((err, { body }) => {
      if (err) throw err
      expect(body.results).toBeGreaterThan(0)
      done()
    })
})

test('search medicaments using an invalid provider', done => {
  request(app)
    .get(`/api/provider/${data.invalidProvider}`)
    .expect(200)
    .end((err, { body }) => {
      if (err) throw err
      expect(body.results).toBe(0)
      done()
    })
})
