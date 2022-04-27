local development

set the .config file for folders to mount

example:

```
{
  "image" : "local/dev/pg-farm-node-service:local",
  "dev" : {
    "dirs" : [
      {
        "name" : "lib",
        "hostPath" : "/dev/library/dds/pg-farm-k8s/node-services/lib",
        "containerPath" : "/service/lib"
      },
      {
        "name" : "cli",
        "hostPath" : "/dev/library/dds/pg-farm-k8s/node-services/cli",
        "containerPath" : "/service/cli"
      },
      {
        "name" : "package-json",
        "hostPath" : "/dev/library/dds/pg-farm-k8s/node-services/package.json",
        "containerPath" : "/service/package.json"
      }
    ]
  }
}
```

Note, hostPath is relative to your home directory, if using example `minikube mount` step below.

to mount fs
run `minikube mount $HOME:/hosthome`

to build docker
`eval $(minikube docker-env)`
then run build in terminal