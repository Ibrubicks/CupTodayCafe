import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Coffee, Instagram, MapPin, Menu, QrCode, Star, Utensils } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import './styles.css';

const menuImages = {
  hotCoffee: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
  icedCoffee: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80',
  shakes: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80',
  tea: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80',
  mocktails: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
  sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80',
  wrap: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80',
  pizza: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
  fries: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80',
  pasta: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80',
  fried: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
  breakfast: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80',
  dessert: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80',
};

const menuGroups = [
  {
    title: 'Hot Coffee',
    icon: Coffee,
    items: [
      ['Espresso', 'Bold single-origin shot with a caramel crema.', '149', menuImages.hotCoffee],
      ['Americano', 'Espresso lifted with hot water.', '169', menuImages.hotCoffee],
      ['Cappuccino', 'Espresso, steamed milk, and airy foam.', '189', menuImages.hotCoffee],
      ['Cafe Latte', 'Velvety milk, espresso, and soft latte art.', '199', menuImages.hotCoffee],
      ['Caramel Latte', 'Latte finished with caramel sweetness.', '229', menuImages.hotCoffee],
      ['Cafe Mocha', 'Espresso, milk, and chocolate comfort.', '229', menuImages.hotCoffee],
      ['Hot Chocolate', 'Rich cocoa with a creamy finish.', '289', menuImages.hotCoffee],
      ['CUP TODAY Signature', 'House espresso, dark cocoa, and cream finish.', '299', menuImages.hotCoffee],
      ['Spanish Latte', 'Creamy latte with a smooth sweet profile.', '239', menuImages.hotCoffee],
      ['Macchiato', 'Espresso marked with textured milk.', '169', menuImages.hotCoffee],
    ],
  },
  {
    title: 'Iced Coffee',
    icon: QrCode,
    items: [
      ['Classic Iced Coffee', 'Slow-chilled coffee over crystal ice.', '219', menuImages.icedCoffee],
      ['Iced Blue Latte', 'Cool blue latte with a creamy coffee base.', '219', menuImages.icedCoffee],
      ['Cranberry Coffee', 'Coffee with a bright cranberry note.', '239', menuImages.icedCoffee],
      ['Raspberry Iced Latte', 'Iced latte with raspberry sweetness.', '219', menuImages.icedCoffee],
      ['Caramel Iced Latte', 'Espresso, cold milk, and caramel ribbon.', '219', menuImages.icedCoffee],
      ['Mocha Iced Latte', 'Chocolate coffee served over ice.', '219', menuImages.icedCoffee],
      ['Matcha Latte', 'Green matcha and chilled milk.', '279', menuImages.icedCoffee],
      ['Matcha Strawberry Latte', 'Matcha layered with strawberry cream.', '299', menuImages.icedCoffee],
    ],
  },
  {
    title: 'Milkshakes',
    icon: Star,
    items: [
      ['Mango Milkshake', 'Classic chilled mango shake.', '199', menuImages.shakes],
      ['Strawberry Milkshake', 'Creamy strawberry blend.', '199', menuImages.shakes],
      ['Blackcurrant Milkshake', 'Tangy blackcurrant and milk.', '199', menuImages.shakes],
      ['Oreo Milkshake', 'Cookies and cream favorite.', '209', menuImages.shakes],
      ['KitKat Milkshake', 'Chocolate wafer shake.', '209', menuImages.shakes],
      ['Dark Chocolate Milkshake', 'Deep cocoa and cream.', '219', menuImages.shakes],
      ['Brownie Milkshake', 'Brownie blended into a thick shake.', '239', menuImages.shakes],
      ['Raspberry Milkshake', 'Berry-forward chilled shake.', '199', menuImages.shakes],
      ['Banana Milkshake', 'Fresh banana and milk.', '199', menuImages.shakes],
      ['Caramel Milkshake', 'Caramel cream shake.', '209', menuImages.shakes],
      ['Biscoff Milkshake', 'Cookie butter style shake.', '249', menuImages.shakes],
      ['Berry Biscoff Blast', 'Berry and Biscoff dessert shake.', '259', menuImages.shakes],
      ['Caramel Banana Milkshake', 'Banana shake with caramel notes.', '219', menuImages.shakes],
    ],
  },
  {
    title: 'Thickshakes',
    icon: Star,
    items: [
      ['Mango Thickshake', 'Extra-thick mango dessert shake.', '249', menuImages.shakes],
      ['Strawberry Thickshake', 'Dense strawberry cream shake.', '249', menuImages.shakes],
      ['Blackcurrant Thickshake', 'Rich blackcurrant blend.', '249', menuImages.shakes],
      ['Oreo Thickshake', 'Thick cookies and cream shake.', '259', menuImages.shakes],
      ['KitKat Thickshake', 'Chocolate wafer thickshake.', '259', menuImages.shakes],
      ['Dark Chocolate Thickshake', 'Dark cocoa and cream.', '269', menuImages.shakes],
      ['Brownie Thickshake', 'Brownie-rich thickshake.', '289', menuImages.shakes],
      ['Raspberry Thickshake', 'Raspberry cream blend.', '249', menuImages.shakes],
      ['Banana Thickshake', 'Banana and cream thickshake.', '239', menuImages.shakes],
      ['Caramel Thickshake', 'Smooth caramel thickshake.', '259', menuImages.shakes],
      ['Biscoff Thickshake', 'Cookie butter thickshake.', '299', menuImages.shakes],
      ['Berry Biscoff Blast', 'Premium berry Biscoff thickshake.', '319', menuImages.shakes],
      ['Caramel Banana Thickshake', 'Caramel banana dessert shake.', '269', menuImages.shakes],
    ],
  },
  {
    title: 'Smoothies',
    icon: Star,
    items: [
      ['Banana Smoothie', 'Fresh banana smoothie.', '219', menuImages.shakes],
      ['Mango Smoothie', 'Mango fruit blend.', '219', menuImages.shakes],
      ['Strawberry Smoothie', 'Strawberry fruit smoothie.', '219', menuImages.shakes],
      ['Blueberry Smoothie', 'Blueberry cream blend.', '249', menuImages.shakes],
      ['Apple Smoothie', 'Fresh apple smoothie.', '219', menuImages.shakes],
      ['Avocado Smoothie', 'Creamy avocado smoothie.', '249', menuImages.shakes],
      ['Raspberry Smoothie', 'Raspberry fruit smoothie.', '249', menuImages.shakes],
    ],
  },
  {
    title: 'Frappes',
    icon: Coffee,
    items: [
      ['Classic Cold Coffee', 'Blended cold coffee frappe.', '239', menuImages.icedCoffee],
      ['Mocha Cold Coffee', 'Chocolate cold coffee frappe.', '259', menuImages.icedCoffee],
      ['Caramel Cold Coffee', 'Caramel coffee frappe.', '269', menuImages.icedCoffee],
      ['Hazelnut Cold Coffee', 'Hazelnut coffee frappe.', '269', menuImages.icedCoffee],
      ['Biscoff Cold Coffee', 'Biscoff coffee frappe.', '279', menuImages.icedCoffee],
      ['Oreo Cold Coffee', 'Oreo coffee frappe.', '259', menuImages.icedCoffee],
      ['Raspberry Cold Coffee', 'Raspberry coffee frappe.', '269', menuImages.icedCoffee],
      ['Peanut Butter Cold Coffee', 'Peanut butter coffee frappe.', '279', menuImages.icedCoffee],
      ['Cinnamon Cold Coffee', 'Cinnamon coffee frappe.', '269', menuImages.icedCoffee],
    ],
  },
  {
    title: 'Hot Tea',
    icon: Coffee,
    items: [
      ['Green Tea', 'Fresh brewed green tea.', '139', menuImages.tea],
      ['Lemon Tea', 'Bright lemon tea.', '139', menuImages.tea],
      ['English Breakfast Tea', 'Classic breakfast tea.', '139', menuImages.tea],
      ['Darjeeling Tea', 'Aromatic Darjeeling brew.', '139', menuImages.tea],
      ['Guava Tea', 'Fruit-forward guava tea.', '139', menuImages.tea],
      ['Assam Tea', 'Strong Assam tea.', '139', menuImages.tea],
      ['Ginger Tea', 'Warm ginger tea.', '139', menuImages.tea],
    ],
  },
  {
    title: 'Mocktails',
    icon: QrCode,
    items: [
      ['Blue Sea Mojito', 'Refreshing blue mojito.', '239', menuImages.mocktails],
      ['Green Sea Mojito', 'Minty green mojito.', '239', menuImages.mocktails],
      ['Virgin Mojito', 'Classic mint-lime cooler.', '239', menuImages.mocktails],
      ['Cranberry Mojito', 'Cranberry lime cooler.', '259', menuImages.mocktails],
      ['Raspberry Mojito', 'Raspberry mint cooler.', '239', menuImages.mocktails],
      ['Spicy Mango Mojito', 'Mango cooler with a spice kick.', '239', menuImages.mocktails],
      ['Spicy Jamun Mojito', 'Jamun cooler with spice.', '239', menuImages.mocktails],
      ['Blackberry Mojito', 'Blackberry mint cooler.', '239', menuImages.mocktails],
      ['Strawberry Mojito', 'Strawberry lime mojito.', '239', menuImages.mocktails],
      ['Blue Curacao Mojito', 'Blue curacao mint cooler.', '239', menuImages.mocktails],
      ['Fizzy Lemon Mojito', 'Sparkling lemon mint cooler.', '239', menuImages.mocktails],
      ['Orange Mojito', 'Orange mint cooler.', '239', menuImages.mocktails],
      ['Guava Mojito', 'Guava lime cooler.', '239', menuImages.mocktails],
    ],
  },
  {
    title: 'Boba Special',
    icon: QrCode,
    items: [
      ['Boba Hazelnut', 'Hazelnut boba drink.', '249', menuImages.icedCoffee],
      ['Boba Biscoff', 'Biscoff boba drink.', '279', menuImages.icedCoffee],
      ['Boba Brown Sugar', 'Brown sugar pearls and cream.', '239', menuImages.icedCoffee],
      ['Boba Strawberry', 'Strawberry boba drink.', '239', menuImages.icedCoffee],
    ],
  },
  {
    title: 'Healthy Breakfast',
    icon: Utensils,
    items: [
      ['ABC Juice', 'Apple, beetroot, and carrot juice.', '250', menuImages.breakfast],
      ['Protein Shake', 'High-protein breakfast shake.', '350', menuImages.breakfast],
      ['Collagen Shot', 'Wellness shot.', '350', menuImages.breakfast],
      ['Wheatgrass Shot', 'Fresh wheatgrass shot.', '350', menuImages.breakfast],
    ],
  },
  {
    title: 'Viral Specials',
    icon: Star,
    items: [
      ['Espresso Bomb', 'Bold espresso dessert-style special.', '189', menuImages.dessert],
      ['Affogato', 'Vanilla gelato drowned in espresso.', '259', menuImages.dessert],
    ],
  },
  {
    title: 'Burgers',
    icon: Utensils,
    items: [
      ['Zinger Blast Chicken Burger', 'Crispy zinger chicken burger.', '219', menuImages.burger],
      ['Smoky Chicken Steak Burger', 'Smoky steak-style chicken burger.', '229', menuImages.burger],
      ['Crispy Crunch Chicken Burger', 'Crunchy fried chicken burger.', '229', menuImages.burger],
      ['Peri Peri Smash Chicken Burger', 'Spicy peri peri chicken burger.', '249', menuImages.burger],
      ['Cheese Burst Crispy Chicken Burger', 'Crispy chicken with cheese burst.', '319', menuImages.burger],
      ['Paneer Tikka Burger', 'Paneer tikka patty and house sauce.', '199', menuImages.burger],
      ['Sweet Corn Cheese Finger Burger', 'Sweet corn cheese patty burger.', '219', menuImages.burger],
    ],
  },
  {
    title: 'Sandwiches - Chicken',
    icon: Utensils,
    items: [
      ['Smoky Grilled Chicken Sandwich', 'Grilled chicken sandwich with smoky sauce.', '219', menuImages.sandwich],
      ['Fiery Spicy Grilled Chicken Sandwich', 'Spicy grilled chicken sandwich.', '239', menuImages.sandwich],
    ],
  },
  {
    title: 'Sandwiches - Veg',
    icon: Utensils,
    items: [
      ['Grilled Veg Delight Sandwich', 'Toasted veg sandwich.', '189', menuImages.sandwich],
      ['Sweet Corn Cheese Sandwich', 'Corn and cheese grilled sandwich.', '189', menuImages.sandwich],
      ['Loaded Finger Club Sandwich', 'Layered club sandwich.', '239', menuImages.sandwich],
      ['Paneer Tikka Sandwich', 'Paneer tikka grilled sandwich.', '199', menuImages.sandwich],
    ],
  },
  {
    title: 'Wraps - Chicken',
    icon: Utensils,
    items: [
      ['Zinger Crunch Chicken Wrap', 'Crispy chicken wrap.', '199', menuImages.wrap],
      ['Smoky Grilled Chicken Wrap', 'Smoky grilled chicken wrap.', '219', menuImages.wrap],
      ['Loaded Cheese Chicken Wrap', 'Cheesy chicken wrap.', '249', menuImages.wrap],
      ['Chicken Tikka Masala Wrap', 'Chicken tikka masala wrap.', '259', menuImages.wrap],
    ],
  },
  {
    title: 'Wraps - Veg',
    icon: Utensils,
    items: [
      ['Falafel Herb Wrap', 'Falafel and herb wrap.', '189', menuImages.wrap],
      ['Paneer Tikka Wrap', 'Spiced paneer, greens, and creamy dressing.', '199', menuImages.wrap],
    ],
  },
  {
    title: 'Pizza - Non Veg',
    icon: Utensils,
    items: [
      ['Chicken Tikka Pizza', 'Chicken tikka pizza.', '279', menuImages.pizza],
      ['Crispy Chicken Loaded Pizza', 'Loaded crispy chicken pizza.', '289', menuImages.pizza],
      ['Chicken Supreme Cheese Pizza', 'Chicken supreme cheese pizza.', '319', menuImages.pizza],
      ['Sweet Corn Chicken Delight Pizza', 'Sweet corn and chicken pizza.', '289', menuImages.pizza],
    ],
  },
  {
    title: 'Pizza - Veg',
    icon: Utensils,
    items: [
      ['Margherita Cheese Pizza', 'Classic cheese pizza.', '229', menuImages.pizza],
      ['Sweet Corn Cheese Pizza', 'Sweet corn cheese pizza.', '219', menuImages.pizza],
      ['Paneer Tikka Pizza', 'Paneer tikka pizza.', '279', menuImages.pizza],
    ],
  },
  {
    title: 'Broast',
    icon: Utensils,
    items: [
      ['2 Pc Crispy Broasted Chicken Meal', 'Two-piece crispy broasted chicken meal.', '219', menuImages.fried],
      ['4 Pc Crispy Broasted Chicken Bucket', 'Four-piece crispy chicken bucket.', '399', menuImages.fried],
      ['8 Pc Family Broasted Bucket', 'Family-size broasted chicken bucket.', '749', menuImages.fried],
      ['Single Pc Broast Leg', 'Single crispy broast leg.', '129', menuImages.fried],
    ],
  },
  {
    title: 'Pasta',
    icon: Utensils,
    items: [
      ['Creamy Alfredo Pasta', 'Creamy white sauce pasta.', '269', menuImages.pasta],
      ['Classic Arrabbiata Pasta', 'Red sauce pasta with heat.', '269', menuImages.pasta],
      ['Loaded Cheese Pasta', 'Extra cheesy pasta.', '309', menuImages.pasta],
    ],
  },
  {
    title: 'Fries',
    icon: Utensils,
    items: [
      ['Classic Salted Fries', 'Crispy salted fries.', '109', menuImages.fries],
      ['Peri Peri Fries', 'Fries tossed in peri peri spice.', '149', menuImages.fries],
      ['Loaded Cheese Fries', 'Crispy fries with cheese sauce.', '179', menuImages.fries],
      ['Loaded Crispy Chicken Fries', 'Fries loaded with crispy chicken.', '229', menuImages.fries],
      ['Loaded Steak Chicken Fries', 'Fries loaded with steak-style chicken.', '239', menuImages.fries],
    ],
  },
  {
    title: 'Salads',
    icon: Utensils,
    items: [
      ['Crispy Chicken Garden Salad', 'Garden salad with crispy chicken.', '229', menuImages.salad],
      ['Grilled Steak Chicken Salad', 'Grilled chicken salad.', '239', menuImages.salad],
      ['Classic Egg Protein Salad', 'Protein salad with egg.', '209', menuImages.salad],
    ],
  },
  {
    title: 'Breakfast Items',
    icon: Utensils,
    items: [
      ['Scrambled Egg Breakfast Wrap', 'Egg breakfast wrap.', '189', menuImages.breakfast],
      ['Butter Chicken Melt Sandwich', 'Butter chicken melt sandwich.', '199', menuImages.breakfast],
      ['Nutella Sandwich', 'Sweet Nutella sandwich.', '189', menuImages.breakfast],
      ['Cheese Stuffed Puri Pocket', 'Cheese-stuffed puri pocket.', '179', menuImages.breakfast],
      ['Nutella Paratha Roll', 'Sweet paratha roll.', '209', menuImages.breakfast],
      ['Cheese Paratha Roll', 'Cheese-filled paratha roll.', '189', menuImages.breakfast],
      ['Egg Loaded Paratha Roll', 'Egg-loaded paratha roll.', '169', menuImages.breakfast],
      ['Hakka Chicken Noodles Bowl', 'Chicken noodles bowl.', '229', menuImages.breakfast],
      ['Schezwan Chicken Noodles Bowl', 'Schezwan chicken noodles bowl.', '239', menuImages.breakfast],
      ['Hongkong Chicken Noodles Bowl', 'Hongkong-style chicken noodles.', '239', menuImages.breakfast],
      ['Chicken Fried Rice Bowl', 'Chicken fried rice bowl.', '229', menuImages.breakfast],
      ['Veg Fried Rice Bowl', 'Veg fried rice bowl.', '199', menuImages.breakfast],
    ],
  },
  {
    title: 'Combos',
    icon: Utensils,
    items: [
      ['Fries + Coke', 'Classic combo side and drink.', '129', menuImages.fries],
      ['Cold Coffee Upgrade', 'Upgrade your meal with cold coffee.', '179', menuImages.icedCoffee],
      ['Peri Peri Fries + Coke', 'Spiced fries with Coke.', '149', menuImages.fries],
    ],
  },
  {
    title: 'Add Ons',
    icon: Star,
    items: [
      ['Cheese Slice', 'Extra cheese slice.', '49', menuImages.fries],
      ['Jalapeno Loaded', 'Jalapeno add-on.', '49', menuImages.fries],
      ['Extra Chicken Patty', 'Extra chicken patty.', '99', menuImages.burger],
      ['Extra Sauce Dip', 'Extra dip on the side.', '39', menuImages.fries],
      ['Classic Crispy Chicken Wings (5 Pc)', 'Five-piece crispy wings.', '229', menuImages.fried],
      ['Classic Crispy Chicken Wings (10 Pc)', 'Ten-piece crispy wings.', '389', menuImages.fried],
      ['Crispy Chicken Tenders (3 Pc)', 'Three-piece chicken tenders.', '169', menuImages.fried],
      ['Crispy Chicken Tenders (6 Pc)', 'Six-piece chicken tenders.', '259', menuImages.fried],
      ['Chicken Nuggets (10 Pc)', 'Ten-piece chicken nuggets.', '219', menuImages.fried],
      ['Crispy Chicken Popcorn (15 Pc)', 'Fifteen-piece chicken popcorn.', '219', menuImages.fried],
      ['Crispy Chicken Popcorn Bucket (25 Pc)', 'Twenty-five-piece popcorn bucket.', '299', menuImages.fried],
      ['Crispy Fish Bites (7 Pc)', 'Seven-piece crispy fish bites.', '299', menuImages.fried],
      ['Crispy Golden Prawns (7 Pc)', 'Seven-piece crispy prawns.', '349', menuImages.fried],
    ],
  },
];

