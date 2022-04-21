import { Command } from 'commander';
import os from 'os';
import path from 'path';
import fs from 'fs-extra';
import YAML from 'yaml';
import uuid from 'uuid';
import kubectl from '../lib/k8s/index.js';
const program = new Command();

program
  .option('-d, --dir <dir>', 'use different dir than your home');

program.parse(process.argv);
const options = program.opts();


let dir = options.dir || os.homedir();
let tmpdir = path.join(process.cwd(), uuid.v4());


// await kubectl.createSecretFromFiles('minikube', path.join(dir, '.minikube'))
await fs.mkdirp(tmpdir);

let contents = YAML.parse(await fs.readFile(path.join(dir, '.kube', 'config'), 'utf-8'));
contents['current-context'] = 'minikube';

['clusters', 'contexts', 'users'].forEach(type => {
  if( contents[type] ) {
    contents[type] = contents[type].filter(item => item.name === 'minikube');
  }
});

(contents.clusters || []).forEach(item => {
  item.cluster['certificate-authority'] = '/root/.minikube/ca.crt'
});

(contents.users || []).forEach(item => {
  item.user['client-certificate'] = '/root/.minikube/profiles/minikube/client.crt';
  item.user['client-key'] = '/root/.minikube/profiles/minikube/client.key';
});

let tmpKubeConfFile = path.join(tmpdir, 'config');
await fs.writeFile(tmpKubeConfFile, YAML.stringify(contents));

await kubectl.createSecretFromFiles('kubeconf', tmpKubeConfFile, true);
await fs.remove(tmpdir);

await kubectl.createSecretFromFiles('minikube-profile-keys', [
  path.join(dir, '.minikube', 'profiles', 'minikube', 'client.crt'),
  path.join(dir, '.minikube', 'profiles', 'minikube', 'client.key')
], true);
await kubectl.createSecretFromFiles('minikube-ca', path.join(dir, '.minikube', 'ca.crt'), true);