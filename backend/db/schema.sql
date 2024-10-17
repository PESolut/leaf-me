DROP DATABASE IF EXISTS leafme_db;
CREATE DATABASE leafme_db;

\c leafme_db;

DROP TABLE IF EXISTS dispensary;
-- Create the dispensary table
CREATE TABLE dispensary (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  deliveryFee DECIMAL(10, 2),
  minDeliveryTime INTEGER,
  maxDeliveryTime INTEGER,
  rating DECIMAL(3, 2),
  address VARCHAR(255),
  latitude DECIMAL(9, 6),
  longitude DECIMAL(9, 6)
);

DROP TABLE IF EXISTS store_item;
-- Create the Store Item table
CREATE TABLE store_item (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  description TEXT,
  price DECIMAL(10, 2),
  dispensary_id INTEGER REFERENCES dispensary(id)
);

DROP TABLE IF EXISTS client_user;
-- Create the User table
CREATE TABLE client_user (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  latitude DECIMAL(9, 6),
  longitude DECIMAL(9, 6),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS basket;
-- Create the Basket table
CREATE TABLE basket (
  id SERIAL PRIMARY KEY,
  client_user_id INTEGER REFERENCES client_user(id),
  dispensary_id INTEGER REFERENCES dispensary(id)
);

DROP TABLE IF EXISTS basket_store_item;
-- Create the Basket Store Item table
CREATE TABLE basket_store_item (
  id SERIAL PRIMARY KEY,
  quantity INTEGER,
  basket_id INTEGER REFERENCES basket(id),
  store_item_id INTEGER REFERENCES store_item(id)
);

DROP TABLE IF EXISTS client_order;
-- Create the Order table
CREATE TABLE client_order (
  id SERIAL PRIMARY KEY,
  total DECIMAL(10, 2),
  status VARCHAR(255),
  client_user_id INTEGER REFERENCES client_user(id),
  dispensary_id INTEGER REFERENCES dispensary(id)
);

DROP TABLE IF EXISTS order_store_item;
-- Create the Order Store Item table
CREATE TABLE order_store_item (
  id SERIAL PRIMARY KEY,
  quantity INTEGER,
  client_order_id INTEGER REFERENCES client_order(id),
  store_item_id INTEGER REFERENCES store_item(id)
);


