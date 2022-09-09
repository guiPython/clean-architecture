# clean-architecture
 Full Cycle Clean Architecture
Projeto utilizando clean architecture, o dominio foi aproveitado do projeto criado curso ddd modelagem tatica.

# considerações
Pelo fato de não termos clara o montagem do dominio por parte da clean architecture foi uma boa sujestão utilizar técnicas de DDD na modelagem,
o projeto é muito simples e talvez não precise de uma montagem tão "purista" nesse ponto, uma possivel melhoria é que na clean arch. não existe uma separação clara de adpatadores de entrada e saida de dados, talvez seja uma boa criar essa separação como fariamos com PORTS and ADAPTERS criando adpatadores primarios que servem dados e secundarios que consomem dados, na minha opinião isso deixa as coisas mais claras.

## TDD
Em relação a implementação ela foi feita utilizando TDD, minha opinião sobre a ténica é que ela favoreceu o desenvolvimento mais seguro pois toda a solução é testada durante o desenvolvimento, mas acaba sendo um pouco cansativo as vezes, no final acho que o cansaço se pagou hshshshs.

## UseCases
Os use cases construidos são simples, cabe bastante personalização entretanto acho que acabo ficando com o DDD para a modelagem dos serviços,
na minha cabeça por mais que a modelagem de application services seja um pouco mais complexa pois nela utilizamos nossos domain services e infraestrutura as coisas se tornam mais claras, os use cases para aplicações mais simples são ideias pois não vão interagir com camadas de infra. muito variadas na minha visão, obviamente um CRUD como esta aplicação não se beneficiaria tanto dessa separação de domain services e application services, mas fica a dica que a utilização desta forma de modelagem pode tornar sua solução mais amigavel e facil de manter.

## Infraestrutura
No final do dia foi outra parte aproveitada do projeto de ddd, na minha opinião a divisão de módulos foi feliz e gostei bastante do resultado dessa camada, porém com a adição da api quebramos um pouco a estrutura de moódulos que estavamos seguindo, acredito que respeita-la seja ideal e fica como um ponto de melhoria tamb

