const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


//setup and mount the router
const quotesRouter = express.Router();
app.use('/api/quotes', quotesRouter);


//get a random quote
quotesRouter.get('/random', (req, res) => {
    let randomQuote = getRandomElement(quotes);
    res.send({
        quote: randomQuote 
    });
});

//get all quotes or filter by author
quotesRouter.get('/', (req, res) => {
    let author = req.query.person;
    if(!author) {
        res.send({quotes})
    } else {
        let filteredQuotes = [];
        quotes.forEach(quote => {if (quote.person == author) { filteredQuotes.push(quote)}});
        res.send({
            quotes: filteredQuotes  
        });
    }
});

//create post request to add a new quote 
quotesRouter.post('/', (req, res) => {
    if(req.query.quote || req.query.person) {
        let newQuote = {
            quote: req.query.quote,
            person: req.query.person
        }
        quotes.push(newQuote);
        res.send({
            quote:newQuote
        });
    } else {
        res.status(400).send(`You must give me a quote and a person`)
    }
})

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
})

