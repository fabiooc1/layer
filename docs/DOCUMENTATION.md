# Layer

Uma loja de roupas online minimalista com foco em arquitetura limpa.

## Visão Geral

O projeto Layer consiste em um e-commerce de moda com duas interfaces principais: uma Storefront (Landing Page e Loja) para o cliente final e um Painel Administrativo para gestão do negócio. O sistema será construído utilizando Next.js aplicando os conceitos de Clean Architecture para garantir desacoplamento, testabilidade e longevidade do código.

#### 1. Requisitos Funcionais (RF)

##### 1.1. Módulo do Cliente (Storefront)

[ ] RF001 - O sistema deve exibir na página inicial: produtos mais vendidos, tendências da estação e categorias principais (Camisa, Calça, Tênis, Acessórios).

[ ] RF002 - O usuário deve poder buscar produtos por nome e filtrar por categoria, tamanho, cor e faixa de preço.

[ ] RF003 - O usuário deve poder visualizar os detalhes de um produto, incluindo fotos, descrição, guia de medidas e avaliações.

[ ] RF004 - O usuário deve poder selecionar variações do produto (cor e tamanho) antes de adicionar ao carrinho.

[ ] RF005 - O usuário deve poder adicionar, remover e alterar a quantidade de itens no carrinho de compras.

[ ] RF006 - O carrinho de compras deve persistir os dados no navegador (LocalStorage/Cookies) caso o usuário feche a aba.

[ ] RF007 - O usuário deve poder calcular o frete informando o CEP, com integração a um serviço de logística.

[ ] RF008 - O usuário deve poder aplicar cupons de desconto válidos no checkout.

[ ] RF009 - O sistema deve exigir autenticação (login) para finalizar uma compra.

[ ] RF010 - O usuário deve poder realizar o cadastro informando Nome, Email, CPF e Telefone.

[ ] RF011 - O usuário deve poder pagar o pedido via Cartão de Crédito, Boleto ou PIX.

[ ] RF012 - O usuário deve ter acesso a uma área "Meus Pedidos" para visualizar histórico e status atual das compras.

[ ] RF013 - O usuário deve poder avaliar produtos comprados com nota (1-5), texto, fotos ou vídeos.

[ ] RF014 - O usuário deve poder atualizar seus dados cadastrais e redefinir sua senha.

##### 1.2. Módulo Administrativo (Backoffice)

[ ] RF015 - O administrador deve poder realizar login em uma rota dedicada/protegida.

[ ] RF016 - O administrador deve poder visualizar um Dashboard com métricas: Vendas do dia, Receita mensal e Pedidos pendentes.

[ ] RF017 - O administrador deve poder cadastrar, editar e desativar produtos (gerenciamento de estoque e imagens).

[ ] RF018 - O administrador deve poder criar e gerenciar cupons de desconto (porcentagem ou valor fixo, data de validade).

[ ] RF019 - O administrador deve poder alterar o status de um pedido (Aprovado -> Em Trânsito -> Entregue -> Cancelado).

[ ] RF020 - O administrador deve poder visualizar o cadastro de clientes.

#### 2. Requisitos Não Funcionais (RNF)

[ ] RNF001 - SEO: A aplicação deve utilizar Server-Side Rendering (SSR) ou Static Site Generation (SSG) nas páginas de produtos para indexação eficiente nos motores de busca.

[ ] RNF002 - Persistência Híbrida: - Dados relacionais (Usuários, Transações, Produtos) devem ser armazenados em banco relacional (ex: PostgreSQL).

Histórico de logs e auditoria de pedidos devem ser armazenados em banco não relacional (ex: MongoDB/DynamoDB).

[ ] RNF003 - Performance: O carregamento inicial da página (LCP) deve ser inferior a 2.5 segundos.

[ ] RNF004 - Responsividade: O layout deve ser fluido e adaptável para dispositivos Mobile, Tablet e Desktop.

[ ] RNF005 - Temas: O sistema deve suportar alternância de tema (Claro/Escuro) preferencialmente detectando a configuração do sistema operacional.

[ ] RNF006 - Segurança: Senhas devem ser armazenadas com hash forte (Argon2 ou Bcrypt).

[ ] RNF007 - Integração: O sistema deve ser desenhado para facilitar a troca de provedores de pagamento (Gateway Agnostic) através do padrão Adapter.

