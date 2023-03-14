var express = require('express');
var app = express();

const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var data={};
var id=0;

app.use(express.static('html'));

	
app.post("/annotation", function(req, res){
	var body = req.body;
	// console.log(body);
	data[id]=body;
	// data.push(body);
	console.log(data);
	id++;
	res.send();
});


app.get("/IdAnnot", function(req, res){
	var IdAnnot = req.query.Annot;
	
	var Exist=false;
	
	var ListFound = [];
	
	for (key in data){
		if (data[key]["Commentaire"]==IdAnnot){
			Exist = true;
			ListFound.push(data[key]);
		}
	}
	
	var ChoixFormat=req.query.FormatIdAnnot;
	
	console.log(req.headers['accept']);
	
	if (ChoixFormat=="html"){
		req.headers['accept']= 'text/html';
	}
	else {
		if (ChoixFormat=="Json"){
			req.headers['accept']=  'application/json';
		}	
	}
	
	console.log(req.headers['accept']);
	
	res.format ({
		   'text/html': function() {
			   console.log("Ce document est un html");
			    if (Exist){
				   res.send(ListFound); 
			    }
			    else {
				   res.send("aucune annotation n'est associée à cette clé");
			    }
		   },

		   'application/json': function() {
			   console.log("Ce document est un json");
			    if (Exist){
				   res.send(ListFound); 
			    }
			    else {
				   res.send("aucune annotation n'est associée à cette clé");
			    }
			}
	});
	
});




app.get("/AllAnnot", function(req, res){
	var ChoixFormat=req.query.FormatAllAnnot;
	
	
	if (ChoixFormat=="html"){
		req.headers['accept']= 'text/html';
	}
	else {
		if (ChoixFormat=="Json"){
			req.headers['accept']=  'application/json';
		}	
	}
		
	res.format ({
		   'text/html': function() {
			   console.log("Ce document est un html");
			  res.send(data); 
		   },

		   'application/json': function() {
			   console.log("Ce document est un json");
			  res.send(data);
			}
	});
	
});


app.get("/URI", function(req, res){
	var IdURI = req.query.AnnotURI;
	
	var ChoixFormat=req.query.FormatAnnotURI;
	
	var tabRep=[]
	
	for (key in data){
		if (data[key]["URI"]==IdURI){
			tabRep.push({"IdAnnotation" : data[key], "Commentaire" : data[key]["Commentaire"]});
		}
	}
	
	if (ChoixFormat=="html"){
		req.headers['accept']= 'text/html';
	}
	else {
		if (ChoixFormat=="Json"){
			req.headers['accept']=  'application/json';
		}	
	}
		
	res.format ({
		   'text/html': function() {
			   console.log("Ce document est un html");
			  res.send(tabRep); 
		   },

		   'application/json': function() {
			   console.log("Ce document est un json");
			  res.send(tabRep);
			}
	});
	
});





app.listen(port, function(){
	console.log('serveur listening on port : '+port);
});