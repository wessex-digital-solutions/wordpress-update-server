export const createMessagesTable = `
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) DEFAULT '',
  message VARCHAR(255) NOT NULL
)
`;

export const insertMessages = `
INSERT INTO messages (name, message)
VALUES ('duncan', 'first message'),
       ('duncan', 'second message')`;

export const dropMessagesTable = 'DROP TABLE IF EXISTS messages';
