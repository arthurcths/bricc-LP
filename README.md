# Bricc · Landing page

Landing page de vendas da **Bricc**, uma consultoria fictícia que leva restaurantes para o digital. O foco é um só: fazer o dono de restaurante pedir o **diagnóstico digital grátis**.

> *"Use o app pra ser encontrado. Use o seu cardápio pra vender de novo."*

Projeto desenvolvido na **trilha de conhecimento de Claude Code da 202**, como exercício de construir uma página completa, do briefing ao código, trabalhando com o Claude Code.

## O que a Bricc vende (na página)

- **Cardápio online próprio**, o carro-chefe: pedidos diretos no WhatsApp, sem comissão de app.
- **Integração com apps de delivery** (iFood, 99Food e outros).
- **Google Meu Negócio** otimizado.
- **Chatbot de WhatsApp** para atendimento automático.
- **Planilhas de precificação** com o preço certo para cada canal.

## O que tem na página

Uma página só, em português, com nove seções mais o bloco de quem faz e o formulário final:

1. **Hero** com a promessa e o CTA principal.
2. **Problema:** cinco sinais de que o restaurante perde dinheiro.
3. **Serviços** em grade, com o cardápio próprio em destaque.
4. **Cardápio interativo:** um mini cardápio funcional (abas, carrinho, total em tempo real e envio simulado).
5. **Calculadora** de quanto da margem fica no app todo mês.
6. **Estratégia e precificação:** planilha de exemplo e as estratégias de venda.
7. **Como funciona**, em quatro passos.
8. **Resultados e depoimentos.**
9. **Dúvidas** em acordeão.
10. **Quem faz** e **CTA final** com formulário (validação e máscara de WhatsApp, envio simulado).

## Decisões técnicas

- **HTML, CSS e JavaScript puros.** Sem framework, sem build, sem backend, sem banco de dados e sem `localStorage`. Todas as interações acontecem na própria página.
- **Mobile-first.** O público chega pelo celular, então o layout foi pensado primeiro para telas pequenas e depois ampliado (pontos de quebra em 600, 720, 820, 900, 1040 e 1360 px). Cada tamanho decide o que mostrar:
  - no celular, tabela vira cards, comparativos e depoimentos viram carrossel, e o resultado da calculadora fica fixo no topo;
  - no tablet e no desktop voltam a tabela, as colunas e os ícones com animação.
- **Ícones 3D em SVG inline**, sem imagens externas e sem logos de terceiros.
- **Acessibilidade:** HTML semântico, rótulos nos campos, foco visível e respeito a `prefers-reduced-motion`.
- **Fontes:** Lexend (títulos) e Inter (texto), pelo Google Fonts.

## Estrutura

```
bricc/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/arthur.jpg
├── LICENSE
└── README.md
```

## Como rodar

Não precisa instalar nada. Abra o `index.html` no navegador ou sirva a pasta:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Avisos

- Números, depoimentos e casos da página são **ilustrativos**, e a página avisa isso no rodapé.
- O link do WhatsApp usa um número de exemplo (`5511900000000`). Troque pelo número real antes de usar a página de verdade.
- A Bricc é um projeto de estudo, não uma empresa real.

## Licença

Distribuído sob a licença [MIT](LICENSE).

## Autor

**Arthur Coelho Thomas** · [LinkedIn](https://www.linkedin.com/in/arthurcths)
