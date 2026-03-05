import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface CartItem {
  id: string;
  course_id: string;
  delivery_mode: string;
  quantity: number;
  course?: { title: string; slug: string; image_url: string; base_price: number };
}

interface CartContextType {
  items: CartItem[];
  count: number;
  loading: boolean;
  addToCart: (courseId: string, deliveryMode?: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    if (!user) { setItems([]); return; }
    setLoading(true);
    const { data } = await supabase
      .from("cart_items")
      .select("id, course_id, delivery_mode, quantity, courses(title, slug, image_url, base_price)")
      .eq("user_id", user.id);
    setItems((data || []).map((d: any) => ({ ...d, course: d.courses })));
    setLoading(false);
  };

  useEffect(() => { refresh(); }, [user]);

  const addToCart = async (courseId: string, deliveryMode = "live_online") => {
    if (!user) return;
    const existing = items.find(i => i.course_id === courseId && i.delivery_mode === deliveryMode);
    if (existing) return;
    await supabase.from("cart_items").insert([{ user_id: user.id, course_id: courseId, delivery_mode: deliveryMode as any }]);
    await refresh();
  };

  const removeFromCart = async (itemId: string) => {
    await supabase.from("cart_items").delete().eq("id", itemId);
    await refresh();
  };

  const clearCart = async () => {
    if (!user) return;
    await supabase.from("cart_items").delete().eq("user_id", user.id);
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, count: items.length, loading, addToCart, removeFromCart, clearCart, refresh }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
