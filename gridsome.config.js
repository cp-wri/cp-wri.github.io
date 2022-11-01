// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: process.env.SITE_NAME || 'Competitive Programming Workshop & Riset Informatika',
  siteDescription:
    process.env.SITE_DESCRIPTION ||
    'Competitive Programming (CP) merupakan forum di dalam Workshop & Riset Informatika bertujuan mewadahi mahasiswa yang memiliki bakat / minat di bidang competitive programming. Nantinya, kita akan belajar dan breakdown bersama - samaterkait persiapan Competitive Programming.',
  siteUrl: process.env.GRIDSOME_BASE_URL || 'https://cp-wri.github.io/',
  icon: {
    favicon: {
      src: process.env.SITE_FAVICON_PATH || './static/images/favicon.png',
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
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title:
            process.env.SITE_TITLE ||
            'CP-WRI | Competitive Programming Workshop & Riset Informatika',
          feed_url: process.env.GRIDSOME_BASE_URL
            ? `${process.env.GRIDSOME_BASE_URL}/rss.xml`
            : 'https://cp-wri.github.io/rss.xml',
          site_url:
            process.env.GRIDSOME_BASE_URL || 'https://cp-wri.github.io/',
        },
        feedItemOptions: (node) => ({
          title: node.title,
          description: node.summary,
          url: process.env.GRIDSOME_BASE_URL
            ? process.env.GRIDSOME_BASE_URL + node.path
            : 'https://cp-wri.github.io/' + node.path,
          author: process.env.SITE_AUTHOR || 'Workshop & Riset Informatika (@cp-wri)',
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
    Post: '/blog/:path'
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
