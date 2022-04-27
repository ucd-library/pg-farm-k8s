import { Command } from 'commander';
const program = new Command();

program
  .name('pgfarm')
  .version('0.0.1')
  .command('set-secrets [home]', 'set secret files from .minikube and .kube dirs')
  .command('apply <service>', 'apply a pg-farm service template')
  .command('delete <service>', 'delete a pg-farm service template')
  .command('exec <service>', 'get kubectl exec commond to pg-farm service.  Wrap in $() to exec.')


program.parse(process.argv);
