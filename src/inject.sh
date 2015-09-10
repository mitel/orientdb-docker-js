#!/bin/bash
echo "$(cat ./src/load-db-webpack.js)\nend;\nexit;\n\n//end" > ./src/load-db-webpack.js;
echo "jss x=null; // dumb variable\n$(cat ./src/load-db-webpack.js)" > ./src/load-db-webpack.js;
echo "connect remote:localhost/testdb admin admin;\n$(cat ./src/load-db-webpack.js)" > ./src/load-db-webpack.js;
