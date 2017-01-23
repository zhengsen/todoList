
var app = getApp()

function openDataBase() {
    var db;
    var DBOpenRequest = indexedDB.open('todoList', 1);

    DBOpenRequest.onerror = function (event) {
        console.log('error loading database');
    };

    DBOpenRequest.onsuccess = function (event) {
        db = DBOpenRequest.result;
        app.globalData.db = db;
        console.log('onsuccess' + app.globalData.db);
    };

    DBOpenRequest.onupgradeneeded = function (event) {
        db = event.target.result;

        db.onerror = function () {
            console.log('error loading database');
        }

        var objectStore = db.createObjectStore('todoList', { keyPath: 'id' });

        objectStore.createIndex('title', 'title', { unique: false });
        objectStore.createIndex('describe', 'describe', { unique: false });
        objectStore.createIndex('notify', 'notify', { unique: false });
        objectStore.createIndex('targetDate', 'targetDate', { unique: false });
        objectStore.createIndex('targetTime', 'targetTime', { unique: false });
        objectStore.createIndex('imgUrl', 'imgUrl', { unique: false });
        objectStore.createIndex('targetTimestamp', 'targetTimestamp', { unique: false });
        objectStore.createIndex('outOfDate', 'outOfDate', { unique: false });

        app.globalData.db = db;
        console.log('onupgradeneeded--->' + app.globalData.db);
    };
}

function addSingleData(incident, storeName, callback) {
    if (app.globalData.db == null) {
        openDataBase()
    }

    if (app.globalData.db == null) {
        console.log('load db error')
        callback(false)
    } else {
        var newItem = [{
            id: incident.id,
            title: incident.title,
            describe: incident.describe,
            notify: incident.notify,
            targetDate: incident.targetDate,
            targetTime: incident.targetTime,
            imgUrl: incident.imgUrl,
            targetTimestamp: incident.targetTimestamp,
            outOfDate: incident.outOfDate
        }];

        var transaction = app.globalData.db.transaction([storeName], 'readwrite');

        transaction.oncomplete = function () {

        };

        transaction.onerror = function () {
            console.log('transaction error');
            callback(false);
        };

        var objectStore = transaction.objectStore(storeName);

        var objectStoreRequest = objectStore.add(newItem[0]);

        objectStoreRequest.onsuccess = function () {
            console.log('save single data success')
            callback(true)
        }
    }
}

function getAllStoreData(storeName, callback) {
    if (app.globalData.db == null) {
        openDataBase()
    }

    if (app.globalData.db == null) {
        console.log('load db error')
        callback(false, null)
    } else {
        var transaction = app.globalData.db.transaction([storeName]);//默认是readOnly

        transaction.oncomplete = function () {

        }

        transaction.onerror = function () {
            console.log('transaction error')
            callback(false, null)
        }

        var objectStore = transaction.objectStore(storeName)
        objectStore.getAll().onsuccess = function (event) {
            console.log(event.target.result)
            callback(true, event.target.result)
        }
    }
}

module.exports = {
    openDataBase: openDataBase,
    addSingleData: addSingleData,
    getAllStoreData: getAllStoreData
}