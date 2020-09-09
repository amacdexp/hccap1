/*eslint no-console: 0*/ 
"use strict";

var hdbext = require("@sap/hdbext");
var hana = require("@sap/hana-client");
var express = require("express");

var stringifyObj = require("stringify-object");
var bodyParser = require("body-parser");

//**************************** Libraries for enabling authentication *****************************
var passport = require('passport');
var xsenv = require('@sap/xsenv');
var JWTStrategy = require('@sap/xssec').JWTStrategy;
//************************************************************************************************


var app = express();

var server = require("http").createServer();
var port = process.env.PORT || 3000;


var client = null;


//*********************************** Enabling authorization  ***********************************
var services = xsenv.getServices({ uaa: { tag: 'xsuaa' } }); //Get the XSUAA service
passport.use(new JWTStrategy(services.uaa));
app.use(passport.initialize());
app.use(passport.authenticate('JWT', { session: false })); //Authenticate using JWT strategy
//************************************************************************************************




app.get("/services", function (req, res) {


    var reqStr = stringifyObj(req.authInfo, { //.userInfo, {
                            indent: "   ",
                            singleQuotes: false
                            });

	//reqStr += "\n\n";

	//reqStr += stringifyObj(req.authInfo.scopes, {
    //                                                indent: "   ",
    //                                                singleQuotes: false
    //                                            }); 

    var responseStr = "";
    
    var SubaccountId = req.authInfo.getSubaccountId()
    var ZoneId = req.authInfo.getZoneId()
    var SubDomain = req.authInfo.getSubdomain()

    var ClientId = req.authInfo.getClientId()
    var ExpirationDate = req.authInfo.getExpirationDate()
    var Origin = req.authInfo.getOrigin()

    var LogonName = req.authInfo.getLogonName()
    var GivenName = req.authInfo.getGivenName()
    var FamilyName = req.authInfo.getFamilyName()
    var Email = req.authInfo.getEmail()
    var UserName = req.authInfo.getUserName()
    var UniquePrincipalName = req.authInfo.getUniquePrincipalName()
    var HdbToken = req.authInfo.getHdbToken()
    var AppToken = req.authInfo.getAppToken()

    responseStr += "<!DOCTYPE HTML><html><head><title>Test</title></head><body><h1>server.js</h1><h2>SUCCESS!</h2><br />";

	//responseStr += "<!DOCTYPE HTML><html><head><title>hccap1</title></head><body><h1>MTApp</h1><h2>Welcome " + req.authInfo.userInfo.givenName + " " + req.authInfo.userInfo.familyName + "!</h2><p><b>Subdomain:</b> " + req.authInfo.subdomain + "</p><br />";
	//responseStr += "<a href=\"/get_legal_entity\">/get_legal_entity</a><br />";
	//var isAuthorized = req.authInfo.checkScope(req.authInfo.xsappname + '.create');
	//if (isAuthorized) {
        //responseStr += "<a href=\"/add_legal_entity\">/add_legal_entity</a><br />";
     //   responseStr += "<p><b>Identity Zone:</b> " + "User has CREATE role assigned (" + req.authInfo.xsappname + ".create" + ")" + "</p><br />";
	//}
	//responseStr += "<p><b>Identity Zone:</b> " + req.authInfo.identityZone + "</p><p><b>Origin:</b> " + req.authInfo.origin + "</p>" + "<br /><br /><pre>" + reqStr + "</pre>";
    
    //responseStr += "<p><b>authInfo</b> " + JSON.stringify(req.authInfo) + "</p>"

    responseStr += "<p><b>CF Account:</b> " + SubaccountId + "  :  " + ZoneId +"  :  " + SubDomain + "  :  " +  ClientId + "</p>"
    responseStr += "<p><b>User: </b> " + LogonName + "  :  " + UserName + "  :  " + Email + "</p>"
    responseStr += "<p><b>AppToken:</b> " + AppToken + "</p>"
    responseStr += "<p><b>HdbToken:</b> " + HdbToken + "</p>"

    responseStr += "<p><b>authInfo:</b> " + reqStr + "</p>"

    responseStr += "<p><b>full req:</b> " + stringifyObj(req) + "</p>"
	responseStr += "</body></html>";
	res.status(200).send(responseStr);
});


server.on("request", app);

server.listen(port, function () {
	console.info("Backend: " + server.address().port);
});