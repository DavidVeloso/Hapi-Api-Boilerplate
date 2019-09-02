#!/bin/sh

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

if [ "$NODE_ENV" = "production" ] ; then
  npm start
else
  npm run dev
fi
