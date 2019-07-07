$(document).ready(function () {

    $(".action-btn").on("click", function () {
        var button = $(this);
        var currentValue = button.data("points");
        var id = button.data("id");
        var column = button.data("column");
        var health = button.data("health");
        gotchiUpdate(column, health, currentValue, id);
        modalUpdate(column, health, currentValue);
    });

    $(".modal button").on("click", function() {
        window.location.reload();
    });

    function gotchiData(column, health, value) {
        switch (column) {
        case "hungry":
            var data = {
                hungry: 0,
                health: health + value
            };
            return data;
        case "bored":
            var data = {
                bored: 0,
                health: health + value
            };
            return data;
        case "lazy":
            var data = {
                lazy: 0,
                health: health + value
            };
            return data;
        }
    }

    function gotchiUpdate(column, health, value, id) {
        var data = gotchiData(column, health, value);
        $.ajax({
            method: "PUT",
            url: "/api/gotchi/" + id,
            data: data
        }).then(function(data) {
            console.log(data);
        }).catch(function(err) {
            console.log(err);
        });
    }

    function modalUpdate(column, health, value) {
        var newHealth = 0;
        switch(column) {
        case "hungry":
            newHealth = health + value;
            $("#hungry-points").text(newHealth);
            break;
        case "bored":
            newHealth = health + value;
            $("#bored-points").text(newHealth);
            break;
        case "lazy":
            newHealth = health + value;
            $("#lazy-points").text(newHealth);
            break;
        }
    }
});