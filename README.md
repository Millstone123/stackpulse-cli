# stackpulse

A lightweight CLI that audits your Node.js project's dependency health — version
compatibility, known deprecations, and bundle weight — straight from your terminal.

## Requirements

- Node.js 18 or later
- npm 9+

## Setup

```bash
npm install
npm start -- audit
```

## Usage

```bash
# Audit current project
npm start -- audit

# Check a specific package
npm start -- check lodash

# Show environment info
npm start -- env
```

## Configuration

Optional `.stackpulse.json` in your project root:

```json
{
  "warnDeprecated": true,
  "maxAge": 365
}
```

## License

MIT
