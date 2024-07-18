-- 13.2
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author VARCHAR(30),
    url VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    likes INTEGER DEFAULT 0
);
insert into blogs (author,url,title) values ('some author', 'somewhere.com','something');
insert into blogs (author,url,title) values ('another author', 'elsewhere.com', 'other');
