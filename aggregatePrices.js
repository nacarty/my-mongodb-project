/*
This program connects to a mongo database whose name is read from the command line and deletes a record/document from the table/collection
provided on the command line.
*/

var dbName = 'learnyoumongo',
    collectionName = 'prices',
    Size = process.argv[2];

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
    
    myCollection.aggregate([{$match:{size:Size}}, {$group:{_id:'AVERAGE', AVG:{$avg:'$price'}}}])
       .toArray( function(err, result){
                           if (err)
                               throw err;
                           else if (!result.length)
                                    throw new Error('Perhaps no records found!')
                                
                           else
                               console.log(result[0].AVG.toFixed(2));  //NOTE: result = [{_id: 'AVERAGE', AVG: 10.5 }]
               
       });
     
    db.close();
    
    
}

