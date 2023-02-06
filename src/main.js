// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import GlobalMixin from '~/mixins/GlobalMixin'
// import Vssue from 'vssue'
import Fuse from 'fuse.js'
// import GithubV4 from '@vssue/api-github-v4'
import VueDisqus from 'vue-disqus'
import VueSweetalert2 from 'vue-sweetalert2'

import 'sweetalert2/dist/sweetalert2.min.css'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.mixin(GlobalMixin)

  Vue.prototype.$search = function (term, list, options) {
    return new Promise(function (resolve, reject) {
      const run = new Fuse(list, options)
      const results = run.search(term)
      resolve(results)
    })
  }

  Vue.use(VueDisqus)
  Vue.use(VueSweetalert2)

  // Vue.use(Vssue, {
  //   api: GithubV4,
  //   owner: 'cp-wri' || process.env.GRIDSOME_VSSUE_OWNER,
  //   repo: 'cp-wri.github.io' || process.env.GRIDSOME_VSSUE_REPO,
  //   clientId: 'be2f47a31952e4804053' || process.env.GRIDSOME_VSSUE_CLIENT_ID,
  //   clientSecret: '97f31e271ad491760b3f3e08ee38c61c4c8a099f' || process.env.GRIDSOME_VSSUE_CLIENT_SECRET,
  //   perPage: process.env.VSSUE_GRIDSOME_PERPAGE || 15,
  //   autoCreateIssue: process.env.GRIDSOME_VSSUE_OWNER || false,
  // })

  // Add vue filter to capitalise the first letter of each word
  Vue.filter('capitalise', function (value) {
      let output = []
      value.split(' ').forEach(word => {
        output.push(
          word.charAt(0).toUpperCase() +
          word.slice(1).toLowerCase()
        )
      })
      return output.join(' ')
    }
  )
}
