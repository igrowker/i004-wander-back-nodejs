import express from 'express';

const app = express();
const PORT = 5005;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Test server listening on http://localhost:${PORT}`);
});
