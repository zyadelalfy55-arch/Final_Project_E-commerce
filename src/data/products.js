/**
 * LOCAL_PRODUCTS — used as fallback when the backend is offline.
 * When the backend is running, BestSeller.jsx fetches from /api/products instead.
 */
export const LOCAL_PRODUCTS = [
  {
    id: 1,
    name: 'Freestyle Crew Racer leather jacket',
    price: 595.00, originalPrice: 1000.00,
    rating: 5, reviews: 24, badge: 'HOT', discount: '-50%',
    category: 'Leather Jackets', sku: 'VC-1001', featured: true,
    breadcrumb: ['Home', 'Shop', 'Leather Jackets'],
    measurements: '42 × 28 × 4 "',
    description: 'A classic racer-style leather jacket with bold white stripe detailing. Made from premium genuine leather with a comfortable fitted cut perfect for everyday wear.',
    colors: [
      { name: 'Brown', swatch: '#8B6343', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80&auto=format&fit=crop' },
      { name: 'Black', swatch: '#1a1a1a', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80&auto=format&fit=crop' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542327897-4141b355e20e?w=600&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 2,
    name: '1996 Retro Nuptse Cashmere Jacket in Gray',
    price: 149.99, originalPrice: null,
    rating: 5, reviews: 18, badge: 'HOT', discount: null,
    category: 'Knitwear', sku: 'VC-1002',
    breadcrumb: ['Home', 'Shop', 'Knitwear'],
    measurements: '44 × 30 × 2 "',
    description: 'A soft cashmere-blend crew neck sweater with a relaxed retro fit. Inspired by 90s outdoor aesthetic, warm and breathable for all-day comfort.',
    colors: [
      { name: 'Gray',  swatch: '#9a9a9a', image: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e4a?w=600&q=80&auto=format&fit=crop' },
      { name: 'Cream', swatch: '#e8dfc8', image: 'https://images.unsplash.com/photo-1599719500956-d158a26ab3ee?w=600&q=80&auto=format&fit=crop' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e4a?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599719500956-d158a26ab3ee?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 3,
    name: 'Chilliwack black Bomber HUMANATURE',
    price: 1195.99, originalPrice: null,
    rating: 5, reviews: 31, badge: 'HOT', discount: null,
    category: 'Leather Jackets', sku: 'VC-1003',
    breadcrumb: ['Home', 'Shop', 'Leather Jackets'],
    measurements: '40 × 27 × 3 "',
    description: 'Premium black leather bomber jacket with clean minimal lines. The HUMANATURE collection redefines luxury streetwear with ethically sourced materials.',
    colors: [
      { name: 'Black', swatch: '#1a1a1a', image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80&auto=format&fit=crop' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 4,
    name: '96 Nuptse Dip Dye bomber Jacket',
    price: 400.99, originalPrice: null,
    rating: 5, reviews: 12, badge: 'HOT', discount: null,
    category: 'Bombers', sku: 'VC-1004',
    breadcrumb: ['Home', 'Shop', 'Bombers'],
    measurements: '42 × 28 × 3 "',
    description: 'A statement bomber with a unique dip-dye finish and structured silhouette. Vintage-inspired with a modern edge for bold everyday styling.',
    colors: [
      { name: 'Black/Brown', swatch: '#3b2a1a', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80&auto=format&fit=crop' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 5,
    name: 'Oversized real leather harrington jacket in black',
    price: 249.99, originalPrice: null,
    rating: 5, reviews: 9, badge: 'HOT', discount: null,
    category: 'Leather Jackets', sku: 'VC-1005',
    breadcrumb: ['Home', 'Shop', 'Leather Jackets'],
    measurements: '44 × 30 × 3 "',
    description: 'A classic harrington cut in real leather with an oversized contemporary fit. Timeless style meets modern comfort in premium full-grain leather.',
    colors: [
      { name: 'Black',      swatch: '#1a1a1a', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80&auto=format&fit=crop' },
      { name: 'Dark Brown', swatch: '#4a2e1a', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80&auto=format&fit=crop' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 6,
    name: "Men's Diamond Quilted Bomber Hoody",
    price: 199.95, originalPrice: null,
    rating: 5, reviews: 27, badge: 'HOT', discount: null,
    category: 'Bombers', sku: 'VC-1006',
    breadcrumb: ['Home', 'Shop', 'Bombers'],
    measurements: '42 × 28 × 2 "',
    description: 'A quilted bomber hoodie combining warmth with street-ready style. Diamond stitch pattern in olive green with a comfortable fleece lining.',
    colors: [
      { name: 'Olive', swatch: '#5a6340', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80&auto=format&fit=crop' },
      { name: 'Black', swatch: '#1a1a1a', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80&auto=format&fit=crop' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 7,
    name: 'Paradigm Chilliwack coat Black Label',
    price: 1495.00, originalPrice: null,
    rating: 5, reviews: 6, badge: 'HOT', discount: null,
    category: 'Coats', sku: 'VC-1007',
    breadcrumb: ['Home', 'Shop', 'Coats'],
    measurements: '48 × 32 × 3 "',
    description: 'The flagship Paradigm coat in Black Label edition. Double-breasted with a floor-grazing length and premium wool blend. The ultimate statement outerwear.',
    colors: [
      { name: 'Black', swatch: '#1a1a1a', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&q=80&auto=format&fit=crop' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 8,
    name: "Men's Torrentshell 3L Rain Jacket in Brown",
    price: 149.00, originalPrice: null,
    rating: 5, reviews: 33, badge: 'HOT', discount: null,
    category: 'Rain Jackets', sku: 'VC-1008',
    breadcrumb: ['Home', 'Shop', 'Rain Jackets'],
    measurements: '40 × 26 × 2 "',
    description: 'Lightweight 3-layer waterproof shell with taped seams and a relaxed fit. Perfect for unpredictable weather — packable, breathable, and built to last.',
    colors: [
      { name: 'Brown',        swatch: '#7a5c3a', image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80&auto=format&fit=crop' },
      { name: 'Forest Green', swatch: '#2d4a2d', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80&auto=format&fit=crop' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&q=80&auto=format&fit=crop',
    ],
  },
]

/**
 * Find a local product by id (supports both numeric and string)
 */
export const findLocalProduct = (id) =>
  LOCAL_PRODUCTS.find(p => String(p.id) === String(id)) || null
