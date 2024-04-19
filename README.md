# Flatfile Headless Playground

## Development
Start by copying the `.env.example` file to `.env.prod` and fill in the values.

Then, run `npm install` to install the dependencies.

Finally, run `npm run dev:prod` to start the development server.

## Deploying
To deploy to platform.flatfile.com, run `npm run deploy:prod`. To deploy to a new agent, run `npm run deploy:prod -- -s <agent-name>`.
