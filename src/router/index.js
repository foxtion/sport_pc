import Vue from 'vue'
import VueRouter from 'vue-router'
import $store from "../store/index.js"
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            myCenterIndex: 0,
            title:"一度体育"
        }
    },

    {
        path: '/LiveType',
        name: 'LiveType',
        component: function () {
            return import('../views/LiveType.vue')
        },
        redirect: "/LiveType/liveLists",
        children: [
            {
                path: 'liveLists',
                name: 'liveLists',
                component: function () {
                    return import('../views/livesteam/liveLists.vue')
                },
                meta: {
                    myCenterIndex: 0,
                    title:"直播"
                }
            },
            {
                path: 'followList',
                name: 'followList',
                component: function () {
                    return import('../views/livesteam/followList.vue')
                },
                meta: {
                    myCenterIndex: 0,
                    title:"关注"
                }
            },
            {
                path: 'myList',
                name: 'myList',
                component: function () {
                    return import('../views/livesteam/myList.vue')
                },
                meta: {
                    myCenterIndex: 0,
                    title:"榜单"
                }
            },
            {
                path: 'fixturelist',
                name: 'fixturelist',
                component: function () {
                    return import('../views/livesteam/fixturelist.vue')
                },
                meta: {
                    myCenterIndex: 0,
                    title:"赛程"
                }
            },
            {
                path: 'reserve',
                name: 'reserve',
                component: function () {
                    return import('../views/livesteam/reserve.vue')
                },
                meta: {
                    myCenterIndex: 0,
                    title:"预约"
                }
            },
            {
                path: '/liveRoom',
                name: 'liveRoom',
                component: function () {
                    return import('../views/livesteam/liveRoom.vue')
                },
                meta: {
                    myCenterIndex: 12,
                    title: '直播间'
                }
            }

        ]

    },


    {
        path: '/New/:newid',
        name: 'New',
        component: function () {
            return import('../views/New.vue')
        },
        meta: {
            myCenterIndex: 0,
            title:"新闻"
        }
    },

    {
        path: '/Newlst',
        name: 'Newlst',
        component: function () {
            return import('../views/Newlst.vue')
        },
        meta: {
            myCenterIndex: 0,
            title:"资讯列表"
        }
    },
    {
        path: '/Football',
        name: 'Football',
        component: function () {
            return import('../views/Football.vue')
        },
        meta: {
            myCenterIndex: 0,
            title:"足球比分"
        }
    },

    {
        path: '/comp',
        name: 'comp',
        component: function () {
            return import('../views/comp.vue')
        },
        meta: {
            myCenterIndex: 0,
            title:"热门赛事"
        }
    },
    {
        path: '/footballevent',
        name: 'footballevent',
        component: function () {
            return import('../views/footballevent.vue')
        },
        meta: {
            myCenterIndex: 0,
            title:"足球赛事"
        }
    },

    {
        path: '/basketballevent',
        name: 'basketballevent',
        component: function () {
            return import('../views/basketballevent.vue')
        },
        meta: {
            myCenterIndex: 0,
            title:"篮球赛事"
        }
    },

    {
        path: '/footanalysis',
        name: 'footanalysis',
        component: function () {
            return import('../views/footanalysis.vue')
        },
        meta: {
            myCenterIndex: 0,
            title:"数据分析"
        }
    },

    {
        path: '/Basketball',
        name: 'Basketball',
        component: function () {
            return import('../views/Basketball.vue')
        },
        meta: {
            myCenterIndex: 0,
            title:"蓝球比分"
        }
    },

    {
        path: '/course',
        name: 'course',
        component: function () {
            return import('../views/course.vue')
        }
    },

    {
        path: '/agreement',
        name: 'agreement',
        component: function () {
            return import('../views/agreement.vue')
        }
    },

    {
        path: '/commonProblem',
        name: 'commonProblem',
        component: function () {
            return import('../views/commonProblem.vue')
        }
    },

    {
        path: '/download',
        name: 'download',
        component: function () {
            return import('../views/download.vue')
        },
    },

    {
        path: '/forgetPwd',
        name: 'forgetPwd',
        component: function () {
            return import('../views/forgetPwd.vue')
        }
    },

    {
        path: '/mine',
        name: 'mine',
        component: function () {
            return import('../views/mine.vue')
        },
        redirect: "/mine/myHome",
        children: [
            {
                path: 'myHome',
                name: 'myHome',
                component: function () {
                    return import('../views/myHome.vue')
                },
                meta: {
                    myCenterIndex: 0,
                    title:"用户中心"
                }
            },

            {
                path: 'bindBankCard',
                name: 'bindBankCard',
                component: function () {
                    return import('../views/bindBankCard.vue')
                },
                meta: {
                    myCenterIndex: 0,
                    title: '绑定银行卡'
                }
            },

            {
                path: 'SecurityPass',
                name: 'SecurityPass',
                component: function () {
                    return import('../views/securityPass.vue')
                },
                meta: {
                    myCenterIndex: 0,
                    title: '设置安全密码'
                }
            },

            {
                path: 'realName',
                name: 'realName',
                component: function () {
                    return import('../views/realName.vue')
                },
                meta: {
                    myCenterIndex: 0,
                    title: '实名认证'
                }
            },

            {
                path: 'anchor',
                name: 'anchor',
                component: function () {
                    return import('../views/anchor.vue')
                },
                meta: {
                    myCenterIndex: 0,
                    title: '申请主播'
                }
            },

            {
                path: 'recharge',
                name: 'recharge',
                component: function () {
                    return import('../views/recharge.vue')
                },
                meta: {
                    myCenterIndex: 0,
                    title: '充值'
                }
            },

            {
                path: 'withDrawal',
                name: 'withDrawal',
                component: function () {
                    return import('../views/withDrawal.vue')
                },
                meta: {
                    myCenterIndex: 0,
                    title: '提现'
                }
            },

            {
                path: 'changePhone',
                name: 'changePhone',
                component: function () {
                    return import('../views/changePhone.vue')
                },
                meta: {
                    myCenterIndex: 0,
                    title: '改绑手机'
                }
            },

            {
                path: 'changePassword',
                name: 'changePassword',
                component: function () {
                    return import('../views/changePassword.vue')
                },
                meta: {
                    myCenterIndex: 0,
                    title: '修改密码'
                }
            },

            {
                path: 'applyAnchor',
                name: 'applyAnchor',
                component: function () {
                    return import('../views/applyAnchor.vue')
                },
                meta: {
                    myCenterIndex: 0,
                    title: '申请主播'
                }
            },

            {
                path: 'myProfile',
                name: 'myProfile',
                component: function () {
                    return import('../views/myProfile.vue')
                },
                meta: {
                    myCenterIndex: 1,
                    title: '我的资料'
                }
            },

            {
                path: 'message',
                name: 'message',
                component: function () {
                    return import('../views/message.vue')
                },
                meta: {
                    myCenterIndex: 2,
                    title:'站内信息'
                }
            },

            {
                path: 'myMoney',
                name: 'myMoney',
                component: function () {
                    return import('../views/myMoney.vue')
                },
                meta: {
                    myCenterIndex: 14,
                    title:'我的钱包'
                }
            },

            {
                path: 'level',
                name: 'level',
                component: function () {
                    return import('../views/level.vue')
                },
                meta: {
                    myCenterIndex: 15,
                    title:'我的等级'
                }
            },

            {
                path: 'myFans',
                name: 'myFans',
                component: function () {
                    return import('../views/myFans.vue')
                },
                meta: {
                    myCenterIndex: 3,
                    title:"我的粉丝"
                }
            },

            {
                path: 'concern',
                name: 'concern',
                component: function () {
                    return import('../views/concern.vue')
                },
                meta: {
                    myCenterIndex: 4,
                    title:'我的关注'
                }
            },

            {
                path: 'subscribe',
                name: 'subscribe',
                component: function () {
                    return import('../views/subscribe.vue')
                },
                meta: {
                    myCenterIndex: 5,
                    title:'我的预约'
                }
            },

            {
                path: 'feedback',
                name: 'feedback',
                component: function () {
                    return import('../views/feedback.vue')
                },
                meta: {
                    myCenterIndex: 6,
                    title: '问题反馈'
                }
            },

            {
                path: 'dispose',
                name: 'dispose',
                component: function () {
                    return import('../views/dispose.vue')
                },
                meta: {
                    myCenterIndex: 6,
                    title: '反馈问题处理情况'
                }
            },

            {
                path: 'createlive',
                name: 'createlive',
                component: function () {
                    return import('../views/createlive.vue')
                },
                meta: {
                    myCenterIndex: 7,
                    title: '创建直播'
                }
            },

            {
                path: 'createGame',
                name: 'createGame',
                component: function () {
                    return import('../views/createGame.vue')
                },
                meta: {
                    myCenterIndex: 7,
                    title: '创建游戏'
                }
            },

            {
                path: 'Livelist',
                name: 'Livelist',
                component: function () {
                    return import('../views/Livelist.vue')
                },
                meta: {
                    myCenterIndex: 8,
                    title: '房间管理'
                }
            },

            {
                path: 'giftList',
                name: 'giftList',
                component: function () {
                    return import('../views/giftList.vue')
                },
                meta: {
                    myCenterIndex: 9,
                    title: '我的礼物'
                }
            },
            // {
            //     path: 'roomManage',
            //     name: 'changePassword',
            //     component: function () {
            //         return import('../views/roomManage.vue')
            //     },
            //     meta: {
            //         myCenterIndex: 10,
            //         title: '房间管理'
            //     }
            // },
            // {
            //     path: 'applyIive',
            //     name: 'applyIive',
            //     component: function () {
            //         return import('../views/applyIive.vue')
            //     },
            //     meta: {
            //         myCenterIndex: 11,
            //         title: '申请主播'
            //     }
            // },
            {
                path: 'liveSet',
                name: 'liveSet',
                component: function () {
                    return import('../views/liveSet.vue')
                },
                meta: {
                    myCenterIndex: 12,
                    title: '开播设置'
                }
            },
        ]
    },

    {
        path: '/retroaction',
        name: 'retroaction',
        component: function () {
            return import('../views/retroaction.vue')
        }
    },

    // {
    //     path: '/liveRoom',
    //     name: 'liveRoom',
    //     component: function () {
    //         return import('../views/liveRoom.vue')
    //     },
    //     meta: {
    //         myCenterIndex: 12,
    //         title: '直播间'
    //     }
    // }
]

const router = new VueRouter({
    // mode: 'history',
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    /* if (to.meta.myCenterIndex != undefined) {
        $store.state.myCenterIndex = to.meta.myCenterIndex;
        next();
    } else {
        next();
    } */
    next()
})

export default router
