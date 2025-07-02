import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';

/**
 * @file Скрипт для "умной" оптимизации изображений.
 * Находит все PNG/JPG/JPEG файлы в `public/assets`, проверяет наличие
 * .webp и .avif версий и создает их только в случае отсутствия.
 */

const IMAGE_SOURCE_DIR = './public/assets';
const SUPPORTED_EXTENSIONS = '{png,jpg,jpeg}';

/**
 * Оптимизирует одно изображение, если это необходимо.
 * @param {string} imagePath - Путь к исходному файлу в /public.
 */
async function optimizeImage(imagePath) {
    try {
        const fullPath = path.resolve(imagePath);
        const fileExtension = path.extname(fullPath);
        const baseName = fullPath.replace(new RegExp(`${fileExtension}$`), '');
        const webpPath = `${baseName}.webp`;
        const avifPath = `${baseName}.avif`;

        // --- УМНАЯ ПРОВЕРКА ---
        // Проверяем, существуют ли уже обе оптимизированные версии
        const webpExists = await fs.access(webpPath).then(() => true).catch(() => false);
        const avifExists = await fs.access(avifPath).then(() => true).catch(() => false);

        if (webpExists && avifExists) {
            // console.log(`- Пропускаем ${imagePath}, .webp и .avif уже существуют.`);
            return;
        }

        console.log(`🚀 Оптимизируем: ${imagePath}`);
        const image = sharp(fullPath);

        // Конвертация в WebP, если он отсутствует
        if (!webpExists) {
            await image.webp({ quality: 80 }).toFile(webpPath);
            console.log(`  ✨ Создан WebP для ${path.basename(imagePath)}`);
        }

        // Конвертация в AVIF, если он отсутствует
        if (!avifExists) {
            await image.avif({ quality: 70 }).toFile(avifPath);
            console.log(`  ✨ Создан AVIF для ${path.basename(imagePath)}`);
        }

    } catch (error) {
        console.error(`❌ Ошибка при обработке ${imagePath}:`, error);
    }
}

/**
 * Главная функция для запуска оптимизации.
 */
async function runOptimization() {
    console.log('--- 🚀 Запускаем умную оптимизацию изображений ---');
    try {
        const imagePaths = await glob(`${IMAGE_SOURCE_DIR}/**/*.${SUPPORTED_EXTENSIONS}`);

        if (imagePaths.length === 0) {
            console.log('🖼️  Изображения для оптимизации не найдены.');
            return;
        }

        await Promise.all(imagePaths.map(optimizeImage));
        console.log('--- ✅ Оптимизация изображений успешно завершена! ---');
    } catch (error) {
        console.error('❌ Произошла критическая ошибка во время оптимизации:', error);
        process.exit(1);
    }
}

/**
 * Запускаем скрипт с помощью асинхронной самовызывающейся функции (IIFE),
 * чтобы корректно обработать Promise и избежать предупреждения "Promise returned is ignored".
 */
;(async () => {
    await runOptimization();
})();
