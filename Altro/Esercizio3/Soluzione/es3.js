/*Exercise 3: Q&A
Goal: managing a simple data structure as an array of objects.

Using JavaScript objects and functional programming methods, manage objects that contain information about a question and their answers.

Each answer will contain:
-Response (text)
-Respondent name
-Score (integer number, positive or negative)
-Date
Define a constructor function Answer to create one or more answers.
A question, instead, is made of:
-Question (text)
-Questioner name
-Date
-List of answers

Define a constructor function Question to represent a question. Implement the following methods to manipulate its answers:
-add(answer) // pass a fully-constructed Answer object
-findAll(name) // returns all the Answers of a given person
-afterDate(date) // returns an array of Answers after the given date
-listByDate() // returns an array of Answers, sorted by increasing date
-listByScore() // idem, by decreasing score
Create an instance of Question with at least four Answers in it.

*/
"use strict";

const dayjs = require("dayjs");


let now = dayjs().format();
console.log(now);
//creo costruttore
function Answer(text, respondent, score, date) {
    this.text = text;
    this.respondent = respondent;
    this.score = score;
    this.date = date;
    this.str = function () { return `${this.text} ( by ${this.respondent} ) on ${this.date.format('YYYY-MM-DD')}, score : ${this.score}` };
}

function Question(text, questioner, date) {
    this.text = text;
    this.questioner = questioner;
    this.date = date;
    this.list = [];
    this.add = (e) => { this.list.push(e) };

    this.findAll = (authorName) => {
        return this.list.filter((e) => e.respondent === authorName);
    };

    this.listbyScore = () => {
        const newList = [...this.list];
        return newList.sort((a, b) => b.score - a.score);
    }

    this.listbyDate = () => { 
        return [...this.list].sort((a, b) => a.date.diff(b.date));
    }

    this.afterDate = (date) => this.list.filter((e) => e.date.isAfter(date));

    this.avgScore = () =>  {
        const votes = this.list.map((e)=> e.score);
        return votes.reduce((acc,val,i,arr) => acc+val/arr.length, 0 );
        /*let sum =0;
        for (let val of votes )
            sum+=val;
        return sum/votes.length;*/
    }

}
//creo un Answer e una question
const q = new Question('Best way of enumbering an array in Js', "Foros", dayjs('2023-02-28'));
const ans1 = new Answer("for of", "Peppe", "3", dayjs('2023-03-07'));
const ans2 = new Answer("for i=0; i<N;i++", "Rosario", 1, dayjs('2023-03-04'));
const ans3 = new Answer("for in", "Samu", -2, dayjs('2023-03-02'));
const ans4 = new Answer("i=0 while i<n", "Rosario", -1, dayjs('2023-03-01'));
//console.log(ans1.str());
//console.log(q);

q.add(ans1);
q.add(ans2);
q.add(ans3);
q.add(ans4);

q.findAll("Rosario").forEach(x => console.log(x.str()));
console.log("--------------------------------------");
q.listbyScore().forEach(x => console.log(x.str()));
console.log("--------------------------------------");
q.afterDate(dayjs("2023-03-03")).forEach(x => console.log(x.str()));
console.log("--------------------------------------");
q.listbyDate().forEach(x => console.log(x.str()));
console.log("--------------------------------------");
console.log(q.avgScore());











