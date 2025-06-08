"use client"
import { useEffect, useState } from 'react'
import { IProduct } from '../types/products'
import { getAllProducts } from '@/api/services/products/product'

export const useProduct = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllProducts()
                setProducts(response)
                console.log(response)
            } catch (error) {
                console.log(error)
                setError("Gagal mengambil data produk")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return { products, loading, error }
}
