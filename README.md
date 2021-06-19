# Userscript который позволяет просматривать игровую статистику
> Расширение для браузера, отображающее игровую статистику. Использует API расширения Tampermonkey.


**По причине закрытия игры, расширение не работает. Если необходимо портировать под другие игры, писать сюда: https://vk.com/askja_vk


Для работы необходимо:
- Загрузить все файлы на любой хостинг
- Установить расширение [Tampermonkey](https://www.tampermonkey.net/)
- Установить скрипт любым удобным способом:

**1. Ручной способ**
- Переходим в панель управления Tampermonkey
- Создаем новый скрипт
- Помещаем туда следующий код:
```javascript
// ==UserScript==
// @name         Скрипт.bn1
// @namespace    script/info
// @version      1.0.04
// @description  Скрипт для приложения в окопе, без принудительных подписок на группу [RC-1]
// @author       Askja [vk.com/askja_vk]
// @copyright    2020, Askja (https://openuserjs.org/users/Askja)
// @license      MIT
// @downloadURL  https://openuserjs.org/install/Askja/Скрипт.bn1.user.js
// @updateURL    https://openuserjs.org/meta/Askja/Скрипт.bn1.meta.js
// @match        vk.com/*
// @include      https://vk.com/*
// @connect      l902892b.beget.tech
// @connect      api.vk.com
// @connect      5.178.83.91
// @connect      5.178.83.92
// @require      http://l902892b.beget.tech/script/js/jquery.js
// @require      http://l902892b.beget.tech/script/js/pako.js
// @require      http://l902892b.beget.tech/script/js/collections.js
// @require      http://l902892b.beget.tech/script/js/headers.js?v=3
// @require      http://l902892b.beget.tech/script/js/badges.js?v=1
// @require      http://l902892b.beget.tech/script/js/str.js
// @require      http://l902892b.beget.tech/script/js/helpers.js?v=2
// @require      http://l902892b.beget.tech/script/js/ArrayHelper.js
// @require      http://l902892b.beget.tech/script/js/DataPack.js?v=1
// @require      http://l902892b.beget.tech/script/js/statuses.js
// @require      http://l902892b.beget.tech/script/js/talents.js
// @require      http://l902892b.beget.tech/script/js/decksPack.js
// @require      http://l902892b.beget.tech/script/js/deckEffectsPack.js
// @require      http://l902892b.beget.tech/script/js/Parser.js?v=6
// @require      http://l902892b.beget.tech/script/js/sirenia.js?v=2
// @require      http://l902892b.beget.tech/script/js/Requests.js?v=95
// @require      http://l902892b.beget.tech/script/js/formatter.js?v=6
// @require      http://l902892b.beget.tech/script/js/player.js?v=65
// @require      http://l902892b.beget.tech/script/js/guild.js?v=100
// @require      http://l902892b.beget.tech/script/js/App.js?v=585
// @resource     CSS http://l902892b.beget.tech/script/css/script.css?v=150
// @grant        GM.xmlHttpRequest
// @grant        GM.addStyle
// @grant        GM.notification
// @grant        GM.log
// @grant        GM.getResourceText
// @run-at       document-body
// ==/UserScript==

let app = new App,
  selfGameData = {};
! function () {
  GM.getResourceText("CSS").then(function(css){
      GM.addStyle(css);
  });
  new MutationObserver(function (e, t) {
    app.init()
  }).observe(document.querySelector("body"), {
    childList: !0,
    subtree: !0
  })
}();
```

- Сохраняем, готово!

**2. Автоматическая установка**
- Перейти по [этому](https://openuserjs.org/scripts/Askja/%D0%A1%D0%BA%D1%80%D0%B8%D0%BF%D1%82.bn1) адресу и нажать установить
- Готово

## Как выглядит
![На личной странице](https://sun9-54.userapi.com/impg/UWbcDKZIRXWp9g-NtBeiQujEpbpcrxxXhXfr-Q/nV751J8iuPs.jpg?size=795x616&quality=96&sign=00b0eb187fc3fe2a441c64c8af3e74f5&type=album)
![На странице друга](https://sun9-41.userapi.com/impg/FXCqmVpOIuvNa5B5cqcD2w3hl6BLCfX4SEGhBA/Q3XOK5qV9JA.jpg?size=800x441&quality=96&sign=5d910fb67061beaf11b248d9099cf879&type=album)
