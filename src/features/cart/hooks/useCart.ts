"use client"

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // Untuk Next.js App Router
// import { useNavigate } from 'react-router-dom'; // Untuk React Router
import { CartItem, CartSummary, CartState } from '../types/cart';
import { addToCart, AddToCartPayload, deleteCartItem, getCart } from '@/api/services/products/cart';

export const useCart = () => {
    const router = useRouter(); // Next.js
    // const navigate = useNavigate(); // React Router
    
    const [cartState, setCartState] = useState<CartState>({
        items: [],
        summary: {
            total_items: 0,
            total_price: 0,
            selected_items: 0,
            selected_price: 0,
        },
        loading: true,
        error: null,
    });

    // Fetch cart items from API
    const fetchCartItems = useCallback(async () => {
        try {
            setCartState(prev => ({ ...prev, loading: true, error: null }));
            const response = await getCart();
            const items: CartItem[] = response.data || [];
            setCartState(prev => ({
                ...prev,
                items,
                summary: calculateSummary(items),
                loading: false,
            }));
        } catch (error) {
            setCartState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Gagal memuat keranjang',
                loading: false,
            }));
        }
    }, []);

    // Calculate cart summary
    const calculateSummary = (items: CartItem[]): CartSummary => {
        const total_items = items.reduce((sum, item) => sum + item.quantity, 0);
        const total_price = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const selected_items = items
            .filter(item => item.selected)
            .reduce((sum, item) => sum + item.quantity, 0);
        const selected_price = items
            .filter(item => item.selected)
            .reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return { total_items, total_price, selected_items, selected_price };
    };

    // Update item quantity (lokal state aja dulu)
const updateQuantity = useCallback(async (cartId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    // Cari item yang akan diupdate untuk ambil product_id nya
    const itemToUpdate = cartState.items.find(item => item.cart_items_id === cartId);
    if (!itemToUpdate) return;

    try {
        // Update local state dulu biar UI responsive
        setCartState(prev => {
            const updatedItems = prev.items.map(item =>
                item.cart_items_id === cartId ? { ...item, quantity: newQuantity } : item
            );
            return {
                ...prev,
                items: updatedItems,
                summary: calculateSummary(updatedItems),
            };
        });

        // Panggil API addToCart dengan quantity baru
        const payload: AddToCartPayload = {
            product_id: itemToUpdate.product_id, // Sesuaikan dengan field yang ada di CartItem
            quantity: newQuantity,
            // tambahkan field lain yang dibutuhkan sesuai AddToCartPayload
        };

        await addToCart(payload);
        
        // Optional: Refresh cart dari server untuk sinkronisasi
        // await fetchCartItems();
        
    } catch (error) {
        console.error('Error updating quantity:', error);
        
        // Rollback local state jika API call gagal
        setCartState(prev => {
            const revertedItems = prev.items.map(item =>
                item.cart_items_id === cartId ? { ...item, quantity: itemToUpdate.quantity } : item
            );
            return {
                ...prev,
                items: revertedItems,
                summary: calculateSummary(revertedItems),
            };
        });
    }
}, [cartState.items]);

    // Toggle item selection
    const toggleSelection = useCallback((cartId: number) => {
        setCartState(prev => {
            const updatedItems = prev.items.map(item =>
                item.cart_items_id === cartId ? { ...item, selected: !item.selected } : item
            );
            return {
                ...prev,
                items: updatedItems,
                summary: calculateSummary(updatedItems),
            };
        });
    }, []);

    // Select all items
    const selectAll = useCallback((selected: boolean) => {
        setCartState(prev => {
            const updatedItems = prev.items.map(item => ({ ...item, selected }));
            return {
                ...prev,
                items: updatedItems,
                summary: calculateSummary(updatedItems),
            };
        });
    }, []);

    // Remove item from cart
    const removeItem = useCallback(async (cartId: number) => {
        try {
            await deleteCartItem(cartId);
            setCartState(prev => {
                const updatedItems = prev.items.filter(item => item.cart_items_id !== cartId);
                return {
                    ...prev,
                    items: updatedItems,
                    summary: calculateSummary(updatedItems),
                };
            });
        } catch (error) {
            console.error('Error removing item:', error);
        }
    }, []);

    // Navigate to checkout dengan selected items
    const proceedToCheckout = useCallback(() => {
        const selectedItems = cartState.items.filter(item => item.selected);
        if (selectedItems.length === 0) {
            console.warn('Tidak ada item yang dipilih untuk checkout');
            return;
        }

        // Simpan selected items ke localStorage/sessionStorage untuk dibawa ke halaman checkout
        const checkoutData = {
            items: selectedItems,
            summary: {
                selected_items: cartState.summary.selected_items,
                selected_price: cartState.summary.selected_price,
            },
            timestamp: Date.now(), // Untuk validasi data masih fresh
        };

        localStorage.setItem('checkout_data', JSON.stringify(checkoutData));
        
        // Navigate ke halaman checkout
        router.push('/checkout'); // Next.js
        // navigate('/checkout'); // React Router
        
        console.log('Navigating to checkout with items:', selectedItems);
    }, [cartState.items, cartState.summary, router]);

    // Get selected items (utility function)
    const getSelectedItems = useCallback(() => {
        return cartState.items.filter(item => item.selected);
    }, [cartState.items]);

    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    return {
        ...cartState,
        updateQuantity,
        toggleSelection,
        selectAll,
        removeItem,
        proceedToCheckout,
        getSelectedItems,
        refetch: fetchCartItems,
    };
};