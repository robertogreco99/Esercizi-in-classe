"use strict";
function film(id, title, favorites, date,rating) {
    this.id=id;
    this.title=title;
    this.favorites=favorites;
    this.date=date && dayjs(date);
    this.rating=rating;

    this.formatRating = () => {
        return this.rating ? this.rating : '<not assigned>';
    }

    this.favoriteR = () =>
    {
        return this.favorite ? this.favorite : '<not assigned>';
    }
    
    this.dateF = () =>
    {
        return this.date ? dayjs(this.date).format('MMMM-DD-YYYY') : '<not defined>'; 
    }
    this.toString = () => { 
     return `Id: ${this.id}, ` +
    `Title: ${this.title}, Favorite: ${this.favoriteR()}, Score: ${this.formatRating()}, ` +
    `watchDate: ${this.dateF()}`;
    }

    this.printFilm = () =>
    {
        console.log(this.toString());
    }

   
}

function FilmLibrary(){
    this.filmlist = [];
    this.addNewFilm = (film) =>
    {
        this.filmlist.push(film);
    }

    this.filmLibraryPrint = () =>
    {
        this.filmlist.forEach( (f) => f.printFilm() )
    }


    this.deleteFilm = (idfilm) => {
        let newlist = this.filmlist.filter((x) => x.id != idfilm);  
        this.filmlist=newlist;
        
    }

    this.resetWatchedFilms = () =>   {
        return this.filmlist.forEach((x) => (x.date = ''));
    }


    this.sortByDate = () => {
        const new_array = [...this.filmlist];
        new_array.sort((f1, f2) => {
          if(f1.date === f2.date)
            return 0;   
          else if(typeof f1.date === 'undefined')
          return 1;
          else if(typeof f2.date === 'undefined')
          return -1;
          else
            return f1.date.diff(f2.date)
        });
        return new_array;
      }

      this.getRated = () =>
      {
          let newlist= this.filmlist.filter((x) =>  typeof x.rating !== 'undefined').sort ((a,b) => (a-b));
          return newlist;
      }
    
}


    const f1 = new film(1, "Pulp Fiction", true, "2022-03-10", 5);
    const f2 = new film(2, "21 Grams", true, "2022-03-17", 4);
    const f3 = new film(3, "Star Wars", false);
    const f4 = new film(4,"Natrix",false);
    const f5 = new film(5,"Shrek",false,"2023-03-21",3);


  
   

    const filmLibrary = new FilmLibrary();
    const filmLibrary2 = new FilmLibrary();
    filmLibrary.addNewFilm(f1);
    filmLibrary.addNewFilm(f2);
    filmLibrary.addNewFilm(f3);
    filmLibrary.addNewFilm(f4);
    filmLibrary.addNewFilm(f5);
    console.log("------------------------");
    filmLibrary2.addNewFilm(f2);
    //filmLibrary2.filmLibraryPrint();
    console.log("------------------------");


    //console.log("SORTED\n");
    //console.log("***** List of Films sorted by date *****");
    //const SortedFilmLibrary = filmLibrary.sortByDate();
    //SortedFilmLibrary.forEach( (f) => f.printFilm() );

    //console.log("***** Array before delete element 3 *****");
    //filmLibrary.filmLibraryPrint();
    //console.log("***** Array after delete element 3 *****");
    //filmLibrary.deleteFilm(3);
    //filmLibrary.filmLibraryPrint();

    //console.log("***** Array before reset date *****");
    //filmLibrary.filmLibraryPrint();
    //console.log("---------------Reset watched film-------------");
    //filmLibrary.resetWatchedFilms();
    //filmLibrary.filmLibraryPrint();

    console.log("***** Array before getRating date *****");
    filmLibrary.filmLibraryPrint();
    console.log("Get rating");
    let filmLibraryRating= filmLibrary.getRated();
    filmLibraryRating.forEach((f)=> f.printFilm());
    
    
   
