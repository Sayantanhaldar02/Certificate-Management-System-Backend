const app_configuration = {
    port: process.env.PORT || 3000,
    db_url: process.env.DB_URL || "mongodb://127.0.0.1:27017/certificateDB"
}

module.exports = app_configuration;