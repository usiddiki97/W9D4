const APIUtil = require("./api_util.js");

function FollowToggle (el){
    // this.options = options;
    this.$el = $(el);
    this.userId = this.$el.data("user-id") ;
    this.followState = this.$el.data("initial-follow-state");

    this.render();
    this.$el.on('click', this.handleClick.bind(this));   
}

FollowToggle.prototype.render = function() {
    if (this.followState === "unfollowed") {
        this.$el.text("Follow!");
        this.$el.prop("disabled", false);
    } else if (this.followState === "followed"){
        this.$el.text("Unfollow!");
        this.$el.prop("disabled", false);
    } else if (this.followState === "unfollowing"){
        this.$el.text("Unfollowing...");
        this.$el.prop("disabled", true);
    } else {
        this.$el.text("Following...");
        this.$el.prop("disabled", true);
    }
}

FollowToggle.prototype.handleClick = function (event) {
    event.preventDefault();
    
    // const errors

    if (this.followState === "unfollowed") {
        const success = function () {
            console.log("success Follow")
            this.followState = "followed";
            this.$el.attr("data-initial-follow-state", "followed");
            this.render();
        }.bind(this);

        const error = function (errors) {
            console.log(errors);
        }.bind(this);

        this.followState = "following";
        this.render();
        APIUtil.followUser(this.userId).then(success, error);
    } else {
        const success = function (data) {
                console.log("success UNFOLLOW");
                this.followState = "unfollowed";
                this.$el.attr("data-initial-follow-state", "unfollowed");
                this.render();
        }.bind(this);

        const error = function (errors) {
            console.log(errors);
        }.bind(this);

        this.followState = "unfollowing";
        this.render();
        APIUtil.unfollowUser(this.userId).then(success, error);
    }
}


module.exports = FollowToggle;