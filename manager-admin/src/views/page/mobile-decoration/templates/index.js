/**
 * Created by andste.cc@gmail.com on 2018/5/18.
 */

import './mask'

import common from './common'
import customs from './customs'

const templates = {
  ...common,
  ...customs
}

const templateArray = []
Object.keys(common).forEach(key => {
  if (common[key].dataTpl) templateArray.push(common[key].dataTpl)
})

// Object.keys(customs).forEach(key => {
//   templateArray.push({
//     key
//   })
// })

export { templateArray }
export default templates
