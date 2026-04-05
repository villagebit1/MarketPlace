const getDb = require('../util/database').getDb
const bcrypt = require('bcrypt')

/*
    Here you can use ORM, Prisma, Sequelize
*/

class User {
    constructor(username, email, password) {
        this.username = username
        this.email = email
        this.password = password
    }

    async save() {
        const db = getDb()
        return new Promise((res, rej) => {
            db.collection('users').insertOne(this),
            (err, result) => {
                if(err) return rej('Something went wrong at insert on DB.')
                return res(`Inserted on db successfully ${result}`)
            }
        })
       
    }

    static async findOne(email, password) {
        console.log('Email: ', email);
        const db = getDb()
        const user = await db.collection('users').findOne({email: email})

        if (!user) {
            console.log('Nnkk')
            return null
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (passwordMatch) {
            console.log('afitokinito')
            return user
        } else {
            return null
        }
    }
}

module.exports = User



/* 
const getDb = require('../util/database').getDb
const bcrypt = require('bcrypt')

class User {
    constructor(username, email, password) {
        this.username = username
        this.email = email
        this.password = password
    }

    async save() {
        const db = getDb()
        return db.collection('users').insertOne(this)
    }

    static async findOne(email, password) {
        console.log('Email: ', email);
        const db = getDb()
        const user = await db.collection('users').findOne({email: email})

        if (!user) {
            console.log('Nnkk')
            return null
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (passwordMatch) {
            console.log('afitokinito')
            return user
        } else {
            return null
        }
    }
}

module.exports = User


*/