var request = require('supertest');
var app = require('./../../app.js');

describe("The app", function(){
	it('should return 200 OK on GET /', function(done){
		request(app)
			.get('/')
			.expect(200)
			.end(function(err, res){
				if (err) return done(err);
				done();
			});
	});

	it('should return 200 OK on GET /feed', function(done){
		request(app)
			.get('/feed')
			.expect(200)
			.end(function(err, res){
				if (err) return done(err);
				done();
			});
	});

	it('should return 302 OK on POST /login', function(done){
		request(app)
			.post('/login')
			.expect(302)
			.end(function(err, res){
				if (err) return done(err);
				done();
			});
	});

	it('should return 200 OK on POST /new', function(done){
		request(app)
			.post('/new')
			.expect(200)
			.end(function(err, res){
				if (err) return done(err);
				done();
			});
	});

	it('should return 200 OK on POST /highlight', function(done){
		request(app)
			.post('/highlight')
			.expect(200)
			.end(function(err, res){
				if (err) return done(err);
				done();
			});
	});

	it('should return 200 OK on POST /remove', function(done){
		request(app)
			.post('/remove')
			.expect(200)
			.end(function(err, res){
				if (err) return done(err);
				done();
			});
	});



})
