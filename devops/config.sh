
   
#! /bin/bash

######### DEPLOYMENT CONFIG ############
# Setup your application deployment here
########################################

# Grab build number is mounted in CI system
if [[ -f /config/.buildenv ]]; then
  source /config/.buildenv
else
  BUILD_NUM=-1
fi


# Main version number we are tagging the app with. Always update
# this when you cut a new version of the app!
APP_VERSION=$(git describe --tags --abbrev=0).${BUILD_NUM}


APACHE_TAG=2.4

##
# Repositories
##

GITHUB_ORG_URL=https://github.com/ucd-library

# VESSEL
REPO_NAME=pg-farm-k8s
REPO_URL=$GITHUB_ORG_URL/$REPO_NAME

##
# Container
##

# Container Registery
CONTAINER_REG_ORG=gcr.io/ucdlib-pubreg
CONTAINER_CACHE_TAG='latest'

if [[ ! -z $LOCAL_BUILD ]]; then
  CONTAINER_REG_ORG=localhost/dev
fi

# Container Images
NODE_SERVICE_IMAGE_NAME=$CONTAINER_REG_ORG/pg-farm-node-service

APACHE_IMAGE_NAME=httpd

ALL_DOCKER_BUILD_IMAGES=( $NODE_SERVICE_IMAGE_NAME )

ALL_DOCKER_BUILD_IMAGE_TAGS=( $NODE_SERVICE_IMAGE_NAME )
