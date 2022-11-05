module.exports = {
  siteName: 'CP-WRI',
  siteDescription: 'Competitive Programming - Workshop & Riset Informatika atau CP-WRI merupakan sebuah sub komunitas dari WRI yang menaungi para mahasiswa dalam bidang pemrograman kompetitif',
  siteUrl: 'https://cp-wri.github.io',
  icon: {
    favicon: {
      src: './static/images/favicon.png',
      sizes: [16, 32, 96],
    },
  },
  plugins: [
    {
      use: 'gridsome-plugin-robots-txt',
    },
    {
      use: 'gridsome-plugin-windicss',
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Documentation', // Required
        baseDir: './docs', // Where .md files are located
        pathPrefix: '/', // Add route prefix. Optional
        template: './src/templates/Documentation.vue', // Optional
        plugins: [
          [
            'gridsome-plugin-remark-shiki',
            { theme: 'css-variables', skipInline: true },
          ],
        ],
      },
    },
    // {
    //   use: '@gridsome/vue-remark',
    //   options: {
    //     typeName: 'Problem', // Required
    //     baseDir: './problems', // Where .md files are located
    //     template: './src/templates/Problem.vue', // Optional
    //     pathPrefix: '/problems', // Add route prefix. Optional
    //     plugins: [
    //       [
    //         'gridsome-plugin-remark-shiki',
    //         { theme: 'css-variables', skipInline: true },
    //       ],
    //     ],
    //   },
    // },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true,
          },
          categories: {
            typeName: 'Category',
            create: true,
          },
        },
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'contests/**/*.md',
        typeName: 'Contest',
        refs: {
          competition: {
            typeName: 'Competition',
            create: true,
            refs: {
              year: {
                typeName: 'Year',
                create: true,
                refs: {
                  round: {
                    typeName: 'Round',
                    create: true,
                    refs: {
                      problem: {
                        typeName: 'Problem',
                        create: true,
                      },
                    },
                  },
                }
              }
            }
          },
        },
      },
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title:
            "CP-WRI's Blog",
          feed_url: 'https://cp-wri.github.io/rss.xml',
          site_url: 'https://cp-wri.github.io/blog',
        },
        feedItemOptions: (node) => ({
          title: node.title,
          description: node.summary,
          url: 'https://cp-wri.github.io/blog/' + node.slug,
          author: node.author || 'CP-WRI',
          date: node.date,
        }),
        output: {
          dir: './static',
          name: 'rss.xml',
        },
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
      },
    },
    {
      use: 'gridsome-plugin-recommender',
      options: {
        enabled: true,
        typeName: 'Post',
        referenceTypeName: 'Post',
        field: 'title',
        referenceField: 'title',
        relatedFieldName: 'related',
        referenceRelatedFieldName: 'related',
        caseSensitive: false,
        minScore: 0.01,
        maxScore: 1,
        minRelations: 3,
        maxRelations: 3,
        fillWithRandom: false,
        debug: false,
      },
    },
    {
      use: 'gridsome-plugin-gtag',
      options: {
        config: {
          id: process.env.GOOGLE_ANALYTICS_ID,
        },
      },
    },
  ],
  templates: {
    Tag: '/tag/:id',
    Category: '/category/:id',
    Post: '/blog/:path',
    Contest: '/contests/:contest/:year/:round/:problem',
  },
  transformers: {
    remark: {
      plugins: [
        [
          'gridsome-plugin-remark-shiki',
          { theme: 'css-variables', skipInline: true },
        ],
        ['remark-attr'],
      ],
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
    },
  },
}