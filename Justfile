@serve:
    npm run start:dev

@dbserver:
    podman run --rm --network host \
        -p 8000:8000 \
        surrealdb/surrealdb:latest start --user root --pass root --bind 0.0.0.0:8000 --log debug

@dbclient:
    podman run -it --rm \
        docker.io/surrealdb/surrealdb:latest \
            sql --conn http://host.containers.internal:8000 \
            --user root --pass root \
            --ns public --db tellcast
