# Flatfile Headless Playground

This is a TypeScript playground for experimenting with [Flatfile](https://flatfile.com) listeners. This project includes
a simple listener that can easily be extended to include your own custom logic. The project is configured to be used in
multiple environments by selecting the appropriate environment. This can be modified to your use case by adding or removing
`.env.*` files and updating the `package.json` scripts.

## Project Structure

```
src/
├── index.ts                   # Main listener configuration
└── blueprints/
    ├── index.ts               # Blueprint exports
    └── sheets/
        ├── contacts.ts        # Contact sheet configuration
        └── [sheet-name].ts    # Another sheet configuration
```

## Setup

### Prerequisites

- [Bun](https://bun.sh) runtime
- Flatfile account and API credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/carlbrugger/flatfile-headless-playground.git
cd flatfile-headless-playground
```

2. Install dependencies:
```bash
bun install
```

3. Configure environment variables:
```bash
# Create environment files for each environment
cp .env.example .env.local
cp .env.example .env.staging  
cp .env.example .env.prod
```

4. Fill in your Flatfile credentials in the appropriate `.env` files.

## Development

### Local Development
```bash
bun run dev:local
```

### Staging Environment
```bash
bun run dev:staging
```

### Production Environment
```bash
bun run dev:prod
```

## Deployment

### Deploy to Flatfile Platform

```bash
# Deploy to default agent
bun run deploy:prod

# Deploy to specific agent
bun run deploy:prod -- -s <agent-name>
```

### Environment-Specific Deployment

```bash
# Local environment
bun run deploy:local

# Staging environment
bun run deploy:staging

# Production environment
bun run deploy:prod
```

## Available Scripts

### Agent Development
- `bun run dev` - Start development server
- `bun run dev:local` - Start with local environment
- `bun run dev:staging` - Start with staging environment
- `bun run dev:prod` - Start with production environment

### Agent Deployment
- `bun run deploy` - Deploy to Flatfile platform
- `bun run deploy:local` - Deploy with local environment
- `bun run deploy:staging` - Deploy with staging environment
- `bun run deploy:prod` - Deploy with production environment

### Agent Management
- `bun run list` - List deployed agents
- `bun run delete` - Delete deployed agent

### Code Quality
- `bun run check:all` - Run all checks (format, lint, types)
- `bun run check:format` - Check code formatting
- `bun run check:lint` - Run linting
- `bun run check:types` - Type checking
- `bun run fix:all` - Auto-fix all issues
- `bun run fix:format` - Auto-fix formatting
- `bun run fix:lint` - Auto-fix linting issues

### Dependency Management
- `ncu` - Check for updates to dependencies
- `ncu -u` - Update dependencies to the latest versions
- `bun install` - Install the updated dependencies

## Dependencies

### Core Dependencies
- `@flatfile/api` - Flatfile API client
- `@flatfile/listener` - Event listener framework
- `@flatfile/plugin-record-hook` - Data validation plugin
- `@flatfile/plugin-space-configure` - Space configuration plugin
- `@flatfile/plugin-xml-extractor` - XML processing plugin
- `flatfile` - CLI tool

### Development Tools
- `@biomejs/biome` - Code formatting and linting
- `@dotenvx/dotenvx` - Environment variable management
- `typescript` - TypeScript compiler
- `@total-typescript/tsconfig` - TypeScript configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `bun run check:all` to ensure code quality
5. Submit a pull request

## License

ISC License - see package.json for details

## Author

Carl Brugger
