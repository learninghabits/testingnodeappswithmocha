var assert = require('assert');
describe('DataService Tests', function () {
    it('returns an of a dataservice', function () {
        var dataService = require('./dataservice');
        assert.ok(dataService, 'expected a dataservice');
    });
    it('create an instance of dataservice', function () {
        var mock = require('mock-require');
        mock('./dbconfig.json', { collectionName: 'LearningHabitsCollecion' });
        mock('mongodb', {
            MongoClient: {}
        });
        var DataService = require('./dataservice');
        var dataService = new DataService();
        assert.ok(dataService, 'could not create an instance of dataservice')
    });
    it('calling the connect function (success scenario)',
        function (done) {
            var mock = require('mock-require');
            mock('mongodb', {
                MongoClient: {
                    connect: function (url, cb) {
                        cb(null, {});
                    }
                }
            });
            var DataService = require('./dataservice');
            var dataService = new DataService();
            dataService.connect()
                .then(function () {
                    done();
                });
        });
    it('calling the connect function (error scenario)',
        function (done) {
            var mock = require('mock-require');
            mock('mongodb', {
                MongoClient: {
                    connect: function (url, cb) {
                        cb({ message: "DB Time out" }, null);
                    }
                }
            });
            var DataService = require('./dataservice');
            var dataService = new DataService();
            dataService.connect()
                .catch(function () {
                    done();
                });
        });
    it('calling the getTopic function (success scenario)',
        function (done) {
            var DataService = require('./dataservice');
            var dataService = new DataService();
            var params = {
                db: {
                    collection: function (collectionName) {
                        return {
                            findOne: function (mainQ, subQ, cb) {
                                cb(null, {});
                            }
                        };
                    },
                    close: function () {
                    }
                },
                query: [{}, {}]
            };
            dataService.getTopic(params)
                .then(function () {
                    done();
                });
        });
    it('calling the getTopic function (error scenario)',
        function (done) {
            var DataService = require('./dataservice');
            var dataService = new DataService();
            var params = {
                db: {
                    collection: function (collectionName) {
                        return {
                            findOne: function (mainQ, subQ, cb) {
                                cb({}, null);
                            }
                        };
                    },
                    close: function () {
                    }
                },
                query: [{}, {}]
            };
            dataService.getTopic(params)
                .catch(function () {
                    done();
                });
        });
    it('calling the migrateData function (success scenario)',
        function (done) {
            var mock = require('mock-require');
            var topics = [
                {
                    "id": 1
                },
                {
                    "id": 2
                }];
            mock('./topics.json', topics);
            var DataService = require('./dataservice');
            var dataService = new DataService();
            var db = {
                collection: function (collectionName) {
                    return {
                        insertMany: function (topics, cb) {
                            cb(null, {});
                        }
                    };
                },
                close: function () {
                }
            };
            dataService.migrateData(db)
                .then(function () {
                    done();
                });
        }),
        it('calling the migrateData function (error scenario)',
            function (done) {
                var mock = require('mock-require');
                var topics = [
                    {
                        "id": 1
                    },
                    {
                        "id": 2
                    }];
                mock('./topics.json', topics);
                var DataService = require('./dataservice');
                var dataService = new DataService();
                var db = {
                    collection: function (collectionName) {
                        return {
                            insertMany: function (topics, cb) {
                                cb({}, null);
                            }
                        };
                    },
                    close: function () {
                    }
                };
                dataService.migrateData(db)
                    .catch(function () {
                        done();
                    });
            }),
        it('calling the deleteAllDocuments function (success scenario)',
            function (done) {
                var DataService = require('./dataservice');
                var dataService = new DataService();
                var db = {
                    collection: function (collectionName) {
                        return {
                            deleteMany: function (topics, cb) {
                                cb(null, {});
                            }
                        };
                    },
                    close: function () {
                    }
                };
                dataService.deleteAllDocuments(db)
                    .then(function () {
                        done();
                    });
            }),
        it('calling the deleteAllDocuments function (error scenario)',
            function (done) {
                var DataService = require('./dataservice');
                var dataService = new DataService();
                var db = {
                    collection: function (collectionName) {
                        return {
                            deleteMany: function (topics, cb) {
                                cb({}, null);
                            }
                        };
                    },
                    close: function () {
                    }
                };
                dataService.deleteAllDocuments(db)
                    .catch(function () {
                        done();
                    });
            }),
        it('calling the getAllTopics function (success scenario)',
            function (done) {
                var DataService = require('./dataservice');
                var dataService = new DataService();
                var db = {
                    collection: function (collectionName) {
                        return {
                            find: function (obj) {
                                return {
                                    toArray: function (cb) {                                       
                                        return cb(null, {});
                                    }
                                };
                            }
                        };
                    },
                    close: function () {
                    }
                };
                dataService.getAllTopics(db)
                    .then(function () {
                        done();
                    });
            }),
        it('calling the getAllTopics function (error scenario)',
            function (done) {
                var DataService = require('./dataservice');
                var dataService = new DataService();
                var db = {
                    collection: function (collectionName) {
                        return {
                            find: function (obj) {
                                return {
                                    toArray: function (cb) {
                                       return cb({}, null);
                                    }
                                };
                            }
                        };
                    },
                    close: function () {
                    }
                };
                dataService.getAllTopics(db)
                    .catch(function () {
                        done();
                    });
            }),
        it('calling the insertTopic function (success scenario)',
            function (done) {
                var DataService = require('./dataservice');
                var dataService = new DataService();
                var params = {
                    db: {
                        collection: function (collectionName) {
                            return {
                                insert: function (topic, cb) {
                                    cb(null, {});
                                }
                            };
                        },
                        close: function () {
                        }
                    },
                    topic: {},
                    index: 4
                };
                dataService.insertTopic(params)
                    .then(function () {
                        done();
                    });
            }),
        it('calling the insertTopic function (error scenario)',
            function (done) {
                var DataService = require('./dataservice');
                var dataService = new DataService();
                var params = {
                    db: {
                        collection: function (collectionName) {
                            return {
                                insert: function (topic, cb) {
                                    cb({}, null);
                                }
                            };
                        },
                        close: function () {
                        }
                    },
                    topic: {},
                    index: 4
                };
                dataService.insertTopic(params)
                    .catch(function () {
                        done();
                    });
            });
});