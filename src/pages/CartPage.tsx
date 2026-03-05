import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";

const CartPage = () => {
  const { items, removeFromCart, clearCart } = useCart();

  const total = items.reduce((sum, item) => sum + (item.course?.base_price || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 max-w-3xl">
        <h1 className="font-display text-3xl font-bold mb-6">Shopping Cart</h1>
        {items.length === 0 ? (
          <div className="bg-card border border-border/50 rounded-xl p-12 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-display text-lg font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-4">Browse our courses to get started.</p>
            <Link to="/courses"><Button className="bg-gradient-primary text-accent-foreground">Browse Courses</Button></Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-card border border-border/50 rounded-xl p-4 flex items-center gap-4">
                {item.course?.image_url && (
                  <img src={item.course.image_url} alt="" className="w-20 h-14 object-cover rounded-lg shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <Link to={`/course/${item.course?.slug}`} className="text-sm font-semibold hover:text-primary transition-colors">{item.course?.title}</Link>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.delivery_mode.replace(/_/g, " ")}</p>
                </div>
                <span className="font-display font-bold text-primary">${item.course?.base_price}</span>
                <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
            <div className="bg-card border border-border/50 rounded-xl p-6 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total</span>
                <span className="font-display text-2xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full h-12 bg-gradient-primary text-accent-foreground font-semibold rounded-xl">Proceed to Checkout</Button>
              <Button variant="ghost" size="sm" onClick={clearCart} className="w-full mt-2 text-muted-foreground">Clear Cart</Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
