const APIUtil = require('./api_util');

class FollowToggle {
    constructor(button) {
        this.$button = $(button);
        this.userId = this.$button.data("user-id");
        this.followState = this.$button.data("initial-follow-state");

        this.render();
        this.$button.on('click', this.handleClick.bind(this));
    }

    render() {
        switch (this.followState) {
            case "followed":
                this.$button.html("Unfollow!");
                this.$button.prop("disabled", false);
                break;
            case "unfollowed":
                this.$button.html("Follow!");
                this.$button.prop("disabled", false);
                break;
            case "following":
                this.$button.html("Following..."); //step 2
                this.$button.prop("disabled", true);
                break;
            case "unfollowing":
                this.$button.prop("disabled", true);
                this.$button.html("Unfollowing...");
                break;
        }
    }

    handleClick(e) {
        e.preventDefault();

        const success = () => {
            this.followState = this.followState === "following" ? 'followed' : 'unfollowed'; // step 4
            this.$button.attr("data-initial-follow-state", this.followState);
            this.$button.data("initial-follow-state", this.followState);
            this.render(); //step 5 
        }

        if (this.followState === "followed") {
            this.followState = "unfollowing";
            this.render();
            APIUtil.unfollowUser(this.userId).then(success);
        } else {
            this.followState = "following";
            this.render(); // step 1
            APIUtil.followUser(this.userId).then(success); //step 3
        }
    }
}

module.exports = FollowToggle;