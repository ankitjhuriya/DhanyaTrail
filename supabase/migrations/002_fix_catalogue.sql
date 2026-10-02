-- ============================================================
-- DHANYA TRAIL — CATALOGUE FIXES (October 2026)
-- Run once in Supabase: Dashboard > SQL Editor > New Query > paste > Run
-- Safe to re-run. Everything runs in one transaction: if any step fails, nothing changes.
--
-- 1. Product photos (were missing → site showed emoji placeholders)
-- 2. Prices for 8 products that showed "Price not configured"
-- 3. Hide Makhana 5 Sutta (not stocked for now)
-- 4. Saffron: real 1 g packs, new names (was faked as "100 g" at ₹24)
-- 5. Bestseller flags (homepage "Customer Favourites")
-- 6. Contact details: correct email + full store address
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. PHOTOS
-- ------------------------------------------------------------
UPDATE products p
SET thumbnail = v.img, images = ARRAY[v.img]
FROM (VALUES
  ('california-almonds',           '/images/almonds.jpg'),
  ('kashmiri-badaam',              '/images/almonds.jpg'),
  ('mamra',                        '/images/almonds.jpg'),
  ('afghani-mamra',                '/images/almonds.jpg'),
  ('badaam-roasted',               '/images/almonds.jpg'),
  ('anjeer-jumbo',                 '/images/anjeer.jpg'),
  ('anjeer-premium-afghani',       '/images/anjeer.jpg'),
  ('kishmish-green',               '/images/kishmish-green.jpg'),
  ('kishmish-black',               '/images/kishmish-black.jpg'),
  ('munnaka',                      '/images/munnaka.jpg'),
  ('shahi-akhrot',                 '/images/walnuts.jpg'),
  ('walnuts-giri',                 '/images/walnuts.jpg'),
  ('kashmiri-kagazi-walnut-sabut', '/images/walnuts.jpg'),
  ('makhana-5-sutta',              '/images/makhana.jpg'),
  ('makhana-6-sutta-handpicked',   '/images/makhana.jpg'),
  ('cashew-w320',                  '/images/cashews.jpg'),
  ('cashew-w180',                  '/images/cashews.jpg'),
  ('cashew-w320-8-tukda',          '/images/cashews.jpg'),
  ('kaju-roasted',                 '/images/cashews.jpg'),
  ('sea-buckthorn-berry',          '/images/sea-buckthorn.jpg'),
  ('khumani',                      '/images/apricot.jpg'),
  ('blueberry',                    '/images/blueberry.jpg'),
  ('goji-berry',                   '/images/goji-berry.jpg'),
  ('cranberry',                    '/images/cranberry.jpg'),
  ('flax-seeds',                   '/images/flax-seeds.jpg'),
  ('sunflower-seeds',              '/images/sunflower-seeds.jpg'),
  ('pumpkin-seeds',                '/images/pumpkin-seeds.jpg'),
  ('chia-seeds',                   '/images/chia-seeds.jpg'),
  ('basil-seeds',                  '/images/basil-seeds.jpg'),
  ('kesar-v1',                     '/images/saffron.jpg'),
  ('kesar-v2',                     '/images/saffron.jpg'),
  ('pista-jumbo-irani-roasted',    '/images/pista.jpg'),
  ('ashwagandha',                  '/images/ashwagandha.jpg')
) AS v(slug, img)
WHERE p.slug = v.slug;

-- ------------------------------------------------------------
-- 2. PRICES (per-kg rates from Dhanya Trail, Oct 2026)
--    Old unpriced variants are replaced with priced pack sizes.
-- ------------------------------------------------------------
DELETE FROM product_variants
WHERE product_id IN (SELECT id FROM products WHERE slug IN (
  'pista-jumbo-irani-roasted', 'makhana-6-sutta-handpicked', 'walnuts-giri',
  'kashmiri-kagazi-walnut-sabut', 'afghani-mamra', 'badaam-roasted',
  'kaju-roasted', 'ashwagandha'
));

