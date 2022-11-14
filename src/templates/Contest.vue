<template>
  <Layout>
    <div class="content-container container px-5 py-8 mx-auto flex flex-wrap">
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
        <Sidebar :oppenedContest="$page.contest" />
      </aside>

      <section class="w-full md:w-4/7 flex flex-col px-2 md:px-10">
        <ContestPage :page="$page" :showSolutions="showSolutions" />
      </section>

      <aside class="
          w-full
          md:w-2/7
          flex flex-col
          pl-2
          pr-2
          md:pr-0 md:pl-6 md:border-l-1
          border-gray-300
          dark:border-gray-700
        " aria-label="right-sidebar">
        <div class="w-full flex flex-col my-4">
          <p class="text-xl font-semibold pb-5">Solutions</p>
          <button @click="toggleShowSolutions()" class="
              text-base text-gray-900 text-left
              dark:text-white
              border
              px-2
              py-1
              rounded-md
              w-full
              flex flex-row
              items-center
              justify-between
              mb-2
              cursor-pointer
            " :class="{ 'bg-primary-500 text-white': showSolutions }">
            <span class="font-semibold lowercase first-letter:capitalize py-1">
              Tampilkan Solusi
            </span>
          </button>
          <!-- disclaimer to solve the problem yourself before opening solutions -->
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Tip: Cobalah untuk menyelesaikan soal ini sendiri terlebih dahulu
            sebelum membuka solusi.
          </p>
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
    year
    round
    problem
    content
    pdf
  }
}
</page-query>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
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
      ],
    }
  },
  components: {
    Sidebar: () => import('~/components/contest/Sidebar'),
    ContestPage: () => import('~/components/contest/ContestPage'),
  },
  data() {
    return {
      showSolutions: false,
    }
  },
  methods: {
    toggleShowSolutions() {
      this.showSolutions = !this.showSolutions
    },
  },
  watch: {
    $route() {
      this.showSolutions = false
    },
  },
}
</script>

<style src="~/css/main.css" />

<style>
.content-container {
  min-height: 100vh;
}
</style>