var questions = (function() {
  var data = [
    {
      id:1, title: "one", text: "What do you think about one?",
      answers: [ {'text': 'a', 'correct': true}, {'text': 'b', 'correct': false}]
    }, 
    {
      id:2, title: "two", text: "What do you think about two?",
      answers: [ {'text': 'a', 'correct': true}, {'text': 'b', 'correct': false}]
    }
  ];


  return {
    save: function(question) {
      return new Promise(function(resolve, reject) {
        if (question.id) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].id == question.id) data[i] = question;
          };
        } else {
          console.log('creating new');
          question.id = data.length+1;
          data.push(question);
        }

        resolve();
      });
    },

    list: function() {
      return new Promise(function(resolve, reject) {
        resolve(data);
      });
    },

    get: function(questionId) {
      return new Promise(function(resolve, reject) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].id == questionId) resolve(data[i]);
        };
        resolve(null);
      });
    }
  };
})();
