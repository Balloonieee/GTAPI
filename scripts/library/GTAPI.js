import * as modules from './modules/import.js'
for(const module in modules) {
  export { module }
}

//export { modules }
