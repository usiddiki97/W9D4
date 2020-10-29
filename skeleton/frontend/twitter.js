const FollowToggle = require("./follow_toggle.js");

$(function () {
    $("button.follow-toggle").each(function (idx, dom) {
        let buttonData = new FollowToggle(dom);
    });
    
});