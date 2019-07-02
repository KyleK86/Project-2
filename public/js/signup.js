$(document).ready(function() {
    // loads a picture based on the text input as it changes
    $("#gotchi-name").on("input", function(e) {
        e.preventDefault();
        var selectVal = $(".custom-select").val();
        var input = e.target.value.trim();
        var url = displayGotchi(selectVal, input);

        if (selectVal) {
            if (input === "") {
                $("#gotchi-img").attr("src", "https://via.placeholder.com/250");
            } else {
                $("#gotchi-img").attr("src", url);
            }
        }
    });

    // on form submit
    $("form.sign-up").on("submit", function(e) {
        e.preventDefault();
        var selectVal = $(".custom-select").val();
        var gotchiName = $("#gotchi-name").val().trim();
        var userName = $("#username").val().trim();
        var userEmail = $("#email").val().trim();
        var userPassword = $("#password").val().trim();

        if (!selectVal || !gotchiName || !userName || !userEmail || !userPassword) {
            return;
        }

        var gotchiPicture = displayGotchi(selectVal, gotchiName);

        signUpUser(gotchiName, gotchiPicture, userName, userEmail, userPassword);
        // reset values
        $("#gotchi-name").val("");
        $("#username").val("");
        $("#email").val("");
        $("#password").val("");
    });

    // function that builds the robohash url
    function displayGotchi(select, nameVal) {
        var url = "https://robohash.org/";
        var set;
        switch (select) {
        case "robot":
            set = "?set=set1";
            break;
        case "alien":
            set = "?set=set2";
            break;
        case "human":
            set = "?set=set3";
        }
        url += nameVal;
        url += set;
        return url;
    }

    // ajax POST method to our api route to create a new user.
    function signUpUser(gotchiName, gotchiPicture, name, email, password) {
        $.post("/api/signup", {
            gotchiName: gotchiName,
            gotchiPicture: gotchiPicture,
            username: name,
            email: email,
            password: password
        })
            .then(function() {
                window.location.replace("/");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});
