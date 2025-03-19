/*
** EPITECH PROJECT, 2024
** epickup
** File description:
** CookieManager.jsx
*/

"use client";

import React, { useState } from "react";

const CookieManager = () => {
    const [cookies, setCookies] = useState(document.cookie.split("; ").filter(Boolean));

    const toSeconds = (seconds) => {
        const now = new Date();
        now.setSeconds(now.getSeconds() + seconds);
        return now.toUTCString();
    };

    const toMinute = (minutes) => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + minutes);
        return now.toUTCString();
    };

    const toHour = (hours) => {
        const now = new Date();
        now.setHours(now.getHours() + hours);
        return now.toUTCString();
    };

    const createCookie = (key = "0", value = "0", expires = "", path = "/") => {
        document.cookie = `${key}=${value}; expires=${expires}; path=${path}; samesite=Lax`;
        updateCookies();
    };

    const readCookie = (key) => {
        const name = `${key}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split("; ");
        for (let c of ca) {
            if (c.indexOf(name) === 0) {
                return c.substring(name.length);
            }
        }
        return "";
    };

    const removeCookie = (key) => {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        updateCookies();
    };

    const clearAllCookies = () => {
        const cookiesArray = document.cookie.split("; ");
        cookiesArray.forEach((cookie) => {
            const cookieName = cookie.split("=")[0];
            removeCookie(cookieName);
        });
        alert("Cookies Cleared");
    };

    const countAllCookies = () => {
        return cookies.length;
    };

    const updateCookies = () => {
        setCookies(document.cookie.split("; ").filter(Boolean));
    };

    return (
        <div className="p-4 bg-gray-100 rounded shadow-md">
            <h1 className="text-xl font-bold mb-4">Cookie Manager</h1>
            <div className="mb-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                    onClick={() => createCookie("test", "value", toHour(1))}
                >
                    Create Cookie
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={clearAllCookies}
                >
                    Clear All Cookies
                </button>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Cookies:</h2>
                {cookies.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {cookies.map((cookie, index) => (
                            <li key={index} className="text-gray-700">
                                {cookie}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No accessible cookies found.</p>
                )}
            </div>
            <div>
                <p className="text-gray-700">Total Cookies: {countAllCookies()}</p>
            </div>
        </div>
    );
};

export default CookieManager;
