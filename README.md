# Flatfile Headless Playground

## Development
Start by copying the `.env.example` file to `.env.prod` and fill in the values.

Then, run `ni` to install the dependencies.

Finally, run `nr dev:prod` to start the development server.

## Deploying
To deploy to platform.flatfile.com, run `nr deploy:prod`. To deploy to a new agent, run `nr deploy:prod -- -s <agent-name>`.
