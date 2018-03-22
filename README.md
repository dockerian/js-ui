# js-ui

Prototype Web UI by JavaScript Frameworks


<br/><a name="contents"></a>
## Contents

  - [Intro](#intro)
  - [Dev Setup](tools/README.md)
  - [Build, test, and run](#build-test-run)
  - [Deployment](#deploy)s


<a name="intro"><br/></a>
## Introduction

  This repository is created for learning and practice programming with the latest
  JavaScript library/frameworks to design, build, and deploy web console
  prototypes.


<a name="build-test-run"><br/></a>
## Build, test and run

  Prerequisite: [Node.js with npm](tools/README.md).

  **Note**: DO NOT run `npm install` on project root

  The `Makefile` has included `build`, `test`, `run` targets.
  For example, to build, simply change directory to the repository root and run

  ```
  make build
  ```

  or to run tests

  ```
  DONT_RUN_DOCKER=1 make test  # or `make qt` for quick without e2e test

  # or
  # (cd $JSF; npm i; npm run unit)  # only the 1st time; and here `JSF=vue`
  make unit
  ```

  and to start the app

  ```
  make run
  ```

  or to start the app in dev mode

  ```
  make dev
  ```


<a name="deploy"><br/></a>
## Deployment

&raquo; ***TBD***




<br/><div>
<a href="https://github.com/dockerian" style="text-decoration:none;"><img src="https://avatars.githubusercontent.com/u/22064108" style="border:0;height:50;width:50px;" height="50" alt="dockerian" border="0" title="Dockerian" align="right" valign="top" /></a>
</div>

&raquo; Back to <a href="#contents">Contents</a> &laquo;
