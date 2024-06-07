#!/bin/sh

set -e

yarn db:migrate

exec "$@"