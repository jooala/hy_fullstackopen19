const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const total = blogs.reduce((prev, current) => prev + current.likes, 0)
    return total
}

const favoriteBlog = (blogs) => {
    const favBlog = blogs.reduce((prev, current) => {
        return prev.likes > current.likes ? prev : current
    }, 0)
    return {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
    }
}

const mostBlogs = (blogs) => {
    const mostBlogs = _.chain(blogs).countBy('author').map((blogs, author) => ({ author, blogs })).sortBy('blogs').last().value()
    return mostBlogs
}

const mostLikes = (blogs) => {
    const mostLikes = _.chain(blogs).groupBy('author').map((blog, author) => ({author, "likes": _.sumBy(blog, 'likes')})).sortBy('likes').last().value()
    return mostLikes
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }