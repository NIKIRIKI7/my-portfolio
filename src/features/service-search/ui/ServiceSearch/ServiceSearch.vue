<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import AppInput from '@/shared/ui/AppInput';
import { useServiceSearchStore } from '../../model/store';

const { t } = useI18n();
const searchStore = useServiceSearchStore();
const { searchQuery } = storeToRefs(searchStore);
</script>

<template>
    <div class="service-search">
        <AppInput
            :model-value="searchQuery"
            :label="t('services.search.label')"
            type="search"
            :placeholder="t('services.search.placeholder')"
            @update:model-value="searchStore.setSearchQuery($event)"
        />
    </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as *;
.service-search {
    width: 100%;
    max-width: rem(400px);
    margin: 0 auto;
}
</style>
