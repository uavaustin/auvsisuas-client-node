#!/bin/sh

# Pull the docker image from Docker Hub
pull_interop() {
    docker pull auvsisuas/interop-server
}

# Create a new interop server named "interop-test" and run it in the
# background
create_interop() {
    delete_interop
    docker run -itd -p 8080:80 --name interop-server auvsisuas/interop-server
}

# Delete the interop server
delete_interop() {
    docker rm --force interop-server
}

# Wait until the login page of the interop server is accessible
wait_for_interop() {
    tries=0
    max_tries=20

    until $(curl --output /dev/null --silent --head --fail \
            http://localhost:8080/admin/login/?next=/); do
        sleep 5
        tries=$((tries+1))

        if [ $tries -gt $max_tries ]; then
            echo "tried too many times... giving up"
            exit 1
        fi

        echo "waiting for server to start..."
    done

    echo "started"
}

operation=$1

if [ $operation = "pull" ]; then
    pull_interop
elif [ $operation = "create" ]; then
    create_interop
elif [ $operation = "delete" ]; then
    delete_interop
elif [ $operation = "wait" ]; then
    wait_for_interop
else
    echo "Unknown command"
    echo "Valid commands are:"
    echo "    pull  create  delete  wait"
    exit 1
fi

exit $?
