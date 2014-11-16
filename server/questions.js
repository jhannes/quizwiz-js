var Promise = require('bluebird/js/main/promise')();

var index = 3;
var data = {
  1: {
    id:1, title: "one", text: "What do you think about one?",
    answers: [ {'text': 'a', 'correct': true}, {'text': 'b', 'correct': false}]
  }, 
  2: {
    id:2, title: "two", text: "What do you think about two?",
    answers: [ {'text': 'a', 'correct': true}, {'text': 'b', 'correct': false}]
  }
};

module.exports = function() {


  return {
    create: function(question) {
      return new Promise(function(resolve, reject) {
        for (var id in data) {
          if (data[id].title === question.title) {
            return reject("duplicate title");
          }
        };

        var questionId = index++;
        question.id = questionId;
        data[questionId] = question;
        resolve(questionId);
      });
    },

    update: function(questionId, question) {
      return new Promise(function(resolve, reject) {
        var existing = data[questionId];
        for (var field in question) {
          existing[field] = question[field];
        }
        resolve(questionId);
      });
    },

    list: function(filter) {
      return new Promise(function(resolve, reject) {
        var result = [];
        for (var id in data) {
          if (filter.title && data[id].title.toUpperCase().indexOf(filter.title.toUpperCase()) == -1) {
            continue;
          }
          result.push(data[id]);
        }
        resolve(result);
      });
    },

    get: function(questionId) {
      return new Promise(function(resolve, reject) {
        resolve(data[questionId]);
      });
    },

    destroy: function(questionId) {
      return new Promise(function(resolve, reject) {
        delete data[questionId];
        resolve();
      });
    },

    destroyAll: function() {
      return new Promise(function(resolve, reject) {
        data = {};
        resolve();
      });
    }
  };
};
