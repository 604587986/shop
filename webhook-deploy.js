var http = require('http')
var createHandler = require('/usr/local/node/lib/node_modules/coding-webhook-handler')
var handler = createHandler({
	path: '/',
	token: ''
})
var child_process = require('child_process')

const rumCommand = (cmd, args, callback) => {
	const child = child_process.spawn(cmd, args)
	let response = ''
	child.stdout.on('data', buffer => response += buffer.toString())
    child.stdout.on('end', () => callback(response))
}

http.createServer(( req, res ) => {
	handler(req, res, function(err) {
		console.log('有动作...')
		rumCommand('sh', ['./deploy.sh'], txt => {
			console.log(txt)
		})
	})
}).listen(4000)

handler.on('error', err => {
	console.log('error: ', err.message)
})

handler.on('push', event => {
	console.log('push...')
})
