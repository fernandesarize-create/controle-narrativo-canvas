import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const required = ['index.html','vite.config.js','package.json','src/main.jsx','src/styles.css']
for (const file of required) if (!fs.existsSync(path.join(root,file))) throw new Error(`Arquivo ausente: ${file}`)
const source = fs.readFileSync(path.join(root,'src/main.jsx'),'utf8')
const requiredText = ['PRINCÍPIO CENTRAL DO PROJETO POLÍTICO','IDENTIDADE NARRATIVA','MAPA DE PÚBLICOS E IDENTIDADES','SISTEMA DE CONTEÚDO','CONTRA NARRATIVA E DEFESA','CONSIDERAÇÕES | INSIGHTS','SÍNTESE DA NARRATIVA','window.print()','contentEditable']
for (const text of requiredText) if (!source.includes(text)) throw new Error(`Elemento esperado não encontrado: ${text}`)
const pkg = JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'))
if (pkg.scripts?.build !== 'vite build') throw new Error('Script de build inválido.')
if (pkg.scripts?.dev !== 'vite') throw new Error('Script de desenvolvimento inválido.')
console.log('Smoke test OK: estrutura, conteúdo essencial e scripts conferidos.')
