<h1> CUBOS-Desafio-Backend </h1>
<h3 align="center">
    <a href="README.md">English-US</a>
    <span>|</span>
    <a href="README-ptBR.md">Português-BR</a>
</h3>

<p>Esta é uma API REST simples para gerenciar regras de atendimento para uma clínica.</p>

<h2>Instructions</h2>

<p>Esta API pode ser utilizada através de seu principal Endpoint <strong>/attendance-rules</strong> da seguinte forma:</p>

<h3>POST</h3>
Este método é usado para salvar uma nova Regra de Atendimento. Ela deve ser enviada no body da Request como um objeto JSON raw com a seguinte estrutura:

```
{
    day: DAY_STRING
    intervals: [{start: TIME1, end: TIME2 }]
}
```
<ul>
    <li><strong>DAY_STRING</strong>: A Data ou Período no qual a Regra de Atendimento se aplica. Os valores aceitáveis são:</li>
    <ul>
        <li><strong>"daily"</strong>: O Atendimento ocorre todos os dias, incluindo fins de semana</li>
        <li><strong>"sundays", "mondays", "tuesdays", "wednesdays", "thursdays", "fridays" or "saturdays"</strong>: O Atendimento ocorre semanalmente nos Domingos, Segundas, Terças, Quartas, Quintas, Sextas e Sábados respectivamente</li>
        <li><strong>"dd-MM-yyyy"</strong>: O Atendimento ocorrerá apenas na data especificada</li>
    </ul>
    <li><strong>TIME1 e TIME2</strong>: O horário do dia no qual o Atendimento ocorrerá. Ambos devem estar no formato "HH:mm" e TIME1 deve ser menor ou igual do que TIME2</li>
</ul>

<p>O Array "intervals" pode conter qualquer número de objetos de Intervalos de Tempo quanto forem necessários, contanto que atendam a estrutura com as propriedades "start" e "end" exatamente.</p>
<p>Se a estrutura do JSON estiver correta, uma Response com código de status 201 será enviada com o header "Location" apresentando a localização e ID da Regra de Atendimento salva. Quaisquer propriedades extras incluídas no JSON serão ignoradas.</p>

<p>Se a estrutura do JSON estiver incorreta, uma Response com código de status 400 será enviada.</p>

<h3>GET</h3>
<p>Se utilizada sem parâmetros de query na URL, este método irá recuperar todas as Regras de Atendimento e retorná-las como um Array JSON no body da Response com código de status 200. Se não houver nenhuma Regra de Atendimento salva o body da Response estará vazio e o código de status será 204.</p>

<p>Se utilizada com exatamente os parâmetros "start-date" e "end-date", este método irá recuperar um Array JSON contendo todas as datas e horários de atendimento dentro daquele intervalo, incluindo ambas as datas de início e fim.Se não houver nenhuma Regra de Atendimento salva o body da Response estará vazio e o código de status será 204.</p>

<p>"start-date" e "end-date" devem estar no formato "dd-MM-yyyy"</p>

<p>Exemplo de URL e Response:</p>
URL: HOST/attendance-rules?start-date=04-12-2020&end-date=08-12-2020

```
[{
    "day": "04-12-2020",
    "intervals": [{ "start": "08:00", "end": "08:30" },
                  { "start": "08:30", "end": "09:00" },
                  { "start": "09:00", "end": "09:30" },
                  { "start": "09:30", "end": "10:00" },
                  { "start": "13:00", "end": "14:00" },
                  { "start": "14:00", "end": "15:00" }]
},
{
    "day": "05-12-2020",
    "intervals": [{ "start": "08:00", "end": "08:30" },
                  { "start": "08:30", "end": "09:00" },
                  { "start": "09:00", "end": "09:30" },
                  { "start": "09:30", "end": "10:00" }]
},
{
    "day": "06-12-2020",
    "intervals": [{ "start": "08:00", "end": "08:30" },
                  { "start": "08:30", "end": "09:00" },
                  { "start": "09:00", "end": "09:30" },
                  { "start": "09:30", "end": "10:00" }]
},
{
    "day": "07-12-2020",
    "intervals": [{ "start": "08:00", "end": "08:30" },
                  { "start": "08:30", "end": "09:00" },
                  { "start": "09:00", "end": "09:30" },
                  { "start": "09:30", "end": "10:00" }]
},
{
    "day": "08-12-2020",
    "intervals": [{ "start": "08:00", "end": "08:30" },
                  { "start": "08:30", "end": "09:00" },
                  { "start": "09:00", "end": "09:30" },
                  { "start": "09:30", "end": "10:00" },
                  { "start": "18:00", "end": "19:00" }]
}]
```

<h3>DELETE</h3>

<p>Este método é utilizado para deletar uma Regra de Atendimento salva. Seu Endpoint é <strong>/attendance-rules/ID</strong>, onde ID é a string recebida no header "Location" da Response após salvar uma nova Regra de Atendimento.</p>

<p>Se a Regra de Atendimento for deletada com sucesso, uma Response com código de status 200 será enviada.</p>

<p>Se nenhuma Regra de Atendimento for encontrada com o ID informado, uma Response com código de status 404 será enviada.</p>

<h2>Exemplos de Request</h2>

<p>Uma coleção de exemplos de URL do Postman pode ser encontrada <a href=https://www.getpostman.com/collections/b76f1f2abe9bf184c39d>aqui</a> em formato JSON. Caso não esteja funcionando devidamente, as mesmas URL's estão listadas logo abaixo com método HTTP, Endpoint e body do Request caso esteja presente.</p>

<p><strong>POST localhost:3000/attendance-rules</strong></p>

```
{
    "day": "21-12-2020",
    "intervals": [{"start": "18:00", "end": "19:00"}]
}
```

<p><strong>POST localhost:3000/attendance-rules</strong></p>

```
{
    "day": "fridays",
    "intervals": [{"start": "13:00", "end": "14:00"},
                    {"start": "14:00", "end": "15:00"}]
}
```

<p><strong>POST localhost:3000/attendance-rules</strong></p>

```
{
    "day": "daily",
    "intervals": [{"start": "08:00", "end": "08:30"}, 
                    {"start": "08:30", "end": "09:00"},
                    {"start": "09:00", "end": "09:30"},
                    {"start": "09:30", "end": "10:00"}]
}
```

<p><strong>GET localhost:3000/attendance-rules</strong></p>

<p><strong>GET localhost:3000/attendance-rules?start-date=04-12-2020&end-date=08-12-2020</strong></p>

<p><strong>DELETE localhost:3000/attendance-rules/ID</strong> (ID pode ser encontrado no header Location após POSTar uma nova Regra de Atendimento)</p>

<h2>Créditos</h2>

Esse Projeto foi construído por [Caio "Tyghorn" Victor](https://github.com/CaioVictorMota).

Nós somos todos um.