INSERT INTO product_variants (product_id, weight_grams, price, price_not_configured, auto_calculate, inventory_packs)
SELECT p.id, v.weight, v.price, FALSE, TRUE, 20
FROM products p
JOIN (VALUES
  -- Pista Jumbo Irani Roasted: ₹1,720/kg
  ('pista-jumbo-irani-roasted',    250,  430), ('pista-jumbo-irani-roasted',    500,  860), ('pista-jumbo-irani-roasted',    1000, 1720),
  -- Makhana 6 Sutta Handpicked: ₹1,800/kg (light product → smaller packs)
  ('makhana-6-sutta-handpicked',   100,  180), ('makhana-6-sutta-handpicked',   200,  360), ('makhana-6-sutta-handpicked',   500,  900),
  -- Walnut Giri: ₹1,550/kg
  ('walnuts-giri',                 250,  388), ('walnuts-giri',                 500,  775), ('walnuts-giri',                 1000, 1550),
  -- Kashmiri Kagazi Walnut Sabut: ₹750/kg
  ('kashmiri-kagazi-walnut-sabut', 250,  188), ('kashmiri-kagazi-walnut-sabut', 500,  375), ('kashmiri-kagazi-walnut-sabut', 1000, 750),
  -- Afghani Mamra: ₹2,500/kg
  ('afghani-mamra',                250,  625), ('afghani-mamra',                500, 1250), ('afghani-mamra',                1000, 2500),
  -- Badaam Roasted: ₹1,720/kg
  ('badaam-roasted',               250,  430), ('badaam-roasted',               500,  860), ('badaam-roasted',               1000, 1720),
  -- Kaju Roasted: ₹1,680/kg
  ('kaju-roasted',                 250,  420), ('kaju-roasted',                 500,  840), ('kaju-roasted',                 1000, 1680),
  -- Ashwagandha: ₹1,400/kg
  ('ashwagandha',                  100,  140), ('ashwagandha',                  250,  350), ('ashwagandha',                  500,  700)
) AS v(slug, weight, price) ON p.slug = v.slug;

-- ------------------------------------------------------------
-- 3. HIDE MAKHANA 5 SUTTA (not stocked for now — set active = TRUE to bring back)
-- ------------------------------------------------------------
UPDATE products SET active = FALSE WHERE slug = 'makhana-5-sutta';

-- ------------------------------------------------------------
-- 4. SAFFRON — real 1 g packs
--    Allow small gram weights for saffron, then replace the old fake "100 g = 1 g" rows.
-- ------------------------------------------------------------
ALTER TABLE product_variants DROP CONSTRAINT IF EXISTS product_variants_weight_grams_check;
ALTER TABLE product_variants ADD CONSTRAINT product_variants_weight_grams_check
  CHECK (weight_grams IN (1, 2, 5, 10, 100, 200, 250, 500, 1000));

UPDATE products SET
  name = 'Kashmiri Kesar — Classic',
  description = 'Pure Kashmiri saffron with long, deep-crimson threads and a delicate aroma. Adds golden colour and distinctive flavour to milk, sweets and biryani. Sold in 1 g packs.'
WHERE slug = 'kesar-v1';

UPDATE products SET
  name = 'Kashmiri Kesar — Royal',
  description = 'Our finest Kashmiri saffron. Hand-sorted threads, richer in crocin (colour) and safranal (aroma), for the deepest colour and fragrance. Sold in 1 g packs.'
WHERE slug = 'kesar-v2';

DELETE FROM product_variants
WHERE product_id IN (SELECT id FROM products WHERE slug IN ('kesar-v1', 'kesar-v2'));

INSERT INTO product_variants (product_id, weight_grams, price, price_not_configured, auto_calculate, inventory_packs)
SELECT p.id, 1, v.price, FALSE, FALSE, 30
FROM products p
JOIN (VALUES ('kesar-v1', 240), ('kesar-v2', 320)) AS v(slug, price) ON p.slug = v.slug;

-- ------------------------------------------------------------
-- 5. BESTSELLERS (homepage "Customer Favourites")
-- ------------------------------------------------------------
UPDATE products SET bestseller = slug IN (
  'anjeer-jumbo', 'munnaka', 'shahi-akhrot', 'makhana-6-sutta-handpicked',
  'cashew-w320', 'blueberry', 'cranberry', 'pumpkin-seeds', 'chia-seeds',
  'kesar-v1', 'pista-jumbo-irani-roasted'
);

-- ------------------------------------------------------------
-- 6. CONTACT DETAILS
-- ------------------------------------------------------------
INSERT INTO settings (key, value) VALUES
  ('email',   'dhanyatrail@gmail.com'),
  ('address', 'Shop No. 2, Plot No. 3, Gali No. 1, HTM Colony, Azad Nagar, Hisar, Haryana 125001')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

COMMIT;

-- ------------------------------------------------------------
-- CHECK (optional): run this after to confirm no product is missing a photo or price.
-- Expect zero rows.
-- ------------------------------------------------------------
-- SELECT p.slug, p.thumbnail, v.weight_grams, v.price
-- FROM products p LEFT JOIN product_variants v ON v.product_id = p.id
-- WHERE p.active AND (p.thumbnail IS NULL OR v.price IS NULL OR v.price_not_configured);
