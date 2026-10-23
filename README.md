# XOX Coffeeclub — correção definitiva do catálogo no GitHub Pages

Este pacote foi preparado **após inspeção do repositório público real** `oluisvi/xox-coffeeclub-conceito`.

## A causa do problema

O workflow `.github/workflows/deploy.yml` publica **`site/`** como artefato do GitHub Pages. As versões anteriores alteravam `index.html`, CSS, JS e `assets/menu/` **na raiz**, por isso não apareciam no site online. O `site/index.html` continuava apontando para o Drive.

## Como aplicar (apenas uma vez)

1. Extraia o ZIP na **raiz do repositório** `xox-coffeeclub-conceito`.
2. Preserve o caminho das pastas. **Substitua `.github/workflows/deploy.yml`** pelo arquivo do ZIP e adicione a pasta `scripts/`.
3. Mantenha os arquivos originais do repositório, em especial `site/index.html`, `index.html`, `menu.css`, `menu-v3.css`, `menu-data.js` e `assets/menu/` (já estão no repo público).
4. Faça commit e push para `main`.
5. Em **GitHub → Actions → Deploy to GitHub Pages**, confirme que a execução ficou verde. O workflow, antes de publicar `site/`, roda `python3 scripts/integrate_catalog.py`.
6. Abra `https://oluisvi.github.io/xox-coffeeclub-conceito/` e atualize com `Ctrl + Shift + R`. Confira o cardápio nos três designs.

> **Não** altere as configurações do Pages para `/(root)`. O workflow continuará publicando `site/`, agora com o catálogo integrado de forma correta.

## O que o build faz

- Preserva o HTML original das três páginas: **Daylight Radio, Sunday Social e Afterparty**.
- Acrescenta uma seção de catálogo em **cada protótipo**, aproveitando os estilos premium existentes na raiz (`menu.css`, `menu-v3.css`).
- Converte os estilos `body[data-concept=v2/v3]` para `.design.v2/.design.v3`, compatíveis com o mecanismo original de alternância entre páginas.
- Troca os links da página ao PDF no Drive por âncoras internas `#catalogo-v1`, `#catalogo-v2`, `#catalogo-v3`, inclusive o seletor interativo de experiências.
- Copia `menu-data.js` e as **21 fotos WebP** de `assets/menu/` para a pasta publicada `site/assets/menu/`.
- Ativa o catálogo de **33 produtos**, os **2 adicionais**, busca por ingredientes, 7 filtros com contadores, destaques, cards e modal de detalhes.
- Mantém links externos legítimos (Instagram, iFood, Maps e WhatsApp).

## Rodar o build localmente (opcional)

Na raiz do repositório:

```bash
python3 scripts/integrate_catalog.py
cd site
python3 -m http.server 8000
```

Abra http://localhost:8000. O script é idempotente: ao executá-lo outra vez, reconhece o catálogo já injetado e apenas refaz a verificação/cópia de arquivos.

## Conteúdo do ZIP

```text
.github/workflows/deploy.yml        # publica site/ após o build
scripts/integrate_catalog.py       # patch idempotente do site original
scripts/catalog.js                 # catálogo com busca, filtro e modal
scripts/catalog-overrides.css      # integração estética dos 3 protótipos
README.md                          # instruções
```

**Observação:** o código Python modifica `site/index.html` somente na cópia do checkout usada pela Action, não no commit original do GitHub. Se quiser que a versão publicada apareça também como HTML gerado dentro do repositório, rode o comando local e faça commit do resultado após revisar.
