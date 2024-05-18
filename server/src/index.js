
import express from 'express';
import dotenv from 'dotenv';
import {Open} from './Open.js'

dotenv.config();
const PORT = process.env.PORT || 5000;
const open = new Open();

const app = express();

app.get('/', async (req, res) => {
	res.json(await open.chat());
})

app.listen(PORT, () => {
	  console.log(`Server is running on port ${PORT}`);
})
