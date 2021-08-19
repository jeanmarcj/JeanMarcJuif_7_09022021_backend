# Project OpenclassRooms #7

## App informations
bin/wwww is the main file to start the app
server.js is an alternative file to start the app
public/index.html is a front view of the API.

This file is not used for this Rest API
The front-end of the app is localized on another GitHub repo : link
[Link to the front-end app](https://github.com/jeanmarcj/JeanMarcJuif_7_09022021_frontend.git)


## Sequelize CRUD functions
By default column id is auto generated
By default createdAt & updatedAt columns are auto generated by Sequelize

CRUD operations
create a new User: create(object)
find a User by id: findByPk(id)
get all Users: findAll()
update a User by id: update(data, where: { id: id })
remove a User: destroy(where: { id: id })
remove all Users: destroy(where: {})
find all Users by firstName: findAll({ where: { firstName: ... } })

## Database informations
The database is handle on my own server (synology DS220+)

## Lancer le serveur backend
npm start

TODO:

- Ajouter la colonne avatar dans la table user