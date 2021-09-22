# COLISEU - FRONT - REACT

## Requisitos

- Node, último LTS

## Configuração do Ambiente

`yarn install`

Copie o arquivo `.env.example` para um novo arquivo `.env`

```
cp .env.example .env
```

No arquivo `.env` configure as seguintes variáveis:

```
REACT_APP_API_URL=http://localhost:3000
REACT_APP_USERNAME = mse
REACT_APP_PASSWORD = beijaflore
```

## Execução

`yarn start`
Abrirá o seu browser padrão no localhost.
Para a execução normal do front, utilize a url:
`tim.coliseu:3000` <-porta exemplo


## Host

Para o ambiente de desenvolvimento, é necessário adicionar novas linhas ao host na sua máquina.
O caminho geralmente é `C:\Windows\System32\drivers\etc` arquivo `hosts`, adicione as seguintes linhas ao final:

```

	127.0.0.1  tim.coliseu
  127.0.0.1  tim.licceu
```

