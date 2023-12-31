# Payment-Processor API

This is a mock receipt processor API built with NodeJs and Express.

## Installation

In order to start the application first open your terminal and use the following command to clone the application to your machine.

```bash
git clone https://github.com/ShahmarAliyev/receipt-processor.git
```

Once you have the repository on your machine, go to the directory of that repo.

## Usage

In order to spin up the express API use the following command

```bash
docker build . -t shahmar/node-web-app
```

This command is gonna run the tests and build the image.

In order to run the application run the following command and the application is gonna start at [http://localhost:5500/](http://localhost:5500/)

```bash
docker run -p 5500:5500 -d shahmar/node-web-app
```
