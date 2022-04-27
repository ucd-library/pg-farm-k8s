import { exec } from 'child_process';
import { render } from './template.js';
import YAML from 'yaml';


class K8sUtils {

  async createSecretFromFiles(name, files, replace=false) {
    if( !Array.isArray(files) ) files = [files];

    if( replace ) {
      try {
        await this._exec(`kubectl delete secret ${name}`);
      } catch(e) {} 
    }

    return this._exec(`kubectl create secret generic ${name} ${files.map(file => '--from-file='+file).join(' ')}`);
  }

  async execCmd(service) {
    let {stdout, stderr} = await this._exec(`kubectl get pods -l app=${service} -o jsonpath='{.items[0].metadata.name}'`);
    return `kubectl exec --stdin --tty ${stdout} -- bash`
  }

  deleteSecret(name) {
    return this._exec(`kubectl delete secret ${name}`);
  }

  delete(service, type) {
    if( !type ) {
      type = (YAML.parse(render(service, {}))).kind;
    }

    return this._exec(`kubectl delete ${type} ${service}`);
  }

  apply(service, config={}, dryRun=false) {
    let yaml = render(service, config);
    if( dryRun === true ) return yaml;

    let cmd = `cat <<EOF | kubectl apply -f -
${yaml}
EOF`;
  
    return this._exec(cmd);
  }
  
  _exec(cmd) {
    return new Promise((resolve, reject) => {
      exec(cmd, {shell:'/bin/bash'}, (error, stdout, stderr) => {
        if( error ) reject(error);
        else resolve({stdout, stderr});
      });
    });
  }

}

const instance = new K8sUtils();
export default instance;