// using ES6 syntax - will be transpiled by Babel to ES5 for OrientDB's console.sh

// gets the RID for the inserted entity
function getRid(result) {
  return result.toString().split(/#|{/)[1];
}

// wrapper around db.executeCommand to return directly the RID when INSERTing
function dbInsert(statement) {
  const result = db.executeCommand(statement);
  return getRid(result);
}

function dbInsertAccount(user, pass, email, role) {
  return dbInsert('INSERT INTO Account (username, password, email, role) VALUES (\'' + user + '\', \'' + pass + '\', \'' + email + '\', \'' + role + '\' );');
}

function dbUpdate(statement) {
  return dbInsert(statement);
}

// inserts a message and then adds it to the conversation
function dbInsertMessage(sender, text, date, conversation) {
  const messageRid = dbInsert('INSERT INTO Message (sender, text, date, conversation) VALUES (' + sender + ', \'' + text + '\', \'' + date + '\', ' + conversation + ')');
  dbUpdate('UPDATE ' + conversation + ' ADD messages=' + messageRid);
}

// inserts a conversation and updates each account pointing to it
function dbInsertConversation(type, participants) {
  const conv = dbInsert('insert into Conversation (type, participants) values (\'' + type + '\', [' + participants + '])');
  for (const peer of participants) {
    dbUpdate('UPDATE ' + peer + ' ADD conversations=' + conv);
  }
}

// load some accounts
const ana = dbInsert('INSERT INTO Account (username, password, email, role) VALUES (\'Ana\', \'password\', \'ana@email.com\', \'member\' );');
const cindy = dbInsert('INSERT INTO Account (username, password, email, role) VALUES (\'Cindy\', \'password\', \'cindy@email.com\', \'consierge\' );');
const dan = dbInsert('INSERT INTO Account (username, password, email, role) VALUES (\'Dan\', \'password\', \'dan@email.com\', \'member\' );');
const ioana = dbInsertAccount('Ioana', 'password', 'ioana@email.com', 'member');
const dana = dbInsertAccount('Dana', 'password', 'Dana@email.com', 'member');
const radu = dbInsertAccount('Radu', 'password', 'Radu@email.com', 'member');
const anca = dbInsertAccount('Anca', 'password', 'Anca@email.com', 'member');
const jim = dbInsertAccount('Jim', 'password', 'Jim@email.com', 'member');
const tudor = dbInsertAccount('Tudor', 'password', 'Tudor@email.com', 'member');

// start conversations
const conv1 = dbInsertConversation('chat', [ ana, cindy, dan]);
const conv2 = dbInsertConversation('chat', [ anca, jim]);
const conv3 = dbInsertConversation('chat', [ ana, ioana, tudor]);
const conv4 = dbInsertConversation('chat', [ radu, cindy]);
const conv5 = dbInsertConversation('chat', [ ana, radu]);

// insert some messages & updates the conversation
const msg1 = dbInsert('INSERT INTO Message (sender, text, date, conversation) VALUES (' + ana + ', \'blah blah yoo\', \'2015-09-09 10:45:05\', ' + conv1 + ')');
dbUpdate('UPDATE ' + conv1 + ' ADD messages=' + msg1);

dbInsertMessage(anca, 'hello', '2015-09-09 10:45:07', conv2);
dbInsertMessage(jim, 'hello', '2015-09-09 10:45:08', conv2);
dbInsertMessage(anca, 'how are you jim?', '2015-09-09 10:45:08', conv2);
dbInsertMessage(jim, 'fine anca, how are you?', '2015-09-09 10:45:09', conv2);

dbInsertMessage(ana, 'hello', '2015-09-09 11:45:07', conv3);
dbInsertMessage(ioana, 'hello', '2015-09-09 11:45:08', conv3);
dbInsertMessage(ana, 'how are you Ioana?', '2015-09-09 11:45:08', conv3);
dbInsertMessage(ioana, 'fine Ana, how are you?', '2015-09-09 11:45:09', conv3);

dbInsertMessage(radu, 'hello', '2015-09-09 12:45:07', conv4);
dbInsertMessage(cindy, 'hello', '2015-09-09 12:45:08', conv4);
dbInsertMessage(radu, 'how are you Cindy?', '2015-09-09 12:45:08', conv4);
dbInsertMessage(cindy, 'fine Radu, how are you?', '2015-09-09 12:45:09', conv4);
