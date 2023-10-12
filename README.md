# 🔒 Idempotency in Node.js API using Redis

Adds support for idempotency to an Express.js API using Redis. Idempotency guarantees are for the following scenarios:

1. When a duplicate request is fired sequentially.
2. When duplicate requests are fired parallelly.

## Getting started

### Pre-requisites

1. Node.js version >= 16
2. (Optional) Access to a remote (MongoDB Atlas) MongoDB database. Point to the desired database by updating the MONGODB_URL in your env file. Pointing to a local MongoDB server is also fine.
3. Redis should be installed. You can refer official installation documentation [here](https://redis.io/docs/getting-started/installation/).

## Installation

1. Run `npm install` to install the dependencies.
2. Source (or load) the `.env` file containing your MongoDB URL.
  - On macOS, you can do source .env to load environment variables. If it doesn't work, try replacing "source" with "." (for more information, refer [this](https://stackoverflow.com/questions/13702425/source-command-not-found-in-sh-shell)) or load the environment variables directly into the terminal.
3. Run `npm start` to start the server with nodemon.

## How to Use

To see idempotency in action, follow these steps:

1. Once the server is up and running, visit the following URL on your browser to ensure the API is up:

```
http://localhost:8201
```

2. Open another tab in your terminal and fire parallel duplicate requests by running the following command in your terminal:

```
node fire-parallel-requests.js
```

You would see only one of those 8 parallel duplicate requests will be able to successfully generate a short random slug, rest will fail.

You can visit this to confirm that redirection works:

```
http://localhost:8201/url/<SLUG>
```

3. Running the same utility again (without changing the `longURL` in the request payload) will return the same slug generated in the previous step.


🏁 This clarifies the following:

1. Firing parallel duplicate requests leads to one of them getting hold of an exclusive lock and generating a slug. This slug gets mapped to the provided longURL.
2. Firing the same request(s) again results in the same slug being returned.
