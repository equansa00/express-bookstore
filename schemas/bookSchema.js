const bookSchema = {
    type: "object",
    properties: {
      isbn: { type: "string" },
      amazon_url: { type: "string", format: "uri" },
      author: { type: "string" },
      language: { type: "string" },
      pages: { type: "integer" },
      publisher: { type: "string" },
      title: { type: "string" },
      year: { type: "integer" }
    },
    required: ["isbn", "amazon_url", "author", "title", "publisher", "year"],
    additionalProperties: false
  };
  

module.exports = bookSchema;