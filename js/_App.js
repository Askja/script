function gzuncompress(gz){var a=[];for(var c=0; c < gz.length; c++){var d=gz.charCodeAt(c)&0xff;a.push(d)}return pako.inflate(a, {to: 'string'});}

function App() {
    this.parser=null;this.userID=null;this.selfID=null;this.completeInit=false;this.binding=false;this.loading=false;this.authKey=null;this.loadingKeys=null;this.request=null;this.secrets=null;this.signLoad=false;this.error=0;this.empty=0;this.small={};this.users={};

    this.getID=function(){return this.userID; };this.getSelfID=function(){return this.selfID; };this.getAuthKey=function(){return this.authKey; };this.setState=function(text){$(".bn1-loader").html(text) };this.onInitDone=function(){this.error=this.empty=0; if(this.getID()===this.getSelfID()){app.loadSelfData(); } else{app.loadDataByID(); } };this.reqHandle=function(response,callback){return(response.status!==200?alert(response.statusText):callback(response.responseText) ); };this.notEnoughData=function(){return(this.getAuthKey()===null||this.getSelfID()===null) };this.isObjectNotEmpty=function(obj){return((typeof data.error==="undefined"&&typeof data.completed_categorized_achievements!=="undefined")||(typeof data.error==="undefined"&&data!==null&&typeof data.time!=="undefined")); };this.getParser=function(){if(this.parser===null){this.parser=new Parser(); } return this.parser; };this.getSecrets=function(){if(this.secrets===null){this.secrets=new Secrets(this); } return this.secrets; };this.getRequest=function(){if(this.request===null){this.request=new Requests(); } return this.request; };this.bindTitles=function(){$(".bn1-tooltiped").each(function(){if($(this).data('bn1tooltip')!==undefined){$(this).mouseover(function(){showTooltip(this,{black: 1, shift: [0, 15, -40],text:$(this).data('bn1tooltip')});});}});};
    this.getPlayerObj=function(data){return new Player(data);};
	this.init=function(){let parser=this.getParser();let uid=parseInt(parser.getUserID());if(uid&&uid > 0&&this.userID!==uid){this.userID=uid;this.loading=false;}if(!this.completeInit){this.completeInit=true;}if(this.notEnoughData()&&!this.loadingKeys){this.loadingKeys=true;return this.getParser().getKeysByApp();}if(!this.notEnoughData()&&this.getID()&&!this.loading){this.loader();this.loading=true;return this.onInitDone();}if(this.getSelfID()&&this.getAuthKey()&&this.isOnListUsers()){return this.onListUsers();}app.bindTitles();return false;};
	this.isOnListUsers=function(){let sels=[".friends_field_title",".labeled",".pad_fr_name"];for(let sel of sels){if(!is_null($(sel+":not(.patched):has(a)").html())){return true;}}return false;};
	this.loader=function(){$(".page_top").after('<div class="bn1-loader">Загрузка...</div>');};
	
    this.loadDataByID = function () {
		app.setState("Получение информации о пользователе...");

        app.getRequest().socialGet(app.getID(), function (response) {
            app.reqHandle(response, (response) => {
				let data = null;
				response = JSON.parse(response);
				
				if (!is_undefined(response.error)) {
					app.setState('Игра вернула ошибку: ' + response.error);
				}
				
				if (response !== '[]' && response.length && is_undefined(response.error) && response[0][1].length) {
					data = JSON.parse(response[0][1]);
				} else if ((!response.length || response === '[]') && is_undefined(response.error)) {
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
				
				if (app.empty >= 4) {
				    return app.setState('Пользователь не играет');
                }
            });
        });
    };
	
	this.showDataByID = function (data) {
		$('.bn1-loader').remove();

        let player = this.getPlayerObj(data);
        let formatter = new Formatter();
		let decks = new sirenia(decksPack, deckEffects, player, talentsPack, statuses);

        let exp = player.getExpData();
        let division = player.getDivisionData();
        let bossLimit = player.countBossLimit();
        let damage = player.getDamageData();
		
		let srut = player.a_getSrut();
        
        let guild = (player.isUserHasGuild() ? 'Рота ' + (player.getUserGuildLevel() + 1) + ' ур' : 'Не в роте');
        let login = (!is_null(player.getLastLoginTime()) ? formatter.asDurationTime(player.getLastLoginTime()) + ' назад' : 'никогда');
        
        var html = '<div class="bn1-friend-body">';
        html += '<div class="bn1-flexed-line"> <div class="offset-50per" id="bn1-logo"></div><div class="bn1-friend-logged-time">Уровень: ' + (player.getLevel() + 1) + ' (' + exp.percentage + '%)<br>' + division.name + ' дивизион #' + (division.div + 1) + '<br>Вход: ' + login + '</div> </div>';
        html += '<div class="bn1-flexed-line bn1-friend-res1-line"> <div class="bn1-friend-damage">' + formatter.numFormat(damage.count) + ' [' + bossLimit.full + ']</div><div class="bn1-friend-res1-cap">' + formatter.numFormat(player.getTalentsCount()) + '</div><div class="bn1-friend-res1-cap">' + formatter.numFormat(player.getSrutAmount()) + '</div> </div>';
        html += '<div class="bn1-flexed-line bn1-friend-res-line2"> <div class="bn1-friend-res2-cap bn1-friend-res2-first-cap">' + formatter.numFormat(decks.getWeaponDamage(2)) + '</div><div class="bn1-friend-res2-cap">' + formatter.numFormat(decks.getWeaponDamage(3)) + '</div><div class="bn1-friend-res2-cap">' + formatter.numFormat(decks.getWeaponDamage(4)) + '</div><div class="bn1-friend-res2-cap">' + formatter.numFormat(decks.getWeaponDamage(5)) + '</div> </div>';
        html += '<div class="bn1-flexed-line bn1-friend-res-line3"> <div class="bn1-friend-res2-cap bn1-friend-res2-first-cap">' + formatter.numFormat(decks.getWeaponDamage(6)) + '</div><div class="bn1-friend-res2-cap">' + formatter.numFormat(decks.getWeaponDamage(7)) + '</div><div class="bn1-friend-res2-cap">' + formatter.numFormat(decks.getWeaponDamage(8)) + '</div><div class="bn1-friend-res2-cap">' + formatter.numFormat(decks.getWeaponDamage(9)) + '</div> </div>';
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
        
        $(".page_top").after(html);
        
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
                            alert('Успешно скинули помощи, в кол-ве: ' + count + ' шт');
                        } else {
                            alert('Ошибка отправки помощи... Ошибка от игры...');
                        }
                    } else {
                        alert('Ошибка отправки помощи... Че делаешь?');
                    }
                });
            } else {
                alert('Ты втираешь мне какую-то дичь!');
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
                            alert('Успешно скинули коллекцию/деталь');
                        } else {
                            alert('Ошибка отправки помощи... Игруля тупит');
                        }
                    } else {
                        alert('Ошибка отправки помощи... Че делаешь?');
                    }
                });
            } else {
                alert('Отправляю воздух адресату...');
            }
        });
    };
    
    this.getFromSelfPackItems = function(col, item, ter = -1, isGlobal = true) {
        if (isGlobal) {
            return (is_undefined(selfGameData['collections']) ? 0 : is_undefined(selfGameData['collections'][col]) ? 0 : !is_undefined(selfGameData['collections'][col][item]) ? selfGameData['collections'][col][item] : 0);
        }
        
        return 0;
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
                                    ret += '<option value="' + ter + '-' + bat + '-' + i + '">' + (terNames[ter] || 'ter_' + ter) + ' #' + (parseInt(bat, 10) + 1) + '-' + (parseInt(i, 10) + 1) + '</option>';
                                }
                            }
                        }
                    }
                }
            }
        } else {
            for (var col in wish) {
                if (wish.hasOwnProperty(col)) {
                    var itemsNums = range(0, (colData[col].items - 1));
                    itemsNums.sort();
                    for (var item in wish[col]) {
                        if (wish[col].hasOwnProperty(item)) {
                            var i = wish[col][item];
                            var n = itemsNums.indexOf(parseInt(i, 10));
                            ret += '<option value="' + col + '-' + i + '">' + (strings_ru[colData[col].name] || 'col_' + col) + ' #' + (n + 1) + ' [' + app.getFromSelfPackItems(col, i) + ' шт]</option>';
                        }
                    }
                }
            }
        }
        
        return ret;
    };
	
    this.loadSelfData = function () {
		app.setState("Получение информации...");
		
        app.getRequest().get(function (response) {
            app.reqHandle(response, (response) => {
				let data = null;
				
				try {
					response = gzuncompress(response);

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
				} catch (er) { ++app.error; if (app.error < 7) { setTimeout(app.loadSelfData, 1010); app.setState('Повтор запроса... ' + app.error + '/7'); } GM.log(er); }
            });
        });
    };
  
    this.showSelfData = function (data) {
		
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

        var html = '<ul class="ui_tabs clear_fix ui_tabs_with_progress" onmouseover="uiTabs.tryInit(this)" id="wall_tabs" data-inited="1"><li><a href="#" class="ui_tab ui_tab_sel" id="bn1SelfInfoBox">Информация</a></li><li><a href="#" class="ui_tab" id="bn1SelfGuildBox">Инфо о роте</a></li><li><a href="#" class="ui_tab" id="bn1SelfUsefulBox">Полезное</a></li></ul>';
        html += '<div class="bn1-self-body">';
        html += '<div class="bn1-flexed-line"> <div class="offset-50per bn1-tooltiped" data-bn1tooltip="Бот №1 в окопе"></div><div class="bn1-self-logged-time">Уровень: ' + (player.getLevel() + 1) + ' (' + exp.percentage + '%)<br>' + division.name + ' дивизион #' + (division.div + 1) + '<br>Вход: ' + login + ' </div></div>';
        html += '<div class="bn1-flexed-line bn1-self-res-line1"> <div class="bn1-self-res1-cap bn1-self-res1-first-cap">' + formatter.numFormat(player.getEnergy()) + '</div><div class="bn1-self-res1-cap">' + formatter.numFormat(player.getOccasionEnergy()) + '</div><div class="bn1-self-res1-cap">' + formatter.numFormat(player.getStaticResource('spirit')) + '</div><div class="bn1-self-res1-cap">' + formatter.numFormat(player.getStaticResource('tickets')) + '</div> </div>';
        html += '<div class="bn1-flexed-line bn1-self-res-line1"> <div class="bn1-self-res1-cap bn1-self-res1-first-cap">' + formatter.numFormat(player.getStaticResource('makhorka')) + '</div><div class="bn1-self-res1-cap">' + formatter.numFormat(player.getStaticResource('booster_points')) + '</div><div class="bn1-self-res1-cap">' + formatter.numFormat(player.getLimitedResource('shells')) + '</div><div class="bn1-self-res1-cap">' + formatter.numFormat(player.getLimitedResource('gunpowder')) + '</div> </div>';
        html += '<div class="bn1-flexed-line bn1-self-res-line1"> <div class="bn1-self-res1-damage">' + formatter.numFormat(damage.amount) + ' (' + player.getBossLimit() + '/' + player.getBossLimitMax() + ')</div><div class="bn1-self-res1-cap">' + formatter.numFormat(player.getSrutAmount()) + '</div><div class="bn1-self-res1-cap">' + formatter.numFormat(player.getTalentsCount()) + '</div> </div>';
        html += '<div class="bn1-flexed-line bn1-self-info-line">';
		html += '<div class="bn1-self-info-boss bn1-flexed-line"><div class="bn1-self-info-boss-ava"><div class="bn1-self-boss-ava-block boss_' + (boss.id !== false ? boss.id : 'undefined') + '"><div class="bn1-self-boss-ava"></div><div class="bn1-self-boss-name">' + boss.name + '</div></div></div><div class="bn1-self-info-boss-timeblock"><div class="bn1-self-info-boss-time">' + boss.time + '</div><div class="bn1-self-info-boss-hp">' + formatter.numFormat(boss.hp) + '</div></div></div>';
        html += '<div class="bn1-self-info-guild"><div class="bn1-self-info-guild-name">' + guild + '</div></div> </div>';
        html += '<div class="bn1-flexed-line bn1-self-res-line2"> <div class="bn1-self-res2-cap bn1-self-res2-first-cap">' + formatter.num2str(player.getStaticResource('boss_splash_weapon_3')) + '</div><div class="bn1-self-res2-cap">' + formatter.num2str(player.getStaticResource('boss_splash_weapon_4')) + '</div>';
        html += '<div class="bn1-self-res2-cap">' + formatter.num2str(player.getStaticResource('boss_splash_weapon_5')) + '</div><div class="bn1-self-res2-cap">' + formatter.num2str(player.getStaticResource('boss_splash_weapon_6')) + '</div><div class="bn1-self-res2-cap">' + formatter.num2str(player.getStaticResource('boss_splash_weapon_7')) + '</div><div class="bn1-self-res2-cap">' + formatter.num2str(player.getStaticResource('boss_splash_weapon_8')) + '</div><div class="bn1-self-res2-cap">' + formatter.num2str(player.getStaticResource('boss_splash_weapon_9')) + '</div>';
        html += '<div class="bn1-self-res2-cap bn1-self-res2-marg">' + formatter.num2str(player.getStaticResource('guild_ship_splash_weapon_0')) + '</div><div class="bn1-self-res2-cap">' + formatter.num2str(player.getStaticResource('guild_ship_splash_weapon_1')) + '</div><div class="bn1-self-res2-cap">' + formatter.num2str(player.getStaticResource('guild_ship_splash_weapon_2')) + '</div>';
        html += '</div>';
    
        html += '<div class="bn1-flexed-line bn1-self-res-line3">';
        html += '<div class="bn1-self-res3-cap bn1-self-res3-first-cap">' + formatter.num2str(player.getStaticResource('sr_0')) + '</div><div class="bn1-self-res3-cap">' + formatter.num2str(player.getStaticResource('sr_1')) + '</div><div class="bn1-self-res3-cap">' + formatter.num2str(player.getStaticResource('sr_2')) + '</div><div class="bn1-self-res3-cap">' + formatter.num2str(player.getStaticResource('sp_0')) + '</div><div class="bn1-self-res3-cap">' + formatter.num2str(player.getStaticResource('sp_1')) + '</div><div class="bn1-self-res3-cap">' + formatter.num2str(player.getStaticResource('sp_2')) + '</div>';
        html += '<div class="bn1-self-res3-cap bn1-self-res3-marg">' + formatter.num2str(player.getStaticResource('tank_armored_plates')) + '</div><div class="bn1-self-res33-cap">' + formatter.num2str(player.getStaticResource('artillery_armored_plates')) + '</div><div class="bn1-self-res33-cap">' + formatter.num2str(player.getStaticResource('plane_armored_plates')) + '</div>';
        html += '</div>';
    
        html += '<div class="bn1-flexed-line bn1-self-res-line33">';
        html += '<div class="bn1-self-res3-cap bn1-self-res3-first-cap">' + formatter.num2str(player.getStaticResource('sp_3')) + '</div><div class="bn1-self-res3-cap">' + formatter.num2str(player.getStaticResource('sp_4')) + '</div><div class="bn1-self-res3-cap">' + formatter.num2str(player.getStaticResource('sp_5')) + '</div><div class="bn1-self-res3-cap">' + formatter.num2str(player.getStaticResource('sp_6')) + '</div><div class="bn1-self-res3-cap">' + formatter.num2str(player.getStaticResource('sp_7')) + '</div><div class="bn1-self-res3-cap">' + formatter.num2str(player.getStaticResource('sp_8')) + '</div>';
        html += '<div class="bn1-self-res3-cap bn1-self-res3-marg">' + formatter.num2str(player.getStaticResource('advanced_tank_armored_plates')) + '</div><div class="bn1-self-res33-cap">' + formatter.num2str(player.getStaticResource('advanced_artillery_armored_plates')) + '</div><div class="bn1-self-res33-cap">' + formatter.num2str(player.getStaticResource('advanced_plane_armored_plates')) + '</div>';
        html += '</div>';
    
        html += '</div>';
        
        html += '<div class="bn1-guild-box">';
        html += '<div class="bn1-guild-menu">Menu';
        html += '</div>';
        html += '<div class="bn1-guild-content">Content';
        html += '</div>';
        html += '</div>';
        
        html += '<div class="bn1-useful-box">';
        html += '<div class="bn1-useful-block-line">';
        html += '<div class="profile_info_block clear_fix">';
        html += '<div class="profile_info_header_wrap">';
        html += '<span class="profile_info_header">Основное</span>';
        html += '</div>';
        html += '<div class="profile_info">';
        html += '<div class="clear_fix profile_info_row">';
        html += '<div class="label fl_l bn1-label">Посылки:</div>';
        html += '<div class="labeled">';
        html += '<input type="text" id="bn1-boxes-cnt" class="bn1-input" value="1">';
        html += '<button class="flat_button bn1-open-boxes">Открыть</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
		
        $(".page_top").after(html);
        
        $("#bn1SelfInfoBox").click(function() {
            $(this).toggleClass('ui_tab_sel');
            $("#bn1SelfGuildBox").removeClass('ui_tab_sel');
            $("#bn1SelfUsefulBox").removeClass('ui_tab_sel');
            
            $(".bn1-self-body").show();
            $(".bn1-guild-box").hide();
            $(".bn1-useful-box").hide();
        });
        
        $("#bn1SelfGuildBox").click(function() {
            $(this).toggleClass('ui_tab_sel');
            $("#bn1SelfInfoBox").removeClass('ui_tab_sel');
            $("#bn1SelfUsefulBox").removeClass('ui_tab_sel');
            
            $(".bn1-self-body").hide();
            $(".bn1-useful-box").hide();
            $(".bn1-guild-box").show();
        });
        
        $("#bn1SelfUsefulBox").click(function() {
            $(this).toggleClass('ui_tab_sel');
            $("#bn1SelfInfoBox").removeClass('ui_tab_sel');
            $("#bn1SelfGuildBox").removeClass('ui_tab_sel');
            
            $(".bn1-self-body").hide();
            $(".bn1-useful-box").show();
            $(".bn1-guild-box").hide();
        });
        
        app.loadGuildData("238499641_1473887014");
        
        $(".bn1-open-boxes").click(function() {
            var reqs = [];
            
            var count = parseInt($("#bn1-boxes-cnt").val(), 10);
            
            if (count <= 30 && count >= 1) {
                for (var k = 0; k < count; k++) reqs.push('{"params":{"action":"buy_uniform"},"request":"action"}');
                app.getRequest().package(reqs, function(r) {
                    if (r.status === 200) {
                        var res = JSON.parse(r.responseText);
                        
                        if (res.result === 'ok') {
                            alert('Успешно вскрыли посылки, в кол-ве: ' + count + ' шт');
                        } else {
                            alert('Ошибка вскрытия ящиков... Нас поймал Пряхин...');
                        }
                    } else {
                        alert('Ошибка вскрытия посылок... Че делаешь?');
                    }
                });
            } else {
                alert('Ты втираешь мне какую-то дичь!');
            }
        });
    };
	
	this.loadGuildData = function(guildID) {
	    //$(".bn1-guild-box").html('Loading....');
	    
	    app.getRequest().getGuilds(guildID, function(r) {
	        app.reqHandle(r, (response) => {
	            var guild = new Guild(JSON.parse(response), guildID);
	            
	            var gInfo = guild.getFullInfo();
	            
	            if (!is_undefined(gInfo['users'])) {
	                app.getRequest().usersGet(Object.keys(gInfo['users']), function(r) {
	                    GM.log(r);
	                });
	            }
	        });
	    });
	};
	
	this.loadSmallBlockByID = function (id) {
        app.getRequest().socialGet(id, function (response) {
            app.reqHandle(response, (response) => {
				let data = null;
				response = JSON.parse(response);
                
				if (!is_undefined(response.error)) {
					$("#oprofile_" + id).html('Игра вернула ошибку: ' + response.error);
				}

                if (response !== '[]' && response.length && is_undefined(response.error) && response[0][1].length) {
					data = JSON.parse(response[0][1]);
				} else if ((!response.length || response === '[]') && is_undefined(response.error)) {
					++app.small[id]['empty'];
				}
				
				if (!is_null(data)) {
				    $("#oprofile_" + id).html('Щас щас щас...');
					return app.showSmallDataByID(id, data);
				} else {
					++app.small[id]['error'];
					
					$("#oprofile_" + id).html('Ошибка загрузки данных... Может игра умерла?');
				}
				
				if (app.small[id]['error'] < 7) {
					setTimeout(function() { app.loadSmallBlockByID(id); }, 1500);
					
					return $("#oprofile_" + id).html('Повтор запроса, через 1.5с... ' + app.small[id]['error'] + '/7');
				}
				
				if (app.small[id]['empty'] >= 4) {
				    return $("#oprofile_" + id).html('Пользователь не играет');
                }
            });
        });
    };
	
	this.onListUsers = function() {
    	let sels = [".friends_field_title", ".labeled.name", ".pad_fr_name"];

    	for (let sel of sels) {
    		$(sel + ":not(.patched):has(a)").addClass("patched").append('<br><div class="bn1-small-load"></div>').click(function() {
	            $(this).off();
				let id = false, row = $(this).parent().parent();

                if (!is_null(row[0]) && row[0].id.length) {
                    id = row[0].id.split('row')[1];
                } else if (!is_null(row[0]) && !is_null(row[0].dataset) && !is_null(row[0].dataset.id)) {
                    id = row[0].dataset.id;
                }
                
                if ((id === false || is_undefined(id)) && !is_undefined($(this).first().parent().first().children())) {
                    $(this).first().parent().first().children().each(function(i, elem) {
                        if (elem.id.indexOf('controls_') > -1) {
                            id = elem.id.split('controls_')[1];
                        }
                    });
                }
                
                if (!is_undefined(id) && id !== false) {
                    $(this).after('<div id="oprofile_' + id + '" class="bn1-small-user-loader">Загрузка...</div>');
    				app.small[id] = {
    					'error': 0,
    					'empty': 0
    				};
    				app.loadSmallBlockByID(id);
                } else {
                    $(this).after('<div class="bn1-small-user-loader">Ошибка парсинга ID, обратитесь к админу!</div>');
                }
    		});
    	}
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
		html += '<div class="bn1-flexed-line"> <div class="offset-50per bn1-tooltiped" data-bn1tooltip="Бот №1 в окопе"></div><div class="bn1-small-logged-time">Уровень: ' + (player.getLevel() + 1) + ' (' + exp.percentage + '%)<br>' + division.name + ' дивизион #' + (division.div + 1) + '<br>Вход: ' + login + ' </div> </div>';
		html += '<div class="bn1-flexed-line bn1-small-res1-line"> <div class="bn1-small-damage">' + formatter.numFormat(damage.count) + ' [' + bossLimit.full + ']</div><div class="bn1-small-res1-cap">' + formatter.numFormat(player.getTalentsCount()) + '</div><div class="bn1-small-res1-cap">' + formatter.numFormat(player.getSrutAmount()) + '</div> </div>';
		html += '</div>';

        $("#oprofile_" + id).html(html);
    };
}

var range = function(start, end, step = 1) {
    var range = [];
    var typeofStart = typeof start;
    var typeofEnd = typeof end;

    if (step === 0) {
        throw TypeError("Step cannot be zero.");
    }

    if (typeofStart == "undefined" || typeofEnd == "undefined") {
        throw TypeError("Must pass start and end arguments.");
    } else if (typeofStart != typeofEnd) {
        throw TypeError("Start and end arguments must be of same type.");
    }

    typeof step == "undefined" && (step = 1);

    if (end < start) {
        step = -step;
    }

    if (typeofStart == "number") {

        while (step > 0 ? end >= start : end <= start) {
            range.push(start);
            start += step;
        }

    } else if (typeofStart == "string") {

        if (start.length != 1 || end.length != 1) {
            throw TypeError("Only strings with one character are supported.");
        }

        start = start.charCodeAt(0);
        end = end.charCodeAt(0);

        while (step > 0 ? end >= start : end <= start) {
            range.push(String.fromCharCode(start));
            start += step;
        }

    } else {
        throw TypeError("Only string and number types are supported");
    }

    return range;

}
