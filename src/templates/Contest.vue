<template>
  <Layout>
    <div class="container px-5 py-8 mx-auto flex flex-wrap">
      <aside
        class="
          w-full
          md:w-1/7
          sm:w-0
          flex flex-col
          pr-5
          hidden
          sm:block
          border-r-1 border-gray-300
          dark:border-gray-700
        "
        aria-label="left-sidebar"
      >
        <div class="w-full flex flex-col sticky top-5">
          <div class="w-full flex flex-col my-4">
            <p class="text-xl font-semibold pb-5">Kompetisi</p>

            <ul>
              <li v-for="(contest, contestidx)  in contests" :key="contestidx" class="border-b border-dashed border-ui-border border-gray-500 pb-2 mt-2">
                {{ contestidx }}
                <ul class="ml-1 ">
                  <li v-for="(year, yearidx)  in contest" :key="yearidx">
                    {{ yearidx }}
                    <ul class="ml-1">
                      <li v-for="(round, roundidx)  in year" :key="roundidx">
                        <ul class="ml-1">
                          <li v-for="(problem, problemidx)  in round" :key="problemidx">
                            <a :href="problem.node.path" :class="problem.node.path == $page.contest.path ? 'text-primary-500' : ''" class="text-gray-700 dark:text-gray-300">
                              {{ problem.node.title }}
                            </a>
                          </li>
                        </ul>
                      </li>  
                    </ul>    
                  </li>  
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <section class="w-full md:w-4/7 flex flex-col px-2 md:px-10">
        <!-- <slot /> -->
        <ContestPage :page="$page" :selected="selected"/>
      </section>

      <aside
        class="
          w-full
          md:w-2/7
          flex flex-col
          pl-2
          pr-2
          md:pr-0 md:pl-6 md:border-l-1
          border-gray-300
          dark:border-gray-700
        "
        aria-label="right-sidebar"
      >
        <div class="w-full flex flex-col my-4">
          <p class="text-xl font-semibold pb-5">Solutions</p>
      <ul>
        <li v-for="s in $page.contest.solutions" :key="s" >
          <button @click="toggleSelected(s)" :class="{'bg-primary-500 text-white': selected === s}">
            {{  s.split('/').pop()  }}
          </button>
        </li>
      </ul>
        </div>
      </aside>
    </div>
  </Layout>
</template>

<page-query>
query Contest ($path: String!) {
  contest: contest (path: $path) {
    path
    title
    contest
    round
    problem
    content
    pdf
    solutions
  }
}
</page-query>

<static-query>
query {
  metadata {
    siteName
  }
  allContest {
    edges {
      node {
        path
        id
        title
        contest
        year
        round
        problem
      }
    }
  }
}
</static-query>

<script>
import ContestPage from "../components/contest/ContestPage.vue";
export default {
  metaInfo() {
    return {
      title: this.$page.contest.title,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.contest.contest,
        },
        // { name: 'description', content: this.$page.documentation.excerpt },
        // { name: 'twitter:card', content: 'summary_large_image' },
        // {
        //   name: 'twitter:description',
        //   content: this.$page.documentation.excerpt,
        // },
        // { name: 'twitter:title', content: this.$page.documentation.title },
        // {
        //   name: 'twitter:site',
        //   content: `@${this.$static.metadata.siteAuthor}`,
        // },
        // {
        //   name: 'twitter:image',
        //   content: `${this.getBaseUrl}/default-thumb.png`,
        // },
        // {
        //   name: 'twitter:creator',
        //   content: `@${this.$static.metadata.siteAuthor}`,
        // },
        // { property: 'og:type', content: 'document' },
        // { property: 'og:title', content: this.$page.documentation.title },
        // {
        //   property: 'og:description',
        //   content: this.$page.documentation.excerpt,
        // },
        // {
        //   property: 'og:url',
        //   content: `${this.getBaseUrl}${this.$page.documentation.path}/`,
        // },
        // {
        //   property: 'og:image',
        //   content: `${this.getBaseUrl}/default-thumb.png`,
        // },
        // {
        //   property: 'og:image:secure_url',
        //   content: `${this.getBaseUrl}/default-thumb.png`,
        // },
      ],
    }
  },
  components: {
    SiteLogo: () => import('~/components/SiteLogo'),
    SearchInput: () => import('~/components/SearchInput'),
    ThemeSwitcher: () => import('~/components/ThemeSwitcher'),
    AppFooter: () => import('~/components/parts/AppFooter'),
    ContestPage: () => import('~/components/contest/ContestPage'),
    Layout: () => import('~/layouts/Default.vue'),
  },
  mounted() {
    this.theme = localStorage.getItem('theme') || 'light'
  },
  data() {
    return {
      selected: null,
    }
  },
  methods: {
    toggleSelected(s) {
      if(this.selected == s) {
        this.selected = null;
      } else {
        this.selected = s;
      }
    },
  },
  computed: {
    contests() {
      // group this.$static.allContest.edges by contest, year, round
      const contests = {}
      this.$static.allContest.edges.forEach((edge) => {
        const { contest, year, round } = edge.node
        if (!contests[contest]) {
          contests[contest] = {}
        }
        if (!contests[contest][year]) {
          contests[contest][year] = {}
        }
        if (!contests[contest][year][round]) {
          contests[contest][year][round] = []
        }
        contests[contest][year][round].push(edge)
      })
      return contests
    },
  },
  watch: {
    $route() {
      this.selected = null;
    }
  }
}
</script>

<style src="~/css/main.css" />

