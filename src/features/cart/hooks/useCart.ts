"use client"

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { CartItem, CartSummary, CartState } from '../types/cart';
import { addToCart, AddToCartPayload, deleteCartItem, getCart } from '@/api/services/products/cart';

export const useCart = () => {
    const router = useRouter();
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

const updateQuantity = useCallback(async (cartId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const itemToUpdate = cartState.items.find(item => item.cart_items_id === cartId);
    if (!itemToUpdate) return;

    try {
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

        const payload: AddToCartPayload = {
            product_id: itemToUpdate.product_id,
            quantity: newQuantity,
        };

        await addToCart(payload);
        
        
    } catch (error) {
        console.error('Error updating quantity:', error);
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

    const proceedToCheckout = useCallback(() => {
        const selectedItems = cartState.items.filter(item => item.selected);
        if (selectedItems.length === 0) {
            console.warn('Tidak ada item yang dipilih untuk checkout');
            return;
        }

        const checkoutData = {
            items: selectedItems,
            summary: {
                selected_items: cartState.summary.selected_items,
                selected_price: cartState.summary.selected_price,
            },
            timestamp: Date.now(), 
        };

        localStorage.setItem('checkout_data', JSON.stringify(checkoutData));
        
        router.push('/checkout');
        
        console.log('Navigating to checkout with items:', selectedItems);
    }, [cartState.items, cartState.summary, router]);

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