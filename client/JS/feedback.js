$(document).ready(function () {
    getAllFeedbacks();
    operationsListeners();
});

function getAllFeedbacks() {
    $.ajax({
        url: 'http://localhost:3000/api/feedbacks',
        type: 'GET',
        success: function (feedbacks) {
            recreateTable(feedbacks);
        }
    });
}

function updateFeedbackById(id, jsonFile) {
    $.ajax({
        url: `http://localhost:3000/api/feedbacks/${id}`,
        type: 'PUT',
        data: jsonFile,
        success: function (response) {
            console.log(response);
        }
    });
}

function recreateTable(feedbacks) {
    $("tbody").empty().remove();
    const feedbacksLen = feedbacks.length;
    if (feedbacksLen) {
        $('table').append('<tbody></tbody>');
        for (let i = 0; i < feedbacksLen; i++) {
            let tableRow = "<tr>"
            tableRow +="<td>"+feedbacks[i].published_date+"</td>"
            tableRow +="<td>"+feedbacks[i].company_name+"</td>"
            tableRow +="<td>"+feedbacks[i].feedback+"</td>"
            tableRow +="<td>"+feedbacks[i].rating+"</td>"
            $("tbody").append(tableRow);
        }
    }
}

function getAllFeedbacksByFilter(str) {
    $.ajax({
        url: `http://localhost:3000/api/feedbacks/${str}`,
        type: 'GET',
        success: function(feedbacks) {
            recreateTable(feedbacks);
        }
    });
}



function cleanUpdateData(data) {
    const obj = data;
    for (var propName in obj) {
        if (obj[propName] === '') {
          delete obj[propName];
        }
      }
    return obj;
}


function operationsListeners() {

    $("#searchFeedbacks").click(() => {
        const company_name = $("#inputCompany_name").val();
        const published_date = $("#inputPublished_date").val();
        let str = "?";
        if(company_name)
        str += `&company_name=${company_name}`;
        if(published_date)
        str += `&published_date=${published_date}`;
        else if(!company_name && !published_date){
            str = "";
        }
        getAllFeedbacksByFilter(str);
    });

    $("#updateFeedback").click(() => {
        const flight_number = $("#inputId").val();
        const fn = $("#inputFN").val();
        const ln = $("#inputLN").val();
        const landing_city = $("#inputEmail").val();
        const job = $("#inputJob").val();
        const flightObj = {
            flight_number,
            job,
            landing_city,
            departure_date: fn,
            departure_city: ln,
        }
        updateFeedbackById(flight_number, cleanUpdateData(flightObj) );
    });
}


