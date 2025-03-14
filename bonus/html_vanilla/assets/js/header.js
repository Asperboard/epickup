/*
** EPITECH PROJECT, 2024
** epickup
** File description:
** header.js
*/

function header() {
    let html = "";
    html += black_header_strip();
    html += title_header();
    html += header_menu();
    document.querySelector("header").innerHTML = html;
}

document.addEventListener('DOMContentLoaded', header);
