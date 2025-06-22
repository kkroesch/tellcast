@serve:
    npm run start:dev

@dbserver:
    podman run -it --rm --network host -v $PWD/db:/db \
        docker.io/surrealdb/surrealdb:latest \
        start --user root --pass root --bind 0.0.0.0:8000

@dbclient:
    podman run -it --rm \
        docker.io/surrealdb/surrealdb:latest \
            sql --conn http://host.containers.internal:8000 \
            --user root --pass root \
            --ns public --db tellcast

@fixtures:
    podman run -it --rm \
        docker.io/surrealdb/surrealdb:latest \
            sql --conn http://host.containers.internal:8000 \
            --user root --pass root \
            --ns public --db tellcast \
            < test/fixtures.sql
