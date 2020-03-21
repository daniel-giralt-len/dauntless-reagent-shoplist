const fs = require('fs')
const getUrl = require('./get_gamepedia_url')
const { getPageHtml } = require('./fetch_page_html')
const equipmentNames = require('./names.json')

const levels = [ 'Base', 
'+1',  '+2',  '+3',
'+4',  '+5',  '+6',
'+7',  '+8',  '+9',
'+10', '+11', '+12',
'+13', '+14', '+15']

const noRequirementsKeywords = ['start', 'mastery', 'quest']
const getRequirements = text => {
  if(noRequirementsKeywords.some(kw => text.toLowerCase().includes(kw))){
    return []
  }
  return text.split(', ').map(resourceText => {
    try {
      return {
        name: resourceText.split('(x')[0].trim(),
        amount: parseInt(resourceText.split('(x')[1].split(')')[0])
      }
    } catch (error) {
      console.log('could not get requirements from:', text) 
      throw error
    }
  })
}

const getEquipmentResources = $ => {
  const resourceTable = []
  const table = $('th:contains("Crafting Requirements")').parent().parent()
  table.find('tr').map((i, tr) => {
    const tuple = {}
    if(i !== 0){
      $(tr).children().map((_, th) => {
        const text = $(th).text().trim()
        if(levels.includes(text)){
          tuple.level = text
        }else if(text.length > 0){
          tuple.requirements = getRequirements(text)
        }
      })
      resourceTable.push(tuple)
    }
  })
  return resourceTable
}

const promises = equipmentNames.map(equipment => {
  const {name, type} = equipment
  if(type !== 'lantern'){
    return getPageHtml(getUrl(name))
        .then(getEquipmentResources)
        .then(resources => ({...equipment, crafting: resources}))
        .catch(e=> console.log('error on', name, e.message))
  }
})

Promise.all(promises).then(data => fs.writeFileSync('./crafting.json', JSON.stringify(data, null, 2)))