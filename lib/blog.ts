// Blog posts for /blog. Each post is plain data so it is easy to edit or add to.
// Inline text supports **bold**, [link text](/path) and [^n] to cite source n of that post.

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; caption?: string; head: string[]; rows: string[][] }
  | { type: 'note'; text: string }

export type BlogSource = { text: string; url: string }

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string // YYYY-MM-DD
  emoji: string
  tag: string
  body: BlogBlock[]
  sources: BlogSource[]
  related?: { href: string; label: string }[]
}

const USDA = (id: number, name: string): BlogSource => ({
  text: `USDA FoodData Central, SR Legacy: ${name} (FDC ID ${id}), values per 100 g`,
  url: `https://fdc.nal.usda.gov/food-details/${id}/nutrients`,
})

const FSSAI_ALMOND: BlogSource = {
  text: 'FSSAI almond kernel standard: Food Safety and Standards (Food Products Standards and Food Additives) Third Amendment Regulations, 2020, as reported by FnB News, August 2020',
  url: 'https://fssai.gov.in/upload/media/FSSAI_News_Gazette_FNB_25_08_2020.pdf',
}

const FSSAI_ALMOND_GAIN: BlogSource = {
  text: 'USDA Foreign Agricultural Service, GAIN report: Almond Kernel Standards Published in the Indian Gazette, August 2020',
  url: 'https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Almond+Kernel+Standards+and+Other+Various+Food+Products+Published+in+the+Indian+Gazette_New+Delhi_India_08-19-2020',
}

const NIN_PLATE: BlogSource = {
  text: 'ICMR-National Institute of Nutrition, Policy Brief: My Plate for the Day (2024)',
  url: 'https://www.nin.res.in/brief/Policy%20Brief%20My%20Plate%20J18%2024.pdf',
}

