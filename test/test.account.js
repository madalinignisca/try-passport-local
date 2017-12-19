var should = require('should');
var mongoose = require('mongoose');
var Account = require("../models/account");
var db;

describe('Account', function() {

  before(function(done) {
    mongoose.Promise = global.Promise;
    db = mongoose.connect(
      'mongodb://localhost:32771/passport_local_test',
      {
        useMongoClient: true
      })
      .then(() => console.log('connection succesful'))
      .catch((err) => console.error(err));
    done();
  });

  beforeEach(function(done) {
    var account = new Account({
      username: '12345',
      password: 'testy'
    });

    account.save(function(error) {
      if (error) {
        console.log('error: ' + error.message);
      } else {
        console.log('account succesfuly saved');
      }
      done();
    });
  });

  it('find a user by username', function(done) {
    Account.findOne(
      { username: '12345' },
      function(error, account) {
        account.username.should.eql('12345');
        console.log(" username: ", account.username);
        done();
      }
    )
  })

  after(function(done) {
    mongoose.connection.close();
    done();
  });

  afterEach(function(done) {
    Account.remove({ }, function() {
      done();
    })
  })

});
