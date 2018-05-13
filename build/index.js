const fs = require("fs")
const uglifyjs = require("uglify-js")
const cleancss = require("clean-css")
const less = require("less")
const htmlminifier = require("html-minifier")
const colors = require("colors")
const path = require("path")
const fse = require("fs-extra")

const staticDir = "static/"
const srcDir = "src/"
const distDir = "dist/"
const thirdDir = `${staticDir}third/`
const pluginDir = `${staticDir}plugins/`
var userJsDir = `${srcDir}js/`
var userCssDir = `${srcDir}css/`
var userLessDir = `${srcDir}less/`
var userPageDir = `${srcDir}page/`
const outputJsDir = `${distDir}js/`
const outputCssDir = `${distDir}css/`

const thirdJs = [`${thirdDir}jquery/jquery.min.js`,
    `${thirdDir}bootstrap/js/bootstrap.min.js`
]
const thirdCss = [`${thirdDir}bootstrap/css/bootstrap.min.css`,
    `${thirdDir}simple-line-icons/css/simple-line-icons.min.css`
]

const allJs = {
    index: [...thirdJs, `${userJsDir}common.js`,
        `${userJsDir}screenshots.js`
    ],
    editor: [...thirdJs, `${thirdDir}toastr/toastr.min.js`,
        `${pluginDir}loader/js/loader.min.js`,
        `${userJsDir}common.js`
    ],
    envEditor: [`${pluginDir}envEditor/js/enxHelper.min.js`,
        `${pluginDir}envEditor/js/envEditor.min.js`
    ],
    lab: [...thirdJs, `${pluginDir}labDesigner/js/labDesigner.min.js`,
        `${userJsDir}common.js`,
        `${userJsDir}lab.js`
    ],
    plugins: [...thirdJs, `${pluginDir}loader/js/loader.min.js`,
        `${pluginDir}csgrid/js/csgrid.min.js`,
        `${pluginDir}pbar/pbar.min.js`,
        `${pluginDir}divbar/divbar.min.js`,
        `${userJsDir}common.js`,
        `${userJsDir}plugins.js`
    ],
    map: [...thirdJs, `${userJsDir}common.js`,
        `${userJsDir}map.js`
    ]
}
const allLess = {
    base: `${userLessDir}base.less`,
    map: `${userLessDir}map.less`,
    plugins: `${userLessDir}plugins.less`,
    screenshots: `${userLessDir}screenshots.less`
}
const allCss = {
    index: [...thirdCss, `${userCssDir}base.css`,
        `${userCssDir}screenshots.css`
    ],
    editor: [...thirdCss, `${thirdDir}toastr/toastr.min.css`,
        `${pluginDir}loader/css/loader.min.css`,
        `${userCssDir}base.css`,
        `${pluginDir}envEditor/css/envEditor.min.css`
    ],
    lab: [...thirdCss, `${userCssDir}base.css`,
        `${pluginDir}labDesigner/css/labDesigner.min.css`
    ],
    plugins: [...thirdCss, `${userCssDir}base.css`,
        `${pluginDir}loader/css/loader.min.css`,
        `${pluginDir}csgrid/css/csgrid.min.css`,
        `${pluginDir}waterball/waterball.min.css`,
        `${userCssDir}plugins.css`
    ],
    map: [...thirdCss, `${userCssDir}base.css`,
        `${userCssDir}map.css`
    ]
}
const allHtml = {
    index: `${userPageDir}index.html`,
    editor: `${userPageDir}editor.html`,
    map: `${userPageDir}map.html`,
    lab: `${userPageDir}lab.html`,
    plugins: `${userPageDir}plugins.html`
}

const initDistDir = () => {
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir)
    }
    fse.copySync(staticDir, distDir + staticDir)
}

const minifyJsAll = (inputJs, outputJs) => {
    let codes = {}
    inputJs.forEach((js, i) => {
        codes[i] = fs.readFileSync(js, "utf8")
    })
    if (!fs.existsSync(outputJsDir)) {
        fs.mkdirSync(outputJsDir)
    }
    fs.writeFileSync(outputJs, uglifyjs.minify(codes, {
        compress: {
            drop_console: true
        }
    }).code, "utf8")
    console.log(`Minify js successfully, ${outputJs}`.green)
}

const buildCssAll = (inputLess, outputCss) => {
    return less.render(fs.readFileSync(inputLess, "utf8"), { filename: path.resolve(inputLess) }).then(output => {
        fs.writeFileSync(outputCss, output.css, "utf8")
        console.log(`Build css successfully, ${outputCss}`.green)
    }, err => {
        console.error(err.message.red)
    })
}

const minifyCssAll = (inputCss, outputCss) => {
    if (!fs.existsSync(outputCssDir)) {
        fs.mkdirSync(outputCssDir)
    }
    fs.writeFileSync(outputCss, new cleancss({
        rebaseTo: "root",
        level: {
            1: {
                specialComments: ""
            }
        }
    }).minify(inputCss).styles, "utf8")
    console.log(`Minify css successfully, ${outputCss}`.green)
}

const minifyHtml = (inputHtml, outputHtml) => {
    fs.writeFileSync(outputHtml, htmlminifier.minify(fs.readFileSync(inputHtml, "utf8"), {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true
    }), "utf8")
    console.log(`Minify html successfully, ${outputHtml}`.green)
}

initDistDir()

for (let [name, js] of Object.entries(allJs)) {
    minifyJsAll(js, `${outputJsDir}${name}.js`)
}

const promiseArray = []
for (let [name, less] of Object.entries(allLess)) {
    promiseArray.push(buildCssAll(less, `${userCssDir}${name}.css`))
}
Promise.all(promiseArray).then(() => {
    for (let [name, css] of Object.entries(allCss)) {
        minifyCssAll(css, `${outputCssDir}${name}.css`)
    }
})

for (let [name, html] of Object.entries(allHtml)) {
    minifyHtml(html, `${distDir}${name}.html`)
}