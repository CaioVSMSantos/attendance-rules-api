<h1> attendance-rules-api </h1>
<h3 align="center">
    <a href="README.md">English-US</a>
    <span>|</span>
    <a href="README-ptBR.md">Português-BR</a>
</h3>

<p>This is a simple REST API to manage attendance rules for a clinic.</p>

<h2>Instructions</h2>

<p>This API can be used through its main Endpoint <strong>/attendance-rules</strong> in the following way:</p>

<h3>POST</h3>
This method is used to save a new Attendance Rule. It must be sent in the body of the Request as a raw JSON object with the following structure:

```
{
    day: DAY_STRING
    intervals: [{start: TIME1, end: TIME2 }]
}
```
<ul>
    <li><strong>DAY_STRING</strong>: The Date or period in which the Attendance Rule applies. Values accepted are:</li>
    <ul>
        <li><strong>"daily"</strong>: Attendance occurs every day, including weekends</li>
        <li><strong>"sundays", "mondays", "tuesdays", "wednesdays", "thursdays", "fridays" or "saturdays"</strong>: Attendance occurs weekly in the corresponding day</li>
        <li><strong>"dd-MM-yyyy"</strong>: Attendance occurs in the specified date only</li>
    </ul>
    <li><strong>TIME1 and TIME2</strong>: The time of day in which Attendance occurs. Both must be in the format "HH:mm" and TIME1 must be lesser than or equals TIME2</li>
</ul>

<p>The "intervals" Array may contain any number of Time Range objects as necessary, as long as they meet the structure with exactly the "start" and "end" properties.</p>
<p>If the JSON structure is correct, a Response with status code 201 will be sent with the header "Location" presenting the location and ID of the saved Attendance Rule. Any extra properties included in the JSON will be ignored.</p>
<p>If the JSON structure is incorrect, a Response with status code 400 will be sent.</p>
<p>if there is any conflict with the time intervals within the Array itself or with other saved Attendance Rules, a Response with status code 409 will be sent.</p>

<h3>GET</h3>
<p>If used without URL query params, this method recovers all Attendance Rules saved and returns them as a JSON Array in the body of the Response with the status code 200. If there isn't any saved Attendance Rules the Response body will be empty and the status code will be 204.</p>

<p>If used exactly with the query params "start-date" and "end-date", this method will recover a JSON Array containing all the available attendance dates and times within that range, including both start and end dates. If there isn't any saved Attendance Rules, the Response body will be empty and the status code will be 204.</p>

<p>"start-date" and "end-date" must be in the format "dd-MM-yyyy"</p>

<p>URL and Response example:</p>
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

<p>This method is used to delete a saved Attendance Rule. It's endpoint is <strong>/attendance-rules/ID</strong>, where ID is the string received in the "Location" header of the Response after saving a new Attendance Rule.</p>

<p>If the Attendance Rule is deleted successfully, a Response with status code 200 will be sent.</p>

<p>If no Attendance Rule can be found with the given ID, a Response with status code 404 will be sent.</p>


<h2>Request Examples</h2>

<p>A Postman collection of sample URL's can be found <a href=https://www.getpostman.com/collections/b76f1f2abe9bf184c39d>here</a> in JSON format. In case it isn't working properly, the same URL's are listed bellow with HTTP Method, Endpoint and Request Body if present.</p>

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

<p><strong>DELETE localhost:3000/attendance-rules/ID</strong> (ID can be found in the Location header after POSTing a new Attendance Rule)</p>
