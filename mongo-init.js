use('admin')

db.createUser({ user: "toor", pwd: "toor", roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"] })