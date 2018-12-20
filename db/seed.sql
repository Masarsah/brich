DROP DATABASE IF EXISTS be_rich;
CREATE DATABASE be_rich;
\c be_rich

-- create portfolio
CREATE TABLE portfolios (
  id serial primary key,
  username VARCHAR,
    email varchar UNIQUE NOT NULL,
  password_digest varchar NOT NULL,
  budget INTEGER
);


CREATE TABLE chartdata(
  id serial primary key,
  labels text [],
  data INTEGER [] default '{100}'
);

-- create join
-- CREATE TABLE post(
--   id serial primary key,
--   img 
--  artical TEXT,
--  portfolio_id INTEGER
-- );

CREATE TABLE posts(
  id serial primary key,
  name varchar,
  description varchar,
  image varchar
);

CREATE TABLE portfolio_posts(
  portfolio_id INT NOT NULL,
  post_id INT NOT NULL,
  foreign key(portfolio_id) REFERENCES portfolios,
  foreign key(post_id) REFERENCES posts
);



INSERT INTO posts
  (name, description, image)
VALUES 
  ('The Secret to Saving Money', 'You can stop the cycle of living paycheck to paycheck with a simple secret: make a zero-based budget before the month begins. A budget is all about being intentional. It helps you create a plan to see where your money is going and how much you can save each month. It’s never too late to take control of your money!', 'https://img.freepik.com/free-vector/savings-background-design_1270-10.jpg?size=338&ext=jpg'),
  ('How to Create and Manage a Budget', 'There are two types of financial goals: immediate and long range. Immediate goals focus on using your money today, while long-range goals deal with saving and spending over decades. Both are important, and complement one another: Saving money today affects what you spend now but also how much you’ll have later in life. You need to determine which goals address necessities and which ones cover luxuries. Then, you can prioritize your financial goals accordingly.', 'https://cdns2.freepik.com/free-photo/money-bag-exchange_23-2147510722.jpg'),
  ('Enjoy Your Life Without Spending A Lot Of Money', 'The greatest things in life are those worthwhile experiences and subtle occurrences that sometimes most individuals simply take for granted. While Madison avenue may think that having expensive “stuff” and the like are what lead to happiness, below are some ways you can still enjoy yourself without spending a fortune.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuzuaXMDo3z3dZCTsL17p61RPD6L4mTA4jLle06bbzMGVGkhyh'),
  ('Psource of income', 'For a person working for a wage, their source of income is their job, or their labor (aka their time that they sell to someone). But you can own a house, and rent it out, and when your renters pay you renter every month, the source of that income check is your rental property, or your house. It would just be called rental income. If you have money in the bank in an account that pays interest, those interest payments are another source of income. We can say the source is interest payments, or we can identify the asset that is generating rent, and say your money in the bank that is generating “rent” (aka interest) is your source of income.

If you just spend money you have saved, that could be called your source of income — your savings. If your parents give you money, your parents are the source of income.', 'https://images.freeimages.com/images/premium/previews/2702/27020036-saving-money-jar-vector-illustration.jpg');

INSERT INTO portfolios
  (username, email, password_digest, budget)
VALUES ('Masarah', 'masadsf@gmail.com', '$2b$10$BiwRH51MbQ5Cssns9l18tOYMVk3F1c7HAyphevSFJxhrYRnmbEPiq', '500000'),
('Huda', 'wkjekj@jsdhjk.com', '$2b$10$BiwRH51MbQ5Cssns9l18tOYMVk3F1c7HAyphevSFJxhrYRnmbEPiq', '10000'),
('Basayer', 'djskldfj@gmail.com', '$2b$10$BiwRH51MbQ5Cssns9l18tOYMVk3F1c7HAyphevSFJxhrYRnmbEPiq', '30000'),
('Raed',' jskwfk@gmail.com', '$2b$10$BiwRH51MbQ5Cssns9l18tOYMVk3F1c7HAyphevSFJxhrYRnmbEPiq','6000'),
('Rawan',' rawan@gmail.com', '$2b$10$BiwRH51MbQ5Cssns9l18tOYMVk3F1c7HAyphevSFJxhrYRnmbEPiq','60000'),
('Layal',' layal@gmail.com', '$2b$10$BiwRH51MbQ5Cssns9l18tOYMVk3F1c7HAyphevSFJxhrYRnmbEPiq','55000'),
('Misk',' misk@gmail.com', '$2b$10$BiwRH51MbQ5Cssns9l18tOYMVk3F1c7HAyphevSFJxhrYRnmbEPiq','100000');


INSERT INTO chartdata
  (labels, data)
VALUES 
(ARRAY ['coffee', 'travel', 'phonecall'], ARRAY [540 ,2400, 100]),
(ARRAY ['coffee', 'travel', 'phonecall', 'rent appartment'], ARRAY [540 ,2400, 100,1800]),
(ARRAY ['coffee', 'travel', 'phonecall', 'rent appartment','breakfast'], ARRAY [540 ,2400, 100, 1800 , 500]),
(ARRAY ['coffee', 'travel', 'phonecall', 'rent appartment','breakfast'], ARRAY [540 ,2400, 100, 1800 , 500]),
(ARRAY ['coffee', 'travel', 'phonecall', 'rent appartment','breakfast'], ARRAY [540 ,2400, 100, 1800 , 500]),
(ARRAY ['coffee', 'Shopping', 'phonecall', 'make up','breakfast'], ARRAY [540 ,2400, 100, 1800 , 500]),
(ARRAY ['coffee', 'travel', 'phonecall', 'rent appartment','breakfast'], ARRAY [540 ,2400, 100, 1800 , 500]),
(ARRAY ['coffee', 'travel', 'phonecall', 'rent appartment','breakfast'], ARRAY [540 ,2400, 100, 1800 , 500]),
(ARRAY ['coffee', 'travel', 'phonecall', 'rent appartment','breakfast'], ARRAY [540 ,2400, 100, 1800 , 500]);



-- SELECT portfolios.*, transactions.cost, transactions.typeoftransaction
-- FROM portfolios, transactions
-- INNER JOIN wallet
-- ON portfolios.id = wallet.portfolio_id
-- INNER JOIN transactions
-- ON wallet.transaction_id = transactions.id;

