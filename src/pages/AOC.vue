
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
        <p class="text-xl font-semibold pb-5">Events</p>

        <ul>
          <li v-for="event in events" :key="`${event.year}/${event.id}`">
            <a @click.prevent="setSelectedEvent(event)" class="
                text-gray-600
                dark:text-gray-400
                hover:text-primary-600
                dark:hover:text-primary-200
                cursor-pointer
                block
                pb-2
              " :class="{
                'text-primary-600 dark:text-primary-600':
                  selectedEvent.id === event.id &&
                  selectedEvent.year === event.year,
              }">
              {{ event.name }}
            </a>
          </li>
        </ul>
      </aside>

      <section class="w-full md:w-4/7 flex flex-col px-2 md:px-10">
        <div class="w-full flex flex-col">
          <div class="w-auto justify-center flex-col items-center block">
            <div class="flex justify-between items-center">
              <p class="text-3xl font-semibold mb-4">
                Leaderboard

                <span class="text-gray-500 dark:text-gray-400 text-sm block">
                  {{
                      selectedLastUpdate === null
                        ? '-'
                        : `Last updated: ${selectedLastUpdate.toLocaleString()}`
                  }}
                </span>
              </p>

              <!-- select ordering: Local Score, Global Score, Stars -->
              <select v-model="selectedOrdering" class="
                  border border-gray-300
                  dark:border-gray-700
                  rounded-md
                  px-2
                  py-1
                  text-gray-600
                  dark:text-gray-400
                ">
                <option value="local">Local Score</option>
                <option value="global">Global Score</option>
                <option value="stars">Stars</option>
              </select>
            </div>

            <div class="markdown-body">
              <table class="leaderboard-table">
                <thead>
                  <tr>
                    <th class="text-left">Rank</th>
                    <th class="text-left">Username</th>
                    <th class="text-left">Local Score</th>
                    <th class="text-left">Global Score</th>
                    <th class="text-left">Stars</th>
                    <th v-for="day in 25" :key="day" class="text-left">
                      {{ day }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(member, index) in sortedMembers" :key="member.id">
                    <td>{{ index + 1 }}</td>
                    <td :class="{ 'font-bold text-red': member.name === null }">
                      {{ member.name || '!!Anonymous!!' }}
                    </td>
                    <td>{{ member.local_score }}</td>
                    <td>{{ member.global_score }}</td>
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
        </div>
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
        <div class="w-full">
          <p class="text-xl font-semibold mb-4">Event Detail</p>
          <div class="markdown-body">
            <table class="table-borderless">
              <tbody>
                <tr>
                  <th class="text-left">Event Name</th>
                  <td class="text-left">{{ selectedEvent.name }}</td>
                </tr>
                <tr>
                  <th class="text-left">Year</th>
                  <td class="text-left">{{ selectedEvent.year }}</td>
                </tr>
                <tr>
                  <th class="text-left">Join Code</th>
                  <td class="text-left">
                    <pre>{{ selectedEvent.joinCode }}</pre>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </aside>
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
          joinCode: '2238062-3ba1a0bb',
        },
      ],
      selectedEvent: {
        name: 'Advent of Code 2022',
        id: '2238062',
        year: '2022',
        joinCode: '2238062-3ba1a0bb',
      },
      selectedLastUpdate: null,
      members: [],
      isLoading: false,
      selectedOrdering: 'local',
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
        this.selectedLastUpdate = new Date(data.updated)
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
  computed: {
    sortedMembers() {
      return this.members.sort((a, b) => {
        if (this.selectedOrdering === 'local') {
          return b.local_score - a.local_score
        } else if (this.selectedOrdering === 'global') {
          if (b.global_score === a.global_score) {
            return b.local_score - a.local_score
          }
          return b.global_score - a.global_score
        } else if (this.selectedOrdering === 'stars') {
          if (b.stars === a.stars) {
            return a.last_star_ts - b.last_star_ts
          }
          return b.stars - a.stars
        }
      })
    },
  },
}
</script>

<style src="~/css/main.css">

</style>
<style src="~/css/github-markdown.css">

</style>

<style scoped>
.content-container {
  min-height: 100vh;
}

.table-borderless>tbody>tr>td,
.table-borderless>tbody>tr>th,
.table-borderless>tfoot>tr>td,
.table-borderless>tfoot>tr>th,
.table-borderless>thead>tr>td,
.table-borderless>thead>tr>th {
  border: none;
}

.leaderboard-table {
  margin-top: 0 !important;
}

.text-red {
  color: #e3342f;
}
</style>

