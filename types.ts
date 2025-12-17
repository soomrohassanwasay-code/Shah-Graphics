export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface SiteConfig {
  heroHeadline: string;
  heroSubheadline: string;
  contactEmail: string;
  instagramHandle: string;
  whatsappNumber: string;
}

export interface SiteContent {
  projects: Project[];
  categories: Category[];
  siteConfig: SiteConfig;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'thumbnails', name: 'Thumbnails' },
  { id: 'logos', name: 'Logos' },
  { id: 'social', name: 'Social Media Posts' },
  { id: 'posters', name: 'Posters' },
  { id: 'banners', name: 'Banners' },
];

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  heroHeadline: "We Craft *Digital Experiences* That Matter.",
  heroSubheadline: "Shah Graphics is a premium design studio specializing in brand identity, social media aesthetics, and high-impact visual communication.",
  contactEmail: "contact@shahgraphics.com",
  instagramHandle: "@ShahGraphics",
  whatsappNumber: "+1 234 567 890"
};

// These default projects mimic the images provided. 
// Ideally, replace the imageUrls with your actual Supabase Storage URLs via the Admin Dashboard.
export const DEFAULT_PROJECTS: Project[] = [
  // --- THUMBNAILS ---
  {
    id: 't1',
    title: 'Fun Fair Vlog',
    category: 'Thumbnails',
    description: 'High-energy vlog thumbnail featuring bright colors and expressive emotions.',
    imageUrl: 'https://placehold.co/1280x720/18181b/ffffff?text=Fun+Fair+Vlog+Thumbnail',
    date: '2023-10-15'
  },
  {
    id: 't2',
    title: 'Vaping vs Smoking',
    category: 'Thumbnails',
    description: 'Comparative analysis thumbnail design with strong contrast.',
    imageUrl: 'https://placehold.co/1280x720/18181b/ffffff?text=Vaping+vs+Smoking',
    date: '2023-11-02'
  },
  {
    id: 't3',
    title: 'The Real Myth',
    category: 'Thumbnails',
    description: 'Dark, mysterious thumbnail design inspired by Squid Game aesthetics.',
    imageUrl: 'https://placehold.co/1280x720/18181b/ffffff?text=The+Real+Myth',
    date: '2023-11-10'
  },
  {
    id: 't4',
    title: 'Truth Uncovered',
    category: 'Thumbnails',
    description: 'Dramatic commentary thumbnail with glowing eyes effect.',
    imageUrl: 'https://placehold.co/1280x720/18181b/ffffff?text=Does+He+Lied?',
    date: '2023-11-20'
  },
  {
    id: 't5',
    title: 'Financial Secrets',
    category: 'Thumbnails',
    description: 'Finance niche thumbnail focusing on credit cards and wealth.',
    imageUrl: 'https://placehold.co/1280x720/18181b/ffffff?text=Financial+Secrets',
    date: '2023-12-05'
  },
  {
    id: 't6',
    title: 'Million Dollar Lifestyle',
    category: 'Thumbnails',
    description: 'MrBeast-style challenge thumbnail with high saturation and luxury elements.',
    imageUrl: 'https://placehold.co/1280x720/18181b/ffffff?text=Million+Dollar+Lifestyle',
    date: '2023-12-15'
  },
  {
    id: 't7',
    title: 'Antarctica Mysteries',
    category: 'Thumbnails',
    description: 'Documentary style thumbnail featuring frozen landscapes and pyramids.',
    imageUrl: 'https://placehold.co/1280x720/18181b/ffffff?text=Antarctica+Mysteries',
    date: '2024-01-05'
  },
  {
    id: 't8',
    title: 'Athlete Secrets',
    category: 'Thumbnails',
    description: 'Sports commentary thumbnail featuring Cristiano Ronaldo.',
    imageUrl: 'https://placehold.co/1280x720/18181b/ffffff?text=Ronaldo+Secret',
    date: '2024-01-12'
  },
  {
    id: 't9',
    title: 'Rich vs Poor',
    category: 'Thumbnails',
    description: 'Comparison style thumbnail utilizing face aging and conceptual contrast.',
    imageUrl: 'https://placehold.co/1280x720/18181b/ffffff?text=Rich+Vs+Poor',
    date: '2024-01-20'
  },
  {
    id: 't10',
    title: 'Pakistan to Japan',
    category: 'Thumbnails',
    description: 'Travel vlog thumbnail showcasing cultural transition and landmarks.',
    imageUrl: 'https://placehold.co/1280x720/18181b/ffffff?text=Pakistan+To+Japan',
    date: '2024-02-01'
  },
  {
    id: 't11',
    title: 'Setup Makeover',
    category: 'Thumbnails',
    description: 'Before and After tech setup transformation thumbnail.',
    imageUrl: 'https://placehold.co/1280x720/18181b/ffffff?text=Setup+Makeover',
    date: '2024-02-14'
  },

  // --- LOGOS ---
  {
    id: 'l1',
    title: 'Amber Almonds',
    category: 'Logos',
    description: 'Organic and natural logo design for a premium dry fruit brand.',
    imageUrl: 'https://placehold.co/800x800/18181b/ffffff?text=Amber+Almonds',
    date: '2023-09-10'
  },
  {
    id: 'l2',
    title: 'Dyenix Fabrics',
    category: 'Logos',
    description: 'Modern, geometric logo for a textile and fabric company.',
    imageUrl: 'https://placehold.co/800x800/18181b/ffffff?text=Dyenix+Fabrics',
    date: '2023-09-25'
  },
  {
    id: 'l3',
    title: 'Elect Power',
    category: 'Logos',
    description: 'Industrial symbol logo combining gear mechanics and electrical energy.',
    imageUrl: 'https://placehold.co/800x800/18181b/ffffff?text=Elect+Power',
    date: '2023-10-05'
  },
  {
    id: 'l4',
    title: 'Cash Bridge',
    category: 'Logos',
    description: 'Minimalist typography wordmark for a financial or design agency.',
    imageUrl: 'https://placehold.co/800x800/18181b/ffffff?text=Cash+Bridge',
    date: '2023-10-20'
  },

  // --- POSTERS ---
  {
    id: 'p1',
    title: 'Porsche 911 GT3 RS',
    category: 'Posters',
    description: 'Automotive poster layout featuring the legendary 911 GT3 RS in a clean studio setting.',
    imageUrl: 'https://placehold.co/800x1000/18181b/ffffff?text=Porsche+911',
    date: '2023-12-10'
  },
  {
    id: 'p2',
    title: 'Anime Character Art',
    category: 'Posters',
    description: 'Vibrant vector illustration character design.',
    imageUrl: 'https://placehold.co/800x1000/18181b/ffffff?text=Anime+Art',
    date: '2023-12-25'
  },
  {
    id: 'p3',
    title: 'Ford Mustang Legend',
    category: 'Posters',
    description: 'Vintage style automotive poster celebrating the 1964 Mustang.',
    imageUrl: 'https://placehold.co/800x1000/18181b/ffffff?text=Ford+Mustang',
    date: '2024-01-15'
  },
  {
    id: 'p4',
    title: 'Tokyo Typography',
    category: 'Posters',
    description: 'Bold typography poster featuring Japanese street aesthetics and color palettes.',
    imageUrl: 'https://placehold.co/800x1000/18181b/ffffff?text=Tokyo',
    date: '2024-02-10'
  },

  // --- SOCIAL MEDIA ---
  {
    id: 's1',
    title: 'Delicious Burger Promo',
    category: 'Social Media Posts',
    description: 'Appetizing food promotion design with 50% off offer.',
    imageUrl: 'https://placehold.co/1080x1080/18181b/ffffff?text=Delicious+Burger',
    date: '2023-11-15'
  },
  {
    id: 's2',
    title: 'Grilled Burger Special',
    category: 'Social Media Posts',
    description: 'Dark theme food social media post highlighting texture and taste.',
    imageUrl: 'https://placehold.co/1080x1080/18181b/ffffff?text=Grilled+Burger',
    date: '2023-11-28'
  }
];