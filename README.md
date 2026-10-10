# Happy Birthday, Yan

Site estático (HTML + CSS + JS puro).

## Personalizar (tudo em `js/script.js`, bloco CONFIG)
- **Fotos:** coloque os arquivos em `assets/images/` (ex.: `foto-01.jpg`, de preferência até ~300 KB) e preencha `src`, `alt` e `caption`.
- **Mensagem:** edite `CONFIG.message` (um item por parágrafo) e `CONFIG.finalMessage`.
- **Música:** cole em `CONFIG.music.youtubeId` o ID do vídeo oficial de "Supernova" (o que vem depois de `v=`). Sem ID, o site mostra só um link para o YouTube.
- **Imagens da aespa:** em `index.html`, seção 2 (use apenas imagens que você pode usar).

## Testar localmente
Abra `index.html` no navegador. Para a música, use um servidor local (`python3 -m http.server` e acesse `localhost:8000`), pois o YouTube pode recusar `file://`.
Confira no celular e no computador, com e sem música, e com "reduzir movimento" ativado no sistema.

## Publicar no GitHub Pages
1. Crie um repositório público no GitHub (ex.: `happy-birthday-yan`).
2. Envie o conteúdo da pasta (com `index.html` na raiz do repositório).
3. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`, e salve.
4. Aguarde 1–2 minutos. O link será `https://SEU-USUARIO.github.io/happy-birthday-yan/`.
5. Abra o link em outro dispositivo (de preferência no celular, em aba anônima) e teste tudo.

Para atualizar: altere os arquivos, envie ao GitHub e aguarde a nova publicação. Quem tiver o link poderá ver o site, então não inclua dados privados.
