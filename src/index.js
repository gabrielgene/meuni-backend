import uuidv4 from 'uuid/v4';
import slugify from 'slugify';
import express from 'express';
import cors from 'cors';

import { connectDB } from './db';
import User from './models/user';
import Directory, { Rank } from './models/directory';
import Post from './models/post';
const app = express();

// slugify('Calculo 1', { lower: true })

connectDB();

app.use(cors());

app.get('/', async (req, res) => {
  const posts = await Post.find(
    {
      directory: ['calculo-1', 'engenharia-de-software'],
    }
  );
  res.json(posts);
});

app.get('/p', async (req, res) => {
  const posts = await Post.pagination(
    {
      directory: ['calculo-1', 'engenharia-de-software'],
    },
    1, 3
  );
  res.json(posts);
});

app.get('/create-user', async (req, res) => {
  const ravi = {
    user: 'ravi',
    pass: 'ravi123',
    image: 'image.com.br',
    description: 'teste de descrição',
    course: 'engenharia-da-computacao',
  };

  const gene = {
    user: 'gene',
    pass: 'gene123',
    image: 'image.com.br',
    description: 'teste de descrição',
    course: 'ciencia-da-computacao',
  };
  User.create(ravi);
  User.create(gene);
  res.status(201).send('created');
});

app.get('/create-dir', async (req, res) => {
  const calculo1 = {
    name: 'Calculo 1',
    slug: 'caluclo-1',
    course: 'engenharia-da-computacao',
  }
  const calculo2 = {
    name: 'Calculo 2',
    slug: 'calculo-2',
    course: 'engenharia-da-computacao',
  }

  const desenvolvimento = {
    name: 'Desenvolvimento Web',
    slug: 'desenvolvimento-web',
    course: 'ciencia-da-computacao',
  }

  Directory.create(calculo1);
  Directory.create(calculo2);
  Directory.create(desenvolvimento);
  res.status(201).send('created');
});

app.get('/users', async (req, res) => {
  res.json(await User.find());
});


app.get('/dirs/:course', async (req, res) => {
  res.json(await Directory.find({ course: req.params.course }));
});

app.get('/dirs/:userId/:course', async (req, res) => {
  const { course, userId } = req.params;
  const dirsList = await Directory.find({ course });
  const dirs = dirsList.map(d => d._id);
  res.json(User.addDirectories(userId, dirs)

  res.json(dirsList);
});



app.get('/create-post/:userId', async (req, res) => {
  const post = await Post.create({
    postId: uuidv4(),
    text: 'Texto de post',
    directory: 'calculo-2',
    userId: req.params.userId,
  });
  res.json(post);
});


app.get('/posts', async (req, res) => {
  res.json(await Post.find());
});

app.listen(8080, () => console.log('Server running on 8080'));


// const dir = Post.find({ directory: ['calculo-1', 'engenharia-de-software'] });

// dir.then(e => console.log(e));
