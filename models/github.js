'use strict';
module.exports = (sequelize, DataTypes) => {
  const Github = sequelize.define('Github', {
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  Github.associate = function(models) {
    // associations can be defined here
  };
  return Github;
};