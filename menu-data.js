// Fonte: CARDAPIO FINAL XOX - COM FOTOS (1).pdf (duas páginas).
// Itens sem fotografia no PDF NÃO recebem foto artificial.
window.XOX_MENU = [
['Blueberry Matcha',22,'Signatures','blueberry-matcha'],['Strawberry Matcha',22,'Signatures','strawberry-matcha'],['Passionfruit Matcha',22,'Signatures','passionfruit-matcha'],
['Caramel Latte',18,'Signatures','caramel-latte'],['Chocolate Latte',18,'Signatures','chocolate-latte'],['Marshmallow Latte',18,'Signatures','marshmallow-latte'],
['Cappuccino',16,'Signatures','cappuccino'],['Matcha Latte',16,'Signatures','matcha-latte'],['Espresso Tônica',16,'Signatures','espresso-tonica'],
['Espresso',8,'Classics'],['Espresso duplo',12,'Classics'],['Americano',10,'Classics'],['Passado do dia',8,'Classics'],
['Golden Hour',28,'Drinks'],['Aperol Spritz',28,'Drinks'],['Gin Tonic',25,'Drinks'],['Negroni',28,'Drinks'],
['Cerveja Long',18,'Bebidas'],['Espumante Suspeito',80,'Bebidas'],['Vinho Georgian Sun',150,'Bebidas'],['Água',6,'Bebidas'],
['Toast Salmão',38,'Brunch','toast-salmao','Pão tostado, cream cheese, gravlax (salmão curado), pasta de avocado e cebolinha.'],
['Toast Avocado',34,'Brunch','toast-avocado','Pão tostado, creme azedo, avocado, pasta de avocado, gergelim e cebolinha.'],
['Toast Cogumelos',30,'Brunch','toast-cogumelos','Pão tostado, ovos mexidos, creme azedo, cogumelos salteados, pasta de avocado e cebolinha.'],
['Toast Bacon Eggs',28,'Brunch','toast-bacon-eggs','Pão tostado, ovo mexido, bacon, pasta de avocado e cebolinha.'],
['Croissant Caprese',24,'Brunch','croissant-caprese','Creme azedo, rúcula, tomate confit, cebola roxa e cebolinha.'],
['Croissant Peito de Peru',26,'Brunch','croissant-peito-peru','Creme azedo, rúcula, peito de peru, tomate confit, cebola roxa e cebolinha.'],
['Bagel Breakfast',24,'Brunch','bagel-breakfast','Presunto, queijo, ovo pochê e cebolinha verde.'],
['Pizzas Artesanais',26,'Brunch','pizzas-artesanais','Calabresa: mussarela, cebola roxa e orégano. Ou Caprese: mussarela, tomate-cereja e manjericão.'],
['Cheesecake',22,'Doces','cheesecake','Massa crocante, cream cheese e calda de frutas vermelhas.'],
['Cheesecake Chocolate',22,'Doces','cheesecake-chocolate','Massa crocante, cream cheese e chocolate meio amargo.'],
['Brownie com Sorvete',24,'Doces','brownie-sorvete','Brownie de chocolate, sorvete de creme e crocante de nozes.'],
['Cookie de Chocolate',14,'Doces','cookie-chocolate','Massa amanteigada com gotas de chocolate.']
].map(([name,price,category,photo,description],index)=>({id:index+1,name,price,category,image:photo?`assets/menu/${photo}.webp`:null,description:description||''}));
