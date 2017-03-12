/*
This program connects to a mongo database whose name is read from the command line and deletes a record/document from the table/collection
provided on the command line.
*/

var dbName = process.argv[2],
    collectionName = process.argv[3],
    recordID = process.argv[4];

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
    
    //In the official solution, instead of an object/document as the 3rd parameter, a callback function(error) was passed.
    myCollection.remove({_id:recordID}, true, function(err){
        if (err)
            console.log('Record not found!!!!');
    });
     
    db.close();
}

