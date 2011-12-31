class Config
  ##
  ## Public
  ##

  # Initialize config
  @['init'] = (config, parts...) ->
    objParts = []
    objParts.push config['default']

    for part in parts
      objParts.push config[part]

    config = simpleMerge(objParts...)

    config = substitute(config)
    return config


  ##
  ## Private
  ##

  simpleMerge = (objects...) ->
    target = {}
    fun = (source, targetObj=target) ->
      for key,val of source
        if targetObj[key]? && typeof(val) == "object"
          targetObj[key] = fun(val, targetObj[key])
        else
          targetObj[key] = val
      targetObj

    for obj in objects
      fun(obj)
    target


  # Substitute and variables, example:
  #   config = {'domain': "example.dev", 'url': "%{domain}/hello_world"}
  # Becomes
  #   config = {'domain': "example.dev", 'url': "example.dev/hello_world"}
  substitute = (obj, config=obj) ->
    for k,v of obj
      if typeof(v) == "object"
        obj[k] = substitute(v, config)
      else if typeof(v) == "string"
        obj[k] = v.replace /%{(.*)}/, (str, match) ->
          rslt = config
          for part in match.split(".")
            rslt = rslt[part]
            break if !rslt?
          rslt?.toString()

    return obj

if !module?['exports'] = Config
  window['Config'] = Config