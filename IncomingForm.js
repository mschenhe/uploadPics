//通过http post 请求提交的表单，在node.js中可以被解析
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
http.createServer(function(req, res) {
    if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('received upload:\n\n');
            res.end(util.inspect({ fields: fields, files: files }));
        });
        return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="text" name="title"><br>' +
        '<input type="file" name="upload" multiple="multiple"><br>' +
        '<input type="submit" value="Upload">' +
        '</form>'
    );
}).listen(8888);