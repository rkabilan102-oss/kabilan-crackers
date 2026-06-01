
import { useState, useEffect, useContext, createContext, useReducer } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const PRODUCTS = [
  // Ground Chakkar
  { id: 1, name: "Ground Chakkar", category: "Ground", price: 120, mrp: 150, image: "🌀", desc: "Spinning ground chakkar with brilliant sparks", stock: 50, unit: "Box of 10" },
  { id: 2, name: "Fancy Chakkar", category: "Ground", price: 200, mrp: 250, image: "✨", desc: "Multi-color spinning chakkar", stock: 40, unit: "Box of 10" },
  // Sky Shots
  { id: 3, name: "Single Shot", category: "Sky Shots", price: 80, mrp: 100, image: "🚀", desc: "High altitude single burst with loud report", stock: 60, unit: "Box of 5" },
  { id: 4, name: "Multi Shot 10", category: "Sky Shots", price: 350, mrp: 420, image: "🎆", desc: "10 rapid aerial bursts multi-color", stock: 35, unit: "1 Piece" },
  { id: 5, name: "Multi Shot 25", category: "Sky Shots", price: 750, mrp: 900, image: "🎇", desc: "25 shot rapid fire aerial display", stock: 20, unit: "1 Piece" },
  // Sparklers
  { id: 6, name: "Colour Sparkler 15cm", category: "Sparklers", price: 50, mrp: 65, image: "🌟", desc: "Bright 15cm colour sparklers for kids", stock: 100, unit: "Pack of 10" },
  { id: 7, name: "Colour Sparkler 30cm", category: "Sparklers", price: 90, mrp: 110, image: "⭐", desc: "Long-lasting 30cm sparklers", stock: 80, unit: "Pack of 10" },
  { id: 8, name: "Electric Sparkler", category: "Sparklers", price: 180, mrp: 220, image: "💫", desc: "Rechargeable electric sparkler safe for all", stock: 30, unit: "1 Piece" },
  // Bombs
  { id: 9, name: "Laxmi Bomb", category: "Bombs", price: 60, mrp: 80, image: "💥", desc: "Classic Laxmi bomb with loud crack", stock: 70, unit: "Box of 10" },
  { id: 10, name: "Atom Bomb", category: "Bombs", price: 40, mrp: 55, image: "🔥", desc: "Small but mighty atom bomb", stock: 90, unit: "Box of 20" },
  { id: 11, name: "Hydrogen Bomb", category: "Bombs", price: 150, mrp: 190, image: "💣", desc: "Super loud hydrogen bomb – adults only", stock: 25, unit: "Box of 5" },
  // Fountains
  { id: 12, name: "Flower Pot Small", category: "Fountains", price: 100, mrp: 130, image: "🌷", desc: "Beautiful fountain with golden sparks", stock: 45, unit: "Box of 5" },
  { id: 13, name: "Flower Pot Big", category: "Fountains", price: 220, mrp: 280, image: "🌺", desc: "Giant fountain reaching 6 feet high", stock: 30, unit: "Box of 3" },
  { id: 14, name: "Color Fountain", category: "Fountains", price: 320, mrp: 400, image: "🎨", desc: "Multi-color fountain – red, green, blue sparks", stock: 20, unit: "1 Piece" },
  // Rockets
  { id: 15, name: "Two Sound Rocket", category: "Rockets", price: 70, mrp: 90, image: "🛸", desc: "Two-stage sound rocket with whistle", stock: 55, unit: "Box of 10" },
  { id: 16, name: "Whistling Rocket", category: "Rockets", price: 120, mrp: 150, image: "🌠", desc: "Whistling rocket with aerial burst", stock: 40, unit: "Box of 5" },
  // Gift Boxes
  { id: 17, name: "Family Pack ₹500", category: "Gift Boxes", price: 499, mrp: 650, image: "🎁", desc: "Best seller family assortment pack", stock: 30, unit: "1 Pack", badge: "POPULAR" },
  { id: 18, name: "Premium Pack ₹1000", category: "Gift Boxes", price: 999, mrp: 1300, image: "🎀", desc: "Premium assortment with sky shots & fountains", stock: 20, unit: "1 Pack", badge: "BESTSELLER" },
  { id: 19, name: "Mega Celebration ₹2000", category: "Gift Boxes", price: 1999, mrp: 2600, image: "🏆", desc: "Complete Diwali celebration pack for family", stock: 10, unit: "1 Pack", badge: "FESTIVE" },
  // Novelty
  { id: 20, name: "Snake Tablet", category: "Novelty", price: 30, mrp: 40, image: "🐍", desc: "Fun snake tablets – watch them grow!", stock: 60, unit: "Box of 12" },
  { id: 21, name: "Paper Cap Gun", category: "Novelty", price: 25, mrp: 35, image: "🔫", desc: "Toy cap gun with paper caps", stock: 80, unit: "1 Piece" },
  { id: 22, name: "Bijili Cracker", category: "Novelty", price: 45, mrp: 60, image: "⚡", desc: "Roll of 100 bijili crackers", stock: 75, unit: "1 Roll" },
];

