# Kodo Backend

Welcome to the **Kodo Backend** repository! This project is a backend implementation for the Kodo application, built using **TypeScript** and **Express.js**. It provides APIs for searching, sorting, and paginating posts, with mock data included for testing and development.

---

## 📁 Project Structure

```
kodo_backend/
├── src/                     # Main source code
│   ├── controllers/         # API controllers
│   │   └── post.controller.ts
│   ├── factories/           # Service factories
│   │   ├── PaginationServiceFactory.ts
│   │   ├── SearchServiceFactory.ts
│   │   └── SortServiceFactory.ts
│   ├── interfaces/          # TypeScript interfaces
│   │   ├── index.ts
│   │   ├── Paginate.ts
│   │   ├── Post.ts
│   │   ├── Query.ts
│   │   ├── Search.ts
│   │   ├── Service.ts
│   │   └── Sort.ts
│   ├── middlewares/         # Middleware for validation
│   │   ├── validator.ts
│   │   └── validator.spec.ts
│   ├── mocks/               # Mock data for testing
│   │   └── Posts.ts
│   ├── services/            # Core services
│   │   ├── PaginationService.ts
│   │   ├── PaginationService.spec.ts
│   │   ├── SearchService.ts
│   │   ├── SearchService.spec.ts
│   │   ├── SortService.ts
│   │   └── SortService.spec.ts
│   ├── utils/               # Utility functions
│   │   ├── LoadPostsData.ts
│   │   └── LoadPostsData.spec.ts
│   └── server.ts            # Entry point for the application
├── mock_data.json           # Sample data for testing
├── package.json             # Project metadata and dependencies
├── tsconfig.json            # TypeScript configuration
├── .gitignore               # Ignored files and directories
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sushi27/kodo_backend.git
   cd kodo_backend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🛠️ Features

- **Search**: Search posts by keywords or exact phrases in the `name` or `description` fields.
- **Sort**: Sort posts by `name` or `dateLastEdited` in ascending or descending order.
- **Pagination**: Paginate posts with customizable page size and page number.
- **Mock Data**: Includes a `mock_data.json` file for testing and development.

---

## 🧪 Testing

This project uses **Mocha**, **Chai**, and **Sinon** for unit testing. To run the tests:

```bash
npm run test
```

Test files are located alongside their respective implementations, with the `.spec.ts` suffix.

---

## 📦 Dependencies

### Runtime Dependencies
- **express**: Web framework for building APIs.
- **cors**: Middleware for enabling CORS.

### Development Dependencies
- **typescript**: TypeScript compiler.
- **ts-node-dev**: Development server with hot reloading.
- **mocha**, **chai**, **sinon**: Testing libraries.
- **@types/**: TypeScript type definitions for dependencies.

For a complete list, refer to the `package.json` file.

---

## 🛠️ Available Scripts

- **`npm run dev`**: Starts the development server with hot reloading.
- **`npm run test`**: Runs the test suite.

---

## 📄 API Endpoints

### Base URL
```
http://localhost:5000/api/posts
```

### Endpoints

1. **GET `/`**
   - Retrieves all posts with optional sorting and pagination.
   - Query Parameters:
     - `sortBy`: `name` or `dateLastEdited` (default: `name`)
     - `sortOrder`: `asc` or `desc` (default: `asc`)
     - `page`: Page number (default: `1`)
     - `pageSize`: Number of items per page (default: `10`)

2. **GET `/search`**
   - Searches posts by query with optional sorting and pagination.
   - Query Parameters:
     - `q`: Search query (default: `''`)
     - `sortBy`: `name` or `dateLastEdited` (default: `name`)
     - `sortOrder`: `asc` or `desc` (default: `asc`)
     - `page`: Page number (default: `1`)
     - `pageSize`: Number of items per page (default: `10`)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

We welcome contributions! Feel free to fork the repository, make your changes, and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

---

## 📬 Contact

For questions or support, please reach out to [susantomandal1998@gmail.com].