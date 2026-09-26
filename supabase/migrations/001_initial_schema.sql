-- ============================================================
-- DHANYA TRAIL — SUPABASE DATABASE MIGRATION
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- SETTINGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PRODUCTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('dry-fruits', 'nuts', 'berries', 'seeds', 'makhana', 'saffron', 'wellness', 'roasted')),
  description TEXT,
  long_description TEXT,
  origin TEXT,
  storage_info TEXT DEFAULT 'Store in a cool, dry place in an airtight container.',
  images TEXT[] DEFAULT '{}',
  thumbnail TEXT,
  active BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  bestseller BOOLEAN DEFAULT FALSE,
  badge TEXT CHECK (badge IN ('premium', 'best-seller', 'handpicked', 'roasted', 'new', NULL)),
  tags TEXT[] DEFAULT '{}',
  -- Search aliases (comma-separated Hindi/common names)
  search_aliases TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PRODUCT VARIANTS TABLE (weight-specific pricing & inventory)
-- ============================================================
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  weight_grams INTEGER NOT NULL CHECK (weight_grams IN (100, 200, 250, 500, 1000)),
  -- Base 1kg price (stored per-product via 1000g variant)
  -- price is the actual selling price for this variant
  price DECIMAL(10,2),
  price_not_configured BOOLEAN DEFAULT FALSE,
  auto_calculate BOOLEAN DEFAULT TRUE,
  -- Inventory
  inventory_mode TEXT DEFAULT 'packs' CHECK (inventory_mode IN ('packs', 'bulk')),
  inventory_packs INTEGER DEFAULT 0,
  -- For bulk mode, inventory is tracked at product level (grams)
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, weight_grams)
);

-- Bulk inventory column at product level (used when inventory_mode = 'bulk')
ALTER TABLE products ADD COLUMN IF NOT EXISTS inventory_grams DECIMAL(10,0) DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS inventory_mode TEXT DEFAULT 'packs' CHECK (inventory_mode IN ('packs', 'bulk'));

