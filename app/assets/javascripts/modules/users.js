$(function() {
   function addUser(users){
     let html = `
           <div class="ChatMember">
           <p class = "ChatMember_name">${users.name}</p> 
           <div class="ChatMember__add ChatMember__button" data-user-id="${users.id}" data-user-name="${users.name}">追加</div>
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

   function addMember(name, id) {
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">${name}</p>
                  <input name="group[user_ids][]" type="hidden" value="${id}" />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>
                `;
    $(".ChatMembers").append(html);
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
  $("#UserSearchResult").on("click", ".ChatMember__add", function(){
    const userName = $(this).attr("data-user-name");
    console.log(userName);
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addMember(userName, userId);
  })
  $(".ChatMembers").on("click", ".ChatMember__remove", function() {
    $(this).parent().remove();
  });
});