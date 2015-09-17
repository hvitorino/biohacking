var DJR = function() {
  
    var authenticity_token = document.querySelector("meta[name='csrf-token']").content;
    this.pattern = /:([a-zA-Z0-9\-\_]+)/g;
    this.data   = "";
    this.error  = {};
    this.format = ".json";

    this.formatURL = function(url, params) {
        return url.replace("(.:format)", params["format"])
                  .replace(this.pattern, function(match, key){ return params[key]; });
    };
    this.callbackDefault = function(data) {
        this.data = data;
    };
    this.errorDefault    = function(error) {
        this.error = error;
    };
    this.ajax = function(object, callback, error, method, url, scope) {
        var self = this;
        var params = Object.create(object);
        params["format"] = this.format;

        if(method === "") { method = "GET"; }
        if(method !== "GET") {
            object = JSON.stringify(object);
            if (object && object.length === 2) { object = null; }
        }
        if(method === "DELETE") object = null;

        var formattedUrl = this.formatURL(url, params) + "?authenticity_token=" + authenticity_token;
        
        if(method === "GET") {
          for(var property in object) {
            formattedUrl += "&" + property + "=" + object[property];
          }
        }
        
        var request = new XMLHttpRequest();
        request.open(method, formattedUrl);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader("Cache-Control", "no-cache");
        request.setRequestHeader("Pragma", "no-cache");
        request.setRequestHeader("X-CSRF-Token", authenticity_token);
        
        request.onreadystatechange = function() {
          if (this.readyState === 4) {
            if (this.status === 200) {
              var returnedJson = JSON.parse( this.responseText );
              callback.call(scope, returnedJson);
            } else {
              callback.call(scope, this);
            }
          }
        };
        request.send(object);
    };
    for (var action in this.routes) {
        this[action] = function(act) {
            return function(object, callback, error, scope) {
                if(typeof object === "function") {
                    callback = object;
                    error = callback;
                    object = {};
                }
                var localCallback     = callback || this.callbackDefault;
                var localErrorHandler = error    || this.errorDefault;
                this.ajax(object,
                          localCallback,
                          localErrorHandler,
                          this.routes[act].method,
                          this.routes[act].url,
                          scope);
                return this;
            }
        }(action);
    }

};