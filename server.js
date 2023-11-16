/** Server for bookstore. */


const app = require("./app");

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log(`Server starting on port 3000`);
  });
}
