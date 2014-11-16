var expect = require('chai').expect;

var webtests = require('./webtests');
var testServer = require('./testserver');

describe('question web pages', function() {
  this.timeout(5000);

  var client;
  var url;

  before(webtests.startSeleniumServer);

  before(function(done) {
    testServer.startServer(function(_url) {
      url = _url; done();
    });
  });

  before(function(done) {
    this.timeout(15000);
    client = webtests.startWebDriver(done);
    client.waitAndClick = function(selector) {
      return client.waitFor(selector).click(selector);
    };
    client.waitAndGetText = function(selector, callback) {
      return client.waitFor(selector).getText(selector, callback);
    }
  });

  beforeEach(function(done) {
    testServer.questions.destroyAll()
    .then(function() {
      return testServer.questions.create({title: 'one'});
    })
    .then(function() {
      return testServer.questions.create({title: 'two'});
    })
    .then(function() {
      client
        .url(url + "questions")
        .waitFor('#questionList', done);      
    });
  });

  afterEach(function() {
    client.saveScreenshot("TEST-" + this.currentTest.state + "-" + this.currentTest.title + ".png");
  });

  after(function(done) {
    client.end(done);
  });

  it('shows title in detail screen', function(done) {
    client
      .waitAndGetText('#questionList a', function(err, summaryText) {
        client
          .click('#questionList a')
          .waitAndGetText('#questionTitle', function(err, editText) {
            expect(editText).to.eql(summaryText[0]);
            done();
          })
      });

  });

  it('shows title in edit screen', function(done) {
    client
      .waitAndClick('#questionList a')
      .waitAndGetText('#questionTitle', function(err, editTitle) {
        client
          .click('#questionEdit')
          .waitFor('#questionForm')
          .getAttribute('#questionTitle', 'value', function(err, value) {
            expect(editTitle).to.eql(value);
            done();
          });
      })
  });

  it('updates title after edit', function(done) {
    client
      .waitAndClick('#questionList a')
      .waitAndClick('#questionEdit')
      .waitFor('#questionForm')
      .setValue('#questionTitle', 'new title')
      .submitForm('#questionTitle')
      .waitAndGetText('#questionList a', function(err, texts) {
        expect(texts).to.contain('new title');
        done();
      });
  });

  it('removes deleted questions', function(done) {
    client
      .waitAndClick('#questionList a')
      .waitAndGetText('#questionTitle', function(err, editTitle) {
        client
          .waitAndClick('#questionEdit')
          .waitAndClick('#questionDelete')
          .waitAndGetText('#questionList a', function(err, texts) {
            expect(texts).to.not.contain(editTitle);
            done();
          });
      })
  });

  it('shows save screen', function(done) {
    client
      .waitAndClick('#addQuestion')
      .waitFor('#questionForm')
      .getAttribute('#questionTitle', 'value', function(err, value) {
        expect(value).to.eql('');
        done();
      });
  });

  it('removes title but keeps screen on create new during save', function(done) {
    client
      .waitAndClick('#addQuestion')
      .waitFor('#questionForm')
      .setValue('#questionTitle', 'new  question')
      .click('#createAnotherOnSubmit')
      .submitForm('#questionForm')
      .getAttribute('#questionTitle', 'value', function(err, value) {
        expect(value).to.eql('');
        done();
      });
  });
});

