const blogsRouter = require("express").Router();
const {Blog, User }= require("../models");
const { sequelize } = require("../utils/db");

blogsRouter.get("/", async (request, response) => {
  let result = await Blog.findAll({
    include:{
      model:User,
      attributes:{exclude:["password","username","createdAt","updatedAt"]}
    },
    order:[
      ["likes","DESC"],
    ]
  })
  const search = request.query?.search?.toLowerCase()
  if (search){
   result = result.filter(b=>
    b.title.toLowerCase().includes(search) ||
    b.author.toLowerCase().includes(search)
    )
  }
  response.json(result);
});

blogsRouter.get("/authors/", async (request, response) => {
  let result = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    group: ['author'],
    order:[
      ["likes","DESC"]
    ]
  })

  response.json(result);
});


blogsRouter.post("/", async (request, response) => {
  const blog = await Blog.create({...request.body,userId:request.user.id})
  const newblog = await Blog.findByPk(blog.id,{
    include:{
      model:User,
      attributes:{exclude:["password","username","createdAt","updatedAt"]}
    },
  })
  response.status(201).json(newblog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogId = request.params.id;
  const blog = await Blog.findByPk(blogId)
  if (blog.userId === request.user.id){
    await blog.destroy()
    return response.status(204).end();
  }
  response.status(401).json({error:"Only blog creator can delete blog"})
});

blogsRouter.put("/:id", async (request, response) => {
  const blogId = request.params.id;
  await Blog.update(
    request.body,
    {where:{id:blogId}},
    )
  const updatedBlog = await Blog.findByPk(blogId,{
    include:{
      model:User,
      attributes:{exclude:["password","username","createdAt","updatedAt"]}
    },
  }
    )
  response.status(200).json(updatedBlog)
});

module.exports = blogsRouter;
