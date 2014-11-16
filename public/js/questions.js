var questions = (function() {
  var create = function(question) {
    return $.ajax({
      url: '/api/questions', type: 'POST', data: JSON.stringify(question),
      contentType: "application/json; charset=utf-8"
    });
  };

  var update = function(questionId, question) {
    return $.ajax({
      url: '/api/questions/' + questionId, type: 'POST', data: JSON.stringify(question),
      contentType: "application/json; charset=utf-8"
    });
  };


  return {
    save: function(questionId, question) {
      if (questionId) {
        return update(questionId, question);
      } else {
        return create(question);
      } 
    },

    list: function() {
      return $.get('/api/questions');
    },

    get: function(questionId) {
      return $.get('/api/questions/' + questionId);
    },

    destroy: function(questionId) {
    return $.ajax({
        url: '/api/questions/' + questionId, type: 'DELETE'
      });
    }
  };
})();
