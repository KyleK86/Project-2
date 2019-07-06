
$(document).ready(function () {

    $(".action-btn").on("click", function (event) {
        var payload = {
            updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
        };
        var name = event.target.name;
        var value = parseInt(event.target.value);
        var id = $(this).data("id");


        $.ajax({
            method: "PUT",
            url: "/api/gotchi/:id" + id,
            data: payload

        }).then(function (response) {
            console.log(points + value);
            console.log(response);
            console.log(name);
            if (response) {
                $("#" + name + "-points").text(points + value);
            }

        });

    });
});
