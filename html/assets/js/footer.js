/*
** EPITECH PROJECT, 2024
** epickup
** File description:
** footer.js
*/

function footer() {
    let html = "";
    html += footer_menu();
    // html += footer_bottom();
    document.querySelector("footer").innerHTML = html;
}

document.addEventListener('DOMContentLoaded', footer);
