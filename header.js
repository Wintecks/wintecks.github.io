document.getElementById('header').innerHTML =
`
    <div class="logo">
        <a href="/" class="header_text">
            Wi<span style="color: #238636;">n</span>tecks
        </a>
    </div>
        <button id="menu_btn" class="green_btn">
            ☰
        </button>
    <div id="header_cont">
        <a class="header_text" href="/games">Games</a>
        <a class="header_text" href="/utils">Utils</a>
    </div>
`

document.getElementById('mub_btn_header').innerHTML = `
    <a class="header_text" href="/games">Games</a>
    <a class="header_text" href="/utils">Utils</a>
`

document.addEventListener('DOMContentLoaded', () => {
    mub_btn_header = document.getElementById('mub_btn_header')
    document.getElementById('menu_btn').addEventListener('click', () => {

        if (mub_btn_header.classList.contains('none')) {
            mub_btn_header.classList.toggle('none')
            mub_btn_header.classList.toggle('visible')
        } else {
            mub_btn_header.classList.toggle('no')
            setTimeout(() => {
                mub_btn_header.classList.toggle('visible')
                mub_btn_header.classList.toggle('no')
                mub_btn_header.classList.toggle('none')
            }, 1000);
        }
    });
});