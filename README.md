# auvsisuas-client-node

[![Build Status](
    https://travis-ci.org/uavaustin/auvsisuas-client-node.svg?branch=master)](
    https://travis-ci.org/uavaustin/auvsisuas-client-node)
[![Code Climate](
    https://codeclimate.com/github/uavaustin/auvsisuas-client-node/badges/gpa.svg)](
    https://codeclimate.com/github/uavaustin/auvsisuas-client-node)
[![Test Coverage](
    https://codeclimate.com/github/uavaustin/auvsisuas-client-node/badges/coverage.svg)](
    https://codeclimate.com/github/uavaustin/auvsisuas-client-node/coverage)
[![npm](
    https://img.shields.io/npm/v/auvsisuas-client.svg)](
    https://www.npmjs.com/package/auvsisuas-client)

Promise-based communication library for the
[AUVSI SUAS Interoperability System](
http://auvsi-suas-competition-interoperability-system.readthedocs.io)

See the [documentation](https://uavaustin.github.io/auvsisuas-client-node/) for
more information.

## Installation

To develop the library locally, clone the library and run `npm install` to
fetch all dependencies and to transpile the source.

```sh
git clone https://github.com/uavaustin/auvsisuas-client-node
cd auvsisuas-client-node
npm install
```

## Testing

To run the tests, ensure [Docker](https://docs.docker.com/engine/installation/)
is installed and that your user has the right permissions for Docker (so you
don't have to type `sudo` all the time).

`npm test` will pull the interop server Docker image if needed, start it,
transpile the source, and then run the mocha tests when the server is up.

Note that `npm test` will not turn the server off when it is finished (this is
so you may look at the server and debug any problems then). When the test
command starts it will delete the old server if it is still there.
