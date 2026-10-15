# Controle Narrativo — V6

Aplicação estática em React + Vite, sem banco de dados, backend ou armazenamento em servidor.

## Escopo
- Preenchimento direto no navegador.
- Nada é enviado ou salvo em servidor.
- Botão "Imprimir / exportar PDF" usa a impressão nativa do navegador (escolha "Salvar como PDF").
- Layout fixado em 1664 × 945 px para preservar a composição do material original.
- CSS moderno, sem `react-flexcanvas`, Webpack antigo ou `node-sass`.

## Desenvolvimento
```bash
npm install
npm run dev
```

## Validação de produção
```bash
npm run build
npm run preview
```

O Vite gera `dist/`, que pode ser publicado como site estático.

## Status desta versão
- [x] Migração para React + Vite
- [x] Sem backend/banco
- [x] Preenchimento local
- [x] Impressão/exportação via navegador
- [x] Layout com dimensões fixas para maior fidelidade ao PDF
- [ ] Build efetivamente executado neste ambiente (npm ficou indisponível/sem concluir acesso ao registry)
- [ ] Teste final em navegador real
- [ ] Publicação
