/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

const APIUtil = {

    followUser: function (user_id){
        return $.ajax({
            method: "POST",
            url: `/users/${user_id}/follow`,
            dataType: 'json'
        })
    },
    unfollowUser: function (user_id) {
        return $.ajax({
            method: "DELETE",
            url: `/users/${user_id}/follow`,
            dataType: 'json'
        })
    }
}
// responseText: "ActiveRecord::RecordInvalid at /users/2/follow↵
// ==============================================↵↵> Validation failed: 
// Follower has already been taken↵↵app/controllers/follows_controller.rb, line 8↵-----------

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 68:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");

$(function () {
    $("button.follow-toggle").each(function (idx, dom) {
        let buttonData = new FollowToggle(dom);
    });
    
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map