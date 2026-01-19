import { v2 as cloudinary } from 'cloudinary'

// Configuration Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})

// Tailles responsive standard
export const RESPONSIVE_WIDTHS = [320, 640, 768, 1024, 1280, 1920]

// Upload une image avec optimisation
export async function uploadImage(
    file: Buffer | string,
    options?: {
        folder?: string
        publicId?: string
        alt?: string
    }
) {
    try {
        const result = await cloudinary.uploader.upload(
            typeof file === 'string' ? file : `data:image/jpeg;base64,${file.toString('base64')}`,
            {
                folder: options?.folder || 'litus',
                public_id: options?.publicId,
                resource_type: 'image',
                context: options?.alt ? `alt=${options.alt}` : undefined,
            }
        )
        return {
            success: true,
            data: {
                publicId: result.public_id,
                url: result.secure_url,
                optimizedUrl: getOptimizedUrl(result.public_id),
                srcset: generateSrcset(result.public_id),
                width: result.width,
                height: result.height,
                format: result.format,
                bytes: result.bytes,
            }
        }
    } catch (error) {
        console.error('Cloudinary upload error:', error)
        return { success: false, error: String(error) }
    }
}

// Génère une URL optimisée (AVIF avec fallback auto)
export function getOptimizedUrl(publicId: string, options?: {
    width?: number
    height?: number
    crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'auto'
    format?: 'auto' | 'avif' | 'webp' | 'jpg' | 'png'
}) {
    return cloudinary.url(publicId, {
        quality: 'auto:best',
        fetch_format: options?.format || 'auto', // Auto sélectionne AVIF > WebP > JPEG selon le browser
        width: options?.width,
        height: options?.height,
        crop: options?.crop || 'fill',
        flags: 'progressive',
        dpr: 'auto',
    })
}

// Génère un srcset pour images responsive
export function generateSrcset(publicId: string, widths: number[] = RESPONSIVE_WIDTHS): string {
    return widths
        .map(w => `${getOptimizedUrl(publicId, { width: w })} ${w}w`)
        .join(', ')
}

// Génère les URLs pour différentes tailles (utile pour Next.js Image)
export function getResponsiveUrls(publicId: string) {
    return {
        thumbnail: getOptimizedUrl(publicId, { width: 320, crop: 'thumb' }),
        small: getOptimizedUrl(publicId, { width: 640 }),
        medium: getOptimizedUrl(publicId, { width: 1024 }),
        large: getOptimizedUrl(publicId, { width: 1920 }),
        srcset: generateSrcset(publicId),
    }
}

// Supprime une image
export async function deleteImage(publicId: string) {
    try {
        const result = await cloudinary.uploader.destroy(publicId)
        return { success: result.result === 'ok' }
    } catch (error) {
        console.error('Cloudinary delete error:', error)
        return { success: false, error: String(error) }
    }
}

// Liste les images d'un dossier
export async function listImages(folder: string = 'litus', maxResults: number = 100) {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: folder,
            max_results: maxResults,
            resource_type: 'image',
        })
        return {
            success: true,
            data: result.resources.map((r: any) => ({
                publicId: r.public_id,
                url: r.secure_url,
                optimizedUrl: getOptimizedUrl(r.public_id),
                srcset: generateSrcset(r.public_id),
                width: r.width,
                height: r.height,
                format: r.format,
                bytes: r.bytes,
                createdAt: r.created_at,
            }))
        }
    } catch (error) {
        console.error('Cloudinary list error:', error)
        return { success: false, error: String(error) }
    }
}

// Renomme une image (change le public_id)
export async function renameImage(fromPublicId: string, toPublicId: string) {
    try {
        const result = await cloudinary.uploader.rename(fromPublicId, toPublicId)
        return {
            success: true,
            data: {
                publicId: result.public_id,
                url: result.secure_url,
                optimizedUrl: getOptimizedUrl(result.public_id),
            }
        }
    } catch (error) {
        console.error('Cloudinary rename error:', error)
        return { success: false, error: String(error) }
    }
}

// Upload depuis une URL (pour migration)
export async function uploadFromUrl(url: string, options?: {
    folder?: string
    publicId?: string
}) {
    try {
        const result = await cloudinary.uploader.upload(url, {
            folder: options?.folder || 'litus/portfolio',
            public_id: options?.publicId,
            resource_type: 'image',
        })
        return {
            success: true,
            data: {
                publicId: result.public_id,
                url: result.secure_url,
                optimizedUrl: getOptimizedUrl(result.public_id),
                srcset: generateSrcset(result.public_id),
                width: result.width,
                height: result.height,
                format: result.format,
                bytes: result.bytes,
            }
        }
    } catch (error) {
        console.error('Cloudinary upload from URL error:', error)
        return { success: false, error: String(error) }
    }
}

export default cloudinary

