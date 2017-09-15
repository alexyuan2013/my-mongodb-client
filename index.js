var MyMongoClient = require('./my-mongodb-client')
var myClient = new MyMongoClient('mongodb://127.0.0.1:27017/geo')
var ObjectID = require('mongodb').ObjectID
var MongoClient = require('mongodb').MongoClient
/*
setTimeout(function() {
    myClient.find('test', {})
    .then(function(res){
      console.log(res)
    }, function(err){
      console.log(err)
    })
}, 1000);


setTimeout(function() {
  var doc = `{"device_id" : "11393671",
  "day" : 15362410000,
  "locations" : [ 
      {
          "log" : 113.9326722,
          "lat" : 23.3265266,
          "time" : 152311251000,
          "timeEnd" : 152223522000,
          "address" : "广东省深圳市南山区海天一路(深圳市软件产业基地4栋-B座附近30米)",
          "locateType" : 1,
          "precision" : 35
      }, 
      {
          "log" : 113.9326722,
          "lat" : 23.3265266,
          "time" : 152311251000,
          "address" : "广东省深圳市南山区海天一路(深圳市软件产业基地4栋-B座附近30米)",
          "locateType" : 1,
          "precision" : 35
      }, 
      {
          "log" : 113.9326722,
          "lat" : 23.3265266,
          "time" : 152311251000,
          "address" : "广东省深圳市南山区海天一路(深圳市软件产业基地4栋-B座附近30米)",
          "locateType" : 1,
          "precision" : 35
      }, 
      {
          "log" : 113.9326722,
          "lat" : 23.3265266,
          "time" : 152311251000,
          "address" : "广东省深圳市南山区海天一路(深圳市软件产业基地4栋-B座附近30米)",
          "locateType" : 1,
          "precision" : 35
      }
  ]}`
  var docObj = JSON.parse(doc)
  var docObjs = []
  for(var i = 0; i < 1000000; i++) {
    docObj = {}
    docObj = JSON.parse(doc)
    docObj._id = new ObjectID().toHexString().toString()
    docObjs.push(docObj)
  }
  myClient.insertMany('history_trail', docObjs, {})
  .then(function(res){
    console.log(res)
  }, function(err){
    console.log(err)
  })

}, 1000);


MongoClient.connect('mongodb://127.0.0.1:27017/geo', function(err, db){
  if(err) {
    console.log(err)
  }
  var his = db.collection('history_trail')
  his.aggregate([  {
    $limit: 3
  },{
    $unwind: '$locations'
  }, 
  {
    $group:{
      _id: '$device_id',
      locations: { 
        $push: '$locations' 
      }
    }
  }], function(err, result){
    if(err) {
      console.log(err)
      return
    }
    console.log(result)
  })
})
 {$set: {'locations.0.timeEnd': 1542415221000}}
*/


setTimeout(function() {
  myClient.find('history_trail', {_id: '59ba54e4c3033441f8bd0b6d'}).then(function(result){
    console.log(result)
    myClient.close().then(function(res) {
      console.log(res)
    }, function(err){
      console.log(err)
    })
  })
}, 1000);


// myClient.findWithCursor('device_record', {}, 1, [['time',-1]]).then(function(res){
//   console.log(res)
// }, function(err){
//   console.log(err)
// })

// myClient.updateOne('devices', {_id: '7503795'}, {$set: {data: {name: 'alex'}}}, {upsert: true}).then(function(res){
//   console.log(res.result)
// }, function(err){
//   console.log(err)
// })

// myClient.deleteOne('devices', {_id: '7503795'}).then(res => console.log(res.result), err => console.log(err))