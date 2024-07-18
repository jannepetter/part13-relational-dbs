const Blog = require('./blog')
const User = require('./user')
const Session = require('./session')
const UserBlogs = require('./userblogs')

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasOne(Session)
Session.belongsTo(User)

User.belongsToMany(Blog,{through:UserBlogs, as:'readings'})
Blog.belongsToMany(User,{through:UserBlogs, as:'users_marked'})

module.exports = {
    Blog,
    User,
    UserBlogs
}