const express = require('express');
const path = require('path');

const app = express();


app.use(express.static(__dirname+'/dist/AngularRefactor'));
app.get('/',function(req,res){
    res.render(path.join(__dirname+'/dist/AngularRefactor/index.html'));
});

app.listen(process.env.PORT || 8080);
