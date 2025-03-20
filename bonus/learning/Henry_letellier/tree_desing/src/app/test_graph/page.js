/*
** EPITECH PROJECT, 2024
** epickup
** File description:
** test_graph.js
*/

"use client";

import React, { useState } from 'react';
import { Tree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';

const CustomTreeGraph = () => {
    // Sample tree data - replace with your own structure
    const [treeData, setTreeData] = useState({
        name: 'Root',
        children: [
            {
                name: 'Child 1',
                children: [
                    { name: 'Grandchild 1.1' },
                    { name: 'Grandchild 1.2' }
                ]
            },
            {
                name: 'Child 2',
                children: [
                    { name: 'Grandchild 2.1' },
                    { name: 'Grandchild 2.2' }
                ]
            }
        ]
    });

    // Path function options
    const pathTypes = {
        diagonal: 'diagonal',
        elbow: 'elbow',
        straight: 'straight',
        curve: 'curve'
    };

    // Configuration options
    const [config, setConfig] = useState({
        nodeRadius: 10,           // Size of the node circle
        nodeFontSize: 12,         // Text size for node labels
        nodeBorderWidth: 1.5,     // Border width for nodes
        nodeStrokeColor: '#333',  // Border color for nodes
        nodeFillColor: '#fff',    // Fill color for nodes
        nodeTextColor: '#333',    // Text color for nodes

        linkStrokeWidth: 1.5,     // Width of the connecting lines
        linkShapeType: 'diagonal', // 'diagonal', 'elbow', 'straight', 'curve'
        linkStrokeColor: '#999',  // Color of the connecting lines

        height: 400,              // Height of the tree component
        width: 600,               // Width of the tree component

        margins: { top: 20, bottom: 20, left: 40, right: 40 }, // Margins around the tree

        // Features to enable/disable
        enableLegacyTransitions: false,  // Disable legacy transitions
        animated: true,                  // Enable/disable animations
        enableDrag: false,               // Enable/disable node dragging
        enableHover: false,              // Enable/disable hover effects
        enableSelection: false,          // Enable/disable node selection

        svgProps: {
            className: 'custom-tree-svg',
            transform: 'rotate(0)',        // Rotate the tree if needed
        },

        leafNodeClassName: 'leaf-node',  // CSS class for leaf nodes
        branchNodeClassName: 'branch-node', // CSS class for branch nodes
    });

    // Custom node rendering (optional)
    const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => (
        <g>
            <circle r={config.nodeRadius} fill={config.nodeFillColor} stroke={config.nodeStrokeColor} strokeWidth={config.nodeBorderWidth} />
            <text
                className="node-label"
                textAnchor="middle"
                dy=".35em"
                fill={config.nodeTextColor}
                fontSize={config.nodeFontSize}
                fontFamily="Arial"
            >
                {nodeDatum.name}
            </text>
            {/* Optionally render children count badge */}
            {nodeDatum.children && nodeDatum.children.length > 0 && (
                <text
                    className="children-count"
                    textAnchor="middle"
                    dy="-1.2em"
                    fill="#999"
                    fontSize={10}
                >
                    ({nodeDatum.children.length})
                </text>
            )}
        </g>
    );

    return (
        <div className="tree-container p-4 bg-gray-50 rounded-lg shadow-sm">
            <div className="controls mb-4">
                <h3 className="text-lg font-medium mb-2">Tree Customization</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Link Type</label>
                        <select
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={config.linkShapeType}
                            onChange={(e) => setConfig({ ...config, linkShapeType: e.target.value })}
                        >
                            <option value="diagonal">Diagonal</option>
                            <option value="elbow">Elbow</option>
                            <option value="straight">Straight</option>
                            <option value="curve">Curve</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Animation</label>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-blue-600"
                                checked={config.animated}
                                onChange={(e) => setConfig({ ...config, animated: e.target.checked })}
                            />
                            <span className="ml-2">Enable Animation</span>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Node Size</label>
                        <input
                            type="range"
                            min="5"
                            max="20"
                            value={config.nodeRadius}
                            onChange={(e) => setConfig({ ...config, nodeRadius: parseInt(e.target.value) })}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            <div className="relative" style={{ height: config.height }}>
                <Tree
                    data={treeData}
                    height={config.height}
                    width={config.width}
                    margins={config.margins}
                    svgProps={config.svgProps}

                    // Connect options from our config
                    nodeRadius={config.nodeRadius}
                    nodeSize={config.nodeRadius * 2}
                    nodeLabelFontSize={config.nodeFontSize}

                    orientation="vertical"
                    pathFunc={config.linkShapeType}

                    transitionDuration={config.animated ? 500 : 0}

                    enableLegacyTransitions={config.enableLegacyTransitions}

                    // Optional custom renderers
                    renderCustomNodeElement={renderCustomNodeElement}

                    // Optional handlers
                    onClickNode={config.enableSelection ? (nodeId, node) => {
                        console.log('Node clicked:', nodeId, node);
                    } : undefined}

                    // Disable features as requested
                    shouldCollapseNeighborNodes={false}

                    // Class names for styling
                    gProps={{
                        className: 'node-container'
                    }}
                    textProps={{
                        className: 'node-text'
                    }}
                />
            </div>

            <style jsx>{`
        .link {
          stroke: ${config.linkStrokeColor};
          stroke-width: ${config.linkStrokeWidth}px;
          fill: none;
        }
        
        .custom-tree-svg {
          overflow: visible;
        }
        
        .node-label {
          pointer-events: none;
        }
        
        .children-count {
          pointer-events: none;
        }
      `}</style>
        </div>
    );
};

// export default CustomTreeGraph;

// function exampleTreeCode() {
//     let data = {
//         name: 'Parent',
//         children: [{
//             name: 'Child One'
//         }, {
//             name: 'Child Two'
//         }]
//     };

//     return (
//         <Tree
//             data={data}
//             height={400}
//             width={400}
//             animated={true}
//         />
//     );
// }

// export default exampleTreeCode;

function TreeWithButtons() {
    // State to track which node is being hovered
    const [hoveredNode, setHoveredNode] = useState(null);

    const data = {
        name: 'Start Game',
        id: 'start',
        action: 'startGame', // Custom action identifier
        children: [{
            name: 'Choose Character',
            id: 'character',
            action: 'selectCharacter'
        }, {
            name: 'View Tutorial',
            id: 'tutorial',
            action: 'showTutorial'
        }, {
            name: 'Settings',
            id: 'settings',
            action: 'openSettings',
            children: [{
                name: 'Audio Settings',
                id: 'audio',
                action: 'adjustAudio'
            }, {
                name: 'Display Settings',
                id: 'display',
                action: 'adjustDisplay'
            }]
        }]
    };

    // Handler for node actions
    const handleNodeClick = (event, nodeId) => {
        // Find the node by ID
        const findNodeById = (currentNode, id) => {
            if (currentNode.id === id) return currentNode;
            if (currentNode.children) {
                for (const child of currentNode.children) {
                    const found = findNodeById(child, id);
                    if (found) return found;
                }
            }
            return null;
        };

        const node = findNodeById(data, nodeId);
        if (node && node.action) {
            console.log(`Action triggered: ${node.action}`);
            // Here you would implement the actual actions
            // For example:
            switch (node.action) {
                case 'startGame':
                    alert('Game started!');
                    break;
                case 'selectCharacter':
                    alert('Character selection screen');
                    break;
                // Add other cases as needed
                default:
                    alert(`Action: ${node.action}`);
            }
        }
    };

    // Custom getNodeKey and getNodeLabel functions
    const getNodeKey = node => node.id;
    const getNodeLabel = node => node.name;

    // Custom node properties based on hover state
    const getNodeProps = (node) => {
        const isHovered = node.id === hoveredNode;

        return {
            rx: 8,
            ry: 8,
            width: 160,
            height: 40,
            x: -80,
            y: -20,
            fill: isHovered ? '#3182ce' : '#4299e1', // Darker blue when hovered
            stroke: '#2b6cb0',
            strokeWidth: isHovered ? 2 : 1,
            className: 'cursor-pointer transition-all duration-200 ease-in-out'
        };
    };

    return (
        <div className="p-4">
            <Tree
                data={data}
                height={600}
                width={800}
                nodeShape="rect"
                keyProp="id"
                labelProp="name"
                nodeProps={getNodeProps}
                textProps={{
                    dy: 5,
                    fill: 'white',
                    textAnchor: 'middle',
                    fontWeight: 'bold',
                    className: 'select-none pointer-events-none'
                }}
                gProps={{
                    className: 'node',
                    onClick: handleNodeClick,
                    onMouseEnter: (_, nodeId) => setHoveredNode(nodeId),
                    onMouseLeave: () => setHoveredNode(null)
                }}
                pathProps={{
                    className: 'link',
                    stroke: '#000000FF', // Tailwind gray-500
                    strokeWidth: 2
                }}
            />
        </div>
    );
}

export default TreeWithButtons;

