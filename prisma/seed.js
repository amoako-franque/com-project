const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const products = [
	// Electronics
	{
		name: "iPhone 15 Pro Max",
		price: 1199.99,
		stock: 25,
		description:
			"Latest Apple smartphone with titanium design and advanced camera system",
	},
	{
		name: "Samsung Galaxy S24 Ultra",
		price: 1299.99,
		stock: 30,
		description: "Premium Android smartphone with S Pen and AI features",
	},
	{
		name: "MacBook Air M3",
		price: 1099.99,
		stock: 15,
		description: "Ultra-thin laptop powered by Apple's M3 chip",
	},
	{
		name: "Dell XPS 13",
		price: 999.99,
		stock: 20,
		description: "Premium ultrabook with InfinityEdge display",
	},
	{
		name: "Sony WH-1000XM5",
		price: 399.99,
		stock: 50,
		description: "Industry-leading noise canceling wireless headphones",
	},
	{
		name: 'iPad Pro 12.9"',
		price: 1099.99,
		stock: 18,
		description: "Professional tablet with M2 chip and Liquid Retina display",
	},
	{
		name: "Nintendo Switch OLED",
		price: 349.99,
		stock: 35,
		description: "Hybrid gaming console with vibrant OLED screen",
	},
	{
		name: "PlayStation 5",
		price: 499.99,
		stock: 12,
		description: "Next-gen gaming console with 4K gaming capabilities",
	},
	{
		name: "Xbox Series X",
		price: 499.99,
		stock: 14,
		description: "Microsoft's flagship gaming console with 4K/120fps gaming",
	},
	{
		name: "Apple Watch Series 9",
		price: 399.99,
		stock: 40,
		description: "Advanced smartwatch with health monitoring features",
	},
	{
		name: 'Samsung 55" QLED TV',
		price: 799.99,
		stock: 8,
		description: "4K QLED smart TV with HDR support",
	},
	{
		name: "Canon EOS R6 Mark II",
		price: 2499.99,
		stock: 6,
		description: "Professional mirrorless camera for photographers",
	},
	{
		name: "Bose QuietComfort Earbuds",
		price: 279.99,
		stock: 45,
		description: "Premium wireless earbuds with noise cancellation",
	},
	{
		name: "Google Pixel 8 Pro",
		price: 999.99,
		stock: 22,
		description:
			"AI-powered Android phone with advanced computational photography",
	},
	{
		name: "Surface Pro 9",
		price: 1299.99,
		stock: 16,
		description: "2-in-1 laptop tablet with detachable keyboard",
	},

	// Clothing & Accessories
	{
		name: "Levi's 501 Original Jeans",
		price: 89.99,
		stock: 100,
		description: "Classic straight-leg denim jeans",
	},
	{
		name: "Nike Air Max 270",
		price: 149.99,
		stock: 75,
		description: "Comfortable running shoes with visible air cushioning",
	},
	{
		name: "Adidas Ultraboost 22",
		price: 189.99,
		stock: 60,
		description: "High-performance running shoes with Boost technology",
	},
	{
		name: "Ray-Ban Aviator Sunglasses",
		price: 169.99,
		stock: 80,
		description: "Classic pilot-style sunglasses with UV protection",
	},
	{
		name: "North Face Puffer Jacket",
		price: 249.99,
		stock: 45,
		description: "Insulated winter jacket for outdoor adventures",
	},
	{
		name: "Polo Ralph Lauren Shirt",
		price: 79.99,
		stock: 90,
		description: "Classic cotton polo shirt in various colors",
	},
	{
		name: "Converse Chuck Taylor All Star",
		price: 59.99,
		stock: 120,
		description: "Iconic canvas sneakers in high-top style",
	},
	{
		name: "Patagonia Fleece Jacket",
		price: 179.99,
		stock: 35,
		description: "Eco-friendly fleece jacket for outdoor activities",
	},
	{
		name: "Timberland Work Boots",
		price: 199.99,
		stock: 40,
		description: "Durable waterproof boots for work and outdoor use",
	},
	{
		name: "Calvin Klein Underwear Set",
		price: 39.99,
		stock: 150,
		description: "Comfortable cotton underwear 3-pack",
	},

	// Home & Kitchen
	{
		name: "KitchenAid Stand Mixer",
		price: 379.99,
		stock: 20,
		description: "Professional-grade stand mixer for baking enthusiasts",
	},
	{
		name: "Instant Pot Duo 7-in-1",
		price: 99.99,
		stock: 65,
		description: "Multi-functional pressure cooker and slow cooker",
	},
	{
		name: "Dyson V15 Detect Vacuum",
		price: 749.99,
		stock: 15,
		description: "Cordless vacuum with laser dust detection",
	},
	{
		name: "Nespresso Vertuo Coffee Machine",
		price: 199.99,
		stock: 30,
		description: "Single-serve coffee maker with milk frother",
	},
	{
		name: "Le Creuset Dutch Oven",
		price: 349.99,
		stock: 25,
		description: "Enameled cast iron pot perfect for braising and roasting",
	},
	{
		name: "Vitamix Professional Blender",
		price: 449.99,
		stock: 18,
		description: "High-performance blender for smoothies and soups",
	},
	{
		name: "Weber Genesis Gas Grill",
		price: 899.99,
		stock: 8,
		description: "Premium gas grill with multiple burners and side tables",
	},
	{
		name: "Roomba i7+ Robot Vacuum",
		price: 599.99,
		stock: 12,
		description: "Smart robot vacuum with automatic dirt disposal",
	},
	{
		name: "Ninja Foodi Air Fryer",
		price: 149.99,
		stock: 40,
		description: "Multi-function air fryer and pressure cooker combo",
	},
	{
		name: "Keurig K-Elite Coffee Maker",
		price: 169.99,
		stock: 35,
		description: "Single-serve coffee maker with strong brew option",
	},

	// Books & Media
	{
		name: "The Seven Husbands of Evelyn Hugo",
		price: 16.99,
		stock: 200,
		description: "Bestselling novel by Taylor Jenkins Reid",
	},
	{
		name: "Atomic Habits",
		price: 18.99,
		stock: 150,
		description: "Self-help book on building good habits by James Clear",
	},
	{
		name: "Where the Crawdads Sing",
		price: 15.99,
		stock: 180,
		description: "Mystery novel set in the American South",
	},
	{
		name: "The Midnight Library",
		price: 14.99,
		stock: 160,
		description: "Philosophical fiction by Matt Haig",
	},
	{
		name: "Educated: A Memoir",
		price: 17.99,
		stock: 140,
		description: "Memoir by Tara Westover about education and family",
	},
	{
		name: "Dune: Complete Series Box Set",
		price: 89.99,
		stock: 25,
		description: "Frank Herbert's complete Dune saga in hardcover",
	},
	{
		name: "The Psychology of Money",
		price: 19.99,
		stock: 120,
		description: "Financial wisdom by Morgan Housel",
	},
	{
		name: "Becoming",
		price: 16.99,
		stock: 170,
		description: "Memoir by former First Lady Michelle Obama",
	},
	{
		name: "The Alchemist",
		price: 13.99,
		stock: 190,
		description: "Paulo Coelho's philosophical novel about following dreams",
	},
	{
		name: "1984",
		price: 12.99,
		stock: 220,
		description: "George Orwell's dystopian classic",
	},

	// Health & Beauty
	{
		name: "CeraVe Daily Moisturizer",
		price: 16.99,
		stock: 100,
		description: "Hydrating facial moisturizer with hyaluronic acid",
	},
	{
		name: "The Ordinary Niacinamide Serum",
		price: 7.99,
		stock: 150,
		description: "10% niacinamide + 1% zinc serum for blemish-prone skin",
	},
	{
		name: "Neutrogena Hydrating Foaming Cleanser",
		price: 8.99,
		stock: 120,
		description: "Gentle daily face cleanser for dry skin",
	},
	{
		name: "Sunday Riley Good Genes",
		price: 122.99,
		stock: 30,
		description: "Lactic acid treatment for smoother skin",
	},
	{
		name: "Fenty Beauty Foundation",
		price: 39.99,
		stock: 80,
		description: "Full-coverage foundation in 50 shades",
	},
	{
		name: "Charlotte Tilbury Lipstick",
		price: 37.99,
		stock: 90,
		description: "Matte revolution lipstick in classic red",
	},
	{
		name: "Olaplex Hair Treatment No. 3",
		price: 28.99,
		stock: 60,
		description: "At-home hair repair treatment",
	},
	{
		name: "Drunk Elephant Vitamin C Serum",
		price: 80.99,
		stock: 45,
		description: "15% L-ascorbic acid vitamin C serum",
	},
	{
		name: "Glossier Cloud Paint Blush",
		price: 18.99,
		stock: 70,
		description: "Gel-cream blush for natural flush",
	},
	{
		name: "La Mer Moisturizing Cream",
		price: 345.99,
		stock: 15,
		description: "Luxury moisturizer with miracle broth",
	},

	// Sports & Outdoors
	{
		name: "Hydro Flask Water Bottle",
		price: 44.99,
		stock: 85,
		description: "Insulated stainless steel water bottle",
	},
	{
		name: "Yeti Cooler Tundra 45",
		price: 324.99,
		stock: 20,
		description: "Heavy-duty cooler for camping and outdoor activities",
	},
	{
		name: "Patagonia Hiking Backpack",
		price: 179.99,
		stock: 30,
		description: "30L hiking backpack with multiple compartments",
	},
	{
		name: "REI Co-op Sleeping Bag",
		price: 149.99,
		stock: 25,
		description: "3-season sleeping bag rated to 20°F",
	},
	{
		name: "Coleman 4-Person Tent",
		price: 129.99,
		stock: 35,
		description: "Dome tent with easy setup for family camping",
	},
	{
		name: "Fitbit Charge 5",
		price: 149.99,
		stock: 50,
		description: "Advanced fitness tracker with GPS and health insights",
	},
	{
		name: "Peloton Bike+",
		price: 2495.99,
		stock: 5,
		description: "Interactive exercise bike with rotating screen",
	},
	{
		name: "Bowflex SelectTech Dumbbells",
		price: 549.99,
		stock: 12,
		description: "Adjustable dumbbells replacing 15 sets of weights",
	},
	{
		name: "Wilson Tennis Racket Pro Staff",
		price: 249.99,
		stock: 40,
		description: "Professional tennis racket used by Roger Federer",
	},
	{
		name: "Spalding NBA Basketball",
		price: 29.99,
		stock: 75,
		description: "Official size basketball with superior grip",
	},

	// Toys & Games
	{
		name: "LEGO Creator Expert Taj Mahal",
		price: 369.99,
		stock: 15,
		description: "5923-piece LEGO set of the iconic monument",
	},
	{
		name: "Nintendo Super Mario Odyssey",
		price: 49.99,
		stock: 60,
		description: "Popular platformer game for Nintendo Switch",
	},
	{
		name: "Monopoly Classic Board Game",
		price: 19.99,
		stock: 100,
		description: "Traditional property trading board game",
	},
	{
		name: "Rubik's Cube Original 3x3",
		price: 14.99,
		stock: 80,
		description: "Classic color-matching puzzle cube",
	},
	{
		name: "Jenga Classic Game",
		price: 9.99,
		stock: 120,
		description: "Wooden block stacking game for all ages",
	},
	{
		name: "Settlers of Catan Board Game",
		price: 54.99,
		stock: 45,
		description: "Strategy board game about resource management",
	},
	{
		name: "UNO Card Game",
		price: 7.99,
		stock: 150,
		description: "Classic family card game",
	},
	{
		name: "Chess Set Wooden",
		price: 39.99,
		stock: 70,
		description: "Handcrafted wooden chess set with folding board",
	},
	{
		name: "Scrabble Deluxe Edition",
		price: 34.99,
		stock: 55,
		description: "Word game with rotating wooden board",
	},
	{
		name: "Risk Global Domination",
		price: 44.99,
		stock: 35,
		description: "Classic strategy game of world conquest",
	},

	// Food & Beverages
	{
		name: "Blue Bottle Coffee Beans",
		price: 19.99,
		stock: 200,
		description: "Single-origin coffee beans from Ethiopia",
	},
	{
		name: "Ghirardelli Dark Chocolate",
		price: 12.99,
		stock: 150,
		description: "Premium dark chocolate squares 72% cacao",
	},
	{
		name: "Manuka Honey UMF 15+",
		price: 89.99,
		stock: 40,
		description: "Premium New Zealand manuka honey",
	},
	{
		name: "Olive Oil Extra Virgin",
		price: 24.99,
		stock: 80,
		description: "Cold-pressed Italian extra virgin olive oil",
	},
	{
		name: "Green Tea Matcha Powder",
		price: 34.99,
		stock: 60,
		description: "Ceremonial grade matcha from Japan",
	},
	{
		name: "Himalayan Pink Salt",
		price: 16.99,
		stock: 100,
		description: "Pure pink salt from Pakistan mountains",
	},
	{
		name: "Organic Quinoa",
		price: 14.99,
		stock: 90,
		description: "Certified organic white quinoa grain",
	},
	{
		name: "Almond Butter Natural",
		price: 18.99,
		stock: 70,
		description: "No-stir natural almond butter",
	},
	{
		name: "Coconut Oil Unrefined",
		price: 22.99,
		stock: 85,
		description: "Cold-pressed virgin coconut oil",
	},
	{
		name: "Sea Salt Caramel Sauce",
		price: 13.99,
		stock: 65,
		description: "Gourmet caramel sauce with sea salt",
	},

	// Automotive
	{
		name: "Michelin Pilot Sport Tires",
		price: 299.99,
		stock: 30,
		description: "High-performance summer tires 245/40R18",
	},
	{
		name: "Bosch Wiper Blades",
		price: 24.99,
		stock: 100,
		description: "All-season windshield wiper blades",
	},
	{
		name: "Mobil 1 Synthetic Motor Oil",
		price: 49.99,
		stock: 80,
		description: "Full synthetic 5W-30 motor oil 5-quart",
	},
	{
		name: "WeatherTech Floor Mats",
		price: 179.99,
		stock: 45,
		description: "Custom-fit all-weather floor liners",
	},
	{
		name: "Garmin DriveSmart GPS",
		price: 199.99,
		stock: 35,
		description: "6.95-inch GPS navigator with voice control",
	},
	{
		name: "Chemical Guys Car Wash Kit",
		price: 89.99,
		stock: 55,
		description: "Complete car detailing wash kit",
	},
	{
		name: "Thule Roof Cargo Box",
		price: 599.99,
		stock: 12,
		description: "Aerodynamic roof box for extra storage",
	},
	{
		name: "Armor All Car Care Kit",
		price: 39.99,
		stock: 75,
		description: "Interior and exterior car care products",
	},
	{
		name: "Rain-X Windshield Treatment",
		price: 7.99,
		stock: 120,
		description: "Water repellent treatment for windshields",
	},
	{
		name: "STP Fuel Injector Cleaner",
		price: 12.99,
		stock: 90,
		description: "Complete fuel system cleaner",
	},

	// Pet Supplies
	{
		name: "Royal Canin Dog Food",
		price: 64.99,
		stock: 40,
		description: "Premium dry dog food for adult dogs 30lbs",
	},
	{
		name: "KONG Classic Dog Toy",
		price: 14.99,
		stock: 100,
		description: "Durable rubber toy for aggressive chewers",
	},
	{
		name: "PetSafe Automatic Feeder",
		price: 149.99,
		stock: 25,
		description: "Programmable pet feeder with portion control",
	},
	{
		name: "Purina Pro Plan Cat Food",
		price: 54.99,
		stock: 50,
		description: "High-protein dry cat food 16lbs",
	},
	{
		name: "FURminator deShedding Tool",
		price: 39.99,
		stock: 60,
		description: "Professional grooming tool for pets",
	},
	{
		name: "PetSafe Dog Harness",
		price: 29.99,
		stock: 80,
		description: "No-pull dog harness with front clip",
	},
	{
		name: "Cat Litter Clumping",
		price: 19.99,
		stock: 90,
		description: "Unscented clumping clay cat litter 40lbs",
	},
	{
		name: "Nylabone Dog Chew Toys",
		price: 16.99,
		stock: 70,
		description: "Flavored nylon chew toys for dental health",
	},
	{
		name: "Pet Gate Adjustable",
		price: 79.99,
		stock: 35,
		description: "Extra-wide pet gate for doorways and stairs",
	},
	{
		name: "Bird Cage Large",
		price: 189.99,
		stock: 15,
		description: "Spacious bird cage with multiple perches",
	},

	// Office & School Supplies
	{
		name: "HP LaserJet Printer",
		price: 299.99,
		stock: 20,
		description: "Wireless laser printer with automatic duplex",
	},
	{
		name: "Staples Copy Paper",
		price: 39.99,
		stock: 100,
		description: "8.5x11 multipurpose copy paper 2500 sheets",
	},
	{
		name: "Sharpie Permanent Markers",
		price: 19.99,
		stock: 150,
		description: "Fine point permanent markers 12-pack",
	},
	{
		name: "Post-it Sticky Notes",
		price: 12.99,
		stock: 200,
		description: "Classic yellow sticky notes variety pack",
	},
	{
		name: "BIC Ballpoint Pens",
		price: 8.99,
		stock: 180,
		description: "Medium point blue ballpoint pens 12-pack",
	},
	{
		name: "Fellowes Paper Shredder",
		price: 89.99,
		stock: 30,
		description: "Cross-cut paper shredder for home office",
	},
	{
		name: "Swingline Stapler",
		price: 24.99,
		stock: 80,
		description: "Heavy-duty desktop stapler",
	},
	{
		name: "3M Scotch Tape Dispenser",
		price: 15.99,
		stock: 120,
		description: "Desktop tape dispenser with tape roll",
	},
	{
		name: "Five Star Notebooks",
		price: 14.99,
		stock: 160,
		description: "College-ruled spiral notebooks 3-pack",
	},
	{
		name: "TI-84 Plus Calculator",
		price: 119.99,
		stock: 45,
		description: "Graphing calculator for students",
	},

	// Garden & Outdoor
	{
		name: "Miracle-Gro Plant Food",
		price: 19.99,
		stock: 85,
		description: "All-purpose plant food for indoor/outdoor plants",
	},
	{
		name: "Scotts Turf Builder",
		price: 49.99,
		stock: 60,
		description: "Lawn fertilizer covers 5000 sq ft",
	},
	{
		name: "Keter Storage Shed",
		price: 899.99,
		stock: 8,
		description: "Outdoor storage shed 8x6 feet",
	},
	{
		name: "Sun Joe Electric Mower",
		price: 179.99,
		stock: 25,
		description: "14-inch corded electric lawn mower",
	},
	{
		name: "Garden Hose 50ft",
		price: 34.99,
		stock: 70,
		description: "Expandable garden hose with spray nozzle",
	},
	{
		name: "Patio Umbrella 9ft",
		price: 129.99,
		stock: 40,
		description: "Market umbrella with crank and tilt",
	},
	{
		name: "Weber Kettle Grill",
		price: 149.99,
		stock: 35,
		description: "22-inch charcoal kettle grill",
	},
	{
		name: "Adirondack Chair Set",
		price: 299.99,
		stock: 20,
		description: "Weather-resistant patio chairs set of 2",
	},
	{
		name: "Solar Path Lights",
		price: 39.99,
		stock: 55,
		description: "LED solar pathway lights 6-pack",
	},
	{
		name: "Rain Gauge Weather Station",
		price: 89.99,
		stock: 30,
		description: "Digital weather station with outdoor sensor",
	},

	// Baby & Kids
	{
		name: "Pampers Baby Diapers",
		price: 49.99,
		stock: 80,
		description: "Size 3 baby dry diapers 186 count",
	},
	{
		name: "Fisher-Price Rock 'n Play",
		price: 79.99,
		stock: 35,
		description: "Portable baby rocker with calming vibrations",
	},
	{
		name: "Chicco KeyFit Car Seat",
		price: 199.99,
		stock: 25,
		description: "Infant car seat with base",
	},
	{
		name: "Baby Einstein Activity Table",
		price: 89.99,
		stock: 40,
		description: "Interactive activity table with music and lights",
	},
	{
		name: "Huggies Baby Wipes",
		price: 24.99,
		stock: 120,
		description: "Sensitive baby wipes 12-pack",
	},
	{
		name: "Graco Pack 'n Play",
		price: 149.99,
		stock: 30,
		description: "Portable playard with bassinet",
	},
	{
		name: "Tommee Tippee Bottles",
		price: 34.99,
		stock: 70,
		description: "Natural baby bottles 6-pack",
	},
	{
		name: "Skip Hop Diaper Bag",
		price: 69.99,
		stock: 50,
		description: "Stylish diaper backpack with changing pad",
	},
	{
		name: "VTech Learning Toy",
		price: 29.99,
		stock: 85,
		description: "Interactive learning toy for toddlers",
	},
	{
		name: "Medela Breast Pump",
		price: 349.99,
		stock: 20,
		description: "Double electric breast pump",
	},

	// Musical Instruments
	{
		name: "Yamaha Acoustic Guitar",
		price: 299.99,
		stock: 25,
		description: "FG800 solid spruce top acoustic guitar",
	},
	{
		name: "Casio Digital Piano",
		price: 799.99,
		stock: 15,
		description: "88-key weighted digital piano",
	},
	{
		name: "Pearl Drum Set",
		price: 1299.99,
		stock: 8,
		description: "5-piece acoustic drum set with cymbals",
	},
	{
		name: "Fender Electric Guitar",
		price: 649.99,
		stock: 20,
		description: "Player Stratocaster electric guitar",
	},
	{
		name: "Roland Electronic Keyboard",
		price: 449.99,
		stock: 18,
		description: "61-key portable keyboard with sounds",
	},
	{
		name: "Shure SM58 Microphone",
		price: 99.99,
		stock: 40,
		description: "Dynamic vocal microphone for live performance",
	},
	{
		name: "Audio-Technica Turntable",
		price: 349.99,
		stock: 22,
		description: "Direct-drive professional turntable",
	},
	{
		name: "Bach Trumpet",
		price: 899.99,
		stock: 12,
		description: "Student model Bb trumpet with case",
	},
	{
		name: "Yamaha Violin",
		price: 199.99,
		stock: 30,
		description: "4/4 size acoustic violin with bow and case",
	},
	{
		name: "Hohner Harmonica",
		price: 39.99,
		stock: 60,
		description: "Marine Band harmonica in key of C",
	},

	// Jewelry & Watches
	{
		name: "Pandora Charm Bracelet",
		price: 89.99,
		stock: 45,
		description: "Sterling silver charm bracelet",
	},
	{
		name: "Fossil Smartwatch",
		price: 255.99,
		stock: 30,
		description: "Gen 6 smartwatch with Wear OS",
	},
	{
		name: "Swarovski Crystal Necklace",
		price: 149.99,
		stock: 35,
		description: "Sparkling crystal pendant necklace",
	},
	{
		name: "Timex Weekender Watch",
		price: 39.99,
		stock: 70,
		description: "Classic analog watch with NATO strap",
	},
	{
		name: "Kate Spade Earrings",
		price: 78.99,
		stock: 50,
		description: "Gold-plated stud earrings",
	},
	{
		name: "Citizen Eco-Drive Watch",
		price: 179.99,
		stock: 40,
		description: "Solar-powered analog watch",
	},
	{
		name: "Michael Kors Watch",
		price: 195.99,
		stock: 35,
		description: "Stainless steel chronograph watch",
	},
	{
		name: "Tiffany & Co Ring",
		price: 299.99,
		stock: 20,
		description: "Sterling silver return to Tiffany ring",
	},
	{
		name: "Coach Bracelet",
		price: 125.99,
		stock: 30,
		description: "Signature leather wrap bracelet",
	},
	{
		name: "David Yurman Cable Bracelet",
		price: 395.99,
		stock: 15,
		description: "Sterling silver cable cuff bracelet",
	},

	// Travel & Luggage
	{
		name: "Samsonite Hardside Luggage",
		price: 249.99,
		stock: 35,
		description: "28-inch spinner luggage with TSA lock",
	},
	{
		name: "Travelpro Carry-on Bag",
		price: 179.99,
		stock: 40,
		description: "22-inch wheeled carry-on with laptop compartment",
	},
	{
		name: "Eagle Creek Packing Cubes",
		price: 49.99,
		stock: 80,
		description: "Compression packing cubes set of 4",
	},
	{
		name: "Osprey Hiking Backpack",
		price: 299.99,
		stock: 25,
		description: "65L hiking backpack with rain cover",
	},
	{
		name: "Tumi Business Brief",
		price: 395.99,
		stock: 20,
		description: "Leather laptop briefcase",
	},
	{
		name: "Away Aluminum Suitcase",
		price: 425.99,
		stock: 18,
		description: "Medium aluminum shell suitcase",
	},
	{
		name: "Pacsafe Anti-theft Bag",
		price: 129.99,
		stock: 45,
		description: "Slash-proof travel daypack",
	},
	{
		name: "Travel Pillow Memory Foam",
		price: 29.99,
		stock: 100,
		description: "Ergonomic neck pillow for flights",
	},
	{
		name: "Universal Travel Adapter",
		price: 24.99,
		stock: 90,
		description: "All-in-one international power adapter",
	},
	{
		name: "Compression Socks",
		price: 19.99,
		stock: 120,
		description: "Flight compression socks for circulation",
	},

	// Arts & Crafts
	{
		name: "Crayola Colored Pencils",
		price: 12.99,
		stock: 150,
		description: "50-count colored pencils for artists",
	},
	{
		name: "Prismacolor Markers",
		price: 89.99,
		stock: 40,
		description: "Fine tip art markers 72-color set",
	},
	{
		name: "Cricut Cutting Machine",
		price: 249.99,
		stock: 20,
		description: "Electronic cutting machine for crafts",
	},
	{
		name: "Watercolor Paint Set",
		price: 34.99,
		stock: 60,
		description: "Professional watercolor paints 36 colors",
	},
	{
		name: "Sketchbook Hardbound",
		price: 18.99,
		stock: 80,
		description: "9x12 hardbound drawing pad 140 pages",
	},
	{
		name: "Modeling Clay Set",
		price: 24.99,
		stock: 70,
		description: "Air-dry modeling clay 10 colors",
	},
	{
		name: "Yarn Bundle Acrylic",
		price: 39.99,
		stock: 90,
		description: "Acrylic yarn skeins 20 colors for knitting",
	},
	{
		name: "Embroidery Hoop Set",
		price: 16.99,
		stock: 100,
		description: "Bamboo embroidery hoops various sizes",
	},
	{
		name: "Calligraphy Pen Set",
		price: 29.99,
		stock: 55,
		description: "Fountain pens for calligraphy and lettering",
	},
	{
		name: "Scrapbook Album",
		price: 22.99,
		stock: 65,
		description: "12x12 photo scrapbook with refill pages",
	},
]

async function seedProducts() {
	try {
		console.log("Starting to seed products...")

		await prisma.product.deleteMany({})
		console.log("Cleared existing products")

		const createdProducts = await prisma.product.createMany({
			data: products,
			skipDuplicates: true,
		})

		console.log(`Successfully seeded ${createdProducts.count} products`)

		const totalProducts = await prisma.product.count()
		console.log(`Total products in database: ${totalProducts}`)
	} catch (error) {
		console.error("Error seeding products:", error)
		throw error
	} finally {
		await prisma.$disconnect()
	}
}

seedProducts().catch((error) => {
	console.error("Seeding failed:", error)
	process.exit(1)
})

module.exports = { seedProducts, products }
