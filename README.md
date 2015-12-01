[![Build Status](https://travis-ci.org/marshallswain/file-droplet.svg?branch=master)](https://travis-ci.org/marshallswain/file-droplet)
[![npm version](https://badge.fury.io/js/file-droplet.svg)](https://badge.fury.io/js/file-droplet)

# A CanJS Component that enables live-bound file drag-and-drop-ability to its contents.

[![NPM](https://nodei.co/npm/file-droplet.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/file-droplet/)

## Installation
```
npm install file-droplet --save
```

You can use any of the builds in the dist folder to meet your project needs.

Using CanJS's built-in support for StealJS, you can now import the module directly inside your templates.  For example:
```html
<can-import from="file-droplet"/>

<file-droplet>
  <h2>List of Files</h2>
  <ul>
    {{#each files}}
      <li>
        <span>{{name}}</span>
        <span>{{extension}}</span>
      </li>
    {{/each}}
  </ul>

  <h2>List of Extensions</h2>
  <ul>
    {{#each fileTypes}}
      <li>
        <!-- %key is the file extension. -->
        {{%key}}

        <ul>
          {{#each .}}
            <li>
              <span>{{name}}</span>
              <span>{{extension}}</span>
            </li>
          {{/each}}
        </ul>
      </li>
    {{/each}}
  </ul>
</file-droplet>
```

![file-droplet component demonstration](http://www.gfycat.com/PossibleDisgustingBlackbuck)

## Usage
The file-droplet component is meant to be used as a wrapper for content in your stache templates.  It will allow you to drag and drop files inside its borders and provides live-bound attributes that you can utilize to list and process files.  A couple of possible use cases include a file-upload component or the [file-router](https://www.npmjs.com/package/file-router) component.  See the API, below, for the list of attributes that you can use.

It comes with a single style: `file-droplet {display: inline-block;}`, so it won't get in the way of your design.

## API

- `files`: The master list of files.  As you continue to drop more files, this list will grow.
- `fileTypes`: An object keyed by file extension.  Each key will contain the list of all files with that extension.  Files without an extension will be available on the `other` key.
- `batches`: Each time a file drop occurs, an array of files is created, whether it was one file or many.  The `batches` property is an array that contains the list of each dropped batch.
- `lastFileBatch`: This is a virtual property that will return the last batch in the `batches` list.


### Options:

There are currently no configurable options.


## Contributing
Pull requests are welcome.

## Authors

- [Marshall Thompson](https://github.com/marshallswain)

[![Built with StealJS](./dist/build-with-stealjs.jpg)](http://StealJS.com)

