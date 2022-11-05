
<template>
  <div>
    <section class="body-font">
      <div class="container mx-auto flex flex-wrap py-8">
        <h1 class="text-3xl font-bold mb-7">
          {{ page.contest.title }}
        </h1>

        <div class="w-full">
          <iframe v-show="selected == null" :src="page.contest.pdf" width="100%" height="700px" frameborder="0"/>

          <div v-show="selected != null">
            <pre v-html="selectedCode"/>
          </div>
        </div>

        <div class="markdown-body mt-7" v-html="page.contest.content"></div>
      </div>
    </section>
  </div>
</template>

<script src="https://gist.github.com/indmind/0c16a9de569c7260e047f67a48d4785c.js"></script>

<!-- Front-matter fields can be queried from GraphQL layer -->

<script>
import VuePdf from 'vue-pdf'

export default {
  name: 'ContestPage',
  props: {
    page: {
      type: Object,
      required: true
    },
    selected: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      selectedCode: '',
      selectedLang: '',
    }
  },
  methods: {
    async loadCode(s)  {
      const res = await fetch(s);
      const code = await res.text();
      const lang = s.split('.').pop();

      this.selectedCode = code;
      this.selectedLang = lang;
    }
  },
  components: {
    AppSidebar: () => import('~/components/parts/AppSidebar'),
    // Layout: () => import('~/layouts/Contests.vue'),
    VuePdf,
  },
  watch: {
    selected: function (val) {
      if(val == null) return;
      this.loadCode(val)
    }
  }
}
</script>

<style src="../../css/github-markdown.css" />
