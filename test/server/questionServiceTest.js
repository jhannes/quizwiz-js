var expect = require('chai').expect;

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_TEST_URL || 
    "postgres://quizwiz:quizwiz@localhost:5432/quizwiz_test",
    {logging: false});

var questions = require('../../server/questions')(sequelize);

describe('questions', function() {
  before(function(done) {
    var migrations = __dirname + "/../../migrations/";
    sequelize.getMigrator({path: migrations}).migrate().done(done);
  });

  beforeEach(function(done) {
    questions.destroyAll().done(done);
  });

  it('includes saved questions in list', function(done) {
    var question = { title: 'New question', text: 'question text' };
    questions
      .create(question).then(function(id) {
        return questions.get(id);
      })
      .then(function(q) {
        expect(q.title).to.eql(question.title);
        expect(q.text).to.eql(question.text);
      })
      .done(done);
  });

  describe('with one question', function() {
    var question = { title: 'Some question', text: 'foo' };
    var questionId;
    beforeEach(function(done) {
      questions.create(question).then(function(id) {
        questionId = id;
      }).done(done);
    });

    it('can fetch question', function(done) {
      questions.get(questionId).then(function(q) {
        expect(q.title).to.eql(question.title);
      }).done(done);
    });

    it('can update the question', function(done) {
      questions.update(questionId, {title: 'new title'}).then(function() {
        return questions.get(questionId);
      }).then(function(savedQuestion) {
        expect(savedQuestion.title).to.eql('new title');
        expect(savedQuestion.text).to.eql(question.text);
      }).done(done);
    });

    it('can delete the question', function(done) {
      questions.destroy(questionId).then(function() {
        return questions.get(questionId);
      }).then(function(q) {
        expect(q).to.be.falsy;
      }).done(done);
    });

    it('rejects duplicates', function(done) {
      questions.create({title: question.title}).then(null, function(reason) {
        expect(reason).to.eql("duplicate title");
      }).done(done);
    });

  });

  it('filters questions', function(done) {
    var equalsFilter = 'test';
    var startsWithFilter = 'Test a';
    var containsFilter = 'Another test';
    var doesNotContainFilter = 'Not included';

    questions
    .destroyAll()
    .then(function() {
      return questions.create({title: equalsFilter});
    }).then(function() {
      return questions.create({title: startsWithFilter});
    }).then(function() {
      return questions.create({title: containsFilter});
    }).then(function() {
      return questions.list({title: 'test'});
    }).then(function(result) {
      expect(result.map(function(q) { return q.title; }))
        .to.contain(equalsFilter)
        .to.contain(startsWithFilter)
        .to.contain(containsFilter)
        .to.not.contain(doesNotContainFilter);
    }).done(done);
  });


});
