<script setup lang="ts">
import { computed, type PropType, type Component } from 'vue';
import { RouterLink, type RouteLocationRaw } from 'vue-router';

type AppButtonTheme = 'primary' | 'secondary' | 'accent-1' | 'accent-2' | 'accent-3';

const props = defineProps({
    to: {
        type: [String, Object] as PropType<RouteLocationRaw>,
        default: null,
    },
    href: {
        type: String,
        default: null,
    },
    download: {
        type: [Boolean, String],
        default: false,
    },
    theme: {
        type: String as PropType<AppButtonTheme>,
        default: 'primary',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const componentType = computed<Component | string>(() => {
    if (props.href) return 'a';
    if (props.to) return RouterLink;
    return 'button';
});

const buttonClasses = computed(() => [
    'app-button',
    `app-button--theme-${props.theme}`,
    { 'app-button--disabled': props.disabled },
]);

const componentProps = computed(() => {
    if (props.href) {
        return {
            href: props.href,
            download: props.download || null,
            rel: 'noopener noreferrer',
            target: '_blank',
        };
    }
    if (props.to) {
        return {
            to: props.to,
        };
    }
    return {
        disabled: props.disabled,
    };
});
</script>

<template>
    <component :is="componentType" :class="buttonClasses" v-bind="componentProps">
        <slot />
        <span v-if="theme !== 'secondary'" class="app-button__arrow">></span>
    </component>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.app-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: rem(10px);
    padding: rem(16px) rem(32px);
    border-radius: rem(4px);
    color: $color-text-primary;
    font-family: $font-family-text;
    font-weight: 500;
    font-size: rem(16px);
    border: 1px solid transparent;
    cursor: pointer;
    text-decoration: none;
    transition:
        transform 0.3s ease,
        filter 0.3s ease,
        box-shadow 0.3s ease,
        background-color 0.3s ease,
        border-color 0.3s ease,
        color 0.3s ease,
        opacity 0.3s ease;

    // --- Модификаторы тем ---
    &--theme-primary {
        background-color: $color-accent-primary;
        border-color: $color-accent-primary;
    }
    &--theme-secondary {
        background-color: transparent;
        border-color: $color-border;
        color: $color-text-secondary;
    }
    &--theme-accent-1 {
        background-color: $color-accent-tag-1;
        border-color: $color-accent-tag-1;
    }
    &--theme-accent-2 {
        background-color: $color-accent-tag-2;
        border-color: $color-accent-tag-2;
    }
    &--theme-accent-3 {
        background-color: $color-accent-tag-3;
        border-color: $color-accent-tag-3;
    }

    &__arrow {
        display: inline-block;
        transition: transform 0.3s ease;
    }

    @include on-event {
        &:not(.app-button--disabled) {
            transform: translateY(-2px);

            &.app-button--theme-primary {
                filter: brightness(1.1);
                box-shadow: 0 rem(8px) rem(30px) 0 rgba(61, 142, 0, 0.4);
            }
            &.app-button--theme-secondary {
                border-color: $color-accent-primary;
                color: $color-accent-primary;
            }
            &.app-button--theme-accent-1 {
                filter: brightness(1.1);
                box-shadow: 0 rem(8px) rem(30px) 0 rgba(255, 184, 76, 0.4);
            }
            &.app-button--theme-accent-2 {
                filter: brightness(1.1);
                box-shadow: 0 rem(8px) rem(30px) 0 rgba(68, 109, 255, 0.4);
            }
            &.app-button--theme-accent-3 {
                filter: brightness(1.1);
                box-shadow: 0 rem(8px) rem(30px) 0 rgba(100, 221, 187, 0.4);
            }

            .app-button__arrow {
                transform: translateX(4px);
            }
        }
    }

    &--disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background-color: $color-background;
        border-color: $color-border;
    }
}
</style>
