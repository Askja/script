function Secret(app) {
    this.app = app;
    this.data = null;
    this.map = null;
    this.injected = false;

    this.start = function() {
        if (app.notEnoughData() && !app.loadingKeys) {
            app.loadingKeys = true;
            return app.getParser().getKeysByApp(true);
        }
        if (app.getSecrets().injected) {
            return;
        }
        var apps = document.getElementById("apps");
        var first = apps.firstChild;

        var html = '<div class="bn1-secret">';

        html += '<div class="bn1-secrets-menu">';
        html += '<div class="bn1-secret-menu bn1-secret-menu-active item-resources">Основное</div><div class="bn1-secret-menu item-map">Маршрут</div><div class="bn1-secret-menu item-rewards">Награды</div>';
        html += '</div>';
        html += '<div class="bn1-secret-content">';
        html += '<div class="bn1-secrets-content-block bn1-visible resources">Resources</div>';
        html += '<div class="bn1-secrets-content-block map">Map</div>';
        html += '<div class="bn1-secrets-content-block rewards">Rewards</div>';
        html += '</div>';

        html += '</div>';

        $("#apps").before(html);
        app.getSecrets().injected = true;
        app.getSecrets().bindMenu();
        app.getSecrets().auth();
    };

    this.toggleMenu = function(i) {
        let items = ["map", "rewards", "resources"];

        for (var item of items) {
            if (i === item) {
                $("." + item).addClass("bn1-visible");
                $(".item-" + item).addClass("bn1-secret-menu-active");
            } else {
                $("." + item).removeClass("bn1-visible");
                $(".item-" + item).removeClass("bn1-secret-menu-active");
            }
        }
    };

    this.bindMenu = function() {
        $(".item-resources").click(function() {
            app.getSecrets().toggleMenu('resources');
        });
        $(".item-rewards").click(function() {
            app.getSecrets().toggleMenu('rewards');
        });
        $(".item-map").click(function() {
            app.getSecrets().toggleMenu('map');
            
            var _0x8366x4 = app.getSecrets().data;
                    
            _0x8366x3(_0x8366x4, _0x8366x33);
        });
    };

    this.auth = function() {
        app.getSecrets().data = null;

        app.getRequest().get(function(response) {
            if (response.status === 200) {
                try {
                    let data = JSON.parse(gzuncompress(response.responseText));

                    if (
                        typeof data.error === "undefined" &&
                        data !== null &&
                        typeof data.time !== "undefined"
                    ) {
                        app.getSecrets().data = data;

                        GM.log(data.time);
                    } else {
                        GM.log('Repeat...');
                    }
                } catch (er) {
                    GM.log(er);
                }
            }

            setTimeout(app.getSecrets().auth, 5000);
        });
    };

    this.getApp = function() {
        return this.app;
    };

    this.getMap = function() {
        if (this.map === null) {
            this.map = new SecretsMap();
        }

        return this.map;
    };
}