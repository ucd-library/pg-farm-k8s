import { Command } from 'commander';
import kubectl from '../lib/k8s/index.js';
const program = new Command();

program
  .argument('<service>')
  .parse(process.argv);

console.log(await kubectl.execCmd(program.args[0]));