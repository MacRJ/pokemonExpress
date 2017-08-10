var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    database : 'pokemon'
  }
});

/* GET home page. */
// index
router.get('/', function(req, res, next) {
knex.raw(`SELECT * FROM pokemons`)
.then(function(data){
  console.log("index")
  res.render('pokemon', { title: 'Pokemon', pokemons: data.rows });
})
});
// show
router.get('/:id', function(req, res, next){
  knex.raw(`SELECT * FROM pokemons where id = ${req.params.id}`)
  .then(function(data){
    console.log(data.rows, "show")
    res.render('pokemon', {title: 'This Pokemon', pokemons: data.rows})
  })
})
// create
router.post('/', function(req, res, next){
  knex.raw(`INSERT into pokemons(name) VALUES (${req.body.name})`)
  .then(function(data){
    console.log(data.rows, "create");
    res.redirect('pokemon')
  })
})
// update
router.patch('/:id', function(req, res, next){
knex.raw(`UPDATE pokemons set name= ${req.body.name} WHERE id=${req.body.id}`)
.then(function(data){
  console.log(data.rows, "update")
  res.redirect('pokemon')
})
})
// delete
router.delete('/:id', function(req, res, next){
  knex.raw(`DELTE FROM pokemons WHERE id = ${req.params.id}`)
  .then(function(data){
    console.log(data.rows, "delete")
    res.redirect('pokemon')
  })
})


module.exports = router;
