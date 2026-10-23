# XOX Coffeeclub — catálogo v3

Esta é uma **versão reconstruída do deploy público** com o cardápio no próprio site e **três direções visuais próprias**: Daylight Radio (editorial/azul), Sunday Social (quente/arcos) e Afterparty (pôster/acid). A versão anterior do GitHub Pages continuava apontando para o Drive porque os arquivos novos ainda não estavam publicados.

## PUBLICAÇÃO — IMPORTANTE

1. Extraia este ZIP. **Substitua o `index.html` da raiz** do seu repositório pelo arquivo fornecido. Se não substituir esse arquivo, os antigos botões continuarão abrindo o Drive.
2. Coloque junto, na raiz, `app.js`, `menu-data.js`, `mobile-first.css`, `menu.css`, `menu-v3.css` e a pasta `assets/menu/` (com os 21 arquivos .webp).
3. Faça commit/push na branch que publica GitHub Pages. Confira em Settings → Pages se o site usa essa mesma branch e a pasta `/ (root)`.
4. Aguarde o deploy do GitHub Pages terminar e atualize o navegador com Ctrl+Shift+R.
5. Clique em “Cardápio” na navegação, no hero e no rodapé. Todos agora direcionam à âncora **`#cardapio`**, dentro da própria página.

**Observação:** o repositório `oluisvi/xox-coffeeclub-conceito` não estava acessível para leitura no ambiente e a versão foi reconstruída da vitrine pública, por isso este ZIP **não é clone fiel** dos arquivos privados do repositório. Se você quiser preservar literalmente o HTML atual das três páginas originais, é necessário fornecer uma cópia do código privado. Não misture trechos de `index.html` antigos com novos: substitua-o por completo caso queira usar esta versão reconstruída.

## Visual dos três protótipos

- **01 / Daylight Radio:** cards clean e retangulares, gradientes azuis, fotos de aspecto editorial e destaques escalonados.
- **02 / Sunday Social:** paleta quente, fotografias e cards em arco, serifas elegantes, ambientação de brunch.
- **03 / Afterparty:** cards quadrados com bordas pesadas, amarelo ácido, tipografia de pôster, sombras gráficas e composições assimétricas.

A troca de protótipo mantém o mesmo catálogo, filtros e detalhes, apenas alterando apresentação e textos de apoio.

## O que foi implementado

- 33 produtos reais, 2 adicionais, preços do PDF fornecido.
- 21 fotos de produtos extraídas e otimizadas do PDF, sem gerar fotos fictícias.
- Busca por nome e ingrediente, 7 filtros com contadores, botão de limpar e mensagens vazias.
- Destaques clicáveis com modal de produto, navegação por teclado (incluindo `/` para busca).
- Todos os links de cardápio internos apontam para `#cardapio`, e não para o Drive. iFood e WhatsApp são links externos legítimos.
- Design responsivo e suporte a `prefers-reduced-motion`.

### Fotos

O tratamento inclui reamostragem, contraste e nitidez. Os arquivos do PDF original têm resolução limitada e o tratamento não cria detalhes autênticos que não estejam na fonte.

### Checagem local

Execute `python -m http.server 8000` na pasta e abra `http://localhost:8000`. A versão reconstruída é HTML/CSS/JS estáticos, sem build nem dependências npm.
