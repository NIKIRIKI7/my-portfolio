<script setup lang="ts">
import { computed, type PropType } from 'vue';
import type { Skill } from '@/entities/skill';


const props = defineProps({
    skill: {
        type: Object as PropType<Skill>,
        required: true,
    },
    isVisible: {
        type: Boolean,
        default: false,
    },
});

const barStyle = computed(() => ({
    '--progress-width': `${props.isVisible ? props.skill.level : 0}%`,
    '--progress-color': props.skill.color,
}));
</script>

<template>
    <div class="skill-bar" :style="barStyle">
        <div class="skill-bar__info">
            <span class="skill-bar__name">{{ skill.name }}</span>
            <span class="skill-bar__level">{{ skill.level }}%</span>
        </div>
        <div class="skill-bar__progress-track">
            <div class="skill-bar__progress-fill"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.skill-bar {
    width: 100%;

    &__info {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: rem(10px);
        color: $color-text-primary;
    }

    &__name {
        font-size: rem(16px);
        font-weight: 500;
        font-family: $font-family-text;
    }

    &__level {
        font-size: rem(14px);
        font-family: $font-family-text;
        color: $color-text-secondary;
    }

    &__progress-track {
        width: 100%;
        height: rem(8px);
        background-color: $color-border;
        border-radius: rem(4px);
        overflow: hidden;
    }

    &__progress-fill {
        width: var(--progress-width, 0%);
        height: 100%;
        background-color: var(--progress-color, $color-accent-primary);
        border-radius: rem(4px);
        transition: width 1.5s cubic-bezier(0.25, 1, 0.5, 1);
    }
}
</style>
