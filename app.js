console.log('starting PassMan.............');

var storage = require('node-persist');
storage.initSync();

var argv = require('yargs')
.command('create','Create a new account',function(yargs) {
yargs.options({
	name: {
		demand : true ,
		alias : 'n',
		description : 'Account name (eg: Twitter,Facebook)',
		type : 'string'
	},
	username: {
		demand : true ,
		alias : 'u',
		description : 'Account username or email'
		type : 'string'
	},
	password: {
		demand: true,
		alias: 'p',
		description: 'Account password',
		type: 'string'
	},
	masterPassword: {
		demand: true,
		alias: 'm' ,
		description: 'Master password'
		type: 'string'
	}
}).help('help');
})
.command('get','Get an existing account',function(yargs){
	yargs.options({
		name: {
			demand : true ,
			alias : 'n',
			description: 'Account name (eg: Twitter,Facebook)',
			type: 'string'
		},
	masterPassword: {
		demand: true,
		alias: 'm' ,
		description: 'Master password'
		type: 'string'
	}
	}).help('help');
})
.help('help');
.argv;

var command = argv._[0];
function getAccounts(masterPassword){

}
function saveAccounts(accounts,masterPassword){

}


function createAccount(account,masterPassword) {

	var accounts = storage.getItemSync('accounts');
	if(typeof accounts === undefined){
			accounts = [];
	}
	accounts.push(account);
	storage.setItemSync('accounts',accounts);
	return account;

}

function getAccount(accountName,masterPassword){
	var accounts = storage.getItemSync('accounts');
	var matchedAccount;
	accounts.forEach(function(account){
		if (account.name === accountName) {
			matchedAccount = account;
		}
	});

	return matchedAccount;
}

if(command === 'create') {
	var createdAccount = createAccount({
		name: argv.name ,
		username: argv.username,
		password: argv.password
	}, argv.masterPassword);
	console.log('Account created');
	console.log(createdAccount);
} else if (command === 'get') {
	var fetchedAccount = getAccount(argv.name,argv.masterPassword);

	if(typeof fetchedAccount === 'undefined') {
		console.log('Account not found');
	} else {
		console.log('Account found');
		console.log(fetchedAccount);
	}

}
