# Sistema Norteador – Cadastro de Veículos (React)

Mão na Massa 2 – Desenvolvimento Web III.

Formulário em React para cadastrar veículos no Sistema Norteador:

- **useState + onChange**: cada campo é validado enquanto o usuário digita
  (placa no padrão ABC1234 ou Mercosul ABC1D23, marca e modelo com ao menos 2 caracteres).
- **useEffect**: observa os dados e os erros e habilita o botão **Salvar** só quando tudo está válido.
- **POST**: ao salvar, envia os dados em JSON para um endpoint REST
  (`https://jsonplaceholder.typicode.com/posts`, que simula o backend) e mostra a resposta na tela.

## Como rodar?

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (normalmente http://localhost:5173).

## Publicar na Vercel pelo terminal (sem conectar o GitHub)

```bash
npm install
npx vercel login      # entre com e-mail (código chega na caixa de entrada)
npx vercel            # aceite as opções padrão; o Vite é detectado sozinho
npx vercel --prod     # gera o link de produção
```