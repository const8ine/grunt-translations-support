# grunt-translations-support
> i18n for Grunt

This solution is using [grunt-string-replace](https://www.npmjs.com/package/grunt-string-replace) plugin to replace all translation keys with their values.

Specify a translation key-value pair within the JSON file located at
**./source/i18n/en.locale.json**, <br>
and then utilize it within an HTML template by simply referencing the key using object notation:

```html
<h2>employeeInfo.editEmployee</h2>
```

will be compiled into

```html
<h2>Edit employee</h2>
```

## Environment Setup Before Installation

It's supposed that you have already passed these steps:

- Install [Node.js](https://nodejs.org/en/download/) (version 14 or above)
- I recommend you to use [Node Version Manager](https://github.com/nvm-sh/nvm)
- Install Grunt globally `npm install -g grunt-cli`

## Installation
Install all dependencies:

```bash
npm i
```

## Run and Build

```bash
grunt
```

## Node versions compatibility

Make sure your Node version is 14 or above (check with `node -v`) but a major version should be not higher than 15.
I recommend you to use Node Version Manager for working with different Node versions withing this mono repository.

```bash
nvm install 14
```

```bash
nvm use 14
```

```bash
npm i
```