'use strict';
import dayjs from 'dayjs';

function film(id, title, favorites, date,rating) {
    this.id=id;
    this.title=title;
    this.favorites=favorites;
    this.date=date && dayjs(date);
    this.rating=rating;
};
/*const filmlist = [  
    new film(1, "TheEndofEvangelion", true, "2023-04-10", 5),
    new film(2, "A silent voice", false, "2023-04-21", 4),
    new film(3, "Spirited Away", true),
    new film(4,"Ghost in the shell",false),
    new film(5,"Quintessential quintuplets",false,"2023-04-11",3),
];*/

export {film/*,filmlist*/}