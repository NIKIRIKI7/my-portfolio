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
    placeholder: {
        type: String,
        default: '',
    },
    rows: {
        type: Number,
        default: 5,
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
    <div class="app-textarea" :class="{ 'app-textarea--has-error': error }">
        <label class="app-textarea__label">
            <span class="app-textarea__label-text">
                {{ label }}
                <span v-if="required" class="app-textarea__required-indicator">*</span>
            </span>
            <textarea
                :value="modelValue"
                :placeholder="placeholder"
                :rows="rows"
                :required="required"
                class="app-textarea__control"
                @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
            ></textarea>
        </label>
        <Transition name="fade">
            <p v-if="error" class="app-textarea__error-message">{{ error }}</p>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;
@use '@/shared/ui/mixins/form-control' as form;

.app-textarea {
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
        resize: vertical;
        min-height: rem(120px);
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
        .app-textarea__control {
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
