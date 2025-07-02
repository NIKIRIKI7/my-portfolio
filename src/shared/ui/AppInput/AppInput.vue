<script setup lang="ts">
defineProps({
    label: {
        type: String,
        required: true,
    },
    modelValue: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        default: '',
    },
    error: {
        type: String,
        default: '',
    },
    required: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['update:modelValue']);
</script>

<template>
    <div class="app-input" :class="{ 'app-input--has-error': error }">
        <label class="app-input__label">
            <span class="app-input__label-text">
                {{ label }}
                <span v-if="required" class="app-input__required-indicator">*</span>
            </span>
            <input
                :type="type"
                :value="modelValue"
                :placeholder="placeholder"
                :required="required"
                class="app-input__control"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            />
        </label>
        <Transition name="fade">
            <p v-if="error" class="app-input__error-message">{{ error }}</p>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;
@use '@/shared/ui/mixins/form-control' as form;

.app-input {
    width: 100%;
    position: relative;
    padding-bottom: rem(22px);

    &__label {
        color: $color-text-secondary;
        display: flex;
        flex-direction: column;
        gap: rem(8px);
    }

    &__label-text {
        @include apply-font($font-family-text, 400, rem(14px));
    }

    &__required-indicator {
        color: $color-special-icon;
        margin-left: rem(3px);
    }

    &__control {
        @include form.form-control-styles;
    }

    &__error-message {
        position: absolute;
        bottom: 0;
        left: 0;
        color: $color-special-icon;
        font-size: rem(12px);
        margin-top: rem(4px);
    }

    &--has-error {
        .app-input__control {
            border-color: $color-special-icon;
            &:focus,
            &:hover {
                border-color: $color-special-icon;
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}
</style>
