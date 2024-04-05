import HttpClient from '../Utils/HttpClient';
import Storage from '../Utils/Storage';

const requesterRegister = async data => {
  console.log('first',data)
  return HttpClient.post('register', data);
};
const getRequesterOtp = async () => {
  return HttpClient.get('otp');
};
const getCity = async data => {
  return HttpClient.post('fetch-city-postalCode', data);
};
const provProfileUpdate = async data => {
  return HttpClient.post('provider-profile-update', data);
};
const getProvCategory = async () => {
  return HttpClient.get('category-get');
};
const getServiceWiseProviders = async (id, data) => {
  return HttpClient.post('service-wise-provider/' + id, data);
};
const getExperinceCount = async () => {
  return HttpClient.get('get-experience');
};
const getProvServiceLoca = async () => {
  return HttpClient.get('service-location');
};
const login = async data => {
  return HttpClient.post('login', data);
};
const getProvService = async id => {
  return HttpClient.get('sub-category-get/' + id);
};
const getProvHourly = async () => {
  return HttpClient.get('hourly-rate');
};
const getProvCountry = async () => {
  return HttpClient.get('get-country');
};
const getProvminTime = async () => {
  console.log('BAL');
  return HttpClient.get('mintime');
};
async function uploadimage(data) {
  let endpoint = 'upload';
  return HttpClient.upload(endpoint, 'POST', data, {});
}
async function uploadRegFile(data) {
  let endpoint = 'upload-new';
  return HttpClient.uploadRegisterImage(endpoint, 'POST', data, {});
}
const getAccount = async () => {
  return Storage.get('account');
};

const setAccount = async data => {
  return Storage.set('account', data);
};

const setToken = async data => {
  return Storage.set('token', data);
};
const getToken = async () => {
  return Storage.get('token');
};
const setNotifactionToken = async data => {
  return Storage.set('Fmctoken', data);
};
const getNotifactionToken = async () => {
  return Storage.get('Fmctoken');
};
const googleAccountReg = async data => {
  return HttpClient.post('google-register', data);
};
const googleAccountLogin = async data => {
  return HttpClient.post('google-login', data);
};
const forgetPass = async (data) => {
  return HttpClient.put('forget-password', data,{});
};
const changepass = async (data) => {
  return HttpClient.put('password-change', data,{});
};

const AuthService = {
  setNotifactionToken,
  getNotifactionToken,
  getAccount,
  requesterRegister,
  setAccount,
  setToken,
  getToken,
  getRequesterOtp,
  getCity,
  provProfileUpdate,
  getProvCategory,
  getProvService,
  uploadimage,
  login,
  getProvHourly,
  getProvminTime,
  getProvCountry,
  getProvServiceLoca,
  getExperinceCount,
  getServiceWiseProviders,
  uploadRegFile,
  googleAccountReg,
  googleAccountLogin,
  forgetPass,
  changepass
  
};

export default AuthService;
