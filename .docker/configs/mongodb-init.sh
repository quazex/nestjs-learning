mongo admin <<-EOJS
  db.createUser({
    user: "quazex",
    pwd: "quazex",
    roles: [{
      role: "root",
      db: "admin"
    }]
  });
EOJS
