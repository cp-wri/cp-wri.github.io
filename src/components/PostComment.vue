<template>
  <!-- <Vssue :title="title" /> -->
  <Disqus :shortname="shortName" :identifier="title" />
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    shortName() {
      return process.env.GRIDSOME_DISQUS_SHORTNAME
    }
  }
}
</script>

<style src="../css/vssue.css" />
