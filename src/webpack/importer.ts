import fs from 'fs'

export default (configName: string) =>
  fs.existsSync(`${process.cwd()}${configName}`)
    ? require(`${process.cwd()}/${configName}`).default
    : require(`../webpack/${configName}`).default
