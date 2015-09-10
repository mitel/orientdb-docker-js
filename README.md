# Test environment for OrientDB with Docker and JS tools (npm & webpack)

####Scrips:
  * ```Dockerfile``` - docker image descriptor. Builds a docker image running OrientDB exposing ports 2424 (binary) and 2480 (http)
  * ```supervisord.conf``` - supervisor is used as daemon manager to run OrientDB and our JS script. The JS script is supposed to run one time and exit. 
  * ```orientdb-server-config.xml``` - OrientDB config file. You can customize this for root password and so.
  * ```load-db.js``` - a JavaScript to be run by OrientDB's console.sh where you can put INSERTs, UPDATEs etc. This script will be compiled by Webpack to ES5. Theoretically you could use here ES6 and require/import external modules - not tested. The generated file will land in the ```src``` folder in order to be bundled by docker.
  * ```inject.sh``` - inserts few lines in the webpack generated file, to make it runnable by OrientDB's console.sh
  * ```testdb.graph``` - a SQL script to create your graph entities. May be done also from JS.

####Install & use: 
  * run ```npm install``` 
  * run ```npm run deploy``` and follow the log
  * if you see ```INFO exited: testdb (exit status 0; expected)```, your test db is ready. a docker container named ```orientdb``` is running. the docker image is called ```mitel/orientdb```
  * for Mac users: configure your VM to forward ports 2424 and 2480 to your physical host
  * open a browser to http://localhost:2480 and login with admin/admin or root/password
  * ```npm run watch-client``` then http://localhost:2480
  * ```docker exec -it orientdb bash``` and ```/orientdb/bin/console.sh``` if you want to play from the CLI
