<template>
  <Layout>
    <div id="content-container" class="container px-5 py-8 mx-auto flex flex-wrap">
      <aside class="
          w-full
          md:w-1/7
          sm:w-0
          flex flex-col
          pr-5
          sm:block
          border-r-1 border-gray-300
          dark:border-gray-700
        " aria-label="left-sidebar">
        <div class="w-full flex flex-col sticky top-5">
          <div class="w-full flex flex-col my-4">
            <p class="text-xl font-semibold pb-5">Kompetisi</p>

            <ul>
              <li v-for="(contest, contestidx)  in contests" :key="contestidx"
                class="border-b border-solid last:border-none border-gray-300 pb-2 mt-2"
                >
                <div
                  class="text-base text-gray-900 text-left bg-primary-100 dark:bg-primary-600 dark:text-white px-2 py-1 rounded-md w-full flex flex-row items-center justify-between mb-2 cursor-pointer"
                  @click="toggleContest(contestidx)"
                  >
                  <span class="font-semibold lowercase first-letter:capitalize py-1">{{
                      contestidx
                  }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-auto" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
                <transition name="scroll-up" mode="out-in">
                <ul class="ml-1" v-if="isContestOpen(contestidx)" key="years">
                  <li v-for="(year, yearidx)  in contest" :key="yearidx">
                    <div
                      class="text-base text-gray-800 dark:text-white bg-secondary-50 dark:bg-secondary-500 text-left bg-primary-200 px-2 py-1 rounded-md w-full flex flex-row items-center justify-between mb-2 cursor-pointer"
                      @click="toggleYear(contestidx, yearidx)"
                      >
                      <span class="font-semibold lowercase first-letter:capitalize py-1">{{
                          yearidx
                      }}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-auto" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
                    <transition name="scroll-up" mode="out-in">
                    <ul class="ml-1" v-if="isYearOpen(contestidx, yearidx)" key="rounds">
                      <li v-for="(round, roundidx)  in year" :key="roundidx">
                        <div
                          class="text-base text-gray-800 dark:text-white bg-primary-100 dark:bg-primary-600 text-left bg-primary-200 px-2 py-1 rounded-md w-full flex flex-row items-center justify-between mb-2 cursor-pointer"
                          @click="toggleRound(contestidx, yearidx, roundidx)"
                          >
                          <span class="font-semibold lowercase first-letter:capitalize py-1">{{
                              roundidx
                          }}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-auto" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd" />
                          </svg>
                        </div>
                        <transition name="scroll-up" mode="out-in">
                        <ul class="ml-1" v-if="isRoundOpen(contestidx, yearidx, roundidx)" key="problems">
                          <li v-for="(problem, problemidx)  in round" :key="problemidx">
                            <a :href="problem.node.path" class="text-gray-700 dark:text-gray-300">
                              <div
                                class="text-base dark:text-white bg-white dark:bg-primary-600 text-left border px-2 py-0.5 rounded-md w-full flex flex-row items-center justify-between mb-0.5"
                                
                                >
                                <span class="font-semibold lowercase first-letter:capitalize py-1">
                                  {{
                                    problem.node.title
                                }}</span>
                                <!-- circle -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-auto" viewBox="0 0 20 20"
                                  fill="currentColor">
                                  <path fill-rule="evenodd"
                                    d="M10 12a2 2 0 100-4 2 2 0 000 4zm0 2a4 4 0 100-8 4 4 0 000 8z"
                                    clip-rule="evenodd" />
                                </svg>
                              </div>
                            </a>
                          </li>
                        </ul>
                        </transition>
                      </li>
                    </ul>
                    </transition>
                  </li>
                </ul>
                </transition>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <section class="w-full md:w-5/7 flex flex-col px-2 md:px-10">
        <div class="w-full flex flex-col my-4">
          <div class="w-auto justify-center flex-col items-center flex">
            <img src="./../../static/images/contest-img-temp.png" alt="contest-img-temp" class="w-full md:w-1/2" />
            <div class="w-1/2 flex flex-col justify-center items-center">
              <h1 class="text-3xl text-left font-semibold text-gray-900 dark:text-white">Kompetisi</h1>
              <p class="text-gray-700 dark:text-gray-300"> Pilih latihan kompetisi yang ingin kamu kerjakan di sebelah
                kiri
                halaman ini. </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>


<static-query>
query {
  metadata {
    siteName
  }
  allContest(sortBy: "contest") {
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

export default {
  metaInfo() {
    return {
      title: 'Competitive Programming Contests',
      meta: [
        {
          key: 'description',
          name: 'description',
          content: 'Competitive Programming Contests'
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
    Layout: () => import('~/layouts/Default.vue'),
  },
  mounted() {
    this.theme = localStorage.getItem('theme') || 'light'
  },
  data() {
    return {
      selected: null,
      dropdown: {}
    }
  },
  created() {
    this.$static.allContest.edges.forEach((c) => {
      const { contest, year, round } = c.node
      if (!this.dropdown[contest]) {
        this.dropdown[contest] = {
          isOpen: false,
          years: {},
        }
      }
      if (!this.dropdown[contest].years[year]) {
        this.dropdown[contest].years[year] = {
          isOpen:  false,
          rounds: {},
        }
      }
      if (!this.dropdown[contest].years[year].rounds[round]) {
        this.dropdown[contest].years[year].rounds[round] = {
          isOpen: false,
        }
      }
    })
    this.dropdown = { ...this.dropdown }
  },
  methods: {
    toggleSelected(s) {
      if (this.selected == s) {
        this.selected = null;
      } else {
        this.selected = s;
      }
    },
    toggleContest(contest) {
      const updated = this.dropdown;
      updated[contest].isOpen = !updated[contest].isOpen;
      this.dropdown = structuredClone(updated);
    },
    toggleYear(contest, year) {
      const updated = this.dropdown;
      updated[contest].years[year].isOpen = !updated[contest].years[year].isOpen;
      this.dropdown = structuredClone(updated);
    },
    toggleRound(contest, year, round) {
      const updated = this.dropdown;
      updated[contest].years[year].rounds[round].isOpen = !updated[contest].years[year].rounds[round].isOpen;
      this.dropdown = structuredClone(updated);
    },
    isContestOpen(contest) {
      if (this.dropdown[contest] != null) {
        return this.dropdown[contest].isOpen;
      }
      return false;
    },
    isYearOpen(contest, year) {
      if (this.dropdown[contest] != null && this.dropdown[contest].years[year] != null) {
        return this.dropdown[contest].years[year].isOpen;
      }
      return false;
    },
    isRoundOpen(contest, year, round) {
      if (this.dropdown[contest] != null && this.dropdown[contest].years[year] != null && this.dropdown[contest].years[year].rounds[round] != null) {
        return this.dropdown[contest].years[year].rounds[round].isOpen;
      }
      return false;
    },
    
  },
  computed: {
    contests() {
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

<style>
#content-container {
  min-height: 100vh;
}
.scroll-up-enter-active, .scroll-up-leave-active {
  transition: transform .3s, opacity .3s
}
.scroll-up-enter {
  transform: translateY(-10%);
  opacity: 0;
}
.scroll-up-leave-to {
  transform: translateY(10%);
    opacity: 0;
}
</style>
