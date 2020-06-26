$(function() {
   function addUser(users){
     let html = `
           <div class="ChatMember">
           <p class = "ChatMember_name">${users.name}</p> 
           <div class="ChatMember_add ChatMember_button" data-user-id="2300">追加</div>
           </div>
          `
          return html;
   }

   function addNoUser(){
    let html = `
    <div class="ChatMember">
    <p class = "ChatMember_name">ユーザーが見つかりません</p> 
    </div>
          `
    return html;
   }

  $("#UserSearch__field").on("keyup", function() {
    let input = $("#UserSearch__field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users) {
      $('#UserSearchResult').empty();
      if(users.length !== 0){
        users.forEach(function(user){
       let html = addUser(user);
       $('#UserSearchResult').append(html);
      });
      } else if (input.length == 0){
        return false
      }else{
         let html = addNoUser();
         $('#UserSearchResult').append(html);
      }
    })
    .fail(function() {
      alert("通信エラーです");
    });
  });
});