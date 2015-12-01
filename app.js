var fpp = require('face-plus-plus'),
    express = require('express'),
    app = express(),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    ejsLayouts = require('express-ejs-layouts'),
    fs = require('fs')

// environment port
var port = process.env.PORT || 3000


//middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//routes
app.use(express.static(__dirname + '/public'))

//face++
fpp.setApiKey('63d445d5c41a5bf6e9b8ec6e1b660dac')
fpp.setApiSecret('qwUP9gHMP6R2-zSSYXP7V-l_NQtbnEcx')

app.get('/api/image/:name', function(req,res){
  // var name = :name
  // console.log('name = ', name)
  var parameters = {
          attribute: 'gender,age,race,smiling,glass,pose',
          img : {
              value: fs.readFileSync('./public/img/IMG_8689.JPG')
              , meta: {filename:'IMG_8689.jpg'}
          }
      };
  //pass image from local system to face++ api
  fpp.post('detection/detect', parameters, function(err, response) {
      res.json(response);
  });
})


//pass image from remote url to face++ api
// var parameters = {
//         url: 'https://drive.google.com/folderview?id=0BzBMzLZlimnMVE5peU04QjhvakE&usp=sharing',
//         attribute: 'gender,age'
//     };
//     fpp.get('detection/detect', parameters, function(err, res) {
//         console.log(res);
//     });

app.listen(3000, function(){
  console.log('server running on port ' + port)
})
