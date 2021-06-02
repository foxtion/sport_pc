import {get,post} from "_s/axios";


//密码登入
export const Login = (params) => post({ url: 'Login.userLogin', params})

//验证码登入
export const PhoneLogin = (params) => post({ url: 'Login.userMobileLogin', params})

//获取验证码
export const Getcode = (params) => post({ url: 'Login.getCode', params})

//注册
export const Register = (params) => post({ url: 'Login.userReg', params})

//找回密码
export const UserFindPass = (params) => post({ url: 'Login.userFindPass', params})

//改绑手机
export const ChangeMobile = (params) => post({ url: 'User.modifyMobile', params})

//修改密码
export const ChangePass = (params) => post({ url: 'User.updatePass', params})

// 上传图片base64
export const UploadPictures = (params) => post({ url: 'User.uploadPicturesBase64', params})

//修改用户信息
export const UpdateProfile = (params) => post({ url: 'User.updateFields', params})

//获取用户信息
export const GetUserinfo = (params) => post({ url: 'User.getUserinfo', params})


//用户绑定银行卡
export const UserBindAccount = (params) => post({ url: 'User.userBindAccount', params})

//设置安全密码
export const SecurityPass = (params) => post({ url: 'User.securityPass', params})

//用户预约列表
export const AppointmentList = (params) => post({ url: 'Make.appointmentList', params})

//用户预约
export const Appointment = (params) => post({ url: 'Make.appointment', params})

// 更换昵称
export const changeNick = (params) => post({ url: 'User.changeNick', params})

// 头像
export const uploadPicturesBase64 = (params) => post({ url: 'Upload.uploadPicturesBase64', params})

// 充值
export const UserRecharge = (params) => post({ url: 'Pay.UserRecharge', params})

// 充值记录
export const rechargeList = (params) => post({ url: 'User.rechargeList', params})

// 申请主播
export const live_auth_info = (params) => post({ url: 'User.live_auth_info', params})
