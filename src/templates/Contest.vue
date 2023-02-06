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
        <Sidebar :oppenedContest="$page.contest" />
      </aside>

      <section class="w-full md:w-4/7 flex flex-col px-2 md:px-10">
        <ContestPage :page="$page" :showSolutions="showSolutions" />
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
          <button
            @click="toggleShowSolutions()"
            class="
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
            "
            :class="{ 'bg-primary-500 text-white': showSolutions }"
          >
            <span class="font-semibold capitalize py-1">
              Tampilkan Solusi
            </span>
          </button>
          <!-- disclaimer to solve the problem yourself before opening solutions -->
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-5">
            Tip: Cobalah untuk menyelesaikan soal ini sendiri terlebih dahulu
            sebelum membuka solusi.
          </p>

          <!-- loading animation -->
          <div
            v-if="isCheckingForAvailableTestCases"
            class="flex justify-center"
          >
            <div role="status">
              <svg
                aria-hidden="true"
                class="
                  inline
                  w-8
                  h-8
                  mr-2
                  text-gray-200
                  animate-spin
                  dark:text-gray-600
                  fill-gray-600
                  dark:fill-gray-300
                "
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>

          <div v-show="!isCheckingForAvailableTestCases && hasTestCases">
            <p class="text-xl font-semibold mb-5">Test Solusimu</p>

            <!-- form file input, the code will be read from the file, no need to set action -->
            <form @submit.prevent="submitCode">
              <div class="flex flex-col">
                <label class="text-base text-gray-900 dark:text-white mb-2">
                  <span class="font-semibold capitalize py-1">
                    Source Code
                  </span>
                </label>

                <!-- hide real input and use custom one -->
                <input
                  type="file"
                  class="hidden"
                  id="file-input"
                  @change="onFileChange"
                />
                <label
                  for="file-input"
                  class="
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
                  "
                >
                  <span class="font-semibold capitalize py-1">
                    {{ fileName || 'Pilih file' }}
                  </span>
                </label>
              </div>

              <div class="flex flex-col">
                <label class="text-base text-gray-900 dark:text-white mb-2">
                  <span class="font-semibold capitalize py-1">Bahasa</span>
                </label>

                <select
                  class="
                    text-base text-gray-900 text-left
                    dark:text-white dark:bg-transparent
                    border
                    px-2
                    py-2
                    rounded-md
                    w-full
                    flex flex-row
                    items-center
                    justify-between
                    mb-2
                    cursor-pointer
                  "
                  v-model="selectedLanguage"
                >
                  <option
                    v-for="(language, idx) in languages"
                    :key="idx"
                    :value="language"
                  >
                    {{ language.name }}
                  </option>
                </select>
              </div>

              <div class="flex flex-col">
                <label class="text-base text-gray-900 dark:text-white mb-2">
                  <span class="font-semibold capitalize py-1"
                    >Compiler options</span
                  >
                </label>

                <input
                  type="text"
                  class="
                    text-base text-gray-900 text-left
                    dark:text-white dark:bg-transparent
                    border
                    px-2
                    py-1
                    rounded-md
                    w-full
                    flex flex-row
                    items-center
                    justify-between
                    mb-2
                  "
                  v-model="compilerOptions"
                  @change="onCompilerOptionsChange"
                />
              </div>

              <div class="flex flex-col">
                <label class="text-base text-gray-900 dark:text-white mb-2">
                  <span class="font-semibold capitalize py-1"
                    >Command line arguments</span
                  >
                </label>

                <input
                  type="text"
                  class="
                    text-base text-gray-900 text-left
                    dark:text-white dark:bg-transparent
                    border
                    px-2
                    py-1
                    rounded-md
                    w-full
                    flex flex-row
                    items-center
                    justify-between
                    mb-2
                  "
                  v-model="commandLineArguments"
                />
              </div>

              <div class="flex flex-col">
                <label class="text-base text-gray-900 dark:text-white mb-2">
                  <span class="font-semibold capitalize py-1"
                    >Api Key
                    <span class="text-xs text-gray-500 dark:text-gray-400"
                      >(Sunnah Muakkad)</span
                    ></span
                  >
                </label>

                <input
                  type="text"
                  class="
                    text-base text-gray-900 text-left
                    dark:text-white dark:bg-transparent
                    border
                    px-2
                    py-1
                    rounded-md
                    w-full
                    flex flex-row
                    items-center
                    justify-between
                  "
                  placeholder="Menggunakan api key default"
                  v-model="apiKey"
                  @change="onApiKeyChange"
                />
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-5">
                  Karena ini menggunakan layanan
                  <a href="https://judge0.com/">Judge0</a>, sebaiknya gunakan
                  api key kalian sendiri agar menghindari limit request.
                </p>
              </div>

              <div class="flex flex-col">
                <button
                  type="submit"
                  class="
                    bg-primary-400
                    text-base text-left text-white
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
                    disabled:opacity-50
                  "
                  :disabled="
                    isSubmitting ||
                    isProcessingTestCases ||
                    !code ||
                    !selectedLanguage
                  "
                >
                  <span class="font-semibold capitalize py-1">
                    <span v-if="isSubmitting">Mengirim...</span>
                    <span v-else-if="isProcessingTestCases">
                      Harap tunggu...
                    </span>
                    <span v-else>Submit</span>
                  </span>
                </button>
              </div>
            </form>

            <p class="text-xl font-semibold mt-5 mb-5">
              Test-Cases
              <span v-if="isProcessingTestCases">
                <svg
                  aria-hidden="true"
                  class="
                    inline
                    w-4
                    h-4
                    ml-2
                    text-gray-200
                    animate-spin
                    dark:text-gray-600
                    fill-gray-600
                    dark:fill-gray-300
                  "
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </span>
            </p>

            <ul>
              <li
                v-for="(testCase, idx) in testCases"
                :key="testCase.id"
                class="
                  flex flex-row
                  items-center
                  justify-between
                  mb-2
                  border
                  p-2
                  rounded-md
                  w-full
                  cursor-pointer
                  hover:bg-gray-100
                  dark:hover:bg-gray-800
                "
                @click="showSubmissionDetail(idx)"
              >
                <span class="text-base text-gray-900 dark:text-white">
                  Test {{ idx + 1 }}
                </span>

                <span
                  v-if="submissionsResult[idx]"
                  class="text-base text-gray-900 rounded-md px-2 py-1"
                  :style="mapStatusToColor(submissionsResult[idx].status.id)"
                >
                  {{ submissionsResult[idx].status.description }}
                  <span class="text-xs" v-if="submissionsResult[idx].time">
                    ({{ submissionsResult[idx].time }}s)
                  </span>
                </span>
              </li>
            </ul>
          </div>
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
import {
  setApiKey,
  getApiKey,
  defaultApiKey,
  submitBatch,
  checkBatchSubmissions,
  statusesColors,
  languages,
  setSelectedLanguage,
  getSelectedLanguage,
  setCompilerOptions,
  getCompilerOptions,
} from '~/functions/judge0-test.js'

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
      // will be initiated during mounted (akses awal ke localStorage wajib lewat mounted biar bisa dibuild)
      // https://github.com/gridsome/gridsome/issues/191
      apiKey: '',
      selectedLanguage: '',
      compilerOptions: '',
      code: '',
      // end of initiated during mounted
      isSubmitting: false,
      hasTestCases: false,
      isProcessingTestCases: false,
      isCheckingForAvailableTestCases: false,
      fileName: '',
      language: 'cpp',
      testCases: [],
      languages: languages,
      commandLineArguments: '',
      submissionsToken: [],
      submissionsResult: [],
    }
  },
  mounted() {
    this.apiKey = getApiKey() == defaultApiKey ? '' : getApiKey()
    this.selectedLanguage = getSelectedLanguage()
    this.compilerOptions = getCompilerOptions(getSelectedLanguage().id)
    this.checkForAvailableTestCase()
  },
  methods: {
    toggleShowSolutions() {
      this.showSolutions = !this.showSolutions
    },
    // handling test cases
    onApiKeyChange(e) {
      setApiKey(this.apiKey)
    },
    async checkForAvailableTestCase() {
      if (this.isCheckingForAvailableTestCases) return

      this.isCheckingForAvailableTestCases = true
      this.testCases = []

      const testcaseUrl = this.$page.contest.pdf + '.testcase.json'

      try {
        const response = await fetch(testcaseUrl)
        const data = await response.json()
        this.hasTestCases = true
        this.testCases = data

        this.checkSubmissionResult()
      } catch (error) {
        this.hasTestCases = false
      } finally {
        this.isCheckingForAvailableTestCases = false
      }
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      try {
        const file = files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.code = e.target.result
        }
        reader.readAsText(file)
        this.fileName = file.name
      } catch (error) {
        this.$swal({
          title: 'Error',
          text: error.message,
          icon: 'error',
        })
      }
    },
    async submitCode() {
      if (this.isSubmitting) return

      this.isSubmitting = true

      const submissions = []

      for (let i = 0; i < this.testCases.length; i++) {
        const testCase = this.testCases[i]
        const body = {
          source_code: this.code,
          language_id: this.selectedLanguage.id,
          compiler_options: this.compilerOptions,
          command_line_arguments: this.commandLineArguments,
          stdin: testCase.input,
          expected_output: testCase.output,
          cpu_time_limit: 3,
        }

        submissions.push(body)
      }

      try {
        const data = await submitBatch(submissions)
        this.submissionsToken = data

        // store data in local storage
        localStorage.setItem(
          this.$page.contest.path + '-submissions',
          JSON.stringify(data)
        )

        this.checkSubmissionResult()
      } catch (error) {
        this.$swal({
          title: 'Error',
          text: error.message,
          icon: 'error',
        })
      } finally {
        this.isSubmitting = false
      }
    },
    async checkSubmissionResult() {
      if (this.submissionsToken.length === 0) {
        const savedSubmissions = localStorage.getItem(
          this.$page.contest.path + '-submissions'
        )

        if (!savedSubmissions) return

        this.submissionsToken = JSON.parse(savedSubmissions)
      }

      const tokens = this.submissionsToken.map((submission) => submission.token)

      try {
        const data = await checkBatchSubmissions(tokens)
        this.submissionsResult = data.submissions

        const needRecheck = data.submissions.some(
          (submission) =>
            submission.status.id === 1 || submission.status.id === 2
        )

        if (needRecheck) {
          this.isProcessingTestCases = true
          setTimeout(() => {
            this.checkSubmissionResult()
          }, 2000)
        } else {
          this.isProcessingTestCases = false
        }
      } catch (error) {
        this.$swal({
          title: 'Error',
          text: error.message,
          icon: 'error',
        })
      }
    },
    showSubmissionDetail(submissionIdx) {
      const submission = this.submissionsResult[submissionIdx]
      const expected = this.testCases[submissionIdx].output
      const stdin = this.testCases[submissionIdx].input

      if (!submission) {
        this.$swal({
          title: 'Test Case ' + (submissionIdx + 1),
          html: `
            <div class="text-left mb-4">
              <p class="font-semibold pb-1">Input:</p>
              <pre class="bg-gray-200 p-4 rounded max-h-48 overflow-y-auto"
              >${stdin}</pre>
            </div>
            <div class="text-left mb-4">
              <p class="font-semibold pb-1">Expected Output:</p>
              <pre class="bg-gray-200 p-4 rounded max-h-48 overflow-y-auto"
              >${expected}</pre>
            </div>
          `,
          icon: 'info',
        })
      } else if (submission.status.id == 3) {
        this.$swal({
          title: 'Accepted',
          html: `
            <div class="text-left mb-4">
              <p class="font-semibold pb-1">Input:</p>
              <pre class="bg-gray-200 p-4 rounded max-h-48 overflow-y-auto"
              >${stdin}</pre>
            </div>
            <div class="text-left mb-4">
              <p class="font-semibold pb-1">Output:</p>
              <pre class="bg-gray-200 p-4 rounded max-h-48 overflow-y-auto"
              >${submission.stdout}</pre>
            </div>
            <div class="text-left">
              <p class="font-semibold pb-1">Time: ${submission.time} ms</p>
              <p class="font-semibold pb-1">Memory: ${submission.memory} KB</p>
            </div>
          
          `,
          icon: 'success',
        })
      } else if (submission.status.id == 4) {
        this.$swal({
          title: 'Wrong Answer',
          html: `
            <div class="text-left mb-4">
              <p class="font-semibold pb-1">Input:</p>
              <pre class="bg-gray-200 p-4 rounded max-h-48 overflow-y-auto"
              >${stdin}</pre>
            </div>

            <div class="flex flex-col md:flex-row mb-4">
              <div class="w-full md:w-1/2 md:mr-1">
                <div class="text-left mb-4">
                  <p class="font-semibold pb-1">Expected:</p>
                  <pre class="bg-gray-200 p-4 rounded  max-h-48 overflow-auto"
                  >${expected}</pre>
                </div>
              </div>
              <div class="w-full md:w-1/2 md:ml-1">
                <div class="text-left mb-4">
                  <p class="font-semibold pb-1">Ouput:</p>
                  <pre class="bg-gray-200 p-4 rounded max-h-48 overflow-auto"
                  >${submission.stdout}</pre>
                </div>
              </div>
            </div>

            <div class="text-left">
              <p class="font-semibold pb-1">Time: ${submission.time} ms</p>
              <p class="font-semibold pb-1">Memory: ${submission.memory} KB</p>
            </div>
          `,
          icon: 'error',
        })
      } else if (submission.status.id >= 5 && submission.status.id <= 14) {
        const parsed = JSON.stringify(
          this.submissionsResult[submissionIdx],
          null,
          2
        )
        this.$swal({
          title: submission.status.description,
          html: submission.compile_output
            ? `
            <div class="text-left mb-4">
              <p class="font-semibold pb-1">Output:</p>
              <pre class="bg-gray-200 p-4 rounded max-h-64 overflow-y-auto"
              >${submission.compile_output}</pre>
            </div>
          `
            : `
            <div class="text-left mb-4">
              <p class="font-semibold pb-1">Raw Response:</p>
              <pre class="bg-gray-200 p-4 rounded max-h-64 overflow-y-auto"
              >${parsed}</pre>
            </div>
          `,
          icon: 'error',
        })
      }
      // } else if (submission.status.id == 1 ||
      // this.$swal(parsed)
    },
    mapStatusToColor(statusId) {
      return statusesColors[statusId]
    },
    onCompilerOptionsChange(e) {
      setCompilerOptions(this.selectedLanguage.id, this.compilerOptions)
    },
  },
  watch: {
    $route() {
      this.showSolutions = false
      this.submissionsToken = []
      this.submissionsResult = []
      this.checkForAvailableTestCase()
    },
    selectedLanguage() {
      setSelectedLanguage(this.selectedLanguage)
      this.compilerOptions = getCompilerOptions(this.selectedLanguage.id)
    },
  },
}
</script>

<style src="~/css/main.css" />

<style>
.content-container {
  min-height: 100vh;
}

/* style file input */
input[type='file'] {
  display: none;
}
</style>