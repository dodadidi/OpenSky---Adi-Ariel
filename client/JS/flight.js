
$(document).ready(function () {
    getAllFlights();
    operationsListeners();
});

function getAllFlights() {
    $.ajax({
        url: 'http://localhost:3000/api/flights',
        type: 'GET',
        success: function (flights) {
            recreateTable(flights);
        }
    });
}

function recreateTable(flights) {
    $("tbody").empty().remove();
    const flightsLen = flights.length;
    if (flightsLen) {
        $('table').append('<tbody></tbody>');
        for (let i = 0; i < flightsLen; i++) {
            let tableRow = "<tr><td>$flight_number</td><td>$departure_date</td><td>$departure_city</td><td>$landing_city</td><td>$company_name</td><td>$price</td><td>$stops</td></tr>";
            tableRow = tableRow.replace("$flight_number", flights[i].flight_number);
            tableRow = tableRow.replace("$departure_date", flights[i].departure_date);
            tableRow = tableRow.replace("$departure_city", flights[i].departure_city);
            tableRow = tableRow.replace("$landing_city", flights[i].landing_city);
            tableRow = tableRow.replace("$company_name", flights[i].company_name);
            tableRow = tableRow.replace("$price", flights[i].price);
            tableRow = tableRow.replace("$stops", flights[i].stops);
            $("tbody").append(tableRow);
            $('table tr:last').css("color", flights[i].color); 
        }
    }
}

function getAllFlightsByFilter(str) {
    $.ajax({
        url: `http://localhost:3000/api/flights/${str}`,
        type: 'GET',
        success: function(flights) {
            recreateTable(flights);
        }
    });
}


function operationsListeners() {

    $("#searchFlights").click(() => {
        const landing_city = $("#inputLanding_city").val();
        const departure_city = $("#inputDeparture_city").val();
        const stops = $("#inputStops").val();
        let str = "?";
        if(stops)
        str += `stops=${stops}`;
        if(landing_city)
        str += `&landing_city=${landing_city}`;
        if(departure_city)
        str += `&departure_city=${departure_city}`;
        else if(!stops && !landing_city && !departure_city){
            str = "";
        }
        getAllFlightsByFilter(str);
    });
}


