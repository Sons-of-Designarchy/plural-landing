const path = require('path');
const fs = require('fs');
const siteMap = require('../sitemap');
const ejs = require('ejs');
const fse = require('fs-extra');

const distPath = path.join(__dirname, '../dist');
// create dist folder if it doesn't exist
if (!fs.existsSync(distPath)) fs.mkdirSync(distPath);    

async function generate() {
    for (let p in siteMap) {
        let page = siteMap[p];
        if (p === '') p='index';
        let renderer = ejs.renderFile(`views/_layout.ejs`, { page });
        let str = await renderer;
        let filePath = page.isParent ? path.join(distPath, p, 'index.html') : path.join(distPath, `${p}.html`);
        await fse.ensureFile(filePath);
        try {
            fs.writeFileSync(filePath, str);            
        } catch (error) {
            console.log('str', str);
        }
    }
}

generate().then(() => console.log('done'));
