(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  // sending keypress information from keypressHandler to client?
  // ajax request to post information that will update the position of .swimmers to one of four options


  const fetchQueueSwimCommand = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      success: (data) => {
        console.log(data);
        SwimTeam.move(data);
      },
      error: (error) => {console.log(error, 'queue command get request failed')}
    });
  };

  // const fetchRandomSwimCommand = () => {
  //   $.ajax({
  //     type: 'GET',
  //     url: serverUrl,
  //     success: (data) => {
  //       console.log(data);
  //       // console.log(res._data);
  //       SwimTeam.move(data);
  //       // console.log(res);
  //     },
  //     error: (error) => {console.log(error, 'random command get request failed')}
  //   });
  // };

  $('.random').on('click', (event) => {
    fetchQueueSwimCommand();
  });

  // setInterval(fetchQueueSwimCommand(), 100);





  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
