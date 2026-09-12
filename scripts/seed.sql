CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  merchant VARCHAR(100) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO transactions (user_id, amount, merchant, timestamp) VALUES
('user123', 15.50, 'Coffee Shop', '2023-10-01 08:30:00'),
('user123', 45.00, 'Grocery Store', '2023-10-01 12:15:00'),
('user123', 1200.00, 'Electronics Store', '2023-10-02 14:00:00'),
('user123', 25.00, 'Bookstore', '2023-10-03 10:45:00'),
('user123', 8.50, 'Fast Food', '2023-10-04 19:20:00'),
('user123', 55.00, 'Gas Station', '2023-10-05 07:10:00'),
('user123', 350.00, 'Flight Tickets', '2023-10-06 21:05:00'),
('user123', 12.00, 'Online Subscription', '2023-10-07 09:00:00'),
('user123', 85.00, 'Clothing Store', '2023-10-08 16:30:00'),
('user123', 210.00, 'Dinner Restaurant', '2023-10-09 20:00:00'),
('user456', 5.00, 'Vending Machine', '2023-10-01 11:00:00'),
('user456', 60.00, 'Grocery Store', '2023-10-02 13:20:00'),
('user456', 1500.00, 'Luxury Watch', '2023-10-03 15:45:00'),
('user456', 20.00, 'Pharmacy', '2023-10-04 09:10:00'),
('user456', 45.00, 'Hardware Store', '2023-10-05 14:30:00'),
('user456', 110.00, 'Utility Bill', '2023-10-06 08:00:00'),
('user456', 30.00, 'Gym Membership', '2023-10-07 06:30:00'),
('user456', 400.00, 'Car Repair', '2023-10-08 11:15:00'),
('user456', 18.00, 'Movie Theater', '2023-10-09 19:45:00'),
('user456', 75.00, 'Shoe Store', '2023-10-10 16:00:00');
