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