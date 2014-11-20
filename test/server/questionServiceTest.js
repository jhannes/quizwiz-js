var expect = require('chai').expect;

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_TEST_URL || 
    "postgres://quizwiz:quizwiz@localhost:5432/quizwiz_test",
    {logging: false});

var questions = require('../../server/questions')(sequelize);
var Promise = require('bluebird');

describe('questions', function() {
  before(function() {
    var migrations = __dirname + "/../../migrations/";
    return sequelize.getMigrator({path: migrations}).migrate();
  });

  beforeEach(function() {
    return questions.destroyAll();
  });

  it('saves question properties', function() {
    var question = { title: 'New question', text: 'question text' };
    return questions
      .create(question).then(function(id) {
        return questions.get(id);
      }).then(function(q) {
        expect(q.title).to.eql(question.title);
        expect(q.text).to.eql(question.text);
      });
  });

  describe('with one question', function() {
    var question = { title: 'Some question', text: 'foo' };
    var questionId;
    beforeEach(function() {
      return questions.create(question).then(function(id) {
        questionId = id;
      });
    });

    it('can fetch question', function() {
      return questions.get(questionId).then(function(q) {
        expect(q.title).to.eql(question.title);
      });
    });

    it('can update the question', function() {
      return questions.update(questionId, {title: 'new title'}).then(function() {
        return questions.get(questionId);
      }).then(function(savedQuestion) {
        expect(savedQuestion.title).to.eql('new title');
        expect(savedQuestion.text).to.eql(question.text);
      });
    });

    it('can delete the question', function() {
      return questions.destroy(questionId).then(function() {
        return questions.get(questionId);
      }).then(function(q) {
        expect(q).to.be.falsy;
      });
    });

    it('rejects duplicates', function() {
      return questions.create({title: question.title}).then(null, function(reason) {
        expect(reason).to.eql("duplicate title");
      });
    });

  });

  it('filters questions', function() {
    var equalsFilter = 'test';
    var startsWithFilter = 'Test a';
    var containsFilter = 'Another test';
    var doesNotContainFilter = 'Not included';
    var titles = [equalsFilter, startsWithFilter, containsFilter, doesNotContainFilter];

    return questions
    .destroyAll()
    .then(function() {
      return Promise.map(titles, function(t) {
        return questions.create({title:t});
      });
    }).then(function() {
      return questions.list({title: 'test'});
    }).then(function(result) {
      expect(result.map(function(q) { return q.title; }))
        .to.contain(equalsFilter)
        .to.contain(startsWithFilter)
        .to.contain(containsFilter)
        .to.not.contain(doesNotContainFilter);
    });
  });


});
