/*!
 * trains - a plugin with some algorithms to compute the train routes
 * Copyright 2017, Gonglei
 */
(function(window, undefined) {
    "use strict";
    // Constructor
    var trains = function(routes) {
        this.routes = routes;
        this.towns = this.getTowns();
    };
    // Prototype
    trains.prototype = {
        constructor: trains,
        // get towns from routes
        getTowns: function() {
            var routes = this.routes,
                towns = {};
            for (var i = 0, len = routes.length; i < len; i++) {
                var town = this.parseRoute(routes[i]),
                    name = town.from,
                    existsTown = towns[name];
                if (existsTown === undefined) {
                    towns[name] = existsTown = {};
                }
                existsTown[town.to] = town.distance;
            }
            return towns;
        },
        // parse route string to object
        parseRoute: function(route) {
            return {
                from: route[0],
                to: route[1],
                distance: parseInt(route.slice(2), 10)
            };
        },
        // get distance of the given route
        getDistance: function(route) {
            var notExist = false,
                notExistMsg = "NO SUCH ROUTE",
                distance = 0,
                towns = this.towns;
            for (var i = 0, len = route.length; i < len; i++) {
                if (i + 1 === len) {
                    break;
                }
                var start = towns[route[i]],
                    next = start && start[route[i + 1]];
                if (start && next) {
                    distance += next;
                } else {
                    notExist = true;
                    break;
                }
            }
            return notExist ? notExistMsg : distance;
        },
        // get routes by starting and ending
        getRoutes: function(route, stops, isEqual) {
            var routes = [],
                towns = this.towns,
                start = route[0],
                end = route[1],
                rt = start,
                addRoute = function(st) {
                    var town = towns[st || start],
                        reset = function() {
                            rt = rt.slice(0, len - 1);
                        };
                    for (var i in town) {
                        rt += i;
                        var len = rt.length,
                            slen = stops + 1,
                            con = isEqual ? len === slen : len <= slen;
                        if (con) {
                            if (i === end) {
                                routes.push(rt);
                            }
                            if (isEqual) {
                                reset();
                                continue;
                            }
                        } else {
                            if (!isEqual) {
                                reset();
                                continue;
                            }
                        }
                        addRoute(i);
                        reset();
                    }
                };
            addRoute();
            return routes;
        },
        // get the shortest distance by starting and ending
        getDistances: function(route, stops, filter) {
            var routes = this.getRoutes(route, stops),
                distances = [];
            for (var i = 0, len = routes.length; i < len; i++) {
                var distance = this.getDistance(routes[i]),
                    isOk = true;
                if (typeof filter === "function") {
                    isOk = filter.call(this, distance);
                }
                if (isOk) {
                    distances.push(distance);
                }
            }
            return distances;
        },
        // get the shortest distance by starting and ending
        getShortestDistance: function(route, stops) {
            return Math.min.apply(null, this.getDistances(route, stops));
        }
    };
    // Expose trains to the global object
    window.trains = trains;
})(window);
