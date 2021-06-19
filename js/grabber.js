function Grabber() {
    this.links = {};
    this.injected = false;
    
    this.check = function() {
        var links = $('a:not([bn1-patched-link])[href*="http://vk.com/app3611950?request_key="]');
        
        if (!links.length) return false;
        
        for (var i = 0; i < links.length; i++) {
            var hash = links[i].hash.slice(1);
            GM.log(links[i]);
            var uid = hash.split('_')[1];
            var type = (hash.split('_')[0] == 1 ? '+100 опыта' : '+5 снабжения');
            
            if (this.links[hash]) continue;
            
            $("#bn1-links").insertBefore($('<div></div>').html(type));
            
            this.links[hash] = true;
        }
    };
    
    this.init = function() {
        if (!this.injected) {
            $('body').append($('<div></div>').attr('style', 'position: fixed;right: 10px;top: 35px;width: 200px;z-index:10;background-color:rgba(120,120,120,0.8);padding:3px 5px;border-radius:6px;').html('<center><div id="bn1-links" style="min-height:24px;max-height:450px;overflow-y:scroll;"></div></center>'));
            
            this.injected = true;
        }
        
        this.check();
    }
}