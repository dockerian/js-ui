.PHONY: ng react vue

HOST ?= 0.0.0.0
PORT ?= 8080

# Set project variables
PROJECT := js-ui
GITHUB_REPO := js-ui
GITHUB_CORP := dockerian

# Set docker variables
DOCKER_USER := dockerian
DOCKER_NAME := $(PROJECT)
DOCKER_IMAG := $(DOCKER_USER)/$(DOCKER_NAME)
DOCKER_FILE ?= Dockerfile
DOCKER_DENV := $(wildcard /.dockerenv)
DOCKER_PATH := $(shell which docker)
DOCKER_PORT ?= $(PORT)

# Don't need to start docker in 2 situations:
ifneq ("$(DOCKER_DENV)","")  # assume inside docker container
	DONT_RUN_DOCKER := true
endif
ifeq ("$(DOCKER_PATH)","")  # docker command is NOT installed
	DONT_RUN_DOCKER := true
endif

# set to one of JavaScript framework folder options: ng, react, vue
JSF ?= vue
# prerequisite tool set
SYSTOOLS := awk egrep find grep jq node npm rm sort tee xargs zip
# set to docker/host hybrid script
MAKE_RUN := tools/run.sh
# set coverage report
COVERAGE := $(JSF)/coverage
COVERAGE_REPORT := $(JSF)/test/unit/coverage/lcov-report/index.html
# set debug mode
DEBUG ?= 1

ifeq ("$(JSF)","vue")
	COVERAGE := $(JSF)/coverage
	COVERAGE_REPORT := $(JSF)/coverage/lcov-report/index.html
else ifeq ("$(JSF)","react")
	COVERAGE := $(JSF)/coverage
	COVERAGE_REPORT := $(JSF)/coverage/lcov-report/index.html
else ifeq ("$(JSF)","ng")
	COVERAGE := $(JSF)/coverage
	COVERAGE_REPORT := $(JSF)/coverage/index.html
endif


check-tools:
	@echo ""
ifndef DONT_RUN_DOCKER
	PROJECT_DIR="$(PWD)" \
	JSF=$(JSF) HOST=$(HOST) PORT=$(PORT) \
	GITHUB_USER=$(GITHUB_CORP) GITHUB_REPO=$(GITHUB_REPO) \
	DOCKER_USER=$(DOCKER_USER) DOCKER_NAME=$(DOCKER_NAME) DOCKER_FILE="$(DOCKER_FILE)" \
	DOCKER_IMAG=$(DOCKER_IMAG) DOCKER_PORT=$(DOCKER_PORT) \
	$(MAKE_RUN) $@
else
	@echo "--- Checking for presence of required tools: $(SYSTOOLS)"
	$(foreach tool,$(SYSTOOLS),\
	$(if $(shell which $(tool)),$(echo "boo"),\
	$(error "ERROR: Cannot find '$(tool)' in system $$PATH")))
endif
	@echo ""
	@echo "- DONE: $@"


# clean targets
clean-cache clean:
	@echo ""
	@echo "-----------------------------------------------------------------------"
	@echo "Cleaning build ..."
	find . -name '.DS_Store' -type f -delete
	find . -name \*.bak -type f -delete
	find . -name \*.log -type f -delete
	find . -name \*.out -type f -delete
	@echo ""
	@echo "Cleaning up cache and config data ..."
	# find . -name coverage -type d -prune -exec rm -rf {} +
	rm -rf .cache
	@echo ""
	@echo "- DONE: $@"

clean-all: clean-cache
	@echo ""
ifeq ("$(DOCKER_DENV)","")
	# not in a docker container
	@echo "Cleaning up docker container and image ..."
	docker rm -f \
		$(shell docker ps -a|grep $(DOCKER_IMAG)|awk '{print $1}') \
		2>/dev/null || true
	docker rmi -f \
		$(shell docker images -a|grep $(DOCKER_IMAG) 2>&1|awk '{print $1}') \
		2>/dev/null || true
endif
	rm -rf docker_build.tee || true
	@echo ""
	@echo "Cleaning up test coverage data ..."
	rm -rf $(COVERAGE)
	# rm -rf vue/test/unit/coverage || true
	# rm -rf react/coverage || true
	# rm -rf ng/coverage || true
	@echo ""
	@echo "Cleaning up node_modules ..."
	find . -name node_modules -type d | xargs rm -rf
	npm cache clean --force || true
	@echo ""
	@echo "Cleaning up dist ..."
	rm -rf vue/dist || true
	rm -rf react/dist || true
	rm -rf ng/dist || true
	@echo ""
	@echo "- DONE: $@"

cloc:
	( cd $(JSF); cloc --exclude-dir=reports,node_modules,dist,coverage * )

