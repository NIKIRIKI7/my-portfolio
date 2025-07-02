<script setup lang="ts">
import { watch } from 'vue';
import IconClose from '@/shared/assets/icons/IconClose.vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        default: '',
    },
    hideCloseButton: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue', 'close']);

function closeModal() {
    emit('update:modelValue', false);
    emit('close');
}

function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        } else {
            window.removeEventListener('keydown', handleKeyDown);
        }
    },
);
</script>

<template>
    <Transition name="modal-fade">
        <div v-if="modelValue" class="app-modal__overlay" @click.self="closeModal">
            <div
                class="app-modal__content"
                role="dialog"
                aria-modal="true"
                :aria-labelledby="title ? 'modal-title' : undefined"
            >
                <header v-if="title || !hideCloseButton" class="app-modal__header">
                    <h3 v-if="title" id="modal-title" class="app-modal__title">{{ title }}</h3>
                    <button
                        v-if="!hideCloseButton"
                        class="app-modal__close-button"
                        aria-label="Закрыть модальное окно"
                        @click="closeModal"
                    >
                        <IconClose />
                    </button>
                </header>

                <main class="app-modal__body">
                    <slot />
                </main>

                <footer v-if="$slots.footer" class="app-modal__footer">
                    <slot name="footer" :close="closeModal" />
                </footer>
            </div>
        </div>
    </Transition>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.app-modal {
    &__overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 2000;
        @include flex-center;
        padding: rem(20px);
    }

    &__content {
        background-color: $color-background;
        border: 1px solid $color-border;
        border-radius: rem(12px);
        padding: rem(24px);
        width: 100%;
        max-width: rem(500px);
        display: flex;
        flex-direction: column;
        gap: rem(20px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__title {
        font-size: rem(22px);
        color: $color-text-primary;
    }

    &__close-button {
        color: $color-text-secondary;
        @include flex-center;
        transition: color 0.3s ease;
        &:hover {
            color: $color-text-primary;
        }
    }

    &__body {
        color: $color-text-secondary;
        line-height: 1.6;
    }

    &__footer {
        display: flex;
        justify-content: flex-end;
        gap: rem(10px);
    }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
    .app-modal__content {
        transition: transform 0.3s ease;
    }
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
    .app-modal__content {
        transform: scale(0.95) translateY(10px);
    }
}
</style>
