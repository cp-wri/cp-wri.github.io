
<template>
  <div>
    <section class="body-font">
      <div class="container mx-auto flex flex-wrap py-8">
        <h1 class="text-3xl font-bold mb-7">
          {{ page.contest.title }}
        </h1>

        <div class="w-full">
          <transition name="fade" mode="out-in">
            <div  key="pdf">
              <div v-if="!showSolutions && (page.contest.pdf == null || page.contest.pdf.trim() == '')">
                <p class="text-gray-700 text-base">
                  Soal tidak tersedia...
                </p>
              </div>

              <iframe v-show="!showSolutions" :src="page.contest.pdf" width="100%" height="700px" frameborder="0"/>
            </div>
          </transition>
        </div>

        <transition name="fade" mode="out-in">
          <div v-show="showSolutions">
            <div v-if="page.contest.content.trim() === ''">
              <p class="text-l mb-7">
                Belum ada solusi/pembahasan untuk soal ini :(
              </p>
            </div>
            <div  class="markdown-body mt-7" v-html="page.contest.content" key="contents"></div>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>

<!-- Front-matter fields can be queried from GraphQL layer -->

<script>
export default {
  name: 'ContestPage',
  props: {
    page: {
      type: Object,
      required: true
    },
    showSolutions: {
      type: Boolean,
      default: null
    },
  },
}
</script>



<style src="../../css/github-markdown.css" />

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0
}
</style>
