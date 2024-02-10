# E-commerce Backend

This is the backend of an E-commerce application built using Node.js, Express.js, Sequelize, and MySQL.

Demonstration link: [Demonstration](https://app.screencastify.com/v3/watch/a1EMMe3d8C4tb6wC7APO)

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Description

This backend server provides APIs for managing categories, products, and tags in an E-commerce application. It uses Sequelize as the ORM to interact with a MySQL database.

## Features

- CRUD operations for categories, products, and tags
- Associations between categories, products, and tags

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository: git clone <repository-url>
2. Navigate to the project directory: cd E-commerce-Backend
3. Install dependencies: npm install
4. Set up your MySQL database and update the database configuration in `config/config.json`.
5. Run the database migrations to create the tables: npm run db:migrate
6. Start the server: npm start

## Usage

After starting the server, you can use tools like Insomnia or Postman to interact with the API endpoints.

## Endpoints

- `/api/categories`: CRUD operations for categories
- `/api/products`: CRUD operations for products
- `/api/tags`: CRUD operations for tags

For detailed information about each endpoint, refer to the source code or API documentation.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or create a pull request.

Coded by Rob Tatro.

## License

This project is licensed under the [MIT License](LICENSE).
