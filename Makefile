DATABASE_HOST ?= localhost
DATABASE_PORT ?= '3306'    
DATABASE_USER ?= root
DATABASE_PASSWORD ?= ''

test:
	@make test-unit
	@make test-integration

test-unit:
	npm run test

test-integration:
	npm run test:integration

test-watch:
	npm test:watch

dev: start-deps
	npm run dev

start-deps:
	docker-compose up -d db
	npm run typeorm migration:run -- -d src/application/configs/ormconfig.ts

stop-deps:
	docker-compose down
