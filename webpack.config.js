const
	webpack = require('webpack'),
	path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	merge = require('webpack-merge'),

	PATHS = {
		app: path.join(__dirname, 'client-src'),
		build: path.join(__dirname, 'client-build'),
	};

/*
	commonConfig = merge([
		parts.extractCSS({ use: 'css-loader' }),
		parts.loadCSS(),
	]);
*/

module.exports = {
	// Entries have to resolve to files! They rely on Node
	// convention by default so if a directory contains *index.js*,
	// it resolves to that.
	entry: {
		app: path.join(PATHS.app, 'index.js'),
		//app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: 'bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'TTC Webpack',
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		}),
	],
	module: {
		rules: [
			{
				test: [/\.js$/],
				// **Restrictions**
				// Restrict matching to a directory. This
				// also accepts an array of paths or a function.
				// The same applies to `exclude`.
				//include: path.join(__dirname, 'app'),
				include: [
					path.resolve(__dirname, 'client-src'),
				],
				exclude: [
					/node_modules/,
					/\.spec\.js$/
				],
				// **Actions**
				// Apply loaders the matched files.
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
