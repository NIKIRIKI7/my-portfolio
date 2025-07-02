import { glob } from 'glob';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import Fontmin from 'fontmin';
// --- УДАЛЕНА ЭТА СТРОКА ---
// import rename from 'gulp-rename';

/**
 * @file Скрипт для комплексной "умной" оптимизации.
 * 1. Копирует изображения из `src` в `public`.
 * 2. Проверяет наличие .webp и .avif версий. Если они есть, пропускает файл.
 * 3. Если версий нет, создает сжатые .webp и .avif.
 * 4. Конвертирует шрифты из `src` в `src`, чтобы Vite мог их обработать.
 */

const IMAGE_SOURCE_GLOB = 'src/shared/assets/images/**/*.{png,jpg,jpeg}';
const IMAGE_DEST_DIR = 'public/assets/images';
const FONT_SOURCE_GLOB = 'src/shared/assets/fonts/**/*.ttf';

/**
 * Оптимизирует одно изображение: копирует, создает WebP, AVIF, если это необходимо.
 * @param {string} srcPath - Исходный путь к файлу в `src`.
 */
async function processImage(srcPath) {
    const relativePath = path.relative('src/shared/assets/images', srcPath);
    const destPath = path.join(IMAGE_DEST_DIR, relativePath);
    const { dir, name } = path.parse(destPath);
    const webpPath = path.join(dir, `${name}.webp`);
    const avifPath = path.join(dir, `${name}.avif`);

    try {
    // Убедимся, что директория назначения существует
        await fs.mkdir(dir, { recursive: true });

        // Копируем оригинальный файл, если его еще нет в public
        try {
            await fs.access(destPath);
        } catch {
            await fs.copyFile(srcPath, destPath);
            console.log(`✅ Скопирован оригинал: ${relativePath}`);
        }

        // --- УМНАЯ ПРОВЕРКА ---
        // Проверяем, существуют ли уже обе оптимизированные версии
        const webpExists = await fs.access(webpPath).then(() => true).catch(() => false);
        const avifExists = await fs.access(avifPath).then(() => true).catch(() => false);

        if (webpExists && avifExists) {
            console.log(`-️⃣  Пропускаем ${path.basename(srcPath)}, .webp и .avif уже существуют.`);
            return;
        }

        // Если мы здесь, значит, нужно создать недостающие файлы
        console.log(`🚀 Оптимизируем: ${path.basename(srcPath)}`);
        const imageProcessor = sharp(srcPath);

        if (!webpExists) {
            await imageProcessor.webp({ quality: 80 }).toFile(webpPath);
            console.log(`  ✨ Создан WebP: ${path.basename(webpPath)}`);
        }
        if (!avifExists) {
            await imageProcessor.avif({ quality: 70 }).toFile(avifPath);
            console.log(`  ✨ Создан AVIF: ${path.basename(avifPath)}`);
        }

    } catch (err) {
        console.error(`❌ Ошибка при обработке ${srcPath}:`, err);
    }
}


/**
 * Оптимизирует (конвертирует и сжимает) один файл шрифта.
 * @param {string} fontPath - Путь к исходному файлу .ttf.
 */
async function processFont(fontPath) {
    const { dir } = path.parse(fontPath);
    console.log(`🖋️  Конвертируем шрифт: ${fontPath}`);

    const fontmin = new Fontmin()
        .src(fontPath)
        .use(Fontmin.ttf2woff2())
        .dest(dir);

    return new Promise((resolve, reject) => {
        fontmin.run((err) => {
            if (err) {
                console.error(`❌ Ошибка при конвертации шрифта ${fontPath}:`, err);
                reject(err);
            } else {
                console.log('✅ Шрифт сконвертирован в woff2');
                resolve();
            }
        });
    });
}

/**
 * Главная функция для запуска процесса оптимизации.
 */
async function runOptimization() {
    console.log('🚀 Начинаем комплексную оптимизацию...');

    try {
    // Убедимся, что основная папка для изображений существует
        await fs.mkdir(IMAGE_DEST_DIR, { recursive: true });

        // Оптимизация изображений
        const imagePaths = await glob(IMAGE_SOURCE_GLOB);
        await Promise.all(imagePaths.map(processImage));
        console.log('🖼️  Оптимизация изображений завершена.');

        // Оптимизация шрифтов (оставляем их в src, Vite их обработает)
        const fontPaths = await glob(FONT_SOURCE_GLOB);
        await Promise.all(fontPaths.map(processFont));
        console.log('🖋️  Оптимизация шрифтов завершена.');

        console.log('\n🎉 Комплексная оптимизация успешно завершена.');
    } catch (error) {
        console.error('❌ Произошла критическая ошибка во время оптимизации:', error);
        process.exit(1);
    }
}

await runOptimization();
