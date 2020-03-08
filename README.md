# What's this

A simple comments service used at https://nicolasoga.com.ar to enable commenting on posts.

## Setup

You'll need PostgreSQL running on your machine. Configuration lives at `db/config.js`, just in case you need to tweak it.

~~~js
yarn install
npx sequelize db:create
npx sequelize db:migrate
yarn start
~~~

That should be it, enjoy!
