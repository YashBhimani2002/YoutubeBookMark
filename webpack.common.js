const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
module.exports={
    entry:{
        popup:path.resolve('./src/popup/index.tsx'),
        background:path.resolve('./src/background/background.ts'),
        content_scripts:path.resolve('./src/content/content_scripts.ts'),
    },
    module:{
        rules:[
            {
                test:/\.tsx?$/,
                use:"ts-loader",
                exclude:/node_modules/,
            },
            {
                test:/\.css$/,
                use:["style-loader","css-loader",{
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            ident: "postcss",
                            plugins: [
                                tailwindcss, autoprefixer
                            ]
                        }
                    }
                }],
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/i,
                type:"asset/resource",
            },
        ]
    },
    plugins:[
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve('./src/static'),
                    to: path.resolve('dist')
                },
                {
                    from:path.resolve('./src/assets'),
                    to:path.resolve('dist/assets')
                }
            ]
        }),
        ...getHtmlPlugin(['popup'])
    ],
    resolve:{
        extensions:[".tsx",".ts",".js"],
    },
    output:{
        filename:"[name].js",
        path:path.resolve(__dirname,"dist/js"),
    }
}

function getHtmlPlugin(chunks){
    return chunks.map((chunk)=>{
        return new HTMLWebpackPlugin({
            title:'React extension',
            filename: `${chunk}.html`,
            chunks: [chunk],
        })
    })
} 