import uuidv4 from 'uuid/v4';
import slugify from 'slugify';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { connectDB } from './db';
import User from './models/user';
import Directory, { Rank } from './models/directory';
import Post from './models/post';
// slugify('Calculo 1', { lower: true })

const app = express();
connectDB();

app.use(cookieParser());
app.use(bodyParser.json());
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
  const murtinha = {
    user: 'murtinha',
    pass: '123',
    name: 'Murta',
    avatarUrl: 'https://img.ibxk.com.br/2013/8/materias/1649968641515049.jpg',
    course: 'Ciencia da Computação',
    email: 'email@gmail.com',
    description: 'gente fina',
    directories: ['calculo1', 'calculo2'],
  }

  const gene = {
    user: 'gene',
    pass: '123',
    name: 'Gene',
    avatarUrl: 'https://img.ibxk.com.br/2013/8/materias/1649968641515049.jpg',
    course: 'Ciencia da Computação',
    email: 'email@gmail.com',
    description: 'gente fina',
    directories: ['calculo1', 'calculo2'],
  };
  User.create(murtinha);
  User.create(gene);
  res.status(201).send('created');
});

app.post('/register', async (req, res) => {
  const { body } = req;
  const findUser = await User.findOne({ user: body.user });
  if (findUser === null) {
    const token = uuidv4();
    const user = await User.create({ ...body, token });
    res.cookie('userId', token, { maxAge: 900000 });
    res.status(201).json(user);
  }
  res.status(200).json({ msg: 'user exist' });
});

app.post('/login', async (req, res) => {
  const { body } = req;
  const { user, pass } = body;
  console.log(user, pass);
  const findUser = await User.findOne({ user, pass });
  console.log(findUser)
  if (findUser === null) {
    res.status(200).json({ msg: 'login error' });
  } else {
    res.cookie('userId', findUser.token, { maxAge: 900000 });
    res.status(200).json(findUser);
  }
});

app.get('/users', async (req, res) => {
  const { query, cookies } = req;
  const { userId } = cookies;
  const { user, pass } = query;

  // console.log(req)
  // if (user === 'gene' && pass === '123') {
  // res.cookie('userId', uuidv4(), { maxAge: 900000 });
  // }
  res.json(await User.remove());
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

app.get('/dirs/:course', async (req, res) => {
  res.json(await Directory.find({ course: req.params.course }));
});

app.get('/dirs/:userId/:course', async (req, res) => {
  const { course, userId } = req.params;
  const dirsList = await Directory.find({ course });
  const dirs = dirsList.map(d => d._id);
  res.json(User.addDirectories(userId, dirs));

  // res.json(dirsList);
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
