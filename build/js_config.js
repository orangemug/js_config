(function() {
  var Config;
  var __slice = Array.prototype.slice;

  Config = (function() {
    var simpleMerge, substitute;

    function Config() {}

    Config['init'] = function() {
      var config, objParts, part, parts, _i, _len;
      config = arguments[0], parts = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      objParts = [];
      objParts.push(config['default']);
      for (_i = 0, _len = parts.length; _i < _len; _i++) {
        part = parts[_i];
        objParts.push(config[part]);
      }
      config = simpleMerge.apply(null, objParts);
      config = substitute(config);
      return config;
    };

    simpleMerge = function() {
      var fun, obj, objects, target, _i, _len;
      objects = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      target = {};
      fun = function(source, targetObj) {
        var key, val;
        if (targetObj == null) targetObj = target;
        for (key in source) {
          val = source[key];
          if ((targetObj[key] != null) && typeof val === "object") {
            targetObj[key] = fun(val, targetObj[key]);
          } else {
            targetObj[key] = val;
          }
        }
        return targetObj;
      };
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        obj = objects[_i];
        fun(obj);
      }
      return target;
    };

    substitute = function(obj, config) {
      var k, v;
      if (config == null) config = obj;
      for (k in obj) {
        v = obj[k];
        if (typeof v === "object") {
          obj[k] = substitute(v, config);
        } else if (typeof v === "string") {
          obj[k] = v.replace(/%{(.*)}/, function(str, match) {
            var part, rslt, _i, _len, _ref;
            rslt = config;
            _ref = match.split(".");
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              part = _ref[_i];
              rslt = rslt[part];
              if (!(rslt != null)) break;
            }
            return rslt != null ? rslt.toString() : void 0;
          });
        }
      }
      return obj;
    };

    return Config;

  })();

  if (!(typeof module !== "undefined" && module !== null ? module['exports'] = Config : void 0)) {
    window['Config'] = Config;
  }

}).call(this);
