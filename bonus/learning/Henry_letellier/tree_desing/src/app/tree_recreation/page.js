/*
** EPITECH PROJECT, 2024
** epickup
** File description:
** page.js
*/

"use client";
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CustomTreeGraph = ({ data }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!data || !svgRef.current) return;

        // Clear previous rendering
        d3.select(svgRef.current).selectAll("*").remove();

        // Define dimensions and margins
        const margin = { top: 20, right: 90, bottom: 30, left: 90 };
        const width = 800 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        // Create SVG element
        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Create the tree layout
        const treeLayout = d3.tree().size([height, width]);

        // Create the root node
        const root = d3.hierarchy(data);

        // Assign positions to nodes
        treeLayout(root);

        // Create links
        const link = svg.selectAll(".link")
            .data(root.links())
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x))
            .attr("fill", "none")
            .attr("stroke", d => d.target.data.completed ? "#48bb78" : "#cbd5e0")
            .attr("stroke-width", d => d.target.data.completed ? 2 : 1);

        // Create node groups
        const node = svg.selectAll(".node")
            .data(root.descendants())
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.y},${d.x})`)
            .attr("cursor", "pointer")
            .on("click", (event, d) => {
                if (typeof d.data.onClick === 'function') {
                    d.data.onClick(d.data.id);
                }
            });

        // Add rectangles for nodes
        node.append("rect")
            .attr("width", 120)
            .attr("height", 40)
            .attr("rx", 8)
            .attr("ry", 8)
            .attr("x", -60)
            .attr("y", -20)
            .attr("fill", d => {
                if (d.data.current) return "#4299e1"; // Current node
                if (d.data.completed) return "#48bb78"; // Completed node
                return "#a0aec0"; // Regular node
            })
            .attr("stroke", d => {
                if (d.data.current) return "#2b6cb0"; // Current node
                if (d.data.completed) return "#2f855a"; // Completed node
                return "#718096"; // Regular node
            })
            .attr("stroke-width", d => d.data.current ? 2 : 1);

        // Add text labels
        node.append("text")
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("font-weight", "bold")
            .attr("pointer-events", "none")
            .text(d => d.data.name);

        // Add buttons/links if specified
        node.each(function (d) {
            if (d.data.buttons) {
                const buttonGroup = d3.select(this).append("g")
                    .attr("transform", "translate(0, 25)");

                d.data.buttons.forEach((button, index) => {
                    const buttonWidth = 50;
                    const spacing = 5;
                    const totalWidth = (buttonWidth + spacing) * d.data.buttons.length - spacing;
                    const startX = -totalWidth / 2;

                    buttonGroup.append("rect")
                        .attr("width", buttonWidth)
                        .attr("height", 20)
                        .attr("rx", 4)
                        .attr("ry", 4)
                        .attr("x", startX + index * (buttonWidth + spacing))
                        .attr("y", 0)
                        .attr("fill", "#4299e1")
                        .attr("cursor", "pointer")
                        .on("click", (event) => {
                            event.stopPropagation();
                            if (typeof button.onClick === 'function') {
                                button.onClick();
                            }
                        });

                    buttonGroup.append("text")
                        .attr("x", startX + index * (buttonWidth + spacing) + buttonWidth / 2)
                        .attr("y", 10)
                        .attr("dy", "0.35em")
                        .attr("text-anchor", "middle")
                        .attr("fill", "white")
                        .attr("font-size", "10px")
                        .attr("pointer-events", "none")
                        .text(button.label);
                });
            }
        });

    }, [data]);

    return (
        <div className="custom-tree-container">
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default function TreeDemo() {
    // Sample data with progress tracking
    const gameData = {
        name: "Start Game",
        id: "start",
        completed: true,
        current: true,
        buttons: [
            { label: "Info", onClick: () => alert("Game info") },
            { label: "Reset", onClick: () => alert("Game reset") }
        ],
        children: [
            {
                name: "Choose Character",
                id: "character",
                completed: true,
                current: false,
                onClick: (id) => alert(`Node clicked: ${id}`),
                children: [
                    {
                        name: "Warrior",
                        id: "warrior",
                        completed: false,
                        onClick: (id) => alert(`Node clicked: ${id}`)
                    },
                    {
                        name: "Mage",
                        id: "mage",
                        completed: false,
                        onClick: (id) => alert(`Node clicked: ${id}`)
                    }
                ]
            },
            {
                name: "Tutorial",
                id: "tutorial",
                completed: false,
                onClick: (id) => alert(`Node clicked: ${id}`),
                children: [
                    {
                        name: "Basic Controls",
                        id: "controls",
                        completed: false,
                        onClick: (id) => alert(`Node clicked: ${id}`)
                    }
                ]
            }
        ]
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Game Progress Tree</h1>
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
            <CustomTreeGraph data={gameData} />
        </div>
    );
}
