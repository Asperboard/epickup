import React, { useState } from 'react';

const Shop = ({ coins, onPointsSpent }) => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Skin A', type: 'skin', image: '/skinA.png' },
    { id: 2, name: 'Tree', type: 'background', image: '/tree.png' },
    { id: 3, name: 'Rock', type: 'object', image: '/rock.png' },
    { id: 4, name: 'New Skin', type: 'skin', image: '/newSkin.png' },
  ]);

  const [avatarItems, setAvatarItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [shopItems, setShopItems] = useState([
    { id: 5, name: 'Top Hat', type: 'hat', price: 100, image: '/hat1.png' },
    { id: 6, name: 'Christmas Hat', type: 'hat', price: 200, image: '/hat2.png' },
    { id: 7, name: 'Greek Hat', type: 'hat', price: 1000, image: '/hat4.png' },
    { id: 8, name: 'Santa Hat', type: 'hat', price: 400, image: '/hat3.png' },
  ]);

  const spendCoins = (amount) => {
    onPointsSpent(amount)
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = (e) => {
    if (draggedItem && isDragging) {
      const avatarZone = document.getElementById('avatar-zone');
  
      if (!avatarZone) {
        setDraggedItem(null);
        setIsDragging(false);
        return;
      }
  
      const rect = avatarZone.getBoundingClientRect();
  
      // Calcul correct de la position relative à l'avatar-zone
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
  
      if (
        relativeX >= 0 &&
        relativeX <= rect.width &&
        relativeY >= 0 &&
        relativeY <= rect.height
      ) {
        setAvatarItems([
          ...avatarItems,
          { ...draggedItem, x: relativeX, y: relativeY }
        ]);
        setInventory(inventory.filter(item => item.id !== draggedItem.id));
      }
      
      setDraggedItem(null);
      setIsDragging(false);
    }
  };
  
  const generateUniqueId = () => {
    return Math.floor(Math.random() * Date.now());
  };

  const handleBuyItem = (item) => {
    if (coins >= item.price) {
      const newItem = { ...item, id: generateUniqueId() };
      setInventory([...inventory, newItem]);
      spendCoins(item.price);
      setShopItems(shopItems.filter(i => i.id !== item.id));
    } else {
      alert('Not enough coins!');
    }
  };

  const moveItemToInventory = (item) => {
    setInventory([...inventory, item]);
    setAvatarItems(avatarItems.filter(i => i.id !== item.id));
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-gray-100"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Zone de l'avatar */}
      <div id="avatar-zone" className="absolute w-1/2 h-1/2 border-4 border-blue-500 rounded-lg bg-transparent flex flex-col justify-center items-center p-4">
        <div className="relative w-full h-full">
        {avatarItems.map(item => (
          <img
            key={item.id}
            src={item.image}
            alt={item.name}
            className="absolute w-16 h-16 hover:bg-red-200 rounded-lg p-2 transition cursor-pointer"
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              transform: "translate(-50%, -50%)" // Centre correctement l'image
            }}
            onClick={() => moveItemToInventory(item)}
          />
        ))}
      </div>
      </div>

      {/* Inventaire */}
      <div className="absolute bottom-0 w-[95%] h-1/4 border-4 border-green-500 rounded-lg bg-transparent p-4">
        <span className="text-blue-500 text-lg font-semibold">Inventaire</span>
        <div className="flex flex-wrap mt-2">
          {inventory.map(item => (
              <img
                key={item.id}
                src={item.image}
                alt={item.name}
                className="m-2 w-16 h-16 cursor-pointer"
                onMouseDown={(e) => {
                  setDraggedItem(item);
                  setIsDragging(true);
                  setMousePosition({ x: e.clientX, y: e.clientY });
                }} />
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

      {/* Objet qui suit la souris */}
      {draggedItem && (
        <img
          src={draggedItem.image}
          alt={draggedItem.name}
          className="absolute w-16 h-16 pointer-events-none"
          style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px`, transform: "translate(-50%, -50%)" }}
        />
      )}
    </div>
  );
};

export default Shop;
