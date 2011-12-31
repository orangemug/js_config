#!/bin/sh

echo "Compiling coffeescript"
coffee --compile --output build js_config.coffee

echo "Compressing javascript"
java -jar 'build/tools/compiler.jar'  --compilation_level ADVANCED_OPTIMIZATIONS --js_output_file build/js_config.min.js --js build/js_config.js

echo "Done"
