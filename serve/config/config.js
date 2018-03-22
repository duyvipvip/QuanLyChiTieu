module.exports = {
    "googleAuth": {
        "clientID": "884764968517-jar8eik3nf2830pv8l5hn9tscpoead11.apps.googleusercontent.com",
        "clientSecret": "5AJ3YeOYWVJb0zexTf2_Igyq",
        "callbackURL": 'http://localhost:3000/api/auth/google/callback'
    },
    'facebookAuth' : {
		'clientID': '117384035758463',
		'clientSecret': '90639c6e8d1888c62832a1f91ee7f72c',
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
        domain: 'https://chitieu2018.herokuapp.com',
        port: process.env.PORT
    }
}