const gallery = [
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
];

const reviews = [
  ['Aesthetic, cozy, and the cold coffee tastes like a treat after college.', 'Aarav M.'],
  ['Premium vibe without feeling intimidating. The burger and signature latte were perfect.', 'Nisha P.'],
  ['Great place for evening hangs. Fast service, good lighting, lovely desserts.', 'Rhea S.'],
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

function getDietType(groupTitle, itemName) {
  const nonVegPattern = /chicken|fish|prawn|egg|broast|steak|nugget|wings|tenders/i;
  return nonVegPattern.test(`${groupTitle} ${itemName}`) ? 'non-veg' : 'veg';
}

function Logo() {
  return (
    <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-latte/70 bg-black/40 shadow-glow backdrop-blur-md sm:h-28 sm:w-28">
      <div className="text-center">
        <Coffee className="mx-auto mb-1 h-8 w-8 text-crema" aria-hidden="true" />
        <p className="font-display text-lg font-bold leading-none text-crema">Cup Today</p>
        <p className="text-[10px] uppercase tracking-[0.28em] text-latte">Cafe</p>
      </div>
    </div>
  );
}

function FloatingAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {[...Array(7)].map((_, index) => (
        <span
          className="ice-cube"
          key={index}
          style={{ '--x': `${8 + index * 14}%`, '--delay': `${index * -1.6}s`, '--size': `${14 + (index % 3) * 8}px` }}
        />
      ))}
      {[...Array(8)].map((_, index) => (
        <span
          className="steam"
          key={`steam-${index}`}
          style={{ '--x': `${12 + index * 11}%`, '--delay': `${index * -1.1}s` }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 130]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=1600&q=80"
          aria-label="Slow motion iced coffee atmosphere"
        >
          <source src="https://videos.pexels.com/video-files/2818546/2818546-hd_1920_1080_24fps.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-espresso/62 to-espresso" />
      <div className="relative z-20 flex min-h-[100svh] flex-col items-center justify-center px-5 pb-20 pt-24 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <Logo />
        </motion.div>
        <motion.p
          className="mt-7 text-xs font-semibold uppercase tracking-[0.45em] text-latte"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          Coffee. Bites. More.
        </motion.p>
        <motion.h1
          className="mt-4 max-w-4xl font-display text-5xl font-black leading-[0.95] text-mist sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          Cup Today Cafe
        </motion.h1>
        <motion.p
          className="mt-5 max-w-xl text-base leading-7 text-crema/84 sm:text-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          A cinematic coffee lounge for iced brews, barista classics, chef bites, and slow evenings.
        </motion.p>
        <motion.a
          href="#menu"
          className="menu-cta mt-9 inline-flex items-center gap-3 rounded-full bg-crema px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-espresso shadow-glow transition hover:-translate-y-1 hover:bg-white focus:outline-none focus:ring-2 focus:ring-crema focus:ring-offset-4 focus:ring-offset-espresso"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
          View Menu
        </motion.a>
      </div>
    </section>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-espresso/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <a href="#" className="font-display text-xl font-bold text-crema" aria-label="Cup Today Cafe home">Cup Today</a>
        <div className="flex items-center gap-1 text-sm text-crema/80">
          {['Menu', 'About', 'Gallery', 'Contact'].map((item) => (
            <a key={item} className={`rounded-full px-3 py-2 hover:bg-white/10 hover:text-white ${item === 'Gallery' ? 'nav-gallery' : ''}`} href={`#${item.toLowerCase()}`}>{item}</a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function MenuSection() {
  const [activeTitle, setActiveTitle] = useState(menuGroups[0].title);
  const tabsRef = useRef(null);
  const activeGroup = useMemo(
    () => menuGroups.find((group) => group.title === activeTitle) ?? menuGroups[0],
    [activeTitle],
  );
  const activeImage = activeGroup.items[0]?.[3] ?? menuImages.hotCoffee;
  const scrollTabs = (direction) => {
    tabsRef.current?.scrollBy({
      left: direction * Math.min(340, tabsRef.current.clientWidth * 0.78),
      behavior: 'smooth',
    });
  };

  return (
    <section id="menu" className="relative bg-espresso px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <p className="section-kicker">Official cafe menu</p>
          <h2 className="section-title">Menu</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-crema/66">
            Tap a category to view items instantly. Prices exclude GST where applicable.
          </p>
        </motion.div>
        <motion.div
          className="mt-9"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
        >
          <div className="menu-tab-shell">
            <button className="menu-arrow" type="button" aria-label="Previous menu categories" onClick={() => scrollTabs(-1)}>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="menu-tabs" role="tablist" aria-label="Cup Today menu categories" ref={tabsRef}>
              {menuGroups.map((group) => (
                <button
                  className={`menu-tab ${activeTitle === group.title ? 'is-active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTitle === group.title}
                  key={group.title}
                  onClick={(event) => {
                    setActiveTitle(group.title);
                    event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                  }}
                >
                  {group.title}
                </button>
              ))}
            </div>
            <button className="menu-arrow" type="button" aria-label="Next menu categories" onClick={() => scrollTabs(1)}>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <motion.article
            className="menu-panel glass mt-5 overflow-hidden rounded-[30px]"
            key={activeGroup.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: 'easeOut' }}
          >
            <div className="relative min-h-64 overflow-hidden md:min-h-full">
              <img className="h-64 w-full object-cover md:h-full" src={activeImage} alt={`${activeGroup.title} from Cup Today Cafe`} loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/20 to-transparent md:bg-gradient-to-r" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-crema backdrop-blur-md">
                  <activeGroup.icon className="h-4 w-4 text-latte" aria-hidden="true" />
                  {activeGroup.items.length} items
                </div>
                <h3 className="font-display text-4xl font-black text-mist">{activeGroup.title}</h3>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <div className="mb-4 flex flex-wrap gap-3 text-xs font-semibold text-crema/72">
                <span className="inline-flex items-center gap-2"><span className="diet-dot veg" /> Veg</span>
                <span className="inline-flex items-center gap-2"><span className="diet-dot non-veg" /> Non-veg</span>
              </div>
              <div className="menu-list">
                {activeGroup.items.map(([name, , price]) => {
                  const dietType = getDietType(activeGroup.title, name);
                  return (
                    <div className="menu-row" key={name}>
                      <span className={`diet-dot ${dietType}`} aria-label={dietType} />
                      <h4>{name}</h4>
                      <span className="menu-price">Rs. {price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}

function QRMenu() {
  return (
    <section className="bg-[linear-gradient(180deg,#0d0907,#21150f)] px-5 py-20">
      <motion.div
        className="mx-auto grid max-w-6xl gap-8 rounded-[34px] border border-latte/20 bg-white/[0.06] p-5 shadow-glow backdrop-blur-xl md:grid-cols-[1fr_0.8fr] md:p-8"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="flex flex-col justify-center">
          <p className="section-kicker">Digital menu</p>
          <h2 className="font-display text-4xl font-black text-mist sm:text-5xl">Scan to View Menu</h2>
          <p className="mt-4 max-w-xl text-crema/75">
            Open the Cup Today menu instantly on your phone. Fast, clean, and perfect for table-side ordering.
          </p>
          <a className="mt-6 inline-flex w-fit items-center gap-3 rounded-full border border-latte/35 px-5 py-3 text-sm font-bold text-crema hover:bg-latte/10" href="#menu">
            <QrCode className="h-4 w-4" aria-hidden="true" />
            Open menu on this device
          </a>
        </div>
        <div className="qr-frame mx-auto">
          <QRCodeSVG value={`${window.location.origin}${window.location.pathname}#menu`} size={210} bgColor="#f5dfbd" fgColor="#0d0907" level="H" includeMargin />
          <p className="mt-4 text-center text-xs font-bold uppercase tracking-[0.26em] text-latte">Cup Today Cafe</p>
        </div>
      </motion.div>
    </section>
  );
}

function AboutGallery() {
  return (
    <section id="about" className="bg-roast px-5 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <p className="section-kicker">About the cafe</p>
          <h2 className="section-title">Warm lights, polished coffee, and easy conversations.</h2>
          <p className="mt-5 text-crema/76">
            Cup Today Cafe blends barista craft with chef-style comfort food. The space is designed for quick coffee breaks, casual meetups, and the kind of evening plans that turn into one more order.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3">
            {['Signature cold coffees', 'Chef menu bites', 'Premium desserts', 'Cozy dine-in vibe'].map((text) => (
              <div className="rounded-2xl border border-white/10 bg-black/18 p-4 text-sm font-semibold text-crema" key={text}>{text}</div>
            ))}
          </div>
        </motion.div>
        <div id="gallery" className="grid grid-cols-2 gap-3 sm:gap-4">
          {gallery.map((image, index) => (
            <motion.img
              key={image}
              className={`h-44 w-full rounded-[24px] object-cover sm:h-64 ${index % 2 ? 'mt-7' : ''}`}
              src={image}
              alt={`Cup Today Cafe ambience ${index + 1}`}
              loading="lazy"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section className="bg-espresso px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div>
            <p className="section-kicker">Instagram preview</p>
            <h2 className="section-title">Fresh pours, food shots, and cafe moments.</h2>
          </div>
          <a href="https://www.instagram.com/cuptodaycafe" target="_blank" rel="noreferrer" className="insta-btn">
            <Instagram className="h-5 w-5" aria-hidden="true" />
            Follow @cuptodaycafe
          </a>
        </motion.div>
        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {gallery.map((image, index) => (
            <motion.a
              href="https://www.instagram.com/cuptodaycafe"
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-[24px]"
              key={`insta-${image}`}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.04 }}
            >
              <img className="aspect-square w-full object-cover transition duration-700 group-hover:scale-110" src={image} alt="Instagram cafe preview" loading="lazy" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-80" />
              <Instagram className="absolute bottom-4 left-4 h-5 w-5 text-white" aria-hidden="true" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsContact() {
  const cafeAddress = 'CUP TODAY CAFE, Daulat Gulshan Colony, Surya Nagar, Toli Chowki, Hyderabad, Telangana 500008, India';
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(cafeAddress)}&output=embed`;

  return (
    <section id="contact" className="bg-roast px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="section-kicker">Loved by customers</p>
          <h2 className="section-title">A cafe that feels premium, but stays welcoming.</h2>
        </motion.div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {reviews.map(([quote, name]) => (
            <motion.figure className="glass rounded-[26px] p-5" key={name} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="mb-4 flex text-latte">{[...Array(5)].map((_, index) => <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />)}</div>
              <blockquote className="text-crema/82">"{quote}"</blockquote>
              <figcaption className="mt-5 font-semibold text-mist">{name}</figcaption>
            </motion.figure>
          ))}
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div className="glass rounded-[28px] p-6" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3 className="font-display text-3xl font-bold text-mist">Visit Cup Today Cafe</h3>
            <div className="mt-6 space-y-5 text-crema/78">
              <p className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-latte" /> {cafeAddress}</p>
              <p className="flex gap-3"><Clock className="mt-1 h-5 w-5 shrink-0 text-latte" /> Open daily: 11:00 AM - 11:30 PM</p>
              <p className="flex gap-3"><Coffee className="mt-1 h-5 w-5 shrink-0 text-latte" /> Dine-in, takeaway, coffee dates, and quick bites.</p>
            </div>
          </motion.div>
          <motion.div className="overflow-hidden rounded-[28px] border border-latte/20" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <iframe
              title="Cup Today Cafe map"
              src={mapSrc}
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Header />
      <FloatingAtmosphere />
      <main>
        <Hero />
        <MenuSection />
        <QRMenu />
        <AboutGallery />
        <InstagramSection />
        <ReviewsContact />
      </main>
      <footer className="bg-espresso px-5 py-8 text-center text-sm text-crema/60">
        <p>(c) 2026 Cup Today Cafe. Coffee. Bites. More.</p>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
