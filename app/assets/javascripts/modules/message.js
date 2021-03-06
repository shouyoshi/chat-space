$(function(){
  
  function buildingHTML(message){
    if (message.image){
      let html =
       `<div class="body-message"　data-message-id=${message.id}>
         <div class="first-message">
          <p class="name">
            ${message.user_name}
            </p>
            <p class="date">
            ${message.created_at}
            </p>
            </div>
          <div class = "main-message">
           <p class="message">
           ${message.content}
           </p>
           <img class="Message__image" src="${message.image}">
           </div>
           </div>`
          return html;
    }else{
      let html =
       `<div class="body-message" data-message-id=${message.id}>
         <div class="first-message">
          <p class="name">
            ${message.user_name}
            </p>
            <p class="date">
            ${message.created_at}
            </p>
            </div>
          <div class = "main-message">
           <p class="message">
           ${message.content}
           </p>
           </div>
           </div> `
          return html;
      };
    }
  
   $('.body-message').click(function(){
    let url = $(this).attr('action');
    $.ajax({
       url: url,
       type: "POST",
       dataType: 'json'
     })
 })

  $('.Form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildingHTML(data);
      $('.main-body').append(html);
      $('.main-body').animate({ scrollTop: $('.main-body')[0].scrollHeight});
      $(".send").prop('disabled', false);
      $('form')[0].reset();
    })
    .fail(function(){
      alert("値を入力してください");
    })
    });

});