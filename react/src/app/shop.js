import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Shop = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Skin A', type: 'skin', image: '/skinA.png' },
    { id: 2, name: 'Tree', type: 'background', image: '/tree.png' },
    { id: 3, name: 'Rock', type: 'object', image: '/rock.png' },
    { id: 4, name: 'New Skin', type: 'skin', image: '/newSkin.png' },
  ]);

  const [avatarItems, setAvatarItems] = useState([]);
  const [coins, setCoins] = useState(1000);
  const [shopItems, setShopItems] = useState([
    { id: 5, name: 'Top Hat', type: 'hat', price: 100, image: '/hat1.png' },
    { id: 6, name: 'Christmas Hat', type: 'hat', price: 200, image: '/hat2.png' },
    { id: 7, name: 'Greek Hat', type: 'hat', price: 1000, image: '/hat4.png' },
    { id: 8, name: 'Santa Hat', type: 'hat', price: 400, image: '/hat3.png' },
  ]);

  const generateUniqueId = () => {
    return Math.floor(Math.random() * Date.now());
  };

  const handleBuyItem = (item) => {
    if (coins >= item.price) {
      const newItem = { ...item, id: generateUniqueId() };
      setInventory([...inventory, newItem]);
      setCoins(coins - item.price);
      setShopItems(shopItems.filter(i => i.id !== item.id));
    } else {
      alert('Not enough coins!');
    }
  };

  // Fonction pour déplacer l'objet entre l'inventaire et l'avatar
  const moveItemToAvatar = (item) => {
    setAvatarItems([...avatarItems, item]);
    setInventory(inventory.filter(i => i.id !== item.id));
  };

  const moveItemToInventory = (item) => {
    setInventory([...inventory, item]);
    setAvatarItems(avatarItems.filter(i => i.id !== item.id));
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-gray-100">
      {/* Zone de l'avatar */}
      <div className="absolute w-1/2 h-1/2 border-4 border-blue-500 rounded-lg bg-transparent flex flex-col justify-center items-center">
        <span className="text-blue-500 text-lg font-semibold">Zone de l'avatar</span>
        {avatarItems.map(item => (
          <DraggableItem
            key={item.id}
            item={item}
            isAvatar={true}
            moveItem={moveItemToInventory}
          />
        ))}
      </div>

      {/* Inventaire */}
      <div className="absolute bottom-0 w-[95%] h-1/4 border-4 border-green-500 rounded-lg bg-transparent p-4">
        <span className="text-blue-500 text-lg font-semibold">Inventaire</span>
        <div className="flex flex-wrap">
          {inventory.map(item => (
            <DraggableItem
              key={item.id}
              item={item}
              isAvatar={false}
              moveItem={moveItemToAvatar}
            />
          ))}
        </div>
      </div>

      {/* Boutique */}
      <div className="absolute right-0 top-0 w-1/4 h-3/4 border-4 border-red-500 rounded-lg bg-transparent p-4">
        <span className="text-blue-500 text-lg font-semibold">Boutique</span>
        <div className="text-2xl font-bold text-red-500 mb-4">Coins: {coins}</div>
        {shopItems.map(item => (
          <div key={item.id} className="flex flex-col items-center mb-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 mb-2" />
            <button
              onClick={() => handleBuyItem(item)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Acheter {item.name} ({item.price} coins)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const DraggableItem = ({ item, isAvatar, moveItem }) => {
  const [, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { id: item.id, name: item.name, type: item.type },
  }));

  const [, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (draggedItem) => {
      moveItem(draggedItem);
    }
  }));

  return (
    <div ref={(node) => drag(drop(node))} className="border-2 p-2 m-2">
      <img src={item.image} alt={item.name} className="w-16 h-16" />
    </div>
  );
};

export default Shop;