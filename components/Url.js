import React, { Component } from 'react';

const URL=
{
  //Author shibin
  HOME:'https://demo.practz.com',
  // API'S
  AUTHENTICATION:'/practz/ilearn/v1/authorization',
  USER:'/practz/v1/users/',
  ATTENDED_EXAM_PROGRESS:'/practz/ilearn/v1/dashboards/attended-exams/?',
  AVAILABLE_EXAM:'/practz/ilearn/v1/questions/active-exams/?',
  START_EXAM:'/practz/ilearn/v1/questions/',
  PROGRESS:'/practz/ilearn/v1/questions/',
  ONGOING_EXAM:'/practz/ilearn/v2/questions/ongoing-exams/?',
  EXAM_DETAILS:'/practz/ilearn/v1/questionpapers/schedule/data?',
  AVAILABLE_NOTES:'/practz/ilearn/v1/notes/all-for-user?',
  ANSWER_STATUS:'/practz/ilearn/v1/questions/review/minimal/style/?',
  REVIEW:'/practz/ilearn/v1/questions/reviewQuestion/',
  PRODUCT:'/practz/ilearn/v1/b2c/products/series/available?',
  ADDTOCART:'/practz/mozea/v1/orders/additem/user/',
  SUBMIT_ANSWER:'/practz/ilearn/v1/questions/submitAnswer',
  REVIEW_EXAM:'/practz/ilearn/v1/questions/reviewExam/',


// author hari

NOTE_DETAILS:'/practz/ilearn/v1/notes/',
ATTEMPTED_EXAM_DETAILS:'/practz/ilearn/v1/questions/examSummary/secure/',
AVAILABLE_EXAMS:'/practz/ilearn/v1/questions/active-exams/?GwTemplateId=exam&userId=',
ACCOUNT_SETTINGS:'/practz/v1/users/',
UPDATE:'/practz/ilearn/v2/users/my-account/update',
CHANGE_PASSWORD:'/practz/ilearn/v2/users/password',
HISTORIC_PATTERN:'/practz/ilearn/v1/reports/graphs'
};
export default URL
