/**
 * Created by lenovo on 2016/4/17.
 */

var PORT=8070;
var http = require('http');
var qs = require('qs');
var TOKEN='millie';

function checkSignature(params,token){
    var key=[token,params.timestamp,params.nonce].sort().join('');
    var sha1 = require('crypto').createHash('sha1');
    sha1.update(key);
    return sha1.digest('hex')==params.signature;
}

var server = http.createServer(function(request,response){
    var query = require('url').parse(req.url).query;
    var params = qs.parse(query);

    if(!checkSignature(params,TOKEN)){
        //如果签名不对，结束请求并返回
        response.end('signature fail');
        return;
    }

    if(request.method == "GET"){
        response.end(params.echostr);
    }else{
        var postdata = "";
        request.addEventListener("data", function (postchunk) {
            postdata += postchunk;
        });

        request.addEventListener("end",function(){
            console.log(postdata);
            response.end('success');
        });
    }
});

server.listen(PORT);
console.log("Server running at port "+PORT+".");