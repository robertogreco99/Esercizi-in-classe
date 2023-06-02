
The `laboratorio-8` is the server-side app companion of ```laboratorio-7```. It presents some APIs to perform CRUD operations on the answers of the HeapOverrun web application example.

## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### __List Films__

URL: `/api/films`

Method: GET

Description: Get all the films.

Request body: _None_

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body: An array of objects, each describing a film.
```
[
   {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": 0,
    "watchDate": "2023-05-11T07:33:32.427Z",
    "rating": 2,
    "user": 1
  }
...
]
```

### __Get a Film (by Id)__

URL: `/api/films/<id>`

Method: GET

Description: Get the film identified by the id `<id>`.

Request body: _None_

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body: An object, describing a single question.
{
  "id": 4,
  "title": "Matrix",
  "favorite": 0,
  "watchDate": "2023-05-11T07:29:17.254Z",
  "rating": 0,
   "user": 2
}

### __Add a New film__

URL: `/api/films`

Method: POST

Description: Add a new film to the list of films.

Request body: An object representing an film (Content-Type: `application/json`).
```
{
    "title": "a silent voice",
    "favorite": 0,
    "watchDate": "2023-05-11",
    "rating":0,
    "user": 1
}
```

Response: `201 Created` (success) or `503 Service Unavailable` (generic error, e.g., when trying to insert an already existent answer by the same user). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: An object representing the inserted film, notably with the newly assigned id by the database (Content-Type: `application/json`).

## Update an Film
URL: `/api/films/<id>`

Method: PUT

Description: Update entirely an existing film, identified by its id.

Request body: An object representing the entire film (Content-Type: application/json).

{
    "id" :1,
    "title": "Your Name",
    "favorite": 1,
    "watchDate": "2023-06-10",
    "rating": 5,
    "user": 2    
}
Response: `200 OK (success)` or `503 Service Unavailable (generic error)`. If the request body is not valid, `422 Unprocessable Entity (validation error)`.


Response body: None.

## Delete an Answer

URL: `/api/answers/<id>`

Method: DELETE

Description: Delete an existing film, identified by its id.

Request body: None

Response: `204 No Content (success)` or `503 Service Unavailable (generic error)`.

Response body: None







































### __Update an Answer__

URL: `/api/answers/<id>`

Method: PUT

Description: Update entirely an existing answer, identified by its id.

Request body: An object representing the entire answer (Content-Type: `application/json`).
```
{
    "id": 1,
    "text": "for of",
    "respondent": "Alice",
    "score": 3,
    "date": "2023-03-07",
    "questionId": 1
}
```

Response: `200 OK` (success) or `503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: _None_


### __Vote an Answer__

URL: `/api/answers/<id>/vote`

Method: POST

Description: Upvote or downvote an existing answer (i.e., increase or reduce its score by 1), the answer is identified by its id.

Request body: An object representing the action, either upvote or downvote (Content-Type: `application/json`).  
```
{
    "vote": "upvote"
}
```

Response: `201 Created` (success) or `503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: _None_



### __Delete an Answer__

URL: `/api/answers/<id>`

Method: DELETE

Description: Delete an existing answer, identified by its id.

Request body: _None_

Response: `204 No Content` (success) or `503 Service Unavailable` (generic error).

Response body: _None_