// config 파일 안에서 명심해야 될 건, server 코드와는 연관시키지 않아야한다는 점
// 이곳에선 babel 을 사용할 수 없기때문에, 예전 자바스크립트 코드를 작성해야함
const path = require("path");
// const autoprefixer = require("autoprefixer");
// const MiniCssExtractCSS = require("mini-css-extract-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js"); // __dirname은 현재 프로젝트 디렉토리 이름인데, 이건 어디에서든 접근 가능한 node.js의 전역변수
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: ["@babel/polyfill", ENTRY_FILE],
    mode: MODE,
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.(scss)$/, // SCSS로 끝나는 어떤 module(이 경우엔 styles.scss파일)을 만나게되면, 이 plugin을 사용하도록 함
                use: [ // 잘 호환되는 순수한 CSS가 불러와지면, 그 부분만 텍스트를 추출해서, 어딘가로 보냄
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                    // 아래에서부터 위로 실행
                        loader: "css-loader"
                        // webpack이 CSS를 이해할 수 있게됨
                    },
                    {
                        loader: "postcss-loader", // postcss-loader는 CSS를 받아서, 우리가 얘한테 주는 plugin을 가지고 CSS을 변환해줌
                        options: {
                            postcssOptions: {
                                plugins:[
                                    [
                                        'autoprefixer',
                                        {
                                            //browsers: "cover 99.5%"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    {
                        loader: "sass-loader"
                        // sass-loader는 Sass, 혹은 SCSS을 받아서 일반 CSS로 바꿔줄 수 있음
                    }
                ]
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'styles.css'
        })
    ],
    devtool: "source-map"
};



module.exports = config;
// export default config;
