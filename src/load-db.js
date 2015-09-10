// gets the RID for the inserted entity
var getRid = function(result) {
	return result.toString().split(/#|{/)[1];
}

// wrapper around db.executeCommand to return directly the RID when INSERTing
var dbInsert = function(statement) {
	var result = db.executeCommand(statement);
	return getRid(result);
}

var dbInsertAccount = function(user, pass, email, role) {
	return dbInsert('INSERT INTO Account (username, password, email, role) VALUES (\''+user+'\', \''+pass+'\', \''+email+'\', \''+role+'\' );');
}

// inserts a message and then adds it to the conversation
var dbInsertMessage = function(sender, text, date, conversation) {
	var messageRid = dbInsert('INSERT INTO Message (sender, text, date, conversation) VALUES ('+sender+', \''+text+'\', \''+date+'\', '+conversation+')');
	dbUpdate('UPDATE '+conversation+' ADD messages='+messageRid);
}

var dbUpdate = function(statement) {
	return dbInsert(statement);
}

// load some accounts
var ana = dbInsert('INSERT INTO Account (username, password, email, role) VALUES (\'Ana\', \'password\', \'ana@email.com\', \'member\' );');
var cindy = dbInsert('INSERT INTO Account (username, password, email, role) VALUES (\'Cindy\', \'password\', \'cindy@email.com\', \'consierge\' );');
var dan = dbInsert('INSERT INTO Account (username, password, email, role) VALUES (\'Dan\', \'password\', \'dan@email.com\', \'member\' );');
var ioana = dbInsertAccount('Ioana', 'password', 'ioana@email.com', 'member');
var dana = dbInsertAccount('Dana', 'password', 'Dana@email.com', 'member');
var radu = dbInsertAccount('Radu', 'password', 'Radu@email.com', 'member');
var anca = dbInsertAccount('Anca', 'password', 'Anca@email.com', 'member');
var jim = dbInsertAccount('Jim', 'password', 'Jim@email.com', 'member');
var tudor = dbInsertAccount('Tudor', 'password', 'Tudor@email.com', 'member');

// start conversations
var conv1 = dbInsert('insert into Conversation (type, participants) values (\'chat\', ['+ana+','+cindy+','+dan+'])');
var conv2 = dbInsert('insert into Conversation (type, participants) values (\'chat\', ['+anca+','+jim+'])');
var conv3 = dbInsert('insert into Conversation (type, participants) values (\'chat\', ['+ana+','+ioana+','+tudor+'])');
var conv4 = dbInsert('insert into Conversation (type, participants) values (\'chat\', ['+radu+','+cindy+'])');

//insert some messages & updates the conversation
var msg1 = dbInsert('INSERT INTO Message (sender, text, date, conversation) VALUES ('+ana+', \'blah blah yoo\', \'2015-09-09 10:45:05\', '+conv1+')');
dbUpdate('UPDATE '+conv1+' ADD messages='+msg1);

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
