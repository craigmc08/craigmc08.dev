# templates
This is the documentation for my custom templating solution.

## Contents
1. [Basics](#basics)
2. [Multi-page Output](#multi-page-output)
3. [Inline Markdown](#inline-markdown)
4. [Bad Things](#bad-things)

## Basics
The build-script finds all `.mustache` files in the `templates` directory and renders them. The view for each template is retrieved from the `.json` file with the same name as the template in the `templates` directory.

Example:

`templates/simple.mustache`
```html
<h1>{{title}}</h1>
<p>Hello, {{name}}!</p>
```

`templates/simple.json`
```json
{
    "title": "Salutations",
    "name": "World"
}
```

Output (`dist/simple.html`):
```html
<h1>Salutations</h1>
<p>Hello, World!</p>
```

## Multi-page Output
It is possible to generate multiple output `.html` files from a single template file. To do this, add set the `"multiFile"` attribute at the root of the view file to `true`. Add the `"views"` array, containing a `"name"` attribute with the name of the output file and a `"view"` attribute containing the view for this file.

Example:

`templates/multifile.mustache`
```html
<p>Hello, {{name}}!</p>
```

`templates/multifile.json`
```json
{
    "multiFile": true,
    "views": [
        {
            "name": "hello-world",
            "view": { "name": "World" }
        },
        {
            "name": "hello-craig",
            "view": { "name": "Craig" }
        }
    ]
}
```

Output:

`dist/hello-world.html`
```html
<p>Hello, World!</p>
```

`dist/hello-craig.html`
```html
<p>Hello, Craig!</p>
```

## Inline Markdown
The template renderer has support for markdown. To use it, you link a markdown file in the view. On the property where you want the rendered text, set the value to `{ "renderMarkdownFile": "path/to/markdown/file.md" }`.

Example:

`templates/markdown.mustache`
```html
{{content}}
```

`templates/markdown.json`
```json
{
    "content": { "renderMarkdownFile": "templates/markdown.md" }
}
```

`templates/markdown.md`
```md
# Markdown rendering
Contains support for *rendering* all **sorts** of [markdown](https://en.wikipedia.org/wiki/Markdown).
```

Output (`dist/markdown.html`):
```html
<h1 id="markdown-rendering">Markdown rendering</h1>
<p>Contains support for <i>rendering</i> all <b>sorts</b> of <a href="https://en.wikipedia.org/wiki/Markdown">markdown</a>.
```

## Bad Things
Right now, there is no way to have rendered files be nested in directories. It may be possible with multi-file renders by adding the directory to the `name` attribute of each view.