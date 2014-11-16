'use strict';
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Questions', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title:     { type: DataTypes.STRING },
        text:      { type: DataTypes.TEXT },
        createdAt: { type: DataTypes.DATE },
        updatedAt: { type: DataTypes.DATE }
    }).complete(function() {
        migration.addIndex('Questions', ['title']).complete(done);
    });
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('Questions').complete(done);
  }
};
