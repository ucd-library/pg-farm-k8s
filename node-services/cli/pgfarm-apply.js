import { Command } from 'commander';
import os from 'os';
import path from 'path';
import kubectl from '../lib/k8s/index.js';
const program = new Command();

program
  .argument('<service>')
  .option('--config <json>', 'additional template data')

program.parse(process.argv);

let config = program.opts().config;
if( config ) config = JSON.parse(config);

console.log(await kubectl.apply(program.args[0], config));