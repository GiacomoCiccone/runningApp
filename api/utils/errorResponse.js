//definiamo la struttura globale degli errori

class ErrorResponse extends Error {
  //ogni errore ha un messaggio e uno status code
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
