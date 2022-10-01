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
	@npm run dev

build-app:
	@docker-compose build

start-app: build-app start-deps
	@docker-compose up -d fboat-backend

start-deps:
	@docker-compose up -d db
	@echo 'Waiting migrations to run...'
	@npm run migration:test

stop-app:
	@docker-compose down
