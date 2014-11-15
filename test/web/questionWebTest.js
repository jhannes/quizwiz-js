var webtests = require('./webtests');
var testServer = require('./testserver');

describe('question web pages', function() {
  this.timeout(5000);

  var client;
  var url;

  before(webtests.startSeleniumServer);

  before(function(done) {
    this.timeout(15000);
    client = webtests.startWebDriver(done);
  });

  before(function(done) {
    testServer.startServer(function(_url) {
      url = _url; done();
    });
  });

  after(function(done) {
    client.end(done);
  });

  it('shows title in detail screen');

  it('shows title in edit screen');

  it('updates title after edit');

  it('removes deleted questions');

  it('shows save screen');

  it('removes title but keeps screen on create new during save');



});

