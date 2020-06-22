ARG NODE_VERSION=14.4.0

# NOTE: `ARG`s are reset after `FROM`
FROM node:$NODE_VERSION-alpine

ARG GITHUB_REPO=github.com/dockerian/js-ui
MAINTAINER Jason Zhu <jason.zhuyx@gmail.com>
LABEL maintainer="jason.zhuyx@gmail.com"
LABEL organization="Dockerian"
LABEL project="JS UI"

RUN apk update \
 && apk upgrade \
 && apk add --no-cache --virtual .build-deps \
    bash make jq tree tar zip \
    net-tools \
    dumb-init \
    chromium \
    chromium-chromedriver \
    openjdk11-jre \
 && java -version && echo `which java` \
 && rm -rf /var/lib/apt/lists/* \
 && rm /bin/sh && ln -sf /bin/bash /bin/sh \
 && echo "export PS1='\n\u@\h \w [\#]:\n\$ ' " >> ~/.bashrc \
 && echo "alias ll='ls -al'" >> ~/.bashrc \
 && echo "alias chd='chromedriver --port=4444 --whitelisted-ips=127.0.0.1'" >> ~/.bashrc \
 && echo "" >> ~/.bashrc

ENV PROJECT=js-ui \
    PROJECT_DIR=/src/js-ui \
    SHELL=/bin/bash

WORKDIR $PROJECT_DIR

EXPOSE 8080

# ENTRYPOINT ["/bin/bash", "-c"]

CMD ["/bin/bash"]
