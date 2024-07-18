const { Sequelize,QueryTypes } = require('sequelize')

const sequelize = new Sequelize("postgres://postgres:somepassword@localhost:5432/postgres")

// 13.3
const executeQuery = async () => {
  try {
    await sequelize.authenticate()
    const defaultQuery = 'SELECT * FROM blogs'
    const blogs = await sequelize.query(defaultQuery,{ type: QueryTypes.SELECT })
    sequelize.close()
    for (const blog of blogs) {
      console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`)
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

executeQuery()