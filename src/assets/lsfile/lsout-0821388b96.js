// var _x8283 = ["ajaxSetup", "parseJSON", "code", "data", "parse", "split", "MEMBER", "", "each", ".leisu-replace .fugai", "hasClass", "gotit", "removeClass", "dn", "addClass", "anma", "DIFFTIME", "getItem", "LSdifftime", "APIWEB", "ajax", "/v1/web/public/time", "GET", "json", "setItem", "setTimeout", "38cc79xc", "&IjgE8Rf0", "use", "uab", "loaded", "um", "init", "saf-aliyun-com", "success", "tn", "getUA", "showGoal2Number", "prototype", "match", "trim", "length", "HMT_VG", "addEventListener", "body", "mousemove", "tags_HMT_VL", "goLoginCallback", "header", "#head_vueArea", "isShow", "$nextTick", "closeLog", "log", "$refs", "body-tr-none", "获取验证码", "HOME", "/user_register", "/user_use", "/privacy", "test", "name", "name_err", "请输入昵称", "name_handl", "password", "password_err", "请输入密码", "password_handl", "密码应为6-30位", "privacy", "localStorage_privacy", "privacy_err", "请先阅读并勾选同意《雷速体育用户注册协议》、《雷速体育用户使用协议》、《雷速体育隐私政策》", "privacy_handl", "code_err", "请输入验证码", "code_handl", "send_code_obj", "alt", "page", "尚未通过智能验证", "send_msg_ing", "send_msg_txt", "发送中..", "state", "sessionid", "sig", "nc_token", "/v1/web/member/send_code", "POST", "验证码发送成功", "重新获取验证码", "reset", "ic", "重新发送(", ")", "msg", "verification_name", "verification_password", "verification_privacy", "isNeedPhone", "verification_code", "post_with_phone", "post_with_null", "/v1/web/member/login", "historyBack", "phone", "/v1/web/member/login_via_code", "initUser", "clearTimeout", "handddd", "getElementById", "SM_POP_1", "height", "style", "SM_BTN_WRAPPER_1", "#SM_POP_1", "px", "auto", "watchdom", "#sc", "点击按钮开始智能验证", "验证成功", "验证失败，请在此点击按钮刷新", "智能检测中", "token", "sessionId", "href", "location", "links", "initYZM", "errorHandler", "config", "component", "el-dialog", "title", "width", "visible", "top", "innervisible", "$emit", "closed", "rstop", "el-upload", "target", "change", "files"];

function get_difftime(e) {
    STATIC_CONFIG[_x8283[19]] ? $[_x8283[20]]({
        url: STATIC_CONFIG[_x8283[19]] + _x8283[21],
        type: _x8283[22],
        dataType: _x8283[23],
        success: function(t) {
            0 == t[_x8283[2]] && (difftime = Date[_x8283[4]](new Date) / 1e3 - t[_x8283[3]], STATIC_CONFIG[_x8283[16]] = difftime, localStorage[_x8283[24]](_x8283[18], difftime), e && e())
        }
    }) : window[_x8283[25]](get_difftime, 100)
}
$[_x8283[0]]({
    converters: {
        "text json": function(e) {
            let t = $[_x8283[1]](e);
            return 1 == t[_x8283[2]] && (t[_x8283[2]] = 0, t[_x8283[3]] = JSON[_x8283[4]](findchild(t[_x8283[3]], cheoseMsg((STATIC_CONFIG[_x8283[6]] + window[dabrtu10])[_x8283[5]](_x8283[7]))))), t
        }
    }
}), $(_x8283[9])[_x8283[8]](function() {
    $(this)[_x8283[10]](_x8283[11]) ? $(this)[_x8283[12]](_x8283[13]) : $(this)[_x8283[12]](_x8283[13])[_x8283[14]](_x8283[15])
}), STATIC_CONFIG[_x8283[16]] = localStorage[_x8283[17]](_x8283[18]), STATIC_CONFIG[_x8283[16]] || (STATIC_CONFIG[_x8283[16]] = 0, get_difftime());
var uabModule, webUmidToken, header_vue, lstaoken = _x8283[26],
    lastLock = _x8283[27];

