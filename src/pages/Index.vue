<template>
  <Layout>
    <main class="container px-5 py-8 mx-auto">
      <section id="hero" class="flex flex-col md:flex-row justify-center items-center mb-5">
        <div id="img-hero">
          <img src="./../../static/images/hero-img.png" alt="hero" class="w-full md:w-[64rem]" />
        </div>
        <div id="hero-text" class="flex items-center justify-center flex-col flex-wrap md:items-start">
          <h1 class="md:text-4xl md:text-left font-bold text-primary-500 dark:text-primary-400 text-center text-2xl">
            Competitive
            Programming -
            Workshop &
            Riset Infomatika</h1>
          <p class="mt-4 text-lg text-gray-600 dark:text-white">
            Competitive Programming - Workshop & Riset Informatika atau CP-WRI merupakan sebuah wadah bagi mahasiswa/i
            Politeknik Negeri Malang untuk belajar dan berlatih dalam bidang pemrograman kompetitif.
          </p>
          <div class="mt-8">
            <button class="px-4 py-2 text-white bg-primary-500 rounded hover:bg-blue-600">Get Started</button>
          </div>
          <div class="mt-8" id="buildby">
            <p class="text-gray-600 md:text-left text-center dark:text-white mb-4">Build by</p>
            <div class="flex gap-2 flex-wrap">
              <a href="https://www.github.com/alizul01">
                <div class="flex items-center space-x-4">
                  <img
                    class="p-1 w-10 h-10 rounded-full ring-2 ring-primary-300 dark:ring-primary-500 hover:ring-primary-500 dark:hover:ring-primary-300"
                    src="https://avatars.githubusercontent.com/u/62384197?v=4" alt="">

                  <div class="font-medium dark:text-white">
                    <div>Ali Zulfikar</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">WRI 9</div>
                  </div>
                </div>
              </a>
              <a href="https://github.com/indmind">
                <div class="flex items-center space-x-4">
                  <img
                    class="p-1 w-10 h-10 rounded-full ring-2 ring-primary-300 dark:ring-primary-500 hover:ring-primary-500 dark:hover:ring-primary-300"
                    src="https://avatars.githubusercontent.com/u/29256127?v=4" alt="">
                  <div class="font-medium dark:text-white">
                    <div>Tio Irawan</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">WRI 9</div>
                  </div>
                </div>
              </a>
            </div>

          </div>
        </div>
      </section>
      <section id="timeline">
        <h2 class="heading mb-5">Our Timeline</h2>
        <ol class="items-center lg:flex">
          <li class="relative mb-6 sm:mb-0" v-for="item in timelineData" :key="item.id">
            <div class="flex items-center">
              <div
                class="flex z-10 justify-center items-center w-6 h-6 bg-secondary-200 rounded-full ring-0 ring-white dark:bg-secondary-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                <svg aria-hidden="true" class="w-3 h-3 text-secondary-600 dark:text-secondary-300" fill="currentColor"
                  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>
              <div class="hidden lg:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div class="mt-3 sm:pr-8">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ item.title }}</h3>
              <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {{ item.date }}</time>
            </div>
            <div class="mt-3 sm:pr-8">
              <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{{ item.description }}</p>
            </div>
          </li>
        </ol>
      </section>
      <section id="our_team" class="flex flex-col md:flex-row justify-center items-center mb-5">
        <div id="hero-text" class="flex items-center justify-center flex-col flex-wrap md:items-end">
          <h1 class="md:text-4xl md:text-right font-bold text-primary-500 dark:text-primary-400 text-center text-2xl">
            Lets Join and Compete With Us!
          </h1>
          <p class="mt-4 text-lg text-right text-gray-600 dark:text-white">
            Untuk kamu yang ingin belajar dan mendalami pemrograman kompetitif, kamu bisa bergabung dengan kami. Di sini
            kita akan belajar dan berlatih bersama-sama untuk mengikuti kompetisi pemrograman.
          </p>
          <div class="mt-8 flex flex-row gap-5">
            <button class="px-4 py-2 text-white bg-primary-500 rounded hover:bg-primary-600">
              <a target="_blank" class="text-white text-base hover:text-white font-normal"
                href="https://www.instagram.com/wri_polinema">Join Sekarang</a>
            </button>
            <button class="px-4 py-2 text-white bg-secondary-500 rounded hover:bg-secondary-600">
              <a target="_blank" class="text-white text-base hover:text-white font-normal"
                href="https://docs.google.com/spreadsheets/d/1A1kgiCYkhagELVUhTyRNYXNjL80Cn3q_ChIVNxZsheQ/edit?usp=sharing">Lihat
                Team</a>
            </button>

          </div>
        </div>
        <div id="img-hero">
          <img src="./../../static/images/cp-wri-teams.png" alt="hero" class="w-full md:w-[64rem]" />
        </div>
      </section>
      <section class="body-font">
        <h2 class="heading mb-5">Recent Posts</h2>
        <div class="flex flex-wrap -m-4">
          <div v-for="post in $page.recentPosts.edges" :key="post.id" class="p-4 md:w-1/3">
            <post-card :post="post"></post-card>
          </div>
        </div>
        <div class="text-center my-8">
          <g-link to="/blog/" class="
              inline-block
              px-6
              py-2
              text-xs
              font-medium
              leading-6
              text-center text-gray-900
              hover:text-white
              uppercase
              transition
              bg-primary-500
              rounded
              shadow
              ripple
              hover:shadow-lg hover:bg-primary-600
              focus:outline-none
              waves-effect
            ">
            More Posts
          </g-link>
        </div>
      </section>
    </main>
  </Layout>
