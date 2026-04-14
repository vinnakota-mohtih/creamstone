import dbcImg from '../assets/death-by-chocolate.jpg'
import ferreroImg from '../assets/Ferrero.jpg'
import oreoImg from '../assets/oreoice.jpg'
import rainbowImg from '../assets/rainbow.jpg'
import belgianImg from '../assets/Belgian.png'

const strawberryImg = rainbowImg;
const mangoImg = rainbowImg;
const tiramisuImg = dbcImg;
const shakeImg = oreoImg;
const cottonCandyImg = rainbowImg;
const pistachioImg = belgianImg;
const caramelImg = ferreroImg;

export const staticProducts = [
    // --- SIGNATURE CHOCOLATE CONCEPTS ---
    { id: '1', title: 'Willy Wonka', category: 'chocolate', image: dbcImg, price: 210, bestSeller: true, description: "Chocolate ice cream mixed with chocolate pastry, choco chips and dark choco fudge.", stock: 50 },
    { id: '2', title: 'Death By Chocolate', category: 'chocolate', image: dbcImg, price: 220, bestSeller: true, description: "Two scoops of dark chocolate ice cream mixed with crunchy brownies and chocolate fudge.", stock: 40 },
    { id: '3', title: 'Chocoholics', category: 'chocolate', image: belgianImg, price: 180, description: "A perfect blend of dark chocolate ice cream, chocolate ribbon, and crisp chocolate flakes.", stock: 50 },
    { id: '4', title: 'Chocolate Overdose', category: 'chocolate', image: ferreroImg, price: 200, description: "Layers of dense chocolate ice cream with Nutella and roasted nuts.", stock: 35 },
    { id: '5', title: 'Ferrero Rocher', category: 'chocolate', image: ferreroImg, price: 230, bestSeller: true, description: "Delicious chocolate and hazelnut ice cream mixed with Ferrero Rocher balls and Nutella.", stock: 25 },
    { id: '6', title: 'Brownie Break', category: 'chocolate', image: belgianImg, price: 190, description: "Classic vanilla base infused with chocolate fudge and huge brownie chunks.", stock: 45 },
    { id: '7', title: 'Oreo Shot', category: 'chocolate', image: oreoImg, price: 185, description: "White vanilla ice cream slammed with Oreo cookies and chocolate dip.", stock: 45 },
    { id: '8', title: 'Choco Lava', category: 'chocolate', image: dbcImg, price: 240, bestSeller: true, description: "A hot molten lava cake surrounded by freezing cold chocolate ice cream.", stock: 20 },
    { id: '9', title: 'Nutella Brownie', category: 'chocolate', image: ferreroImg, price: 210, description: "A decadent combination of fresh brownie chunks slathered in premium Nutella.", stock: 30 },
    { id: '10', title: 'Tiramisu', category: 'chocolate', image: tiramisuImg, price: 250, description: "Italian style ice cream combining mascarpone, espresso, and cocoa dusting.", stock: 15 },
    
    // --- NUTTY & CARAMEL CONCEPTS ---
    { id: '11', title: 'Nuts Overload', category: 'nutty', image: caramelImg, price: 195, bestSeller: true, description: "Caramel and Butterscotch ice cream loaded with roasted almonds, cashews, and pecans.", stock: 30 },
    { id: '12', title: 'Dry Fruit Delight', category: 'nutty', image: pistachioImg, price: 215, description: "A royal mix of premium dry fruits blended into a rich malai ice cream base.", stock: 25 },
    { id: '13', title: 'Karamel Sutra', category: 'nutty', image: caramelImg, price: 180, description: "Smooth caramel ice cream base mixed with golden pralines and sticky caramel liquid.", stock: 35 },
    { id: '14', title: 'Arabian Nights', category: 'nutty', image: pistachioImg, price: 200, description: "A middle-eastern fusion of dates, figs, and crushed pistachios.", stock: 30 },
    { id: '15', title: 'Coffee Craze', category: 'nutty', image: caramelImg, price: 175, bestSeller: true, description: "Intense coffee ice cream paired with roasted almonds and caramel drizzle.", stock: 40 },
    { id: '16', title: 'Butterscotch Bliss', category: 'nutty', image: caramelImg, price: 165, description: "Crunchy butterscotch praline with rich vanilla bean.", stock: 50 },

    // --- FRESH FRUIT CONCEPTS ---
    { id: '17', title: 'Alphonso Mango', category: 'fruit', image: mangoImg, price: 170, bestSeller: true, description: "Natural Alphonso mango pulp blended with creamy milk and fresh mango chunks.", stock: 60 },
    { id: '18', title: 'Strawberry Passion', category: 'fruit', image: strawberryImg, price: 160, description: "Fresh strawberry extract mixed with real fruit chunks for a sweet, tangy experience.", stock: 50 },
    { id: '19', title: 'Fruit Bash', category: 'fruit', image: rainbowImg, price: 185, description: "A chaotic, sweet medley of fresh Kiwi, Apple, Pineapple, and Strawberry.", stock: 40 },
    { id: '20', title: 'Lichee', category: 'fruit', image: rainbowImg, price: 190, description: "Exotic lychee fruit blended perfectly into sweet cream.", stock: 20 },
    { id: '21', title: 'Blue Sky Banana', category: 'fruit', image: rainbowImg, price: 165, description: "A fun tropical twist of fresh banana and vivid blue curacao syrup.", stock: 30 },
    { id: '22', title: 'Jamun Mango', category: 'fruit', image: mangoImg, price: 180, description: "An incredible fusion of sweet mango and tart Indian java plum.", stock: 25 },
    { id: '23', title: 'Pineapple Coconut', category: 'fruit', image: rainbowImg, price: 155, description: "Tropical vacation in a cup. Real pineapple and coconut shreds.", stock: 35 },

    // --- SIGNATURE CAKES & SPECIALS ---
    { id: '24', title: 'Rainbow Cake', category: 'specials', image: rainbowImg, price: 450, bestSeller: true, description: "Multi-layered colorful vibrant cake that brings joy to every slice.", stock: 15 },
    { id: '25', title: 'Lotus Biscoff Cake', category: 'specials', image: belgianImg, price: 550, description: "An entire premium ice cream cake layered with Biscoff spread and crushed speculoos.", stock: 10 },
    { id: '26', title: 'Red Velvet Cake', category: 'specials', image: rainbowImg, price: 500, bestSeller: true, description: "Indulgent red velvet layers with cream cheese frosting ice cream.", stock: 15 },
    { id: '27', title: 'Oreo Cake', category: 'specials', image: oreoImg, price: 400, description: "A classic cookies & cream cake built with dark chocolate sponge.", stock: 20 },
    { id: '28', title: 'Black Forest', category: 'specials', image: dbcImg, price: 420, description: "The vintage classic. Cherries, chocolate shards, and vanilla cream.", stock: 25 },
    { id: '29', title: 'Cotton Candy Kids', category: 'specials', image: cottonCandyImg, price: 150, description: "Pink and blue cotton candy swirls straight from the fairground.", stock: 40 },
    { id: '30', title: 'Bubblegum Pop', category: 'specials', image: rainbowImg, price: 140, description: "Nostalgic bubblegum flavored ice cream with colorful popping candy.", stock: 30 },

    // --- THICK SHAKES ---
    { id: '31', title: 'Belgium Dark Chocolate Shake', category: 'shake', image: shakeImg, price: 180, bestSeller: true, description: "A dense, rich shake made with premium dark Belgium chocolate.", stock: 40 },
    { id: '32', title: 'Ferrero Delight Shake', category: 'shake', image: shakeImg, price: 210, bestSeller: true, description: "Liquid luxury. Ferrero Rochers blended completely into hazelnut milk.", stock: 35 },
    { id: '33', title: 'Creamy Oreo', category: 'shake', image: shakeImg, price: 160, description: "A silky smooth shake made with crushed Oreos and a dense chocolate base.", stock: 45 },
    { id: '34', title: 'Nutella Brownie Blast', category: 'shake', image: shakeImg, price: 190, description: "A thick decadent shake blended with a whole brownie and plenty of Nutella.", stock: 40 },
    { id: '35', title: 'Strawberry Thick Shake', category: 'shake', image: strawberryImg, price: 150, description: "Simple, elegant, and packed with real strawberry flavor.", stock: 50 },
    { id: '36', title: 'Alphonso Mango Shake', category: 'shake', image: mangoImg, price: 170, bestSeller: true, description: "Thick mango shake perfect for the summer heat.", stock: 30 },
    { id: '37', title: 'Cold Coffee Shake', category: 'shake', image: shakeImg, price: 165, description: "Strong freshly brewed coffee blended into a frosty, creamy shake.", stock: 60 },
    { id: '38', title: 'Caramel Popcorn', category: 'shake', image: caramelImg, price: 175, description: "An extraordinary movie-theatre inspired shake bursting with salted caramel.", stock: 25 },
    { id: '39', title: 'Lichee Thick Shake', category: 'shake', image: rainbowImg, price: 180, description: "A smooth, highly floral and sweet lychee fruit shake.", stock: 20 },
    { id: '40', title: 'Blueberry Splash', category: 'shake', image: rainbowImg, price: 185, description: "A vibrant berry shake loaded with antioxidants and sweet cream.", stock: 30 }
];
