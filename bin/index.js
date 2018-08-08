#!/usr/bin/env node

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

const fs = require('fs')
const cwd = process.cwd()
const tsConfigFile = 'tsconfig.json'
const projectTsConfig = cwd + '/' + tsConfigFile
const tsConfig = require(`../${tsConfigFile}`)

if (!fs.existsSync(projectTsConfig))
  fs.copyFileSync(`${__dirname}/../${tsConfigFile}`, cwd + `/${tsConfigFile}`)

require('tsconfig-paths').register({
  baseUrl: cwd + '/app',
  paths: tsConfig.compilerOptions.paths
})

require('ts-node').register({
  project: projectTsConfig
})

require('../server/index.ts')
