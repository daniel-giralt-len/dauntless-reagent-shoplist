const crafting = require('./crafting.json')
const fs = require('fs')

const filters = new Set()
crafting.forEach(c => {
  c.partType
    ? filters.add(c.partType)
    : filters.add(c.type)
})
fs.writeFileSync('./filters.json', JSON.stringify([...filters], null, 2))