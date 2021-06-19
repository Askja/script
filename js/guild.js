function Guild(e, t) {
    (this.guildPack = e),
        (this.getSection = function (e) {
            var s = [];
            for (var r in this.guildPack[t])
                if (this.guildPack[t].hasOwnProperty(r) && this.guildPack[t][r][0] === e) {
                    s = this.guildPack[t][r][1];
                    break;
                }
            return s;
        }),
        (this.getMembers = function () {
            var e = this.getSection("members"),
                t = {};
            for (var s of e) t[s[0]] = { date: s[1][1], rank: s[1][0] };
            return t;
        }),
        (this.getDamages = function () {
            var e = this.getSection("static_resources"),
                t = {};
            for (var s of e) if (s[0].indexOf('ssw_') !== -1) t[s[0]] = s[1] + 100;
            return t;
        }),
        (this.getRanks = function () {
            var e = this.getSection("ranks"),
                t = { ranks: {}, permissions: {} };
            for (var s of e)
                for (var r of s[1])
                    if ("name" === r[0]) {
                        t.ranks[s[0]] = "";
                        for (var i = 0; i < r[1].length; i++) t.ranks[s[0]] += "&#" + r[1][i] + ";";
                    } else "permissions" === r[0] && (t.permissions[s[0]] = r[1]);
            return t;
        }),
        (this.getExperinces = function () {
            var e = this.getSection("experiences"),
                t = { users: {}, self: 0, level: 0 };
            for (var s of e[0][1])
                if ("log" === s[0]) for (var r of s[1]) is_object(t.users[r[0]]) || (t.users[r[0]] = {}), (t.users[r[0]].all = r[1]);
                else "amount" === s[0] ? (t.self = s[1]) : "maximum" === s[0] && (t.level = parseInt(s[1], 10));
            e = this.getSection("users");
            var i = new Date();
            i = parseInt(i.getFullYear() + "" + i.getMonth() + i.getDate(), 10);
            var a = new Date();
            for (var n of e)
                for (var o of n[1])
                    if ("resource_logs" === o[0])
                        for (var u of o[1])
                            if ("exp" === u[0]) {
                                for (var f of u[1]) {
                                    var g = !0,
                                        l = 0;
                                    if ("updated_time" === f[0])
                                        (g = !0),
                                            a.setTime(1e3 * f[1]),
                                            parseInt(a.getFullYear() + "" + a.getMonth() + a.getDate(), 10) < i ? ((t.users[n[0]].exp_day = 0), (g = !1), (t.users[n[0]].last_update_time = !1)) : (t.users[n[0]].last_update_time = f[1]);
                                    else "last_value" === f[0] ? (l = f[1]) : "value" === f[0] && (t.users[n[0]].exp_day || (t.users[n[0]].exp_today = f[1]));
                                }
                                g && (t.users[n[0]].exp_day = l);
                            }
            return t;
        }),
        (this.getLog = function () {
            var e = this.getSection("log"),
                t = [],
                f = {},
                x, __d, __k, __a;
            for (var s of e) {
                x = s[2];
                __d = new Date(Math.round(s[0]).toFixed() * 1000);
                __k = 'f' + __d.getFullYear() + '_' + __d.getMonth() + '_' +__d.getDate() + 'd';
                __a = 'c' + x + '_' + __k;
                if (is_undefined(f[__a])) {
                    f[__a] = 0;
                }
                f[__a]++;
                t.push({ type: x, limit: f[__a], date: s[0], target: !is_undefined(s[1][0]) && s[1][0][1], to: !is_undefined(s[1][1]) && s[1][1][1], undef: !is_undefined(s[1][2]) && s[1][2][1] });
            }

            return t.sort((e, t) => (e.date < t.date ? 1 : -1)), t;
        }),
        (this.getQuests = function () {
            var e = this.getSection("quests_group"),
                t = [], d = [];
                
            for (var s of e)
                if ("quests" === s[0])
                    for (var r of s[1]) {
                        t.push({
                            questID: r[0],
                            status: 3 != r[1][2][1] && r[1][0][1] + 259200 <= (new Date().getTime() / 1000) ? 4 : r[1][2][1],
                            time: r[1][0][1],
                            uid: r[1][1][1],
                            badges: badgesPack.quests[r[0]].guild_reward.amount,
                        });
                        
                        d.push(r[0]);
                    }
                    
                    var a = Object.keys(badgesPack.quests);
                    
                    for (var g of a)
                        if (!(g in d))
                            t.push({
                                questID: g,
                                status: 5,
                                time: 0,
                                uid: -1,
                                badges: badgesPack.quests[g].guild_reward.amount,
                            });
            return t;
        }),
        (this.getInfluence = function () {
            var e = this.getSection("front_capture_history"),
                t = {};
            for (var s of e[0][1])
                for (var r of ((t[s[0]] = {}), s[1])) {
                    var i = r[0].split("_")[2];
                    t[s[0]][i] = r[1];
                }
            return t;
        }),
        (this.getNames = function () {
            var e = this.getSection("names"),
                t = {};
            for (var s of e) for (var r of ((t[s[0]] = ""), s[1])) t[s[0]] += "&#" + r + ";";
            return t;
        }),
        (this.getLimits = function () {
            var e = this.getSection("expiring_resources"),
                t = {}, d, _i, i = new Date(), _d = parseInt(i.getFullYear() + "" + i.getMonth() + i.getDate(), 10);
                
            for (var s of e) {
                for (var g of s[1]) {
                    t[s[0]] = 0;
                    
                    _i = new Date(s[1][1][1] * 1000);
                    
                    if (parseInt(_i.getFullYear() + "" + _i.getMonth() + _i.getDate(), 10) <= _d) {
                        t[s[0]] = s[1][0][1];
                    }
                }
            }
            
            return t;
        }),
        (this.getFullInfo = function () {
            return { damage: this.getDamages(), limits: this.getLimits(), users: this.getMembers(), ranks: this.getRanks(), names: this.getNames(), quests: this.getQuests(), exp: this.getExperinces(), log: this.getLog(), influence: this.getInfluence() };
        });
}
