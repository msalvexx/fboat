test:
	@make test-unit
	@make test-integration

test-unit:
	npm run test

test-integration:
	npm run test:integration

test-watch:
	npm test:watch
