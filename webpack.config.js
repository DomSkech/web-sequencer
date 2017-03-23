 module.exports = {
     entry: './src/app.js',
     output: {
         path: __dirname + '/dist',
         filename: 'app.js',
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }, {
             test: /\.css$/,
             loader: 'style-loader!css-loader'
         }]
     }
 }
