$(document).ready(function () {
    // listener for form submit
    $("form.login").on("submit", function() {

        var email = $("#email").val().trim();
        var password = $("#password").val().trim();

        if (!email || !password) {
            return;
        }

        loginUser(email, password);

        $("#email").val("");
        $("#password").val("");

    });

    // ajax post on form submit
    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        })
            .then(function () {
                window.location.replace("/index");
                // If there's an error, log the error
            })
            .catch(handleLoginErr);
    }

    // error handler
    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});