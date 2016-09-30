const express = require('express');
var patch = require('fast-json-patch');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
// A middleware for echoing X-* headers to test header sending functionality
app.use((req, res, next) => {
    for (var h in req.headers) {
        if (h.indexOf('x-') >= 0)  {
            res.append(h, req.headers[h]);
        }
    }
    next();
});

const store = {};

app.get('/store/:id', (req, res) => {
    const cell = store[req.params.id];
    if (cell) {
        res.append('Last-Modified-Time', cell.lastModified.toISOString());
        res.status(200).send(cell.value);
    } else {
        res.status(404).send('Nothing Here!');
    }
});

app.put('/store/:id', (req, res) => {
    store[req.params.id] = {
        value: req.body,
        lastModifed: new Date()
    };
    res.append('Location', req.path);
    res.status(201).send(req.body);
});


app.patch('/store/:id', (req, res) => {
    const cell = store[req.params.id];
    if (cell) {
        patch.apply(cell.value, req.body);
        res.status(200).send(cell.value);
    } else {
        res.status(404).send('Nothing Here!');
    }
});

app.delete('/store/:id', (req, res) => {
    if (store[req.params.id]) {
        delete store[req.params.id];
        res.status(204).send();
    } else {
        res.status(404).send('Nothing Here!');
    }
});

app.post('/store/', (req, res) => {
    const id = Date.now().toString();
    store[id] = {
        value: req.body,
        lastModified: new Date()
    };
    res.append('Location', `/store/${id}`);
    res.status(201).send(req.body);
});

app.listen(5000);
