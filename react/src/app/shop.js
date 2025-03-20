import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Avatar = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Skin A', type: 'skin' },
    { id: 2, name: 'Tree', type: 'background' },
    { id: 3, name: 'Rock', type: 'object' },
    { id: 4, name: 'New Skin', type: 'skin' },
  ]);

  const [avatarItems, setAvatarItems] = useState([]);

  const handleBuyItem = (item) => {
    setInventory([...inventory, item]);
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
        <span className="text-blue-500">Zone de l'avatar</span>
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
      <div className="absolute bottom-0 w-[95%] h-1/4 border-4 border-green-500 rounded-lg bg-transparent">
        <span className="text-blue-500">Inventaire</span>
        <div className="flex">
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
      <div className="absolute right-0 top-0 w-1/4 h-3/4 border-4 border-red-500 rounded-lg bg-transparent">
        <span className="text-blue-500">Boutique</span>
        <button onClick={() => handleBuyItem({ id: 5, name: 'New Item', type: 'object' })}>
          Acheter un objet
        </button>
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
      {item.name}
    </div>
  );
};

export default Avatar;
