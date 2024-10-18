# Leaf-Me Backend

Leaf-Me is a backend application for a cannabis delivery service. It provides APIs for managing dispensaries, store items, users, baskets, and orders.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Authentication](#authentication)
6. [Models and Relationships](#models-and-relationships)
7. [Contributing](#contributing)
8. [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/leaf-me-backend.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   PG_HOST=localhost
   PG_PORT=5432
   PG_DATABASE=leafme_db
   PG_USER=your_postgres_username
   SECRET_TOKEN=your_secret_token
   ```

4. Initialize the database:
   ```
   npm run dbinit
   ```

5. Seed the database:
   ```
   npm run dbseed
   ```

## Usage

To start the server in development mode:
```
npm run dev
```
To start the server in production mode:
```
npm start
```

## Database Schema

The application uses PostgreSQL as its database. The schema includes the following tables:

- dispensary
- store_item
- client_user
- basket
- basket_store_item
- client_order
- order_store_item

For detailed schema information, refer to the `db/schema.sql` file.

## API Endpoints

### Dispensaries

- GET `/dispensary`: Get all dispensaries
- GET `/dispensary/:id`: Get a specific dispensary
- POST `/dispensary`: Create a new dispensary
- PUT `/dispensary/:id`: Update a dispensary
- DELETE `/dispensary/:id`: Delete a dispensary

### Store Items

- GET `/dispensary/:dispensary_id/storeitems`: Get all store items for a dispensary
- GET `/dispensary/:dispensary_id/storeitems/:id`: Get a specific store item
- POST `/dispensary/:dispensary_id/storeitems`: Create a new store item
- PUT `/dispensary/:dispensary_id/storeitems/:id`: Update a store item
- DELETE `/dispensary/:dispensary_id/storeitems/:id`: Delete a store item

### Users

- GET `/users`: Get all users
- GET `/users/:id`: Get a specific user
- POST `/users`: Create a new user (register)
- POST `/users/login`: User login
- PUT `/users/:id`: Update a user
- DELETE `/users/:id`: Delete a user

### Baskets

- GET `/users/:client_user_id/basket`: Get user's basket
- GET `/users/:client_user_id/basket/:id`: Get a specific basket
- POST `/users/:client_user_id/basket`: Create a new basket
- PUT `/users/:client_user_id/basket/:id`: Update a basket
- DELETE `/users/:client_user_id/basket/:id`: Delete a basket

### Basket Items

- GET `/users/:client_user_id/basket/:basket_id/storeitems`: Get all items in a basket
- GET `/users/:client_user_id/basket/:basket_id/storeitems/:id`: Get a specific item in a basket
- POST `/users/:client_user_id/basket/:basket_id/storeitems`: Add an item to a basket
- PUT `/users/:client_user_id/basket/:basket_id/storeitems/:id`: Update an item in a basket
- DELETE `/users/:client_user_id/basket/:basket_id/storeitems/:id`: Remove an item from a basket

### Orders

- GET `/users/:client_user_id/order`: Get all orders for a user
- GET `/users/:client_user_id/order/:id`: Get a specific order
- POST `/users/:client_user_id/order`: Create a new order
- PUT `/users/:client_user_id/order/:id`: Update an order
- DELETE `/users/:client_user_id/order/:id`: Delete an order

### Order Items

- GET `/users/:client_user_id/order/:client_order_id/storeitems`: Get all items in an order
- GET `/users/:client_user_id/order/:client_order_id/storeitems/:id`: Get a specific item in an order
- POST `/users/:client_user_id/order/:client_order_id/storeitems`: Add an item to an order
- PUT `/users/:client_user_id/order/:client_order_id/storeitems/:id`: Update an item in an order
- DELETE `/users/:client_user_id/order/:client_order_id/storeitems/:id`: Remove an item from an order

## Authentication

The application uses JSON Web Tokens (JWT) for authentication. To access protected routes, include the JWT in the Authorization header of your requests:

```
Authorization: Bearer <your_token_here>
```

## Models and Relationships

1. Dispensary
   - Has many Store Items

2. Store Item
   - Belongs to a Dispensary
   - Can be in many Baskets through Basket Store Items
   - Can be in many Orders through Order Store Items

3. Client User
   - Has many Baskets
   - Has many Orders

4. Basket
   - Belongs to a Client User
   - Belongs to a Dispensary
   - Has many Store Items through Basket Store Items

5. Basket Store Item
   - Belongs to a Basket
   - Belongs to a Store Item

6. Client Order
   - Belongs to a Client User
   - Belongs to a Dispensary
   - Has many Store Items through Order Store Items

7. Order Store Item
   - Belongs to a Client Order
   - Belongs to a Store Item

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

# Set PM2 to start on boot

To ensure our application starts automatically when the server reboots, we need to configure PM2 to start on system boot. This process involves generating a startup script and saving the current PM2 process list.

## Steps:

1. Generate the startup script:
   ```
   pm2 startup
   ```
   This command will output a line of code that you need to run with sudo privileges. Copy and run that command.

2. Save the current PM2 process list:
   ```
   pm2 save
   ```
   This command saves the current list of processes, so PM2 knows which applications to start on boot.

3. Verify the setup:
   Reboot your system and check if your application starts automatically.
   ```
   sudo reboot
   ```
   After the system comes back online, check the status of your processes:
   ```
   pm2 list
   ```

## Notes:
- The exact startup command may vary depending on your operating system. PM2 will generate the appropriate command for your system.
- You may need sudo privileges to set up the startup script.
- If you make changes to your PM2 process list, remember to run `pm2 save` again to update the saved list.

## Troubleshooting:
- If your application doesn't start on boot, check the PM2 logs:
  ```
  pm2 logs
  ```
- Ensure that your application's dependencies are installed globally if necessary.

## References:
- PM2 Startup Hook Documentation: https://pm2.keymetrics.io/docs/usage/startup/

By completing this task, we ensure that our application will automatically start if the server reboots, improving its reliability and reducing potential downtime.
