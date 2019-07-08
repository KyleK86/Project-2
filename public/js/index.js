
$(document).ready(function () {

    $(".action-btn").on("click", function () {
        var button = $(this);
        var currentValue = button.data("points");
        var id = button.data("id");
        var column = button.data("column");
        var health = button.data("health");
        var type = $("#user-gotchi").data("type");
        var boolean = updateCheck(health, currentValue);
        if (boolean) {
            gotchiUpdate(column, health, currentValue, id, type);
            modalUpdate(column, health, currentValue, type);
        } else if (!boolean && health === 100) {
            $(".modal-body p").text("Your Gotchi isn't " + column);
        } else {
            $(".modal-body p").text("Please click a button with a higher level first!");
        }
    });

    $(".modal button").on("click", function() {
        window.location.reload();
    });

    function gotchiUpdate(column, health, value, id, type) {
        var data = dataGenerator(type, column, health, value);
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

    function dataGenerator(type, column, health, value) {
        if (health === 100) {
            return;
        } else if (value === 0) {
            var data = gotchiDataHealthOnly(type, column, health);
            return data;
        } else {
            var data = gotchiData(column, health, value);
            return data;
        }
    }

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

    function gotchiDataHealthOnly(type, column, health) {
        var increment = setIncrement(type);
        switch (column) {
        case "hungry":
            var data = {
                health: health + increment
            };
            return data;
        case "bored":
            var data = {
                health: health + increment
            };
            return data;
        case "lazy": 
            var data = {
                health: health + increment
            };
            return data;
        }
    }

    function setIncrement(type) {
        switch (type) {
        case "human":
            var increment = 3;
            return increment;
        case "alien":
            var increment = 2;
            return increment;
        case "robot":
            var increment = 1;
            return increment;
        }
    }

    function modalUpdate(column, health, value, type) {
        var newHealth = 0;
        var increment = setIncrement(type);
        if (health === 100) {
            switch(column) {
            case "hungry":
                $("#hungry-points").text(health);
                break;
            case "bored":
                $("#bored-points").text(health);
                break;
            case "lazy":
                $("#lazy-points").text(health);
                break;
            }
        } else if (value === 0) {
            switch(column) {
            case "hungry":
                newHealth = health + increment;
                $("#hungry-points").text(newHealth);
                break;
            case "bored":
                newHealth = health + increment;
                $("#bored-points").text(newHealth);
                break;
            case "lazy":
                newHealth = health + increment;
                $("#lazy-points").text(newHealth);
                break;
            }
        } else {
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
    }

    function updateCheck(health, value) {
        var attributeSum = 0;
        var buttons = $(".list-group button");
        for (i = 0; i < buttons.length; i++) {
            attributeSum += parseInt(buttons[i].getAttribute("data-points"));
        }
        if (100 - health === attributeSum && value === 0) {
            return false;
        } else {
            return true;
        }
    }
});
