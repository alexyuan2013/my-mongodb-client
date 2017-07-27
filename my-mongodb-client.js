/**
 * A client for mongodb build upon mongodb native sdk and promise
 * Just a few methods but frequently used
 * 
 */
const Client = require('mongodb').MongoClient
const Promise = require('promise')
/**
 * constructor
 * @param {string} url mongodb connection url
 */
function MyMongoClient(url) {
  this.mongoUrl = url
}
/**
 * query document
 * return all docments to array
 */
MyMongoClient.prototype.find = function (coll, queryObj) {
  var url = this.mongoUrl
  return new Promise(function(resolve, reject){
    Client.connect(url, function(err, db){
      if (err) {
        reject(err)
      } else {
        var collection = db.collection(coll)
        collection.find(queryObj).toArray(function(err, docs){
          if(err){
            reject(err)
          } else {
            db.close()
            resolve(docs)
          }
        })
      }
    })
  })
}
/**
 * query document with cursor
 * return total num & first 100 docs
 */
MyMongoClient.prototype.findWithCursor = function(coll, queryObj, page, orderObj) {
  var url = this.mongoUrl
  var result = {}
  var curPage = page || 1
  curPage = curPage > 0 ? curPage : 1
  var perPage = 100
  var start = perPage * (curPage - 1)
  return new Promise(function(resolve, reject){
    Client.connect(url, function(err, db){
      if(err) {
        reject(err)
      } else {
        var collection = db.collection(coll)
        var cursor = collection.find(queryObj)
        cursor.count(function(err, count){
          if (err) {
            reject(err)
          } else {
            result.count = count
            result.per_page = perPage
            result.page = curPage
            result.data = []
            var i = 0
            cursor.sort(orderObj).forEach(function(item){
              if (start > result.count) { //起始点大于数据条数，直接返回
                cursor.close(function(err, result) {
                  db.close();
                })
                resolve(result)
              } else {
                if (i < start) { //起点从0开始，移动游标
                  i++
                } else if (i < start + perPage && i < result.count){
                  result.data.push(item)
                  i++
                }
              }
              if (i == start+perPage || i == result.count){
                cursor.close(function(err, result) {
                  db.close();
                })
                resolve(result)
              }
            }, function(err){
              if (err) {
                reject(err)
              }
            })
          }
        })
      }
    })
  })
}
/**
 * update one document
 * when options with {upsert: true} insert document if selector match nothing
 */
MyMongoClient.prototype.updateOne = function (coll, selector, document, options) {
  var url = this.mongoUrl
  return new Promise(function(resolve, reject){
    Client.connect(url, function(err, db){
      if (err) {
        reject(err)
      } else {
        var collection = db.collection(coll)
        collection.updateOne(selector, document, options).then(function(res){
          db.close()
          resolve(res)
        }, function(err){
          reject(err)
        })
      }
    })
  })
}
/**
 * delete one document
 */
MyMongoClient.prototype.deleteOne = function (coll, selector, options) {
  var url = this.mongoUrl
  return new Promise(function(resolve, reject){
    Client.connect(url, function(err, db){
      if (err) {
        reject(err)
      } else {
        var collection = db.collection(coll)
        collection.deleteOne(selector, options).then(function(res){
          db.close()
          resolve(res)
        }, function(err){
          reject(err)
        })
      }
    })
  })
}
module.exports = MyMongoClient


