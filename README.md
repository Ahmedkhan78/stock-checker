
# Stock Price Checker - FreeCodeCamp Project

This is a full stack JavaScript application built as part of the **Information Security Project**. The project allows users to view real-time stock prices and like stocks. It also supports comparing two stocks with relative likes.  

The app is functionally similar to [FCC Stock Price Checker example](https://stock-price-checker.freecodecamp.rocks/), but uses a proxy to avoid the need for API keys.

---

## Table of Contents
- [Demo](#demo)  
- [Features](#features)  
- [Installation](#installation)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [Functional Tests](#functional-tests)  
- [Privacy Considerations](#privacy-considerations)  
- [License](#license)  

---

## Demo
[View Live Demo](http://localhost:3000/)  
*(Replace with deployed URL if hosted on Heroku, Vercel, etc.)*

---

## Features
- View real-time stock prices using a proxy API.
- Like a stock once per IP address.
- Compare two stocks with relative likes.
- Fully tested with **5 functional tests** passing.
- Security features including content security policies.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/stock-price-checker.git
cd stock-price-checker
````

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

The app will run on `http://localhost:3000`.

---

## Usage

* To view one stock:

```
GET /api/stock-prices?stock=AAPL
```

* To like a stock:

```
GET /api/stock-prices?stock=AAPL&like=true
```

* To view two stocks:

```
GET /api/stock-prices?stock=GOOG&stock=MSFT
```

* To like two stocks:

```
GET /api/stock-prices?stock=GOOG&stock=MSFT&like=true
```

---

## API Endpoints

| Endpoint            | Method | Description                                                                                |
| ------------------- | ------ | ------------------------------------------------------------------------------------------ |
| `/api/stock-prices` | GET    | Returns stock data for one or two stocks. Optional `like` query parameter to like a stock. |

**Response format:**

* One stock:

```json
{
  "stockData": {
    "stock": "AAPL",
    "price": 145.09,
    "likes": 2
  }
}
```

* Two stocks:

```json
{
  "stockData": [
    { "stock": "GOOG", "price": 2734.87, "rel_likes": 1 },
    { "stock": "MSFT", "price": 299.35, "rel_likes": -1 }
  ]
}
```

---

## Functional Tests

All **5 functional tests** are passing:

1. Viewing one stock
2. Viewing one stock and liking it
3. Viewing the same stock and liking it again
4. Viewing two stocks
5. Viewing two stocks and liking them

Tests are located in `tests/2_functional-tests.js`.

---

## Privacy Considerations

* Only **one like per IP** is accepted.
* IP addresses are **anonymized** before saving to ensure compliance with data privacy laws such as GDPR.
  Options include hashing, truncating, or zeroing part of the IP address.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Source Code

[GitHub Repository](https://github.com/Ahmedkhan78/stock-checker)

```

