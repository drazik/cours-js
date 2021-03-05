const path = require("path")

module.exports = {
  process(src, filename, config, options) {
    console.log(src, filename)
    return `module.exports = ${JSON.stringify(src)}`
  }
}
