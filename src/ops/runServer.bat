SET mypath=%~dp0
pushd %mypath%/../../
node_modules\.bin\babel-node --presets es2015,react src/server/main.js
popd