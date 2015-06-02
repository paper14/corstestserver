var koa = require('koa.io');
var locals = require('koa-locals');
var router = require('koa-router')();
var serve = require('koa-static');
var swig = require('koa-swig');
var path = require('path');
var cors = require('koa-cors');
var session = require('koa-session');
var bodyParser = require('koa-body-parser');

var app = koa();

app.keys = ['secretssssssss'];
app.use(session(app));
app.use(bodyParser());


// Cors Start
origin = ['http://corstestclient.herokuapp.com/', 'http://localhost:3001/'];
methods = [
  'POST',
  'GET'
];
options = {
  origin: origin,
  methods: methods,
  maxAge: 3000,
  credentials: true,
  headers: ['Content-Type', 'Authorization']
}
app.use(cors(options));
// End Cors

// Default Session
app.use(function * (next) {
  this.session.name = {
    'name': 'Levis'
  };
  yield * next;
});

// Page Router
router
  .get('/', function * (next) {
    console.log(this.session.name);
    this.response.set(this.session.name);
    yield * this.render('index.html');
  })
  .get('/del', function * (next) {
    this.body = "delete Session"
    this.session.name = null;
    this.session.serve = null;
  })
  .get('/t1', function * (next) {
    var sn = this.session.name.name;
    this.body = "Latest Session: " + sn;
  })
  .get('/t2', function * (next) {
    var sn = this.session.name.name;
    this.body = "Latest Session: " + sn;
  })
  .post('/new-session', function * () {
    var thisData = this.request.body;
    this.body = thisData;
    this.session.name = {
      'name': thisData.name
    };
    console.log(this.session.name);
  })
  .get('/ajax-test', function * (next) {
    this.body = "This is your Result";
  });

// Join the 'templates folder'
app.use(function * (next) {
  var loc = this.session.name;
  this.render = swig({
    root: path.join(__dirname, 'templates'),
    autoescape: true,
    cache: false,
    ext: 'html',
    locals: loc
  });
  yield * next;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(serve(__dirname + '/js'));

var port = Number(process.env.PORT || 3000);

app.listen(port);

console.log("Listening to PORT " + port);