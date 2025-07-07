@echo off
echo 📦 Importando datos en MongoDB local (neo_bla_bla)...
mongoimport --db neo_bla_bla --collection users --file usuarios.json --jsonArray
mongoimport --db neo_bla_bla --collection reservas --file reservas.json --jsonArray
echo ✅ Importación completa.
pause