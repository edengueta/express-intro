const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// users REST API
const users = [];
let usersCounter = 1;

app.get('/user', (req, res) => {
    res.send(users);
})

app.get('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const requestedUser = users.find(user => user.id === userId);
    if (!requestedUser) {
        res.status(404).send('User not found');
        return;
    }
    res.send(requestedUser);
});

app.put('/user', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send('Incorrect body');
        return
    }
    if (username.length < 3 || password.length < 6) {
        res.status(400).send('Username or Password are invaild');
        return
    }
    const newUser = {
        id: usersCounter,
        username,
        password
    };
    usersCounter++;
    users.push(newUser);
    res.sendStatus(201);
});

app.delete('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        res.sendStatus(404)
    }
    res.status(200).send(`Bye Bye ${users[userIndex].username}`);
    users.splice(userIndex, 1);
});

app.post('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send('Incorrect body');
        return
    }
    if (username.length < 3 || password.length < 6) {
        res.status(400).send('Username or Password are invaild');
        return
    }
    users[userIndex] = {
        id: userId,
        username,
        password
    }
    res.sendStatus(200);
});

app.post('/user/login', (req, res) => {
    const { username, password } = req.body;
    const userIndex = users.findIndex(user => user.username === username);

    if (userIndex === -1 || users[userIndex].username !== username || users[userIndex].password !== password) {
        res.status(403).send('Incorrect Username or Password');

    } else {
        res.status(200).send('Login Successful');
    }
});


// photos REST API
const photos = [];
let photosCounter = 1;

app.get('/photo', (req, res) => {
    res.send(photos);
})

app.get('/photo/:id', (req, res) => {
    const photoId = parseInt(req.params.id);
    const requestedPhoto = photos.find(photo => photo.id === photoId);
    if (!requestedPhoto) {
        res.status(400).send('Photo not found');
        return
    }
    res.send(requestedPhoto);
});

app.put('/photo', (req, res) => {
    const { title, filename } = req.body;
    if (!title || !filename) {
        res.status(400).send('Incorrect body');
        return
    }

    const newPhoto = {
        id: photosCounter,
        title,
        filename
    };
    photosCounter++;
    photos.push(newPhoto);
    res.sendStatus(201);
});

app.delete('/photo/:id', (req, res) => {
    const photoId = parseInt(req.params.id);
    const photoIndex = photos.findIndex(photo => photo.id === photoId);
    if (photoIndex === -1) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(`Bye Bye ${photos[photoIndex].title}`);
    photos.splice(photoIndex, 1);
});


app.post('/photo/:id', (req, res) => {
    const photoId = parseInt(req.params.id);
    const photoIndex = photos.findIndex(photo => photo.id === photoId);
    const { title, filename } = req.body;
    if (!title || !filename) {
        res.status(400).send('Incorrect body');
        return
    }
    photos[photoIndex] = {
        id: photoId,
        title,
        filename
    }
    res.sendStatus(200);
});


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})