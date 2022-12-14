const mongoose = require('mongoose')
const { default: slugify } = require('slugify')
let i = 0
const postSchema = new mongoose.Schema(
    {       
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        author:{
            type: String,
            required: true
        },
        img:{
            type: String,
            required: false
        },
        path:{
            type:String,
            required:false
        },
        hasImg:{
            type: Boolean
        },
        slug: {
            type: String,
            required: true,
            unique: true
        }

    },
    {
        versionKey: false
    }
)

// Middleware .pre()
// TODO: Llevar este middleware a un archivo separado

postSchema.pre('validate', function(next) {
    if(this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    next()
})

module.exports = mongoose.model('Post', postSchema)