import HttpClient from '../Utils/HttpClient';
import Storage from '../Utils/Storage';

const getRequesterOtp = async () => {
  return HttpClient.get('otp');
};
const PublishAddTask = async data => {
  return HttpClient.post('task-post-requester', data);
};
const PublishSingleTask = async data => {
  return HttpClient.post('task-post-requester-personal', data);
};
const getRequesterData = async id => {
  return HttpClient.get('task-service-requester/' + id);
};
const requesterProfileUpdate = async data => {
  return HttpClient.put('update', data);
};
const getProviderList = async () => {
  return HttpClient.get('task-get-provider');
};
const getDesc = async id => {
  return HttpClient.get('get-single-task/' + id);
};
const getBid = async id => {
  return HttpClient.get('get-bid/' + id);
};
const getProfile = async id => {
  return HttpClient.get('single-provider/' + id);
};
const getReqProfile = async id => {
  return HttpClient.get('single-requester-list/' + id);
};
const getReview = async id => {
  return HttpClient.get('view-review/' + id);
};
const acceptBid = async id => {
  return HttpClient.put('accept-bid/' + id, {});
};
const providerAccept = async data => {
  return HttpClient.post('add-task-bid', data);
};
const getPersonalList = async () => {
  return HttpClient.get('personal-task-get-provider');
};

const getAcceptedList = async () => {
  console.log('first')
  return HttpClient.get('accepted-task-requester');
};

const getTaskList = async () => {
  return HttpClient.get('provider-assigned-task');
};
const getProviderDetails = async () => {
  return HttpClient.get('get-provider-details');
};
const statusShow = async (id,data) => {
  console.log('sfdsfds',id,data)
  return HttpClient.put('change-task-status/' + id, data);
};
const paymentReq = async (id,data) => {
  return HttpClient.put('update-final-amount/' + id, data);
};
const paymentDispuit = async (id) => {
  return HttpClient.put('task-dispute/' + id, {});
};
const taskPayment = async (id,data) => {
  return HttpClient.put('task-payment/' + id, data);
};
const reviewData = async data => {
  return HttpClient.post('add-review', data);
};
const getNotipfication = async () => {
  return HttpClient.get('get-notification');
};

const notificationMood = async () => {
  return HttpClient.put('update-notification-status' ,{});
};
const profileUpdate = async () => {
  return HttpClient.get('view');
};
const statusMoodType = async () => {
  return HttpClient.get('notification-status');
};

const HomeService = {
  getRequesterOtp,
  PublishAddTask,
  getRequesterData,
  requesterProfileUpdate,
  getProviderList,
  getDesc,
  providerAccept,
  getBid,
  acceptBid,
  getProfile,
  PublishSingleTask,
  getPersonalList,
  getAcceptedList,
  getPersonalList,
  getTaskList,
  statusShow,
  reviewData,
  getProviderDetails,
  getReview,
  getReqProfile,
  paymentReq,
  paymentDispuit,
  taskPayment,
  getNotipfication,
  notificationMood,
  profileUpdate, 
  statusMoodType
};

export default HomeService;
