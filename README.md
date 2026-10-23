# XOX Coffeeclub — catálogo integrado

Versão estática do site conceitual com **três direções visuais** (Daylight Radio, Sunday Social, Afterparty) e cardápio completo integrado à própria página.

## Instalação

Coloque `index.html`, `app.js`, `menu-data.js`, `mobile-first.css`, `menu.css` e a pasta `assets/menu/` na raiz do projeto publicado no GitHub Pages. **Preserve outros arquivos do repositório**. Acesse o site normalmente. A versão foi reconstruída a partir do deploy público, pois o repositório de origem não estava acessível para leitura neste ambiente. O ZIP NÃO representa um clone integral do GitHub.

## Cardápio

- 33 produtos e 2 adicionais extraídos do PDF fornecido; preços em BRL.
- 21 fotografias reais do próprio PDF, tratadas com ajuste moderado de contraste, cor, nitidez e reamostragem para 620 × 750 px. Reamostragem não recupera detalhes inexistentes no original.
- Produtos que não têm foto no PDF aparecem com arte tipográfica, claramente distinta de fotografias.
- Filtros por Signatures, Classics, Brunch, Doces, Drinks e Bebidas; busca tolerante a acentos por nome, categoria e ingredientes; detalhes em modal.
- Todos os botões de cardápio internos levam para `#cardapio`, sem direcionar ao Google Drive.
- Fotos conceituais do ambiente continuam apontando para o deploy público existente. Se for importante rodar 100% offline, copie esses arquivos da pasta `assets` da versão original e altere os três URLs absolutos no HTML.
- Não há checkout falso. O botão de pedido abre o iFood existente.

## Conferências antes de publicar

1. Comparar os preços com o cardápio atualizado da loja.
2. Conferir o corte das 21 imagens (o PDF já continha as fotos pequenas).
3. Testar `index.html` pelo GitHub Pages ou servidor local (`python -m http.server 8000`).
4. Ao transferir para o repositório, fazer commit em uma branch e conferir os três designs antes de sobrescrever a página publicada.

**Nota:** conteúdo do cardápio fiel ao PDF fornecido; pequenas correções de digitação de ingredientes e pontuação foram aplicadas. Projeto conceitual, não oficial.
