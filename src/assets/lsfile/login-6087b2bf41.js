(function(e){window[e[0]]||(Login={goLoginCallback:{},goRegisterCallback:{},loginOutCallback:{},userData:void 0,initUser:function(){this[e[1]]=void 0;try{$[e[3]][e[2]]=!0}catch(e){}Login[e[4]]()},setInfo(t){$(e[6])[e[5]]>0&&$(e[7])[e[5]]>0?(this[e[8]](t),(t[e[10]][e[9]]||t[e[11]]>0)&&($(e[13])[e[12]](),$(e[14])[e[12]]())):window[e[15]](()=>{this[e[16]](t)},100)},getInfo(){var t=this;$[e[17]]({url:STATIC_CONFIG[e[18]]+e[19],type:e[20],dataType:e[21],xhrFields:{withCredentials:!0},success:function(o){if(0==o[e[22]]){Date[e[23]](new Date);Login[e[1]]=o[e[24]],localStorage[e[25]](e[1],JSON[e[26]](o[e[24]])),t[e[16]](o[e[24]])}else t[e[8]]();window[e[27]]&&(Login[e[28]]()?$(e[34])[e[33]](e[12]):window[e[15]](function(){window[e[30]][e[29]]=STATIC_CONFIG[e[31]]+e[32]+window[e[30]][e[29]]},0)),t[e[35]]&&$[e[36]](t[e[35]],function(t,a){a&&a(o[e[24]])})},error:function(){1!=localStorage[e[37]](e[38])?(localStorage[e[25]](e[38],1),window[e[30]][e[39]]()):localStorage[e[25]](e[38],0)}})},checkUserStatus:function(t){return typeof Login[e[1]]==e[40]?(t&&(header_vue&&header_vue[e[41]]&&(header_vue[e[41]]=!0),this[e[35]][e[42]]=function(){t&&t()}),!1):(t&&t(),!0)},setHeader:function(t){if($(e[6])[e[5]]>0&&$(e[7])[e[5]]>0){var o=this;o[e[1]]=t,o[e[43]]=$(e[7]),o[e[44]]=$(e[6]),o[e[45]]={userIco:o[e[44]][e[46]](e[47]),userName:o[e[44]][e[46]](e[48])},typeof t!=e[40]?(o[e[45]][e[50]][e[49]]({"background-image":e[51]+t[e[52]]+STATIC_CONFIG[e[54]][e[53]]+e[55]}),o[e[45]][e[57]][e[56]](t[e[58]]),o[e[43]][e[33]](e[59]),o[e[44]][e[60]](e[59]),t[e[61]]&&o[e[44]][e[46]](e[64])[e[63]](0)[e[62]](e[65])):(o[e[43]][e[60]](e[59]),o[e[44]][e[33]](e[59]))}else window[e[15]](()=>{this[e[8]](t)},100)},loginOut:function(){var t=this;Dialog[e[67]][e[66]]({temp:e[68],align:e[69],className:e[70],buttons:[{text:e[71]},{text:e[72],className:e[73],onClick:function(o){$[e[17]]({url:STATIC_CONFIG[e[18]]+e[74],type:e[20],dataType:e[21],xhrFields:{withCredentials:!0},success:function(a){0==a[e[22]]&&(localStorage[e[25]](e[75],e[76]),localStorage[e[25]](e[77],e[76]),localStorage[e[25]](e[78],e[76]),localStorage[e[25]](e[1],e[76]),$[e[36]](t[e[79]],function(e,t){t&&t(a)}),t[e[80]]());try{logOff&&logOff()}catch(e){}Dialog[e[67]][e[81]](o)}})}}]})}}),Login[e[80]]()}).call(this,["Login","userData","cors","support","getInfo","length",".loggedwrap",".loginwrap","setHeader","interacting","permission","media_id","show","#sqtx","#srmx","setTimeout","setInfo","ajax","APIWEB","/v1/web/member/info","GET","json","code","parse","data","setItem","stringify","need_goto_login","checkUserStatus","href","location","HAO","/login?link=","addClass",".layout-page-init","goLoginCallback","each","getItem","reloadTimes","reload","undefined","isShow","checkUserStatusCallback","loginwrap","loggedwrap","loggedwrapFind","find",".user-ico",".user-name .tip .name","css","userIco","url(","avatar","w200","qiniu",")","html","userName","name","hide","removeClass","vip","text","eq",".open-vip","会员续费","alt","page","点击确认后退出登入状态","center","w-300","取消","确定","primary","/v1/web/member/logout","local_match_ids","","bkt_first_fb","ud","loginOutCallback","initUser","close"]);