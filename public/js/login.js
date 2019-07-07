
$(document).ready(function () {
    // Listener for form submit
    $("form.login").on("submit", function(event) {
        event.preventDefault();
        var username = $("#username").val().trim();
        var password = $("#password").val().trim();

        if (!username || !password) {
            return;
        }
        loginUser(username, password);

        // Reset values
        $("#username").val("");
        $("#password").val("");
    });

    // Ajax post on form submit
    function loginUser(username, password) {
        $.post("/api/login", {
            username: username,
            password: password
        }).then(function () {
            window.location.replace("/");
        });
    }
});