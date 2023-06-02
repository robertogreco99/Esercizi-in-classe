"use strict";
const starEmpty = '<svg class="empty-star" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"> <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/></svg>    ';
const starFilled = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>    ';

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
        return this.favorites ? this.favorites : '<not assigned>';
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

    const f1 = new film(1, "The end of evangelion", true, "2022-03-10", 5);
    const f2 = new film(2, "A silent voice", true, "2022-03-17", 4);
    const f3 = new film(3, "Akira", false);
    const f4 = new film(4,"Spirited Away",false);
    const f5 = new film(5,"Your name",false,"2023-03-21",3);
    const filmLibrary = new FilmLibrary();  

    filmLibrary.addNewFilm(f1);
    filmLibrary.addNewFilm(f2);
    filmLibrary.addNewFilm(f3);
    filmLibrary.addNewFilm(f4);
    filmLibrary.addNewFilm(f5);
    console.log("------------------------")
    filmLibrary.filmLibraryPrint();

    function createFilmRow(film) {
        const tr = document.createElement('tr');
        
        const tdId = document.createElement('td');
        tdId.innerText = film.id;
        tr.appendChild(tdId);
        
        const tdTitle = document.createElement('td');
        tdTitle.innerText = film.title;
        tr.appendChild(tdTitle);
        
        /*const tdFavorites = document.createElement('td');
        tdFavorites.innerText = film.favoriteR();
        tr.appendChild(tdFavorites);*/

        const tdFavorites = document.createElement('td');
        const checkboxId = `favorite_${film.id}`;
        const checkbox = `<input type="checkbox" id="${checkboxId}" name="favorite" />`;
        const label = `<label for="${checkboxId}"> Favorite </label>`;
        tdFavorites.innerHTML = checkbox + label;
        tr.appendChild(tdFavorites);


        
        const tdDate = document.createElement('td');
        tdDate.innerText = film.dateF();
        tr.appendChild(tdDate);

        const tdRating = document.createElement('td');
        tdRating.innerText = film.formatRating();
        tr.appendChild(tdRating);
        
        return tr;
      }

      //caricare film dal db
      document.addEventListener('DOMContentLoaded', (event) => {

        const table = document.getElementById('filmtable');
        const tableBody = table.querySelector('tbody');
    
        for (const film of filmLibrary.filmlist) {
            const tr = createFilmRow(film);
            tableBody.appendChild(tr);
        }



        document.getElementById('addbutton').addEventListener('click', (event) => {
            // extract content from user inputs
            const idform = document.querySelector('input[name="id"]').value;
            console.log(idform);
            const titleform= document.querySelector('input[name="title"]').value;
            console.log(titleform);
            const favoritesform = document.querySelector('input[name="favorites"]').value;
            console.log(favoritesform);
            const dateform = document.querySelector('input[name="date"]').value;
            console.log(dateform);
            const ratingform= document.querySelector('input[name="rating"]').value;
            console.log(ratingform);
    
            const tdErr = document.getElementById('error-message');


            if (idform && titleform && favoritesform) { // minimum validation: no missing date
                //const answer = new Answer(text, author, 0, date);
                const filmnew = new film(idform,titleform,favoritesform,dateform,ratingform);
                const tr = createFilmRow(filmnew);
                tableBody.appendChild(tr);
                
    
                // hide error message
                tdErr.classList.add('invisible');
                tdErr.innerText = '';
            } else {
                // show error message
                tdErr.classList.remove('invisible');
                tdErr.innerText = "Invalid data";
    
                // automatically hide error message after 3 seconds
                setTimeout(() => {
                    tdErr.classList.add('invisible');
                    tdErr.innerText = '';
                }, 3000);
            }
        });
      });



/**
 * Function to manage film filtering in the web page.
 * @param {string}   filterId  The filter node id.
 * @param {string}   titleText The text to put in the film list content h1 header.
 * @param {function} filterFn  The function that does the filtering and returns an array of films.
 */
function filterFilms( filterId, titleText, filterFn ) {
    // if called without parameters, repeat last used filter
    if (!filterId) ({filterId, titleText, filterFn} = filterFilms.currentFilter);
    
    document.querySelectorAll('#left-sidebar div a ').forEach( node => node.classList.remove('active'));
    document.getElementById("filter-title").innerText = 'Filter: ' + titleText;
    document.getElementById(filterId).classList.add('active');
    clearListFilms();
    createListFilms(filterFn());

    // register delete event handler for each film item
    document.querySelectorAll(".delete-icon").forEach( item => item.addEventListener('click', event => {
        const filmId = event.currentTarget.parentElement.parentElement.parentElement.id
                       .slice('film'.length);
        filmLibrary.delete(filmId);
        filterFilms();
        event.preventDefault();
    }));

    // remember last used filter
    filterFilms.currentFilter = { filterId, titleText, filterFn };

}

document.getElementById("filter-all").addEventListener( 'click', event => 
 filterFilms( 'filter-all', 'All', filmLibrary.filterAll )
);

document.getElementById("filter-favorites").addEventListener( 'click', event => 
    filterFilms( 'filter-favorites', 'Favorites', filmLibrary.filterByFavorite )
);

document.getElementById("filter-best").addEventListener( 'click', event => 
    filterFilms( 'filter-best', 'Best Rated', filmLibrary.filterByBestRated )
);

document.getElementById("filter-seen-last-month").addEventListener( 'click', event => 
    filterFilms( 'filter-seen-last-month', 'Seen Last Month', filmLibrary.filterBySeenLastMonth )
);

document.getElementById("filter-unseen").addEventListener( 'click', event => 
    filterFilms( 'filter-unseen', 'Unseen', filmLibrary.filterByUnseen )
);
    

filterFilms( 'filter-all', 'All', filmLibrary.filterAll );