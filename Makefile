.PHONY: test

install:
	yarn install

run:
	yarn start

test:
	yarn test

deploy:
	expo build:android

lint:
	yarn lint
