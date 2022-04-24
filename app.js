const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const { rearg } = require('lodash')

// express app
const app = express()

// connetct to mogodb
const dbRI = 'mongodb+srv://zlarkisz:zlarkisz270397@cluster0.qgcwq.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbRI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.error(err))

//register view engine
app.set('view engine', 'ejs')


// middleware & static files
app.use(express.static('public'))
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/about', (req, res) => {
  // res.send('<p>About page</p>')
  res.render('about', { title: 'About' })
})

// blog routes
app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { title: 'All Blogs', blogs: result })
    })
    .catch(err => console.log(err))
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' })
})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})