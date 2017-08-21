var MyMongoClient = require('./my-mongodb-client')
var myClient = new MyMongoClient('mongodb://127.0.0.1:27017/aerial')

setTimeout(function() {
    myClient.find('test', {})
    .then(function(res){
      console.log(res)
    }, function(err){
      console.log(err)
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