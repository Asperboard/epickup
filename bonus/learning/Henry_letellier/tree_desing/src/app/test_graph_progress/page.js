/*
** EPITECH PROJECT, 2024
** epickup
** File description:
** page.js
*/

"use client";
import React, { useState, useEffect } from 'react';
import { Tree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';

// function DynamicTreeProgress() {
//     // Initial data structure
//     const initialData = {
//         name: 'Start Game',
//         id: 'start',
//         completed: false,
//         children: [{
//             name: 'Choose Character',
//             id: 'character',
//             completed: false,
//             children: [{
//                 name: 'Warrior',
//                 id: 'warrior',
//                 completed: false,
//             }, {
//                 name: 'Mage',
//                 id: 'mage',
//                 completed: false,
//             }]
//         }, {
//             name: 'Tutorial',
//             id: 'tutorial',
//             completed: false,
//             children: [{
//                 name: 'Basic Controls',
//                 id: 'controls',
//                 completed: false,
//             }]
//         }]
//     };

//     // State for the tree data and current node
//     const [treeData, setTreeData] = useState(initialData);
//     const [currentNodeId, setCurrentNodeId] = useState('start');

//     // Helper function to update node completion status
//     const updateNodeCompletion = (treeNode, nodeId, isCompleted) => {
//         if (treeNode.id === nodeId) {
//             return { ...treeNode, completed: isCompleted };
//         }

//         if (treeNode.children) {
//             return {
//                 ...treeNode,
//                 children: treeNode.children.map(child =>
//                     updateNodeCompletion(child, nodeId, isCompleted)
//                 )
//             };
//         }

//         return treeNode;
//     };

//     // Helper function to mark a node and its path as completed
//     const completeNodeAndPath = (nodeId) => {
//         // Find the path from root to the node
//         const path = findPathToNode(treeData, nodeId);

//         if (path.length === 0) return;

//         // Update each node in the path
//         let updatedData = treeData;
//         for (const id of path) {
//             updatedData = updateNodeCompletion(updatedData, id, true);
//         }

//         setTreeData(updatedData);
//     };

//     // Helper function to find the path from root to a node
//     const findPathToNode = (node, targetId, currentPath = []) => {
//         if (node.id === targetId) {
//             return [...currentPath, node.id];
//         }

//         if (!node.children) {
//             return [];
//         }

//         for (const child of node.children) {
//             const path = findPathToNode(child, targetId, [...currentPath, node.id]);
//             if (path.length > 0) {
//                 return path;
//             }
//         }

//         return [];
//     };

//     // Handler for node clicks
//     const handleNodeClick = (event, nodeId) => {
//         // Get the current node's data
//         const findNode = (node, id) => {
//             if (node.id === id) return node;
//             if (node.children) {
//                 for (const child of node.children) {
//                     const found = findNode(child, id);
//                     if (found) return found;
//                 }
//             }
//             return null;
//         };

//         const node = findNode(treeData, nodeId);

//         // Check if the node is accessible (parent is completed or it's the start node)
//         const parentNode = findParent(treeData, nodeId);
//         const isAccessible =
//             nodeId === 'start' ||
//             (parentNode && parentNode.completed) ||
//             node.completed;

//         if (isAccessible) {
//             setCurrentNodeId(nodeId);
//             completeNodeAndPath(nodeId);
//         } else {
//             console.log("Cannot access this node yet!");
//             // You could show a tooltip or message here
//         }
//     };

//     // Helper function to find a node's parent
//     const findParent = (currentNode, childId, parent = null) => {
//         if (!currentNode.children) return null;

//         for (const child of currentNode.children) {
//             if (child.id === childId) return currentNode;

//             const found = findParent(child, childId, currentNode);
//             if (found) return found;
//         }

//         return null;
//     };

//     // Custom node properties based on completion status and current position
//     const getNodeProps = (node) => {
//         const isCurrent = node.id === currentNodeId;
//         const isCompleted = node.completed;

//         // Determine accessibility
//         const parentNode = findParent(treeData, node.id);
//         const isAccessible =
//             node.id === 'start' ||
//             (parentNode && parentNode.completed) ||
//             node.completed;

//         // Determine fill color based on status
//         let fillColor = '#a0aec0'; // Default gray for unvisited nodes
//         if (!isAccessible) {
//             fillColor = '#e2e8f0'; // Lighter gray for inaccessible nodes
//         } else if (isCompleted) {
//             fillColor = '#48bb78'; // Green for completed nodes
//         }
//         if (isCurrent) {
//             fillColor = '#4299e1'; // Blue for current node
//         }

//         return {
//             rx: 8,
//             ry: 8,
//             width: 160,
//             height: 40,
//             x: -80,
//             y: -20,
//             fill: fillColor,
//             stroke: isCurrent ? '#2b6cb0' : isCompleted ? '#2f855a' : '#718096',
//             strokeWidth: isCurrent ? 3 : 1,
//             className: isAccessible ? 'cursor-pointer transition-all duration-200' : 'cursor-not-allowed transition-all duration-200'
//         };
//     };

//     // Custom path properties to show progress
//     const getPathProps = (node) => {
//         // Path should be highlighted if both source and target are completed
//         const parentCompleted = findParent(treeData, node.id)?.completed || false;
//         const nodeCompleted = node.completed;

//         const isHighlighted = parentCompleted && nodeCompleted;

//         return {
//             stroke: isHighlighted ? '#48bb78' : '#cbd5e0', // Green for completed paths, gray otherwise
//             strokeWidth: isHighlighted ? 2.5 : 1.5,
//             className: 'transition-all duration-200'
//         };
//     };

//     // Effect to mark the initial node as completed
//     useEffect(() => {
//         completeNodeAndPath('start');
//     }, []);

//     return (
//         <div className="p-4">
//             <div className="mb-4 flex space-x-4">
//                 <div className="flex items-center">
//                     <div className="w-4 h-4 bg-green-500 mr-2"></div>
//                     <span>Completed</span>
//                 </div>
//                 <div className="flex items-center">
//                     <div className="w-4 h-4 bg-blue-500 mr-2"></div>
//                     <span>Current Position</span>
//                 </div>
//                 <div className="flex items-center">
//                     <div className="w-4 h-4 bg-gray-400 mr-2"></div>
//                     <span>Available</span>
//                 </div>
//                 <div className="flex items-center">
//                     <div className="w-4 h-4 bg-gray-200 mr-2"></div>
//                     <span>Locked</span>
//                 </div>
//             </div>

//             <Tree
//                 data={treeData}
//                 height={600}
//                 width={800}
//                 nodeShape="rect"
//                 keyProp="id"
//                 labelProp="name"
//                 nodeProps={getNodeProps}
//                 pathProps={getPathProps}
//                 textProps={{
//                     dy: 5,
//                     fill: 'white',
//                     textAnchor: 'middle',
//                     fontWeight: 'bold',
//                     className: 'select-none'
//                 }}
//                 gProps={{
//                     className: 'node',
//                     onClick: handleNodeClick
//                 }}
//             />

//             <div className="mt-4 p-3 bg-gray-100 rounded-md">
//                 <p className="font-semibold">Current Node: {currentNodeId}</p>
//                 <p className="text-sm text-gray-600">Click on accessible nodes to progress through the tree.</p>
//             </div>
//         </div>
//     );
// }

// export default DynamicTreeProgress;

function TreeWithProgress() {
    // Sample data with progress tracking
    const data = {
        name: 'Start Game',
        id: 'start',
        completed: true, // This node is completed
        children: [{
            name: 'Choose Character',
            id: 'character',
            completed: true, // This node is completed
            children: [{
                name: 'Warrior',
                id: 'warrior',
                completed: true, // This node is completed
            }, {
                name: 'Mage',
                id: 'mage',
                completed: false, // Not completed
            }]
        }, {
            name: 'Tutorial',
            id: 'tutorial',
            completed: false, // Not completed
            children: [{
                name: 'Basic Controls',
                id: 'controls',
                completed: false, // Not completed
            }]
        }]
    };

    // Current node (where the user is now)
    const currentNodeId = 'warrior';

    // Handler for node clicks
    const handleNodeClick = (event, nodeId) => {
        console.log(`Node clicked: ${nodeId}`);
        // Here you would implement navigation or actions
    };

    // Custom node properties based on completion status and current position
    const getNodeProps = (node) => {
        const isCurrent = node.id === currentNodeId;
        const isCompleted = node.completed;

        // Determine fill color based on status
        let fillColor = '#a0aec0'; // Default gray for unvisited nodes
        if (isCompleted) {
            fillColor = '#48bb78'; // Green for completed nodes
        }
        if (isCurrent) {
            fillColor = '#4299e1'; // Blue for current node
        }

        return {
            rx: 8,
            ry: 8,
            width: 160,
            height: 40,
            x: -80,
            y: -20,
            fill: fillColor,
            stroke: isCurrent ? '#2b6cb0' : isCompleted ? '#2f855a' : '#718096',
            strokeWidth: isCurrent ? 3 : 1,
            className: 'cursor-pointer transition-all duration-200'
        };
    };

    // Custom path properties to show progress
    const getPathProps = (node) => {
        // Path should be highlighted if both source and target are completed
        const parentCompleted = findParent(data, node.id)?.completed || false;
        const nodeCompleted = node.completed;

        const isHighlighted = parentCompleted && nodeCompleted;

        return {
            stroke: isHighlighted ? '#48bb78' : '#cbd5e0', // Green for completed paths, gray otherwise
            strokeWidth: isHighlighted ? 2.5 : 1.5,
            className: 'transition-all duration-200'
        };
    };

    // Helper function to find a node's parent
    const findParent = (currentNode, childId, parent = null) => {
        if (!currentNode.children) return null;

        for (const child of currentNode.children) {
            if (child.id === childId) return currentNode;

            const found = findParent(child, childId, currentNode);
            if (found) return found;
        }

        return null;
    };

    return (
        <div className="p-4">
            <div className="mb-4 flex space-x-4">
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 mr-2"></div>
                    <span>Completed</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 mr-2"></div>
                    <span>Current Position</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-400 mr-2"></div>
                    <span>Not Visited</span>
                </div>
            </div>

            <Tree
                data={data}
                height={600}
                width={800}
                nodeShape="rect"
                keyProp="id"
                labelProp="name"
                nodeProps={getNodeProps}
                pathProps={getPathProps}
                textProps={{
                    dy: 5,
                    fill: 'white',
                    textAnchor: 'middle',
                    fontWeight: 'bold',
                    className: 'select-none'
                }}
                gProps={{
                    className: 'node',
                    onClick: handleNodeClick
                }}
            />
        </div>
    );
}

export default TreeWithProgress;
