// ── REPLACE THIS with your actual WhatsApp number (with country code, no +) ──
const WA_NUMBER = "919999999999";

// ── PRODUCTS DATA ──
const products = [
  { id:1,  name:"Bijili Cracker",     cat:"ground",   emoji:"💥", desc:"Classic loud cracker, per box of 100",    price:120,  mrp:180,  badge:"Best Seller" },
  { id:2,  name:"Atom Bomb",          cat:"ground",   emoji:"💣", desc:"Extra-loud double blast cracker",         price:250,  mrp:350,  badge:"Popular"     },
  { id:3,  name:"Chakkar (Wheel)",    cat:"ground",   emoji:"🌀", desc:"Spinning ground wheel with sparks",       price:180,  mrp:240,  badge:null          },
  { id:4,  name:"Flower Pot",         cat:"fancy",    emoji:"🌸", desc:"Colourful showers of sparks",             price:200,  mrp:280,  badge:"Fan Fav"     },
  { id:5,  name:"Sky Shot (Single)",  cat:"sky",      emoji:"🚀", desc:"Single shot aerial firework",             price:350,  mrp:500,  badge:"New"         },
  { id:6,  name:"Multi-Shot Sky",     cat:"sky",      emoji:"🎆", desc:"19-shot multi colour aerial display",     price:850,  mrp:1200, badge:"Hot Deal"    },
  { id:7,  name:"Gold Sparklers 25cm",cat:"sparkler", emoji:"✨", desc:"Pack of 10 gold sparklers",              price:80,   mrp:120,  badge:null          },
  { id:8,  name:"Colour Sparklers",   cat:"sparkler", emoji:"🌈", desc:"Mixed colour sparkler pack of 10",       price:100,  mrp:150,  badge:null          },
  { id:9,  name:"Fountain (Big)",     cat:"fancy",    emoji:"⛲", desc:"Tall golden fountain with whistle",       price:320,  mrp:450,  badge:null          },
  { id:10, name:"Paper Rocket",       cat:"sky",      emoji:"🎇", desc:"Classic whistle rocket box of 5",        price:160,  mrp:220,  badge:null          },
  { id:11, name:"Mega Combo Box",     cat:"gift",     emoji:"🎁", desc:"50-item curated family pack",            price:1499, mrp:2200, badge:"Best Value"  },
  { id:12, name:"Kids Special Box",   cat:"gift",     emoji:"🎀", desc:"Safe sparklers & fancy items pack",      price:699,  mrp:1000, badge:"Kid Safe"    },
  { id:13, name:"Diwali Gift Pack",   cat:"gift",     emoji:"🪔", desc:"Premium 30-item assorted box",           price:999,  mrp:1500, badge:"Diwali"      },
  { id:14, name:"String Crackers 100",cat:"ground",   emoji:"🧨", desc:"100 joined bijili string",               price:140,  mrp:200,  badge:null          },
  { id:15, name:"Snake Tablet",       cat:"fancy",    emoji:"🐍", desc:"Grows into a snake when lit",            price:60,   mrp:90,   badge:null          },
  { id:16, name:"Pencil Cracker Box", cat:"ground",   emoji:"✏️", desc:"Box of 10 pencil crackers",             price:90,   mrp:130,  badge:null          },
];

const WA_SVG_SM = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`;

// ── RENDER PRODUCTS ──
function renderProducts(filter) {
  const grid = document.getElementById('productsGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img">
        <span>${p.emoji}</span>
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="product-bottom">
          <div class="price">₹${p.price}<span>₹${p.mrp}</span></div>
          <button class="order-btn" onclick="quickOrder('${p.name}', ${p.price})">
            ${WA_SVG_SM} Order
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ── FILTER PRODUCTS ──
function filterProducts(cat, btn) {
  renderProducts(cat);
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// ── QUICK ORDER (single product) ──
function quickOrder(name, price) {
  const msg = encodeURIComponent(
    `Hello! I want to order:\n\n🧨 ${name} – ₹${price}\n\nPlease confirm availability and delivery details.`
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
}

// ── MODAL OPEN / CLOSE ──
function openModal(e) {
  if (e) e.preventDefault();
  document.getElementById('orderModal').classList.add('open');
}

function closeModal() {
  document.getElementById('orderModal').classList.remove('open');
}

// Close modal on backdrop click
document.getElementById('orderModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ── SEND ORDER VIA WHATSAPP ──
function sendWhatsApp() {
  const name  = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const order = document.getElementById('custOrder').value.trim();

  if (!name || !order) {
    alert('Please fill your name and order details!');
    return;
  }

  const msg = encodeURIComponent(
    `🎉 *New Order from StarCrackers Website!*\n\n` +
    `👤 Name: ${name}\n` +
    `📞 Phone: ${phone || 'Not provided'}\n\n` +
    `🧨 Order Details:\n${order}\n\n` +
    `Please confirm and share the total amount. Thank you!`
  );

  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
  closeModal();
}

// ── SPARKS ANIMATION ──
(function () {
  const canvas = document.getElementById('sparks-canvas');
  const ctx = canvas.getContext('2d');
  let sparks = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createSpark() {
    return {
      x:     Math.random() * canvas.width,
      y:     canvas.height + 10,
      vx:    (Math.random() - 0.5) * 1.2,
      vy:    -(Math.random() * 2 + 0.8),
      size:  Math.random() * 2.5 + 0.5,
      life:  1,
      decay: Math.random() * 0.004 + 0.002,
      color: ['#FFD700','#FF4500','#FF6B00','#FFB300','#FF8C00'][Math.floor(Math.random() * 5)]
    };
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (sparks.length < 80) sparks.push(createSpark());
    sparks = sparks.filter(s => s.life > 0);
    sparks.forEach(s => {
      s.x    += s.vx;
      s.y    += s.vy;
      s.vy   += 0.015;
      s.life -= s.decay;
      ctx.save();
      ctx.globalAlpha = s.life * 0.55;
      ctx.fillStyle   = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur  = 6;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ── INIT ──
renderProducts('all');