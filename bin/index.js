#!/usr/bin/env node

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'
process.env.NODE_PATH = process.cwd() + '/app'

const tsConfig = require('../tsconfig.json')

require('tsconfig-paths').register({
  baseUrl: process.cwd() + '/app',
  paths: tsConfig.compilerOptions.paths
})

require('ts-node').register()

require('../server/index.ts')
