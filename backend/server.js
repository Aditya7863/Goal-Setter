import express from 'express';
const port = process.env.PORT || 5000;
const app = express();


app.get('/');

app.listen(port,()=>console.log(`Listening on port ${port}`));