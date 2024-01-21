# eshop

This eshop has been built by Augusto Britos, All Rights Reserved.


## Project Structure
```
backend
│   ├── database
│   │   └── init.sql
│   ├── package.json
│   ├── package-lock.json
│   └── src
│       ├── app.js
│       ├── config.js
│       ├── controllers
│       │   ├── auth.controller.js
│       │   └── products.controller.js
│       ├── db.js
│       ├── index.js
│       ├── libs
│       │   └── jwt.js
│       ├── middlewares
│       │   ├── auth.middleware.js
│       │   └── validate.middleware.js
│       ├── router
│       │   ├── auth.routes.js
│       │   └── products.routes.js
│       └── schemas
│           ├── auth.schema.js
│           └── products.schema.js
│
│
frontend
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── default-product-image.png
│   │   └── tm.svg
│   ├── src
│   │   ├── api
│   │   │   ├── axios.js
│   │   │   └── products.api.js
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── admin
│   │   │   │   ├── ProductForm.jsx
│   │   │   │   ├── ProductsAdmin.jsx
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── SignIn.jsx
│   │   │   │   ├── SignUp.jsx
│   │   │   │   └── ui
│   │   │   │       └── ProductsAdminCard.jsx
│   │   │   ├── navbar
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Navigation.jsx
│   │   │   ├── pages
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Contact.jsx
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── NotFound.jsx
│   │   │   │   └── Products.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ui
│   │   │       ├── Button.jsx
│   │   │       ├── Card.jsx
│   │   │       ├── Container.jsx
│   │   │       ├── Index.js
│   │   │       ├── Input.jsx
│   │   │       ├── Label.jsx
│   │   │       ├── products
│   │   │       │   └── ProductsCard.jsx
│   │   │       └── TextArea.jsx
│   │   ├── context
│   │   │   ├── AuthContext.jsx
│   │   │   └── ProductsContext.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
``````