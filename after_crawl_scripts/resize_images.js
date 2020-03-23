const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const baseInput = './big_images'
const baseOutput = './src/assets'

const imageTypes = [
  { subPath: './equipment', size: [50,50] },
  { subPath: './reagents', size: [30,30]},
]

imageTypes.forEach(({subPath, size}) => {
      fs.readdirSync(path.resolve(baseInput, subPath))
        .forEach(fileName => sharp(path.resolve(baseInput, subPath, fileName))
          .resize(...size)
          .toFile(path.resolve(baseOutput, subPath, fileName))
      )
})


sharp(path.resolve(baseInput, 'background/background_image.jpg'))
  .resize(1920,1080)
  .toFile(path.resolve(baseOutput, 'background/background_image.jpg'))

sharp(path.resolve(baseInput, 'background/background_image.jpg'))
  .resize(1000,1080)
  .toFile(path.resolve(baseOutput, 'background/background_image_small.jpg'))