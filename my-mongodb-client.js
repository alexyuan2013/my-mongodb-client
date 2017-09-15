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
  var that = this
  Client.connect(url, function(err, database){
    if (err) throw err
    that.db = database
  })
}
/**
 * query document
 * return all docments to array
 */
MyMongoClient.prototype.find = function (coll, queryObj) {
  var url = this.mongoUrl
  var db = this.db
  return new Promise(function(resolve, reject){
    var collection = db.collection(coll)
    collection.find(queryObj).toArray(function(err, docs){
      if(err){
        reject(err)
      } else {
        resolve(docs)
      }
    })
  })
}
/**
 * query document with cursor
 * return total num & first 100 docs
 */
MyMongoClient.prototype.findWithCursor = function(coll, queryObj, page, perPage, orderObj) {
  var url = this.mongoUrl
  var db = this.db
  var result = {}
  var curPage = page || 1
  curPage = curPage > 0 ? curPage : 1
  var start = perPage * (curPage - 1)
  return new Promise(function(resolve, reject){
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
        if (result.count === 0) {
          resolve(result)
        }
        var i = 0
        cursor.sort(orderObj).forEach(function(item){
          if (start > result.count) { //起始点大于数据条数，直接返回
            cursor.close(function(err, result) {
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
  })
}
/**
 * update one document
 * when options with {upsert: true} insert document if selector match nothing
 */
MyMongoClient.prototype.updateOne = function (coll, selector, document, options) {
  var url = this.mongoUrl
  var db = this.db
  return new Promise(function(resolve, reject){
    var collection = db.collection(coll)
    collection.updateOne(selector, document, options).then(function(res){
      resolve(res)
    }, function(err){
      reject(err)
    })
  })
}
/**
 * delete one document
 */
MyMongoClient.prototype.deleteOne = function (coll, selector, options) {
  var url = this.mongoUrl
  var db = this.db
  return new Promise(function(resolve, reject){
    var collection = db.collection(coll)
    collection.deleteOne(selector, options).then(function(res){
      resolve(res)
    }, function(err){
      reject(err)
    })
  })
}
/**
 * insert multiple docs
 */
MyMongoClient.prototype.insertMany = function (coll, array, options) {
  var url = this.mongoUrl
  var db = this.db
  return new Promise(function(resolve, reject){
    var collection = db.collection(coll)
    collection.insertMany(array, options).then(function(res){
      resolve(res)
    }, function(err){
      reject(err)
    })
  })
}

MyMongoClient.prototype.close = function() {
  var db = this.db
  return db.close(true)
}
module.exports = MyMongoClient


