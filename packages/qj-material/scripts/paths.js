const path = require('path')

const localPath = process.cwd()

module.exports = (arguments) => {
  return path.resolve(localPath, arguments)
}