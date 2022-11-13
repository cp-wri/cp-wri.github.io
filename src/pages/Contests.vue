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
        <Sidebar />
      </aside>

      <section class="w-full md:w-5/7 flex flex-col px-2 md:px-10">
        <div class="w-full flex flex-col my-4">
          <div class="w-auto justify-center flex-col items-center flex">
            <img
              src="./../../static/images/contest-img-temp.png"
              alt="contest-img-temp"
              class="w-full md:w-1/2"
            />
            <div class="w-1/2 flex flex-col justify-center items-center">
              <h1
                class="
                  text-3xl text-left
                  font-semibold
                  text-gray-900
                  dark:text-white
                "
              >
                Kompetisi
              </h1>
              <p class="text-gray-700 dark:text-gray-300 text-center mt-2">
                Pilih latihan kompetisi yang ingin kamu kerjakan di sebelah kiri
                halaman ini.
              </p>
            </div>
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

<script>

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
   }
}
</script>

<style src="~/css/main.css" />

<style>
.content-container {
  min-height: 100vh;
}
</style>

