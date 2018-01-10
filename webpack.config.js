module.exports = {

	entry : [
		'./src/index.js'
	],

	output : {
		path :  __dirname + '/dist',
		filename : "bundle.js"
	},
	module : {

		loaders : [
			{
				test : /\.js$/, 
				exclude : /node_modules|bower_components/, 
				loader : "babel-loader",
				query : {
					presets: ['react']
				}
			},{
                test: /\.css$/,
                loader: [ 'style-loader', 'css-loader' ]
			}

		]
	}

}