SET mypath=%~dp0
pushd %mypath%\..\..\
set mypath=%mypath:\=/%
SET NODE_ENV=production
node_modules/.bin/webpack --config %mypath%packInfo/webpack.config.js  -p
popd