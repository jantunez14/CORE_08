const Sequelize = require('sequelize');
const path = require('path');

const url = process.env.DATABASE_URL || "sqlite:quiz.sqlite";
//const options = {logging: false, operatorsAliases: false};
const sequelize = new Sequelize(url);

sequelize.define(
    'quiz',
    {
        question: Sequelize.STRING,
        answer: Sequelize.STRING
    }
);

const Quiz = sequelize.models.quiz;

sequelize.sync() // Syncronize DB and seed if needed
    .then(() => Quiz.count())
    .then(count => {
        if (count === 0) {
            return Quiz.bulkCreate([
                {question: "Question Number 1", answer: "Answer Number 1"},
                {question: "Capital of Italy", answer: "Rome"},
                {question: "Capital of France", answer: "Paris"},
                {question: "Capital of Spain", answer: "Madrid"},
                {question: "Capital of Portugal", answer: "Lisbon"}
            ])
                .then(c => console.log(`DB filled with ${c.length} quizzes.`));
        } else {
            console.log(`DB exists & has ${count} quizzes.`);
        }
    })
    .catch(console.log);

module.exports = sequelize;
