/*
This program connects to a mongo database called 'learnyounode' and searches a table/collection
called 'parrots' for records where age = ageVal. See your notes in notebook for details on the 
installation and setup of mongodb.
*/

var ageVal = global.parseInt(process.argv[2]); //10 is the base or radix
var url = 'mongodb://localhost:27017/learnyoumongo'; //learnyoumongo is the database name


var mongo = require('mongodb').MongoClient;

mongo.connect(url, dataCallback); //the default port for the database is 27017

function dataCallback(err, db){

    if (err)
    {
        db.close();

        throw err;
    }
    

    var myCollection = db.collection('parrots');   //parrots is the name of the table or collection
    
    myCollection.find({age:{$gt:+ageVal}}, {_id:0, name:1, age:1}).toArray(function(err, documents){ //find records where age > ageVal but DO NOT return the ID field
        
        if (err){
            throw err;
        }
        
        console.log(documents);
    });
     
    db.close();
}