-- ============================================================
-- ORDERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'confirmed', 'packed', 'dispatched', 'completed', 'cancelled')),
  source TEXT DEFAULT 'whatsapp' CHECK (source IN ('whatsapp', 'website', 'manual')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public can read active products and their variants
CREATE POLICY "Public can view active products" ON products
  FOR SELECT USING (active = TRUE);

CREATE POLICY "Public can view active variants" ON product_variants
  FOR SELECT USING (active = TRUE);

-- Public can read settings
CREATE POLICY "Public can read settings" ON settings
  FOR SELECT USING (TRUE);

-- Authenticated (admin) users can do everything
CREATE POLICY "Admin full access to products" ON products
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to variants" ON product_variants
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to orders" ON orders
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to settings" ON settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Public can insert orders
CREATE POLICY "Public can create orders" ON orders
  FOR INSERT WITH CHECK (TRUE);

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER variants_updated_at BEFORE UPDATE ON product_variants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- SEED: DEFAULT SETTINGS
-- ============================================================
INSERT INTO settings (key, value) VALUES
  ('whatsapp_number', '917082977350'),
  ('whatsapp_default_message', 'Hello Dhanya Trail, I would like to place an order.'),
  ('email', 'Dhanayatrail@gmail.com'),
  ('phone', '+91 70829 77350'),
  ('address', 'HTML Colony, Azad Nagar, Hisar, Haryana 125001'),
  ('business_name', 'Dhanya Trail'),
  ('tagline', 'NUTS • DRY FRUITS • HEALTHY SNACKS'),
  ('payment_link', ''),
  ('instagram_url', ''),
  ('facebook_url', ''),
  ('seo_title', 'Dhanya Trail | Premium Dry Fruits, Nuts, Berries & Healthy Snacks'),
  ('seo_description', 'Shop premium dry fruits, nuts, berries, seeds, makhana, saffron and wellness essentials from Dhanya Trail. Carefully selected products with easy WhatsApp ordering.')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- SEED: PRODUCTS
-- ============================================================

-- ALMONDS
INSERT INTO products (name, slug, category, description, origin, search_aliases, featured, badge, tags) VALUES
  ('California Almonds', 'california-almonds', 'nuts', 'Plump, premium-grade California almonds — naturally sweet, rich in protein and healthy fats. Perfect for snacking, cooking, or soaking overnight.', 'California, USA', 'badam,almond,badaam', false, 'premium', ARRAY['nuts', 'almonds']),
  ('Kashmiri Badaam', 'kashmiri-badaam', 'nuts', 'Prized Kashmiri badaam — smaller, oil-richer almonds with a distinctively aromatic flavour. A traditional favourite for milk preparations and gifting.', 'Kashmir, India', 'badam,almond,badaam,kashmiri', true, 'premium', ARRAY['nuts', 'almonds', 'kashmiri']),
  ('Mamra', 'mamra', 'nuts', 'Authentic Mamra almonds — thin-skinned, lightweight and packed with oil. The gold standard of almonds in Indian households.', 'India/Afghanistan', 'badam,almond,badaam,mamra', true, 'premium', ARRAY['nuts', 'almonds', 'mamra']),
  ('Afghani Mamra', 'afghani-mamra', 'nuts', 'Premium Afghani Mamra — hand-selected, extra-oily and deeply flavourful. Considered among the finest almonds available.', 'Afghanistan', 'badam,almond,badaam,mamra,afghani', false, 'handpicked', ARRAY['nuts', 'almonds', 'mamra']),
  ('Badaam Roasted', 'badaam-roasted', 'roasted', 'Freshly roasted California almonds — lightly salted, crunchy and irresistibly snackable. Made from select whole almonds.', 'California, USA', 'badam,almond,badaam,roasted', false, 'roasted', ARRAY['nuts', 'almonds', 'roasted'])
ON CONFLICT (slug) DO NOTHING;

-- ANJEER
INSERT INTO products (name, slug, category, description, origin, search_aliases, badge, tags) VALUES
  ('Anjeer Jumbo', 'anjeer-jumbo', 'dry-fruits', 'Large, sun-dried figs with a naturally sweet honeyed taste. A time-honoured ingredient in Indian wellness routines.', 'Afghanistan/Turkey', 'anjeer,fig,dried fig', 'premium', ARRAY['dry-fruits', 'figs', 'anjeer']),
  ('Anjeer Premium Afghani', 'anjeer-premium-afghani', 'dry-fruits', 'Hand-selected jumbo Afghan figs — plump, tender and extraordinarily sweet. Among the finest dried figs available.', 'Afghanistan', 'anjeer,fig,dried fig,afghani', 'handpicked', ARRAY['dry-fruits', 'figs', 'anjeer'])
ON CONFLICT (slug) DO NOTHING;

UPDATE products SET featured = TRUE WHERE slug IN ('anjeer-premium-afghani');

-- KISHMISH & MUNNAKA
INSERT INTO products (name, slug, category, description, origin, search_aliases, badge, tags) VALUES
  ('Kishmish Green', 'kishmish-green', 'dry-fruits', 'Seedless green raisins with a bright, tangy-sweet flavour. A natural energy booster for everyday snacking and cooking.', 'Afghanistan', 'kishmish,raisin,green raisin,kismis', null, ARRAY['dry-fruits', 'raisins', 'kishmish']),
  ('Kishmish Black', 'kishmish-black', 'dry-fruits', 'Dark, plump black raisins with a rich, concentrated sweetness. Excellent for baking, desserts and traditional preparations.', 'Afghanistan/Iran', 'kishmish,raisin,black raisin,kismis', null, ARRAY['dry-fruits', 'raisins', 'kishmish']),
  ('Munnaka', 'munnaka', 'dry-fruits', 'Large, seeded Munnaka raisins — long revered in traditional wellness practices for their warm properties and rich, distinctive flavour.', 'Afghanistan', 'munnaka,munakka,raisin,kishmish', null, ARRAY['dry-fruits', 'raisins', 'munnaka'])
ON CONFLICT (slug) DO NOTHING;

-- WALNUTS
INSERT INTO products (name, slug, category, description, origin, search_aliases, featured, badge, tags) VALUES
  ('Shahi Akhrot', 'shahi-akhrot', 'nuts', 'Premium Kashmiri Shahi Akhrot — whole walnuts with paper-thin shells and golden kernels. Celebrated for their superior flavour and nutrition.', 'Kashmir, India', 'akhrot,walnut,shahi,kashmiri', true, 'premium', ARRAY['nuts', 'walnuts', 'akhrot']),
  ('Walnuts Giri', 'walnuts-giri', 'nuts', 'Premium walnut halves (giri) — ready to use, freshly extracted kernels with a satisfying crunch and rich, buttery taste.', 'Kashmir, India', 'akhrot,walnut,giri,half', false, null, ARRAY['nuts', 'walnuts', 'akhrot']),
  ('Kashmiri Kagazi Walnut Sabut', 'kashmiri-kagazi-walnut-sabut', 'nuts', 'Kashmiri Kagazi (paper-shell) walnuts — whole, delicate shells that crack easily by hand. A prized variety known for full, meaty kernels.', 'Kashmir, India', 'akhrot,walnut,kagazi,paper shell,kashmiri', false, 'premium', ARRAY['nuts', 'walnuts', 'akhrot'])
ON CONFLICT (slug) DO NOTHING;

-- MAKHANA
INSERT INTO products (name, slug, category, description, origin, search_aliases, featured, badge, tags) VALUES
  ('Makhana 5 Sutta', 'makhana-5-sutta', 'makhana', 'Grade 5 Sutta Makhana — lotus seeds that are light, crunchy and naturally low in calories. A wholesome snack for the entire family.', 'Bihar, India', 'makhana,fox nut,lotus seed,phool makhana', false, null, ARRAY['makhana', 'lotus seeds']),
  ('Makhana 6 Sutta – Handpicked', 'makhana-6-sutta-handpicked', 'makhana', 'Premium Grade 6 Sutta Makhana — the largest, finest grade of lotus seeds. Handpicked for exceptional size and texture. A premium daily snack.', 'Bihar, India', 'makhana,fox nut,lotus seed,phool makhana,6 sutta', true, 'handpicked', ARRAY['makhana', 'lotus seeds'])
ON CONFLICT (slug) DO NOTHING;

-- CASHEWS
INSERT INTO products (name, slug, category, description, origin, search_aliases, badge, tags) VALUES
  ('Cashew W-320', 'cashew-w320', 'nuts', 'W-320 cashews — the most popular premium grade. Whole, ivory-white kernels with a naturally creamy, buttery taste. Versatile for snacking and cooking.', 'Kerala/Goa, India', 'kaju,cashew,cashewnut,w320', null, ARRAY['nuts', 'cashews', 'kaju']),
  ('Cashew W-180', 'cashew-w180', 'nuts', 'W-180 cashews — the "Jumbo" grade. Noticeably larger kernels with a distinctly rich, full flavour. The premium choice for gifting.', 'Kerala/Goa, India', 'kaju,cashew,cashewnut,w180,jumbo', 'premium', ARRAY['nuts', 'cashews', 'kaju']),
  ('Cashew W-320 – 8 Tukda', 'cashew-w320-8-tukda', 'nuts', 'W-320 cashew pieces (8 tukda) — finely broken pieces at great value. Ideal for cooking, sweets and garnishing.', 'Kerala/Goa, India', 'kaju,cashew,cashewnut,tukda,pieces', null, ARRAY['nuts', 'cashews', 'kaju']),
  ('Kaju Roasted', 'kaju-roasted', 'roasted', 'Premium whole cashews lightly dry-roasted for a satisfying crunch. A popular guilt-free snack.', 'Kerala/Goa, India', 'kaju,cashew,roasted cashew', 'roasted', ARRAY['nuts', 'cashews', 'kaju', 'roasted'])
ON CONFLICT (slug) DO NOTHING;

-- BERRIES & DRIED FRUITS
INSERT INTO products (name, slug, category, description, origin, search_aliases, badge, tags) VALUES
  ('Sea Buckthorn Berry', 'sea-buckthorn-berry', 'berries', 'Vibrant Sea Buckthorn berries — a rare Himalayan superfood with a unique tangy flavour, naturally rich in antioxidants and Vitamin C.', 'Himalayas, India', 'sea buckthorn,buckthorn,himalayan berry', 'premium', ARRAY['berries', 'superfood']),
  ('Khumani', 'khumani', 'berries', 'Sun-dried Kashmiri apricots (Khumani) — soft, naturally sweet and tangy. A beloved ingredient in traditional recipes and a wholesome snack.', 'Kashmir, India', 'khumani,apricot,dried apricot,khubani', null, ARRAY['berries', 'dried fruits', 'apricot']),
  ('Blueberry', 'blueberry', 'berries', 'Premium dried blueberries — plump, intensely flavoured and packed with natural goodness. Perfect for breakfast bowls, baking and snacking.', 'USA', 'blueberry,berry', null, ARRAY['berries', 'blueberry']),
  ('Goji Berry', 'goji-berry', 'berries', 'Vibrant red Goji berries — a celebrated wellness ingredient with a mildly sweet and tangy flavour. A popular addition to smoothies and trail mixes.', 'China/Himalayas', 'goji,berry,wolfberry', null, ARRAY['berries', 'goji', 'superfood']),
  ('Cranberry', 'cranberry', 'berries', 'Sweetened dried cranberries — bright, tart and chewy. A versatile ingredient for snacking, baking and salads.', 'USA', 'cranberry,berry', null, ARRAY['berries', 'cranberry'])
ON CONFLICT (slug) DO NOTHING;

-- SEEDS
INSERT INTO products (name, slug, category, description, origin, search_aliases, badge, tags) VALUES
  ('Flax Seeds', 'flax-seeds', 'seeds', 'Whole flax seeds (alsi) — a rich plant source of Omega-3 fatty acids and dietary fibre. Easy to add to smoothies, curds, or rotis.', 'India', 'flax,flaxseed,alsi,linseed', null, ARRAY['seeds', 'flax', 'wellness']),
  ('Sunflower Seeds', 'sunflower-seeds', 'seeds', 'Premium sunflower seeds — mild, nutty and naturally nourishing. A convenient everyday snack and nutritious topping.', 'India', 'sunflower,sunflower seed', null, ARRAY['seeds', 'sunflower']),
  ('Pumpkin Seeds', 'pumpkin-seeds', 'seeds', 'Hulled green pumpkin seeds (pepitas) — crunchy, flavourful and a great source of plant-based goodness. Ideal for snacking and salads.', 'India/China', 'pumpkin seed,pepita,kaddu beej', null, ARRAY['seeds', 'pumpkin']),
  ('Chia Seeds', 'chia-seeds', 'seeds', 'Premium chia seeds — tiny powerhouses that expand in liquid to create a satisfying texture. Great for puddings, smoothies and wellness routines.', 'South America', 'chia,chia seed,sabja', null, ARRAY['seeds', 'chia', 'wellness']),
  ('Basil Seeds', 'basil-seeds', 'seeds', 'Sabja (basil seeds) — gel-forming seeds traditionally enjoyed in drinks and desserts. A naturally cooling ingredient for warm months.', 'India', 'sabja,basil seed,tukmaria,sweet basil seed', null, ARRAY['seeds', 'basil', 'wellness'])
ON CONFLICT (slug) DO NOTHING;

-- SAFFRON (Kesar — per-gram pricing)
INSERT INTO products (name, slug, category, description, origin, search_aliases, badge, tags) VALUES
  ('Kesar V1', 'kesar-v1', 'saffron', 'Premium Grade V1 Saffron (Kesar) — long, deep crimson threads with a delicate aroma. Adds golden colour and distinctive flavour to milk, sweets and biryani. Priced per gram.', 'Kashmir, India', 'kesar,saffron,zafran,kashmiri saffron', 'premium', ARRAY['saffron', 'kesar', 'spice']),
  ('Kesar V2', 'kesar-v2', 'saffron', 'Super Premium Grade V2 Saffron — the finest threads, richer in crocin (colour) and safranal (aroma). An exceptional choice for discerning buyers. Priced per gram.', 'Kashmir, India', 'kesar,saffron,zafran,kashmiri saffron,premium', 'premium', ARRAY['saffron', 'kesar', 'spice'])
ON CONFLICT (slug) DO NOTHING;

-- PISTA
INSERT INTO products (name, slug, category, description, origin, search_aliases, featured, badge, tags) VALUES
  ('Pista – Jumbo Irani Roasted', 'pista-jumbo-irani-roasted', 'nuts', 'XL Jumbo Irani Pistachios — roasted to perfection with a satisfying crunch and naturally rich flavour. Generously sized for an indulgent snacking experience.', 'Iran', 'pista,pistachio,irani pista,roasted pista', true, 'premium', ARRAY['nuts', 'pista', 'pistachio', 'roasted'])
ON CONFLICT (slug) DO NOTHING;

-- WELLNESS
INSERT INTO products (name, slug, category, description, origin, search_aliases, badge, tags) VALUES
  ('Ashwagandha', 'ashwagandha', 'wellness', 'Pure Ashwagandha root powder — an ancient adaptogenic herb revered in Ayurvedic tradition. A wholesome botanical addition to warm milk, smoothies and daily wellness routines.', 'Rajasthan, India', 'ashwagandha,withania somnifera,aswagandha,adaptogen', null, ARRAY['wellness', 'herbs', 'ayurveda'])
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SEED: PRODUCT VARIANTS (Pricing)
-- KESAR: sold per gram — weight_grams represent actual grams
-- For Kesar: 1g=₹240, 2g=₹480, 5g=₹1200, 10g=₹2400 (V1)
-- We adapt the weight system to represent grams of saffron
-- Stored as: 100=1g, 200=2g, 250=2.5g, 500=5g, 1000=10g
-- ============================================================

-- Helper: insert all 5 weight variants for a product given its slug
-- Products WITH known prices:
DO $$
DECLARE
  p RECORD;
  prices JSONB;
BEGIN
  -- California Almonds: 1kg=₹1100
  SELECT id INTO p FROM products WHERE slug='california-almonds';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 110, true, 20),
    (p.id, 200, 220, true, 15),
    (p.id, 250, 275, true, 20),
    (p.id, 500, 550, true, 10),
    (p.id, 1000, 1100, true, 5)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Kashmiri Badaam: 1kg=₹1500
  SELECT id INTO p FROM products WHERE slug='kashmiri-badaam';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 150, true, 20),
    (p.id, 200, 300, true, 15),
    (p.id, 250, 375, true, 20),
    (p.id, 500, 750, true, 10),
    (p.id, 1000, 1500, true, 5)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Mamra: 1kg=₹2500
  SELECT id INTO p FROM products WHERE slug='mamra';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 250, true, 20),
    (p.id, 200, 500, true, 15),
    (p.id, 250, 625, true, 20),
    (p.id, 500, 1250, true, 10),
    (p.id, 1000, 2500, true, 5)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Anjeer Jumbo: 1kg=₹1450
  SELECT id INTO p FROM products WHERE slug='anjeer-jumbo';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 145, true, 20),
    (p.id, 200, 290, true, 15),
    (p.id, 250, 362.5, true, 20),
    (p.id, 500, 725, true, 10),
    (p.id, 1000, 1450, true, 5)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Anjeer Premium Afghani: 1kg=₹1650
  SELECT id INTO p FROM products WHERE slug='anjeer-premium-afghani';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 165, true, 20),
    (p.id, 200, 330, true, 15),
    (p.id, 250, 412.5, true, 20),
    (p.id, 500, 825, true, 10),
    (p.id, 1000, 1650, true, 5)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Kishmish Green: 1kg=₹560
  SELECT id INTO p FROM products WHERE slug='kishmish-green';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 56, true, 30),
    (p.id, 200, 112, true, 20),
    (p.id, 250, 140, true, 25),
    (p.id, 500, 280, true, 15),
    (p.id, 1000, 560, true, 8)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Kishmish Black: 1kg=₹700
  SELECT id INTO p FROM products WHERE slug='kishmish-black';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 70, true, 25),
    (p.id, 200, 140, true, 20),
    (p.id, 250, 175, true, 20),
    (p.id, 500, 350, true, 12),
    (p.id, 1000, 700, true, 6)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Munnaka: 1kg=₹1400
  SELECT id INTO p FROM products WHERE slug='munnaka';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 140, true, 20),
    (p.id, 200, 280, true, 15),
    (p.id, 250, 350, true, 18),
    (p.id, 500, 700, true, 10),
    (p.id, 1000, 1400, true, 5)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Shahi Akhrot: 1kg=₹1800
  SELECT id INTO p FROM products WHERE slug='shahi-akhrot';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 180, true, 20),
    (p.id, 200, 360, true, 15),
    (p.id, 250, 450, true, 18),
    (p.id, 500, 900, true, 10),
    (p.id, 1000, 1800, true, 5)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Cashew W-320: 1kg=₹1200
  SELECT id INTO p FROM products WHERE slug='cashew-w320';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 120, true, 25),
    (p.id, 200, 240, true, 20),
    (p.id, 250, 300, true, 20),
    (p.id, 500, 600, true, 12),
    (p.id, 1000, 1200, true, 6)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Cashew W-180: 1kg=₹1800
  SELECT id INTO p FROM products WHERE slug='cashew-w180';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 180, true, 15),
    (p.id, 200, 360, true, 12),
    (p.id, 250, 450, true, 15),
    (p.id, 500, 900, true, 8),
    (p.id, 1000, 1800, true, 4)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Cashew W-320 8 Tukda: 1kg=₹850
  SELECT id INTO p FROM products WHERE slug='cashew-w320-8-tukda';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 85, true, 25),
    (p.id, 200, 170, true, 20),
    (p.id, 250, 212.5, true, 20),
    (p.id, 500, 425, true, 12),
    (p.id, 1000, 850, true, 6)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Sea Buckthorn Berry: 1kg=₹3200
  SELECT id INTO p FROM products WHERE slug='sea-buckthorn-berry';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 320, true, 15),
    (p.id, 200, 640, true, 10),
    (p.id, 250, 800, true, 12),
    (p.id, 500, 1600, true, 6),
    (p.id, 1000, 3200, true, 3)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Khumani: 1kg=₹750
  SELECT id INTO p FROM products WHERE slug='khumani';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 75, true, 25),
    (p.id, 200, 150, true, 20),
    (p.id, 250, 187.5, true, 20),
    (p.id, 500, 375, true, 12),
    (p.id, 1000, 750, true, 6)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Blueberry: 1kg=₹2250
  SELECT id INTO p FROM products WHERE slug='blueberry';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 225, true, 20),
    (p.id, 200, 450, true, 15),
    (p.id, 250, 562.5, true, 15),
    (p.id, 500, 1125, true, 8),
    (p.id, 1000, 2250, true, 4)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Goji Berry: 1kg=₹2000
  SELECT id INTO p FROM products WHERE slug='goji-berry';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 200, true, 20),
    (p.id, 200, 400, true, 15),
    (p.id, 250, 500, true, 15),
    (p.id, 500, 1000, true, 8),
    (p.id, 1000, 2000, true, 4)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Cranberry: 1kg=₹1000
  SELECT id INTO p FROM products WHERE slug='cranberry';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 100, true, 25),
    (p.id, 200, 200, true, 20),
    (p.id, 250, 250, true, 20),
    (p.id, 500, 500, true, 12),
    (p.id, 1000, 1000, true, 6)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Flax Seeds: 1kg=₹400
  SELECT id INTO p FROM products WHERE slug='flax-seeds';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 40, true, 30),
    (p.id, 200, 80, true, 25),
    (p.id, 250, 100, true, 25),
    (p.id, 500, 200, true, 15),
    (p.id, 1000, 400, true, 8)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Sunflower Seeds: 1kg=₹450
  SELECT id INTO p FROM products WHERE slug='sunflower-seeds';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 45, true, 30),
    (p.id, 200, 90, true, 25),
    (p.id, 250, 112.5, true, 25),
    (p.id, 500, 225, true, 15),
    (p.id, 1000, 450, true, 8)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Pumpkin Seeds: 1kg=₹1125
  SELECT id INTO p FROM products WHERE slug='pumpkin-seeds';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 112.5, true, 25),
    (p.id, 200, 225, true, 20),
    (p.id, 250, 281.25, true, 20),
    (p.id, 500, 562.5, true, 12),
    (p.id, 1000, 1125, true, 6)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Chia Seeds: 1kg=₹600
  SELECT id INTO p FROM products WHERE slug='chia-seeds';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 60, true, 30),
    (p.id, 200, 120, true, 25),
    (p.id, 250, 150, true, 25),
    (p.id, 500, 300, true, 15),
    (p.id, 1000, 600, true, 8)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Basil Seeds: 1kg=₹700
  SELECT id INTO p FROM products WHERE slug='basil-seeds';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 70, true, 30),
    (p.id, 200, 140, true, 25),
    (p.id, 250, 175, true, 25),
    (p.id, 500, 350, true, 15),
    (p.id, 1000, 700, true, 8)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Kesar V1: ₹240/gram
  -- weight_grams here = actual grams of saffron (100=1g, 200=2g, etc.)
  SELECT id INTO p FROM products WHERE slug='kesar-v1';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 24, true, 30),  -- 1g = ₹24 (₹240/10 for proportional display)
    (p.id, 200, 48, true, 25),
    (p.id, 250, 60, true, 25),
    (p.id, 500, 120, true, 20),
    (p.id, 1000, 240, true, 10)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

  -- Kesar V2: ₹320/gram
  SELECT id INTO p FROM products WHERE slug='kesar-v2';
  INSERT INTO product_variants (product_id, weight_grams, price, auto_calculate, inventory_packs) VALUES
    (p.id, 100, 32, true, 30),
    (p.id, 200, 64, true, 25),
    (p.id, 250, 80, true, 25),
    (p.id, 500, 160, true, 20),
    (p.id, 1000, 320, true, 10)
  ON CONFLICT (product_id, weight_grams) DO NOTHING;

END $$;

-- Products WITHOUT configured retail prices (price_not_configured = true)
DO $$
DECLARE
  p RECORD;
  slugs TEXT[] := ARRAY[
    'pista-jumbo-irani-roasted',
    'walnuts-giri',
    'kashmiri-kagazi-walnut-sabut',
    'afghani-mamra',
    'ashwagandha',
    'badaam-roasted',
    'kaju-roasted',
    'makhana-5-sutta',
    'makhana-6-sutta-handpicked'
  ];
  s TEXT;
  weights INT[] := ARRAY[100, 200, 250, 500, 1000];
  w INT;
BEGIN
  FOREACH s IN ARRAY slugs LOOP
    SELECT id INTO p FROM products WHERE slug = s;
    IF p.id IS NOT NULL THEN
      FOREACH w IN ARRAY weights LOOP
        INSERT INTO product_variants (product_id, weight_grams, price, price_not_configured, auto_calculate, inventory_packs)
        VALUES (p.id, w, NULL, TRUE, TRUE, 0)
        ON CONFLICT (product_id, weight_grams) DO NOTHING;
      END LOOP;
    END IF;
  END LOOP;
END $$;

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_bestseller ON products(bestseller);
CREATE INDEX IF NOT EXISTS idx_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
