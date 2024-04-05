const buildLink = async (url) => {
    let requestOptions = {
      dynamicLinkInfo: {
        domainUriPrefix: 'https://gippgoodies.page.link',
        link: url,
        androidInfo: {
          androidPackageName: 'com.gipgoodies',
        },
      },
    };
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
  
    return fetch(
      'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyBft71YGZ1vPcbxfwDwmaIOJkX9Mr0hApI',
      {
        headers: myHeaders,
        body: JSON.stringify(requestOptions),
        method: 'POST',
      },
    )
      .then(response => response.json())
      .then(result => result)
      .catch(error => console.log('error', error));
  };
  
  const DynamicLinkService = {
    buildLink,
  };
  
  export default DynamicLinkService;