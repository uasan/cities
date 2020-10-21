# Cities backend

## Installation  
```bash
npm install
docker build -t postgresql ./
docker run --name cities -p 127.0.0.1:5432:5432/tcp postgresql
npm test
npm start
```

## Usage

###List of cities
```bash
GET http://localhost:3001/cities:<searchStr, min 3 symbols>
```
Returns array of matched cities names in json.


 

