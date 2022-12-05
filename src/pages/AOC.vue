
<template>
  <Layout>
    <div class="content-container container px-5 py-8 mx-auto flex flex-wrap">
      <aside
        class="
          w-full
          md:w-1/7
          sm:w-0
          flex flex-col
          pr-5
          sm:block
          border-r-1 border-gray-300
          dark:border-gray-700
        "
        aria-label="left-sidebar"
      >
        <p class="text-xl font-semibold pb-5">Events</p>

        <ul>
          <li v-for="event in events" :key="`${event.year}/${event.id}`">
            <a
              @click.prevent="setSelectedEvent(event)"
              class="
                text-gray-600
                dark:text-gray-400
                hover:text-primary-600
                dark:hover:text-primary-200
                cursor-pointer
                block
                pb-2
              "
              :class="{
                'text-primary-600 dark:text-primary-200':
                  selectedEvent.id === event.id &&
                  selectedEvent.year === event.year,
              }"
            >
              {{ event.name }}
            </a>
          </li>
          <!-- <li>
            <g-link to="/aoc/2022/ntah">ntah</g-link>
            </li> -->
        </ul>
      </aside>

      <section class="w-full md:w-5/7 flex flex-col px-2 md:px-10">
        <div class="w-full flex flex-col">
          <div
            class="
              w-auto
              justify-center
              flex-col
              items-center
              block
              markdown-body
            "
          >
            <h2>Leaderboard</h2>

            <table>
              <thead>
                <tr>
                  <th class="text-left">Rank</th>
                  <th class="text-left">Score</th>
                  <th class="text-left">Username</th>
                  <th class="text-left">Stars</th>
                  <th v-for="day in 25" :key="day" class="text-left">
                    {{ day }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, index) in members" :key="member.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ member.local_score }}</td>
                  <td>
                    <!-- <g-link :to="`/aoc/2022/leaderboard/${member.id}`"> -->
                      {{ member.name }}
                    <!-- </g-link> -->
                  </td>
                  <td>{{ member.stars }}</td>
                  <td v-for="day in 25" :key="day">
                    <span v-if="member.completion_day_level[day]">
                      <span v-if="member.completion_day_level[day][1]">
                        <span v-if="member.completion_day_level[day][2]">
                          <!-- gold -->
                          <span style="color: #ffd700">★</span>
                        </span>
                        <span v-else>
                          <!-- silver -->
                          <span style="color: #c0c0c0">★</span>
                        </span>
                      </span>
                      <span v-else>
                        <span class="text-red">0</span>
                      </span>
                    </span>
                  </td>
                </tr>

                <tr v-if="isLoading">
                  <td colspan="28" class="text-center">
                    <span class="text-gray-500">Loading...</span>
                  </td>
                </tr>
                <tr v-else-if="members.length === 0">
                  <td colspan="28" class="text-center">
                    <span class="text-gray-500">Data kosong</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>


<page-query>
query {
  metadata {
    siteName
  }
}
</page-query>

<script scoped>
export default {
  metaInfo() {
    return {
      title: 'Competitive Programming Contests',
      meta: [
        {
          key: 'description',
          name: 'description',
          content: 'Competitive Programming Contests',
        },
        {
          name: 'description',
          content: 'Soal-soal dari beberapa kontes pemrograman kompetitif',
        },
      ],
    }
  },
  components: {
    Sidebar: () => import('~/components/contest/Sidebar'),
  },
  data() {
    return {
      events: [
        {
          name: 'Advent of Code 2022',
          id: '2238062',
          year: '2022',
        },

        // when adding new data, dont forget to update cron fetcher to
        // https://aoc-leaderboard-fetcher.onrender.com/{year}/{id}/fetch
        // at least every 15 minutes
        // {
        //   name: 'Advent of Code 2021',
        //   id: '2238062',
        //   year: '2021',
        // },
      ],
      selectedEvent: {
        name: 'Advent of Code 2022',
        id: '2238062',
        year: '2022',
      },
      members: [],
      isLoading: false,
    }
  },
  methods: {
    setSelectedEvent(event) {
      this.selectedEvent = event
      this.members = []
      this.fetchMembers()
    },
    async fetchMembers() {
      this.isLoading = true
      try {
        const endpoint = `https://aoc-leaderboard-fetcher.onrender.com/${this.selectedEvent.year}/${this.selectedEvent.id}`
        const response = await fetch(endpoint)
        const data = await response.json()
        this.members = Object.values(data.data.members)
      } catch (error) {
        // if (error.response != null && error.response.status === 404) {
          this.members = []
        // }
      } finally {
        this.isLoading = false
      }
    },
  },
  async mounted() {
    await this.fetchMembers()
  },
}
</script>

<style src="~/css/main.css"></style>
<style src="~/css/github-markdown.css"></style>

<style>
.content-container {
  min-height: 100vh;
}
</style>

