//Please do not read this, it's cheese 
  //of the highest quality.




  // Italian parmigiano.



const fs = require('fs')

const indexHtmlPath = './build/index.html'

const html = fs.readFileSync(indexHtmlPath).toString()
const staticizedHtml = html
  .replace(/\/bundle/g, './bundle')
  .replace(/\/favicon/g, './favicon')
  .replace(/crossorigin="anonymous"/g, '')
  .replace(/type="module">/g, '>')
  
  
fs.writeFileSync(indexHtmlPath, staticizedHtml)