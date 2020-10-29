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