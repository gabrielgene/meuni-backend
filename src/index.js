import uuidv4 from 'uuid/v4';
import slugify from 'slugify';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';

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
  res.sendfile(path.join(__dirname + '/index.html'));
});

app.get('/users', async (req, res) => {
  res.json(await User.find());
});

app.get('/delete-users', async (req, res) => {
  res.clearCookie('userId');
  res.json(await User.remove());
});

app.get('/insert-dirs', async (req, res) => {
  const dirs = [
    {
      name: 'Calculo 1',
      slug: 'calculo-1',
      course: 'ciencia-da-computacao',
    },
    {
      name: 'Redes',
      slug: 'redes',
      course: 'ciencia-da-computacao',
    },
    {
      name: 'Web',
      slug: 'web',
      course: 'ciencia-da-computacao',
    },
    {
      name: 'Penal',
      slug: 'penal',
      course: 'direito',
    },
    {
      name: 'Civil',
      slug: 'civil',
      course: 'direito',
    },
    {
      name: 'Criminal',
      slug: 'criminal',
      course: 'direito',
    }
  ];

  dirs.forEach(d => {
    Directory.create(d);
  });
  res.status(200).json({ msg: 'ok'})
});

app.get('/dirs', async (req, res) => {
  res.json(await Directory.find());
});

app.get('/delete-dirs', async (req, res) => {
  res.json(await Directory.remove());
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
  const findUser = await User.findOne({ user, pass });
  if (findUser === null) {
    res.status(201).json({ msg: 'login error' });
  } else {
    res.cookie('userId', findUser.token, { maxAge: 900000 });
    res.status(200).json(findUser);
  }
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
