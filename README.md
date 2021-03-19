1. Script: Crie um programa que leia as colunas do txt "planilha.txt" (em anexo) e crie com as
infos coletadas um json com apenas os seguintes atributos:
name, path, date, size.
Requisitos:
- O json deve ser escrito em um arquivo.
- O campo date deve estar no padrão brasileiro (dd/mm/yyyy).
- O campo size deve ser humanizado utilizando GB como multiplicador e ter no máximo duas
casas decimais, caso o arquivo seja menor que 1 GB. Utilize vírgula como separador de parte
decimal.

2. Desenvolvimento web:
Precisamos de uma aplicação web onde o usuário possa escolher filtrar os resultados de uma
base de dados fornecida pela API REST do Ghibli Studios selecionando o nome do diretor ou
ano do lançamento ou por palavras no nome ou descrição do filme. Diversos filtros podem ser
utilizados ao mesmo tempo em conjunto.
DICA: Utilize os endpoints https://ghibliapi.herokuapp.com/films e
https://ghibliapi.herokuapp.com/people como fonte de dados. Para mais informações,
consulte a documentação em https://ghibliapi.herokuapp.com .
Após esse filtro o usuário visualiza o título, a descrição, o diretor, os nomes dos personagens
dos filmes e o score dos filmes numa tabela.
Esta aplicação deve ser divida em backend e frontend. A aplicação de frontend deve consultar
uma API do backend e não diretamente a API do Ghibli.
Não definimos um layout, logo, fica a critério e criatividade do desenvolvedor. Sinta-se livre
para inovar!
SOBRE:
- Detalhe as instruções de execução do item 1.

- Todos os requisitos precisam ser atendidos.
- Existem detalhes de implementação que não estão listados nos requisitos. Sinta-se livre
para utilizar de proatividade e entregar o melhor resultado possível.
- Este teste é de caráter puramente avaliatório e não há pretensão de utilização de qualquer
código enviado em produção
- Faça deploy das aplicações de backend e frontend em algum serviço de PaaS.
- Envie o código da aplicação via GitHub.
