const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = (env, { mode = "production" }) => {
    return {
        entry: "./src/index.tsx",
        resolve: {
            extensions: [".js", ".ts", ".tsx"],
        },
        module: {
            rules: [
                { test: /\.tsx?$/, use: 'awesome-typescript-loader' },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                }
            ]
        },
        plugins: [new HtmlWebpackPlugin({
            template: 'index.html'
        })]
    }
};
