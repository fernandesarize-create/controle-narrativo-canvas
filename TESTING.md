# Validação técnica

## Local

```bash
npm install
npm test
npm run build
npm run preview
```

O `npm test` faz um smoke test sem dependências externas: verifica arquivos essenciais, scripts e presença dos principais blocos do Canvas.

O build real é validado pelo `npm run build`. O CI em `.github/workflows/ci.yml` repete instalação, smoke test e build em uma máquina limpa do GitHub Actions.

## Critério de aceite

A versão só deve ser considerada tecnicamente aprovada quando:

1. `npm test` passar;
2. `npm run build` passar;
3. `dist/index.html` existir;
4. a aplicação de produção abrir no navegador;
5. campos editáveis funcionarem;
6. `Imprimir / exportar PDF` abrir a impressão;
7. o layout permanecer correto na impressão em paisagem.
