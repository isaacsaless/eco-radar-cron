<div align="center">
    <a href="https://eco-radar.vercel.app">
        <img src="https://i.imgur.com/WeHCYZx.png" alt="EcoRadar logo" height="140" />
    </a>
    <h5 align="center">
        O agendador da aplicação EcoRadar, que executa tarefas automaticamente.
    </h5>
    <p align="center">
        &middot;
        <a target="_blank" href="https://eco-radar.vercel.app">Site</a>
        &middot;
    </p>
</div>

## Sobre
<p>
  O agendador da aplicação EcoRadar foi desenvolvido para automatizar tarefas críticas relacionadas ao monitoramento ambiental. Ele executa rotinas programadas que coletam, processam e atualizam dados sobre focos de incêndio no Brasil a partir de fontes confiáveis, como a NASA.
  Construído com Node.js, TypeScript e node-cron, o agendador opera dentro de um ambiente Docker, garantindo portabilidade e consistência na execução. Ele funciona em conjunto com a API pública do EcoRadar, mantendo os dados sempre atualizados e prontos para serem consumidos por sistemas frontend, aplicativos móveis ou outras aplicações.
</p>  

## Feito com
* <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
* <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
<br>

## Utilização

### Configuração Local com Docker

Para executar a aplicação localmente, siga os passos abaixo:

1. **Clone o repositório**
   ```bash
   git clone https://github.com/isaacsaless/eco-radar-cron.git
   cd eco-radar-cron
   ```

2. **Configure as variáveis de ambiente**
   - Copie o arquivo `.env.template` para `.env`
   - Preencha todas as variáveis de ambiente necessárias no arquivo `.env`

3. **Execute com Docker**
   ```bash
   docker build -t eco-radar-cron .
   docker run -p 3000:3000 --env-file .env eco-radar-cron
   ```

A aplicação iniciará a execução de suas rotinas em intervalos de uma hora.

## Contribuições
### Você pode contribuir com este código enviando um pull request. Basta seguir estas instruções:
<br>

1. Faça um fork desse repositório;
2. Crie uma nova branch com sua funcionalidade: (`git checkout -b feature/NovaFeature`);
3. Faça um commit das suas mudanças: (`git commit -m 'Adicionada NovaFeature`);
4. Realize um push para o repositório original: (`git push origin feature/NovaFeature`);
5. Crie um pull request.

<p>E está pronto, simples assim! 🎉</p>

## Licença

Distribuído sob a Licença MIT. Consulte `LICENSE.txt` para mais informações.

## Contato

Isaac Sales - [isaac-sales](https://www.linkedin.com/in/isaac-sales/) - isaacnascimentosales@gmail.com

Link do projeto: [https://github.com/isaacsaless/eco-radar-cron](https://github.com/isaacsaless/eco-radar-cron)

## Agradecimentos

* [MIT License](https://opensource.org/license/mit)
* [NASA FIRMS](https://firms.modaps.eosdis.nasa.gov/)
