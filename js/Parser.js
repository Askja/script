function Parser() {
    this.getUserID = function () {

        let $elements = document.querySelectorAll("div.page_actions_inner > a");

        if ($elements.length) {
            for (let $i in $elements) {
                if ($elements.hasOwnProperty($i) && typeof parseInt($i) === "number") {
                    let $element = $elements[$i];
                    let $onClick = $element.getAttribute('onclick');

                    if (
                        typeof $onClick !== "undefined"
                         && $onClick !== null
                         && $onClick.indexOf('abuse.php') > -1
                         && $onClick.indexOf('oid: ') > -1
					) {
                        return $onClick.split('oid: ')[1].split('}')[0];
                    }
					
					if (
                        typeof $onClick !== "undefined"
                         && $onClick !== null
                         && $onClick.indexOf('openAbuseBox(') > -1
					) {
                        return $onClick.split('.openAbuseBox(')[1].split(',')[0];
                    }
                }
            }
        }

        $elements = document.querySelectorAll(".ui_tab");

        if ($elements.length) {
            for (let $i in $elements) {
                if ($elements.hasOwnProperty($i) && typeof parseInt($i) === "number") {
                    let $element = $elements[$i];
                    let $href = $element.getAttribute('href');

                    if (
                        typeof $href !== "undefined"
                         && $href !== null
                         && $href.indexOf('wall') > -1
                         && $href.indexOf('?') > -1
					) {
                        return $href.split('wall')[1].split('?')[0];
                    }
                }
            }
        }

        return false;
    };

    this.getKeysByApp = function (secret = false) {
        (new Requests()).request("https://vk.com/app3611950", function (response) {
            let matchAuthKey = response.responseText.match(/auth_key":"[^"]+/gm);
            let matchSelfID = response.responseText.match(/viewer_id":[^,]+/gm);

            if (matchAuthKey.length) {
                app.authKey = matchAuthKey[0].split('auth_key":"')[1];
            }

            if (matchSelfID.length) {
                app.selfID = parseInt(matchSelfID[0].split('viewer_id":')[1]);
            }

            app.loadingKeys = false;
            
            if (secret) {
                secrets.getApp().loadingKeys = false;
            }
        });
    };
}