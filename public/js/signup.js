
$(document).ready(function() {
    
    // loads a picture based on the text input as it changes
    $("#gotchi-name").on("input", function(e) {
        e.preventDefault();
        var selectVal = $(".custom-select").val();
        var input = e.target.value.trim();
        var url = displayGotchi(selectVal, input)[0];

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
        var userPasswordCheck = $("#password-check").val().trim();

        if (!selectVal || !gotchiName || !userName || !userEmail || !userPassword || !userPasswordCheck) {
            return;
        }

        var gotchi = displayGotchi(selectVal, gotchiName);

        var gotchiPicture = gotchi[0];
        var gotchiType = gotchi[1];

        signUpUser(gotchiName, gotchiPicture, gotchiType, userName, userEmail, userPassword, userPasswordCheck);
        // Reset values
        $("#gotchi-name").val("");
        $("#username").val("");
        $("#email").val("");
        $("#password").val("");
        $("#password-check").val("");
        $("#error-text").val("");
    });

    // Function that builds the robohash url
    function displayGotchi(select, nameVal) {
        var url = "https://robohash.org/";
        var gotchi = [];
        var set;
        var type;
        switch (select) {
        case "robot":
            set = "?set=set1";
            type = "robot";
            break;
        case "alien":
            set = "?set=set2";
            type = "alien";
            break;
        case "human":
            set = "?set=set5";
            type = "human";
        }
        url += nameVal;
        url += set;
        gotchi.push(url, type);
        return gotchi;
    }

    // Ajax POST method to our api route to create a new user.
    function signUpUser(gotchiName, gotchiPicture, gotchiType, name, email, password, passwordCheck) {
        $.post("/api/signup", {
            gotchiName: gotchiName,
            gotchiPicture: gotchiPicture,
            gotchiType: gotchiType,
            username: name,
            email: email,
            password: password,
            passwordCheck: passwordCheck
        }).then(function() {
            window.location.replace("/");
        });
    }
});
