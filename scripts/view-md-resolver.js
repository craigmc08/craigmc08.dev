const Marked = require('marked');
const fs = require('fs');

function ResolveMarkdownReference(markdownReference) {
    return new Promise((resolve, reject) => {
        fs.exists(markdownReference, exists => {
            if (!exists) return reject(`Markdown file ${markdownReference} does not exist.`);

            fs.readFile(markdownReference, 'utf8', (err, markdown) => {
                if (err) return reject(err);

                const html = Marked(markdown);
                resolve(html);
            });
        });
    });
}

async function RecursiveResolver(view) {
    const isObject = typeof view === 'object';
    const markdownReference = view.renderMarkdownFile;

    if (isObject && !markdownReference) {
        const keys = Object.keys(view);
        const props = keys.map(key => view[key]);
        const resolvedProps = await Promise.all(props.map(RecursiveResolver));
        const resolvedView = {};
        resolvedProps.forEach((prop, i) => resolvedView[keys[i]] = prop);
        return resolvedView;
    } else if (markdownReference) {
        return ResolveMarkdownReference(markdownReference);
    } else return view;
}

/**
 * Converts mustache view file custom "markdown references" to rendered html
 * @param {Object} view - The mustache view
 * @returns {Promise} The view with resolved markdown fields
 */
async function ResolveView(view) {
    const resolved = await RecursiveResolver(view);
    return resolved;
}
module.exports = ResolveView;