import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import os from 'os';
import kubectl from '../lib/k8s/index.js';
const program = new Command();

program
  .argument('<service>')
  .option('--config-path <filepath>', 'additional template data')
  .option('--config <json>', 'additional template data')
  .option('--dry-run', 'just dump the yaml')

program.parse(process.argv);
let {config, configPath, dryRun} =  program.opts();


if( config ) {
  config = JSON.parse(config);
}

if( configPath ) {
  if( !path.isAbsolute(configPath) ) {
    if( configPath.match(/^~/) ) {
      configPath = configPath.replace(/^~/, os.homedir());
    } else {
      configPath = path.resolve(process.cwd(), configPath);
    }
  }

  let data = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  if( config ) config = Object.assign(data, config);
  else config = data;
}


console.log(await kubectl.apply(program.args[0], config, dryRun));