const fs = require("fs-extra")
const uglifyjs = require("uglify-js")
const cleancss = require("clean-css")
const less = require("less")
const htmlminifier = require("html-minifier")
const colors = require("colors")
const path = require("path")
const handlebars = require('handlebars')
const layouts = require('handlebars-layouts')
const lessPluginAutoPrefix = require('less-plugin-autoprefix')

const isPro = process.env.NODE_ENV === "production"
const staticDir = "static/"
const srcDir = "src/"
const distDir = "dist/"
const thirdDir = `${staticDir}third/`
const pluginDir = `${staticDir}plugins/`
const userJsDir = `${srcDir}js/`
const userCssDir = `${srcDir}css/`
const userLessDir = `${srcDir}less/`
const userPageDir = `${srcDir}page/`
const outputJsDir = `${distDir}js/`
const outputCssDir = `${distDir}css/`

const commonJs = [`${thirdDir}jquery/jquery.min.js`,
    `${thirdDir}bootstrap/js/bootstrap.min.js`,
    `${userJsDir}common.js`
]
const commonCss = [`${thirdDir}bootstrap/css/bootstrap.min.css`,
    `${thirdDir}simple-line-icons/css/simple-line-icons.min.css`,
    `${userCssDir}base.css`
]

const allJs = {
    screenshots: [...commonJs, `${thirdDir}toastr/toastr.min.js`,
        `${userJsDir}screenshots.js`
    ],
    editor: [`${thirdDir}jquery/jquery.min.js`,
        `${thirdDir}bootstrap/js/bootstrap.min.js`, 
        `${thirdDir}toastr/toastr.min.js`,
        `${pluginDir}loader/js/loader.min.js`,
        `${userJsDir}editor.js`
    ],
    envEditor: [`${pluginDir}envEditor/js/enxHelper.min.js`,
        `${pluginDir}envEditor/js/envEditor.min.js`
    ],
    lab: [`${thirdDir}jquery/jquery.min.js`,
        `${pluginDir}labDesigner/js/labDesigner.min.js`,
        `${userJsDir}lab.js`
    ],
    plugins: [...commonJs, `${pluginDir}loader/js/loader.min.js`,
        `${pluginDir}csgrid/js/csgrid.min.js`,
        `${pluginDir}pbar/pbar.min.js`,
        `${pluginDir}divbar/divbar.min.js`,
        `${userJsDir}plugins.js`
    ],
    map: [...commonJs, `${userJsDir}map.js`],
    topo: [`${thirdDir}jquery/jquery.min.js`,
        `${pluginDir}topoViewer/js/topoViewer.min.js`,
        `${userJsDir}topo.js`
    ]
}
const allLess = {
    base: `${userLessDir}base.less`,
    editor: `${userLessDir}editor.less`,
    lab: `${userLessDir}lab.less`,
    topo: `${userLessDir}topo.less`,
    map: `${userLessDir}map.less`,
    plugins: `${userLessDir}plugins.less`,
    screenshots: `${userLessDir}screenshots.less`
}
const allCss = {
    screenshots: [...commonCss, `${thirdDir}toastr/toastr.min.css`,
        `${userCssDir}screenshots.css`
    ],
    editor: [`${thirdDir}bootstrap/css/bootstrap.min.css`,
        `${thirdDir}toastr/toastr.min.css`,
        `${pluginDir}loader/css/loader.min.css`,
        `${pluginDir}envEditor/css/envEditor.min.css`,
        `${userCssDir}editor.css`
    ],
    lab: [`${pluginDir}labDesigner/css/labDesigner.min.css`,
        `${userCssDir}lab.css`],
    plugins: [...commonCss, `${pluginDir}loader/css/loader.min.css`,
        `${pluginDir}csgrid/css/csgrid.min.css`,
        `${pluginDir}waterball/waterball.min.css`,
        `${userCssDir}plugins.css`
    ],
    map: [...commonCss, `${userCssDir}map.css`],
    topo: [`${thirdDir}bootstrap/css/bootstrap.min.css`,
        `${pluginDir}topoViewer/css/topoViewer.min.css`,
        `${userCssDir}topo.css`],
}
const allHtml = {
    index: {
        name: `${userPageDir}screenshots.html`,
        title: '作品截图'
    },
    plugins: {
        name: `${userPageDir}plugins.html`,
        title: '插件实例'
    },
    editor: {
        name: `${userPageDir}editor.html`,
        title: '环境设计器'
    },
    map: {
        name: `${userPageDir}map.html`,
        title: '实验室分布'
    },
    lab: {
        name: `${userPageDir}lab.html`,
        title: '空间布局'
    },
    topo: {
        name: `${userPageDir}topo.html`,
        title: '拓扑大网'
    }
}

