build-app:
	docker-compose build

up: build-app
	docker-compose up

down:
	docker-compose down
