const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const artist = require('./artist.json')

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
  app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send(artist.results))

app.get('/songs/id/:id', (req,res) => {
    res.send(artist.results.filter(song => song.trackId == req.params.id))
})

app.get('/songs/name/:name', (req,res) => {
    res.send(artist.results.filter(song => song.trackName == req.params.name))
})

app.get('/album/id/:id', (req,res) => {
    res.send(artist.results.filter(song => song.collectionId == req.params.id))
})

app.get('/album/name/:name', (req,res) => {
    res.send(artist.results.filter(song => song.collectionName == req.params.name))
})

app.get('/artist/id/:id', (req,res) => {
    res.send(artist.results.filter(artist => artist.artistId == req.params.id))
})

app.get('/artist/name/:name', (req,res) => {
    res.send(artist.results.filter(artist => artist.artistName == req.params.name))
})

app.patch('/update/song/:id', (req,res) => {
    var index = -1;
    for(var i = 0; i<artist.results.length; i++){
        if(artist.results[i].trackId == req.params.id){
            index = i
            break
        }
    }

    if (index == -1) { res.send([]); }
    else {
        for(let field in req.body){
            artist.results[index][field] = req.body[field]         
        }
        res.send(artist.results[index])
    }
})

app.delete('/delete/:id', (req,res) => {
    var index = -1;
    for(var i = 0; i<artist.results.length; i++){
        if(artist.results[i].trackId == req.params.id){
            index = i
            break
        }
    }
    if (index == -1) { res.send([]); }
    else {
        delete artist.results[index]
        res.send("record deleted")
    }
})

app.post('/add', (req,res) =>{
    let songId = req.body.trackId;
    let songName = req.body.trackName;
    artist.results.push({trackId: songId , trackName: songName})
    res.send("song added")
})

app.listen(3000, () => console.log(`Example app listening at http://localhost:3000`))