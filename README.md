# js_config

A simple javascript config library.

## Usage

Include either the compressed or uncompressed javascript file from the `build/` directory.

Create a json hash somewhere note it only supports simple types, string/boolean/numbers by design.

    config = {
      'default': {
        'urls': {
          'login': "https://%{domain}/users/sign_in"
        }
      },
      'development': {
        'domain': "example.dev",
        'log_level': "debug"
      },
      'staging': {
        'domain': "staging.example.com",
        'log_level': "info"
      },
      'production': {
        'domain': "example.com",
        'log_level': "none"
      }
    }


Then run `init` the config with an enviroment. The `default` will be inherited by default into the generated JSON object. Also any values in "%{these.quotes}" will be evalutaed as a key in the generated JSON hash. The example is as follows.

    CONFIG = Config.init(config, 'production')
    # => {
    #  'domain': "example.com",
    #  'log_level': "none",
    #  'urls': {
    #    'login': "https://example.com/users/sign_in"
    #  }
    # }


## Build

To build simply run the following from a unix environment, make sure you have [coffeescript](http://coffeescript.org) installed

    ./build.sh

