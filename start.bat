set host=%1

start cmd /C "json-server --host %host% db.json"
start cmd /C "ng serve --host %host%"