codecov: SHELL := /bin/bash
codecov:
	bash <(curl -s https://codecov.io/bash) -t 3c3b0812-0def-4cfb-8c84-208057b84815

# docker targets
docker cmd: docker_build.tee
	@echo ""
ifeq ("$(DOCKER_DENV)","")
	# not in a docker container yet
	@echo `date +%Y-%m-%d:%H:%M:%S` "Start bash in container '$(DOCKER_IMAG)'"
	PROJECT_DIR="$(PWD)" \
	JSF=$(JSF) HOST=$(HOST) PORT=$(PORT) \
	GITHUB_USER=$(GITHUB_CORP) GITHUB_REPO=$(GITHUB_REPO) \
	DOCKER_USER=$(DOCKER_USER) DOCKER_NAME=$(DOCKER_NAME) DOCKER_FILE="$(DOCKER_FILE)" \
	DOCKER_IMAG=$(DOCKER_IMAG) DOCKER_PORT=$(DOCKER_PORT) \
	$(MAKE_RUN) $@
else
	@echo "env in the container:"
	@echo "-----------------------------------------------------------------------"
	@env | sort
	@echo "-----------------------------------------------------------------------"
endif
	@echo ""
	@echo "- DONE: $@"

docker_build.tee: $(DOCKER_FILE)
	@echo ""
ifeq ("$(DOCKER_DENV)","")
	# make in a docker host environment
	@echo `date +%Y-%m-%d:%H:%M:%S` "Building '$(DOCKER_IMAG)'"
	@echo "-----------------------------------------------------------------------"
	DOCKER_FILE=$(DOCKER_FILE) \
	DOCKER_IMAG=$(DOCKER_IMAG) DOCKER_PORT=$(DOCKER_PORT) \
	$(MAKE_RUN) docker | tee docker_build.tee
	@echo "-----------------------------------------------------------------------"
	@echo ""
	docker images --all | grep -e 'REPOSITORY' -e '$(DOCKER_IMAG)'
	@echo "......................................................................."
	@echo "- DONE: {docker build}"
	@echo ""
endif


docker-commit commit:
	@echo ""
ifneq ("$(DOCKER_DENV)","")
	@echo "Cannot commit inside the container"
else
	find . -name node_modules -type d -prune -exec rm -rf {} +
	docker cp . $(DOCKER_IMAG):/src/$(PROJECT)/
	docker commit $(DOCKER_IMAG) $(DOCKER_IMAG)
endif
	@echo ""
	@echo "- DONE: $@"


# default targets
build:
	@echo ""
ifndef DONT_RUN_DOCKER
	PROJECT_DIR="$(PWD)" \
	JSF=$(JSF) HOST=$(HOST) PORT=$(PORT) \
	GITHUB_USER=$(GITHUB_CORP) GITHUB_REPO=$(GITHUB_REPO) \
	DOCKER_USER=$(DOCKER_USER) DOCKER_NAME=$(DOCKER_NAME) DOCKER_FILE="$(DOCKER_FILE)" \
	DOCKER_IMAG=$(DOCKER_IMAG) DOCKER_PORT=$(DOCKER_PORT) \
	$(MAKE_RUN) $@
else
	@echo "Run build ..."
	cd "$(JSF)" && npm run build
endif
	@echo ""
	@echo "- DONE: $@"

install:
	( cd $(JSF); npm install )

lint:
	( cd $(JSF); npm run lint )

audit:
	( cd $(JSF) && npm audit )

audit-fix:
	( cd $(JSF) && npm audit fix)

ncu:
	( cd $(JSF) && ncu )

ncuu:
	( cd $(JSF) && ncu -u )

start run:
	@echo ""
ifndef DONT_RUN_DOCKER
	PROJECT_DIR="$(PWD)" \
	JSF=$(JSF) HOST=$(HOST) PORT=$(PORT) \
	GITHUB_USER=$(GITHUB_CORP) GITHUB_REPO=$(GITHUB_REPO) \
	DOCKER_USER=$(DOCKER_USER) DOCKER_NAME=$(DOCKER_NAME) DOCKER_FILE="$(DOCKER_FILE)" \
	DOCKER_IMAG=$(DOCKER_IMAG) DOCKER_PORT=$(DOCKER_PORT) \
	$(MAKE_RUN) $@
else
	@echo "Run start/serve ..."
	cd "$(JSF)" && npm start
endif
	@echo ""
	@echo "- DONE: $@"

start-dev run-dev dev:
	( cd $(JSF) && npm run dev )

start-prod run-prod prod:
	( cd $(JSF) && npm run prod )

# run/start targets for js frameworks
ng ng-start start-ng:
	@echo ""
ifndef DONT_RUN_DOCKER
	PROJECT_DIR="$(PWD)" \
	JSF=$(JSF) HOST=$(HOST) PORT=$(PORT) \
	GITHUB_USER=$(GITHUB_CORP) GITHUB_REPO=$(GITHUB_REPO) \
	DOCKER_USER=$(DOCKER_USER) DOCKER_NAME=$(DOCKER_NAME) DOCKER_FILE="$(DOCKER_FILE)" \
	DOCKER_IMAG=$(DOCKER_IMAG) DOCKER_PORT=$(DOCKER_PORT) \
	$(MAKE_RUN) $@
else
	@echo "Run test ..."
	cd ng && npm start
endif
	@echo ""
	@echo "- DONE: $@"

react react-start start-react:
	@echo ""
ifndef DONT_RUN_DOCKER
	PROJECT_DIR="$(PWD)" \
	JSF=$(JSF) HOST=$(HOST) PORT=$(PORT) \
	GITHUB_USER=$(GITHUB_CORP) GITHUB_REPO=$(GITHUB_REPO) \
	DOCKER_USER=$(DOCKER_USER) DOCKER_NAME=$(DOCKER_NAME) DOCKER_FILE="$(DOCKER_FILE)" \
	DOCKER_IMAG=$(DOCKER_IMAG) DOCKER_PORT=$(DOCKER_PORT) \
	$(MAKE_RUN) $@
else
	@echo "Run test ..."
	cd react && npm start
endif
	@echo ""
	@echo "- DONE: $@"

vue vue-start start-vue:
	@echo ""
ifndef DONT_RUN_DOCKER
	PROJECT_DIR="$(PWD)" \
	JSF=$(JSF) HOST=$(HOST) PORT=$(PORT) \
	GITHUB_USER=$(GITHUB_CORP) GITHUB_REPO=$(GITHUB_REPO) \
	DOCKER_USER=$(DOCKER_USER) DOCKER_NAME=$(DOCKER_NAME) DOCKER_FILE="$(DOCKER_FILE)" \
	DOCKER_IMAG=$(DOCKER_IMAG) DOCKER_PORT=$(DOCKER_PORT) \
	$(MAKE_RUN) $@
else
	@echo "Run test ..."
	cd vue && npm start
endif
	@echo ""
	@echo "- DONE: $@"

# testing targets
qt: lint
	( cd $(JSF); npm run unit )

e2e:
	@echo ""
ifndef DONT_RUN_DOCKER
	PROJECT_DIR="$(PWD)" \
	JSF=$(JSF) HOST=$(HOST) PORT=$(PORT) \
	GITHUB_USER=$(GITHUB_CORP) GITHUB_REPO=$(GITHUB_REPO) \
	DOCKER_USER=$(DOCKER_USER) DOCKER_NAME=$(DOCKER_NAME) DOCKER_FILE="$(DOCKER_FILE)" \
	DOCKER_IMAG=$(DOCKER_IMAG) DOCKER_PORT=$(DOCKER_PORT) \
	$(MAKE_RUN) $@
else
	@echo "Run e2e test ..."
	cd "$(JSF)" && npm run e2e
endif
	@echo ""
	@echo "- DONE: $@"

test:
	@echo ""
ifndef DONT_RUN_DOCKER
	PROJECT_DIR="$(PWD)" \
	JSF=$(JSF) HOST=$(HOST) PORT=$(PORT) \
	GITHUB_USER=$(GITHUB_CORP) GITHUB_REPO=$(GITHUB_REPO) \
	DOCKER_USER=$(DOCKER_USER) DOCKER_NAME=$(DOCKER_NAME) DOCKER_FILE="$(DOCKER_FILE)" \
	DOCKER_IMAG=$(DOCKER_IMAG) DOCKER_PORT=$(DOCKER_PORT) \
	$(MAKE_RUN) $@
else
	@echo "Run test ..."
	cd "$(JSF)" && npm test
endif
	@echo ""
	@echo "- DONE: $@"

test-coverage cover: test
	@echo ""
	@echo "- DONE: $@"

show:
	@echo ""
ifeq ("$(wildcard /.dockerenv)","")
	@echo "--- Opening $(COVERAGE_REPORT)"
ifeq ($(OS), Windows_NT) # Windows
	start "$(COVERAGE_REPORT)"
else ifeq ($(shell uname),Darwin) # Mac OS
	open "$(COVERAGE_REPORT)"
else
	nohup xdg-open "$(COVERAGE_REPORT)" >/dev/null 2>&1 &
endif
else
	@echo ""
	@echo "Cannot open test coverage in the container."
endif
	@echo ""
	@echo "- DONE: $@"
