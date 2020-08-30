const createError = require("http-errors");

let books = [
  {
    id: 0,
    name: "Harry Potter and the Philosopher's Stone",
    author: "J. K. Rowling",
    status: "read",
    link:
      "https://www.amazon.co.uk/Harry-Potter-Philosophers-Stone-Book/dp/B017V51FEG/ref=sr_1_4?dchild=1&keywords=Harry+Potter&qid=1598802105&sr=8-4",
  },
];
let idNum = 1;

//displays the entire booklist
exports.index = function (req, res) {
  res.send({ books });
};

//adds a book entry to the list
exports.create = function (req, res, next) {
  if (!req.body.name) {
    return next(createError(400, "Book name is required"));
  }
  if (!req.body.author) {
    return next(createError(400, "Author name is required"));
  }
  if (!req.body.status) {
    return next(createError(400, "Book status is required"));
  }

  books.push({
    id: idNum,
    name: req.body.name,
    author: req.body.author,
    status: req.body.status,
    link: req.body.link,
  });
  res.send("New book has been added.");
  idNum++;
};

//returns a book entry by id
exports.show = function (req, res, next) {
  const requestedBook = books.find((book) => book.id == req.params.id);
  if (!requestedBook) {
    return next(createError(404, "No book available with that id."));
  }
  res.send(requestedBook);
};

//deletes a book entry by id
exports.delete = function (req, res, next) {
  const bookToDelete = books.find((book) => book.id == req.params.id);
  if (!bookToDelete) {
    return next(createError(404, "No book available with that id"));
  }
  books = books.filter((book) => book.id != req.params.id);
  res.send("Requested book has been deleted.");
};

//edits a book entry by id
exports.update = function (req, res, next) {
  const bookToUpdate = books.find((book) => book.id == req.params.id);
  if (!bookToUpdate) {
    return next(createError(404, "No book available with that id"));
  }

  if (!req.body.name) {
    return next(createError(400, "Book name is required"));
  }
  if (!req.body.author) {
    return next(createError(400, "Author name is required"));
  }
  if (!req.body.status) {
    return next(createError(400, "Book status is required"));
  }
  books = books.map((book) => {
    if (book.id == req.params.id) {
      (book.name = req.body.name), (book.author = req.body.author);
    }
    return book;
  });
  res.send("Book list has been updated.");
};
