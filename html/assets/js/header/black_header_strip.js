/*
** EPITECH PROJECT, 2024
** epickup
** File description:
** black_header_strip.js
*/

function black_header_strip() {
    let html = "";
    html += '<section class="header-contacts">\n';
    html += '   <div style="display:flex;flex-align: left;">\n';
    html += '       <p>CONTACT</p>\n';
    html += '   </div>\n';
    html += `  <div class="header-socials">\n`;
    html += `      <a href="${in_link}" target="_blank">${in_svg}</a>\n`;
    html += `      <a href="${insta_link}" target="_blank">${insta_svg}</a>\n`;
    html += `  </div>\n`;
    html += '</section>\n';
    return html;
}
