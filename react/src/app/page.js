'use client';

import React from 'react';
import { Tab, Container, Nav } from 'react-bootstrap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Home from './home'
import Adolescents from './adolescents'
import Avatar from './avatar'
import Shop from './shop'

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="p-4 bg-blue-50">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-blue-800">A B</span>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-blue-800">AsperBoard</span>
              <span className="text-sm italic text-blue-600">Navigating in a neuro-typical maze</span>
            </div>
          </div>
          <Tab.Container id="left-tabs-example" defaultActiveKey="home">
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="home" className="text-blue-700 hover:text-blue-900">home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="adolescents" className="text-blue-700 hover:text-blue-900">adolescents</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="avatar" className="text-blue-700 hover:text-blue-900">avatar</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="shop" className="text-blue-700 hover:text-blue-900">shop</Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link eventKey="parents" className="text-blue-700 hover:text-blue-900">parents</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="about" className="text-blue-700 hover:text-blue-900">about</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="pricing" className="text-blue-700 hover:text-blue-900">pricing</Nav.Link>
              </Nav.Item> */}
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="home">
                <Home/>
              </Tab.Pane>
              <Tab.Pane eventKey="adolescents">
                <Adolescents/>
              </Tab.Pane>
              <Tab.Pane eventKey="avatar">
                {/* Envelopper Avatar avec DndProvider */}
                <DndProvider backend={HTML5Backend}>
                  <Avatar />
                </DndProvider>
              </Tab.Pane>
              <Tab.Pane eventKey="shop">
                {/* Envelopper Avatar avec DndProvider */}
                <DndProvider backend={HTML5Backend}>
                  <Shop />
                </DndProvider>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </header>

      {/* Footer */}
      <footer className="bg-blue-800 text-white p-4 mt-auto">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">© 2025 AsperBoard. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-200">Terms</a>
              <a href="#" className="text-white hover:text-blue-200">Privacy</a>
              <a href="#" className="text-white hover:text-blue-200">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
