# CSV-Uploader

## Description
A .csv file uploader using multer.

## Requirement
1. NodeJS
2. MongoDB


## Dependencies Used 
1. npm install express
2. npm install mongoose
3. npm install multer
4. npm install nodemon
5. npm install csvtojson
6. npm install ejs


## Setup and Execution
1. Clone this repository.
2. Install above given dependencies.
3. For Naive testing, (base url - http://localhost:8000
   - Start the server by 'npm start' and test using postman services

## Routes Used
```
1. /GET    '/'
  -This route is used for Homepage.
  
2. /GET    '/files/show-all'
  -This route is used for display all the uploaded files.
  
3. /GET    '/files/:id/show-file-content'
  -This route is used for show specified file content.
  
4. /POST   '/files/upload'
  -This route is used for uploading the file.
  

```