#### 3. Regras de Negócio (RN)

RN001 - Estoque: Um produto não pode ser vendido se o estoque for igual ou menor que zero.

RN002 - Reserva: Ao iniciar o pagamento, os itens devem ficar "reservados" por 15 minutos. Se o pagamento não confirmar, o estoque é liberado.

RN003 - Cupons: Cupons não são cumulativos. Apenas um cupom pode ser aplicado por compra.

RN004 - Frete Grátis: Compras acima de R$ 499,00 recebem frete grátis automático.

RN005 - Avaliações: Apenas usuários que compraram o produto e cujo pedido possui status "Entregue" podem realizar avaliações.

RN006 - Status do Pedido: - Aguardando Pagamento: Estado inicial.

`Aguardando Pagamento`: O pedido foi criado, até 15 minutos para ser pago
`Aprovado`: Pagamento confirmado.
`Em Separação`: Logística iniciou o processo.
`Em Trânsito`: Código de rastreio gerado.
`Entregue`: Cliente recebeu.
`Finalizado`: 7 dias após entrega (prazo de troca expirado).
`Reembolsado`: Estorno realizado.

4. Arquitetura Proposta (Clean Architecture)

4.1. Justificativa da Escolha

A adoção da Clean Architecture no projeto Layer fundamenta-se em três pilares estratégicos:

Complexidade do Domínio: E-commerces possuem regras densas e interdependentes (estoque, fiscal, logístico). O isolamento destas regras em camadas puras (Core) previne que atualizações de interface ou banco de dados corrompam a lógica de negócio.

Manutenibilidade e Evolução: A arquitetura facilita a implementação de novas features de forma desacoplada. Alterações em um gateway de pagamento ou biblioteca de UI não impactam os Casos de Uso.

Desenvolvimento Acelerado com IA: O desacoplamento permite o uso agressivo de Inteligência Artificial para gerar implementações rápidas. Como o código gerado fica confinado a adaptadores ou casos de uso específicos, a refatoração futura para otimização pode ser realizada com segurança total, sem riscos de efeitos colaterais em outras partes do sistema.

A estrutura de pastas seguirá a divisão de responsabilidades, isolando o domínio da tecnologia.

```
src/
├── core/                       # Camada de Domínio e Aplicação (Pura, sem React/Next)
│   ├── domain/                 # Entidades (Product, Order, User) e Regras de Negócio
│   │   └── enterprise-rules/
│   └── application/            # Casos de Uso (AddToCart, Checkout, CalculateShipping)
│       ├── use-cases/
│       └── gateways/           # Interfaces (Contratos) para Repositórios e APIs Externas
│
├── infrastructure/             # Camada de Adaptadores e Implementações
│   ├── database/               # Implementação dos Repositórios (Prisma, Mongoose)
│   ├── payment/                # Implementação do Gateway de Pagamento (Stripe/Pagar.me)
│   ├── shipping/               # Implementação do Gateway de Frete (Correios/Melhor Envio)
│   └── auth/                   # Implementação de Autenticação (NextAuth/JWT)
│
├── main/                       # Camada de Composição
│   └── factories/              # Injeção de Dependência (une o Core à Infra)
│
└── app/                        # Camada de Framework (Next.js)
    ├── (store)/                # Rotas da loja pública
    ├── (admin)/                # Rotas do painel administrativo
    ├── api/                    # Rotas de API (Webhooks, etc)
    └── components/             # Componentes visuais (UI)
```

5. Estratégia de Banco de Dados

O projeto adota uma abordagem de persistência usando dois banco de dados diferentes, utilizando o melhor de dois mundos para resolver problemas distintos:

5.1. PostgreSQL (Relacional)

Utilizado para o "Core" do sistema que demanda alta integridade referencial e transações ACID complexas.

Dados: Usuários, Produtos, Variantes, Categorias, Tabelas de Preço.

Justificativa: Facilidade de integração com ORMs (Prisma), tipagem forte e ecossistema maduro para dados estruturados.

5.2. MongoDB (NoSQL)

Utilizado para dados que exigem alta performance de escrita, flexibilidade de schema ou imutabilidade documental.

Pedidos (Orders): O pedido funciona como um "Snapshot" imutável do momento da compra. O modelo documental garante que os dados do pedido (preço pago, endereço de entrega na época) não sejam alterados caso o produto ou o cadastro do usuário mudem no futuro.
