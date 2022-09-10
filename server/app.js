const express = require('express');
const app = express();

// app.use("/", path.join(__dirname, "public"))
app.use("/static", express.static("public"))


// First
app.use("/", (req, res, next) => {
  console.log('First e');
  next()
});



// Second
app.use((req, res, next) => {
  console.log('Second d');
  next();
});

app.use("/", (req, res, next) => {
  console.log("third other resoures")
  const error = new Error('First Error');
  next(error);
})

// Third
app.get('/other-resource', (req, res, next) => {
  console.log('Third');
  next();
}, (req, res, next) => {
  res.send('Message');
});

// Fourth
const fourth = (req, res, next) => {
  console.log('Fourth');
  const error = new Error('Fourth');
  throw error;
};

// Fifth
const fifth = (err, req, res, next) => {
  console.log('Fifth');
  next();
};



app.use('/', [fourth, fifth]);

// Sixth
app.get('/other-resource', (req, res, next) => {
  console.log('Sixth');
  next();
});

// Seventh
app.use((req, res, next) => {
  console.log('Seventh');
  res.send('Message');
});

// Eighth
app.use((err, req, res, next) => {
  console.log('Eighth');
  res.send('Message');
});


const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));