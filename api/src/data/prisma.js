require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

<<<<<<< HEAD
const url = new URL(process.env.DATABASE_URL);

const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: Number(url.port) || 3306,
    user: url.username,
    password: url.password || "",
    database: url.pathname.replace("/", ""),
    connectionLimit: 5
});
=======
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
>>>>>>> 23d6582e705e51f51230aa664c3aa93353adf961

const prisma = new PrismaClient({ adapter });

module.exports = prisma;