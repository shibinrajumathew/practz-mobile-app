import React, { Component } from 'react';

const URL=
{
  HOME:'https://demo.practz.com',
  // API'S
  AUTHENTICATION:'/practz/ilearn/v1/authorization',
  USER:'/practz/v1/users/',
  ATTENDED_EXAM_PROGRESS:'/practz/ilearn/v1/dashboards/attended-exams/?',
  AVAILABLE_EXAM:'/practz/ilearn/v1/questions/active-exams/?',
  START_EXAM:'/practz/ilearn/v1/questions/startQuiz/',
  PROGRESS:'/practz/ilearn/v1/questions/',
  ONGOING_EXAM:'/practz/ilearn/v2/questions/ongoing-exams/?',
  EXAM_DETAILS:'/practz/ilearn/v1/questionpapers/schedule/data?',
  AVAILABLE_NOTES:'/practz/ilearn/v1/notes/all-for-user?',
  ANSWER_STATUS:'/practz/ilearn/v1/questions/review/minimal/style/?',


};
export default URL
