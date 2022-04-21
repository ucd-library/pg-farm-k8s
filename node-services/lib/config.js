const env = process.env;

const config = {

  services : {

    farm : {
      host : env.PG_FARM_SERVICE_HOST || 'pg-farm',
      port : env.PG_FARM_SERVICE_PORT || 3000
    },

    pg : {
      port : env.PG_SERVICE_PORT || 3000
    },

    apache : {
      host : env.PG_FARM_SERVICE_HOST || 'apache',
      port : env.PG_FARM_SERVICE_PORT || 3000
    }

  },





  k8s : {

    default : {
      limits : {
        memory: "100Mi",
        cpu: "500m"
      },
      requests : {
        memory : '64Mi',
        cpu : '100m'
      }
    },

    pg : {
      image : 'postgres:14',
      port : 5432,
      limits : {
        memory: "2Gi",
        cpu: "1"
      },
      requests : {
        memory : '64Mi',
        cpu : '100m'
      },
      storageSize : '25Gi'
    },

    postgrest : {
      image : {
        name : 'postgrest/postgrest',
        tag : 'v6.0.2'
      },
      environment : {
        PGRST_DB_URI : 'postgres://${PGR_USER_PASSWORD}@localhost:5432/${PGR_DATABASE}',
        PGRST_DB_SCHEMA : '${PGR_SCHEMA}',
        PGRST_DB_ANON_ROLE : '${PGR_ANON_ROLE}'
      }
    }


  }
}

export default config;