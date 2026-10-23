#!/usr/bin/env python3
"""Gera o site publicado a partir dos três protótipos originais da XOX.

O GitHub Pages publica `site/`, não a raiz do repositório. Este script
injeta os 3 catálogos no HTML real e copia os assets para `site/`.
Sem dependências externas; execução automática no workflow de deploy.
"""
from __future__ import annotations

import re
import shutil
from pathlib import Path

BASE = Path(__file__).resolve().parents[1]
SITE = BASE / 'site'
SCRIPTS = BASE / 'scripts'
DRIVE = 'https://drive.google.com/file/d/1HCCGktYftEY3dqmyj49eFKGU0VGF2S8l/view?usp=drive_link'
ROLE_IDS = (
    'menu-title', 'spotlight-eyebrow', 'spotlight-title', 'spotlight-copy',
    'menu-search', 'search-clear', 'category-list', 'menu-count',
    'menu-grid', 'menu-empty', 'clear-filters',
)


def required(path: Path) -> str:
    if not path.is_file():
        raise FileNotFoundError(f'Arquivo necessário não encontrado: {path.relative_to(BASE)}')
    return path.read_text(encoding='utf-8')


def panel_template(root_html: str, number: int) -> str:
    anchor = '<section id="cardapio" class="catalog-section section">'
    pos = root_html.find(anchor)
    if pos == -1:
        raise ValueError('Catálogo não encontrado em index.html da raiz')
    end = root_html.find('</section>', pos)
    if end == -1:
        raise ValueError('Catálogo raiz sem fechamento de section')
    panel = root_html[pos:end + len('</section>')]
    panel = panel.replace(anchor, f'<section id="catalogo-v{number}" class="catalog-section xox-catalog section-pad">', 1)
    for role in ROLE_IDS:
        panel = panel.replace(f'id="{role}"', f'data-role="{role}"')
    if number == 2:
        panel = panel.replace('Encontre seu<br><em>próximo favorito.</em>', 'Escolha com calma.<br><em>Fique mais um pouco.</em>')
        panel = panel.replace('Worth a<br><em>closer look.</em>', 'Sabores para<br><em>ficar sem pressa.</em>')
    elif number == 3:
        panel = panel.replace('Encontre seu<br><em>próximo favorito.</em>', 'EAT.<br><em>REPEAT.</em>')
        panel = panel.replace('Worth a<br><em>closer look.</em>', 'THE XOX<br><em>HOT LIST.</em>')
    return panel


def rewrite_links_for_each_design(html: str) -> str:
    for number in (1, 2, 3):
        start_token = f'<article class="design v{number}"'
        start = html.find(start_token)
        stop = (html.find(f'<article class="design v{number + 1}"', start)
                if number < 3 else html.find('</main>', start))
        if start == -1 or stop == -1:
            raise ValueError(f'Não consegui isolar o protótipo v{number} no HTML original')
        chunk = html[start:stop]
        chunk = chunk.replace(f'href="{DRIVE}" target="_blank" rel="noopener noreferrer"', f'href="#catalogo-v{number}"')
        chunk = chunk.replace(f'href="#menu-v{number}"', f'href="#catalogo-v{number}"')
        html = html[:start] + chunk + html[stop:]
    return html


def convert_styles(css: str) -> str:
    # Modais ficam fora dos artigos, com atributo data-concept independente.
    css = re.sub(
        r'body\[data-concept=["\']?(v[123])["\']?\]\s+#product-dialog',
        lambda m: f'#product-dialog[data-concept="{m.group(1)}"]',
        css,
    )
    css = re.sub(
        r'body\[data-concept=["\']?(v[123])["\']?\]',
        lambda m: f'.design.{m.group(1)}',
        css,
    )
    return css


def integrate() -> None:
    site_path = SITE / 'index.html'
    html = required(site_path)
    root = required(BASE / 'index.html')
    if '<!-- XOX CATALOG BUILD -->' not in html:
        for number in (1, 2, 3):
            pat = re.compile(r'(<section class="section-pad" id="menu-v' + str(number) + r'">[\s\S]*?</section>)')
            updated, count = pat.subn(lambda m: m.group(1) + '\n' + panel_template(root, number), html, count=1)
            if count != 1:
                raise ValueError(f'Seção original menu-v{number} não encontrada exatamente uma vez')
            html = updated
        html = rewrite_links_for_each_design(html)
        html = html.replace(f"href:'{DRIVE}'", "href:'#catalogo-v1'", 1)
        # A ação dinâmica do seletor de experiência depende do protótipo selecionado.
        old_action = 'link.href=route.href;link.textContent=route.label;'
        new_action = (
            "link.href=button.dataset.choice==='brunch'?'#catalogo-'+group.closest('.design').id:route.href;"
            "link.textContent=route.label;"
            "link.target=button.dataset.choice==='brunch'?'':'_blank';"
            "link.rel=button.dataset.choice==='brunch'?'':'noopener noreferrer';"
        )
        if old_action not in html:
            raise ValueError('Tratamento do menu dinâmico original não encontrado')
        html = html.replace(old_action, new_action, 1)
        html = html.replace('</head>',
            '  <!-- XOX CATALOG BUILD -->\n'
            '  <link rel="stylesheet" href="catalog.css">\n'
            '  <script src="menu-data.js" defer></script>\n'
            '  <script src="catalog.js" defer></script>\n'
            '</head>', 1)
        old_script_start = '  <script>\n    (()=>{'
        modal = (
            '  <dialog id="product-dialog" aria-label="Detalhes do produto">'
            '<button type="button" class="dialog-close" id="dialog-close" aria-label="Fechar detalhes">✕</button>'
            '<div id="dialog-content"></div></dialog>\n'
        )
        if old_script_start not in html:
            raise ValueError('Script principal do protótipo original não encontrado')
        html = html.replace(old_script_start, modal + old_script_start, 1)
    else:
        print('HTML já contém a integração, conferindo arquivos gerados.')

    if DRIVE in html:
        raise AssertionError('Ainda existe link do Drive no site publicado')
    if len(re.findall(r'class="catalog-section xox-catalog section-pad"', html)) != 3:
        raise AssertionError('O site não contém exatamente três catálogos')
    if len(re.findall(r'<article class="design v[123]"', html)) != 3:
        raise AssertionError('O HTML original dos três protótipos foi alterado de modo inesperado')

    css = convert_styles(required(BASE / 'menu.css')) + '\n'
    css += convert_styles(required(BASE / 'menu-v3.css')) + '\n'
    css += required(SCRIPTS / 'catalog-overrides.css')
    (SITE / 'catalog.css').write_text(css, encoding='utf-8')
    (SITE / 'catalog.js').write_text(required(SCRIPTS / 'catalog.js'), encoding='utf-8')
    shutil.copyfile(BASE / 'menu-data.js', SITE / 'menu-data.js')
    src = BASE / 'assets' / 'menu'
    dest = SITE / 'assets' / 'menu'
    if not src.is_dir():
        raise FileNotFoundError('Pasta assets/menu de fotos não encontrada na raiz')
    shutil.copytree(src, dest, dirs_exist_ok=True)
    photos = list(dest.glob('*.webp'))
    if len(photos) != 21:
        raise AssertionError(f'Esperava 21 fotos reais; encontrei {len(photos)}')
    site_path.write_text(html, encoding='utf-8')
    print('OK: 3 catálogos | 33 itens | 21 fotos | sem links para Drive | saída em site/')


if __name__ == '__main__':
    integrate()
