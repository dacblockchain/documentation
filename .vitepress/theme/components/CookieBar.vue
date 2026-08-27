<script setup lang="ts">
import { ref, onMounted } from 'vue'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const TRACKING_ID = 'G-5FGBERQXNP'
const accepted = ref(true)

const startTracking = () => {
  window.gtag?.('config', TRACKING_ID)
}

onMounted(() => {
  try {
    const cookieConsent = window.localStorage.getItem('cookieConsent')
    accepted.value = cookieConsent === 'true' || cookieConsent === 'false'

    if (cookieConsent === 'true') {
      startTracking()
    }
  } catch {
    // Show the banner when browser storage is unavailable.
    accepted.value = false
  }
})

const persistConsent = (value: 'true' | 'false') => {
  try {
    window.localStorage.setItem('cookieConsent', value)
  } catch {
    // Continue with the user's choice when browser storage is unavailable.
  }
  accepted.value = true
}

const accept = () => {
  persistConsent('true')
  startTracking()
}

const decline = () => {
  persistConsent('false')
}
</script>

<template>
  <transition name="fade">
    <div v-if="!accepted" class="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
      <div class="max-w-7xl mx-auto pointer-events-auto">
        <div class="bg-surface-container-high/95 backdrop-blur-md border border-secondary/20 shadow-2xl p-6 md:flex md:items-center md:justify-between gap-6 overflow-hidden">
          <div class="flex-1 mb-6 md:mb-0">
            <h3 class="text-xl font-headline font-bold text-primary mb-2 uppercase tracking-tight">Cookie Protocol</h3>
            <p class="text-secondary text-sm md:text-base leading-relaxed font-body">
              This system uses standard <b>Technical Cookies</b> to ensure stable performance of our web services. 
              Optional tracking modules help us optimize the network and analyze traffic. <br />
              Review the <a href="https://www.dachain.tech/cookies-policy" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline transition-colors font-bold uppercase text-sm tracking-widest">Cookie_Protocol</a> for comprehensive details.
            </p>
          </div>
          <div class="flex flex-wrap md:flex-nowrap shrink-0 gap-4">
            <button 
              @click="decline"
              class="border border-secondary/40 text-secondary font-headline font-bold px-8 py-3 hover:bg-secondary/10 transition-colors text-sm uppercase tracking-widest dac-hack-btn w-[140px]"
            >
              <span>Decline</span>
            </button>
            <button 
              @click="accept"
              class="border border-primary text-primary font-headline font-bold px-8 py-3 hover:bg-primary hover:text-on-primary transition-colors text-sm uppercase tracking-widest dac-hack-btn w-[140px]"
            >
              <span>Accept</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.dac-hack-btn {
  position: relative;
  overflow: hidden;
}

.dac-hack-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: 0.5s;
}

.dac-hack-btn:hover::before {
  left: 100%;
}
</style>
