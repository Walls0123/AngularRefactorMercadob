const express = require('express');
const path = require('path');
var RewriteMiddleware = require('express-htaccess-middleware');
var RewriteOptions = {
  file: path.resolve(__dirname, '/dist/AngularRefactor/.htaccess'),
  verbose: (process.env.ENV_NODE == 'development'),
  watch: (process.env.ENV_NODE == 'development'),
};
const app = express();


app.use(RewriteMiddleware(RewriteOptions));
app.set('views',__dirname+'/dist/AngularRefactor/')
app.engine('html',require('ejs').renderFile);
app.set('view engine','html')
app.get('/*',function(req,res){
    res.render(path.join(__dirname+'/dist/AngularRefactor/'));
});

app.listen(process.env.PORT || 8080);
