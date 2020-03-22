const crafting = require('./crafting.json')
const fs = require('fs')

const filters = new Set()
crafting.forEach(c => {
  filters.add(c.type)
  c.partType && filters.add(c.partType)
})
fs.writeFileSync('./filters.json', JSON.stringify([...filters], null, 2))