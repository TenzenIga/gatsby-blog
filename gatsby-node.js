/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const {slugify} = require('./src/util/util');
const path = require('path');
const _ = require('lodash');

exports.onCreateNode = ({node, actions}) =>{
    const {createNodeField} = actions
    if(node.internal.type === 'MarkdownRemark'){
        const slugFromTitle = slugify(node.frontmatter.path)
        createNodeField({
            node,
            name: 'slug',
            value: slugFromTitle
        })
    }
}

exports.createPages = ({actions, graphql}) =>{
    const { createPage } = actions;
    const templates = {
        singlePost: path.resolve('src/templates/single-post.js'),
        tagsPage: path.resolve('src/templates/tags-page.js'),
        tagPosts: path.resolve('src/templates/tag-posts.js')
    }
    return graphql(`
        {
            allMarkdownRemark{
                edges{
                    node{
                        frontmatter{
                            tags
                        }
                        fields{
                            slug
                        }
                    }
                }
            }
        }
    `).then(res => {
        if(res.errors) return Promise.reject(res.errors)
        const posts = res.data.allMarkdownRemark.edges;

        posts.forEach(({node}) => {
            createPage({
                path: node.fields.slug,
                component: templates.singlePost,
                context:{
                    slug: node.fields.slug
                }   
            })
        })
        // get all tags
        let tags = []
        _.each(posts, edge =>{
            if(_.get(edge, 'node.frontmatter.tags')){
                tags = tags.concat(edge.node.frontmatter.tags)
            }
        })
        // [ design: 5, code: 1]
        let tagPostsCounts = {}
            tags.forEach(tag =>{
                tagPostsCounts[tag] = (tagPostsCounts[tag] || 0) + 1;
            })

        tags = _.uniq(tags);

        //create Tags page
        createPage({
                path: '/tags',
                component: templates.tagsPage,
                context:{
                    tags,
                    tagPostsCounts
                }
            })

         // create tag posts page
         tags.forEach(tag =>{
             createPage({
                 path:`/tag/${slugify(tag)}`,
                 component:templates.tagPosts,
                 context: {
                     tag,
                 }
             })
         })   
        
    })
}


