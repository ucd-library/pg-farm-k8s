#! /bin/bash

###
# Main build process to cutting production images
###

set -e
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $ROOT_DIR

source config.sh

REPO_HASH=$(git log -1 --pretty=%h)
REPO_BRANCH=$(git rev-parse --abbrev-ref HEAD)

##
# Harvest
##

docker build \
  -t $NODE_SERVICE_IMAGE_NAME:$APP_VERSION \
  --build-arg BUILDKIT_INLINE_CACHE=1 \
  --build-arg REPO_HASH=$REPO_HASH \
  --build-arg APP_VERSION=$APP_VERSION \
  --cache-from=$NODE_SERVICE_IMAGE_NAME:$CONTAINER_CACHE_TAG \
  ../node-services
