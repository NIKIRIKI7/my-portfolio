<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useServiceStore, ServiceCard, type Service } from '@/entities/service';
import { useServiceFilterStore, ServiceFilter } from '@/features/service-filter';
import { useServiceSearchStore, ServiceSearch } from '@/features/service-search';
import AppStatus from '@/shared/ui/AppStatus';
import SkeletonServiceCard from '@/shared/ui/SkeletonServiceCard';

const { t } = useI18n();

const serviceStore = useServiceStore();
const { data: allServices, isLoading, error } = storeToRefs(serviceStore);
const { fetchData: fetchServices } = serviceStore;

const filterStore = useServiceFilterStore();
const { activeCategory } = storeToRefs(filterStore);

const searchStore = useServiceSearchStore();
const { searchQuery } = storeToRefs(searchStore);

const filteredServices = computed<Service[]>(() => {
    if (!allServices.value) return [];
    if (activeCategory.value === 'all') {
        return allServices.value;
    }
    return allServices.value.filter((service) => service.category === activeCategory.value);
});

const finalServiceList = computed<Service[]>(() => {
    if (!searchQuery.value.trim()) {
        return filteredServices.value;
    }
    const lowerCaseQuery = searchQuery.value.toLowerCase().trim();
    return filteredServices.value.filter((service) => {
        const title = t(service.titleKey).toLowerCase();
        const description = t(service.descriptionKey).toLowerCase();
        return title.includes(lowerCaseQuery) || description.includes(lowerCaseQuery);
    });
});

const emptyText = computed(() => {
    return searchQuery.value.trim() ? t('services.emptySearch') : t('services.emptyFiltered');
});

onMounted(() => {
    if (!allServices.value?.length) {
        fetchServices();
    }
});
</script>

<template>
    <section id="services" class="services-section animate-container">
        <div class="container">
            <header class="services-section__header animate-child">
                <h2 class="services-section__title">{{ t('services.title') }}</h2>
                <p class="services-section__subtitle">{{ t('services.subtitle') }}</p>
                <ServiceFilter class="services-section__filter" />
                <ServiceSearch class="services-section__search" />
            </header>

            <div class="services-section__body animate-child" style="--stagger-delay: 0.2s">
                <div v-if="isLoading" class="services-section__list">
                    <SkeletonServiceCard v-for="i in 6" :key="`skeleton-${i}`" />
                </div>
                <AppStatus
                    v-else-if="error || !allServices?.length"
                    :error="error"
                    :is-empty="!allServices?.length"
                    :loading-text="t('services.loading')"
                    :error-text-prefix="t('services.error')"
                    :empty-text="t('services.empty')"
                />
                <TransitionGroup
                    v-else-if="finalServiceList.length"
                    tag="div"
                    name="card-list"
                    class="services-section__list"
                >
                    <ServiceCard
                        v-for="service in finalServiceList"
                        :key="service.id"
                        :service-data="service"
                    />
                </TransitionGroup>
                <AppStatus v-else :is-empty="true" :empty-text="emptyText" />
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.services-section {
    padding: rem(100px) 0;
    transition: background-color 0.3s ease;

    @include responsive($tablet) {
        padding: rem(60px) 0;
    }

    &__header {
        text-align: center;
        max-width: rem(700px);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: rem(40px);
    }

    &__title {
        color: $color-text-primary;
    }

    &__subtitle {
        margin-top: rem(16px);
        color: $color-text-secondary;
        font-size: rem(18px);
        margin-top: 0;
    }

    &__search {
        margin-top: rem(-20px);
    }

    &__body {
        margin-top: rem(80px);
        @include responsive($tablet) {
            margin-top: rem(60px);
        }
    }

    &__list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(rem(300px), 1fr));
        gap: rem(30px);
        min-height: rem(300px);

        @include responsive($mobile) {
            grid-template-columns: 1fr;
        }
    }
}

[data-theme='dark'] .services-section {
    .services-section__title,
    .services-section__subtitle {
        @include apply-text-shadow-for-contrast;
    }
}

.card-list-enter-active,
.card-list-leave-active {
    transition: all 0.5s ease;
}
.card-list-enter-from,
.card-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
.card-list-move {
    transition: transform 0.5s ease;
}
</style>
