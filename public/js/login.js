$(document).ready(function () {
    // listener for form submit
    $("form.login").on("submit", function(event) {
        event.preventDefault();
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
        }).then(function () {
            window.location.replace("/");
            // If there's an error, log the error
        });
    }
});