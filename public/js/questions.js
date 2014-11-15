var questions = (function() {
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


  return {
    save: function(question) {
      return new Promise(function(resolve, reject) {
        if (!question.id) {
          question.id = data.length+1;
        }
        data[question.id] = question;
        resolve();
      });
    },

    list: function() {
      return new Promise(function(resolve, reject) {
        var result = [];
        for (var id in data) {
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
    }
  };
})();
