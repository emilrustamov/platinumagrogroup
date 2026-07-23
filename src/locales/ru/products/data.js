import { productsDataPart1 } from './data-part1.js'
import { productsDataPart2 } from './data-part2.js'
import { productsDataPart3 } from './data-part3.js'
import { productsDataPart4 } from './data-part4.js'

export const productsData = {
  items: {
    ...productsDataPart1,
    ...productsDataPart2,
    ...productsDataPart3,
    ...productsDataPart4
  }
}