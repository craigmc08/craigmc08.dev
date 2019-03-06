const Mustache = require('mustache');
const globby = require('globby');
const fs = require('fs');

const templates = globby.sync('templates/*.mustache');

const templateToView = template => template.replace('.mustache', '.json');
const templateToOutput = template => template.replace(/templates(?:\/|\\)|\.mustache/g, '');

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

            Promise.all(views.map(({ view, name }) => {
                const output = Mustache.render(template, view);
                const outputName = `dist/${name}.html`;
                fs.writeFile(outputName, output, (err) => {
                    if (err) return reject(err);
                    console.info(`Rendered template ${templateName} to ${outputName}`);
                });
            }));

            // const output = Mustache.render(template, viewData)
            // const outputName = templateToOutput(templateName);
            // fs.writeFile(outputName, output, (err) => {
            //     if (err) return reject(err);
            //     console.info(`Rendered template ${templateName} to ${outputName}`);
            //     resolve();
            // });
        });
    });
});

Promise.all(templates.map(renderTemplate)).then(() => {
    console.info('Finished rendering templates');
});