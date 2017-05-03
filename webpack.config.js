const
	webpack = require('webpack'),
	path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	merge = require('webpack-merge'),
	ManifestPlugin = require('webpack-manifest-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),

	PATHS = {
		app: path.join(__dirname, 'client-src'),
	};

module.exports = {
	entry: {
		app: path.join(PATHS.app, 'index.js'),
		vendor: [
			'angular', 'angular-route', 'angular-messages', 'angular-sanitize',
			'angular-cookies', 'angular-animate', 'lodash', 'moment'
		]
	},
	output: {
		filename: '[name].[chunkhash].js', 
		path: path.resolve(__dirname, 'client-build')
	},
	plugins: [
		new ExtractTextPlugin("styles.css"),
		new HtmlWebpackPlugin({
			hash: true,
			template: './client-src/index.template.html',
			filename: 'unminified/index.html',
			inject: 'body'
		}),
		new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" }),
		new ManifestPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: module =>
				// this assumes your vendor imports exist in the node_modules directory
				module.context && module.context.indexOf(['node_modules/jquery']) !== -1
		}),
		//CommonChunksPlugin will now extract all the common modules from vendor and main bundles
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		})
	],
	module: {
		rules: [
			{
				test: [/\.js$/],
				include: [
					path.resolve(__dirname, 'client-src'),
				],
				exclude: [
					/node_modules/,
					/\.spec\.js$/
				],
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							['es2015', { modules: false }]
						]
					}
				}]

			},
			{
				test: /\.css$/,
				//exclude: helpers.root('src', 'app'),
				use: ExtractTextPlugin.extract({ fallback: 'style-loader', loader: 'css-loader?sourceMap' }),
			},
		],
	}
}
