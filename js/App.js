function gzuncompress(gz) {
    var a = [];
    for (var c = 0; c < gz.length; c++) {
        var d = gz.charCodeAt(c) & 0xff;
        a.push(d)
    }
    return pako.inflate(a, {
        to: 'string'
    });
}
var range = function(r, e, t = 1) {
    var n = [],
        o = typeof r,
        a = typeof e;
    if (0 === t) throw TypeError("Step cannot be zero.");
    if ("undefined" == o || "undefined" == a) throw TypeError("Must pass start and end arguments.");
    if (o != a) throw TypeError("Start and end arguments must be of same type.");
    if (void 0 === t && (t = 1), e < r && (t = -t), "number" == o)
        for (; t > 0 ? e >= r : e <= r;) n.push(r), r += t;
    else {
        if ("string" != o) throw TypeError("Only string and number types are supported");
        if (1 != r.length || 1 != e.length) throw TypeError("Only strings with one character are supported.");
        for (r = r.charCodeAt(0), e = e.charCodeAt(0); t > 0 ? e >= r : e <= r;) n.push(String.fromCharCode(r)), r += t
    }
    return n
};

function App() {
    this.headers = {};
    this.parser = null;
    this.userID = null;
    this.selfID = null;
    this.completeInit = false;
    this.binding = false;
    this.loading = false;
    this.authKey = null;
    this.loadingKeys = null;
    this.request = null;
    this.secrets = null;
    this.signLoad = false;
    this.secretsInjected = false;
    this.error = 0;
    this.gerror = 0;
    this.empty = 0;
    this.small = {};
    this.users = {};
    this.getID = function() {
        return this.userID;
    };
    this.getSelfID = function() {
        return this.selfID;
    };
    this.getAuthKey = function() {
        return this.authKey;
    };
    this.setState = function(text) {
        $(".bn1-loader").html(text)
    };
    this.onInitDone = function() {
        this.error = this.empty = this.gerror = 0;
        if (this.getID() === this.getSelfID()) {
            app.loadSelfData();
        } else {
            app.loadDataByID();
        }
    };
    this.reqHandle = function(response, callback) {
        return (response.status !== 200 ? app.selfAlert(response.statusText) : callback(response.responseText));
    };
    this.notEnoughData = function() {
        return (this.getAuthKey() === null || this.getSelfID() === null)
    };
    this.isObjectNotEmpty = function(obj) {
        return ((typeof data.error === "undefined" && typeof data.completed_categorized_achievements !== "undefined") || (typeof data.error === "undefined" && data !== null && typeof data.time !== "undefined"));
    };
    this.getParser = function() {
        if (this.parser === null) {
            this.parser = new Parser();
        }
        return this.parser;
    };
    this.getSecrets = function() {
        if (this.secrets === null) {
            this.secrets = new Secret(this);
        }
        return this.secrets;
    };
    this.getRequest = function() {
        if (this.request === null) {
            this.request = new Requests();
        }
        return this.request;
    };
    this.bindTitles = function() {
        $(".bn1-logo").click(function() {
            location.href = 'https://vk.com/bot1vokope', '_blank';
        });
        $(".bn1-tooltiped").each(function() {
            if ($(this).data('bn1tooltip') !== undefined && !$(this).hasClass('bn1-patched-tt')) {
                $(this).mouseover(function() {
                    showTooltip(this, {
                        black: 1,
                        shift: [0, 15, -40],
                        text: $(this).data('bn1tooltip')
                    });
                });
                $(this).addClass('bn1-patched-tt');
            }
        });
    };
    this.getPlayerObj = function(data) {
        return new Player(data);
    };
    this.init = function() {
        let parser = this.getParser();
        let uid = parseInt(parser.getUserID());
        app.bindTitles();
        if (uid && uid > 0 && this.userID !== uid) {
            this.userID = uid;
            this.loading = false;
        }
        if (!this.completeInit) {
            this.completeInit = true;
        }
        if (this.notEnoughData() && !this.loadingKeys) {
            this.loadingKeys = true;
            return this.getParser().getKeysByApp();
        }
        /*if (!this.notEnoughData() && location.href.indexOf('app3611950') !== -1 && !$(".bn1-secret").html() && !this.secretsInjected) {
            this.secretsInjected = true;
            return this.getSecrets().start();
        }*/
        if (!this.notEnoughData() && this.getID() && !this.loading) {
            this.loader();
            this.loading = true;
            return this.onInitDone();
        }
        if (this.getSelfID() && this.getAuthKey() && this.isOnListUsers()) {
            return this.onListUsers();
        }
        return false;
    };
    this.isOnListUsers = function() {
        let sels = [".friends_field_title", ".labeled", ".pad_fr_name"];
        for (let sel of sels) {
            if (!is_null($(sel + ":not(.patched):has(a)").html())) {
                return true;
            }
        }
        return false;
    };
    this.loader = function() {
        $(".page_top").after('<div class="bn1-loader">Загрузка...</div>');
    };
    this.onListUsers = function() {
        let i = [".friends_field_title", ".labeled.name", ".pad_fr_name"];
        for (let s of i) $(s + ":not(.patched):has(a)").addClass("patched").append('<br><div class="bn1-small-load"></div>').click(function() {
            $(this).off();
            let i = !1,
                s = $(this).parent().parent();
            !is_null(s[0]) && s[0].id.length ? i = s[0].id.split("row")[1] : is_null(s[0]) || is_null(s[0].dataset) || is_null(s[0].dataset.id) || (i = s[0].dataset.id), !1 !== i && !is_undefined(i) || is_undefined($(this).first().parent().first().children()) || $(this).first().parent().first().children().each(function(s, l) {
                l.id.indexOf("controls_") > -1 && (i = l.id.split("controls_")[1])
            }), is_undefined(i) || !1 === i ? $(this).after('<div class="bn1-small-user-loader">Ошибка парсинга ID, обратитесь к админу!</div>') : ($(this).after('<div id="oprofile_' + i + '" class="bn1-small-user-loader">Загрузка...</div>'), app.small[i] = {
                error: 0,
                empty: 0
            }, app.loadSmallBlockByID(i))
        })
    };
    this.setSmallState = function(t, l) {
        $("#oprofile_" + t).html(l)
    };

    this.loadDataByID = function() {
        app.setState("Получение информации о пользователе...");

        app.getRequest().socialGet(app.getID(), function(response) {
            if (response.status === 200) {
                let data = null;
                response = JSON.parse(response.responseText);

                if (!is_undefined(response.error)) {
                    app.setState('Игра вернула ошибку: ' + response.error);
                }

                if (response !== '[]' && response.length && is_undefined(response.error) && response[0][1].length) {
                    data = JSON.parse(response[0][1]);
                } else if ((!response.length || response === '[]' || !response || response === undefined || response == '') && is_undefined(response.error)) {
                    ++app.empty;
                }

                if (!is_null(data)) {
                    data.user = app.getID();
                    app.setState("Информация получена, сейчас я загружу ее сюда...");
                    return app.showDataByID(data);
                } else {
                    ++app.error;

                    app.setState('Ошибка загрузки данных... Может игра умерла?');
                }

                if (app.error < 7) {
                    setTimeout(app.loadDataByID, 1500);

                    return app.setState('Повтор запроса... ' + app.error + '/7');
                }

                if (app.empty >= 2) {
                    return app.setState('Пользователь не играет');
                }
            } else {
                ++app.error;
                
                if (app.error < 7) {
                    setTimeout(app.loadDataByID, 1500);

                    return app.setState('Повтор запроса... ' + app.error + '/7');
                }
            }
        });
    };

    this.showDataByID = function(data) {
        $('.bn1-loader').remove();

        let player = this.getPlayerObj(data);
        let formatter = new Formatter();
        let decks = new sirenia(decksPack, deckEffects, player, talentsPack, statuses);

        let exp = player.getExpData();
        let division = player.getDivisionData();
        let bossLimit = player.countBossLimit();
        let damage = player.getDamageData();

        let wpns = {};

        for (var k = 3; k < 10; k++) {
            wpns[k] = player.a_s_getWeapon(k);
        }

        let srut = player.a_getSrut();

        let guild = (player.isUserHasGuild() ? 'Рота ' + (player.getUserGuildLevel() + 1) + ' ур' : 'Не в роте');
        let login = (!is_null(player.getLastLoginTime()) ? formatter.asDurationTime(player.getLastLoginTime()) + ' назад' : 'никогда');

        var html = '<ul class="bn1-tabs ui_tabs clear_fix ui_tabs_with_progress" onmouseover="uiTabs.tryInit(this)" id="wall_tabs" data-inited="1"><li><a href="#" class="ui_tab ui_tab_sel" id="bn1InfoBox">Информация</a></li><li><a href="#" class="ui_tab" id="bn1GuildBox">Инфо о роте</a></li></ul>';
        html += '<div class="bn1-friend-body">';
        html += '<div class="bn1-flexed-line"> <div class="offset-50per bn1-logo"></div><div class="bn1-friend-logged-time bn1-tooltiped" data-bn1tooltip="До следующего уровня осталось: ' + formatter.numFormat(exp.left) + ' опыта">Уровень: ' + (player.getLevel() + 1) + ' (' + exp.percentage + '%)<br>' + division.name + ' дивизион #' + (division.div + 1) + '<br>Вход: ' + login + '</div> </div>';
        html += '<div class="bn1-flexed-line bn1-friend-res1-line"> <div class="bn1-friend-damage bn1-tooltiped" data-bn1tooltip="Общий урон<br>Дата получения достижения: ' + damage.count + '<br>' + damage.time + '">' + formatter.numFormat(damage.count) + ' [' + bossLimit.full + ']</div><div class="bn1-friend-res1-cap">' + formatter.numFormat(player.getTalentsCount()) + '</div><div class="bn1-friend-res1-cap">' + formatter.numFormat(player.getSrutAmount()) + '</div> </div>';
        html += '<div class="bn1-flexed-line bn1-friend-res-line2"> <div class="bn1-friend-res2-cap bn1-friend-res2-first-cap">' + formatter.numFormat(decks.getWeaponDamage(2)) + '</div><div class="bn1-friend-res2-cap bn1-tooltiped" data-bn1tooltip="Залп трассирующими<br>Дата получения достижения: ' + wpns[3].count + '<br>' + wpns[3].time + '">' + formatter.numFormat(decks.getWeaponDamage(3)) + '</div><div class="bn1-friend-res2-cap bn1-tooltiped" data-bn1tooltip="Залп осколочными<br>Дата получения достижения: ' + wpns[4].count + '<br>' + wpns[4].time + '">' + formatter.numFormat(decks.getWeaponDamage(4)) + '</div><div class="bn1-friend-res2-cap bn1-tooltiped" data-bn1tooltip="Залп разрывными<br>Дата получения достижения: ' + wpns[5].count + '<br>' + wpns[5].time + '">' + formatter.numFormat(decks.getWeaponDamage(5)) + '</div> </div>';
        html += '<div class="bn1-flexed-line bn1-friend-res-line3"> <div class="bn1-friend-res2-cap bn1-friend-res2-first-cap bn1-tooltiped" data-bn1tooltip="Залп зажигательными<br>Дата получения достижения: ' + wpns[6].count + '<br>' + wpns[6].time + '">' + formatter.numFormat(decks.getWeaponDamage(6)) + '</div><div class="bn1-friend-res2-cap bn1-tooltiped" data-bn1tooltip="Залп фугасными<br>Дата получения достижения: ' + wpns[7].count + '<br>' + wpns[7].time + '">' + formatter.numFormat(decks.getWeaponDamage(7)) + '</div><div class="bn1-friend-res2-cap bn1-tooltiped" data-bn1tooltip="Залп бронебойными<br>Дата получения достижения: ' + wpns[8].count + '<br>' + wpns[8].time + '">' + formatter.numFormat(decks.getWeaponDamage(8)) + '</div><div class="bn1-friend-res2-cap bn1-tooltiped" data-bn1tooltip="Залп кумулятивными<br>Дата получения достижения: ' + wpns[9].count + '<br>' + wpns[9].time + '">' + formatter.numFormat(decks.getWeaponDamage(9)) + '</div> </div>';
        html += '<div class="bn1-flexed-line bn1-friend-guild-controls">';
        html += '<div class="bn1-friend-guild-block"><div class="bn1-friend-guild-name">' + guild + '</div></div>';
        html += '<div class="bn1-friend-control"><div class="bn1-flexed-line bn1-help-line"><div class="bn1-send-help" id="bn1_help_0"></div><div class="bn1-send-help" id="bn1_help_1"></div><div class="bn1-send-help" id="bn1_help_2"></div><div class="bn1-send-help" id="bn1_help_3"></div><div class="bn1-send-help" id="bn1_help_4"></div><div class="bn1-send-help" id="bn1_help_5"></div></div>';

        html += '<div class="bn1-flexed-line bn1-control-line">';

        var l = player.getWish();

        if (l === false) {
            html += '<select class="bn1-select" id="bn1-cols"><option value="no">Пусто...</option></select>';
        } else {
            html += '<select class="bn1-select" id="bn1-cols">' + app.createWish(l, false) + '</select>';
        }

        var l = player.getGlobalWish();

        if (l === false) {
            html += '<select class="bn1-select bn1-second-select" id="bn1-global-cols"><option value="no">Пусто...</option></select>';
        } else {
            html += '<select class="bn1-select bn1-second-select" id="bn1-global-cols">' + app.createWish(l, true) + '</select>';
        }

        html += '<div class="bn1-button">Ок</div></div>';
        html += '</div>';
        html += '</div>';

        html += '</div>';

        // This is a guild tab
        html += '<div class="bn1-guild-box">';
        html += '<div class="bn1-self-guild-spoiiler"><div class="bn1-self-guild-spoiiler-name">Информация о роте</div><div class="bn1-self-guild-spoiiler-content bn1-opened" id="guildInfo"></div></div>';
        html += '<div class="bn1-self-guild-spoiiler"><div class="bn1-self-guild-spoiiler-name">Опыт роты</div><div class="bn1-self-guild-spoiiler-content" id="guildExp"></div></div>';
        html += '<div class="bn1-self-guild-spoiiler"><div class="bn1-self-guild-spoiiler-name">Участники роты</div><div class="bn1-self-guild-spoiiler-content" id="guildUsers"></div></div>';
        html += '<div class="bn1-self-guild-spoiiler"><div class="bn1-self-guild-spoiiler-name">Директивы роты</div><div class="bn1-self-guild-spoiiler-content" id="guildQuests"></div></div>';
        html += '<div class="bn1-self-guild-spoiiler"><div class="bn1-self-guild-spoiiler-name">Влияние роты</div><div class="bn1-self-guild-spoiiler-content" id="guildInfluence"></div></div>';
        html += '<div class="bn1-self-guild-spoiiler"><div class="bn1-self-guild-spoiiler-name">Журнал роты</div><div class="bn1-self-guild-spoiiler-content" id="guildLog"></div></div>';
        html += '</div>';

        $(".page_top").after(html);

        if (app.getID() && (is_undefined(app.headers[app.getID()]) || app.headers[app.getID()] === false)) {
            app.headers[app.getID()] = true;
            app.checkHeaders(app.getID());
        }

        app.friendTabs();

        if (player.getUserGuildID() !== false) {
            setTimeout(function() {
                app.loadGuildData(player.getUserGuildID());
            }, 800);
        } else {
            $(".bn1-guild-box").html('<div style="margin-top:20px;width:100%;text-align:center;font-weight:700;">Не в роте</div>');
        }

        $(".bn1-send-help").click(function() {
            var i = $(this)[0].id.split('help_')[1];
            var reqs = [];

            var count = prompt("Сколько единиц отправить?", 1);
            count = parseInt(count, 10);

            if (count <= 25 && count >= 1) {
                for (var k = 0; k < count; k++) reqs.push('{"params":{"vote":"' + i + '","friend":' + data.user + '},"request":"vote_send"}');
                app.getRequest().package(reqs, function(r) {
                    if (r.status === 200) {
                        var res = JSON.parse(r.responseText);

                        if (res.result === 'ok') {
                            app.selfAlert('Успешно скинули помощи, в кол-ве: ' + count + ' шт');
                        } else {
                            app.selfAlert('Ошибка отправки помощи... Ошибка от игры...');
                        }
                    } else {
                        app.selfAlert('Ошибка отправки помощи... Че делаешь?');
                    }
                });
            } else {
                app.selfAlert('Ты втираешь мне какую-то дичь!');
            }
        });

        $(".bn1-button").click(function() {

            var reqs = [];
            var n = false;

            var col = $("#bn1-cols").val();

            if (col.indexOf('-') > -1) {
                n = true;
                var s = col.split('-');

                reqs.push('{"request":"collection_item_send","params":{"item":"' + s[2] + '","collection":"' + s[1] + '","territory":"' + s[0] + '","friend":"' + data.user + '"}}');
            }

            var col = $("#bn1-global-cols").val();

            if (col.indexOf('-') > -1) {
                n = true;
                var s = col.split('-');

                reqs.push('{"request":"global_collection_item_send","params":{"item":"' + s[1] + '","collection":"' + s[0] + '","friend":"' + data.user + '"}}');
            }

            if (n) {
                app.getRequest().package(reqs, function(r) {
                    if (r.status === 200) {
                        var res = JSON.parse(r.responseText);

                        if (res.result === 'ok') {
                            app.selfAlert('Успешно скинули коллекцию/деталь');
                        } else {
                            app.selfAlert('Ошибка отправки помощи... Игруля тупит');
                        }
                    } else {
                        app.selfAlert('Ошибка отправки помощи... Че делаешь?');
                    }
                });
            } else {
                app.selfAlert('Отправляю воздух адресату...');
            }
        });
    };

    this.getFromSelfPackItems = function(col, item, ter = -1, isGlobal = true) {
        if (isGlobal) {
            return (is_undefined(selfGameData['collections']) ? 0 : is_undefined(selfGameData['collections'][col]) ? 0 : !is_undefined(selfGameData['collections'][col][item]) ? selfGameData['collections'][col][item] : 0)
        } else {
            if (is_undefined(selfGameData['territories'])) {
                return 0
            }
            if (is_undefined(selfGameData['territories'][ter])) {
                return 0
            }
            if (is_undefined(selfGameData['territories'][ter]['collections'])) {
                return 0
            }
            if (is_undefined(selfGameData['territories'][ter]['collections'][col])) {
                return 0
            }
            if (is_undefined(selfGameData['territories'][ter]['collections'][col][item])) {
                return 0
            }
            return (selfGameData['territories'][ter]['collections'][col][item] || 0)
        }
        return 0
    };

    this.createWish = function(wish, global = false) {
        var terNames = ['«Киев»', '«Одесса»', '«Москва»', '«Воронеж»', '«Тамань»', '«Сталинград»', '«Ржев»', '«Мурманск»', '«Ленинград»'];
        var ret = '<option value="no">Ничего</option>';

        if (!global) {
            for (var ter in wish) {
                if (wish.hasOwnProperty(ter)) {
                    for (var bat in wish[ter]) {
                        if (wish[ter].hasOwnProperty(bat)) {
                            for (var item in wish[ter][bat]) {
                                if (wish[ter][bat].hasOwnProperty(item)) {
                                    var i = wish[ter][bat][item];
                                    ret += '<option value="' + ter + '-' + bat + '-' + i + '">' + (terNames[ter] || 'ter_' + ter) + ' #' + (parseInt(bat, 10) + 1) + '-' + (parseInt(i, 10) + 1) + ' [' + app.getFromSelfPackItems(col, i, ter, false) + ' шт]</option>';
                                }
                            }
                        }
                    }
                }
            }
        } else {
            for (var col in wish) {
                if (wish.hasOwnProperty(col)) {
                    var itemsNums = range(0, (!is_undefined(colData[col]) && !is_undefined(colData[col].items) ? (colData[col].items - 1) : 6));
                    itemsNums.sort();
                    for (var item in wish[col]) {
                        if (wish[col].hasOwnProperty(item)) {
                            var i = wish[col][item];
                            var n = itemsNums.indexOf(parseInt(i, 10));
                            ret += '<option value="' + col + '-' + i + '">' + (!is_undefined(colData[col]) ? strings_ru[colData[col].name] : 'col_' + col) + ' #' + (n + 1) + ' [' + app.getFromSelfPackItems(col, i) + ' шт]</option>';
                        }
                    }
                }
            }
        }

        return ret;
    };

    this.loadSelfData = function() {
        app.setState("Получение информации...");

        app.getRequest().get(function(response) {
            if (response.status === 200) {
                let data = null;

                try {
                    response = gzuncompress(response.responseText);

                    if (!is_undefined(response.error)) {
                        app.setState('Игра вернула ошибку: ' + response.error);
                    }

                    if (response !== '[]' && response.length && is_undefined(response.error)) {
                        data = response;
                    } else if ((!response.length || response === '[]') && is_undefined(response.error)) {
                        ++app.empty;
                    }

                    if (!is_null(data)) {
                        data = JSON.parse(data);
                        data.player['boss'] = [data.boss, data.boss_health, data.finish_time, data.mode];
                        data.player['time_script'] = data.time;
                        return app.showSelfData(data.player);
                    } else {
                        ++app.error;

                        app.setState('Ошибка загрузки данных... Может игра умерла?');
                    }

                    if (app.error < 7) {
                        setTimeout(app.loadSelfData, 5000);

                        return app.setState('Повтор запроса... ' + app.error + '/7');
                    }
                } catch (er) {
                    ++app.error;
                    if (app.error < 7) {
                        setTimeout(app.loadSelfData, 5000);
                        app.setState('Повтор запроса... ' + app.error + '/7');
                    }
                }
            } else {
                ++app.error;
                if (app.error < 7) {
                    setTimeout(app.loadSelfData, 5000);
                    app.setState('Повтор запроса... ' + app.error + '/7');
                }
            }
        });
    };

    this.showSelfData = function(data) {

        $('.bn1-loader').remove();

        let player = this.getPlayerObj(data);
        selfGameData = data;
        let formatter = new Formatter();

        let guild = (player.isUserHasGuild() ? 'Рота ' + (player.getUserGuildLevel() + 1) + ' ур' : 'Не в роте');
        let login = (!is_null(player.getLastLoginTime()) ? formatter.asDurationTime(player.getLastLoginTime()) + ' назад' : 'никогда');

        let exp = player.getExpData();
        let division = player.getDivisionData();
        let bossLimit = player.getBossLimit();
        let damage = player.getDamageData(true);
        let srut = player.a_getSrut();
        let boss = player.getCurrentBoss();
        /*var h=[];
        
        for (var g = 0; g < 10; g++) {
            h.push(player.getWpnDamage(g));
        }
        
        GM.log(h);*/

        var html = '<ul class="bn1-tabs ui_tabs clear_fix ui_tabs_with_progress" onmouseover="uiTabs.tryInit(this)" id="wall_tabs" data-inited="1"><li><a href="#" class="ui_tab ui_tab_sel" id="bn1SelfInfoBox">Информация</a></li><li><a href="#" class="ui_tab" id="bn1SelfGuildBox">Инфо о роте</a></li><li><a href="#" class="ui_tab" id="bn1SelfUsefulBox">Полезное</a></li><li><a href="#" class="ui_tab" id="bn1SelfCalcBox" style="display:none;">Калькулятор</a></li></ul><div class="bn1-self-body"><div class="bn1-flexed-line"><div class="offset-50per bn1-tooltiped bn1-logo" data-bn1tooltip="Бот №1 в окопе"></div><div class="bn1-self-logged-time bn1-tooltiped" data-bn1tooltip="До следующего уровня осталось: ' + formatter.numFormat(exp.left) + ' опыта">Уровень: ' + (player.getLevel() + 1) + ' (' + exp.percentage + '%)<br>' + division.name + ' дивизион #' + (division.div + 1) + '<br>Вход: ' + login + '</div></div><div class="bn1-self-resource energy bn1-tooltiped" data-bn1tooltip="Снабжение">' + formatter.numFormat(player.getEnergy()) + '</div><div class="bn1-self-resource occasion-energy bn1-tooltiped" data-bn1tooltip="Провизия">' + formatter.numFormat(player.getOccasionEnergy()) + '</div><div class="bn1-self-resource spirit bn1-tooltiped" data-bn1tooltip="Жетоны">' + formatter.numFormat(player.getStaticResource('spirit')) + '</div><div class="bn1-self-resource tickets bn1-tooltiped" data-bn1tooltip="Талоны">' + formatter.numFormat(player.getStaticResource('tickets')) + '</div><div class="bn1-self-resource makhorka bn1-tooltiped" data-bn1tooltip="Рубли">' + formatter.numFormat(player.getStaticResource('makhorka')) + '</div><div class="bn1-self-resource booster-points bn1-tooltiped" data-bn1tooltip="Шифровки">' + formatter.numFormat(player.getStaticResource('booster_points')) + '</div><div class="bn1-self-resource shells bn1-tooltiped" data-bn1tooltip="Гильзы">' + formatter.numFormat(player.getLimitedResource('shells')) + '</div><div class="bn1-self-resource gunpowder bn1-tooltiped" data-bn1tooltip="Порох">' + formatter.numFormat(player.getLimitedResource('gunpowder')) + '</div><div class="bn1-self-damage bn1-tooltiped" data-bn1tooltip="Общий урон, в скобках тек. лимит по боссам/макс. лимит по боссам">' + formatter.numFormat(damage.amount) + ' (' + player.getBossLimit() + '/' + player.getBossLimitMax() + ')</div><div class="bn1-self-resource srut bn1-tooltiped" data-bn1tooltip="Суммарный уровень техники">' + formatter.numFormat(player.getSrutAmount()) + '</div><div class="bn1-self-resource talents bn1-tooltiped" data-bn1tooltip="Таланты">' + formatter.numFormat(player.getTalentsCount()) + '</div><div class="bn1-flexed-line bn1-self-boss"><div class="bn1-self-info-boss bn1-flexed-line"><div class="bn1-self-info-boss-ava"><div class="bn1-self-boss-ava-block boss_' + (boss.id !== false ? boss.id : 'undefined') + '"><div class="bn1-self-boss-ava"></div><div class="bn1-self-boss-name">' + boss.name + '</div></div></div><div class="bn1-self-info-boss-timeblock"><div class="bn1-self-info-boss-time">' + boss.time + '</div><div class="bn1-self-info-boss-kill" data-dead="' + boss.dead + '" data-lose="' + boss.lose + '" data-boss="' + boss.id + '" data-hp="' + boss.hp + '">[СЛИТЬ БОССА]</div><div class="bn1-self-info-boss-hp">' + formatter.numFormat(boss.hp) + '</div></div></div><div class="bn1-self-info-guild"><div class="bn1-self-info-guild-name">' + guild + '</div></div></div><div class="bn1-self-small-resource bsw3 bn1-tooltiped" data-bn1tooltip="Залп трассирующими, всего: ' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_3')) + '">' + formatter.num2str(player.getStaticResource('boss_splash_weapon_3')) + '</div><div class="bn1-self-small-resource bsw4 bn1-tooltiped" data-bn1tooltip="Залп осколочными, всего: ' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_4')) + '">' + formatter.num2str(player.getStaticResource('boss_splash_weapon_4')) + '</div><div class="bn1-self-small-resource bsw5 bn1-tooltiped" data-bn1tooltip="Залп разрывными, всего: ' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_5')) + '">' + formatter.num2str(player.getStaticResource('boss_splash_weapon_5')) + '</div><div class="bn1-self-small-resource bsw6 bn1-tooltiped" data-bn1tooltip="Залп зажигательными, всего: ' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_6')) + '">' + formatter.num2str(player.getStaticResource('boss_splash_weapon_6')) + '</div><div class="bn1-self-small-resource bsw7 bn1-tooltiped" data-bn1tooltip="Залп фугасными, всего: ' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_7')) + '">' + formatter.num2str(player.getStaticResource('boss_splash_weapon_7')) + '</div><div class="bn1-self-small-resource bsw8 bn1-tooltiped" data-bn1tooltip="Залп бронебойными, всего: ' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_8')) + '">' + formatter.num2str(player.getStaticResource('boss_splash_weapon_8')) + '</div><div class="bn1-self-small-resource bsw9 bn1-tooltiped" data-bn1tooltip="Залп кумулятивными, всего: ' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_9')) + '">' + formatter.num2str(player.getStaticResource('boss_splash_weapon_9')) + '</div><div class="bn1-self-small-resource gsw0 bn1-tooltiped" data-bn1tooltip="Артиллерия, всего: ' + formatter.numFormat(player.getStaticResource('guild_ship_splash_weapon_0')) + '">' + formatter.num2str(player.getStaticResource('guild_ship_splash_weapon_0')) + '</div><div class="bn1-self-small-resource gsw1 bn1-tooltiped" data-bn1tooltip="Торпеды, всего: ' + formatter.numFormat(player.getStaticResource('guild_ship_splash_weapon_1')) + '">' + formatter.num2str(player.getStaticResource('guild_ship_splash_weapon_1')) + '</div><div class="bn1-self-small-resource gsw2 bn1-tooltiped" data-bn1tooltip="Ракеты, всего: ' + formatter.numFormat(player.getStaticResource('guild_ship_splash_weapon_2')) + '">' + formatter.num2str(player.getStaticResource('guild_ship_splash_weapon_2')) + '</div><div class="bn1-self-small-resource sr0 bn1-tooltiped" data-bn1tooltip="Болты, всего: ' + formatter.numFormat(player.getStaticResource('sr_0')) + '">' + formatter.num2str(player.getStaticResource('sr_0')) + '</div><div class="bn1-self-small-resource sr1 bn1-tooltiped" data-bn1tooltip="Веревка, всего: ' + formatter.numFormat(player.getStaticResource('sr_1')) + '">' + formatter.num2str(player.getStaticResource('sr_1')) + '</div><div class="bn1-self-small-resource sr2 bn1-tooltiped" data-bn1tooltip="Краска, всего: ' + formatter.numFormat(player.getStaticResource('sr_2')) + '">' + formatter.num2str(player.getStaticResource('sr_2')) + '</div><div class="bn1-self-small-resource sp0 bn1-tooltiped" data-bn1tooltip="Деталь №1, всего: ' + formatter.numFormat(player.getStaticResource('sp_0')) + '">' + formatter.num2str(player.getStaticResource('sp_0')) + '</div><div class="bn1-self-small-resource sp1 bn1-tooltiped" data-bn1tooltip="Деталь №2, всего: ' + formatter.numFormat(player.getStaticResource('sp_1')) + '">' + formatter.num2str(player.getStaticResource('sp_1')) + '</div><div class="bn1-self-small-resource sp2 bn1-tooltiped" data-bn1tooltip="Деталь №3, всего: ' + formatter.numFormat(player.getStaticResource('sp_2')) + '">' + formatter.num2str(player.getStaticResource('sp_2')) + '</div><div class="bn1-self-small-resource tap bn1-tooltiped" data-bn1tooltip="Бронепластины танков, всего: ' + formatter.numFormat(player.getStaticResource('tank_armored_plates')) + '">' + formatter.num2str(player.getStaticResource('tank_armored_plates')) + '</div><div class="bn1-self-small-resource aap bn1-tooltiped" data-bn1tooltip="Бронепластины артиллерии, всего: ' + formatter.numFormat(player.getStaticResource('artillery_armored_plates')) + '">' + formatter.num2str(player.getStaticResource('artillery_armored_plates')) + '</div><div class="bn1-self-small-resource pap bn1-tooltiped" data-bn1tooltip="Бронепластины самолетов, всего: ' + formatter.numFormat(player.getStaticResource('plane_armored_plates')) + '">' + formatter.num2str(player.getStaticResource('plane_armored_plates')) + '</div><div class="bn1-self-small-resource sp3 bn1-tooltiped" data-bn1tooltip="Деталь №4, всего: ' + formatter.numFormat(player.getStaticResource('sp_3')) + '">' + formatter.num2str(player.getStaticResource('sp_3')) + '</div><div class="bn1-self-small-resource sp4 bn1-tooltiped" data-bn1tooltip="Деталь №5, всего: ' + formatter.numFormat(player.getStaticResource('sp_4')) + '">' + formatter.num2str(player.getStaticResource('sp_4')) + '</div><div class="bn1-self-small-resource sp5 bn1-tooltiped" data-bn1tooltip="Деталь №6, всего: ' + formatter.numFormat(player.getStaticResource('sp_5')) + '">' + formatter.num2str(player.getStaticResource('sp_5')) + '</div><div class="bn1-self-small-resource sp6 bn1-tooltiped" data-bn1tooltip="Деталь №7, всего: ' + formatter.numFormat(player.getStaticResource('sp_6')) + '">' + formatter.num2str(player.getStaticResource('sp_6')) + '</div><div class="bn1-self-small-resource sp7 bn1-tooltiped" data-bn1tooltip="Деталь №8, всего: ' + formatter.numFormat(player.getStaticResource('sp_7')) + '">' + formatter.num2str(player.getStaticResource('sp_7')) + '</div><div class="bn1-self-small-resource sp8 bn1-tooltiped" data-bn1tooltip="Деталь №9, всего: ' + formatter.numFormat(player.getStaticResource('sp_8')) + '">' + formatter.num2str(player.getStaticResource('sp_8')) + '</div><div class="bn1-self-small-resource atap bn1-tooltiped" data-bn1tooltip="Улучшенные бронепластины танков, всего: ' + formatter.numFormat(player.getStaticResource('advanced_tank_armored_plates')) + '">' + formatter.num2str(player.getStaticResource('advanced_tank_armored_plates')) + '</div><div class="bn1-self-small-resource aaap bn1-tooltiped" data-bn1tooltip="Улучшенные бронепластины артиллерии, всего: ' + formatter.numFormat(player.getStaticResource('advanced_artillery_armored_plates')) + '">' + formatter.num2str(player.getStaticResource('advanced_artillery_armored_plates')) + '</div><div class="bn1-self-small-resource apap bn1-tooltiped" data-bn1tooltip="Улучшенные бронепластины самолетов, всего: ' + formatter.numFormat(player.getStaticResource('advanced_plane_armored_plates')) + '">' + formatter.num2str(player.getStaticResource('advanced_plane_armored_plates')) + '</div></div>';
        html += '</div>';

        html += '</div>';

        // Calc tab
        html += '<div class="bn1-calc-box">';
        
        for (var k = 3; k < 10; k++) {
            html += '<div class="bn1-calc-line">';
            html += '<div class="bn1-calc-small-icon wpn' + k + '"></div>';
            html += '<input type="number" class="bn1-calc-cnt" value="' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_' + k)) + '">';
            html += '<div class="bn1-calc-res-wpn">' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_' + k)) + '</div>';
            html += '</div>';
        }
        
        html += '</div>';
        
        // This is a guild tab
        html += '<div class="bn1-guild-box">';
        html += '<div class="bn1-self-guild-spoiiler"><div class="bn1-self-guild-spoiiler-name">Информация о роте</div><div class="bn1-self-guild-spoiiler-content bn1-opened" id="guildInfo"></div></div>';
        html += '<div class="bn1-self-guild-spoiiler"><div class="bn1-self-guild-spoiiler-name">Опыт роты</div><div class="bn1-self-guild-spoiiler-content" id="guildExp"></div></div>';
        html += '<div class="bn1-self-guild-spoiiler"><div class="bn1-self-guild-spoiiler-name">Участники роты</div><div class="bn1-self-guild-spoiiler-content" id="guildUsers"></div></div>';
        html += '<div class="bn1-self-guild-spoiiler"><div class="bn1-self-guild-spoiiler-name">Директивы роты</div><div class="bn1-self-guild-spoiiler-content" id="guildQuests"></div></div>';
        html += '<div class="bn1-self-guild-spoiiler"><div class="bn1-self-guild-spoiiler-name">Влияние роты</div><div class="bn1-self-guild-spoiiler-content" id="guildInfluence"></div></div>';
        html += '<div class="bn1-self-guild-spoiiler"><div class="bn1-self-guild-spoiiler-name">Журнал роты</div><div class="bn1-self-guild-spoiiler-content" id="guildLog"></div></div>';
        html += '<div class="bn1-self-guild-spoiiler"><div class="bn1-self-guild-spoiiler-name">Калькулятор роты</div><div class="bn1-self-guild-spoiiler-content" id="guildCalc"></div></div>';
        html += '</div>';

        // This is a useful tab
        html += '<div class="bn1-useful-box">';
        html += '<div class="bn1-useful-block-line">';
        html += '<div class="profile_info_block clear_fix"><div class="profile_info_header_wrap"><span class="profile_info_header">Личные данные</span></div><div class="profile_info"><div class="clear_fix profile_info_row"><div class="label fl_l bn1-label">Авторизация:</div><div class="labeled"><input type="text" id="bn1-selfID" class="bn1-input" value="' + app.getSelfID() + '"><input type="text" id="bn1-selfKey" class="bn1-input" style="width:180px;" value="' + app.getAuthKey() + '"></div></div></div></div>';
        html += '<div class="profile_info_block clear_fix">';
        html += '<div class="profile_info_header_wrap">';
        html += '<span class="profile_info_header">Небольшие мелочи</span>';
        html += '</div>';
        html += '<div class="profile_info">';
        html += '<div class="clear_fix profile_info_row">';
        html += '<div class="label fl_l bn1-label">Шифровки [' + formatter.numFormat(player.getStaticResource('booster_points')) + ']:</div>';
        html += '<div class="labeled">';
        html += '<input type="text" id="bn1-boxes-cnt" class="bn1-input" value="1">';
        html += '<button class="flat_button bn1-open-boxes">Открыть</button>';
        html += '</div>';
        html += '</div>';
        html += '<div class="clear_fix profile_info_row">';
        html += '<div class="label fl_l bn1-label">Порох [' + formatter.numFormat(player.getLimitedResource('gunpowder')) + ']:</div>';
        html += '<div class="labeled">';
        html += '<input type="text" id="bn1-gboxes-cnt" class="bn1-input" value="1">';
        html += '<select id="bn1-gboxes-type" class="bn1-select-box"><option value="1">За 750</option><option value="2">За 3000</option><option value="3">За 15000</option></select>';
        html += '<button class="flat_button bn1-open-gboxes">Открыть</button>';
        html += '</div>';
        html += '</div>';
        html += '<div class="clear_fix profile_info_row">';
        html += '<div class="label fl_l bn1-label">Гильзы [' + formatter.numFormat(player.getLimitedResource('shells')) + ']:</div>';
        html += '<div class="labeled">';
        html += '<input type="text" id="bn1-sboxes-cnt" class="bn1-input" value="1">';
        html += '<button class="flat_button bn1-open-sboxes">Открыть</button>';
        html += '</div>';
        html += '</div>';
        html += '<div class="clear_fix profile_info_row">';
        html += '<div class="label fl_l bn1-label">Гонки [' + formatter.numFormat(player.getStaticResource('makhorka')) + ']:</div>';
        html += '<div class="labeled">';
        html += '<input type="text" id="bn1-race-id" class="bn1-input" value="-1">';
        html += '<input type="text" id="bn1-race-cnt" class="bn1-input" value="1">';
        html += '<button class="flat_button bn1-race">Поехали!</button>';
        html += '</div>';
        html += '</div>';
        html += '<div class="clear_fix profile_info_row">';
        html += '<div class="label fl_l bn1-label">Фризтайм:</div>';
        html += '<div class="labeled">';
        html += '<button class="flat_button bn1-stopper">Применить</button>';
        html += '<div style="display: inline-block;margin: 6px 11px;">' + (player.isActiveFreezeTime() ? 'Уже активен' : 'Не активен') + '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="profile_info_block clear_fix">';
        html += '<div class="profile_info_header_wrap">';
        html += '<span class="profile_info_header">Боссы</span>';
        html += '</div>';
        html += '<div class="profile_info">';
        
        html += '<div class="clear_fix profile_info_row">';
        html += '<div class="label fl_l bn1-label">Напасть [' + player.getBossLimit() + '/' + player.getBossLimitMax() + ']:</div>';
        html += '<div class="labeled">';
        html += '<select id="bn1-boss-id" class="bn1-select-box" style="max-width:100px;"><option value="0">Ганс</option><option value="1">Клаус</option><option value="2">Вальтер</option><option value="3">Роммель</option><option value="4">Гудериан</option><option value="5">Фердинанд</option><option value="6">Карл</option><option value="7">Фридрих</option><option value="8">Кребс</option><option value="9">Борман</option><option value="10">Гюнтер</option><option value="11">Геринг</option><option value="12">Манштейн</option><option value="13">Кейтель</option><option value="14">Геббельс</option><option value="15">Гиммлер</option><option value="16">Вильгельм</option><option value="17">Теодор</option><option value="18">Бенедикт</option><option value="19">Хельга</option><option value="20">Ямато</option><option value="21">Эрих</option><option value="22">Хельмут</option><option value="23">Рутгер</option><option value="24">Пауль</option><option value="25">Ламберт</option><option value="26">Левиафан</option><option value="27">Эберхард</option><option value="28">Фон Браун</option><option value="29">Новотны</option><option value="30">Николаус</option><option value="31">Уго</option><option value="32">Бенито</option><option value="-12">Кристоф</option><option value="-11">Юрген</option><option value="-10">Густав</option><option value="-9">Альфред</option><option value="-8">Рафаэль</option><option value="-7">Альберт</option><option value="-6">Вольфганг</option><option value="-5">Отто</option><option value="-4">Герберт</option><option value="-3">Рудольф</option><option value="-2">Феликс</option><option value="-1">Генрих</option></select>';
        html += '<select id="bn1-boss-mode" class="bn1-select-box" style="max-width:100px;"><option value="0_0">Обычный</option><option value="1">Героический</option><option value="0_1">С ослабой</option><option value="4">Ротный</option></select>';
        html += '<button class="flat_button bn1-start-boss" data-boss="' + boss.id + '" data-hp="' + boss.hp + '">Ок</button>';
        html += '</div>';
        
        html += '</div>';
        
        
        html += '<div class="clear_fix profile_info_row">';
        html += '<div class="label fl_l bn1-label">Ударить:</div>';
        html += '<div class="labeled">';
        html += '<select id="bn1-boss-weapon" class="bn1-select-box" style="max-width:100px;"><option value="0">Беглый [---]</option><option value="1">Кинжал [---]</option><option value="2">Масса [---]</option><option value="3">Трассер [' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_3')) + ' шт]</option><option value="4">Осколок [' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_4')) + ' шт]</option><option value="5">Разрывной [' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_5')) + ' шт]</option><option value="6">Зажигалка [' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_6')) + ' шт]</option><option value="7">Фугас [' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_7')) + ' шт]</option><option value="8">Броник [' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_8')) + ' шт]</option><option value="9">Кумуль [' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_9')) + ' шт]</option></select>';
        html += '<input type="text" id="bn1-hit-cnt" class="bn1-input" value="1">';
        html += '<button class="flat_button bn1-hit-boss">Ок</button>';
        html += '</div>';
        html += '</div>';
        html += '<div class="clear_fix profile_info_row">';
        html += '<div class="label fl_l bn1-label">Купить [' + formatter.numFormat(player.getStaticResource('spirit')) + ']:</div>';
        html += '<div class="labeled">';
        html += '<select id="bn1-boss-weapon-buy" class="bn1-select-box" style="max-width:100px;"><option value="3">Трассер [' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_3')) + ' шт]</option><option value="4">Осколок [' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_4')) + ' шт]</option><option value="5">Разрывной [' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_5')) + ' шт]</option><option value="6">Зажигалка [' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_6')) + ' шт]</option><option value="7">Фугас [' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_7')) + ' шт]</option><option value="8">Броник [' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_8')) + ' шт]</option><option value="9">Кумуль [' + formatter.numFormat(player.getStaticResource('boss_splash_weapon_9')) + ' шт]</option></select>';
        html += '<input type="text" id="bn1-buy-cnt" class="bn1-input" value="1">';
        html += '<button class="flat_button bn1-buy-boss">Ок</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="profile_info_block clear_fix">';
        html += '<div class="profile_info_header_wrap">';
        html += '<span class="profile_info_header">Роты</span>';
        html += '</div>';
        html += '<div class="profile_info">';
        html += '<div class="clear_fix profile_info_row">';
        html += '<div class="label fl_l bn1-label">Пригласить:</div>';
        html += '<div class="labeled">';
        html += '<input type="text" id="bn1-giuids" class="bn1-input" placeholder="349401911,1,2" style="width:191px;">';
        html += '<button class="flat_button bn1-invite" data-gid="' + (player.isUserHasGuild() ? player.getUserGuildID(): false) + '">Ок</button>';
        html += '</div>';
        html += '</div>';
        
        html += '</div>';

        $(".page_top").after(html);

        if (app.getID() && (is_undefined(app.headers[app.getID()]) || app.headers[app.getID()] === false)) {
            app.headers[app.getID()] = true;
            app.checkHeaders(app.getID());
        }
        
        app.selfTabs();
        app.bindSelfButtons();

        if (player.isUserHasGuild()) {
            setTimeout(function() {
                app.loadGuildData(player.getUserGuildID(), player);
            }, 800);
        } else {
            $(".bn1-guild-box").html('<div style="margin-top:20px;width:100%;text-align:center;font-weight:700;">Не в роте</div>');
        }
    };

    this.guildInvite = function(uids, b) {
        var id = uids.shift();
        
        $("#bn1-giuids").val(uids.join(','));
        
        if (id.length) {
            app.getRequest().changeGuild('request_invite', '{"user_id":"' + id + '"}', function(r) {
                if (r.status === 200) {
                    var res = JSON.parse(r.responseText);
                    app.selfAlert( (res.result === 'ok' ? 'Успешно пригласили: id' + id : 'Ошибка приглашения: id' + id + '. Возможно у Вас нет прав на это...') );
                } else {
                    app.selfAlert('Ошибка сервера: ' + r.status);
                    b.push(id);
                }
                
                uids = $("#bn1-giuids").val().split(',');
                
                if (uids.length) {
                    setTimeout(function() {
                        app.guildInvite(uids, b);
                    }, 1010);
                } else if (b.length) {
                    $("#bn1-giuids").val(b.join(','));
                }
            });
        }
    };
    
    this.bindSelfButtons = function() {
        $(".bn1-invite").click(function() {
            var g = $(this).data('gid');
            if (g !== false) {
                var uids = $("#bn1-giuids").val().split(',');
                
                if (uids.length) {
                    app.guildInvite(uids, []);
                }
            } else {
                app.selfAlert('Вы не в роте');
            }
        });
        
        $(".bn1-hit-boss").click(function() {
            var c = parseInt($("#bn1-hit-cnt").val(), 10), wid = $("#bn1-boss-weapon").val(), wname = $("#bn1-boss-weapon option:selected").text(), reqs = [], p;
            
            while(c > 0) {
                if (c >= 100) {
                    p = 2;
                    c -= 100;
                } else if (c >= 10) {
                    p = 1;
                    c -= 10;
                } else if (c >= 1) {
                    p = 0;
                    c--;
                }
                
                reqs.push('{"params":{"power":"' + p + '","weapon":"' + wid + '"},"request":"hit_boss"}');
            }

            app.getRequest().package(reqs, function(r) {
                app.packageHandle(r, 'Ударить по боссу. ОК', 'Ошибка удара по боссу. Точно снарядов хватает?', 'Ошибка сервера: ' + r.status);
            });
        });
        $(".bn1-start-boss").click(function() {
            var g = $(this).data();
            
            if (g.boss === false && g.hp <= 0) {
                var bid = $("#bn1-boss-id").val(), bname = $("#bn1-boss-id option:selected").text(), bmode = $("#bn1-boss-mode").val();
                app.getRequest().package(['{"params":{"mode":"' + bmode + '","boss":"' + bid + '"},"request":"start_boss"}'], function(r) {
                    app.packageHandle(r, 'Успешно напали на босса: ' + bname, 'Ошибка старта босса. Точно босс доступен, и нет лимита?', 'Ошибка сервера: ' + r.status)
                });
            } else {
                app.selfAlert('Все еще стоит босс... ХП: ' + g.hp);
            }
        });
        $(".bn1-buy-boss").click(function() {
            var cnts = [1, 3, 5, 10, 20, 50, 100, 500]; // 7(254), 6(154), 6(54), 5(4), 1(1), 0
            var costs = [1, 2, 6, 1, 2, 3, 4, 5, 18, 36];
            var cnt = parseInt($("#bn1-buy-cnt").val(), 10);
            var wpn = $("#bn1-boss-weapon-buy :selected").val();
            var reqs = [];
            
            if (confirm("Вы уверены что хотите потратить " + (cnt * costs[wpn]))) {
                for (var j = 8; j >= 0;) {
                    if (cnt >= cnts[j]) {
                        cnt -= cnts[j];
                        reqs.push('{"request":"action","params":{"action":"buy_boss_splash_weapon_' + wpn + '_' + j + '"}}');
                    } else {
                        j--;
                    }
                }
                
                app.getRequest().package(reqs, function(r) {
                    app.packageHandle(r, 'Успешно купили снаряды!', 'Ошибка покупки снарядов. Точно хватает жетонов?', 'Ошибка сервера: ' + r.status);
                });
            }
        });
        $(".bn1-self-info-boss-kill").click(function() {
            var g = $(this).data();
            
            if (g.boss !== false && g.hp > 0) {
                if (confirm("Вы уверен что хотите потратить ресурсы на слив???")) {
                    app.getRequest().package(['{"params":{},"request":"exit_boss"}'], function(r) {
                        app.packageHandle(r, 'Успешно слили босса за ресурсы!', 'Ошибка слива босса. Точно ресурсов для слива хватает?', 'Ошибка сервера: ' + r.status);
                    });
                }
            } else if (g.boss !== false && g.hp <= 0) {
                var reqs = [];
                
                if (g.dead == '0') reqs.push('{"params":{"boss":"'+g.boss+'"},"request":"kill_boss"}');
                if (g.lose == '1') reqs.push('{"params":{"boss":"'+g.boss+'"},"request":"lose_boss"}');
                reqs.push('{"params":{"boss":"'+g.boss+'"},"request":"finish_boss"}');
                
                app.getRequest().package(reqs, function(r) {
                    app.packageHandle(r, 'Успешно завершили бой с боссом!', 'Ошибка слива босса. Точно босс стоит?', 'Ошибка сервера: ' + r.status);
                });
            } else {
                app.selfAlert('Ало, и так нет босса, кого сливать? Воду в унитазе штоли?');
            }
        });
        $(".bn1-open-boxes").click(function() {
            var reqs = [], count = parseInt($("#bn1-boxes-cnt").val(), 10);

            if (count <= 500 && count >= 1) {
                for (var k = 0; k < count; k++) reqs.push('{"params":{"action":"buy_uniform"},"request":"action"}');
                app.getRequest().package(reqs, function(r) {
                    app.packageHandle(r, 'Успешно вскрыли посылки, в кол-ве: ' + count + ' шт [-' + (count * 15) + ']', 'Ошибка вскрытия ящиков. Точно шифровок хватает?', 'Ошибка сервера: ' + r.status);
                });
            } else {
                app.selfAlert('Некорректное число...');
            }
        });
        $(".bn1-open-sboxes").click(function() {
            var reqs = [], count = parseInt($("#bn1-sboxes-cnt").val(), 10);

            if (count <= 500 && count >= 1) {
                for (var k = 0; k < count; k++) reqs.push('{"request":"shells_box_open","params":{"shells_box":"0"}}');
                app.getRequest().package(reqs, function(r) {
                    app.packageHandle(r, 'Успешно вскрыли посылки, в кол-ве: ' + count + ' шт [-' + (count * 200) + ' гильз]', 'Ошибка вскрытия ящиков. Может и гильзы закончились...', 'Ошибка сервера: ' + r.status);
                });
            } else {
                app.selfAlert('Некорректное число...');
            }
        });
        $(".bn1-open-gboxes").click(function() {
            var reqs = [], count = parseInt($("#bn1-gboxes-cnt").val(), 10), t = parseInt($("#bn1-gboxes-type").val(), 10), _t = [0,750,3000,15000];

            if (count <= 500 && count >= 1) {
                for (var k = 0; k < count; k++) reqs.push('{"request":"shells_box_open","params":{"shells_box":"' + t + '"}}');
                app.getRequest().package(reqs, function(r) {
                    app.packageHandle(r, 'Успешно вскрыли посылки, в кол-ве: ' + count + ' шт [-' + (count * _t[t]) + ' пороха]', 'Ошибка вскрытия ящиков. Возможно порох кончился...', 'Ошибка сервера: ' + r.status);
                });
            } else {
                app.selfAlert('Некорректное число...');
            }
        });
        $(".bn1-stopper").click(function() {
            app.getRequest().package(['{"params":{"route":"50"},"request":"move_in_town"}'], function(r) {
                app.packageHandle(r, 'Успешно установили фризтайм!', 'Ошибка установки фризтайма', 'Ошибка сервера: ' + r.status);
            });
        });
        $(".bn1-race").click(app.race);
    };

    this.getQuest = function(qid) {
        GM.log("Event for start quest: " + qid);
    };
    
    this.race = function() {
        var user = $("#bn1-race-id").val();
        var count = parseInt($("#bn1-race-cnt").val(), 10);

        if (count > 0) {

            app.getRequest().compare(user, function(r) {
                if (r.status === 200) {
                    var res = JSON.parse(r.responseText);

                    if (res.compare_error === false) {
                        app.selfAlert((res.win ? 'Победа!' : 'Поражение...'));
                    } else {
                        app.selfAlert('Ошибка гонок');
                    }
                } else {
                    app.selfAlert('Ошибка сервера');
                }
            });

            --count;
            $("#bn1-race-cnt").val(count);

            setTimeout(app.race, 1010);
        }
    };

    this.packageHandle = function(r, successText, errorText, errorHttpText) {
        if (r.status === 200) {
            var res = JSON.parse(r.responseText);

            if (res.result === 'ok') {
                app.selfAlert(successText || 'Ok');
            } else {
                app.selfAlert(errorText || 'Error');
            }
        } else {
            app.selfAlert(errorHttpText || r.status);
        }
    };
    
    this.selfAlert = function(description) {
        GM.notification({
            text: description,
            title: "Скрипт.bn1",
            silent: true,
            timeout: 2500
        }, () => {});
    };

    this.loadGuildData = function(guildID, player = null) {
        $("#guildInfo").html('<div style="width: 100%; margin: 15px 0;font-weight:700;text-align:center;">ПЫТАЮСЬ ЗАГРУЗИТЬ ИНФУ О РОТЕ ' + app.gerror + '/7</div>');
        app.getRequest().getGuilds(guildID, function(response) {
            if (response.status === 200 && response.responseText.indexOf('error') === -1) {
                var guild = new Guild(JSON.parse(response.responseText), guildID);

                let formatter = new Formatter();
                var h = '';
                var counterJoins = {};
                var forVK = [];

                var gInfo = guild.getFullInfo();

                if (!is_undefined(gInfo['exp'])) {
                    h = '<div class="bn1-guild-info-info">' + (gInfo['names']['title'] || '...') + '</div>';

                    h += '<div><div><b>Описание:</b> ' + (gInfo['names']['guild_info'] || '...') + '</div><div><b>Сообщение:</b> ' + (gInfo['names']['guild_message'] || '...') + '</div><div><b>Опыт:</b> ' + formatter.numFormat(gInfo['exp']['self']) + '</div><div><b>Уровень:</b> ' + gInfo['exp']['level'] + '</div><div><b>Дата основания:</b> ' + formatter.ts2date(guildID.split('_')[1]) + '</div><div><b>Лимит на входы:</b> ' + (gInfo['limits']['guild_joins'] || '0') + '</div><div><b>Знаков:</b> ' + (gInfo['limits']['quests_badges'] || '0') + '</div></div>';

                    $("#guildInfo").html(h);

                    h = '';

                    for (var uid in gInfo['exp']['users']) {
                        if (gInfo['exp']['users'].hasOwnProperty(uid)) {
                            var userData = gInfo['exp']['users'][uid];
                            h += '<div class="bn1-guild-user-line"><div><b>Участник:</b> <a href="https://vk.com/id' + uid + '" class="bn1-cell-' + uid + '">id' + uid + '</a></div><div><b>Опыта за сегодня:</b> ' + (userData['last_update_time'] ? formatter.numFormat(userData['exp_today']) : 0) + '</div><div><b>Всего опыта:</b> ' + formatter.numFormat(userData['all']) + '</div><div><b>Последнее обновление:</b> ' + (userData['last_update_time'] ? formatter.ts2date(userData['last_update_time']) : 'не сегодня') + '</div></div>';
                        }
                    }

                    $("#guildExp").html(h);
                }
                
                if (!is_undefined(gInfo['damage']) && player !== null) {
                    var n = ["Артиллерия", "Торпеды", "Ракеты"], f = 0, c = 0;
                    h = '<table class="bn1-gcalc">';
                    h += '<tr><th>Снаряд</th><th>Количество</th><th>Урон</th></tr>';
                    
                    for (var k = 0; k < 3; k++) {
                        f += (gInfo['damage']['ssw_' + k + '_bst'] * player.getStaticResource('guild_ship_splash_weapon_' + k));
                        c += player.getStaticResource('guild_ship_splash_weapon_' + k);
                        h += '<tr><td>' + n[k] + ':</td><td>' + formatter.numFormat(player.getStaticResource('guild_ship_splash_weapon_' + k)) + '</td><td>' + formatter.numFormat((gInfo['damage']['ssw_' + k + '_bst'] * player.getStaticResource('guild_ship_splash_weapon_' + k))) + '</td></tr>';
                    }
                    
                    h += '<tr><th>Всего:</th><td>' + formatter.numFormat(c) + '</td><td>' + formatter.numFormat(f) + '</td></tr>';
                    h += '</table>';
                    
                    $("#guildCalc").html(h);
                }

                if (!is_undefined(gInfo['users'])) {
                    h = '', u = 0;

                    for (var uid in gInfo['users']) {
                        if (gInfo['users'].hasOwnProperty(uid)) {

                            if (forVK.indexOf(uid) === -1) {
                                forVK.push(uid);
                            }
                            ++u;

                            h += '<div class="bn1-flexed-line"><div id="bn1-30"><a href="https://vk.com/id' + uid + '" class="bn1-cell-' + uid + '">id' + uid + '</a></div><div id="bn1-30-centered">' + (gInfo['ranks']['ranks'][gInfo['users'][uid]['rank']] || '...') + '</div><div id="bn1-30-centered">' + formatter.ts2date(gInfo['users'][uid]['date']) + '</div></div>';
                        }
                    }

                    $(".bn1-guild-info-info").html($(".bn1-guild-info-info").html() + '[' + u + ' чел]');
                    $("#guildUsers").html(h);
                }

                if (!is_undefined(gInfo['log'])) {
                    h = '';
                    var log_t = '';

                    for (var line of gInfo['log']) {
                        switch (line['type']) {
                            case 'experience_decrease':
                                log_t = 'Списание опыта: ' + formatter.numFormat(line['target']);
                                break;

                            case 'leave':
                                if (forVK.indexOf(line['target']) === -1) {
                                    forVK.push(line['target']);
                                }

                                log_t = 'Роту покинул(а): <a href="https://vk.com/id' + line['target'] + '" class="bn1-cell-' + line['target'] + '">id' + line['target'] + '</a>';
                                break;

                            case 'make_leader':
                                if (forVK.indexOf(line['target']) === -1) {
                                    forVK.push(line['target']);
                                }

                                if (forVK.indexOf(line['to']) === -1) {
                                    forVK.push(line['to']);
                                }

                                log_t = 'Передача роты к: <a href="https://vk.com/id' + line['to'] + '" class="bn1-cell-' + line['to'] + '">id' + line['to'] + '</a> админом: <a href="https://vk.com/id' + line['target'] + '" class="bn1-cell-' + line['target'] + '">id' + line['target'] + '</a>';
                                break;

                            case 'kick':
                                if (forVK.indexOf(line['target']) === -1) {
                                    forVK.push(line['target']);
                                }

                                if (forVK.indexOf(line['to']) === -1) {
                                    forVK.push(line['to']);
                                }

                                log_t = 'Кикнут(а) из роты: <a href="https://vk.com/id' + line['to'] + '" class="bn1-cell-' + line['to'] + '">id' + line['to'] + '</a> админом: <a href="https://vk.com/id' + line['target'] + '" class="bn1-cell-' + line['target'] + '">id' + line['target'] + '</a>';
                                break;

                            case 'change_rank':
                                if (forVK.indexOf(line['target']) === -1) {
                                    forVK.push(line['target']);
                                }

                                if (forVK.indexOf(line['to']) === -1) {
                                    forVK.push(line['to']);
                                }

                                log_t = 'Смена ранга у: <a href="https://vk.com/id' + line['to'] + '" class="bn1-cell-' + line['to'] + '">id' + line['to'] + '</a> админом: <a href="https://vk.com/id' + line['target'] + '" class="bn1-cell-' + line['target'] + '">id' + line['target'] + '</a> на «' + (gInfo['ranks']['ranks'][line['undef']] || 'undef') + '»';
                                break;

                            case 'join':
                                if (forVK.indexOf(line['target']) === -1) {
                                    forVK.push(line['target']);
                                }

                                if (forVK.indexOf(line['to']) === -1) {
                                    forVK.push(line['to']);
                                }

                                log_t = 'В роту принят(а): <a href="https://vk.com/id' + line['to'] + '" class="bn1-cell-' + line['to'] + '">id' + line['to'] + '</a> админом: <a href="https://vk.com/id' + line['target'] + '" class="bn1-cell-' + line['target'] + '">id' + line['target'] + '</a>';
                                break;

                            default:
                                log_t = JSON.stringify(line);
                                break;
                        }
                        h += '<div>[' + formatter.ts2date(line['date']) + '] ' + log_t + '</div>';
                    }

                    $("#guildLog").html(h);
                }

                if (!is_undefined(gInfo['quests'])) {
                    h = '<select id="bn1qf" style="margin: 8px auto;width: 250px;padding: 4px; cursor: pointer; border-radius:3px;"></select>';

                    for (var quest of gInfo['quests']) {

                        if (forVK.indexOf(quest['uid']) === -1) {
                            forVK.push(quest['uid']);
                        }

                        var statusText = (quest['status'] === 5 ? 'Свободно' : quest['status'] === 3 ? 'Сдал(а)' : quest['status'] === 2 ? 'Не сдал(а)' : quest['status'] === 4 ? 'Провалил(а)' : quest['status'] === 1 ? 'Выполняется, еще: ' + formatter.asDurationTime(quest['time'] + 259200) : 'хз');
                        var badgesCnt = (quest['status'] === 4 ? '-' : '+') + quest['badges'];

                        var q = (parseInt(quest['questID'], 10) < 10 ? '0' + quest['questID'] : quest['questID']);
                        h += '<div class="bn1-quest-line bn1-qfilter-' + quest['uid'] + '"><div><b>Директива:</b> ' + (strings_ru["guild_quests_description_" + q] || 'quest_id' + q) + '</div><div><b>Выполняет:</b> <a href="https://vk.com/id' + quest['uid'] + '" class="bn1-cell-' + quest['uid'] + '">id' + quest['uid'] + '</a></div><div><b>Прирост знаков:</b> ' + badgesCnt + '</div><div><b>Статус:</b> ' + statusText + '</div>';
                        if (quest['status'] === 5) h += '<div class="bn1-sq" data-qid="' + quest['questID'] + '"><b><u>Взять диру</u></b></div>';
                        h += '</div>';
                    }
                    
                    $(".bn1-sq").click(function() {
                        app.getQuest($(this).data('qid'));
                    });

                    $("#guildQuests").html(h);
                }

                if (!is_undefined(gInfo['users'])) {
                    h = '<option value="all">Все</option>';

                    for (var uid in gInfo['users']) {
                        h += '<option class="bn1-cell-' + uid + '" value="' + uid + '">id' + uid + '</option>';
                    }

                    $("#bn1qf").html(h);

                    $("#bn1qf").change(function() {
                        var needId = $(this).val();

                        $("#bn1qf").nextAll().each(function() {
                            $(this).css('display', (needId == 'all' || $(this).hasClass('bn1-qfilter-' + needId) ? 'block' : 'none'));
                        });
                    });
                }
                if (!is_undefined(gInfo['influence'])) {
                    h = '<div class="bn1-flexed-line" style="padding-bottom: 6px;">';
                    var nt = {
                            0: 'Киев',
                            1: 'Одесса',
                            2: 'Москва',
                            3: 'Воронеж',
                            4: 'Тамань',
                            5: 'Сталинград',
                            'guilds': 'Передовая'
                        },
                        x = 1;

                    for (var user in gInfo['influence']) {
                        if (gInfo['influence'].hasOwnProperty(user)) {
                            if (forVK.indexOf(user) === -1) {
                                forVK.push(user);
                            }

                            if (x > 3) {
                                h += '</div><div class="bn1-flexed-line">';
                                x = 1;
                            }

                            h += '<div style="width: 155px;"><div class="bn1-guild-influence-user"><a href="https://vk.com/id' + user + '" class="bn1-cell-' + user + '">id' + user + '</a></div><div>';

                            for (var k in nt) {
                                if (nt.hasOwnProperty(k)) h += '<div><b>' + nt[k] + '</b>: ' + formatter.numFormat((gInfo['influence'][user][k] || 0)) + '</div>';
                            }

                            h += '</div></div>';
                            ++x;
                        }
                    }
                    
                    $("#guildInfluence").html(h);

                    app.getRequest().usersGet(forVK, (res) => {
                        app.reqHandle(res, (r) => {
                            var names = JSON.parse(r);
                            names = names.response;

                            for (var i in names) {
                                if (names.hasOwnProperty(i)) {
                                    $(".bn1-cell-" + names[i]['id']).each(function() {
                                        $(this).html('<a href="https://vk.com/id' + names[i]['id'] + '">' + names[i]['first_name'] + ' ' + names[i]['last_name'] + '</a>');
                                    });
                                }
                            }
                        });
                    });
                }
            } else {
                ++app.gerror;
                if (app.gerror < 7) {
                    setTimeout(function() {
                        app.loadGuildData(guildID);
                    }, 1500);
                }
            }
        });
    };

    this.loadSmallBlockByID = function(id) {
        app.getRequest().socialGet(id, function(response) {
            app.reqHandle(response, (response) => {
                let data = null;
                response = JSON.parse(response);

                if (!is_undefined(response.error)) {
                    app.setSmallState(id, 'Игра вернула ошибку: ' + response.error);
                }

                if (response !== '[]' && response.length && is_undefined(response.error) && response[0][1].length) {
                    data = JSON.parse(response[0][1]);
                } else if ((!response.length || response === '[]') && is_undefined(response.error)) {
                    ++app.small[id]['empty'];
                }

                if (!is_null(data)) {
                    app.setSmallState(id, 'Щас щас щас...');
                    return app.showSmallDataByID(id, data);
                } else {
                    ++app.small[id]['error'];

                    app.setSmallState(id, 'Ошибка загрузки данных... Может игра умерла?');
                }

                if (app.small[id]['error'] < 7) {
                    setTimeout(function() {
                        app.loadSmallBlockByID(id);
                    }, 1500);

                    return app.setSmallState(id, 'Повтор запроса... ' + app.small[id]['error'] + '/7');
                }

                if (app.small[id]['empty'] >= 2) {
                    return app.setSmallState(id, 'Пользователь не играет');
                }
            });
        });
    };

    this.showSmallDataByID = function(id, data) {
        let player = this.getPlayerObj(data);
        let formatter = new Formatter();

        let damage = player.getDamageData();
        let exp = player.getExpData();
        let login = (!is_null(player.getLastLoginTime()) ? formatter.asDurationTime(player.getLastLoginTime()) + ' назад' : 'никогда');
        let division = player.getDivisionData();
        let bossLimit = player.countBossLimit();

        var html = '<div class="bn1-small-body">';
        html += '<div class="bn1-flexed-line"> <div class="offset-50per bn1-tooltiped bn1-logo" data-bn1tooltip="Бот №1 в окопе"></div><div class="bn1-small-logged-time bn1-tooltiped" data-bn1tooltip="До следующего уровня осталось: ' + formatter.numFormat(exp.left) + ' опыта">Уровень: ' + (player.getLevel() + 1) + ' (' + exp.percentage + '%)<br>' + (player.isUserHasGuild() ? 'Рота ' + (player.getUserGuildLevel() + 1) + ' ур' : 'Не в роте') + '<br>Вход: ' + login + ' </div> </div>';
        html += '<div class="bn1-flexed-line bn1-small-res1-line"> <div class="bn1-small-damage bn1-tooltiped" data-bn1tooltip="Общий урон<br>Дата получения достижения: ' + damage.count + '<br>' + damage.time + '">' + formatter.numFormat(damage.count) + ' [' + bossLimit.full + ']</div><div class="bn1-small-res1-cap">' + formatter.numFormat(player.getTalentsCount()) + '</div><div class="bn1-small-res1-cap">' + formatter.numFormat(player.getSrutAmount()) + '</div> </div>';
        html += '</div>';

        $("#oprofile_" + id).html(html);
    };

    this.toggleSelfTab = function(tab) {
        let sTabs = {
            "#bn1SelfInfoBox": ".bn1-self-body",
            "#bn1SelfGuildBox": ".bn1-guild-box",
            "#bn1SelfUsefulBox": ".bn1-useful-box",
            "#bn1SelfCalcBox": ".bn1-calc-box"
        };

        for (var _tab in sTabs) {
            if (sTabs.hasOwnProperty(_tab)) {
                if (_tab !== tab) {
                    $(_tab).removeClass('ui_tab_sel');
                    $(sTabs[_tab]).css({"display":"none"});
                } else {
                    $(_tab).addClass('ui_tab_sel');
                    $(sTabs[_tab]).css({"display":"block"});
                }
            }
        }
    };

    this.selfTabs = function() {
        $("#bn1SelfInfoBox").click(() => {
            app.toggleSelfTab("#bn1SelfInfoBox");
        });
        $("#bn1SelfGuildBox").click(() => {
            app.toggleSelfTab("#bn1SelfGuildBox");
        });
        $("#bn1SelfUsefulBox").click(() => {
            app.toggleSelfTab("#bn1SelfUsefulBox");
        });
        $("#bn1SelfCalcBox").click(() => {
            app.toggleSelfTab("#bn1SelfCalcBox");
        });

        $('.bn1-self-guild-spoiiler-name').click(function() {
            
            var e = $(this).parent().children('div.bn1-self-guild-spoiiler-content');
            if (e.hasClass('bn1-opened')) e.removeClass('bn1-opened');
            else e.addClass('bn1-opened');
            return false;
        });
    };

    this.toggleFriendTab = function(tab) {
        let sTabs = {
            "#bn1InfoBox": ".bn1-friend-body",
            "#bn1GuildBox": ".bn1-guild-box",
        };

        for (var _tab in sTabs) {
            if (sTabs.hasOwnProperty(_tab)) {
                if (_tab !== tab) {
                    $(_tab).removeClass('ui_tab_sel');
                    $(sTabs[_tab]).css({"display":"none"});
                } else {
                    $(_tab).addClass('ui_tab_sel');
                    $(sTabs[_tab]).css({"display":"block"});
                }
            }
        }
    };

    this.friendTabs = function() {
        $("#bn1InfoBox").click(() => {
            app.toggleFriendTab("#bn1InfoBox");
        });
        $("#bn1GuildBox").click(() => {
            app.toggleFriendTab("#bn1GuildBox");
        });

        $('.bn1-self-guild-spoiiler-name').click(function() {
            var e = $(this).parent().children('div.bn1-self-guild-spoiiler-content');
            if (e.hasClass('bn1-opened')) e.removeClass('bn1-opened');
            else e.addClass('bn1-opened');
            return false;
        });
    };

    this.checkHeaders = function(uid) {
        if (!is_undefined(headers[uid])) {
            var html = '<div class="bn1-header-block"><div class="bn1-header-name">' + headers[uid]['name'] + '</div><div class="bn1-header-desc">' + headers[uid]['description'] + '</div><div class="bn1-header-close">Закрыть</div></div>';
            if ($(".bn1-tabs").length) {
                $(".bn1-tabs").before(html);
            } else {
                $(".page_top").after(html);
            }
            
            $(".bn1-header-close").click(function(){
                $(".bn1-header-block").remove();
            });
        }
    };
}