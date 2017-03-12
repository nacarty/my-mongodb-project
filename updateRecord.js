/*
This program connects to a mongo database whose name is read from the command line and updates a record/document into a table/collection
called 'users'.


*/

var dbName = process.argv[2],
    userName = 'tinatime';

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
    

    var myCollection = db.collection('users');   //'users' is the name of the table or collection
    
    //In the official solution, instead of an object/document as the 3rd parameter, a callback function(error) was passed.
    myCollection.update({username:userName}, { $set:{age:40}},{upsert:false, multi:false, writeConcern:{notice: 'The individual has aged'}});
     
    db.close();
}