function settk() {
    AWSC[_x8283[28]](_x8283[31], function(e, t) {
        e === _x8283[30] && t[_x8283[32]]({
            appName: _x8283[33]
        }, function(e, t) {
            e === _x8283[34] ? (webUmidToken = t[_x8283[35]], $[_x8283[0]]({
                headers: {
                    webUmidToken: webUmidToken,
                    uaToken: uabModule[_x8283[36]]()
                }
            })) : window[_x8283[25]](settk, 300)
        })
    })
}
AWSC[_x8283[28]](_x8283[29], function(e, t) {
    e === _x8283[30] && (uabModule = t)
}), settk(), String[_x8283[38]][_x8283[37]] = function() {
    if (this) {
        if (this[_x8283[40]]()[_x8283[39]](/^-?\d*\.?\d+$/)) {
            let e = this[_x8283[41]],
                t = _x8283[7];
            for (let s = 0; s < e; s++) t += this[s];
            return t
        }
        return _x8283[7]
    }
    return _x8283[7]
}, $(function() {
    localStorage[_x8283[17]](_x8283[42]) || document[_x8283[44]][_x8283[43]](_x8283[45], $[_x8283[46]]), Login[_x8283[47]][_x8283[48]] = function() {
        setHeader()
    }, header_vue = new Vue({
        el: _x8283[49],
        data: {
            isShow: !1
        },
        methods: {
            showLog() {
                this[_x8283[50]] = !0
            }, closeLog() {
                this[_x8283[50]] = !1
            }
        },
        components: {
            create_log: vue_login
        },
        watch: {
            isShow: function(e) {
                e && this[_x8283[51]](() => {
                    this[_x8283[54]][_x8283[53]][_x8283[52]] = this[_x8283[52]]
                })
            }
        }
    }), setTimeout(function() {
        $(_x8283[44])[_x8283[12]](_x8283[55])
    }, 100)
});
var vue_login = {
    props: [],
    data: function() {
        return {
            isNeedPhone: !1,
            name: _x8283[7],
            name_err: !1,
            name_handl: null,
            password: _x8283[7],
            password_err: !1,
            password_handl: null,
            privacy: _x8283[7],
            privacy_err: !1,
            privacy_handl: null,
            code: _x8283[7],
            code_err: !1,
            code_handl: null,
            phone: _x8283[7],
            monthLogin: !0,
            send_code_obj: null,
            send_msg_ing: !1,
            send_msg_txt: _x8283[56],
            handddd: null,
            ic: null,
            closeLog: null,
            links: STATIC_CONFIG[_x8283[57]],
            state: null
        }
    },
    template: `\n        <div id="login" class="login-area-tc">\n            <div class="row row-tow">\n                <div class="text-box" :class="name_err?'error':''" :data-hint="name_err">\n                    <input class="text w-308"  v-model="name" @blur="verification_name()" type="text" placeholder="昵称/手机号码"/>\n                </div>\n            </div>\n            <div class="row row-tow">\n                <div class="text-box m-t-16" :class="password_err?'error':''"  :data-hint="password_err">\n                    <input class="text w-308"   v-model="password"  @blur="verification_password()" type="password" placeholder="登录密码（6-30位）" autocomplete="off"/>\n                </div>\n            </div>\n\n            <div class="row row-tow phone-code-page"  v-if="isNeedPhone">\n                <div class="row f-s-12 color-de1e30 text-a-l m-t-10">\n                    您未在常用地点登录，请进行短信验证；\n                </div>\n                <div class="text-box phone-panel m-t-10">\n                    \n                    <input class="text w-218 phone"  v-model="phone" disabled  type="text" placeholder="请输入手机号" />\n                    <span id="sendSMS" class="get-phone">\n                        <i class="iconfont icon-phone"></i>\n                        <span class="t" @click="send_msg" v-text="send_msg_txt"></span>\n                    </span>\n                </div>\n                <div class="text-box m-t-16" :class="code_err?'error':''"  :data-hint="code_err">\n                    <input id="verif" class="text w-308 verif"  v-model="code" @blur="verification_code()"  type="text" placeholder="验证码"/>\n                </div>\n            </div>\n\n            \n            <div class="row row-tow checkbox-area">\n                <label class="checkbox">\n                    <span class="check" :class="monthLogin?'checked':''">\n                                     </label>\n                <a class="link float-right f-s-12 color-de1e30" :href="links+'/user/register'">新用户注册</a>\n                <a class="link float-right f-s-12 color-bbb m-r-10" style="color: #777;" :href="links+'/user/forgot-password'" target="_blank">找回密码</a>\n            </div>\n            <div class="row row-tow m-b-10"  @click="watchdom">\n                <div id="sc"></div>\n            </div>\n        \n            <div class="row row-tow m-t-16">\n                <a class="button btn-border active submit line-h-40 w-308" @click="goLogin">\n                    登录\n                </a>\n            </div>\n            \n            <div class="row row-tow checkbox-area" >\n                <div class="text-box"  :class="privacy_err?'error':''" :data-hint="privacy_err">\n                    <label class="checkbox" @click.stop="setPrivacy" style="float: left;">\n                        <span class="check" :class="privacy == 1?'checked':''">\n                            <input @click.stop="" type="checkbox" :checked ="privacy" name="checks" ref="checks" />\n                        </span>\n                        我已阅读并同意\n                    </label>\n                    \n                    <a href="${STATIC_CONFIG[_x8283[57]]+_x8283[58]}" target="_blank" style=" color:#1196EE; cursor: pointer;">《体育用户注册协议》</a>\n                    <span style="color: #777;">、</span>\n                                      <span style="color: #777;">、</span>\n                    <a href="${STATIC_CONFIG[_x8283[57]]+_x8283[60]}" target="_blank" style=" color:#1196EE; cursor: pointer;">《体育隐私政策》</a>\n                </div>\n                \n            </div>\n                      \n        </div>`,
    methods: {
        yzPhone: e => /^1[3456789*]\d{9}$/ [_x8283[61]](e),
        init() {},
        initUser() {},
        verification_name() {
            this[_x8283[62]] == _x8283[7] ? (this[_x8283[63]] = _x8283[64], this[_x8283[65]] && clearTimeout(this[_x8283[65]]), this[_x8283[65]] = setTimeout(() => {
                this[_x8283[63]] = !1
            }, 1e3)) : this[_x8283[63]] = null
        },
        verification_password() {
            this[_x8283[66]] == _x8283[7] ? (this[_x8283[67]] = _x8283[68], this[_x8283[69]] && clearTimeout(this[_x8283[69]]), this[_x8283[69]] = setTimeout(() => {
                this[_x8283[67]] = !1
            }, 1e3)) : this[_x8283[66]][_x8283[41]] < 6 || this[_x8283[66]][_x8283[41]] > 30 ? (this[_x8283[67]] = _x8283[70], this[_x8283[69]] && clearTimeout(this[_x8283[69]]), this[_x8283[69]] = setTimeout(() => {
                this[_x8283[67]] = !1
            }, 1e3)) : this[_x8283[67]] = !1
        },
        verification_privacy() {
            this[_x8283[71]] = localStorage[_x8283[17]](_x8283[72]), 1 != this[_x8283[71]] ? (this[_x8283[73]] = _x8283[74], this[_x8283[75]] && clearTimeout(this[_x8283[75]]), this[_x8283[75]] = setTimeout(() => {
                this[_x8283[73]] = !1
            }, 1e3)) : this[_x8283[73]] = null
        },
        verification_code() {
            this[_x8283[2]] == _x8283[7] ? (this[_x8283[76]] = _x8283[77], this[_x8283[78]] && clearTimeout(this[_x8283[78]]), this[_x8283[78]] = setTimeout(() => {
                this[_x8283[76]] = !1
            }, 1e3)) : this[_x8283[76]] = null
        },
        setPrivacy() {
            this[_x8283[71]] ? (localStorage[_x8283[24]](_x8283[72], 0), this[_x8283[71]] = !1) : (this[_x8283[71]] = !0, localStorage[_x8283[24]](_x8283[72], 1))
        },
        send_msg() {
            if (!this[_x8283[79]]) return void Dialog[_x8283[81]][_x8283[80]]({
                speed: 1e3,
                title: !1,
                close: !1,
                temp: _x8283[82]
            });
            if (this[_x8283[83]]) return !1;
            this[_x8283[83]] = !0, this[_x8283[84]] = _x8283[85];
            let e = {
                scene: 1,
                state: this[_x8283[86]],
                afs_session: this[_x8283[79]][_x8283[87]],
                afs_sign: this[_x8283[79]][_x8283[88]],
                afs_token: this[_x8283[79]][_x8283[89]]
            };
            $[_x8283[20]]({
                url: STATIC_CONFIG[_x8283[19]] + _x8283[90],
                type: _x8283[91],
                dataType: _x8283[23],
                data: e,
                headers: {
                    webUmidToken: webUmidToken,
                    uaToken: uabModule[_x8283[36]]()
                },
                xhrFields: {
                    withCredentials: !0
                },
                success: e => {
                    if (0 == e[_x8283[2]]) {
                        Dialog[_x8283[81]][_x8283[80]]({
                            speed: 1e3,
                            title: !1,
                            close: !1,
                            temp: _x8283[92]
                        });
                        let e = t => {
                            if (0 == --t) return this[_x8283[83]] = !1, this[_x8283[84]] = _x8283[93], this[_x8283[79]] = null, void this[_x8283[95]][_x8283[94]]();
                            window[_x8283[25]](() => {
                                this[_x8283[84]] = _x8283[96] + t + _x8283[97], e(t)
                            }, 1e3)
                        };
                        e(60)
                    } else this[_x8283[83]] = !1, this[_x8283[84]] = _x8283[93], this[_x8283[95]][_x8283[94]](), Dialog[_x8283[81]][_x8283[80]]({
                        speed: 2e3,
                        title: !1,
                        close: !1,
                        temp: e[_x8283[98]]
                    })
                }
            })
        },
        goLogin: function() {
            if (this[_x8283[79]]) {
                if (this[_x8283[99]](), this[_x8283[100]](), this[_x8283[101]](), !(this[_x8283[67]] || this[_x8283[63]] || this[_x8283[73]]))
                    if (this[_x8283[102]]) {
                        if (this[_x8283[103]](), this[_x8283[76]]) return;
                        this[_x8283[104]]()
                    } else this[_x8283[105]]()
            } else Dialog[_x8283[81]][_x8283[80]]({
                speed: 1e3,
                title: !1,
                close: !1,
                temp: _x8283[82]
            })
        },
        post_with_null() {
            let e = {
                name: this[_x8283[62]],
                password: this[_x8283[66]],
                afs_session: this[_x8283[79]][_x8283[87]],
                afs_sign: this[_x8283[79]][_x8283[88]],
                afs_token: this[_x8283[79]][_x8283[89]]
            };
            $[_x8283[20]]({
                url: STATIC_CONFIG[_x8283[19]] + _x8283[106],
                type: _x8283[91],
                dataType: _x8283[23],
                data: e,
                xhrFields: {
                    withCredentials: !0
                },
                success: e => {
                    0 == e[_x8283[2]] ? this[_x8283[107]]() : 201003 == e[_x8283[2]] ? (e[_x8283[3]] ? (this[_x8283[86]] = e[_x8283[3]][_x8283[86]], this[_x8283[108]] = e[_x8283[3]][_x8283[108]]) : this[_x8283[108]] = this[_x8283[62]], this[_x8283[102]] = !0, this[_x8283[95]][_x8283[94]](), this[_x8283[79]] = null) : (this[_x8283[95]][_x8283[94]](), this[_x8283[79]] = null, Dialog[_x8283[81]][_x8283[80]]({
                        speed: 2e3,
                        title: !1,
                        close: !1,
                        temp: e[_x8283[98]]
                    }))
                }
            })
        },
        post_with_phone() {
            let e = {
                state: this[_x8283[86]],
                code: this[_x8283[2]]
            };
            $[_x8283[20]]({
                url: STATIC_CONFIG[_x8283[19]] + _x8283[109],
                type: _x8283[91],
                dataType: _x8283[23],
                data: e,
                xhrFields: {
                    withCredentials: !0
                },
                success: e => {
                    0 == e[_x8283[2]] ? this[_x8283[107]]() : Dialog[_x8283[81]][_x8283[80]]({
                        speed: 2e3,
                        title: !1,
                        close: !1,
                        temp: e[_x8283[98]]
                    })
                }
            })
        },
        historyBack: function() {
            this[_x8283[52]](), Login[_x8283[110]]()
        },
        watchdom() {
            window[_x8283[111]](this[_x8283[112]]);
            try {
                document[_x8283[113]](_x8283[114]) ? document[_x8283[113]](_x8283[117])[_x8283[116]][_x8283[115]] = $(_x8283[118])[_x8283[115]]() + _x8283[119] : document[_x8283[113]](_x8283[117])[_x8283[116]][_x8283[115]] = _x8283[120], this[_x8283[112]] = window[_x8283[25]](this[_x8283[121]], 200)
            } catch (e) {}
        },
        initYZM() {
            let e = this;
            this[_x8283[95]] = new smartCaptcha({
                renderTo: _x8283[122],
                width: 300,
                height: 42,
                default_txt: _x8283[123],
                success_txt: _x8283[124],
                fail_txt: _x8283[125],
                scaning_txt: _x8283[126],
                success: function(t) {
                    var s = {
                        nc_token: NVC_Opt[_x8283[127]],
                        sessionid: t[_x8283[128]],
                        sig: t[_x8283[88]]
                    };
                    e[_x8283[79]] = s
                },
                fail: function() {}
            }), this[_x8283[95]][_x8283[32]]()
        },
        outLogin(e) {
            this[_x8283[101]](), this[_x8283[73]] || (window[_x8283[130]][_x8283[129]] = e)
        }
    },
    created() {
        this[_x8283[131]] = STATIC_CONFIG[_x8283[57]], this[_x8283[71]] = localStorage[_x8283[17]](_x8283[72]), load_ali_captcha(() => {
            this[_x8283[132]]()
        })
    }
};
Vue[_x8283[134]][_x8283[133]] = function(e, t, s) {
    throw e
}, Vue[_x8283[135]](_x8283[136], {
    data: () => ({
        rstop: 0,
        innervisible: !0
    }),
    props: [_x8283[137], _x8283[138], _x8283[139], _x8283[140]],
    template: "\n    <div class='mydialog-bg' v-show='visible' v-on:click.stop=\"closed\">\n        <div :style=\"'width:'+width+';margin-top:'+rstop+'px;'\" class='mydialog' :class=\"innervisible?'show':'hide'\"  v-on:click.stop=\"\">\n            <div class='title'>{{title}}<span class='closed icon iconfont icon-close' v-on:click.stop=\"closed\"></span></div>\n            <div class=\"cont\"><slot></slot></div>\n            \n        </div>\n    </div>\n    ",
    methods: {
        closed() {
            this[_x8283[141]] = !1, window[_x8283[25]](() => {
                this[_x8283[142]](_x8283[143], _x8283[7])
            }, 400)
        }
    },
    created() {
        this[_x8283[144]] = this[_x8283[140]] ? this[_x8283[140]] : 200
    },
    watch: {
        visible() {
            this[_x8283[141]] = this[_x8283[139]]
        }
    }
}), Vue[_x8283[135]](_x8283[145], {
    data: () => ({
        rstop: 0,
        innervisible: !0
    }),
    props: [_x8283[137], _x8283[138], _x8283[139], _x8283[140]],
    template: '\n    <div>\n        <div class=\'myupload\'>\n            <input type="file" class="filesss" @change="getFile($event)">\n        </div>\n        <slot></slot>\n    </div>\n    ',
    methods: {
        getFile(e) {
            let t = e[_x8283[146]];
            this[_x8283[142]](_x8283[147], t[_x8283[148]][0])
        }
    },
    created() {
        this[_x8283[144]] = this[_x8283[140]] ? this[_x8283[140]] : 200
    },
    watch: {
        visible() {
            this[_x8283[141]] = this[_x8283[139]]
        }
    }
});