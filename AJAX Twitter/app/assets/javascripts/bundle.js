/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/***/ ((module) => {

const APIUtil = {
    followUser: id => APIUtil.changeFollowStatus(id, 'POST'),

    unfollowUser: id => APIUtil.changeFollowStatus(id, 'DELETE'),

    changeFollowStatus: (id, method) => {
        return $.ajax({
            url: `/users/${id}/follow`,
            dataType: 'json',
            method
        })
    }
}

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");

$(() => {
    $("button.follow-toggle").each((idx, button) => {
        new FollowToggle(button);
    })
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map