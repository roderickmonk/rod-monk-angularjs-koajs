const
	webpack = require('webpack'),
	path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	merge = require('webpack-merge'),
	ManifestPlugin = require('webpack-manifest-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	parts = require('./webpack.parts'),

	PATHS = {
		app: path.join(__dirname, 'client-src'),
		build: path.join(__dirname, 'client-build'),
	};

/*
module.exports = {
	entry: {
		app: path.join(PATHS.app, 'index.js'),
		vendor: [
			'angular', 'angular-route', 'angular-messages', 'angular-sanitize',
			'angular-cookies', 'angular-animate', 'lodash', 'moment'
		]
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},

	module: {
		rules: [{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				use: 'css-loader'
			})
		}]
	},
	plugins: [
		new ExtractTextPlugin('styles.css'),
	]
}
*/

//const commonConfig = merge([parts.loadCSS()]);

module.exports = {
	entry: {
		app: path.join(PATHS.app, 'index.js'),
		vendor: [
			'angular', 'angular-route', 'angular-messages', 'angular-sanitize',
			'angular-cookies', 'angular-animate', 'lodash', 'moment'
		]
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({ title: 'TTC Webpack' }),
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
		],
	}

}
