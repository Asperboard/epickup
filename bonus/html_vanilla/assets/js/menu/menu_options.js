/*
** EPITECH PROJECT, 2024
** epickup
** File description:
** menu_options.js
*/

function menu_options() {
    const origin_domain = window.location.origin;
    let html = "";
    html += `<a href="${origin_domain}/">Home</div>`;
    html += `<a href="${origin_domain}/adolescents">Adolescents</div>`;
    html += `<a href="${origin_domain}/parents">Parents</div>`;
    html += `<a href="${origin_domain}/a_propos">A propos</div>`;
    html += `<a href="${origin_domain}/prix">Prix</div>`;
    return html;
}
