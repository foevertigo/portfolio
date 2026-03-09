/**
 * Converts an image at the given URL to ASCII art using a canvas element.
 * Automatically cropping empty space (black/transparent margins) to fit the face tightly.
 */
export function imageToAscii(imgUrl, cols = 140) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            // Find bounding box to crop empty space
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
            const tCtx = tempCanvas.getContext('2d');
            tCtx.drawImage(img, 0, 0);
            const imgData = tCtx.getImageData(0, 0, img.width, img.height).data;

            let minX = img.width, minY = img.height, maxX = 0, maxY = 0;
            for (let y = 0; y < img.height; y++) {
                for (let x = 0; x < img.width; x++) {
                    const i = (y * img.width + x) * 4;
                    const a = imgData[i + 3];
                    const lum = 0.299 * imgData[i] + 0.587 * imgData[i + 1] + 0.114 * imgData[i + 2];
                    if (a >= 30 && lum > 15) { // Visible pixel
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }

            if (maxX <= minX || maxY <= minY) {
                // Failsafe: Use full image if crop detection fails
                minX = 0; minY = 0; maxX = img.width; maxY = img.height;
            } else {
                // Add tiny 2% padding
                const padX = (maxX - minX) * 0.02;
                const padY = (maxY - minY) * 0.02;
                minX = Math.max(0, minX - padX);
                maxX = Math.min(img.width, maxX + padX);
                minY = Math.max(0, minY - padY);
                maxY = Math.min(img.height, maxY + padY);
            }

            const cropW = maxX - minX;
            const cropH = maxY - minY;

            // Calculate height to preserve aspect ratio based on Cascadia Code character dimensions
            // Character width ~ 0.6 * fontSize. Line height = 0.55 * fontSize.
            // Char physically is about 1.09 times wider than it is tall in our CSS config.
            const rows = Math.floor(cols * 1.09 * (cropH / cropW));

            const canvas = document.createElement('canvas');
            canvas.width = cols;
            canvas.height = rows;
            const ctx = canvas.getContext('2d');
            // Draw cropped image
            ctx.drawImage(img, minX, minY, cropW, cropH, 0, 0, cols, rows);
            const data = ctx.getImageData(0, 0, cols, rows).data;

            // Character ramp from dark to light
            const ramp = ' .:-=+*%#@';
            let ascii = '';

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const i = (y * cols + x) * 4;
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const a = data[i + 3];
                    if (a < 30) {
                        ascii += ' ';
                        continue;
                    }
                    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
                    const idx = Math.floor((lum / 255) * (ramp.length - 1));
                    ascii += ramp[idx];
                }
                ascii += '\n';
            }

            resolve(ascii);
        };
        img.onerror = () => {
            resolve(null);
        };
        img.src = imgUrl;
    });
}
