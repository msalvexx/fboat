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
	@APP_ENV=test npm run typeorm migration:run -- -d src/main/configs/ormconfig.ts

stop-app:
	@docker-compose down
