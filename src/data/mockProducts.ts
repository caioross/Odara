export const mockProducts = [
    {
        id: 1,
        name: "Poltrona Lina",
        category: "poltrona",
        collection: "Organica",
        price: "Sob Consulta",
        image: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&q=80&w=600",
        hoverImage: "https://images.unsplash.com/photo-1598300056636-681b498e5e1e?auto=format&fit=crop&q=80&w=600",
        availableFinishes: ["Freijó", "Jequitibá", "Nogueira"],
        finishesImages: [
            { name: "Terracota", hex: "#CDA07C" },
            { name: "Verde Intenso", hex: "#063030" },
            { name: "Off White", hex: "#F8EFED" }
        ],
        dimensions: "L 75cm x A 80cm x P 85cm",
        warehouseUrl: "https://3dwarehouse.sketchup.com/org/dfd6b8e9-2ed0-4d9c-a771-41466c457cf8/Odara"
    },
    {
        id: 2,
        name: "Sofá Niemeyer",
        category: "sofa",
        collection: "Modernista",
        price: "Sob Consulta",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600",
        hoverImage: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600",
        availableFinishes: ["Cumaru", "Madeira Clara"],
        finishesImages: [
            { name: "Verde Claro", hex: "#5EB49A" },
            { name: "Cinza Claro", hex: "#E5E5E5" }
        ],
        dimensions: "L 240cm x A 75cm x P 100cm",
        warehouseUrl: "https://3dwarehouse.sketchup.com/org/dfd6b8e9-2ed0-4d9c-a771-41466c457cf8/Odara"
    },
    {
        id: 3,
        name: "Mesa Centro Tarsila",
        category: "mesa-centro",
        collection: "Organica",
        price: "Sob Consulta",
        image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600",
        hoverImage: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=600",
        availableFinishes: ["Mármore Travertino", "Mármore Branco", "Maciço Freijó"],
        finishesImages: [],
        dimensions: "Ø 110cm x A 35cm",
        warehouseUrl: "https://3dwarehouse.sketchup.com/org/dfd6b8e9-2ed0-4d9c-a771-41466c457cf8/Odara"
    },
    {
        id: 4,
        name: "Rack Oiticica",
        category: "rack",
        collection: "Essencial",
        price: "Sob Consulta",
        image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=600",
        hoverImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600",
        availableFinishes: ["Cinamomo", "Laca Off-White"],
        finishesImages: [],
        dimensions: "L 220cm x A 55cm x P 45cm",
        warehouseUrl: "https://3dwarehouse.sketchup.com/org/dfd6b8e9-2ed0-4d9c-a771-41466c457cf8/Odara"
    },
    {
        id: 5,
        name: "Cadeira Sérgio",
        category: "cadeira",
        collection: "Modernista",
        price: "Sob Consulta",
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=600",
        hoverImage: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&q=80&w=600",
        availableFinishes: ["Jequitibá", "Freijó com Couro"],
        finishesImages: [
            { name: "Couro Caramelo", hex: "#B87A4F" },
            { name: "Couro Preto", hex: "#1A1A1A" }
        ],
        dimensions: "L 55cm x A 82cm x P 60cm",
        warehouseUrl: "https://3dwarehouse.sketchup.com/org/dfd6b8e9-2ed0-4d9c-a771-41466c457cf8/Odara"
    },
    {
        id: 6,
        name: "Banqueta Burle",
        category: "banqueta",
        collection: "Organica",
        price: "Sob Consulta",
        image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&q=80&w=600",
        hoverImage: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=600",
        availableFinishes: ["Madeira Maciça Carbonizada", "Freijó"],
        finishesImages: [],
        dimensions: "Ø 35cm x A 72cm",
        warehouseUrl: "https://3dwarehouse.sketchup.com/org/dfd6b8e9-2ed0-4d9c-a771-41466c457cf8/Odara"
    }
];

export const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'banco', name: 'Bancos' },
    { id: 'rack', name: 'Racks' },
    { id: 'sofa', name: 'Sofás' },
    { id: 'cadeira', name: 'Cadeiras' },
    { id: 'banqueta', name: 'Banquetas' },
    { id: 'mesa-jantar', name: 'Mesas de Jantar' },
    { id: 'mesa-lateral', name: 'Mesas Laterais' },
    { id: 'mesa-centro', name: 'Mesas de Centro' },
    { id: 'poltrona', name: 'Poltronas' }
];
