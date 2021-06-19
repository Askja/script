function Requests() {
    this.request = function(url, callback, err, isGame = true) {
        // GM.log("url = " + url);
        GM.xmlHttpRequest({
            url: url,
            revalidate: true,
            nocache: true,
            timeout: 5000,
            overrideMimeType: (isGame === true ? 'text/plain; charset=x-user-defined' : 'application/json; charset=utf-8'),
            responseType: (isGame === true ? 'blob' : 'json'),
            onload: function(e) {
                if (typeof callback === 'function') {
                    callback(e);
                } else {
                    GM.log(e);
                }
            },
            onerror: function(e) {
                if (typeof err === 'function') {
                    err(e);
                } else {
                    GM.log(e);
                }
            },
            method: "GET"
        });
    };
    
    this.tempRequest = function(url, data, callback, err) {
        GM.xmlHttpRequest({
            url: url,
            data: $.param(data),
            revalidate: true,
            nocache: true,
            timeout: 5000,
            overrideMimeType: 'application/json; charset=utf-8',
            responseType: 'json',
            onload: function(e) {
                GM.log(e);
                if (typeof callback === 'function') {
                    callback(e);
                } else {
                    GM.log(e);
                }
            },
            onerror: function(e) {
                if (typeof err === 'function') {
                    err(e);
                } else {
                    GM.log(e);
                }
            },
            method: "POST"
        });
    };

    this.vkApiRequest = function(method, params, callback) {
        params['v'] = '5.103';
        params['access_token'] = '5b285c755b285c755b285c754f5b64b3bd55b285b285c750620d590b6dda42969fc7136';
        params['lang'] = 'ru';

        this.request("https://api.vk.com/method/" + method + "?" + $.param(params), callback, false, false);
    };

    this.usersGet = function(users, callback) {
        params = {
            "user_ids": users.join(',')
        };

        this.vkApiRequest("users.get", params, callback);
    };

    this.gameRequest = function(method, data, callback, onerror = (e) => {
        console.log(e);
    }) {
        //" + Math.round(Math.random() * (2 - 1) + 1) + "
        this.request("http://5.178.83.92/" + app.getSelfID() + "/" + app.getAuthKey() + "/" + method + "?" + $.param(data), callback, onerror);
    };
    
    this.tempGameRequest = function(method, data, callback, onerror = (e) => {
        console.log(e);
    }) {
        this.tempRequest("http://5.178.83.92/" + app.getSelfID() + "/" + app.getAuthKey() + "/" + method, data, callback, onerror);
    };

    this.socialGet = function(userID, callback) {
        data = {};
        data['friends'] = '["' + userID.toString() + '"]';

        this.gameRequest("social_get", data, callback);
    };

    this.get = function(callback) {
        this.gameRequest("get", {
            ts: (new Date()).getTime()
        }, callback);
    };

    this.package = function(reqs, callback) {
        data = {};
        data['requests'] = '[' + reqs.join(',') + ']';

        this.tempGameRequest("package", data, callback);
    };

    this.compare = function(friendID, callback) {
        data = {};
        data['friend'] = friendID;

        this.gameRequest("compare", data, callback);
    };
    
    this.changeGuild = function(request, params, callback) {
        data = {};
        data['request'] = request;
        data['params'] = params;

        this.gameRequest("change_guild", data, callback);
    };

    this.getGuilds = function(guildID, callback) {
        data = {};
        data['ids'] = '["' + guildID.toString() + '"]';

        this.gameRequest("get_guilds", data, callback);
    };
}