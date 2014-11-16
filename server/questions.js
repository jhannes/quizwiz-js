var Sequelize = require('sequelize');


var Promise = require('bluebird/js/main/promise')();


module.exports = function(sequelize) {
  var Question = sequelize.define('Question', {
    title: Sequelize.STRING,
    text:  Sequelize.TEXT
  });

  return {
    list: function(filter) {
      var where = {};
      if (filter && filter.title) {
        where["title"] = {ilike: '%' + filter.title + '%'};
      }
      return Question.all({where: where});
    },

    get: function(questionId) {
      return Question.find({where: {id: questionId}});
    },

    create: function(question) {
      return new Promise(function(resolve, reject) {
        Question.find({where: {title: question.title}}).then(function(result) {
          if (result) return reject("duplicate title");

          Question.create({
            title: question.title, text: question.text
          }).then(function(value) {
            resolve(value.id);
          }, reject);
        });
      });
    },

    update: function(questionId, question) {
      return Question.find({where: {id: questionId}}).then(function(data) {
        return data.updateAttributes({
          title: question.title, text: question.text
        });
      });
    },

    destroy: function(questionId) {
      return Question.destroy({where: {id: questionId}});
    },

    destroyAll: function() {
      data = {};
      return Question.destroy();
    }
  };
};
