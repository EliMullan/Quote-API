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
    console.log(author);
    if(!author) {
        res.send({quotes})
    } else {
        const filteredQuotes = quotes.filter(quote => quote.person == author);
        res.send(filteredQuotes);
    }
})



app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
})

