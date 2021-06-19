function Player(data) {
    this.data = data || [];
	this.dataPack = new DataPack();
	this.formatter = new Formatter();
	
	this.getValue = function(array, resource, defaultValue) {
		return (new ArrayHelper()).getValue(array, resource, defaultValue);
	};
    this.getData = function () {
        return this.data;
    };
    this.getUserGuild = function () {
        return this.getValue(this.getData(), 'user_guild', []);
    };
    this.getTalents = function () {
        return this.getValue(this.getData(), 'talents', []);
    };
    this.getTalent = function (talent) {
        return this.getValue(this.getTalents(), talent, 0);
    };
    this.getUserGuildMembers = function () {
        return this.getValue(this.getUserGuild(), 'members', []);
    };
    this.isUserHasGuild = function () {
        return ( this.getUserGuildID().length && this.getUserGuildID().indexOf('_') != -1 && this.getUserGuildMembers().length );
    };
    this.getUserGuildLevel = function () {
        return this.getValue(this.getUserGuild(), 'level', 0);
    };
    this.getUserGuildID = function () {
        return this.getValue(this.getUserGuild(), 'id', false);
    };
    this.getCompletedCategorizedAchievements = function () {
        return this.getValue(this.getData(), 'completed_categorized_achievements', []);
    };
    this.getCategorizedAchievements = function () {
        return this.getValue(this.getData(), 'categorized_achievements', []);
    };
    this.getWish = function() {
        return this.getValue(this.getData(), 'wish_list', false);
    };
    this.getGlobalWish = function() {
        return this.getValue(this.getData(), 'global_collection_wish_list', false);
    };
    this.getCompletedAchievements = function () {
        return this.getValue(this.getData(), 'completed_achievements', []);
    };
    this.isActiveFreezeTime = function() {
        return (this.getValue(this.getValue(this.getData(), 'town_map', {}), 'location', 0) == '50');
    };
    this.getAchievementAmount = function (group, index) {
		
		let amount = '∞';
		
		let response = this.getValue(this.getCategorizedAchievements(), group, false);

		if (response) {
			response = this.getValue(response, index, false);
			if (response) {
				amount = this.getValue(response, 'amount', '∞');
			}
		}
		
        return amount;
    };
    this.getCompletedAchievementData = function (group, index) {
		
		let data = {
			"index": -1,
			"time": 0,
		};
		
		let response = this.getValue(this.getCompletedCategorizedAchievements(), group, false);

		if (response) {
			response = this.getValue(response, index, false);
			if (response) {
				data = {
					"index": response[0],
					"time": response[1]
				};
			}
		}
		
        return data;
    };
	this.a_getWeapon = function(wpn) {
		let indexes = {3: 6, 4: 7, 5: 8, 6: 9, 7: 10, 8: 11, 9: 12};
		let pack = this.getDataPack().weapons;
		let ach = this.getCompletedAchievementData(2, indexes[wpn]);
		
		return this.getAchievementText(pack, ach);
	};
	this.g_getWeapon = function(wpn) {
		let indexes = [0, 1, 2];
		let pack = this.getDataPack().guildWeapons;
		let ach = this.getCompletedAchievementData(5, indexes[wpn]);
		
		return this.getAchievementText(pack, ach);
	};
	this.a_s_getWeapon = function(wpn) {
		let indexes = {3: 6, 4: 7, 5: 8, 6: 9, 7: 10, 8: 11, 9: 12};
		let pack = this.getDataPack().weapons;
		let ach = this.getCompletedAchievementData(2, indexes[wpn]);
		
		return this.getAchievementText(pack, ach, this.getAchievementAmount(2, indexes[wpn]));
	};
	this.g_s_getWeapon = function(wpn) {
		let indexes = [0, 1, 2];
		let pack = this.getDataPack().guildWeapons;
		let ach = this.getCompletedAchievementData(5, indexes[wpn]);
		
		return this.getAchievementText(pack, ach, this.getAchievementAmount(5, indexes[wpn]));
	};
	this.getWpnDamage = function(weapon) {
	    let defaultDamages = [100, 200, 300, 100, 200, 600, 1000, 1600, 4000, 8200],
	        guildBoost = this.getStaticResource('boss_splash_weapon_' + weapon + '_guild_boost'),
	        defaultBoost = this.getStaticResource('boss_splash_weapon_' + weapon + '_boost'),
	        statusBoost = (this.isActiveStatus() ? this.getStaticResource('boss_splash_weapon_' + weapon + '_status_boost') : 0);
	    
	    return defaultDamages[weapon] + defaultBoost + guildBoost + statusBoost;
	};
	this.a_getSrut = function() {
		let pack = this.getDataPack().srut;
		let ach = this.getCompletedAchievementData(2, 5);
		
		return this.getAchievementText(pack, ach);
	};
	this.g_getResources = function(res) {
		let indexes = [3, 4];
		let pack = this.getDataPack().guildResources;
		let ach = this.getCompletedAchievementData(5, indexes[res]);
		
		return this.getAchievementText(pack, ach);
	};
	this.a_getResource = function(k) {
		let indexes = [
			{"index": 6, "pack": this.getDataPack().spirit},
			{"index": 5, "pack": this.getDataPack().money},
			{"index": 19, "pack": this.getDataPack().energy}
		];
		
		let pack = indexes[k]['pack'];
		let ach = this.getCompletedAchievementData(1, indexes[k]['index']);
		
		return this.getAchievementText(pack, ach);
	};
	this.g_s_getResources = function(res) {
		let indexes = [3, 4];
		let pack = this.getDataPack().guildResources;
		let ach = this.getCompletedAchievementData(5, indexes[res]);
		
		return this.getAchievementText(pack, ach, this.getAchievementAmount(5, indexes[res]));
	};
	this.a_s_getResource = function(k) {
		let indexes = [
			{"index": 6, "pack": this.getDataPack().spirit},
			{"index": 5, "pack": this.getDataPack().money},
			{"index": 19, "pack": this.getDataPack().energy}
		];
		
		let pack = indexes[k]['pack'];
		let ach = this.getCompletedAchievementData(1, indexes[k]['index']);
		
		return this.getAchievementText(pack, ach, this.getAchievementAmount(1, indexes[k]['index']));
	};
	this.getAchievementText = function(pack, achievement, self = false) {
		let result = {
			"count": 0,
			"amount": 0,
			"time": this.formatter.ts2date(0)
		};
		
		if (achievement['index'] > 0) {
			let n = pack[achievement['index']];

			if (self) {
				result['amount'] = self;
			}
			
			result["count"] = ( !is_undefined(n) ? n : '∞' );
			result["time"] = this.formatter.ts2date(achievement['time']);
		}
		
		return result;
	};
	this.getDamageData = function(self = false) {
		let pack = this.getDataPack().damage;
		let ach = this.getCompletedAchievementData(2, 29);
		let result = this.getAchievementText(pack, ach, (self ? this.getAchievementAmount(2, 29) : false));
		
		return result;
	};
	this.getCompletedAchievementInfo = function (index) {
		return this.getValue(this.getCompletedAchievements(), index, false);
	};
    this.getExperiences = function () {
        return this.getValue(this.getData(), 'experiences', []);
    };
	this.getExperience = function () {
        return this.getValue(this.getExperiences(), 'experience', []);
    };
	this.getNames = function () {
        return this.getValue(this.getData(), 'names', []);
    };
	this.getSquadName = function () {
        return this.getValue(this.getNames(), 'squad_name', 'Мой отряд');
    };
	this.getExperienceAmount = function () {
        return this.getValue(this.getExperience(), 'amount', 0);
    };
	this.getExpData = function() {
		let result = {
            'left': 0,
            'have': this.getExperienceAmount(),
            'percentage': 0,
        };

        let pack = this.getDataPack().expData;
        let level = this.getLevel();

        if (level < count(pack)) {
            result['left'] = pack[level + 1] - result['have'];
        }

        if (result['have']) {
            result['percentage'] = Math.floor((result['have'] - pack[level]) / ((pack[level + 1] - pack[level]) / 100));
        }

        return result;
	};
	this.getDivisionData = function() {
		let pack = this.getDataPack().divNames;
		
        let result = {
            'name': 'Начальный',
			'div': this.getDivisionNumeric(),
            'icon': 0
        };
		
		for (let exp in pack) {
			if (this.getExperienceAmount() >= exp) {
				result['name'] = pack[exp];
				result['icon']++;
			}
		}

        return result;
	};
	this.getDivision = function() {
		return this.getValue(this.getData(), 'division', []);
	};
	this.getDivisionNumeric = function() {
		return this.getValue(this.getDivision(), 'h_div', 0);
	};
	this.getLevel = function() {
		return this.getValue(this.getExperience(), 'max_level', 0);
	};
	this.getLastLoginTime = function() {
		return this.getValue(this.getData(), 'last_login', null);
	};
    this.statusLevel = function () {
        return this.getValue(this.getStatus(), 'max_level', 0);
    };
    this.getInterimResources = function () {
        return this.getValue(this.getData(), 'interim_resources', []);
    };
    this.getStaticResources = function () {
        return this.getValue(this.getData(), 'static_resources', []);
    };
    this.getStaticResource = function (resource) {
        return this.getValue(this.getStaticResources(), resource, 0);
    };
    this.getArmy = function () {
        return this.getStaticResource('army_strength');
    };
	this.getAchievementPoints = function () {
        return this.getStaticResource('achievement_points');
    };
	this.getTalentsCount = function () {
        return this.getStaticResource('used_talents');
    };
    this.statusTime = function () {
        return this.getValue(this.getInterimResources(), 'status_time', 0);
    };
    this.isActiveStatus = function () {
		let time = (new Date()).getTime() / 1000;
		let time_status = this.statusTime();
		
        return time_status > time;
    };
    this.getStatus = function () {
        return this.getValue(this.getExperiences(), 'status', []);
    };
	this.countBossLimit = function() {
		let boost = {
			"guild": 0,
			"default": this.getDataPack().defaultLimit,
			"status": 0,
			"talents": 0,
			"territories": 0,
			"major": 0,
			"full": this.getDataPack().defaultLimit
		};
		
		if (this.getLevel() < 3 ) {
			return boost;
		}
		
		let guildLevels = this.getDataPack().guildLimitBoost;
		let guildLevel = this.getUserGuildLevel();
		
		for (let level in guildLevels) {
			if (guildLevel >= level) {
				boost['guild'] += guildLevels[level];
				boost['full'] += guildLevels[level];
			}
		}
		
		if (this.isActiveStatus()) {
			let statusLevel = this.statusLevel();
			let statusLevels = this.getDataPack().statusLimitBoost;

			for (let level in statusLevels) {
				if (statusLevel >= parseInt(level)) {
					boost['status'] = parseInt(statusLevels[level]);
					boost['full'] += parseInt(statusLevels[level]);
					break;
				}
			}
		}
		
		let talents = this.getDataPack().talentsLimitBoost;
		for (let index of talents) {
			boost['talents'] += parseInt(this.getTalent(index));
			boost['full'] += parseInt(this.getTalent(index));
		}

		let achievementTerritories = this.getCompletedAchievementData(1, 14);
		
		if (achievementTerritories['index'] > 0) {
			boost['territories'] = achievementTerritories['index'] * 5;
			boost['full'] += achievementTerritories['index'] * 5;
		}

		let territories = this.getDataPack().achievementsLimitBoost;
		
		for (let index of territories) {
			let ts = this.getCompletedAchievementInfo(index);

			if (is_numeric(ts) && ts <= ((new Date()).getTime() / 1000) ) {
				boost['major'] += 5;
				boost['full'] += 5;
			}
		}
		
		return boost;
	};
	this.getDataPack = function() {
		return this.dataPack;
	};
	this.getStaticMaximumResources = function() {
		return this.getValue(this.getData(), 'static_maximum_resources', []);
	};
	this.getExpiringResources = function() {
		return this.getValue(this.getData(), 'expiring_resources', []);
	};
	this.getExpiringResource = function(resource) {
		return this.getValue(this.getExpiringResources(), resource, []);
	};
	this.getLimitedResources = function() {
		return this.getValue(this.getData(), 'limited_resources', []);
	};
	this.getLimitedResource = function(resource) {
		return this.getValue(this.getLimitedResources(), resource, 0);
	};
	this.getExpiringResourceAmount = function(resource) {
		var e = this.getExpiringResource(resource), i = new Date(), _d = parseInt(i.getUTCFullYear() + "" + i.getUTCMonth() + i.getUTCDate(), 10), _i = new Date(e.time * 1000), v = parseInt(_i.getUTCFullYear() + "" + _i.getUTCMonth() + _i.getUTCDate(), 10);
		
		return (v <= _d ? e.amount : 0);
	};
	this.getRenewableResources = function() {
		return this.getValue(this.getData(), 'renewable_resources', []);
	};
	this.getRenewableResource = function(resource) {
		return this.getValue(this.getRenewableResources(), resource, {'amount': 0, "ts": 0});
	};
	this.getExtendedStaticResources = function() {
		return this.getValue(this.getData(), 'extended_static_resources', []);
	};
	this.getExtendedBoostByResource = function(resource) {
		return this.getValue(this.getExtendedStaticResources(), resource, 0);
	};
	this.getSrut = function() {
		return this.getValue(this.getStaticMaximumResources(), 'srut', []);
	};
	this.getSrutAmount = function() {
		return this.getValue(this.getSrut(), 'amount', 0);
	};
	this.getDecks = function() {
		return this.getValue(this.getData(), 'decks', []);
	};
	this.getDeck = function(deck) {
		return this.getValue(this.getDecks(), deck, []);
	};
	this.getParts = function(deck) {
		return this.getValue(this.getDeck(deck), 'parts', []);
	};
	this.getDecksAllLevel = function() {
		let level = 0;
		let types = [1, 2, 3, 4];
		let decks = this.getDecks();
		
		for (let type of types) {
			if (!is_null(decks[type]) && !is_undefined(this.getParts(type))) {
				for (let card in this.getParts(type)) {
					if (!is_null(decks[type].parts[card].current_card)) {
						++level;
					}
				}
			}
		}
		
		return level;
	};
	this.getEnergyAmount = function(energy) {
		let energyStatusBoost = (this.isActiveStatus() ? this.getExtendedBoostByResource(energy + '_maximum_status_boost') : 0);
		let energyStaticBoost = this.getExtendedBoostByResource(energy + '_maximum_static_boost');
		let energyGuildBoost = this.getExtendedBoostByResource(energy + '_maximum_guild_boost');
		let energyBoost = energyGuildBoost + energyStaticBoost + energyStatusBoost;

		let energyRefillBoost = (this.isActiveStatus() ? this.getExtendedBoostByResource(energy + '_recovery_time_status_boost') : 0);

		let energyMax = (energy === 'energy' ? 50 : 100);
		energyMax += energyBoost;

		let step = 1;

		let regular = 300 - 300 * parseFloat('0.' + energyRefillBoost);

		let energyRenewable = this.getRenewableResource(energy);

		if (energyRenewable['amount'] < energyMax) {
			let time = ((new Date()).getTime()) / 1000 - energyRenewable['ts'];

			if (time < (energyMax * regular)) {
				let energy = energyRenewable['amount'] + ( (Math.floor(time / regular)) * step);

				if (energy > energyMax) {
					return energyMax;
				}

				return energy;

			} else {
				return energyMax;
			}
		} else {
			return energyRenewable['amount'];
	    }
	};
	this.getEnergy = function() {
		return this.getEnergyAmount('energy');
	};
	this.getOccasionEnergy = function() {
		return this.getEnergyAmount('occasion_energy');
	};
	this.getBossLimit = function() {
		return this.getValue(this.getExpiringResources(), 'boss_limit', 0);
	};
	this.getGuildExperience = function() {
		return this.getStaticResource('guild_experience');
	};
	this.getOrders = function() {
		return this.getValue(this.getData(), 'orders', []);
	};
	this.getTime = function() {
		return (((new Date()).getTime()) / 1000); //this.getValue(this.getData(), 'time_script', (((new Date()).getTime()) / 1000));
	};
	this.getOrder = function(order) {
		return this.getValue(this.getOrders(), order, []);
	};
	this.getOrderTime = function(order) {
		return this.getValue(this.getOrder(order), 'time', 0);
	};
	this.getOrdersTime = function(order) {
		let boostTime = (order === 1 ? 14400 : 28800);
		let boost = boostTime - this.getStaticResource(order === 1 ? 'urgent_orders_boost' : 'orders_boost');
		let orderTime = this.getOrderTime(order);
		let thisTime = this.getTime();
		let diffTime = (orderTime + boost) - thisTime;

		if (diffTime < 0) {
			return 'ГОТОВ';
		}

		return this.formatter.time2str(diffTime);
	};
	this.getBossLimit = function() {
		return this.getExpiringResourceAmount('boss_limit');
	};
	this.getBossLimitMax = function() {
		let max = 15 + this.getStaticResource('boss_limit_boost') + this.getStaticResource('boss_limit_guild_boost');

		if (this.isActiveStatus()) {
			max += this.getStaticResource('boss_limit_status_boost');
		}

		return max;
	};
	this.getBoss = function() {
		return this.getValue(this.getData(), 'boss', []);
	};
	this.getBossID = function() {
		return this.getValue(this.getBoss(), 0, false);
	};
	this.getBossHp = function() {
		return this.getValue(this.getBoss(), 1, 0);
	};
	this.getBossFinishTime = function() {
		return this.getValue(this.getBoss(), 2, false);
	};
	this.getBossMode = function() {
		return this.getValue(this.getBoss(), 3, false);
	};
	this.isActiveBoss = function() {
		return this.getBossHp() > 0 && this.getBossID() !== false && this.getBossMode() !== false;
	};
	this.getCurrentBoss = function() {
		let pack = this.getDataPack().bosses;
		let name = (this.getBossID() !== false ? this.getValue(pack, this.getBossID(), 'не знаю') : 'нет босса');
		let mode = this.getBossMode();
		let time = this.getBossFinishTime();
		let leftTime;
		let lose = 0;
		let dead = 0;

		if (mode === "1") {
			name = '☆ ' + name + ' ☆';
		}

		if (
			(time < this.getTime() && (this.isActiveBoss() || this.getBossHp() <= 0))
			|| (this.getBossID() === false || this.getBossMode() === false)
		) {
		    if (time < this.getTime() && this.getBossHp() > 0) lose = 1;
		    
		    dead = this.getValue(this.getValue(this.getData(), 'current_boss', {}), 'dead', 0);
		    
			leftTime = '00:00:00';
		} else {
			leftTime = this.formatter.time2str((time - this.getTime()), true);
		}

		return {
			name: name,
			hp: Math.round(this.getBossHp()),
			time: leftTime,
			id: this.getBossID(),
			lose: lose,
			dead: dead
		};
	};
	this.getTodayBoss = function() {
		let bosses = ['нет босса', 'Рудольф', 'Герберт'];
		let dayTime = Math.floor(Date.now() / 86400000 - 2) % 3;

        return bosses[dayTime] || 'нет босса';
	};
}