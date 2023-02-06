<template>
  <div>
    <banner-modal v-if="showModal" @close="showModal = false">
      <template #over>
        <button class="
            bg-white
            flex
            justify-center
            items-center
            absolute
            top-3
            right-3
            w-8
            h-8
            rounded-full
            text-secondary-600
            dark:text-secondary-400
            p-2
            hover:text-tertiary-600
            dark:hover:text-tertiary-600
          " @click.stop="showModal = false">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </template>

      <template #body>
        <div class="banner-body">
          <div class="banner-image-display">
            <g-link v-if="bannerShown.action" :to="bannerShown.action" class="banner-image-display-link">
              <img :src="bannerShown.img" :key="bannerShown.img" @mouseenter="isHovering = true"
                @mouseleave="isHovering = false" />
            </g-link>
            <img v-else :src="bannerShown.img" :key="bannerShown.img" @click.stop @mouseenter="isHovering = true"
              @mouseleave="isHovering = false" />
          </div>
          <div class="banner-image-selector">
            <div v-for="(banner, idx) in banners" :key="banner.img" class="banner-image-selector-item"
              @click.stop="indexShown = idx">
              <img :src="banner.img" :class="{
                'banner-image-selector-item-active': indexShown === idx,
              }" />
            </div>
          </div>
        </div>
      </template>
    </banner-modal>

    <div v-show="banners.length > 0 && !showModal" class="
        absolute
        -right-6
        top-45
        text-white
        z-10
        transform
        -rotate-90
        bg-primary-400
        px-4
        rounded-t
        cursor-pointer
      " @click="showModal = true">
      event {{ banners.length > 1 ? 's' : '' }}
    </div>
  </div>
</template>

<script>
import BannerModal from './BannerModal.vue'

export default {
  components: {
    BannerModal,
  },
  data() {
    return {
      showModal: false,
      isHovering: false,
      banners: [
          // {
          //   img: 'images/banner/events/aoc2022.webp',
          //   action: '/blog/aoc2022/',
          //   visible: false,
          // },
      ],
      indexShown: 0,
    }
  },
  mounted() {
    if(this.banners.length <= 0) return;
    
    // set show modal if eventBannerModalClosedTime is not set
    if ( !localStorage.getItem('eventBannerModalClosedTime')) {
      this.showModal = true
    } else {
      // set show modal if eventBannerModalClosedTime is set but expired
      const eventBannerModalClosedTime = localStorage.getItem(
        'eventBannerModalClosedTime'
      )
      const now = new Date().getTime()

      // only show modal if eventBannerModalClosedTime is 3 hours ago
      if (now - eventBannerModalClosedTime > 3 * 60 * 60 * 1000) {
        this.showModal = true
      }
    }
    // auto change banner
    setInterval(() => {
      if (this.isHovering) return
      this.indexShown = (this.indexShown + 1) % this.banners.length
    }, 3000)
  },
  computed: {
    bannerShown() {
      if (this.banners.length === 0) return {};
      return this.banners[this.indexShown]
    },
  },
  watch: {
    showModal() {
      if (!this.showModal) {
        localStorage.setItem('eventBannerModalClosedTime', new Date().getTime())
      }
    },
  },
}
</script>

<style scoped>
.banner-close-button {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 1rem;
  right: 1rem;
  background: white;
  border: none;
  border-radius: 50%;
  height: 25px;
  cursor: pointer;
  color: #000;
}

.banner-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100vh;
}

.banner-image-display {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.banner-image-display img {
  object-fit: contain;
  border-radius: 5px;
  transition: transform 0.5s ease;
}

.banner-image-display img:hover {
  transform: scale(1.05);
}

.banner-image-selector {
  width: 100%;
  height: 150px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-image-selector-item {
  width: 100px;
  height: 100px;
  margin: 10px 15px;
  /* border: 1px solid #000; */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-image-selector-item img {
  border-radius: 5px;
  /* width: 100%;
  height: 100%; */
  object-fit: contain;
  transition: transform 0.5s ease;
}

.banner-image-selector img:hover {
  transform: scale(1.2);
}

.banner-image-selector-item-active {
  /* animate scale  */
  transform: scale(1.2);
}

/* transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}
</style>