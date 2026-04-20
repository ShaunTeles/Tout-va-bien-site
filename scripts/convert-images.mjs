import sharp from 'sharp'
import { readdir } from 'fs/promises'
import { join } from 'path'

const INPUT_DIR = './public/images'
const LARGE_PNGS = [
  '1-Cafe-interior.png',
  'cafe-detail.png',
  'coffee-pour.png',
  'Book-Fan.png',
  'white-coffee-of-the-day.png',
]

for (const filename of LARGE_PNGS) {
  const input = join(INPUT_DIR, filename)
  const output = join(INPUT_DIR, filename.replace('.png', '.webp'))
  await sharp(input)
    .webp({ quality: 82 })
    .toFile(output)
  console.log(`Converted ${filename}`)
}