const init = () => {
    return fs.emptyDir(distDir).then(() => {
        console.log("Create dist directory.")
        console.log("Start building...".green)
        fs.ensureDirSync(outputJsDir)
        fs.ensureDirSync(outputCssDir)
    }).catch(err => {
        console.error(err.red)
    })
}

const buildJs = () => {
    const build = (inputJs, outputJs) => {
        let codes = ''
        inputJs.forEach(js => {
            codes += fs.readFileSync(js, "utf8")
        })
        fs.writeFileSync(outputJs, isPro ? uglifyjs.minify(codes, {
            compress: {
                drop_console: true,
                hoist_props: false
            }
        }).code : codes, "utf8")
        console.log(outputJs)
    }

    return new Promise(resolve => {
        console.log("Start building js...".green)
        for (let [name, js] of Object.entries(allJs)) {
            build(js, `${outputJsDir}${name}.js`)
        }
        console.log("Build js done.".green)
        resolve()
    })
}

const buildHtml = () => {
    handlebars.registerHelper(layouts(handlebars))
    handlebars.registerPartial('layout', fs.readFileSync(`${userPageDir}layout.html`, 'utf8'))

    const version = new Date().valueOf()    
    const build = (inputHtml, title) => {
        const template = handlebars.compile(fs.readFileSync(inputHtml, 'utf8'))
        const outputHtml = template({ title, version })
        return outputHtml
    }

    const minify = ({ layout = true, name: inputHtml, title }, outputHtml) => {
        const rHtml = layout ? build(inputHtml, title) : fs.readFileSync(inputHtml, "utf8")
        fs.writeFileSync(outputHtml, isPro ? htmlminifier.minify(rHtml, {
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
        }) : rHtml, "utf8")
        console.log(outputHtml)
    }

    return new Promise(resolve => {
        console.log("Start building html...".green)
        for (let [name, html] of Object.entries(allHtml)) {
            minify(html, `${distDir}${name}.html`)
        }
        console.log("Build html done.".green)
        resolve()
    })
}

const buildCss = () => {
    const autoprefixPlugin = new lessPluginAutoPrefix()
    
    const build = (inputLess, outputCss) => {
        return less.render(fs.readFileSync(inputLess, "utf8"), { filename: path.resolve(inputLess), plugins: [autoprefixPlugin] }).then(output => {
            fs.writeFileSync(outputCss, output.css, "utf8")
            console.log(outputCss)
        }, err => {
            console.error(err.message.red)
        })
    }

    const minify = (inputCss, outputCss) => {
        fs.writeFileSync(outputCss, new cleancss({
            format: isPro ? undefined : 'beautify',
            compatibility: 'ie9',
            rebaseTo: "root",
            level: {
                1: {
                    specialComments: ""
                }
            }
        }).minify(inputCss).styles, "utf8")
        console.log(outputCss)
    }

    const promiseArray = []
    for (let [name, less] of Object.entries(allLess)) {
        promiseArray.push(build(less, `${userCssDir}${name}.css`))
    }

    return new Promise(resolve => {
        console.log("Start building css...".green)
        Promise.all(promiseArray).then(() => {
            for (let [name, css] of Object.entries(allCss)) {
                minify(css, `${outputCssDir}${name}.css`)
            }
            console.log("Build css done.".green)
            resolve()

        })
    })
}

const buildAll = () => {
    const buildMode = isPro ? 'Production' : 'Development'
    console.log(`${ buildMode } start building...`.green)
    return new Promise((resolve, reject) => {
        init().then(() => {
            Promise.all([buildJs(), buildHtml(), buildCss()]).then(() => {
                console.log("Start copy static directory...".green)
                fs.copy(staticDir, distDir + staticDir).then(() => {
                    console.log("Copy done.".green)
                    console.log("Build done.".green)
                    console.log(`${ buildMode } build done.`.green)
                    resolve()
                }).catch(err => {
                    console.error(`Copy failed, ${err}`.red)
                    console.log("Build faild.".green)
                    reject(err)
                })
            })
        })
    })
}

if (isPro) {
    buildAll()
}

module.exports = buildAll