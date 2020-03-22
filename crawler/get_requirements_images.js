const crafting = require('./crafting.json')
const getUrl = require('./get_gamepedia_url')
const { getPageHtml } = require('./fetch_page_html')
const rp = require('request-promise');
const fs = require('fs')

const downloadImage = (url,index) => {
  const optionsStart = {
    uri: url,
    method: 'GET',
    encoding: 'binary',
    headers: {
      'Content-type': 'image/png'
    }
  }
  rp(optionsStart)
    .then((body, data) => {
      let writeStream = fs.createWriteStream(index+'.png');
      console.log(body)
      writeStream.write(body, 'binary');
      writeStream.end();
    })
}

const reagentNames = crafting
  .map(c => c.crafting)
  .flat()
  .map(l => l.requirements)
  .flat()
  .reduce((acc, item) => {
    acc.add(item.name)
    return acc
  }, new Set())

const getReagentIcons = $ => {
  const iconUrls = $('li.gallerybox img').map((_, image) => $(image).attr('src')).get()
  iconUrls.forEach(downloadImage)
}

getPageHtml(getUrl('Category:Reagent_Icons'))
  .then(getReagentIcons)