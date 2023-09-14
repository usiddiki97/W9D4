const FollowToggle = require('./follow_toggle');

$(() => {
    $("button.follow-toggle").each((idx, button) => {
        new FollowToggle(button);
    })
})