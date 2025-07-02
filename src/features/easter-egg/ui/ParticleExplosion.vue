<script setup lang="ts">
import { onMounted, ref } from 'vue';

const emit = defineEmits(['animation-finished']);

const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 400;

    class Particle {
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        color: string;
        life: number;

        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.size = Math.random() * 7 + 1;
            this.speedX = Math.random() * 10 - 5;
            this.speedY = Math.random() * 10 - 5;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.life = 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 0.02;
            if (this.life < 0) this.life = 0;
        }

        draw() {
            if (!ctx || this.life <= 0) return;
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        if (!ctx) return;
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'rgba(8, 8, 8, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();

    setTimeout(() => {
        emit('animation-finished');
    }, 2500); // Длительность анимации
});
</script>

<template>
    <canvas ref="canvasRef" class="particle-explosion"></canvas>
</template>

<style scoped>
.particle-explosion {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9998;
    background-color: #080808;
}
</style>
