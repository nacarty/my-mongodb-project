/*
This program connects to a mongo database whose name is read from the command line and deletes a record/document from the table/collection
provided on the command line.
*/

var dbName = 'learnyoumongo',
    collectionName = 'parrots',
    Age = parseInt(process.argv[2], 10);  //base or radix is 10

var url = 'mongodb://localhost:27017/'+dbName; //dbName is the database name



var mongo = require('mongodb').MongoClient;

mongo.connect(url, dataCallback); //the default port for the database is 27017

function dataCallback(err, db)
{

    if (err)
    {
        db.close();

        throw err;
    }
    

    var myCollection = db.collection(collectionName);   // the name of the table or collection
    
    var count = myCollection.count({age:{$gt:Age}}, function(err, count){
        if (err)
            throw err;
        else 
            console.log(count);
            
    });
     
    db.close();
    
    
}

