import { Command } from 'commander';
const program = new Command();

program
  .name('pgfarm')
  .version('0.0.1')
  .command('set-secrets [home]', 'set secret files from .minikube and .kube dirs')
  .command('apply <service>', 'apply a service template')

program.parse(process.argv);
