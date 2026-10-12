-- ============================================================
-- DHANYA TRAIL — SHORTER PRODUCT NAMES (October 2026)
-- Run once in Supabase: Dashboard > SQL Editor > New Query > paste > Run
-- Safe to re-run. Only product names change; URLs (slugs), prices and photos stay the same.
-- ============================================================

BEGIN;

UPDATE products p
SET name = v.name
FROM (VALUES
  ('california-almonds',           'California Badam'),
  ('kashmiri-badaam',              'Kashmiri Badam'),
  ('mamra',                        'Mamra Badam'),
  ('afghani-mamra',                'Afghani Mamra'),
  ('badaam-roasted',               'Roasted Badam'),
  ('anjeer-jumbo',                 'Jumbo Anjeer'),
  ('anjeer-premium-afghani',       'Afghani Anjeer'),
  ('kishmish-green',               'Green Kishmish'),
  ('kishmish-black',               'Black Kishmish'),
  ('munnaka',                      'Munakka'),
  ('shahi-akhrot',                 'Shahi Akhrot'),
  ('walnuts-giri',                 'Akhrot Giri'),
  ('kashmiri-kagazi-walnut-sabut', 'Kagazi Akhrot'),
  ('makhana-6-sutta-handpicked',   'Makhana 6 Sutta'),
  ('cashew-w320',                  'Kaju W320'),
  ('cashew-w180',                  'Jumbo Kaju W180'),
  ('cashew-w320-8-tukda',          'Kaju Tukda'),
  ('kaju-roasted',                 'Roasted Kaju'),
  ('sea-buckthorn-berry',          'Sea Buckthorn'),
  ('basil-seeds',                  'Sabja Seeds'),
  ('kesar-v1',                     'Kesar Classic'),
  ('kesar-v2',                     'Kesar Royal'),
  ('pista-jumbo-irani-roasted',    'Irani Pista')
) AS v(slug, name)
WHERE p.slug = v.slug;

COMMIT;

-- CHECK (optional): should list the new names
-- SELECT slug, name FROM products WHERE active ORDER BY created_at;
