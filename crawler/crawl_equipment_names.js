const getUrl = require('./get_gamepedia_url')
const { getPageHtml, getMultiplePagesHtml } = require('./fetch_page_html')
const fs = require('fs')

const normalEquipment = [
  'Axe',
  'Chain Blades',
  'Hammer',
  'Sword',
  'War Pike'
]

const lanternEquipment = 'Lanterns'
const gunEquipment = 'Ostian_Repeaters'
const armorEquipment = 'Armor'

const genericNameGetter = ($, textReference) => {
  const names = []
  const table = $(`th:contains("${textReference}")`).parent().parent()
  table.find('tr').map((_, tr) => {
    const potentialName = $($(tr).children()[1]).text().replace(/(\r\n|\n|\r)/gm, "")
    if (potentialName !== 'Name') {
      names.push(potentialName)
    }
  })
  return names
}

const getNormalEquipmentNames = $ => genericNameGetter($, 'Perks')
const getLanterns = $ => genericNameGetter($, 'Instant Ability')

const getAllNames = async () => {
  const names = []

  getMultiplePagesHtml(normalEquipment.map(getUrl))
   .then(responses => responses.map(getNormalEquipmentNames))
   .then(nameLists => {
     nameLists.map((list, index) => {
       list.map(newName => names.push({name: newName, type: normalEquipment[index].toLowerCase()}))
     })
   })
 
  await getPageHtml(getUrl(armorEquipment))
    .then(getNormalEquipmentNames)
    .then(newNames => newNames.map(newName => names.push({name: newName, type: 'armor'})))

  await getPageHtml(getUrl(lanternEquipment))
    .then(getLanterns)
    .then(newNames => newNames.map(newName => names.push({name: newName, type: 'lantern'})))
  
  await getPageHtml(getUrl(gunEquipment))
    .then($ => ({
        barrels: genericNameGetter($, 'Unique Effects'),
        chambers: genericNameGetter($, 'Skillshot Ability'),
        grips: genericNameGetter($, 'Thrown Ability'),
        prisms: genericNameGetter($, 'Passive Bonus'),
    }))
    .then(r => {
       Object.entries(r).map(([equipmentSubtype, newNames]) => {
         newNames.map(newName => {
           names.push({name: newName, type: 'ostian repeaters', partType: equipmentSubtype})
          })
        })
      })

  return names
}

(async () => {
  const names = await getAllNames()
  fs.writeFileSync('names.json', JSON.stringify(names, null, 2))
})()