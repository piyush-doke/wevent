import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const CreatePlanPage = React.lazy(() => import('../pages/CreatePlanPage'));
const UpdatePlanPage = React.lazy(() => import('../pages/UpdatePlanPage'));
const PlanFeedPage = React.lazy(() => import('../pages/PlanFeedPage'));
const HomePage = React.lazy(() => import('../pages/HomePage'));
const SearchEventsFeedPage = React.lazy(() => import('../pages/SearchEventsFeedPage'));
const RegisterPage = React.lazy(() => import('../pages/RegisterPage'));
const VerifyPage = React.lazy(() => import('../pages/VerifyPage'));
const LogInPage = React.lazy(() => import('../pages/LogInPage'));
const ForgotPasswordPage = React.lazy(() => import('../pages/ForgotPasswordPage'));
const ForgotPasswordVerificationPage = React.lazy(() => import('../pages/ForgotPasswordVerificationPage'));
const ChangePasswordPage = React.lazy(() => import('../pages/ChangePasswordPage'));
const ChangePasswordConfirmationPage = React.lazy(() => import('../pages/ChangePasswordConfirmationPage'));

const route = [
    { path: '/createplan', exact: true, name: 'CreatePlan', component: CreatePlanPage },
    { path: '/updateplan', exact: true, name: 'UpdatePlan', component: UpdatePlanPage },
    { path: '/plans', exact: true, name: 'PlanFeed', component: PlanFeedPage },
    { path: '/', exact: true, name: 'Home', component: HomePage },
    { path: '/searchEvents', exact: true, name: 'SearchEvents', component: SearchEventsFeedPage },
    { path: '/register', exact: true, name: 'Register', component: RegisterPage },
    { path: '/verify', exact: true, name: 'Verify', component: VerifyPage },
    { path: '/login', exact: true, name: 'LogIn', component: LogInPage },
    { path: '/forgotpassword', exact: true, name: 'ForgotPassword', component: ForgotPasswordPage },
    { path: '/forgotpasswordverification', exact: true, name: 'ForgotPasswordVerification', component: ForgotPasswordVerificationPage },
    { path: '/changepassword', exact: true, name: 'ChangePassword', component: ChangePasswordPage },
    { path: '/changepasswordconfirmation', exact: true, name: 'ChangePasswordConfirmation', component: ChangePasswordConfirmationPage }
];

export default route;