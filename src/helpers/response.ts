import cheerio = require('cheerio')

export const medicamentPage = (html: string) => {
  const $ = cheerio.load(html)
  const medicament = $('.single.single-medicament > h3').text()
  const presentation = $('tr.field-presentation > .value').text()
  const princeps = $('tr.field-princeps > .value').text()
  const distributeur = $('tr.field-distributeur > .value').text()
  const composition = $('tr.field-composition > .value').text()
  const famille = $('tr.field-famille > .value').text()
  const statut = $('tr.field-statut > .value').text()
  const atc = $('tr.field-atc > .value').text()
  const ppv = $('tr.field-ppv > .value').text().replace(' dhs', '')
  const prix_hospitalier = $('tr.field-prix_hospitalier > .value')
    .text()
    .replace(' dhs', '')
  const rembourssement = $('tr.field-rembourssement > .value').text()
  const base_rembourssement = $('tr.field-base_rembourssement > .value')
    .text()
    .replace(' dhs', '')
  const tableau = $('tr.field-tableau > .value').text()
  const particularite = $('tr.field-particularite > .value').text()
  const nature_produit = $('tr.field-nature_produit > .value').text()
  return {
    medicament,
    presentation,
    princeps,
    distributeur,
    composition,
    famille,
    statut,
    atc,
    ppv: Number(ppv),
    prix_hospitalier: Number(prix_hospitalier),
    rembourssement,
    base_rembourssement: Number(base_rembourssement),
    tableau,
    particularite,
    nature_produit
  }
}

export const resultsPage = (html: string) => {
  const $ = cheerio.load(html)
  const results = $('.bg-info > strong').text()
  let items: any[] = []
  $('.table.table-striped.table-hover.table-mobile > tbody > tr > td > a').each(
    (i, el) => {
      const item = $(el)
      const url = item.attr('href')?.replace('https://medicament.ma', '')
      const ppv = item
        .children('.details')
        .children()
        .text()
        .split('- PPV: ')[1]
      const medicament = item
        .children('.details')
        .html()
        ?.split('<br>')[0]
        .trim()
      const presentation = item
        .children('.details')
        .children()
        .text()
        .split(' -')[0]
      items = [
        ...items,
        { medicament, presentation, ppv: parseFloat(ppv), url }
      ]
    }
  )

  return {
    results: Number(results),
    items
  }
}
