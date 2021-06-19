function _0x8366x3(_0x8366x4, _0x8366x5) {
    if (!_0x8366x4) {
        _0x8366x5(null);
        return;
    };
    var _0x8366x6 = _0x8366x4;
    var _0x8366x7 = _0x8366x6.randoms;
    var _0x8366x8 = _0x8366x6.town_map;
    if (!_0x8366x8 || !_0x8366x8.map) {
        _0x8366x5([]);
        return;
    };
    var _0x8366x9 = tm[_0x8366x8.map];
    if (!_0x8366x9) {
        _0x8366x5([]);
        return;
    };
    _0x8366x9.exitPos = {
        y: parseInt(_0x8366x9.exit[0]),
        x: parseInt(_0x8366x9.exit[1])
    };
    var _0x8366xa = {};
    for (var _0x8366xb in _0x8366x8.quest_items) {
        _0x8366xa[_0x8366x8.quest_items[_0x8366xb]] = true
    };
    var _0x8366xc = {};
    for (var _0x8366xb in _0x8366x9.routes) {
        if (_0x8366x9.routes[_0x8366xb].reward) {
            var _0x8366xd = _0x8366x9.routes[_0x8366xb].reward.id;
            if (_0x8366xd && ((_0x8366xd.indexOf('quest_item_step_') > 0) || (_0x8366xd.indexOf('black_box_') > -1 && !_0x8366x6.static_resources.bases_black_box))) {
                var _0x8366xe = Math.min(2, parseInt(_0x8366xd[_0x8366xd.length - 1]));
                if (!_0x8366xa[_0x8366xe]) {
                    _0x8366xc[_0x8366xb] = 'i' + _0x8366xe
                };
            };
        }
    };
    var _0x8366xf = {};
    var _0x8366x10 = [];
    for (var _0x8366xb in _0x8366x8.town_actors) {
        var _0x8366x11 = _0x8366x8.town_actors[_0x8366xb];
        var _0x8366x12 = _0x8366x9.actors[_0x8366xb].random;
        _0x8366x10.push({
            id: _0x8366xb,
            pos: _0x8366x11.location,
            rnd: _0x8366x12
        });
        _0x8366xf[_0x8366x12] = _0x8366x7[_0x8366x12];
    };
    _0x8366x10.sort(function (_0x8366x13, _0x8366x14) {
        return _0x8366x13.id < _0x8366x14.id ? -1 : 1
    });
    var _0x8366x15 = '';
    for (var _0x8366x16 in _0x8366xc) {
        _0x8366x15 += _0x8366x16
    };
    _0x8366x8 = {
        items: _0x8366xc,
        n: _0x8366x15,
        enemy: _0x8366x10,
        pos: _0x8366x8.location,
        rd: _0x8366xf,
        s: [_0x8366x8.location],
        pen: 0
    };
    _0x8366x17(_0x8366x8, _0x8366x9, _0x8366x5);
}
function _0x8366x17(_0x8366x18, _0x8366x9, _0x8366x5) {
    _0x8366x18.dist = _0x8366x2a(_0x8366x18);
    var _0x8366x19 = [];
    _0x8366x19.push(_0x8366x18);
    var _0x8366x1a = 0;
    var _0x8366x1b = null;
    var _0x8366x1c = 10000;
    for (; _0x8366x1a < 200000; _0x8366x1a++) {
        if (_0x8366x19.length == 0) {
            break
        };
        if (!_0x8366x1d()) {
            return
        };
    };
    _0x8366x5(_0x8366x1b ? _0x8366x1b.s : []);
    return;
    function _0x8366x1d() {
        var _0x8366x1e = 1000000,
            _0x8366x8 = null,
            _0x8366x1f = -1;
        for (var _0x8366x16 = 0; _0x8366x16 < _0x8366x19.length; _0x8366x16++) {
            var _0x8366x20 = _0x8366x19[_0x8366x16];
            if (_0x8366x20.dist < _0x8366x1e) {
                _0x8366x1e = _0x8366x20.dist;
                _0x8366x8 = _0x8366x20;
                _0x8366x1f = _0x8366x16;
            };
        };
        if (_0x8366x8 == null) {
            _0x8366x5(null);
            return false;
        };
        _0x8366x19.splice(_0x8366x1f, 1);
        if (_0x8366x8.s.length < _0x8366x1c) {
            if (_0x8366x8.dist - _0x8366x8.pen == _0x8366x8.s.length) {
                _0x8366x1b = _0x8366x8;
                _0x8366x1c = _0x8366x8.s.length;
            } else {
                _0x8366x21(_0x8366x8)
            }
        };
        return true;
    }
    function _0x8366x21(_0x8366x8) {
        if (_0x8366x8.items[_0x8366x8.pos]) {
            delete _0x8366x8.items[_0x8366x8.pos];
            var _0x8366x15 = '';
            for (var _0x8366x16 in _0x8366x8.items) {
                _0x8366x15 += _0x8366x16
            };
            _0x8366x8.n = _0x8366x15;
        };
        var _0x8366x22 = {};
        var _0x8366x23 = _0x8366x9.routes[_0x8366x8.pos].edges;
        for (var _0x8366x24 = 0; _0x8366x24 < _0x8366x23.length; _0x8366x24++) {
            _0x8366x22[_0x8366x23[_0x8366x24]] = true
        };
        for (var _0x8366x25 = 0; _0x8366x25 < _0x8366x8.enemy.length; _0x8366x25++) {
            if (_0x8366x22[_0x8366x8.enemy[_0x8366x25].pos]) {
                delete _0x8366x22[_0x8366x8.enemy[_0x8366x25].pos]
            }
        };
        _0x8366x29(_0x8366x8);
        for (var _0x8366x25 = 0; _0x8366x25 < _0x8366x8.enemy.length; _0x8366x25++) {
            if (_0x8366x22[_0x8366x8.enemy[_0x8366x25].pos]) {
                delete _0x8366x22[_0x8366x8.enemy[_0x8366x25].pos]
            }
        };
        for (var _0x8366x26 in _0x8366x22) {
            var _0x8366x27 = true;
            for (var _0x8366x25 = 0; _0x8366x25 < _0x8366x19.length; _0x8366x25++) {
                var _0x8366x14 = _0x8366x19[_0x8366x25];
                if (_0x8366x14.pos == _0x8366x26 && _0x8366x14.s.length == _0x8366x8.s.length + 1 && _0x8366x14.n.length == _0x8366x8.n.length && _0x8366x14.pen == _0x8366x8.pen && _0x8366x14.n == _0x8366x8.n) {
                    _0x8366x27 = false;
                    break;
                };
            };
            if (_0x8366x27) {
                var _0x8366x20 = JSON.parse(JSON.stringify(_0x8366x8));
                _0x8366x20.pos = _0x8366x26;
                _0x8366x20.s.push(_0x8366x20.pos);
                if (_0x8366x9.routes[_0x8366x20.pos] && _0x8366x9.routes[_0x8366x20.pos].reward) {
                    var _0x8366x28 = _0x8366x9.routes[_0x8366x20.pos].reward.id;
                    if (_0x8366x28 == 'town00_map_step6' || _0x8366x28 == 'town00_map_step10') {
                        _0x8366x20.pen += 6
                    };
                };
                _0x8366x20.dist = _0x8366x2a(_0x8366x20);
                _0x8366x19.push(_0x8366x20);
            } else {
                _0x8366x27 = true
            };
        };
    }
    function _0x8366x29(_0x8366x8) {
        for (var _0x8366x16 = 0; _0x8366x16 < _0x8366x8.enemy.length; _0x8366x16++) {
            var _0x8366x11 = _0x8366x8.enemy[_0x8366x16];
            var _0x8366x23 = _0x8366x9.routes[_0x8366x11.pos].edges;
            var _0x8366x22 = [];
            for (var _0x8366x24 = 0; _0x8366x24 < _0x8366x23.length; _0x8366x24++) {
                var _0x8366x26 = _0x8366x23[_0x8366x24];
                var _0x8366x27 = true;
                for (var _0x8366x25 = 0; _0x8366x25 < _0x8366x8.enemy.length; _0x8366x25++) {
                    if (_0x8366x8.enemy[_0x8366x25].pos == _0x8366x26) {
                        _0x8366x27 = false;
                        break;
                    }
                };
                if (_0x8366x27) {
                    _0x8366x22.push(_0x8366x26)
                };
            };
            if (_0x8366x22.length > 0) {
                _0x8366x22.sort();
                var _0x8366x12 = _0x8366x8.rd[_0x8366x11.rnd];
                _0x8366x8.rd[_0x8366x11.rnd] = _0x8366x12 + 1;
                var _0x8366x1f = Math.floor(_0x8366x31(_0x8366x12) * _0x8366x22.length);
                _0x8366x11.pos = _0x8366x22[_0x8366x1f];
            };
        }
    }
    function _0x8366x2a(_0x8366x8) {
        var _0x8366x2b = parseInt(_0x8366x8.pos[0]),
            _0x8366x2c = parseInt(_0x8366x8.pos[1]);
        var _0x8366x2d = 0;
        for (var _0x8366x2e in _0x8366x8.items) {
            var _0x8366x2f = parseInt(_0x8366x2e[0]),
                _0x8366x30 = parseInt(_0x8366x2e[1]);
            _0x8366x2d += Math.abs(_0x8366x2f - _0x8366x2b) + Math.abs(_0x8366x30 - _0x8366x2c);
        };
        if (_0x8366x2d > 0) {
            return _0x8366x2d + _0x8366x8.s.length + _0x8366x8.pen
        };
        return _0x8366x2d + Math.abs(_0x8366x9.exitPos.y - _0x8366x2b) + Math.abs(_0x8366x9.exitPos.x - _0x8366x2c) + _0x8366x8.s.length + _0x8366x8.pen;
    }
}
function _0x8366x31(_0x8366x32) {
    return (Math.floor(Math.sin(_0x8366x32) * 4294967296) & 65535) / 65536
}
function _0x8366x33(_0x8366x34) {
    if (_0x8366x34 === null) {
        $('.map').html('<h2>Сервер окопа вернул ошибку, пожалуйста, повторите расчет!</h2>');
        return;
    };
    if (!_0x8366x34 || _0x8366x34.length < 2) {
        $('.map').html('<h2>Невозможно построить маршрут: либо нет пути к победе, либо карта не открыта!</h2>');
        return;
    };
    var _0x8366x4 = app.getSecrets().data;
    var _0x8366x35 = _0x8366x4.town_map.map;
    var _0x8366x9 = tm[_0x8366x35];
    var _0x8366x36 = 0;
    for (var _0x8366x37 in _0x8366x9.routes) {
        if (_0x8366x37[1] > 5 || _0x8366x37[1] == 0) {
            _0x8366x36++
        }
    };
    var _0x8366x38 = $('.map').empty();
    var _0x8366x39 = parseInt(_0x8366x34[0] ? _0x8366x34[0][1] : 0);
    _0x8366x39 = _0x8366x39 == 0 ? 10 : _0x8366x39;
    if (_0x8366x39 >= 8) {
        $('<div></div>').css({
            position: 'absolute',
            top: '58px',
            left: '51px',
            "border-left": '2px solid #000',
            "border-bottom": '2px solid #000',
            "width": '930px',
            "height": '425px',
            "pointer-events": 'none'
        }).appendTo(_0x8366x38)
    } else {
        $('<div></div>').css({
            position: 'absolute',
            top: '58px',
            left: '51px',
            "border-left": '2px solid #000',
            "border-bottom": '2px solid #000',
            "width": '880px',
            "height": '425px',
            "pointer-events": 'none'
        }).appendTo(_0x8366x38)
    };
    var _0x8366x3a = 1;
    if (_0x8366x36 > 0) {
        switch (_0x8366x39) {
        case 4:
            _0x8366x3a = 2;
            break;;;;;;;;
        case 5:
            _0x8366x3a = 3;
            break;;;;;;;;
        case 6:
            _0x8366x3a = 4;
            break;;;;;;;;
        case 7:
            _0x8366x3a = 5;
            break;;;;;;;;
        case 8:
            ;;;;;;;
        case 9:
            ;;;;;;;
        case 10:
            _0x8366x3a = 6;
            break;;;;;;;;
        }
    };
    for (var _0x8366x16 = 1; _0x8366x16 <= 5; _0x8366x16++, _0x8366x3a++) {
        if (_0x8366x39 >= 8) {
            $('<div></div>').css({
                position: 'absolute',
                top: '488px',
                left: (_0x8366x16 * 209 - 84) + 'px',
                font: 'bold 14px Arial',
                "color": '#000'
            }).appendTo(_0x8366x38).text(_0x8366x3a)
        } else {
            $('<div></div>').css({
                position: 'absolute',
                top: '488px',
                left: (_0x8366x16 * 209 - 134) + 'px',
                font: 'bold 14px Arial',
                "color": '#000'
            }).appendTo(_0x8366x38).text(_0x8366x3a)
        }
    };
    $('<div></div>').css({
        position: 'absolute',
        top: '488px',
        left: (5 * 209 - 114) + 'px',
        font: 'bold 14px Arial',
        "color": '#000'
    }).appendTo(_0x8366x38).text('X');
    for (var _0x8366x16 = 1; _0x8366x16 <= 4; _0x8366x16++) {
        $('<div></div>').css({
            position: 'absolute',
            top: (_0x8366x16 * 126 - 47) + 'px',
            left: '40px',
            font: 'bold 14px Arial',
            "color": '#000'
        }).appendTo(_0x8366x38).text((5 - _0x8366x16))
    };
    $('<div></div>').css({
        position: 'absolute',
        top: '58px',
        left: '40px',
        font: 'bold 14px Arial',
        "color": '#000'
    }).appendTo(_0x8366x38).text('Y');
    var _0x8366x3b = [];
    for (var _0x8366x16 = _0x8366x34.length - 2; _0x8366x16 >= 0; _0x8366x16--) {
        var _0x8366x3c = _0x8366x34[_0x8366x16],
            _0x8366x3d = _0x8366x34[_0x8366x16 + 1];
        var _0x8366x2c = parseInt(_0x8366x3c[1]);
        var _0x8366x2b = parseInt(_0x8366x3c[0]);
        var _0x8366x3e = parseInt(_0x8366x3d[1]);
        var _0x8366x3f = parseInt(_0x8366x3d[0]);
        var _0x8366x40 = $('<div></div>').css({
            background: '#f00',
            position: 'absolute',
            color: '#fff'
        });
        if (_0x8366x2c == 0) {
            _0x8366x2c = 10;
            _0x8366x2b = _0x8366x2b - 1;
        };
        if (_0x8366x3e == 0) {
            _0x8366x3e = 10;
            _0x8366x3f = _0x8366x3f - 1;
        };
        if (_0x8366x2b == _0x8366x3f) {
            _0x8366x40.css({
                height: '15px',
                paddingLeft: '105px',
                width: '119px'
            })
        } else {
            _0x8366x40.css({
                width: '15px',
                height: '74px'
            }).css('padding-top', '67px')
        };
        var _0x8366x41 = Math.min(_0x8366x2c, _0x8366x3e);
        var _0x8366x42 = 0,
            _0x8366x43 = 0;
        switch (_0x8366x39) {
        case 1:
            _0x8366x41 -= 0, _0x8366x42 = 1, _0x8366x43 = 5;
            break;;;;;;;;
        case 2:
            _0x8366x41 -= 0, _0x8366x42 = 1, _0x8366x43 = 5;
            break;;;;;;;;
        case 3:
            _0x8366x41 -= 0, _0x8366x42 = 1, _0x8366x43 = 5;
            break;;;;;;;;
        case 4:
            if (_0x8366x36 > 0) {
                _0x8366x41 -= 1
            };
            _0x8366x42 = 2, _0x8366x43 = 6;
            break;;;;;;;;
        case 5:
            if (_0x8366x36 > 0) {
                _0x8366x41 -= 2
            };
            _0x8366x42 = 3, _0x8366x43 = 7;
            break;;;;;;;;
        case 6:
            _0x8366x41 -= 3;
            _0x8366x42 = 4, _0x8366x43 = 8;
            break;;;;;;;;
        case 7:
            _0x8366x41 -= 4;
            _0x8366x42 = 5, _0x8366x43 = 9;
            break;;;;;;;;
        case 8:
            ;;;;;;;
        case 9:
            ;;;;;;;
        case 10:
            _0x8366x41 -= 5;
            _0x8366x42 = 6, _0x8366x43 = 10;
            break;;;;;;;;
        };
        if ((Math.min(_0x8366x2c, _0x8366x3e) >= _0x8366x42 && Math.min(_0x8366x2c, _0x8366x3e) <= _0x8366x43 && Math.max(_0x8366x2c, _0x8366x3e) >= _0x8366x42 && Math.max(_0x8366x2c, _0x8366x3e) <= _0x8366x43) || _0x8366x36 == 0) {
            if (_0x8366x39 >= 8) {
                _0x8366x40.css('left', (_0x8366x41 * 209 - 78) + 'px')
            } else {
                if (_0x8366x35.indexOf('base_') > -1) {
                    _0x8366x40.css('left', (_0x8366x41 * 209 - 118) + 'px');
                    _0x8366x40.css('top', (Math.min(_0x8366x2b, _0x8366x3f) * 126 - 46) + 'px');
                } else {
                    _0x8366x40.css('left', (_0x8366x41 * 209 - 138) + 'px')
                }
            };
            _0x8366x40.css('top', (Math.min(_0x8366x2b, _0x8366x3f) * 126 - 48) + 'px');
            _0x8366x40.text((_0x8366x16 + 1));
            _0x8366x38.append(_0x8366x40);
        };
        _0x8366x3b.unshift(_0x8366x3e + ':' + (5 - _0x8366x3f));
        if (_0x8366x16 == 0) {
            _0x8366x3b.unshift(_0x8366x2c + ':' + (5 - _0x8366x2b))
        };
    };
    for (var _0x8366xb in _0x8366x9.routes) {
        var _0x8366x44 = _0x8366xb[1] == 0 ? 10 : _0x8366xb[1];
        if ((_0x8366x44 >= _0x8366x42 && _0x8366x44 <= _0x8366x43) || _0x8366x36 == 0) {
            var _0x8366x41 = _0x8366x44;
            if (_0x8366x36 > 0) {
                switch (parseInt(_0x8366x39)) {
                case 4:
                    _0x8366x41 -= 1;
                    break;;;;;;;;
                case 5:
                    _0x8366x41 -= 2;
                    break;;;;;;;;
                case 6:
                    _0x8366x41 -= 3;
                    break;;;;;;;;
                case 7:
                    _0x8366x41 -= 4;
                    break;;;;;;;;
                case 8:
                    ;;;;;;;
                case 9:
                    ;;;;;;;
                case 10:
                    _0x8366x41 -= 5;
                    break;;;;;;;;
                }
            };
            var _0x8366x12 = _0x8366x9.routes[_0x8366xb];
            var _0x8366x45 = null;
            if (_0x8366x12.reward && _0x8366x12.reward.type == 'external' && _0x8366x12.reward.id != _0x8366x9.reward.id) {
                var _0x8366x46 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAA';
                _0x8366x46 += 'RnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/';
                _0x8366x46 += 'NCNwAABaZJREFUSEutVw1IlWcU1tRZSmmmZOpIDcmYEeJPmVMwp/2oGRk6wR+i2agVBBWmGamYm0HNVIqGyjSmjlgwXM0NZ';
                _0x8366x46 += 'yj+LjM1xbI/h3oR/M35U97vPd+e8+G96C3b9W4vHPCe95zznPc75zzvq5GRfusjmEVA8s3NzRvc3d1VO3bseOvn56feunXr';
                _0x8366x46 += 'yKpVq5qwlwvZB2Hb/7yMESHJ2dl54OLFi+LBgwc0Nzcn6y7WNTc304ULF4Srq6sKPl9B2NegtcLY2Lj4/Pnz4s2bN++ALaX';
                _0x8366x46 += 'gJDgB+H5nKHhaTk6O0BtRxzArK0sAOHm5R3betWvXLBEZiiuzb2Bg4DSAP14O+KXq6mrDUefTraqqIoBm6A28du3aP9Vqtd';
                _0x8366x46 += 'zS0mIweFNTE01NTclr1qxp1BvY29t7uLu7m44ePWpwjdFgdP/+feJYegN7enoOdXV10cmTJw0GTk9PF7W1teTv7/+33sDW1';
                _0x8366x46 += 'tbN09PTFBQUZDBwWFiYGB0dpc2bN7/SGxiG3zJZHDhwQHFebmvzLAcHB4v+/n7CPP+4HGC/48ePi2PHjomnT59SZWUl15s';
                _0x8366x46 += 'wYrRlyxa6e/euNhnuftbh61BSUhLduXOHONlDhw6J5ORknuWw5QAbgX9/9/LyEtwgyFqGs1ZiYmK0wIcPH+aRWbTP9Llp0ya';
                _0x8366x46 += 'xcuXK3/RhL11y32hjYzPJJ9YNfOPGDS1wSUnJO/vt7e2Ei2QWfnYLTsvcba97+r1ogrc42c0FGZrh0yokDQbSBvfx8SGecc0';
                _0x8366x46 += 'SQsgBAQHafYyPklR0dDR/Zg2wiZmZ2U++vr6si1wIfvPZs2d05swZ3uDrj5fl/v37la7GqWVcgYRPT319fTJfGqdOnaLTp0';
                _0x8366x46 += '/T7OysPDg4KG/fvp0QmHgM2Qcl4Fgb52NFZ2Zmit7eXk6QD6csa0tLy05mmZGREcK1Ngjd55AVqNNffCLddfXqVU5Cxp1MuE';
                _0x8366x46 += 'je2/XggnHEMIfEIs7g+Pi4zCNqZWXVA50NN1FVTU2N1vn169dyWlqagEEbDGoSExNFT0/PouCYUQ2wCA0NXbTHJ54/7UP0yGM';
                _0x8366x46 += 'mkomJCW3udXV1BMxqI0dHR1VeXh5lZ2cLGNGLFy+UQMPDw3Tu3DmxevVqsrW1Fai3UKlUyl5ERARFRkZSVFQU7d69W9FhhFgv7O';
                _0x8366x46 += '3tFR++x8fGxpQ9lIc4AcZgLAcHB4VU1kNiIOGQfWiCXxMSEpT5ZaehoSFC80igT4kDs+7Jkyc0OTkps2hqGhsbK/B1JE4QNVd8n';
                _0x8366x46 += 'z9/TkeOHBF4LlXPx+f+YSzGfO/yNTU1rYyLi1MS2LNnjygoKBAHDx4Ujx49Iq4VB+b6ozTU2trKpxcYMxESEqKUJj4+XvAhEN';
                _0x8366x46 += '1/KZAP6X2QwC/r1q0Tubm5ElhJKi4upoyMDMFfAGwmcXmgU9++fVtiYPC8BJ+fEdTXEMCFPpb40c43TUpKikhNTRWovXTixAk';
                _0x8366x46 += 'JFCmdPXtWYh3TY2NjI5mYmLTDnn0MXsxkX+KF2b9t2zbBDYIxEnhtqsvLy6XCwkI1Pr9069YtgRmly5cvK7X18PAQbm5uQ/';
                _0x8366x46 += 'BNhVjpgx4EoxRIFCTZycmp78qVKzQzMyOXlpYS/811HRgYoLKyMrp+/brIz88XDMy3EO9du3aNioqKFGaDnpMYQ6xLkNj5R';
                _0x8366x46 += 'D7VTcQWzDPHtxADVFRUkOZJy4QPypzBXPcxB7/DJvOKtrY2JodXO3funOKyaJqPYyJBunfvHseRAOy+ENwEb6Mmvok0gZlC';
                _0x8366x46 += 'wbcS+PsHGLpAHNE4D7meTAIvX75UhEGYajG7/N+EA8QJUhgeHj7X2dmpjdfQ0EB2dnaPsWehe2prME0vP0s7OjrIwsKiFQ';
                _0x8366x46 += 'beOkam+L0X8g3ke0gJ5GvIZ5AVOrafYH7r6uvrFXAXF5cB7NsuVfMyriEIg9/Drvo0xr/YrMflMgWiISTxx4ds49BUEzBI';
                _0x8366x46 += '+B9ANSFiNmzYMIofXyyM+Q/3r//b2sv7sQAAAABJRU5ErkJggg==';
                var _0x8366x47 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1';
                _0x8366x47 += 'BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAyVJ';
                _0x8366x47 += 'REFUSEtj+P//PwMSZgSyQZjp/PnzeefOnSsCspmhYiBxZLUwNkwPMTRcPzZLQQZ4y8vL/5eUlPz/8+fPICSLYYajO4AYS2EOB';
                _0x8366x47 += '9MgA7BpMnZxcfljZ2f398+fP1Y4LCbWMqzqcFnMuHz58pMrV648AbRUHIjtnj9/ngMUm9PU1HQiLy/vVWpq6t+0tLSf5eXlN';
                _0x8366x47 += '3bs2DEJqEYQyYGg6BEDYhYcHmPEaXFNTc1poKH/fX19/2toaPxnYWEBhg8DVmxkZAQ0/3/ay5cvM2fNmrUqKyvrHUhfTk7O68u';
                _0x8366x47 += 'XL8djsxynxVVVVeeSkpJwWobsCHNz8/8eHh7/2djYMNRPnjx5DUkWV1RUXCLWYhsbm//q6upYHTlhwoT1JFlcVlZ2lViLHR0d';
                _0x8366x47 += '/yspKWG1uK+vbyNJFpeUlNwg1mJXV9f/srKyWC3u7e3dTJLFxcXFt4m12MvLC5znsSW+np6erdCCByVbwRIXRiIrLCy8l5yc';
                _0x8366x47 += 'TFTi8vf3/y8iIoJVbXd3N7LFcPtwWlxQUPCQWItDQkL+8/Pz47J4G5KPCVsMLCSeEGtxZGTkfy4uLur4ODc39wWxFsfGxmLN';
                _0x8366x47 += 'w6A4B8bxFpJ8nJ2d/ZpYi0GJkJGREauP+/v7QdkJPUrhlQRG4gIVe+gWs7Oz/zczM/ufmJj4A5j4HhQVFd0BWvqtvr4eZyIE';
                _0x8366x47 += 'llyrSbI4IyPjY3p6+n9LS8v/wGB/PWPGjDXPnj3LBhqiD8Rs0LwJcjD79u3bz8B8DKL19fX/A+P9n62t7f8FQECSxUBLvzQ';
                _0x8366x47 += '0NNwHatIFYlhjACPIQA5YvHjxZmDo/APm/YfAmmoiUMwCiLmAWOvv37/2JFkMrPK+g8prtFIHq8VQNUzYLEAKGaIaAozA+vYX';
                _0x8366x47 += 'sFq8jGQxclMHVwsEW9MIqxiuapEJGHR/gBZfQfMFso/Rm01EWwoyE5fFLAkJCX9BNRQJPqaKxWxxcXH/B8Jizujo6P+lpaXX';
                _0x8366x47 += '6B3UPBERESCLr9M7qPlDQ0NBFt+gt8VCgYGB/4GtkJv0DmpRPz8/mMXovQdsXRlc3RucKR1XdpLw9vb+DywCb9E7qCWnTJn';
                _0x8366x47 += 'ybe3atQdoFdQAhsbbIoMM1QMAAAAASUVORK5CYII=';
                var _0x8366x48 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAAR';
                _0x8366x48 += 'nQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/';
                _0x8366x48 += 'NCNwAACTZJREFUSEutlgdUlGcWhmfGAWNEDbGvhSJSVCYiiAKKa0NXEAsCaiSKHewg6MoxirgCirAWEImFLogiDC0uzQ';
                _0x8366x48 += 'qDUgVkQEDaMDB0RJIozps7v8K6a4m7J5zznJkz/P/33Pve7y8s1if+/P39OVFRUbYFBQUZIpGou7Ozs6OhoeFAUVER+1P';
                _0x8366x48 += 'n/Cm/m5ubh+zZswdZWVno6elBd3c3WlpaUFZWtvlLBKFhYf19fHyW8/lxh0tLy7Y2N7eM/JLzWDwer8PIyAjGxsYIDQ1F';
                _0x8366x48 += 'a2srqHMIhcLG7Oxshc8tQv+fc+yY2zMCXV1dkEqlePXqVXNbW/v0P5RbW1uXU9ewsrKCpaUlYmJiUFtbC4FAgMzMzJ0f';
                _0x8366x48 += 'W4CEbIEga5+7h+crs6XLoD9jJo66uuKXX39F18uXaGvvKBc3NPb/rNzPz8/Rzs4Ojo6OcHZ2hpOT02+VlZXC+Ph48G9F';
                _0x8366x48 += 'F4t0v14knsxVqteQ4/YuVFz81DUwKARep32wZ6+DyGyp+aW1a793p07R0toGSVMTSLzss2J3d3f5Gzdu3AwKCgIVAVe';
                _0x8366x48 += 'q3Ovw3+uzswTwPn0aeUu1IdaWQ70mt6NOTS6j8PRxfsBPl6ShoWFITEyKzcvLn1hfX88l0fhGCSNEdU0tqDjHj4rfZM';
                _0x8366x48 += 'eweuK9RotCXddmpqdcyS8oeB0TG4tTp05h27Zt8PT0REJCAnJycnA/8ALu2poj58A27Hfcj/O+figtLUVGUiLu7LOTZ';
                _0x8366x48 += 'k0eK3ritOv+o8fZSL9zF7G0TtDly7aMWNrdwXrzTDDqTcldyzd5CX5vHoaV9Px8Vvr6pivaw48gNzmWWSw1NRXe3t7';
                _0x8366x48 += 'Yu3cvKAlms8lmfuDAAdoDVnBzO467/mdxf9ZkVPylP6pGyUGoPhxJIcFISUkhUpHg5Y5aE72utOmTnrB+8XXLkRY86';
                _0x8366x48 += 'JFW5qMpJxW1hY8grqpAaVEBaLMwnT24R9UGnENaZBAy7t+Dg4MDPDw8mBFYW6/GbOM5MDUzx0oLS2xYZQF7g+nYr8vDS';
                _0x8366x48 += 'WcnOuYCQtzdkGS/Abdn8HBOYQBO9WP9xmownfG6YZEeJCvmosPVEQLPo0i/dAHJVyjGmEgI7qTjeUkxOtrbIZFIUJifh';
                _0x8366x48 += '9uezog8eYTpuCTqKm6b8uBrMR+Htthi567dsLPfQWPZDg8aS1paGmJ32cNbvh/BwtmBLPgNZtWzmiz0XohnjUeNqjxql';
                _0x8366x48 += 'ORRPVYOteqKELsdRH29mLlxyK7F4uQ4FB9ZA/GKQehcIodyh78hPz8fwmwBJHOGQDKNiwYeF6XGSsjatwkpVy/TJRiL';
                _0x8366x48 += '07QRL622gN8QFgKGsnFlJBtBY9jPWK0208SSBaMhnko7lHapaJIc6jTkULZjDW2iRGYj8YMCIdIZgxZTPXSuNUL3xpn';
                _0x8366x48 += 'o3KgD4cN0CNMSIDq+FW2mKqiznoUUQ234Kw5A4A9rcDP61lvsfkDwGDbClQlVNi6OZ/NZrRunZLaYD0XTHDlIZsmhcS';
                _0x8366x48 += 'YXjfpc1BzZgty8PJpzDlKvX0OdJhU0kdJQldGfihyG6sV66PLcj+qLXuBPU4fv4H59nUXv3ITc3HxaIx9pLnaIVGfj';
                _0x8366x48 += '/Dg2PIZx4KbIPsd6rPqVZp5Gfwh1KObZ8mheyEXLApJ72aO2ToSa2jpkJcYxxTTocSHW4aKeIhVNpnSomFYrQ6RbLOi';
                _0x8366x48 += 'LMXjs284SHLfg6VMhnpYIEXdwByP0Ic4SHoqcc6xcZTlNAr1k06yLePKo8nKEiGYsI/t2PFqooOZ5XEqGmMWFxJCKm8';
                _0x8366x48 += 'FFhxUPd+dqMLLramxEa7ERq81GkvMmPCksZoh1sGeEvkM5uECcUuSc/EDcW4DwqAPqqOM6UT2y+DcgWiSP9uVctJtza';
                _0x8366x48 += 'Z5ctC6mZKiYzjUaeLBAiZEl6LARQ/ircBC2YyPFXMDA37udEQYQlwnvT4pV5FF64hATs4zMWzdQqDkYT6YMQZmBAmpM';
                _0x8366x48 += 'vkKrBUlXETZjkGkyAnw9Di6qcnDyXaTh2zfg0eNcPM7ORdzubYwwkAghzityfvyg4zyS5qsNQKmHC6ro3iq7v8rEJVO';
                _0x8366x48 += '+RYn2UAh5wyD8bhiK6bN05jeoXDJcGjhpYJ/wDInP0+LXtq5HpuARQ/zOLYwwnIgkflLk7PkPcR7t1gK1r1GooYAybz';
                _0x8366x48 += 'c8r6pmyIyOQunU4SjTGYln00a9RXc0Q42ZrtR/vAJ6hb2RXttsg3v3M3DvQSbi7TchgoRRRLQsbkXO/j7xv6WDUKxFk';
                _0x8366x48 += 'focR0Xlc4aMiFCUk6RCbwwqpo9Fpb6McaicMQ51y/RxmcTvz1AW6bWN3yPtzj16ONxDwnZbRhhLxL0Vv+1YFm8BxVuo';
                _0x8366x48 += 'QdJJ3zCxlvmeQnlFJcPDayGM5PlMJVQZKKPKUAXV7xAtn4ngcQp9MwymhcOICNs1SE5JR3JqOhK3rWeE8e+4OEzehUW';
                _0x8366x48 += 'dauZPIKm6AtOpTFpKMyy/6M3EXPG8ium4ZrYSamerEBNQazwRde8QrzRABIn7hO8ijVi/Gkm3kxkSt9j0SSOH9pO6ay';
                _0x8366x48 += 'kfZ1Gnmk/UB6JIazCe9kr1RqAq+AJzDdfRe1ZWVDjE85UJVWIixPM0UD9Pi6HBwgg3Sfz+DGWRRtpYIS7hZ8TL2LQOf';
                _0x8366x48 += 'Nk1PE6x+/BfZ112sbQcyUrXHKb9RH0Qnk5WpB07FOV6wynOkai9FoDmllY0NTUj53owJItV0LR4AqFO37UgWTQFjQu1';
                _0x8366x48 += '0Wg5G3wSvz9DWaQR6+g9LTYeMfx4mreN9MR3mkUuK1eYk/Tt6/ER0yVDvI30AyJ11RsE2iN6KmeMoChHQRwTwrygdb5';
                _0x8366x48 += '4gfybYWhdqkJMIDSISfTA4KF5yVQ0Wc9BEonfn6FMHL7WAlE3bsHvn2c6ftxo60FCxQ9eeehHFjHm8PJl687O1o+PM1';
                _0x8366x48 += 'BvLgjyl76kRyK9lqIoNgLtK5TRsUKN0CSm0F1sKtrMddG8Zi7+ReLejdP7GWBu8uYfTs73D1lb6/3hK63sAFkUxLh9V';
                _0x8366x48 += 'labTxw8mHY9LKwz2d8HL1Yp4YWlGqFF33nENHSu1EfL2nlIfk9861sOzkwYJXExmb+P1hnwRdKPHUQnq7gsNdt91Vjn';
                _0x8366x48 += '7oP5Gp0NZhOlL62n4qX1dLy0MkDbugV94sCRA14d0+NF0znq/7fwv0+kxTiE5vGF8/eHz9HNeLxwalfLcn2025ggjjr';
                _0x8366x48 += '2nji22mWxiQ0d0+9Pk360iFWrpnjMNT50y8RQ4G6oe56Eo/8X4e+nYsoykxG66gAAAABJRU5ErkJggg==';
                switch (_0x8366x12.reward.id) {
                case 'town00_1_quest_item_step_0':
                    ;;;;;;;
                case 'town00_1_quest_item_step_1':
                    ;;;;;;;
                case 'town00_1_quest_item_step_2':
                    if (_0x8366x9.reward.id != 'town_map1_step1') {
                        var _0x8366x49 = 'town_map1_step1';
                        _0x8366x45 = _0x8366x48;
                    };
                    break;;;;;;;;
                case 'town_quest_item_step_0':
                    ;;;;;;;
                case 'town_quest_item_step_1':
                    ;;;;;;;
                case 'town_quest_item_step_2':
                    if (_0x8366x9.reward.id != 'town00_map_step3') {
                        var _0x8366x49 = 'town00_map_step3';
                        _0x8366x45 = _0x8366x48;
                    };
                    break;;;;;;;;
                case 'town_quest_item_step_20':
                    ;;;;;;;
                case 'town_quest_item_step_21':
                    ;;;;;;;
                case 'town_quest_item_step_22':
                    if (_0x8366x9.reward.id != 'town_map1_step5') {
                        var _0x8366x49 = 'town_map1_step5';
                        _0x8366x45 = _0x8366x46;
                        var _0x8366x4a = true;
                    };
                    break;;;;;;;;
                case 'town_quest_item_step_10':
                    ;;;;;;;
                case 'town_quest_item_step_11':
                    ;;;;;;;
                case 'town_quest_item_step_12':
                    if (_0x8366x9.reward.id != 'town_map1_step2') {
                        var _0x8366x49 = 'town_map1_step2';
                        _0x8366x45 = _0x8366x46;
                        var _0x8366x4b = true;
                    };
                    break;;;;;;;;
                case 'town_quest_item_step_13':
                    if (_0x8366x9.reward.id != 'town_map1_step3') {
                        var _0x8366x49 = 'town_map1_step3';
                        _0x8366x45 = _0x8366x46;
                        var _0x8366x4c = true;
                    };
                    break;;;;;;;;
                case 'town00_map_step6':
                    var _0x8366x49 = 'town00_map_step6';
                    _0x8366x45 = _0x8366x46;
                    var _0x8366x4d = true;
                    break;;;;;;;;
                case 'town_map1_step4':
                    var _0x8366x49 = 'town_map1_step4';
                    _0x8366x45 = _0x8366x46;
                    var _0x8366x4e = true;
                    break;;;;;;;;
                case 'town_map1_step2':
                    var _0x8366x49 = 'town_map1_step2';
                    _0x8366x45 = _0x8366x46;
                    var _0x8366x4b = true;
                    break;;;;;;;;
                case 'town_map1_step3':
                    var _0x8366x49 = 'town_map1_step3';
                    _0x8366x45 = _0x8366x46;
                    var _0x8366x4c = true;
                    break;;;;;;;;
                case 'town_map1_step2_last':
                    var _0x8366x49 = 'town_map1_step2_last';
                    _0x8366x45 = _0x8366x48;
                    break;;;;;;;;
                case 'town_map1_step5_last':
                    var _0x8366x49 = 'town_map1_step5_last';
                    _0x8366x45 = _0x8366x48;
                    break;;;;;;;;
                case 'town_map1_step1':
                    var _0x8366x49 = _0x8366x12.reward.id;
                    _0x8366x45 = _0x8366x48;
                    break;;;;;;;;
                default:
                    var _0x8366x49 = _0x8366x12.reward.id;
                    _0x8366x45 = _0x8366x47;
                    break;;;;;;;;
                };
            };
            if (_0x8366x45) {
                if (_0x8366x39 >= 8) {
                    var _0x8366x4f = _0x8366x44 == 10 ? parseInt(_0x8366xb[0]) - 1 : parseInt(_0x8366xb[0]);
                    var _0x8366x40 = $('<img alt="" />').css({
                        position: 'absolute',
                        width: '30px',
                        left: (parseInt(_0x8366x41) * 209 - 90) + 'px',
                        top: (_0x8366x4f * 126 - 55) + 'px'
                    }).attr('src', _0x8366x45).attr('title', _0x8366x49);
                } else {
                    if (_0x8366x35.indexOf('base_') > -1) {
                        var _0x8366x40 = $('<img alt="" />').css({
                            position: 'absolute',
                            width: '30px',
                            left: (parseInt(_0x8366x41) * 209 - 125) + 'px',
                            top: (parseInt(_0x8366xb[0]) * 126 - 50) + 'px'
                        }).attr('src', _0x8366x45).attr('title', _0x8366x49)
                    } else {
                        var _0x8366x40 = $('<img alt="" />').css({
                            position: 'absolute',
                            width: '30px',
                            left: (parseInt(_0x8366x41) * 209 - 145) + 'px',
                            top: (parseInt(_0x8366xb[0]) * 126 - 55) + 'px'
                        }).attr('src', _0x8366x45).attr('title', _0x8366x49)
                    }
                };
                _0x8366x38.append(_0x8366x40);
            };
        };
    };
    if (!_0x8366x9) {
        $('.map').html('карта не найдена :(')
    } else {
        switch (_0x8366x9.reward.id) {
        case 'town00_map_step1':
            var _0x8366x50 = 'Награда №1';
            break;;;;;;;;
        case 'town00_map_step3':
            var _0x8366x50 = 'Награда №2';
            break;;;;;;;;
        case 'town00_map_step5':
            var _0x8366x50 = 'Награда №3';
            break;;;;;;;;
        case 'town00_map_step5_x2':
            var _0x8366x50 = 'Награда №3 (x2)';
            break;;;;;;;;
        case 'town00_map_step5_x3':
            var _0x8366x50 = 'Награда №3 (x3)';
            break;;;;;;;;
        case 'town_map1_step1':
            var _0x8366x50 = 'Погоня/Разведка №1';
            break;;;;;;;;
        case 'town_map1_step2':
            var _0x8366x50 = 'Погоня/Разведка №2';
            break;;;;;;;;
        case 'town_map1_step5':
            var _0x8366x50 = 'Погоня/Разведка №3';
            break;;;;;;;;
        case 'town_map1_step2_1':
            var _0x8366x50 = 'Операция №1';
            break;;;;;;;;
        case 'town00_map_step6':
            var _0x8366x50 = 'Награда №4';
            break;;;;;;;;
        case 'town_map1_step2_2':
            var _0x8366x50 = 'Порт №1';
            break;;;;;;;;
        case 'town_map1_step2_2_2':
            var _0x8366x50 = 'Порт №2';
            break;;;;;;;;
        case 'base_base_0':
            var _0x8366x50 = 'Базы №1';
            break;;;;;;;;
        case 'base_base_1':
            var _0x8366x50 = 'Базы №2';
            break;;;;;;;;
        case 'base_base_2':
            var _0x8366x50 = 'Базы №3';
            break;;;;;;;;
        case 'base_base_3':
            var _0x8366x50 = 'Базы №4';
            break;;;;;;;;
        case 'base_base_4':
            var _0x8366x50 = 'Базы №5';
            break;;;;;;;;
        case 'base_base_5':
            var _0x8366x50 = 'Базы №6';
            break;;;;;;;;
        case 'base_base_6':
            var _0x8366x50 = 'Базы №7';
            break;;;;;;;;
        case 'map_snow':
            var _0x8366x50 = 'Зимняя буря';
            break;;;;;;;;
        case 'map_snow_x2':
            var _0x8366x50 = 'Зимняя буря (x2)';
            break;;;;;;;;
        default:
            var _0x8366x50 = _0x8366x9.reward.id;;;;;;;;
        };
        var _0x8366x51 = ['Карта: ' + _0x8366x35, 'Набор наград: ' + _0x8366x50, 'Маршрут: ' + (_0x8366x34.length - 1) + ' ходов, ' + (_0x8366x34.length - 1) * 5 + ' провизии, ', _0x8366x3b.join(' -> ')];
        var _0x8366x52 = [];
        if (_0x8366x4e) {
            _0x8366x52.push('<b>На черепе</b> (town_map1_step4)');
            var _0x8366x53 = [];
            for (var _0x8366x16 = 0; _0x8366x16 < 1000; _0x8366x16++) {
                var _0x8366x12 = _0x8366x31(_0x8366x4.randoms.town_occasion_2 + _0x8366x16);
                if (_0x8366x12 < 0.7) {
                    var _0x8366x12 = _0x8366x31(_0x8366x4.randoms.town_occasion_2 + _0x8366x16 + 1);
                    if (_0x8366x53.length < 7) {
                        _0x8366x53.push(_0x8366x16)
                    };
                };
            };
            _0x8366x52.push('Патруль №2 (250хп): ' + (_0x8366x53.length > 0 ? _0x8366x53.join(', ') : '>1000'));
        };
        if (_0x8366x4b) {
            _0x8366x52.push('<b>На черепе</b> (town_map1_step2)');
            var _0x8366x54 = [],
                _0x8366x55 = [],
                _0x8366x56 = [];
            for (var _0x8366x16 = 0; _0x8366x16 < 1000; _0x8366x16++) {
                var _0x8366x12 = _0x8366x31(_0x8366x4.randoms.town_occasion_2 + _0x8366x16);
                if (_0x8366x12 < 0.1) {
                    var _0x8366x12 = _0x8366x31(_0x8366x4.randoms.town_occasion_2 + _0x8366x16 + 1);
                    if (_0x8366x12 < 12 / 24 && _0x8366x54.length < 7) {
                        _0x8366x54.push(_0x8366x16)
                    } else {
                        if (_0x8366x12 > 12 / 24 && _0x8366x12 < 18 / 24 && _0x8366x55.length < 7) {
                            _0x8366x55.push(_0x8366x16)
                        } else {
                            if (_0x8366x12 > 18 / 24 && _0x8366x56.length < 7) {
                                _0x8366x56.push(_0x8366x16)
                            }
                        }
                    };
                };
            };
            _0x8366x52.push('Патруль №1 (110хп): ' + (_0x8366x54.length > 0 ? _0x8366x54.join(', ') : '>1000'));
            _0x8366x52.push('Патруль №10 (350хп): ' + (_0x8366x55.length > 0 ? _0x8366x55.join(', ') : '>1000'));
            _0x8366x52.push('Патруль №11 (150хп): ' + (_0x8366x56.length > 0 ? _0x8366x56.join(', ') : '>1000'));
        };
        if (_0x8366x4d) {
            _0x8366x52.push('<b>На черепе</b> (town00_map_step6)');
            var _0x8366x57 = [],
                _0x8366x58 = [],
                _0x8366x59 = [],
                _0x8366x5a = [];
            for (var _0x8366x16 = 0; _0x8366x16 < 1000; _0x8366x16++) {
                var _0x8366x12 = _0x8366x31(_0x8366x4.randoms.town_occasion_2 + _0x8366x16);
                if (_0x8366x12 < 0.7) {
                    var _0x8366x12 = _0x8366x31(_0x8366x4.randoms.town_occasion_2 + _0x8366x16 + 1);
                    if (_0x8366x12 < 2 / 8 && _0x8366x57.length < 7) {
                        _0x8366x57.push(_0x8366x16)
                    } else {
                        if (_0x8366x12 > 2 / 8 && _0x8366x12 < 4 / 8 && _0x8366x58.length < 7) {
                            _0x8366x58.push(_0x8366x16)
                        } else {
                            if (_0x8366x12 > 4 / 8 && _0x8366x12 < 6 / 8 && _0x8366x59.length < 7) {
                                _0x8366x59.push(_0x8366x16)
                            } else {
                                if (_0x8366x12 > 6 / 8 && _0x8366x5a.length < 7) {
                                    _0x8366x5a.push(_0x8366x16)
                                }
                            }
                        }
                    };
                };
            };
            _0x8366x52.push('Патруль №5 (150хп): ' + (_0x8366x57.length > 0 ? _0x8366x57.join(', ') : '>1000'));
            _0x8366x52.push('Патруль №6 (110хп): ' + (_0x8366x58.length > 0 ? _0x8366x58.join(', ') : '>1000'));
            _0x8366x52.push('Патруль №7 (150хп): ' + (_0x8366x59.length > 0 ? _0x8366x59.join(', ') : '>1000'));
            _0x8366x52.push('Патруль №8 (250хп): ' + (_0x8366x5a.length > 0 ? _0x8366x5a.join(', ') : '>1000'));
        };
        if (_0x8366x4c) {
            _0x8366x52.push('<b>На черепе</b> (town_map1_step3)');
            var _0x8366x54 = [],
                _0x8366x5b = [],
                _0x8366x5c = [],
                _0x8366x5d = [],
                _0x8366x5e = [];
            for (var _0x8366x16 = 0; _0x8366x16 < 1000; _0x8366x16++) {
                var _0x8366x12 = _0x8366x31(_0x8366x4.randoms.town_occasion_2 + _0x8366x16);
                if (_0x8366x12 < 0.7) {
                    var _0x8366x12 = _0x8366x31(_0x8366x4.randoms.town_occasion_2 + _0x8366x16 + 1);
                    if (_0x8366x12 < 12 / 26 && _0x8366x54.length < 7) {
                        _0x8366x54.push(_0x8366x16)
                    } else {
                        if (_0x8366x12 > 12 / 26 && _0x8366x12 < 18 / 26 && _0x8366x5c.length < 7) {
                            _0x8366x5c.push(_0x8366x16)
                        } else {
                            if (_0x8366x12 > 18 / 26 && _0x8366x12 < 21 / 26 && _0x8366x5d.length < 7) {
                                _0x8366x5d.push(_0x8366x16)
                            } else {
                                if (_0x8366x12 > 21 / 26 && _0x8366x12 < 23 / 26 && _0x8366x5e.length < 7) {
                                    _0x8366x5e.push(_0x8366x16)
                                } else {
                                    if (_0x8366x12 > 23 / 26 && _0x8366x5b.length < 7) {
                                        _0x8366x5b.push(_0x8366x16)
                                    }
                                }
                            }
                        }
                    };
                };
            };
            _0x8366x52.push('Патруль №1 (110хп): ' + (_0x8366x54.length > 0 ? _0x8366x54.join(', ') : '>1000'));
            _0x8366x52.push('Сейф №0 (10 жет.): ' + (_0x8366x5b.length > 0 ? _0x8366x5b.join(', ') : '>1000'));
            _0x8366x52.push('Сейф №1 (10 тал.): ' + (_0x8366x5c.length > 0 ? _0x8366x5c.join(', ') : '>1000'));
            _0x8366x52.push('Сейф №2 (20 тал.): ' + (_0x8366x5d.length > 0 ? _0x8366x5d.join(', ') : '>1000'));
            _0x8366x52.push('Сейф №3 (50 тал.): ' + (_0x8366x5e.length > 0 ? _0x8366x5e.join(', ') : '>1000'));
        };
        if (_0x8366x4a) {
            _0x8366x52.push('<b>На черепе</b> (town_map1_step5)');
            var _0x8366x54 = [],
                _0x8366x53 = [],
                _0x8366x5b = [],
                _0x8366x5c = [],
                _0x8366x5d = [],
                _0x8366x5e = [];
            for (var _0x8366x16 = 0; _0x8366x16 < 1000; _0x8366x16++) {
                var _0x8366x12 = _0x8366x31(_0x8366x4.randoms.town_occasion_2 + _0x8366x16);
                if (_0x8366x12 < 12 / 34 && _0x8366x54.length < 7) {
                    _0x8366x54.push(_0x8366x16)
                } else {
                    if (_0x8366x12 > 12 / 34 && _0x8366x12 < 15 / 34 && _0x8366x5b.length < 7) {
                        _0x8366x5b.push(_0x8366x16)
                    } else {
                        if (_0x8366x12 > 15 / 34 && _0x8366x12 < 21 / 34 && _0x8366x5c.length < 7) {
                            _0x8366x5c.push(_0x8366x16)
                        } else {
                            if (_0x8366x12 > 21 / 34 && _0x8366x12 < 24 / 34 && _0x8366x5d.length < 7) {
                                _0x8366x5d.push(_0x8366x16)
                            } else {
                                if (_0x8366x12 > 24 / 34 && _0x8366x12 < 26 / 34 && _0x8366x5e.length < 7) {
                                    _0x8366x5e.push(_0x8366x16)
                                } else {
                                    if (_0x8366x12 > 26 / 34 && _0x8366x53.length < 7) {
                                        _0x8366x53.push(_0x8366x16)
                                    }
                                }
                            }
                        }
                    }
                };
            };
            _0x8366x52.push('Патруль №1 (110хп): ' + (_0x8366x54.length > 0 ? _0x8366x54.join(', ') : '>1000'));
            _0x8366x52.push('Патруль №2 (250хп): ' + (_0x8366x53.length > 0 ? _0x8366x53.join(', ') : '>1000'));
            _0x8366x52.push('Сейф №0 (10 жет.): ' + (_0x8366x5b.length > 0 ? _0x8366x5b.join(', ') : '>1000'));
            _0x8366x52.push('Сейф №1 (10 тал.): ' + (_0x8366x5c.length > 0 ? _0x8366x5c.join(', ') : '>1000'));
            _0x8366x52.push('Сейф №2 (20 тал.): ' + (_0x8366x5d.length > 0 ? _0x8366x5d.join(', ') : '>1000'));
            _0x8366x52.push('Сейф №3 (50 тал.): ' + (_0x8366x5e.length > 0 ? _0x8366x5e.join(', ') : '>1000'));
        };
        _0x8366x51[0] = '<div style="float:right;margin-right:10px; margin-left: 10px">' + _0x8366x52.join('<br>') + '</div>' + _0x8366x51[0];
        $('.map').html(_0x8366x51.join('<br>'));
    };
    function _0x8366x5f(_0x8366x60) {
        var _0x8366x61 = _0x8366x60.k;
        var _0x8366x12 = _0x8366x31(_0x8366x61);
        if (_0x8366x12 <= 0.5) {
            _0x8366x61++
        };
        _0x8366x12 = _0x8366x31(_0x8366x61 + 13);
        if (_0x8366x12 <= 0.005) {
            _0x8366x60.kum = true
        };
        _0x8366x61 += 27;
        _0x8366x12 = _0x8366x31(_0x8366x61 - 4);
        if (_0x8366x12 <= 0.16) {
            _0x8366x61++
        };
        _0x8366x12 = _0x8366x31(_0x8366x61 - 1);
        if (_0x8366x12 <= 0.03) {
            _0x8366x60.tal = true
        };
        _0x8366x60.k = _0x8366x61;
    }
    function _0x8366x62(_0x8366x63, _0x8366x64) {
        var _0x8366x60 = {
            k: _0x8366x63
        };
        for (var _0x8366x16 = 0; _0x8366x16 < _0x8366x64; _0x8366x16++) {
            _0x8366x5f(_0x8366x60)
        };
        _0x8366x63 = _0x8366x60.k;
        var _0x8366x1e = 1000;
        var _0x8366x65 = 0;
        var _0x8366x66 = null;
        for (var _0x8366x25 = -2; _0x8366x25 < 50; _0x8366x25 += 2) {
            _0x8366x60 = {
                k: _0x8366x63
            };
            if (_0x8366x25 >= 0) {
                for (var _0x8366x15 = 0; _0x8366x15 < _0x8366x25; _0x8366x15++) {
                    _0x8366x5f(_0x8366x60)
                };
                _0x8366x60 = {
                    k: _0x8366x60.k - 1
                };
            };
            for (var _0x8366x15 = 0; _0x8366x15 < 100 - _0x8366x25; _0x8366x15++) {
                _0x8366x5f(_0x8366x60);
                if (_0x8366x60.kum || _0x8366x60.tal) {
                    if (_0x8366x1e > _0x8366x15 + _0x8366x25) {
                        _0x8366x1e = _0x8366x15 + _0x8366x25;
                        _0x8366x65 = _0x8366x25;
                        _0x8366x66 = _0x8366x60.kum ? 'k' : 't';
                    };
                    break;
                };
            };
        };
        return {
            min: _0x8366x1e,
            minWait: _0x8366x65,
            skip: _0x8366x64,
            minRew: _0x8366x66
        };
    }
}