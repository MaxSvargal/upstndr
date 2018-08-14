#!/usr/bin/env node

const [ , , command ] = process.argv

if (!process.env.NODE_ENV) process.env.NODE_ENV = command || 'development'

const fs = require('fs')
const cwd = process.cwd()
const tsConfigFile = 'tsconfig.json'
const projectTsConfig = cwd + '/' + tsConfigFile

if (!fs.existsSync(projectTsConfig))
  fs.copyFileSync(`${__dirname}/../../src/app/${tsConfigFile}`, projectTsConfig)

require('tsconfig-paths').register({
  baseUrl: cwd  + '/app',
  paths: {
    '/': [ cwd + '/app' ]
  }
})

require('ts-node').register({
  project: projectTsConfig
})

require('../server')
