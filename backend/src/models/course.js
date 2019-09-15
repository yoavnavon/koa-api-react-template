module.exports = (sequelize, DataTypes) => {
  const course = sequelize.define('course', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
  }, {});

  course.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return course;
};
