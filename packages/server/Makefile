DATABASE_HOST ?= localhost
DATABASE_PORT ?= '3306'    
DATABASE_USER ?= root
DATABASE_PASSWORD ?= ''

test:
	@make test-unit
	@make test-integration

test-unit:
	@npm run test

test-integration: stop-app start-deps
	@npm run test:integration
	@make stop-app

test-coverage: stop-app start-deps
	@npm run test:coveralls

test-watch:
	@npm test:watch

dev: start-deps
	@npm run build:core
	@npm run build
	@npm start

build-app:
	@docker-compose build

start-app: build-app start-deps
	@docker-compose up -d fboat-backend

start-deps:
	@docker-compose up -d db
	@make migrate-data

migrate-data: wait-db
	@echo 'Running migrations...'
	@npm run migration:test

wait-db:
	@until $$(docker-compose logs db | grep 'MySQL init process done. Ready for start up.' &> /dev/null); do \
		echo 'Waiting MySQL to become ready...'; \
		sleep 4; \
	done

stop-app:
	@docker-compose down
