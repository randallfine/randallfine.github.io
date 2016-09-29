$(document).ready(function() {

    //start with 0
    $(".view").html("0");
    //AC button
    $(".clear").click(function() {
        $(".view").html("0");

    });

    // CE button
    $(".del").click(function() {
        var view = $(".view").html();
        if (view === "0" || view.length === 1) {
            $(".view").html("0");
        } else {
            var temp = view.split("");
            $(".view").html(temp.slice(0, view.length - 1).join(""));

        }
    });

    //Main calc function
    $(".calc").click(function() { 
        var val = $(this).val();
        var view = $(".view").html();
        var split = view.split("");
        if (view === "0" || split[0] == "=") {
            $(".view").text(val);
        } else {
            $(".view").text(view + val);
        }
        decCheck();
    });

    //using operators
    $(".arith").click(function() {
        var val = $(this).val();
        var view = $(".view").html();
        var split = $(".view").html().split("");
        var sliced = split.slice(-1);
        $(".view").text($(".view").text() + val);
        if (split[0] == "=") {
            $(".view").html(split.slice(2, split.length).join("") + val)
        }
        if (sliced == "+" || sliced == "-" || sliced == "/" || sliced == "*") {
            var temp = view.split("");
            $(".view").html(temp.slice(0, view.length - 1).join(""));
            $(".view").text($(".view").text() + val);
        }
        decCheck();
    });

    //adding decimals
    $(".dec").click(function() {
        var val = $(this).val();
        var view = $(".view").html();
        var split = $(".view").html().split("");
        var sliced = split.slice(-1);
        if (split[0] == "=") {
            $(".view").html("0" + val);
        } else if (sliced == "+" || sliced == "-" || sliced == "/" || sliced == "*") {
            $(".view").text($(".view").text() + "0" + val);
        } else {
            $(".view").text($(".view").text() + val);
        }

        decCheck();
    });

    //equals function
    $(".equals").click(function() {
        var total = eval($(".view").text());
        $(".view").html("= " + total);
    });
});

//preventing duplacate or inapropriate decimals
var decCheck = function() {
    var val = ".";
    var view = $(".view").html();
    var split = $(".view").html().split("");
    var sliced = split.slice(-1);
    var counter = 0;

    for (var i = 0; i < split.length; i++) {
        if (split[i] == ".") {
            counter++;
        }
        if (split[i] == "+" || split[i] == "-" || split[i] == "/" || split[i] == "*") {
            counter = 0;
        }

    }
    if (counter >= 1) {
        $(".dec").attr("disabled", true);

    } else {
        $(".dec").attr("disabled", false);
    }
};