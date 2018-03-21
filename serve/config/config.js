module.exports = {
    "googleAuth": {
        "clientID": "884764968517-jar8eik3nf2830pv8l5hn9tscpoead11.apps.googleusercontent.com",
        "clientSecret": "5AJ3YeOYWVJb0zexTf2_Igyq",
        "callbackURL": 'api/auth/google/callback'
    },
    'facebookAuth' : {
		'clientID': '1546170195432816',
		'clientSecret': '6996bb7af0aebde0b710ad30d18174cf',
		'callbackURL': 'http://localhost:3000/api/auth/facebook/callback'
    },
    'googleMap' : {
		"clientID": "884764968517-jar8eik3nf2830pv8l5hn9tscpoead11.apps.googleusercontent.com",
        "clientSecret": "5AJ3YeOYWVJb0zexTf2_Igyq",
    },
    mailConfig: {
        service: 'gmail',
        auth: {
            service: 'Gmail',
            user: 'havanduy85@gmail.com',
            pass: 'havanduy709'
        }
    },
    server: {
        domain: 'http://localhost',
        port: 9000
    }
}