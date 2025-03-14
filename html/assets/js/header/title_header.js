/*
** EPITECH PROJECT, 2024
** epickup
** File description:
** title_header.js
*/

function title_header() {
    let html = "";
    html += '<div class="title_header">';
    html += `<img src="${logo_img}" alt="Image" class="header_image">`;
    html += '<div class="header_text">';
    html += '<p class="header_line1">First line of text</p>';
    html += '<p class="header_line2">Second line of text</p>';
    html += '</div>';
    html += '</div>';
    return html;
}
