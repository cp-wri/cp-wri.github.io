const fs = require("fs-extra")
const generateCover = require("./src/functions/generate-cover")
const coverOptions = {
  imgWidth: "1024",
  imgHeight: "576",
  types: [
    {
      name: "Posts",
      typeName: "Post",
      path: "blog"
    }
  ],
  // Set Colours
  colours:  [
    "#559BFF",
    "#FFD948",
    "#CD1FFF",
    "#41FFA7",
    "#FF6336",
    "#FF4576"
  ]
}

module.exports = function (api) {
  api.loadSource(({ addMetadata, addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/

    addMetadata(
      'siteTitle', 'Competitive Programming - Workshop & Riset Informatika'
    )
    addMetadata('siteAuthor', 'CP-WRI')
    addMetadata(
      'siteAuthorUrl', 'https://www.github.com/cp-wri'
    )
    addMetadata(
      'archive_title',
      'NOTE: THIS ARTICLE IS PART OF OUR ARCHIVE AND IS LIKELY OUT OF DATE.'
    )
    addMetadata(
      'archive_text',
      '(LINKS MAY NOT WORK, DOWNLOADS HAVE NOT BEEN RECENTLY TESTED FOR SAFETY)'
    )

    const category = addCollection('Category')
    category.addReference('categories', 'Category')
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })

  api.loadSource(({ addSchemaResolvers }) => {
    // Schema API here: https://gridsome.org/docs/schema-api/
    // Create a default value for "sidebar" to prevent Cannot query errors if not used
    addSchemaResolvers({
      Post: {
        sidebar: {
          type: 'String',
          resolve(obj) {
            return (obj.sidebar === undefined ? 'Default' : obj.sidebar)
          }
        }
      }
    })
  })
  api.loadSource(async (actions) => {
    if (process.env.AUTO_GENERATE_COVER) {
      // Loop through each type to create a cover image for
      coverOptions.types.forEach(function (type) {
        
        const collection = actions.getCollection(type.typeName)
        const outputPath = `${type.path}`
        fs.ensureDirSync(outputPath)
        collection.data().forEach(function (node) {
          if (node.internal.typeName === type.typeName) {
            if (node.thumbnail !== undefined) {
              const output = `${node.thumbnail}`
              fs.access(output, (error) => {
                if (error) {
                  
                  generateCover(output, node.cover_title ?? node.title, coverOptions)
                } else {
                  
                }
              })
            }
          }
        })
      })
    } else {
      
    }
  })
}
