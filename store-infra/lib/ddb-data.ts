export const products = [
    { id: 'eco-friendly-bottle-15345', name: 'Eco-friendly Water Bottle', price: 19.99, image: '/images/eco-friendly.jpeg', description: 'A great bottle for hydrating your self and protecting the nature' },
    { id: 'organic-tshirt-74743', name: 'Organic Cotton T-shirt', price: 29.99, image: '/images/organic-tshirt.jpeg', description: 'For sensitive skins and eco conscious fashion lovers.' },
    { id: 'recycled-paper-notebook-734743', name: 'Recycled Paper Notebook', price: 9.99, image: '/images/recycled-paper.jpeg', description: 'Save your thoughts, and save the environment from waste.' },
    { id: 'bamboo-cutlery-set-9584', name: 'Bamboo Cutlery Set', price: 49.99, image: '/images/bamboo-cutlery-set.jpeg', description: 'Portable and reusable utensils made from sustainable bamboo. Perfect for on-the-go meals and reducing plastic waste.' },
    { id: 'phone-charger-434834', name: 'Solar-Powered Phone Charger', price: 39.99, image: '/images/phone-charger.jpeg', description: 'Harness the sun energy to keep your devices charged. Ideal for outdoor enthusiasts and eco-conscious travelers.' },
    { id: 'beeswax-food-wraps-43774', name: 'Beeswax Food Wraps', price: 129.99, image: '/images/beeswax-food-wraps.jpeg', description: 'Reusable, biodegradable alternative to plastic wrap. Keeps food fresh naturally and reduces single-use plastic in your kitchen.' },
    { id: 'outdoor-rug-3347438', name: 'Recycled Plastic Outdoor Rug', price: 2.99, image: '/images/outdoor-rug.jpeg', description: 'Stylish and durable rug made from recycled plastic bottles. Perfect for patios and picnics while giving plastic waste a new life.' },
    { id: 'cotton-tote-bag-009833', name: 'Organic Cotton Tote Bag', price: 6.99, image: '/images/cotton-tote-bag.jpeg', description: 'Sturdy, washable shopping bag made from organic cotton. Reduces reliance on disposable bags and supports sustainable agriculture.' },
    { id: 'glass-cleaning-kit-4443', name: 'Refillable Glass Cleaning Kit', price: 0.99, image: '/images/glass-cleaning-kit.jpeg', description: 'All-purpose cleaner in a reusable glass bottle with concentrated refills. Effective cleaning power with less packaging waste.' },
    { id: 'stainless-steel-safety-razor-73455', name: 'Stainless Steel Safety Razor', price: 13.99, image: '/images/stainless-steel-safety-razor.jpeg', description: 'Durable, plastic-free alternative to disposable razors. Provides a close shave while reducing waste from cartridges and packaging.' },
    { id: 'biodegradable-phone-case-9364', name: 'Biodegradable Phone Case', price: 2.99, image: '/images/biodegradable-phone-case.jpeg', description: 'Stylish protection for your smartphone made from plant-based materials. Fully compostable at end-of-life, reducing electronic waste.' },
    { id: 'reusable-silicone-food-storage-bags-0193', name: 'Reusable Silicone Food Storage Bags', price: 5.99, image: '/images/reusable-silicone-food-storage-bags.jpeg', description: 'Flexible, airtight bags for storing food and snacks. Dishwasher-safe and long-lasting alternative to single-use plastic bags.' },
] as const;


export const defaultUser =
    {
        username: { S: 'Joud' },
        phone: { S: '+971546352343' },
        password: { S: 'demo' },
        address: { S: 'Marina, Dubai, UAE' },
        premium: { S: 'yes' },
    } as const;


export const comments = [
    { productid: 'bamboo-cutlery-set-9584', timestamp: 1722065698, username: 'Joud', text: 'I love this product'},
    { productid: 'bamboo-cutlery-set-9584', timestamp: 1722000000, username: 'Achraf', text: 'Great quality price ratio ^^'},
] as const;
