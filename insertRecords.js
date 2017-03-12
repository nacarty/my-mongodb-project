/*
This program connects to a mongo database called 'learnyounode' and inserts a new record/document into a table/collection
called 'docs'. The first name and last name are read from the command line.
*/

var firstName = process.argv[2], //10 is the base or radix
    lastName = process.argv[3];
var url = 'mongodb://localhost:27017/learnyoumongo'; //learnyoumongo is the database name

var obj = {'firstName':firstName, 'lastName':lastName};

var mongo = require('mongodb').MongoClient;

mongo.connect(url, dataCallback); //the default port for the database is 27017

function dataCallback(err, db){

    if (err)
    {
        db.close();

        throw err;
    }
    

    var myCollection = db.collection('docs');   //parrots is the name of the table or collection
    
    myCollection.insert(obj, function(err, document){ //find records where age > ageVal but DO NOT return the ID field
        
        if (err){
            console.log(JSON.stringify(obj)+' there was as error here...');
            throw err;
        }
        
        console.log(JSON.stringify(obj));
    });
     
    db.close();
}

