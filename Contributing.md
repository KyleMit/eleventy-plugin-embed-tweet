# Package Maintenance Info

Info for local developers to get the package up and running locally and publish it live

## Run package locally

1. In current package directory run `npm link`

   ```bash
   npm link
   ```

2. In the directory you want to consume the package, run the following:

   ```bash
   npm link eleventy-plugin-embed-tweet
   ```

## Deployment

### Project Setup

```bash
npm config set scope kylemit
npm config set access public
```

### User Setup


#### Login to npm using either of the methods

**A) Login to npm**

```bash
npm login
```

or

**B) For [multiple accounts](https://stackoverflow.com/a/50130282/1366033)**

Add `.npmrc` file in the current directory with the following info:

```ini
//registry.npmjs.org/:_authToken=***
```

### Publish Package

Revision version number in `package.json`

```bash
npm publish --access public
```
