$(document).ready(function (event) {
    // listener for form submit
    event.preventDefault();
    $("form.login").on("submit", function() {

        var username = $("#username").val().trim();
        var password = $("#password").val().trim();

        if (!username || !password) {
            return;
        }

        loginUser(username, password);

        $("#username").val("");
        $("#password").val("");

    });

    // ajax post on form submit
    function loginUser(username, password) {
        $.post("/api/login", {
            username: username,
            password: password
        })
            .then(function () {
                window.location.replace("/");
                // If there's an error, log the error
            })
            .catch(handleLoginErr);
    }

    // error handler
    function handleLoginErr(err) {
        console.log(err.responseJSON);
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});