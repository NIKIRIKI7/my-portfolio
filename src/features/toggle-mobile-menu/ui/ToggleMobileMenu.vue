<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMobileMenuStore } from '../model/store';
import IconBurger from '@/shared/assets/icons/IconBurger.vue';
import IconClose from '@/shared/assets/icons/IconClose.vue';

const mobileMenuStore = useMobileMenuStore();
const { isMenuOpen } = storeToRefs(mobileMenuStore);
const { toggle } = mobileMenuStore;
</script>

<template>
    <button class="toggle-mobile-menu" @click="toggle">
        <component :is="isMenuOpen ? IconClose : IconBurger" />
    </button>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;
.toggle-mobile-menu {
    border: none;
    color: currentColor;
    padding: rem(5px);
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
</style>