</template>

<page-query>
query Posts {
  recentPosts: allPost (sortBy: "date", order: DESC, perPage: 6) {
    edges {
      node {
        id
        title
        categories {
          id
          path
        }
        date (format: "MMMM D, Y")
        summary
        thumbnail
        timeToRead
        path
      }
    }
  }
}
</page-query>

<static-query>
query {
  metadata {
    siteTitle
    siteDescription
    siteAuthor
  }
}
</static-query>

<script>
export default {
  data() {
    return {
      timelineData: [
        {
          title: "Fundamental",
          date: "2 Weeks",
          description: "Deep dive into C++ / Java"
        },
        {
          title: "Discrete Mathematics",
          date: "2 Weeks",
          description: "Learn about set, relation, recursive, graph, and more"
        },
        {
          title: "Algorithm",
          date: "1 Month",
          description: "Study about big O, sorting, searching, and others!"
        },
        {
          title: "Exploration",
          date: "1 Month",
          description: "Practice and explore more about competitive programming"
        },
        {
          title: "Competition",
          date: "Weekly",
          description: "Prepare yourself for the real competition"
        }
      ],
    }
  },
  metaInfo() {
    return {
      title: this.$static.metadata.siteTitle,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$static.metadata.siteDescription,
        },
        { name: 'author', content: this.$static.metadata.siteAuthor },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:description',
          content: this.$static.metadata.siteDescription,
        },
        { name: 'twitter:title', content: this.$static.metadata.siteTitle },
        {
          name: 'twitter:site',
          content: `@${this.$static.metadata.siteAuthor}`,
        },
        {
          name: 'twitter:image',
          content: `${process.env.GRIDSOME_BASE_URL}/images/default-thumb.png`,
        },
        {
          name: 'twitter:creator',
          content: `@${this.$static.metadata.siteAuthor}`,
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: this.$static.metadata.siteTitle },
        {
          property: 'og:description',
          content: this.$static.metadata.siteDescription,
        },
        {
          property: 'og:url',
          content: process.env.GRIDSOME_BASE_URL,
        },
        {
          property: 'og:image',
          content: `${process.env.GRIDSOME_BASE_URL}/images/default-thumb.png`,
        },
        {
          property: 'og:image:secure_url',
          content: `${process.env.GRIDSOME_BASE_URL}/images/default-thumb.png`,
        },
      ],
    }
  },

  components: {
    PostCard: () => import('~/components/PostCard'),
  },
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