const NIH_VIT_E: BlogSource = {
  text: 'US National Institutes of Health, Office of Dietary Supplements: Vitamin E fact sheet',
  url: 'https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessional/',
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-much-oil-is-in-a-good-badam',
    title: 'How much oil is in a good badam?',
    description:
      'About half of a good almond is oil, and most of it is the healthy, unsaturated kind. Here is what the numbers say, what India\'s food standard requires, and how to check your almonds at home.',
    date: '2026-10-17',
    emoji: '🌰',
    tag: 'Almonds',
    body: [
      { type: 'p', text: 'Ask anyone in an Indian household how to judge badam and you will hear about the oil: rub it, break it, see if it feels rich. There is real science behind that habit. The oil is where most of an almond\'s goodness sits, and it is also the first thing to suffer when almonds are old or badly stored.' },
      { type: 'h2', text: 'Half of a good almond is oil' },
      { type: 'p', text: 'According to the US Department of Agriculture\'s food database, **100 g of almonds contains about 50 g of fat**.[^1] Most of it is the kind your heart prefers:' },
      { type: 'table', caption: 'Fat in 100 g of almonds', head: ['Type of fat', 'Amount', 'Share'], rows: [
        ['Monounsaturated (the same family as olive oil)', '31.6 g', '63%'],
        ['Polyunsaturated', '12.3 g', '25%'],
        ['Saturated', '3.8 g', '8%'],
      ] },
      { type: 'p', text: 'So **close to 90% of the fat in almonds is unsaturated**. That is very different from the fat in fried namkeen or biscuits.' },
      { type: 'h2', text: 'What India\'s food standard says' },
      { type: 'p', text: 'Since July 2021, almond kernels sold in India have had to meet an FSSAI standard. It sets three limits:[^2]' },
      { type: 'ul', items: [
        '**Oil content: at least 45%.** Poor-grade kernels with little oil do not qualify.',
        '**Moisture: no more than 6%.** Damp almonds go soft and spoil faster.',
        '**Acidity of the oil: no more than 1.25%** (as oleic acid). This measures how far the oil has started to break down, which is what happens in old or badly stored almonds.',
      ] },
      { type: 'p', text: 'The same standard also lists defects such as rancid kernels, gummy or brown spots, and chipped or scratched kernels.[^3]' },
      { type: 'h2', text: 'Why the oil matters to you' },
      { type: 'p', text: 'Almond oil carries vitamin E, a fat-soluble vitamin. 100 g of almonds has **25.6 mg of vitamin E**,[^1] so a 35 g handful gives you about 9 mg. Adults need about 15 mg a day,[^4] so one handful covers roughly 60% of it.' },
      { type: 'p', text: 'When almonds are stored warm, damp or open to the air for too long, that oil oxidises. The almond tastes flat, bitter or a bit like old paint. That is rancidity, and it means the good fats have started to turn.' },
      { type: 'h2', text: 'How to check your almonds at home' },
      { type: 'ul', items: [
        '**Snap test:** a fresh almond breaks with a clean snap. If it bends or feels chewy, it has absorbed moisture.',
        '**Smell:** fresh almonds smell sweet and nutty. A sour, sharp or paint-like smell means the oil has gone rancid.',
        '**Taste:** good almonds taste mild and sweet. If one is strongly bitter, spit it out. Bitter almonds and apricot kernels contain amygdalin, which releases cyanide when digested.[^5]',
        '**Look:** even colour, no dark or gummy spots, no tiny holes or powder in the pack.',
      ] },
      { type: 'h2', text: 'Keep them fresh' },
      { type: 'p', text: 'Store almonds in an airtight jar, away from the stove and sunlight. In the Haryana summer, or if you buy more than a month\'s supply, keep them in the fridge. Buy from a shop where stock moves quickly, and do not be shy about asking to taste one first. At our [Hisar store](/store) you are always welcome to.' },
    ],
    sources: [
      USDA(170567, 'Nuts, almonds'),
      FSSAI_ALMOND,
      FSSAI_ALMOND_GAIN,
      NIH_VIT_E,
      {
        text: 'Food Standards Scotland: Update on advice on the sale of apricot kernels and bitter almonds (2017)',
        url: 'https://www.foodstandards.gov.scot/downloads/FSS-ENF-17-019_-_Update_on_advice_to_LAs_on_sale_of_apricot_kernels_and_bitter_almonds_-_27_September_2017.pdf',
      },
    ],
    related: [
      { href: '/products/california-almonds', label: 'California Almonds' },
      { href: '/products/mamra', label: 'Mamra Almonds' },
      { href: '/products/kashmiri-badaam', label: 'Kashmiri Badaam' },
    ],
  },

  {
    slug: 'protein-is-not-the-whole-story',
    title: 'Protein is not the whole story: what your protein snack may be missing',
    description:
      'Most Indians now look for protein when they pick a snack. But protein is one nutrient. Here is what a protein-only snack can miss, and how dry fruits, nuts and seeds fill the gap.',
    date: '2026-10-17',
    emoji: '💪',
    tag: 'Healthy snacking',
    body: [
      { type: 'p', text: 'Walk down any snack aisle and you will see "high protein" on chips, cookies, bars and even ice cream. Shoppers have noticed. In a 2026 survey of more than 6,000 people by the snack brand Farmley, **86% said protein matters when they choose a snack**, and about a third said they would pay more for it.[^1]' },
      { type: 'p', text: 'Protein is important. But it is one nutrient out of dozens, and a snack built only around it can leave the rest of your plate short.' },
      { type: 'h2', text: 'What India\'s nutrition experts recommend' },
      { type: 'p', text: 'The ICMR-National Institute of Nutrition\'s 2024 Dietary Guidelines for Indians advise getting protein from **real food rather than protein powders**. They also recommend eating a variety of nuts, oilseeds, millets and pulses, and they estimate that **56.4% of India\'s total disease burden is linked to unhealthy diets**.[^2]' },
      { type: 'h2', text: 'The nutrients most of us are short on' },
      { type: 'p', text: 'A 2024 study in The Lancet Global Health estimated nutrient intake for almost the whole world\'s population. It found that **about two in three people do not get enough vitamin E**, and similar shares fall short on calcium and iron. In India, intake of riboflavin (vitamin B2), folate and vitamins B6 and B12 was especially low.[^3]' },
      { type: 'p', text: 'These are exactly the nutrients a protein bar or protein chips are not designed to give you. Many such products also carry little fibre, and some add sugar or refined oil to make them taste good.' },
      { type: 'h2', text: 'What a handful of dry fruits brings' },
      { type: 'p', text: 'Nuts and seeds give you protein too, but they bring a lot more with it. Here is what a **35 g handful** (the daily amount ICMR-NIN suggests for nuts and seeds) of each contains:' },
      { type: 'table', caption: 'Per 35 g, calculated from USDA data[^4]', head: ['Snack', 'Protein', 'Fibre', 'Also rich in'], rows: [
        ['Almonds', '7.4 g', '4.4 g', 'Vitamin E (9 mg), riboflavin, magnesium'],
        ['Pumpkin seeds', '10.6 g', '2.1 g', 'Magnesium (207 mg), zinc, iron'],
        ['Chia seeds', '5.8 g', '12 g', 'Omega-3 ALA (6.2 g), calcium'],
        ['Walnuts', '5.3 g', '2.3 g', 'Omega-3 ALA (3.2 g)'],
        ['Cashews', '6.4 g', '1.2 g', 'Magnesium, zinc, iron'],
      ] },
      { type: 'p', text: 'Almonds stand out for vitamin E and riboflavin, two of the nutrients the Lancet study flagged. Pumpkin seeds are one of the richest everyday sources of magnesium. Chia and walnuts are among the few plant foods with meaningful omega-3.' },
      { type: 'h2', text: 'Build a better snack' },
      { type: 'ul', items: [
        '**Mix, don\'t pick one.** 15 g almonds, 10 g walnuts and 10 g pumpkin seeds make a 35 g handful that covers far more than protein.',
        '**Add a seed to what you already eat.** A spoon of chia or flax in curd, or pumpkin seeds on a salad.',
        '**Read the label on "protein" snacks.** Check the sugar, the oil and how far down the ingredient list the protein source actually is.',
        '**Keep it simple.** Unsalted, unroasted or lightly roasted nuts and seeds, with nothing added, are the most honest protein snack there is.',
      ] },
    ],
    sources: [
      { text: 'Outlook Business: 86% of Indians prioritise protein while choosing snacks (Farmley Healthy Snacking Report 2026). Survey by a snack brand.', url: 'https://www.outlookbusiness.com/news/86-indians-prioritise-protein-while-choosing-snacks-report' },
      { text: 'South First: ICMR releases Dietary Guidelines for Indians after 13 years (ICMR-NIN, May 2024)', url: 'https://thesouthfirst.com/news/icmr-releases-dietary-guidelines-for-indians-after-13-years-says-no-to-protein-supplements' },
      { text: 'Passarelli S. et al. Global estimation of dietary micronutrient inadequacies: a modelling analysis. The Lancet Global Health, 2024', url: 'https://doi.org/10.1016/S2214-109X(24)00276-6' },
      { text: 'USDA FoodData Central, SR Legacy: almonds (170567), pumpkin seed kernels (170556), chia seeds (170554), walnuts (170187), raw cashews (170162)', url: 'https://fdc.nal.usda.gov/food-details/170556/nutrients' },
    ],
    related: [
      { href: '/products/pumpkin-seeds', label: 'Pumpkin Seeds' },
      { href: '/products/chia-seeds', label: 'Chia Seeds' },
      { href: '/products/walnuts-giri', label: 'Walnut Giri' },
    ],
  },

  {
    slug: 'how-many-dry-fruits-a-day',
    title: 'How many dry fruits should you eat in a day?',
    description:
      'ICMR-NIN suggests 35 g of nuts and seeds a day. Here is what that looks like in almonds and walnuts, how to split it across the day, and what the research says.',
    date: '2026-10-17',
    emoji: '🥜',
    tag: 'Daily nutrition',
    body: [
      { type: 'p', text: 'Dry fruits are good for you, but they are also rich. Too few and you miss out; too many and the calories add up quickly. The good news is that India\'s own nutrition institute has put a number on it.' },
      { type: 'h2', text: 'The answer: about 35 g of nuts and seeds a day' },
      { type: 'p', text: 'ICMR-National Institute of Nutrition\'s "My Plate for the Day" sets out a balanced 2,000-calorie day for an adult. It includes **35 g of nuts and seeds**, which supplies about 181 calories, 6 g of protein and 15 g of fat.[^1]' },
      { type: 'h2', text: 'What 35 g looks like' },
      { type: 'ul', items: [
        '**Almonds:** about 28 to 30 almonds.',
        '**Walnuts:** about 15 to 17 halves.',
        '**A mix:** 12 almonds, 5 walnut halves and a tablespoon of pumpkin seeds.',
      ] },
      { type: 'p', text: 'A simple rule of thumb: one small handful that fits in your cupped palm.' },
      { type: 'h2', text: 'Split it across the day' },
      { type: 'ul', items: [
        '**Morning:** soaked almonds and a walnut or two with breakfast.',
        '**Afternoon:** a few cashews or pistachios instead of biscuits with chai.',
        '**Anytime:** a spoon of chia, flax or pumpkin seeds stirred into curd, oats or a salad.',
      ] },
      { type: 'h2', text: 'Swap, don\'t add' },
      { type: 'p', text: 'Almonds have about **579 calories per 100 g**.[^2] Nuts work best when they **replace** a less healthy snack, not when they are eaten on top of everything else.' },
      { type: 'h2', text: 'What about raisins, anjeer and apricots?' },
      { type: 'p', text: 'Dried fruits like kishmish, munakka, anjeer and khumani are fruit with the water taken out, so their natural sugar is concentrated. They bring fibre, iron and potassium, but keep portions small: a tablespoon of raisins or two to three anjeer. If you are managing blood sugar, check with your doctor.' },
      { type: 'h2', text: 'What the research says' },
      { type: 'p', text: 'A randomised trial in Mumbai followed 219 young people aged 16 to 25 who were at risk of prediabetes. About half ate **56 g of almonds a day for three months**. Compared with the other half, who ate a savoury wheat-and-chickpea snack, the almond group saw small but significant improvements in HbA1c, total cholesterol and LDL ("bad") cholesterol.[^3] The study was funded by the Almond Board of California.' },
      { type: 'h2', text: 'Soaked or raw?' },
      { type: 'p', text: 'Both are fine. Soaking overnight softens almonds and many people find them easier to chew and digest. If you prefer them crunchy, eat them raw. The most important thing is that you eat them regularly.' },
      { type: 'note', text: 'This article is general information, not medical advice. If you have a nut allergy, kidney disease or a specific health condition, ask your doctor how much is right for you.' },
    ],
    sources: [
      NIN_PLATE,
      USDA(170567, 'Nuts, almonds'),
      { text: 'Effect of Almond Consumption on Metabolic Risk Factors: A Randomized Controlled Trial in Adolescents and Young Adults. Frontiers in Nutrition, 2021', url: 'https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2021.668622/full' },
    ],
    related: [
      { href: '/products/california-almonds', label: 'California Almonds' },
      { href: '/products/walnuts-giri', label: 'Walnut Giri' },
      { href: '/seeds', label: 'Seeds' },
    ],
  },

  {
    slug: 'fresh-vs-stale-dry-fruits-checklist',
    title: 'Fresh or stale? A buyer\'s checklist for dry fruits',
    description:
      'How to tell fresh almonds, cashews, walnuts, raisins, anjeer and makhana from stale ones, using your eyes, nose and fingers. Plus how to store them at home.',
    date: '2026-10-17',
    emoji: '🔍',
    tag: 'Buying guide',
    body: [
      { type: 'p', text: 'Dry fruits keep well, but not forever. Nuts are rich in oil, and oil goes stale. Dried fruits hold sugar and some moisture, which can ferment or attract insects. A stale pack is not just less tasty; it has lost some of the goodness you paid for.' },
      { type: 'p', text: 'India\'s food standard for almond kernels lists the faults inspectors look for: rancid kernels, gummy or brown spots, insect damage, too much moisture and too little oil.[^1] You can check most of these yourself.' },
      { type: 'h2', text: 'Almonds' },
      { type: 'ul', items: [
        'Should **snap cleanly**, not bend.',
        'Sweet, nutty smell. Reject any sour or paint-like smell.',
        'No tiny holes, powder or webbing in the pack (signs of insects).',
      ] },
      { type: 'h2', text: 'Cashews (kaju)' },
      { type: 'ul', items: [
        'Creamy white to light ivory. Yellowish or dark patches mean age or poor storage.',
        'Firm and crisp, with a mild, buttery smell.',
      ] },
      { type: 'h2', text: 'Walnuts (akhrot)' },
      { type: 'ul', items: [
        'The lighter the kernel, the fresher it usually is. Very dark kernels are often old.',
        'Walnuts have the most delicate oil of all the common nuts and go rancid fastest. Any bitter or sharp taste means they are past their best.',
      ] },
      { type: 'h2', text: 'Raisins, kishmish and munakka' },
      { type: 'ul', items: [
        'Soft and plump, not rock hard.',
        'Separate easily. A wet, sticky clump or a sour, alcoholic smell means they have started to ferment.',
      ] },
      { type: 'h2', text: 'Anjeer (figs) and khumani (apricots)' },
      { type: 'ul', items: [
        'Soft and slightly chewy. A fine white powder on figs is usually natural sugar coming to the surface, which is harmless.',
        'Fuzzy patches, green or black spots, or a musty smell are mould. Throw the whole pack away.',
      ] },
      { type: 'h2', text: 'Makhana' },
      { type: 'ul', items: [
        'Should crunch when you bite. If it is chewy or soft, it has absorbed moisture.',
        'Clean white with no dark specks.',
      ] },
      { type: 'h2', text: 'Before you buy' },
      { type: 'ul', items: [
        'Check the **packing date**, not just the expiry date.',
        'Buy from a shop where stock moves quickly.',
        'Ask to see or taste a piece. A good seller will never mind.',
      ] },
      { type: 'h2', text: 'Storing at home' },
      { type: 'ul', items: [
        'Use an **airtight** glass or steel jar.',
        'Keep it away from the stove, sunlight and the steam of the kitchen.',
        'In summer, or for stock you will not finish in a month, keep nuts in the fridge. Let them come to room temperature before opening the jar, so moisture does not condense inside.',
      ] },
    ],
    sources: [FSSAI_ALMOND_GAIN],
    related: [
      { href: '/dry-fruits', label: 'Dry Fruits' },
      { href: '/nuts', label: 'Nuts' },
      { href: '/makhana', label: 'Makhana' },
    ],
  },

  {
    slug: 'mamra-vs-california-almonds',
    title: 'Mamra vs California almonds: what is actually different?',
    description:
      'Mamra almonds can cost several times more than California almonds. Here is how they differ in origin, shape and taste, which claims hold up, and which one to buy.',
    date: '2026-10-17',
    emoji: '⚖️',
    tag: 'Almonds',
    body: [
      { type: 'p', text: 'Walk into any dry fruits shop and you will find two kinds of badam at very different prices. Here is what you are actually paying for.' },
      { type: 'h2', text: 'California almonds' },
      { type: 'p', text: 'These are the almonds most Indians eat. India has been the **largest export market for California almonds** since 2021-22.[^1] They are large, flat and uniform, with a smooth light-brown skin and a mild, sweet taste. California\'s big orchards keep them affordable and widely available.' },
      { type: 'h2', text: 'Mamra almonds' },
      { type: 'p', text: 'Mamra is a traditional variety grown mainly in **Iran and Afghanistan**, with a little in Kashmir. The kernels are smaller, curved or boat-shaped, with a darker, rougher skin. They have a firmer crunch and a richer taste. Yields are low and supply is limited, which is why Mamra costs so much more.' },
      { type: 'table', caption: 'At a glance', head: ['', 'California', 'Mamra'], rows: [
        ['Origin', 'USA (California)', 'Mainly Iran and Afghanistan'],
        ['Shape', 'Large, flat, uniform', 'Small, curved, uneven'],
        ['Skin', 'Smooth, light brown', 'Rough, darker'],
        ['Taste', 'Mild and sweet', 'Richer, with a firm crunch'],
        ['Price', 'Everyday', 'Premium'],
      ] },
      { type: 'h2', text: 'The oil claim, and why we do not repeat it' },
      { type: 'p', text: 'You will often read online that Mamra contains around 50% oil and California almonds only 25 to 30%. We could not find any independent lab study behind those figures.' },
      { type: 'p', text: 'What the official data does say: USDA analysis puts almonds in general at about **50% fat**,[^2] and India\'s food standard requires **every almond kernel sold here to contain at least 45% oil**.[^3] A California almond with only 25 to 30% oil would not meet that standard. So treat the "double the oil" claim with caution, whoever makes it.' },
      { type: 'h2', text: 'Which should you buy?' },
      { type: 'ul', items: [
        '**For daily eating, soaking and cooking:** California almonds give you excellent nutrition at a sensible price.',
        '**For taste, tradition or gifting:** Mamra is the premium choice, with a crunch and richness many families grew up with.',
        '**Either way:** check freshness. A fresh California almond is better than a stale Mamra.',
      ] },
      { type: 'p', text: 'Not sure? Come to our [Hisar store](/store) and taste both side by side.' },
    ],
    sources: [
      { text: 'Almond Board of California: India Market Profile, September 2024', url: 'https://almonds.com/sites/default/files/2024-09/2024GTRA0009_%20Market%20Profile_India_Sep2024.pdf' },
      USDA(170567, 'Nuts, almonds'),
      FSSAI_ALMOND,
    ],
    related: [
      { href: '/products/california-almonds', label: 'California Almonds' },
      { href: '/products/mamra', label: 'Mamra Almonds' },
      { href: '/products/afghani-mamra', label: 'Afghani Mamra' },
    ],
  },
]

export function getPost(slug: string) {
  return BLOG_POSTS.find(p => p.slug === slug)
}

export function readMinutes(post: BlogPost) {
  const text = post.body
    .map(b => ('text' in b ? b.text : 'items' in b ? b.items.join(' ') : b.rows.flat().join(' ')))
    .join(' ')
  return Math.max(2, Math.round(text.split(/\s+/).length / 200))
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00+05:30`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' })
}
