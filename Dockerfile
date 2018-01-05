FROM node:latest

ARG GITHUB_REPO=github.com/dockerian/js-ui
MAINTAINER Jason Zhu <jason.zhuyx@gmail.com>
LABEL maintainer="jason.zhuyx@gmail.com"
LABEL organization="Dockerian"
LABEL project="JS UI"

RUN apt-get update \
 && apt-get upgrade -y \
 && apt-get install -y --no-install-recommends \
    bash make jq tree tar zip \
    net-tools \
 && rm -rf /var/lib/apt/lists/* \
 && rm /bin/sh && ln -sf /bin/bash /bin/sh \
 && echo "export PS1='\n\u@\h \w [\#]:\n\$ ' " >> ~/.bashrc \
 && echo "alias ll='ls -al'" >> ~/.bashrc \
 && echo "" >> ~/.bashrc

ENV PROJECT=js-ui \
    PROJECT_DIR=/src/js-ui \
    SHELL=/bin/bash

WORKDIR $PROJECT_DIR

EXPOSE 8080

# ENTRYPOINT ["/bin/bash", "-c"]

CMD ["/bin/bash"]