const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

const BANNERS = [
  { title: "Diwali 2025 Collection", sub: "Celebrate with Kabilan Crackers – trusted since 1992", color: "#ff6b00" },
  { title: "Up to 40% OFF", sub: "On all gift packs and assorted boxes this season", color: "#c0392b" },
  { title: "Free Delivery", sub: "On orders above ₹1000 within Sivakasi & surroundings", color: "#8e44ad" },
];

// ─── CONTEXT ────────────────────────────────────────────────────────────────
const CartContext = createContext();
const AuthContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const exists = state.find(i => i.id === action.product.id);
      if (exists) return state.map(i => i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...state, { ...action.product, qty: 1 }];
    }
    case "REMOVE": return state.filter(i => i.id !== action.id);
    case "UPDATE_QTY": return state.map(i => i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i);
    case "CLEAR": return [];
    default: return state;
  }
}

// ─── STYLES ─────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  :root{
    --fire:#ff4500;--gold:#f5a623;--deep:#1a0a00;--cream:#fff8f0;
    --card:#fff;--border:#ffe4cc;--success:#27ae60;--danger:#e74c3c;
    --shadow:0 4px 24px rgba(255,69,0,.12);
  }
  body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--deep)}
  h1,h2,h3{font-family:'Playfair Display',serif}
  .app{min-height:100vh}
  /* NAV */
  nav{background:var(--deep);position:sticky;top:0;z-index:100;padding:0 1.5rem;display:flex;align-items:center;justify-content:space-between;height:64px;box-shadow:0 2px 20px rgba(255,69,0,.3)}
  .nav-brand{display:flex;align-items:center;gap:.6rem;cursor:pointer}
  .nav-brand .logo{font-size:2rem}
  .nav-brand .brand-text{color:#fff}
  .nav-brand .brand-name{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:900;color:var(--gold);line-height:1}
  .nav-brand .brand-sub{font-size:.65rem;color:#ccc;letter-spacing:.08em}
  .nav-links{display:flex;align-items:center;gap:.5rem}
  .nav-btn{background:none;border:none;color:#fff;cursor:pointer;padding:.5rem .8rem;border-radius:8px;font-size:.85rem;font-family:'DM Sans',sans-serif;font-weight:500;transition:background .2s}
  .nav-btn:hover{background:rgba(255,255,255,.1)}
  .nav-btn.active{color:var(--gold)}
  .cart-btn{position:relative;background:var(--fire);color:#fff;border:none;cursor:pointer;padding:.5rem 1rem;border-radius:20px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.85rem;display:flex;align-items:center;gap:.4rem;transition:transform .2s,box-shadow .2s}
  .cart-btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(255,69,0,.4)}
  .cart-badge{background:var(--gold);color:var(--deep);border-radius:50%;width:18px;height:18px;font-size:.65rem;font-weight:700;display:flex;align-items:center;justify-content:center}
  /* HERO BANNER */
  .banner{height:220px;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;position:relative;overflow:hidden;transition:background .8s}
  .banner-bg{position:absolute;inset:0;opacity:.15;font-size:8rem;display:flex;align-items:center;justify-content:center;pointer-events:none}
  .banner h1{color:#fff;font-size:2.2rem;text-shadow:0 2px 12px rgba(0,0,0,.4);position:relative;z-index:1}
  .banner p{color:rgba(255,255,255,.85);font-size:1rem;margin-top:.4rem;position:relative;z-index:1}
  .banner-dots{display:flex;gap:.4rem;margin-top:1rem;position:relative;z-index:1}
  .banner-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.4);cursor:pointer;transition:background .2s}
  .banner-dot.active{background:#fff}
  /* SHOP */
  .shop-layout{display:flex;gap:0;min-height:calc(100vh - 64px)}
  .sidebar{width:200px;flex-shrink:0;background:#fff;border-right:1px solid var(--border);padding:1.2rem 1rem}
  .sidebar h3{font-size:.75rem;letter-spacing:.1em;color:#999;text-transform:uppercase;margin-bottom:.8rem}
  .cat-btn{display:block;width:100%;text-align:left;background:none;border:none;padding:.5rem .7rem;border-radius:8px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.85rem;color:#555;transition:all .2s;margin-bottom:.2rem}
  .cat-btn:hover{background:var(--cream);color:var(--fire)}
  .cat-btn.active{background:var(--fire);color:#fff;font-weight:600}
  .main-area{flex:1;padding:1.5rem}
  .search-bar{display:flex;align-items:center;gap:.8rem;background:#fff;border:1.5px solid var(--border);border-radius:12px;padding:.6rem 1rem;margin-bottom:1.4rem;max-width:400px;box-shadow:0 2px 8px rgba(0,0,0,.04)}
  .search-bar input{flex:1;border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:.9rem;background:transparent}
  .products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1.2rem}
  /* PRODUCT CARD */
  .p-card{background:#fff;border-radius:16px;border:1px solid var(--border);overflow:hidden;transition:transform .2s,box-shadow .2s;cursor:pointer;position:relative}
  .p-card:hover{transform:translateY(-4px);box-shadow:var(--shadow)}
  .p-card-img{height:120px;display:flex;align-items:center;justify-content:center;font-size:3.5rem;background:linear-gradient(135deg,#fff5eb,#ffe4cc)}
  .p-card-body{padding:.9rem}
  .p-card-cat{font-size:.65rem;color:var(--fire);text-transform:uppercase;letter-spacing:.06em;font-weight:600;margin-bottom:.2rem}
  .p-card-name{font-size:.95rem;font-weight:600;color:var(--deep);margin-bottom:.2rem;line-height:1.3}
  .p-card-unit{font-size:.72rem;color:#999;margin-bottom:.5rem}
  .p-card-pricing{display:flex;align-items:baseline;gap:.4rem;margin-bottom:.7rem}
  .p-card-price{font-size:1.05rem;font-weight:700;color:var(--fire)}
  .p-card-mrp{font-size:.78rem;color:#bbb;text-decoration:line-through}
  .p-card-off{font-size:.72rem;font-weight:600;color:var(--success);background:#e8f8ee;padding:.1rem .4rem;border-radius:4px}
  .add-btn{width:100%;padding:.45rem;border:none;border-radius:8px;background:var(--fire);color:#fff;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.82rem;cursor:pointer;transition:background .2s}
  .add-btn:hover{background:#cc3700}
  .add-btn.in-cart{background:#fff;color:var(--fire);border:2px solid var(--fire)}
  .badge{position:absolute;top:.6rem;right:.6rem;background:var(--gold);color:var(--deep);font-size:.6rem;font-weight:700;padding:.2rem .5rem;border-radius:20px;text-transform:uppercase;letter-spacing:.04em}
  /* CART DRAWER */
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:200;backdrop-filter:blur(2px)}
  .drawer{position:fixed;right:0;top:0;height:100%;width:380px;max-width:95vw;background:#fff;z-index:201;display:flex;flex-direction:column;box-shadow:-8px 0 40px rgba(0,0,0,.15)}
  .drawer-head{background:var(--deep);color:#fff;padding:1.2rem 1.5rem;display:flex;align-items:center;justify-content:space-between}
  .drawer-head h2{font-size:1.1rem;color:var(--gold)}
  .close-btn{background:none;border:none;color:#fff;font-size:1.4rem;cursor:pointer;line-height:1}
  .drawer-items{flex:1;overflow-y:auto;padding:1rem}
  .cart-item{display:flex;gap:.8rem;align-items:center;padding:.8rem 0;border-bottom:1px solid var(--border)}
  .ci-img{font-size:2.2rem;width:50px;height:50px;display:flex;align-items:center;justify-content:center;background:var(--cream);border-radius:10px}
  .ci-name{font-weight:600;font-size:.88rem;margin-bottom:.2rem}
  .ci-unit{font-size:.72rem;color:#999}
  .ci-price{font-weight:700;color:var(--fire);font-size:.9rem;margin-top:.2rem}
  .qty-ctrl{display:flex;align-items:center;gap:.4rem;margin-top:.3rem}
  .qty-btn{width:26px;height:26px;border-radius:50%;border:1.5px solid var(--border);background:#fff;cursor:pointer;font-size.9rem;display:flex;align-items:center;justify-content:center;transition:border-color .2s}
  .qty-btn:hover{border-color:var(--fire);color:var(--fire)}
  .qty-val{font-size:.85rem;font-weight:600;min-width:20px;text-align:center}
  .rm-btn{margin-left:auto;background:none;border:none;color:#bbb;cursor:pointer;font-size:1rem;transition:color .2s}
  .rm-btn:hover{color:var(--danger)}
  .drawer-foot{padding:1.2rem 1.5rem;border-top:1px solid var(--border);background:#fafafa}
  .subtotal-row{display:flex;justify-content:space-between;font-size:.9rem;margin-bottom:.4rem;color:#555}
  .total-row{display:flex;justify-content:space-between;font-size:1.1rem;font-weight:700;margin-bottom:1rem}
  .checkout-btn{width:100%;padding:.75rem;background:var(--fire);color:#fff;border:none;border-radius:12px;font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;cursor:pointer;transition:background .2s,transform .2s}
  .checkout-btn:hover{background:#cc3700;transform:translateY(-1px)}
  /* CHECKOUT */
  .checkout-page{max-width:900px;margin:0 auto;padding:2rem 1.5rem}
  .checkout-grid{display:grid;grid-template-columns:1fr 360px;gap:2rem;align-items:start}
  .checkout-form{background:#fff;border-radius:16px;padding:2rem;border:1px solid var(--border)}
  .checkout-form h2{margin-bottom:1.5rem;font-size:1.3rem}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem}
  .form-group{display:flex;flex-direction:column;gap:.4rem;margin-bottom:1rem}
  .form-group label{font-size:.82rem;font-weight:600;color:#555}
  .form-group input,.form-group select,.form-group textarea{padding:.65rem .9rem;border:1.5px solid var(--border);border-radius:10px;font-family:'DM Sans',sans-serif;font-size:.88rem;outline:none;transition:border-color .2s}
  .form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:var(--fire)}
  .order-summary{background:#fff;border-radius:16px;padding:1.5rem;border:1px solid var(--border);position:sticky;top:80px}
  .order-summary h3{margin-bottom:1rem;font-size:1.1rem}
  .os-item{display:flex;justify-content:space-between;align-items:center;padding:.5rem 0;border-bottom:1px solid var(--border);font-size:.85rem}
  .os-item:last-of-type{border:none}
  .os-total{display:flex;justify-content:space-between;font-weight:700;font-size:1rem;margin-top:.6rem;padding-top:.6rem;border-top:2px solid var(--fire)}
  .place-btn{width:100%;padding:.8rem;margin-top:1rem;background:var(--fire);color:#fff;border:none;border-radius:12px;font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;cursor:pointer;transition:background .2s}
  .place-btn:hover{background:#cc3700}
  /* SUCCESS */
  .success-page{text-align:center;padding:4rem 1.5rem;max-width:500px;margin:0 auto}
  .success-icon{font-size:5rem;margin-bottom:1rem}
  .success-page h1{font-size:2rem;color:var(--success);margin-bottom:.5rem}
  .success-page p{color:#666;margin-bottom:1.5rem}
  .order-id{background:var(--cream);border:1px dashed var(--gold);border-radius:10px;padding:.8rem 1.5rem;font-weight:700;font-size:1rem;color:var(--fire);display:inline-block;margin-bottom:1.5rem}
  .continue-btn{padding:.75rem 2rem;background:var(--fire);color:#fff;border:none;border-radius:12px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.95rem;cursor:pointer}
  /* ADMIN */
  .admin-page{max-width:1100px;margin:0 auto;padding:2rem 1.5rem}
  .admin-page h1{margin-bottom:.3rem}
  .admin-page>p{color:#777;margin-bottom:2rem;font-size:.9rem}
  .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2rem}
  .stat-card{background:#fff;border-radius:14px;padding:1.2rem;border:1px solid var(--border);text-align:center}
  .stat-card .val{font-size:1.8rem;font-weight:700;color:var(--fire);font-family:'Playfair Display',serif}
  .stat-card .lbl{font-size:.78rem;color:#888;margin-top:.2rem}
  .admin-table{width:100%;border-collapse:collapse;background:#fff;border-radius:14px;overflow:hidden;border:1px solid var(--border)}
  .admin-table th{background:var(--deep);color:var(--gold);font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;padding:.8rem 1rem;text-align:left}
  .admin-table td{padding:.75rem 1rem;font-size:.85rem;border-bottom:1px solid var(--border)}
  .admin-table tr:last-child td{border-bottom:none}
  .admin-table tr:hover td{background:#fffaf5}
  .status-badge{padding:.2rem .6rem;border-radius:20px;font-size:.72rem;font-weight:600}
  .status-pending{background:#fff3cd;color:#856404}
  .status-confirmed{background:#d4edda;color:#155724}
  .status-delivered{background:#cce5ff;color:#004085}
  /* FOOTER */
  footer{background:var(--deep);color:#ccc;padding:3rem 2rem 1.5rem;margin-top:3rem}
  .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:2rem;margin-bottom:2rem}
  .footer-brand{font-size:1.5rem;color:var(--gold);font-family:'Playfair Display',serif;margin-bottom:.5rem}
  .footer-grid p{font-size:.82rem;line-height:1.6}
  .footer-grid h4{color:#fff;font-size:.85rem;margin-bottom.6rem;margin-bottom:.7rem}
  .footer-grid ul{list-style:none;font-size:.82rem}
  .footer-grid ul li{margin-bottom:.3rem}
  .footer-bottom{text-align:center;font-size:.75rem;border-top:1px solid rgba(255,255,255,.1);padding-top:1.2rem;color:#888}
  /* RESPONSIVE */
  @media(max-width:768px){
    .shop-layout{flex-direction:column}
    .sidebar{width:100%;border-right:none;border-bottom:1px solid var(--border);padding:.8rem}
    .sidebar h3{display:none}
    .cat-btn{display:inline-block;width:auto;padding:.3rem .7rem;font-size:.78rem;margin-right:.3rem}
    .products-grid{grid-template-columns:repeat(2,1fr)}
    .checkout-grid{grid-template-columns:1fr}
    .stats-grid{grid-template-columns:repeat(2,1fr)}
    .footer-grid{grid-template-columns:1fr 1fr}
    .banner h1{font-size:1.5rem}
    .form-row{grid-template-columns:1fr}
    nav{padding:0 1rem}
  }
`;

// ─── HELPERS ────────────────────────────────────────────────────────────────
const disc = p => Math.round(((p.mrp - p.price) / p.mrp) * 100);
const fmt = n => "₹" + n.toLocaleString("en-IN");
const genOrderId = () => "KCR" + Date.now().toString().slice(-8);

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function ProductCard({ product, onAdd, inCart }) {
  return (
    <div className="p-card">
      {product.badge && <div className="badge">{product.badge}</div>}
      <div className="p-card-img">{product.image}</div>
      <div className="p-card-body">
        <div className="p-card-cat">{product.category}</div>
        <div className="p-card-name">{product.name}</div>
        <div className="p-card-unit">{product.unit}</div>
        <div className="p-card-pricing">
          <span className="p-card-price">{fmt(product.price)}</span>
          <span className="p-card-mrp">{fmt(product.mrp)}</span>
          <span className="p-card-off">{disc(product)}% off</span>
        </div>
        <button className={`add-btn${inCart ? " in-cart" : ""}`} onClick={() => onAdd(product)}>
          {inCart ? "✓ In Cart" : "+ Add to Cart"}
        </button>
      </div>
    </div>
  );
}

function CartDrawer({ cart, dispatch, onCheckout, onClose }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal >= 1000 ? 0 : 80;
  const total = subtotal + delivery;
  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="drawer">
        <div className="drawer-head">
          <h2>🛒 Your Cart ({cart.length} items)</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="drawer-items">
          {cart.length === 0 && (
            <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#bbb" }}>
              <div style={{ fontSize: "3rem", marginBottom: ".8rem" }}>🧨</div>
              <p>Your cart is empty.<br />Add some crackers!</p>
            </div>
          )}
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="ci-img">{item.image}</div>
              <div style={{ flex: 1 }}>
                <div className="ci-name">{item.name}</div>
                <div className="ci-unit">{item.unit}</div>
                <div className="ci-price">{fmt(item.price * item.qty)}</div>
                <div className="qty-ctrl">
                  <button className="qty-btn" onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty - 1 })}>−</button>
                  <span className="qty-val">{item.qty}</span>
                  <button className="qty-btn" onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty + 1 })}>+</button>
                </div>
              </div>
              <button className="rm-btn" onClick={() => dispatch({ type: "REMOVE", id: item.id })}>🗑</button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="drawer-foot">
            <div className="subtotal-row"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <div className="subtotal-row"><span>Delivery</span><span>{delivery === 0 ? "FREE 🎉" : fmt(delivery)}</span></div>
            {subtotal < 1000 && <div style={{ fontSize: ".72rem", color: "#f90", marginBottom: ".6rem" }}>Add {fmt(1000 - subtotal)} more for free delivery</div>}
            <div className="total-row"><span>Total</span><span style={{ color: "var(--fire)" }}>{fmt(total)}</span></div>
            <button className="checkout-btn" onClick={onCheckout}>Proceed to Checkout →</button>
          </div>
        )}
      </div>
    </>
  );
}

function CheckoutPage({ cart, dispatch, onSuccess }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", pincode: "", state: "Tamil Nadu", payment: "cod" });
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal >= 1000 ? 0 : 80;
  const total = subtotal + delivery;

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      alert("Please fill all required fields.");
      return;
    }
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem("kc_orders") || "[]");
    const newOrder = {
      id: genOrderId(),
      date: new Date().toLocaleString(),
      customer: form,
      items: cart,
      subtotal, delivery, total,
      status: "Pending"
    };
    orders.push(newOrder);
    localStorage.setItem("kc_orders", JSON.stringify(orders));
    dispatch({ type: "CLEAR" });
    onSuccess(newOrder.id);
  };

  return (
    <div className="checkout-page">
      <h2 style={{ marginBottom: "1.5rem" }}>Checkout</h2>
      <div className="checkout-grid">
        <div className="checkout-form">
          <h2>Delivery Details</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Kabilan" />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="kabilan@example.com" />
          </div>
          <div className="form-group">
            <label>Address *</label>
            <textarea name="address" value={form.address} onChange={handleChange} placeholder="Door no, Street, Area" rows={3} style={{ resize: "vertical" }} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input name="city" value={form.city} onChange={handleChange} placeholder="Sivakasi" />
            </div>
            <div className="form-group">
              <label>Pincode *</label>
              <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="626123" />
            </div>
          </div>
          <div className="form-group">
            <label>State</label>
            <select name="state" value={form.state} onChange={handleChange}>
              {["Tamil Nadu","Kerala","Karnataka","Andhra Pradesh","Telangana","Maharashtra","Gujarat","Rajasthan","Delhi","West Bengal","Other"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <h2 style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>Payment Method</h2>
          {[["cod","💵 Cash on Delivery"],["upi","📱 UPI / QR Code"],["card","💳 Credit / Debit Card (Demo)"]].map(([val, label]) => (
            <label key={val} style={{ display: "flex", alignItems: "center", gap: ".7rem", padding: ".7rem", border: `2px solid ${form.payment === val ? "var(--fire)" : "var(--border)"}`, borderRadius: "10px", marginBottom: ".6rem", cursor: "pointer", transition: "border-color .2s" }}>
              <input type="radio" name="payment" value={val} checked={form.payment === val} onChange={handleChange} style={{ accentColor: "var(--fire)" }} />
              <span style={{ fontSize: ".9rem", fontWeight: 500 }}>{label}</span>
            </label>
          ))}
        </div>
        <div className="order-summary">
          <h3>Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} className="os-item">
              <span>{item.image} {item.name} × {item.qty}</span>
              <span style={{ fontWeight: 600 }}>{fmt(item.price * item.qty)}</span>
            </div>
          ))}
          <div className="os-item"><span>Delivery</span><span>{delivery === 0 ? "FREE" : fmt(delivery)}</span></div>
          <div className="os-total"><span>Total Payable</span><span style={{ color: "var(--fire)" }}>{fmt(total)}</span></div>
          <div style={{ fontSize: ".75rem", color: "#888", marginTop: ".5rem" }}>Inclusive of all taxes. Safe delivery guaranteed.</div>
          <button className="place-btn" onClick={handleSubmit}>
            {form.payment === "cod" ? "Place Order 🎆" : "Pay & Place Order 🎆"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SuccessPage({ orderId, onContinue }) {
  return (
    <div className="success-page">
      <div className="success-icon">🎆</div>
      <h1>Order Placed!</h1>
      <p>Thank you for ordering from Kabilan Crackers. We'll confirm your order shortly via phone.</p>
      <div className="order-id">Order ID: {orderId}</div>
      <div style={{ fontSize: ".82rem", color: "#888", marginBottom: "1.5rem" }}>
        📞 For queries: <strong>+91 9876543210</strong> | 📧 kabilan.crackers@example.com
      </div>
      <button className="continue-btn" onClick={onContinue}>Continue Shopping →</button>
    </div>
  );
}

function AdminPage() {
  const orders = JSON.parse(localStorage.getItem("kc_orders") || "[]").reverse();
  const total = orders.reduce((s, o) => s + o.total, 0);
  const totalItems = orders.reduce((s, o) => s + o.items.reduce((a, i) => a + i.qty, 0), 0);
  const [tab, setTab] = useState("orders");

  const productSales = {};
  orders.forEach(o => o.items.forEach(i => {
    productSales[i.name] = (productSales[i.name] || 0) + i.qty;
  }));
  const topProducts = Object.entries(productSales).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="admin-page">
      <h1>🔐 Admin Dashboard</h1>
      <p>Kabilan Crackers – Business Overview (demo data from localStorage)</p>
      <div className="stats-grid">
        <div className="stat-card"><div className="val">{orders.length}</div><div className="lbl">Total Orders</div></div>
        <div className="stat-card"><div className="val">{fmt(total)}</div><div className="lbl">Revenue</div></div>
        <div className="stat-card"><div className="val">{totalItems}</div><div className="lbl">Items Sold</div></div>
        <div className="stat-card"><div className="val">{orders.length > 0 ? fmt(Math.round(total / orders.length)) : "₹0"}</div><div className="lbl">Avg Order Value</div></div>
      </div>
      <div style={{ display: "flex", gap: ".5rem", marginBottom: "1.2rem" }}>
        {["orders", "products"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: ".45rem 1rem", borderRadius: "8px", border: "1.5px solid var(--border)", background: tab === t ? "var(--fire)" : "#fff", color: tab === t ? "#fff" : "#555", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".82rem", cursor: "pointer" }}>
            {t === "orders" ? "Orders" : "Top Products"}
          </button>
        ))}
      </div>
      {tab === "orders" && (
        orders.length === 0
          ? <div style={{ textAlign: "center", padding: "3rem", color: "#bbb" }}>No orders yet. Place an order first!</div>
          : <table className="admin-table">
            <thead><tr><th>Order ID</th><th>Customer</th><th>City</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td><strong>{o.id}</strong></td>
                  <td>{o.customer.name}<br /><span style={{ fontSize: ".72rem", color: "#999" }}>{o.customer.phone}</span></td>
                  <td>{o.customer.city}</td>
                  <td>{o.items.length} product(s)</td>
                  <td><strong style={{ color: "var(--fire)" }}>{fmt(o.total)}</strong></td>
                  <td style={{ textTransform: "capitalize" }}>{o.customer.payment}</td>
                  <td><span className={`status-badge status-${o.status.toLowerCase()}`}>{o.status}</span></td>
                  <td style={{ fontSize: ".72rem", color: "#888" }}>{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
      )}
      {tab === "products" && (
        topProducts.length === 0
          ? <div style={{ textAlign: "center", padding: "3rem", color: "#bbb" }}>No sales yet.</div>
          : <table className="admin-table">
            <thead><tr><th>Product</th><th>Units Sold</th></tr></thead>
            <tbody>
              {topProducts.map(([name, qty]) => (
                <tr key={name}><td>{name}</td><td><strong>{qty}</strong></td></tr>
              ))}
            </tbody>
          </table>
      )}
    </div>
  );
}

function ShopPage({ cart, dispatch }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [banner, setBanner] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBanner(b => (b + 1) % BANNERS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const filtered = PRODUCTS.filter(p =>
    (category === "All" || p.category === category) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  );
  const cartIds = new Set(cart.map(i => i.id));

  return (
    <>
      <div className="banner" style={{ background: BANNERS[banner].color }}>
        <div className="banner-bg">🧨</div>
        <h1>{BANNERS[banner].title}</h1>
        <p>{BANNERS[banner].sub}</p>
        <div className="banner-dots">
          {BANNERS.map((_, i) => <div key={i} className={`banner-dot${i === banner ? " active" : ""}`} onClick={() => setBanner(i)} />)}
        </div>
      </div>
      <div className="shop-layout">
        <div className="sidebar">
          <h3>Categories</h3>
          {CATEGORIES.map(c => (
            <button key={c} className={`cat-btn${category === c ? " active" : ""}`} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
        <div className="main-area">
          <div className="search-bar">
            <span style={{ color: "#bbb" }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search crackers..." />
            {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb" }}>✕</button>}
          </div>
          <div style={{ fontSize: ".82rem", color: "#888", marginBottom: "1rem" }}>
            Showing <strong>{filtered.length}</strong> products{category !== "All" ? ` in "${category}"` : ""}
          </div>
          <div className="products-grid">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} inCart={cartIds.has(p.id)} onAdd={prod => dispatch({ type: "ADD", product: prod })} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem", color: "#bbb" }}>
              <div style={{ fontSize: "3rem" }}>🔍</div>
              <p>No products found for "{search}"</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [page, setPage] = useState("shop"); // shop | checkout | success | admin
  const [cartOpen, setCartOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* NAV */}
        <nav>
          <div className="nav-brand" onClick={() => setPage("shop")}>
            <div className="logo">🧨</div>
            <div className="brand-text">
              <div className="brand-name">Kabilan Crackers</div>
              <div className="brand-sub">SIVAKASI • EST. 1992</div>
            </div>
          </div>
          <div className="nav-links">
            <button className={`nav-btn${page === "shop" ? " active" : ""}`} onClick={() => setPage("shop")}>🏠 Shop</button>
            <button className="nav-btn" onClick={() => setPage("admin")}>📊 Admin</button>
            <button className="cart-btn" onClick={() => setCartOpen(true)}>
              🛒 Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </nav>

        {/* PAGES */}
        {page === "shop" && <ShopPage cart={cart} dispatch={dispatch} />}
        {page === "checkout" && (
          <CheckoutPage
            cart={cart}
            dispatch={dispatch}
            onSuccess={id => { setOrderId(id); setPage("success"); }}
          />
        )}
        {page === "success" && (
          <SuccessPage orderId={orderId} onContinue={() => setPage("shop")} />
        )}
        {page === "admin" && <AdminPage />}

        {/* CART DRAWER */}
        {cartOpen && (
          <CartDrawer
            cart={cart}
            dispatch={dispatch}
            onClose={() => setCartOpen(false)}
            onCheckout={() => {
              if (cart.length === 0) { alert("Your cart is empty!"); return; }
              setCartOpen(false);
              setPage("checkout");
            }}
          />
        )}

        {/* FOOTER */}
        {(page === "shop" || page === "admin") && (
          <footer>
            <div className="footer-grid">
              <div>
                <div className="footer-brand">🧨 Kabilan Crackers</div>
                <p>Trusted crackers manufacturer and retailer from Sivakasi, Tamil Nadu since 1992. Quality, safety, and joy guaranteed every Diwali.</p>
              </div>
              <div>
                <h4>Quick Links</h4>
                <ul>
                  <li>Shop</li><li>Gift Packs</li><li>Bulk Orders</li><li>Track Order</li>
                </ul>
              </div>
              <div>
                <h4>Contact</h4>
                <ul>
                  <li>📞 +91 9876543210</li>
                  <li>📧 kabilan@example.com</li>
                  <li>📍 Sivakasi, TN 626123</li>
                  <li>🕐 9AM – 8PM Daily</li>
                </ul>
              </div>
              <div>
                <h4>Safety First</h4>
                <ul>
                  <li>✅ BIS Certified</li>
                  <li>✅ Licensed Dealer</li>
                  <li>✅ Adult supervision</li>
                  <li>✅ Genuine products</li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              © 2025 Kabilan Crackers, Sivakasi. All Rights Reserved. &nbsp;|&nbsp; Cracker sales subject to local laws.
            </div>
          </footer>
        )}
      </div>
    </>
  );
}
