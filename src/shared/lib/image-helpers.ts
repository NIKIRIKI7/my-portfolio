export interface ImageSources {
    avif: string;
    webp: string;
    original: string;
    originalType: string;
}

export const generateImageSources = (originalPath: string): ImageSources => {
    const basePath = originalPath.substring(0, originalPath.lastIndexOf('.'));
    const extension = originalPath.substring(originalPath.lastIndexOf('.') + 1);

    const mimeType = `image/${extension === 'jpg' ? 'jpeg' : extension}`;

    return {
        avif: `${basePath}.avif`,
        webp: `${basePath}.webp`,
        original: originalPath,
        originalType: mimeType,
    };
};
