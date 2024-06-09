import { lazy } from 'react'

export const CatalogPageAsync = lazy(async () => await import('./CatalogPage'))
