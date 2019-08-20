Tokenary is a library I built for parsing text in JavaScript. The picture above shows the code for a JSON tokenizer, which breaks raw json text into objects representing the different types of syntax is JSON (ex. strings, numbers, brackets).

The library can be found as a package on npm [here](https://npmjs.org/package/tokenary), where an example of a CSV tokenizer can be found.

I wrote this library because I wanted to be able to quickly write tokenizers/parsers for syntax highlighting for various programming languages (which I will eventually use on this website). It was a fun exercise to build a library like this, from designing the API of it to implementing the technical details.
