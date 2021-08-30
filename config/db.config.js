module.exports = {
    // HOST: "192.168.1.4",
    HOST: "jmjds220.synology.me",
    USER: "JMarc",
    PASSWORD: "Djoko7web@21",
    DB: "groupomaniablog",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};