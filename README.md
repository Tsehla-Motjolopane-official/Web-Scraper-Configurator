
# Web Scraper Configurator

A web-based tool for building and exporting custom web scraping configurations. With an interactive UI, users can define scraping rules for any website and export them as ready-to-use **Python**, **JavaScript**, or **JSON** code.

## ✨ Features

* Configure scraping rules through an intuitive interface
* Preview and validate selectors before exporting
* Export configurations in multiple formats:

  * **Python** (requests + BeautifulSoup example)
  * **JavaScript** (axios + cheerio example)
  * **JSON** (structured config for custom use)
* Built with a modern stack for performance and flexibility

## 🛠️ Tech Stack

* **Frontend**: React, TypeScript, Vite, Tailwind CSS
* **Backend**: Node.js

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) (>= 16)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/web-scraper-configurator.git
cd web-scraper-configurator
npm install
```

### Running the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📂 Project Structure

```plaintext
web-scraper-configurator/
├── src/               # Application source code
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page-level components
│   ├── utils/         # Helper functions
│   └── types/         # TypeScript definitions
├── public/            # Static assets
├── package.json       # Dependencies and scripts
└── vite.config.ts     # Vite configuration
```

## 📤 Export Formats

* **Python Example:**

  ```python
  import requests
  from bs4 import BeautifulSoup

  url = "https://example.com"
  response = requests.get(url)
  soup = BeautifulSoup(response.text, "html.parser")

  title = soup.select_one("h1").get_text()
  print(title)
  ```

* **JavaScript Example:**

  ```javascript
  import axios from "axios";
  import cheerio from "cheerio";

  const url = "https://example.com";
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const title = $("h1").text();
  console.log(title);
  ```

* **JSON Example:**

  ```json
  {
    "url": "https://example.com",
    "selectors": {
      "title": "h1"
    }
  }
  ```

## 🤝 Contributing

Contributions are welcome! If you’d like to improve the project, please fork the repo and open a pull request.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

