# Gemmo Combo

Jogo match-3 (estilo Candy Crush) em HTML5 canvas, arquivo único, com o mascote Gemmo, mundo de gemas e restauração do Palácio de Cristal.

- `index.html` — o jogo completo (imagens embutidas em base64); abra no navegador ou publique no GitHub Pages
- `icons/` — ícones do app
- `docs/` — prompts usados para gerar as imagens (mapas, fases, banners, palácio, ícone)

## Recursos
- 300+ fases em mapa contínuo, episódios de 15 fases; só o episódio atual fica visível
- Metas variadas: pontos, gemas, caixas, gelo, estrelas douradas, peças especiais
- Peças especiais (listrada, bomba, arco-íris), boosters (martelo, troca livre, +5 jogadas)
- Vidas (5, regeneram a cada 30 min), estrelas que restauram o Salão do Trono
- Sons sintetizados e música de fundo com botão para desligar

Debug: abra `index.html#debug`.

## Monetização (v62)
Economia pronta: moedas, loja, presente diário, vidas/jogadas por moedas ou anúncio premiado.
Tudo roda em **modo de teste** (`MONET.test=true` no index.html): anúncios e compras são simulados.
Para ligar de verdade, defina antes do jogo carregar:
- `window.GEMMO_ADS={showRewarded(cb){ /* mostra o vídeo e chama cb(true) ao concluir */ }}`
- `window.GEMMO_IAP={buy(id,cb){ /* id: c500,c1200,c3200,c7000,starter,noads; cb(true) se pago */ }}`
