const express = require("express"); //loads the express module
const router = express.Router(); //uses express module to get an express.Router object

const booklist = require("./bookListController");

/* Get Homepage */
router.get("/booklist", booklist.index);
router.post("/book/create", booklist.create);
router.get("/book/:id", booklist.show);
router.delete("/book/:id", booklist.delete);
router.put("/book/:id", booklist.update);

module.exports = router;
