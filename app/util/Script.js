export function formatPrice(price) {
    if (!price) return '';

    if (price >= 10000000) {
        return `₹${(price / 10000000).toFixed(1)} Cr`;
    }

    if (price >= 100000) {
        return `₹${(price / 100000).toFixed(1)} L`;
    }

    return `₹${price.toLocaleString('en-IN')}`;
}

export const PROPERTY_IMAGES = ['prop1.webp', 'prop2.webp', 'prop3.webp', 'prop4.webp']

export function getRandomPropertyImage() {
    const randomIndex = Math.floor(Math.random() * PROPERTY_IMAGES.length)
    return `/properties/${PROPERTY_IMAGES[randomIndex]}`
}
