<template>
  <div class="w-full flex flex-col sticky top-5">
    <div class="w-full flex flex-col my-4">
      <p class="text-xl font-semibold pb-5">Kompetisi</p>

      <ul>
        <li
          v-for="(contest, contestidx) in contests"
          :key="contestidx"
          class="
            border-b border-solid
            last:border-none
            border-gray-300
            dark:border-gray-700
            mt-2
          "
        >
          <div
            class="
              text-base text-gray-900 text-left
              bg-primary-100
              dark:bg-primary-600 dark:text-white
              px-2
              py-1
              rounded-md
              w-full
              flex flex-row
              items-center
              justify-between
              mb-2
              cursor-pointer
            "
            :style="
              contestsColor[contestidx.toLocaleLowerCase()]
                ? `background-color: ${bgC(contestidx)}; color: ${fgC(
                    contestidx
                  )}; filter: saturate(160%)`
                : ''
            "
            @click="toggleContest(contestidx)"
          >
            <span class="font-semibold first-letter:capitalize py-1">{{
              contestidx
            }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 ml-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <transition name="scroll-up" mode="out-in">
            <ul class="ml-1" v-if="isContestOpen(contestidx)" key="years">
              <li v-for="(year, yearidx) in contest" :key="yearidx">
                <div
                  class="
                    text-base text-gray-800
                    dark:text-white
                    bg-secondary-50
                    dark:bg-secondary-500
                    text-left
                    bg-primary-200
                    px-2
                    py-1
                    rounded-md
                    w-full
                    flex flex-row
                    items-center
                    justify-between
                    mb-2
                    cursor-pointer
                  "
                  :style="
                    contestsColor[contestidx.toLocaleLowerCase()]
                      ? `background-color: ${bgC(contestidx)}; color: ${fgC(
                          contestidx
                        )}; filter: saturate(100%)`
                      : ''
                  "
                  @click="toggleYear(contestidx, yearidx)"
                >
                  <span
                    class="font-semibold lowercase first-letter:capitalize py-1"
                    >{{ yearidx }}</span
                  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 ml-auto"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <transition name="scroll-up" mode="out-in">
                  <ul
                    class="ml-1"
                    v-if="isYearOpen(contestidx, yearidx)"
                    key="rounds"
                  >
                    <li v-for="(round, roundidx) in year" :key="roundidx">
                      <div
                        class="
                          text-base text-gray-800
                          dark:text-white
                          bg-primary-100
                          dark:bg-primary-600
                          text-left
                          bg-primary-200
                          px-2
                          py-1
                          rounded-md
                          w-full
                          flex flex-row
                          items-center
                          justify-between
                          mb-2
                          cursor-pointer
                        "
                        :style="
                          contestsColor[contestidx.toLocaleLowerCase()]
                            ? `background-color: ${bgC(
                                contestidx
                              )}; color: ${fgC(
                                contestidx
                              )}; filter: saturate(50%)`
                            : ''
                        "
                        @click="toggleRound(contestidx, yearidx, roundidx)"
                      >
                        <span
                          class="
                            font-semibold
                            lowercase
                            first-letter:capitalize
                            py-1
                          "
                          >{{ roundidx }}</span
                        >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 ml-auto"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <transition name="scroll-up" mode="out-in">
                        <ul
                          class="ml-1"
                          v-if="isRoundOpen(contestidx, yearidx, roundidx)"
                          key="problems"
                        >
                          <li
                            v-for="(problem, problemidx) in round"
                            :key="problemidx"
                          >
                            <a
                              :href="problem.node.path"
                              class="text-gray-700 dark:text-gray-300"
                            >
                              <div
                                class="
                                  text-base
                                  dark:bg-gray-800 dark:text-white
                                  text-left
                                  border
                                  px-2
                                  py-0.5
                                  rounded-md
                                  w-full
                                  flex flex-row
                                  items-center
                                  justify-between
                                  mb-2
                                "
                                :class="{
                                  'bg-secondary-400 text-white dark:bg-secondary-600':
                                    oppenedContest != null &&
                                    oppenedContest.path == problem.node.path,
                                }"
                              >
                                <span
                                  class="
                                    font-semibold
                                    lowercase
                                    first-letter:capitalize
                                    py-1
                                  "
                                >
                                  {{ problem.node.title }}</span
                                >
                                <!-- circle -->
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5 ml-auto"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10 12a2 2 0 100-4 2 2 0 000 4zm0 2a4 4 0 100-8 4 4 0 000 8z"
                                    clip-rule="evenodd"
                                  />
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
</template>


<static-query>
query {
  allContest(sortBy: "contest" order: ASC) {
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
  props: {
    oppenedContest: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      dropdown: {},
      contestsColor: {
        gemastik: {
          bg: '#f7e1e1',
          fg: '#f72525',
        },
        compfest: {
          bg: '#fff6e3',
          fg: '#fcad00',
        },
        findit: {
          bg: '#c1c8e3',
          fg: '#2f3652',
        },
      },
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
          isOpen: false,
          rounds: {},
        }
      }
      if (!this.dropdown[contest].years[year].rounds[round]) {
        this.dropdown[contest].years[year].rounds[round] = {
          isOpen: false,
        }
      }
    })
    // this.dropdown = { ...this.dropdown }

    if (this.oppenedContest) {
      // set all to open for this.$page.contest
      const { contest, year, round } = this.oppenedContest
      this.dropdown[contest].isOpen = true
      this.dropdown[contest].years[year].isOpen = true
      this.dropdown[contest].years[year].rounds[round].isOpen = true
      this.dropdown = { ...this.dropdown }
    }
  },
  methods: {
    toggleContest(contest) {
      const updated = this.dropdown
      updated[contest].isOpen = !updated[contest].isOpen
      this.dropdown = structuredClone(updated)
    },
    toggleYear(contest, year) {
      const updated = this.dropdown
      updated[contest].years[year].isOpen = !updated[contest].years[year].isOpen
      this.dropdown = structuredClone(updated)
    },
    toggleRound(contest, year, round) {
      const updated = this.dropdown
      updated[contest].years[year].rounds[round].isOpen =
        !updated[contest].years[year].rounds[round].isOpen
      this.dropdown = structuredClone(updated)
    },
    isContestOpen(contest) {
      if (this.dropdown[contest] != null) {
        return this.dropdown[contest].isOpen
      }
      return false
    },
    isYearOpen(contest, year) {
      if (
        this.dropdown[contest] != null &&
        this.dropdown[contest].years[year] != null
      ) {
        return this.dropdown[contest].years[year].isOpen
      }
      return false
    },
    isRoundOpen(contest, year, round) {
      if (
        this.dropdown[contest] != null &&
        this.dropdown[contest].years[year] != null &&
        this.dropdown[contest].years[year].rounds[round] != null
      ) {
        return this.dropdown[contest].years[year].rounds[round].isOpen
      }
      return false
    },
    bgC(contest) {
      if (this.contestsColor[contest.toLocaleLowerCase()] != null) {
        return this.contestsColor[contest.toLocaleLowerCase()].bg
      }
      return '#fff'
    },
    fgC(contest) {
      if (this.contestsColor[contest.toLocaleLowerCase()] != null) {
        return this.contestsColor[contest.toLocaleLowerCase()].fg
      }
      return '#000'
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
}
</script>


<style scoped>
.scroll-up-enter-active,
.scroll-up-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}

.scroll-up-enter {
  transform: translateY(-10px);
  opacity: 0;
}

.scroll-up-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>

