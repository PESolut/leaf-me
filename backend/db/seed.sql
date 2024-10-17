\c leafme_db
-- Insert example data into the dispensary table
INSERT INTO dispensary (name, image, deliveryFee, minDeliveryTime, maxDeliveryTime, rating, address, latitude, longitude)
VALUES
  ('Dispensary 1', 'image1.jpg', 5.99, 30, 60, 4.5, '123 Main St', 40.7128, -74.0060),
  ('Dispensary 2', 'image2.jpg', 7.99, 45, 75, 3.9, '456 Elm St', 40.7306, -73.9352),
  ('Dispensary 3', 'image3.jpg', 6.49, 25, 55, 4.7, '789 Oak St', 37.7749, -122.4194),
  ('Dispensary 4', 'image4.jpg', 8.99, 35, 65, 4.2, '321 Pine St', 34.0522, -118.2437),
  ('Dispensary 5', 'image5.jpg', 9.99, 40, 70, 4.8, '987 Maple St', 39.9526, -75.1652),
  ('Dispensary 6', 'image6.jpg', 7.49, 20, 50, 4.6, '543 Cedar St', 42.3601, -71.0589),
  ('Dispensary 7', 'image7.jpg', 6.99, 15, 45, 4.3, '876 Walnut St', 37.3382, -121.8863),
  ('Dispensary 8', 'image8.jpg', 8.49, 50, 80, 4.1, '654 Birch St', 47.6062, -122.3321),
  ('Dispensary 9', 'image9.jpg', 9.49, 55, 85, 4.9, '234 Oakwood St', 38.9072, -77.0369),
  ('Dispensary 10', 'image10.jpg', 7.99, 10, 40, 4.4, '987 Cherry St', 43.6532, -79.3832);
  

-- Insert example data into the store_item table
INSERT INTO store_item (name, type, image, description, price, dispensary_ID)
VALUES
  ('Item 1', 'flower', 'item1.jpg', 'Description for Item 1', 9.99, 1),
  ('Item 2', 'edible', 'item2.jpg', 'Description for Item 2', 12.99, 1),
  ('Item 3', 'flower', 'item3.jpg', 'Description for Item 3', 6.99, 2);

-- Insert example data into the client_user table
INSERT INTO client_user (name, address, latitude, longitude, email, password)
VALUES
  ('John Doe', '789 Oak St', 40.7559, -73.9864, 'johnnydoe@gmail.com', 'password'),
  ('Jane Smith', '321 Pine St', 40.7401, -73.9903, 'janedoe@gmail.com', 'password');

-- Insert example data into the basket table
INSERT INTO basket (client_user_ID, dispensary_ID)
VALUES
  (1, 1),
  (2, 2);

-- Insert example data into the basket_store_item table
INSERT INTO basket_store_item (Quantity, basket_ID, store_item_ID)
VALUES
  (2, 1, 1),
  (1, 1, 2),
  (3, 2, 3);

-- Insert example data into the client_order table
INSERT INTO client_order (total, status, client_user_ID, dispensary_ID)
VALUES
  (35.99, 'NEW', 1, 1),
  (19.99, 'NEW', 2, 2);

-- Insert example data into the order_store_item table
INSERT INTO order_store_item (quantity, client_order_ID, store_item_ID)
VALUES
  (2, 1, 1),
  (1, 1, 2),
  (3, 2, 3);
