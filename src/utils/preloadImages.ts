/** Preload bundled image URLs during the loader so sections mount without layout shift. */
export function preloadImages(urls: string[]) {
  urls.forEach((url) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
  });
}
