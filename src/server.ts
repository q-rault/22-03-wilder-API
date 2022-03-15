import { Request, Response } from 'express';
import wilderController from './controllers/Wilder';

const express = require('express');

const app = express();
const mongoose = require('mongoose');

const cors = require('cors');

const port = 3001;

mongoose
  .connect('mongodb://127.0.0.1:27017/wilderdb', { autoIndex: true })
  .then(() => console.log('connection au serveur réussie')) // eslint-disable-line no-console
  .catch(() => console.log('erreur')); // eslint-disable-line no-console

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const runAsyncWrapper =
  (callback: any) =>
  (req: Request, res: Response, next: any): any =>
    Promise.resolve(callback(req, res, next)).catch(next);

// app.get("/", (req, res) => {
//   WilderModel.init().then(() => {
//     const firstWilder = new WilderModel({
//       name: "First Wilder",
//       city: "San Francisco",
//       skills: [
//         { title: "HTML", votes: 10 },
//         { title: "React", votes: 5 },
//       ],
//     });

//     firstWilder
//       .save()
//       .then((result) => {
//         console.log("success:", result);
//         res.status(200).send("wilder saved");
//       })
//       .catch((err) => {
//         console.log("error:", err);
//         res.status(400).send("error while saving");
//       });
//   });
// });

app.post('/api/wilder/create', runAsyncWrapper(wilderController.create));

app.get('/api/wilder/read', runAsyncWrapper(wilderController.read));

app.put('/api/wilder/update/:id', runAsyncWrapper(wilderController.update));
// app.patch("/api/wilder/patch/:id", wilderController.patch);

app.delete('/api/wilder/delete/:id', runAsyncWrapper(wilderController.delete));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World test!');
});

app.use((error: any, req: Request, res: Response) => {
  if (error.code === 11000) {
    res
      .status(400)
      .json({ success: false, message: 'The name is already used' });
  } else {
    res.status(400).json('unknown error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // eslint-disable-line no-console
});
