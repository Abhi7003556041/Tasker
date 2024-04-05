import Storage from '@Utils/Storage';
import AuthService from '../Services/Auth';
// import { MAIN_BASE_URL } from './EnvVariables';

const BASE_URL = `http://35.154.235.57:3070/api/v1/user/`;

// async function getToken() {
//     return await Storage.get('token');
// }

function get(endpoint) {
  return request(endpoint);
}

function post(endpoint, params) {
  return request(endpoint, params, 'POST');
}

function put(endpoint, params) {
  return request(endpoint, params, 'PUT');
}

function Delete(endpoint, params) {
  return request(endpoint, params, null, 'DELETE');
}

async function request(endpoint, params = null, method = 'GET') {
  console.log(endpoint, params, method);
  let token = await AuthService.getToken();
  // console.log('token============', token);
  var xmlRequest = new XMLHttpRequest();
  let url = BASE_URL + endpoint;

  return new Promise((resolve, reject) => {
    xmlRequest.open(method, url, true);

    xmlRequest.setRequestHeader('Accept', '*/*');
    xmlRequest.setRequestHeader('Content-Type', 'application/json');
    xmlRequest.setRequestHeader('userType', 'User');
    xmlRequest.setRequestHeader('Authorization', token);
    if (method == 'GET') {
      xmlRequest.send();
    } else {
      xmlRequest.send(JSON.stringify(params));
    }

    xmlRequest.onreadystatechange = function () {
      // Call a function when the state changes.
      // console.log("token---",token)
      if (xmlRequest.readyState === XMLHttpRequest.DONE) {
        // console.log("xmlRequest.status", xmlRequest.status);
        // console.log('xmlRequest.response',xmlRequest.response);
        if (xmlRequest.status === 200) {
          resolve(JSON.parse(xmlRequest.response));
        } else {
          try {
            reject(JSON.parse(xmlRequest.response));
          } catch (err) {
            reject({
              error: 'Server Error Please try again later !!!',
              actError: err,
            });
          }
        }
      }
    };
  });
}

async function multiupload(endpoint, method, files = [], object_get = {}) {
  let token = await getToken();

  var xmlRequest = new XMLHttpRequest();
  let url = BASE_URL + endpoint;

  var data = new FormData();

  let objArray = Object.keys(object_get);
  objArray.forEach(element => {
    data.append(element, object_get[element]);
  });

  files.forEach(async element => {
    let get_originalname = await getOriginalname(element.path);
    data.append(element.key, {
      uri: element.path,
      type: felementile.mime,
      name: get_originalname,
    });
  });

  return new Promise((resolve, reject) => {
    xmlRequest.open(method, url, true);

    xmlRequest.setRequestHeader('Accept', '/');
    xmlRequest.setRequestHeader('Content-Type', 'multipart/form-data');
    xmlRequest.setRequestHeader('cache-control', 'no-cache');
    xmlRequest.setRequestHeader('Authorization', token);

    xmlRequest.send(data);

    xmlRequest.onreadystatechange = function () {
      // Call a function when the state changes.
      if (xmlRequest.readyState === XMLHttpRequest.DONE) {
        if (xmlRequest.status === 200) {
          resolve(JSON.parse(xmlRequest.response));
        } else {
          try {
            reject(JSON.parse(xmlRequest.response));
          } catch (err) {
            reject({
              error: 'Server Error Please try again later !!!',
              actError: err,
            });
          }
        }
      }
    };
  });
}

async function upload(url, method, file, object_get = {}, tokenCustom = null) {
  let token = await AuthService.getToken();
  console.log('File///', file.path);
  // let login_status = await AuthService.getToken();
  // if (tokenCustom !== null) {
  //     login_status = tokenCustom;
  // }

  let apiUrl = BASE_URL + url;

  let headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: token,
    userType: 'User',
    // 'Access-Control-Allow-Origin': "https://devcab.herokuapp.com",
    // 'Authorization': 'Bearer ' + login_status,
  };

  console.log('apiUrl', apiUrl);
  const data = new FormData();
  console.log('data--------->>', data);
  let get_originalname = await getOriginalname(file.path);
  console.log('get_originalname', get_originalname);
  data.append('image', {
    uri: file.path,
    type: file.mime,
    name: get_originalname,
  });

  let objArray = Object.keys(object_get);

  objArray.forEach(element => {
    data.append(element, object_get[element]);
  });

  return fetch(apiUrl, {
    headers,
    method: 'post',
    body: data,
  })
    .then(response => response.json())
    .then(response => {
      return response;
    });
}

async function uploadRegisterImage(url, method, file, object_get = {}, tokenCustom = null) {
  // let token = await AuthService.getToken();
  console.log('File///', file.path);
  // let login_status = await AuthService.getToken();
  // if (tokenCustom !== null) {
  //     login_status = tokenCustom;
  // }

  let apiUrl = BASE_URL + url;

  // let headers = {
  //   Accept: 'application/json',
  //   'Content-Type': 'multipart/form-data',
  //   Authorization: token,
  //   userType: 'User',
  //   // 'Access-Control-Allow-Origin': "https://devcab.herokuapp.com",
  //   // 'Authorization': 'Bearer ' + login_status,
  // };

  console.log('apiUrl', apiUrl);
  const data = new FormData();
  console.log('data--------->>', data);
  let get_originalname = await getOriginalname(file.path);
  console.log('get_originalname', get_originalname);
  data.append('image', {
    uri: file.path,
    type: file.mime,
    name: get_originalname,
  });

  let objArray = Object.keys(object_get);

  objArray.forEach(element => {
    data.append(element, object_get[element]);
  });

  return fetch(apiUrl, {
    // headers,
    method: 'post',
    body: data,
  })
    .then(response => response.json())
    .then(response => {
      return response;
    });
}

async function getOriginalname(data) {
  let arr = data.split('/');
  let lent = Number(arr.length - 1);
  return arr[lent];
}

const HttpClient = {
  get,
  post,
  put,
  Delete,
  multiupload,
  upload,
  uploadRegisterImage
};

export default HttpClient;
