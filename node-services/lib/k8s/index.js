import { exec } from 'child_process';
import { render } from './template.js';

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

  deleteSecret(name) {
    return this._exec(`kubectl delete secret ${name}`);
  }

  delete(type, service) {
    return this._exec(`kubectl delete ${type} ${service}`);
  }

  apply(service, config={}) {


    let yaml = render(service, config);

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