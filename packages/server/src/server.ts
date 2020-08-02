import dotenv from 'dotenv';

import app from './app';

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});

const port = Number(process.env.PORT);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
