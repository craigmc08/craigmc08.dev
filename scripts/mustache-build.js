const Mustache = require('mustache');
const globby = require('globby');
const fs = require('fs');
const MarkdownViewResolver = require('./view-md-resolver');

const templates = globby.sync('templates/*.mustache');

const templateToView = template => template.replace('.mustache', '.json');
const templateToOutput = template => template.replace(/templates(?:\/|\\)|\.mustache/g, '');

const partials = LoadPartials();

async function ResolveView(view) {
    const markdownResolved = await MarkdownViewResolver(view);
    return markdownResolved;
}

function LoadPartials() {
    const partialFiles = globby.sync('templates/partials/*.mustache');
    const partials = partialFiles.map(partialFile => {
        const text = fs.readFileSync(partialFile, 'utf8');
        return {
            name: partialFile.match(/^(?:[\w_-]+\/)*([\w_-]+)\.mustache$/)[1],
            text,
        };
    });
    const partialObject = {};
    partials.forEach(({name, text}) => partialObject[name] = text);
    return partialObject;
}

const renderTemplate = templateName => new Promise((resolve, reject) => {
    fs.readFile(templateName, 'utf8', (err, template) => {
        if (err) return reject(err);
        
        const viewName = templateToView(templateName);
        fs.readFile(viewName, 'utf8', (err, view) => {
            if (err) {
                if (err.code === 'ENOENT') console.error(`Missing view file ${viewName} to match template ${templateName}`);
                return reject(err);
            }

            const viewData = JSON.parse(view);

            const views = viewData.multiFile ? viewData.views : [{
                view: viewData,
                name: templateToOutput(templateName),
            }];

            Promise.all(views.map(async ({ view, name }) => {
                const resolvedView = await ResolveView(view);
                const output = Mustache.render(template, resolvedView, partials);
                const outputName = `dist/${name}.html`;
                fs.writeFile(outputName, output, (err) => {
                    if (err) throw err;
                    console.log(`Rendered template ${templateName} to ${outputName}`);
                    return;
                });
            }));

        });
    });
});

Promise.all(templates.map(renderTemplate)).then(() => {
    console.log('Finished rendering templates');
});