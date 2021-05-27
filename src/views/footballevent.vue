<template>
    <div id="zbj">
        <div class="zbjroom">
            <div class = "event_title">
                <div class = "home_name">
                    <span class = "team">{{home_team.name_zh}}</span>
                    <img :src="home_team.logo" class = "team_logo"/>
                    <span class = "fraction">{{home_team.score}}</span>
                </div>
                <div class = "sorce">
                    <p class = "event_name">{{matchevent.name_zh}}</p>
                    <p class = "event_time">{{team.matchtime}}</p>
                    <p class = "event_flag">VS</p>
                    <p class = "now_sorce">HT：0-0</p>
                </div>
                <div class = "away_name">
                    <span class = "fraction">{{away_team.score}}</span>
                    <img :src="away_team.logo" class = "team_logo" />                   
                    <span class = "team">{{away_team.name_zh}}</span>
                </div>
            </div>

            <div class ="rate">
                <div class = "classify">
                    <span style="color:#ffffff;">-</span>
                    <span>让球</span>
                    <span>欧</span>
                    <span>大</span>
                    <span style="border-right: none;">角球</span>
                </div>
                <div class = "rate_table">
                    <div class = 'title'><span>最初</span></div>
                    <div class = 'rate_fraction' v-for="(val, k) in first_offer"> 
                        <span>{{val.type}}</span>
                        <span>{{val.r}}</span>
                        <span>{{val.d}}</span>
                        <span class="vertical"></span>
                    </div>          
                </div>
                <div class = "rate_table">
                    <div class = 'title'><span>即时</span></div>

                    <div class = 'rate_fraction' v-for="(val,k) in instant_disk" >
                        <span>{{val.type}}</span>
                        <span>{{val.r}}</span>
                        <span>{{val.d}}</span>
                        <span class="vertical"></span>
                    </div>
                </div>
            </div>

            <div class="zbjroominner">
                <div class="media">
                    <div class="classify">
                        <div class ="animation" @click="switchPlay('animation')" :class="{'hover': is_play == 'animation'}">
                            <img src="@/assets/img/football_icon.png" />
                            <span>动画直播</span>
                        </div>
                        
                        <div class ="video" @click="switchPlay('video')" :class="{'hover': is_play == 'video'}">
                            <img src="@/assets/img/video_icon.png" />
                            <span>视频直播</span>
                        </div>
                    </div>
                   
                    <div class = 'animation_content' v-if="is_play=='animation' ">
                        <div class = "content" v-if="animation_url != '' ">                          
                            <iframe ref="iframe" id="animation_content" :src="animation_url" frameborder="0" scrolling="yes" ></iframe>
                        </div>

                        <div v-else style="width:100%; text-align: center; line-height: 530px; ">                       
                            <span style="font-size:30px; font-weight: bold; letter-spacing: 2px; color:#636161">暂无动画</span> 
                        </div>
                    </div>

                    <div class = 'video_content' v-else>
                        <div class = "content">
                            <!-- <video-player  class="video-player vjs-custom-skin"
                                ref="videoPlayer"
                                :playsinline="true"
                                :options="playerOptions"
                            ></video-player> -->

                            <div id="video_content" style="width:100%; height:auto;" v-if ="video_url != '' "></div>
                            <div v-else style="width:100%; text-align: center; line-height: 440px; ">                       
                                <span style="font-size:30px; font-weight: bold; letter-spacing: 2px; color:#636161">暂无直播</span> 
                            </div>                            
                        </div>
                        
                    </div>

                    <div class="evnet_status">
                        <div class = 'team_control'>
                            <div class = "home_state">
                                <div class = "kick">
                                    <img src="@/assets/img/kick.png" />
                                    <span>{{team_score.home_kick}}</span>
                                </div>
                                <div class = "red_card">
                                    <img src="@/assets/img/red_card.png" />
                                    <span>{{team_score.home_red_card}}</span>
                                </div>
                                <div class = "yellow_card">
                                    <img src="@/assets/img/yellow_card.png" />
                                    <span>{{team_score.home_yellow_card}}</span>
                                </div>
                            </div>
                            
                            <div class = 'ball_control'>
                                <div class = 'home_control'>
                                    <span>{{team_score.home_control_rate}}</span>
                                    <p class = 'progress'>
                                        <el-progress :text-inside="true" :stroke-width="8" :percentage="team_score.home_control_rate_percentage" :show-text = 'false' color='#fbd73b'>
                                        </el-progress>
                                    </p>                            
                                </div>
                                <div class = 'control'>控球率</div>
                                <div class = 'away_control'>                                  
                                    <p class = 'progress'>
                                        <el-progress :text-inside="true" :stroke-width="8" :percentage="team_score.away_control_rate_percentage" :show-text = 'false' color='#75abeb'>
                                        </el-progress> 
                                    </p>  
                                    <span>{{team_score.away_control_rate}}</span>                           
                                </div> 
                            </div>

                            <div class = "away_state">
                                <div class = "yellow_card">
                                    <span>{{team_score.away_yellow_card}}</span>
                                    <img src="@/assets/img/yellow_card.png" />                                    
                                </div>
                                <div class = "red_card">
                                    <span>{{team_score.away_red_card}}</span>
                                    <img src="@/assets/img/red_card.png" />                                   
                                </div>
                                <div class = "kick">
                                    <span>{{team_score.away_kick}}</span>
                                    <img src="@/assets/img/kick.png" />                                    
                                </div>                           
                            </div>
                        </div>
                        
                        <div class = "home_score">
                            <div class = "home_line">
                                <span>{{team_score.home_shoot}}</span> 
                                <p class = 'progress'>
                                    <el-progress :text-inside="true" :stroke-width="8" :percentage="team_score.home_shoot_percentage" :show-text = 'false' color='#fbd73b'>
                                    </el-progress> 
                                </p> 
                                <span class = "middle" style = "font-size:12px;">射正</span>
                                <p class = 'progress'>
                                    <el-progress :text-inside="true" :stroke-width="8" :percentage="team_score.away_shoot_percentage" :show-text = 'false' color='#75abeb'>
                                    </el-progress> 
                                </p>
                                <span>{{team_score.away_shoot}}</span>
                            </div>
                            <div class = "home_line">
                                <span>{{team_score.home_deflection}}</span> 
                                <p class = 'progress'>
                                    <el-progress :text-inside="true" :stroke-width="8" :percentage="team_score.home_deflection_percentage" :show-text = 'false' color='#fbd73b'>
                                    </el-progress>
                                </p> 
                                <span class = "middle" style = "font-size:12px;">射门</span>
                                <p class = 'progress'>
                                    <el-progress :text-inside="true" :stroke-width="8" :percentage="team_score.away_deflection_percentage" :show-text = 'false' color='#75abeb'>
                                    </el-progress>
                                </p>
                                <span>{{team_score.away_deflection}}</span>
                            </div> 
                        </div>

                        <div class = "away_score">
                            <div class = "away_line">
                                <span>{{team_score.home_danger}}</span> 
                                <p class = 'progress'>
                                    <el-progress :text-inside="true" :stroke-width="8" :percentage="team_score.home_danger_percentage" :show-text = 'false' color='#fbd73b'>
                                    </el-progress>
                                </p> 
                                <span style = "width:60px;font-size:12px;">危险进攻</span>
                                <p class = 'progress'>
                                <el-progress :text-inside="true" :stroke-width="8" :percentage="team_score.away_danger_percentage" :show-text = 'false' color='#75abeb'>
                                    </el-progress> 
                                </p>
                                <span>{{team_score.away_danger}}</span>
                            </div>
                            <div class = "away_line">
                                <span>{{team_score.home_attack}}</span> 
                                <p class = 'progress'>
                                    <el-progress :text-inside="true" :stroke-width="8" :percentage="team_score.home_attack_percentage" :show-text = 'false' color='#fbd73b'>
                                    </el-progress> 
                                </p> 
                                <span class = "middle" style = "font-size:12px;">进攻</span>
                                <p class = 'progress'>
                                    <el-progress :text-inside="true" :stroke-width="8" :percentage="team_score.home_attack_percentage" :show-text = 'false' color='#75abeb'>
                                    </el-progress>  
                                </p>
                                <span>{{team_score.away_attack}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class= "chat">
                    <chat></chat>
                </div>
            </div>
        </div>

        <div class = 'diagram'>
            <div class="team-box"> 
                <div class = "home_team">
                    <p class ="name"><span>{{home_team.name_zh}}</span></p>
                    <p class ="logo"><img class="team-logo" :src="home_team.logo"></p>                   
                </div> 
                <div class = "away_team">
                    <p class ="logo"><img class="team-logo" :src="away_team.logo"></p>
                    <p class ="name"><span>{{away_team.name_zh}}</span></p>
                </div>
             </div>

            <div class="dividing_line">
                <div class = "boundary"><span style="right:4px;">0'</span></div>   
                <div class = "boundary"><span>15'</span></div>   
                <div class = "boundary"><span>30'</span></div>    
                <div class = "boundary" style = 'border-left:1px solid #ffa03b'><span>HT</span></div>   
                <div class = "boundary"><span>60'</span></div>   
                <div class = "boundary"><span>75'</span></div>   
                <div class = "boundary_end"><span>90'</span></div>                
            </div>

            <div class="team_progress">
                <div class = 'home_progress'>
                    <template v-if = 'home_game_event.length > 0' v-for="(text, i) in home_game_event">
                        <div class="incident" :style="{left:text.offset}">
                            <div class = 'incident_info' :class="{'is_hover': !text.active}">
                                <p class = 'thing'>
                                    <span>{{text.type_text}}</span><span>{{text.explain}}</span>
                                </p>
                                <p class = 'time'>{{text.time}}</p>
                            </div>
                            <p class = 'mark' @mouseenter = "show_important_explain(1,i,text)" @mouseleave = "hide_important_explain(1,i,text)"> 
                                <img class="team-logo" src="@/assets/img/goal.png" v-if="text.type == 1">
                                <img class="team-logo" src="@/assets/img/kick.png" v-else-if="text.type == 2">
                                <img class="team-logo" src="@/assets/img/yellow_card.png" v-else-if="text.type == 3">
                                <img class="team-logo" src="@/assets/img/red_card.png" v-else-if="text.type == 4">
                                <img class="team-logo" src="@/assets/img/penalty.png" v-else-if="text.type == 8">
                                <img class="team-logo" src="@/assets/img/substitution.png" v-else-if="text.type == 9">
                                <img class="team-logo" src="@/assets/img/turn.png" v-else-if="text.type == 15">
                                <img class="team-logo" src="@/assets/img/oolong.png" v-else-if="text.type == 17">
                            </p>                           
                        </div>
                    </template>                  
                </div>   

                <div class = 'away_progress'>
                    <template v-if = 'away_game_event.length > 0' v-for="(text, i) in away_game_event">
                        <div class="incident" :style="{left:text.offset}">
                            <div class = 'incident_info' :class="{'is_hover': !text.active}">
                                <p class = 'thing'>
                                    <span>{{text.type_text}}</span><span>{{text.explain}}</span>
                                </p>
                                <p class = 'time'>{{text.time}}</p>
                            </div>
                            <p class = 'mark' @mouseenter = "show_important_explain(0,i,text)" @mouseleave = "hide_important_explain(0,i,text)">
                                <img class="team-logo" src="@/assets/img/goal.png" v-if="text.type == 1">
                                <img class="team-logo" src="@/assets/img/kick.png" v-else-if="text.type == 2">
                                <img class="team-logo" src="@/assets/img/yellow_card.png" v-else-if="text.type == 3">
                                <img class="team-logo" src="@/assets/img/red_card.png" v-else-if="text.type == 4">
                                <img class="team-logo" src="@/assets/img/penalty.png" v-else-if="text.type == 8">
                                <img class="team-logo" src="@/assets/img/substitution.png" v-else-if="text.type == 9">
                                <img class="team-logo" src="@/assets/img/turn.png" v-else-if="text.type == 15">
                                <img class="team-logo" src="@/assets/img/oolong.png" v-else-if="text.type == 17">
                            </p>
                        </div>
                    </template>
                </div>   
            </div>
        </div>

        <div class = 'team_detail'>
            <el-tabs v-model="active" @tab-click="TeamChange">
                <el-tab-pane label="文字直播" name="text_live">
                    <div class="block">
                        <el-timeline>
                            <el-timeline-item v-if="text_live.length > 0" v-for="(text, i) in text_live" :key="i">
                                <el-card>                                   
                                    <img class="event_logo" src="@/assets/img/goal.png" v-if="text.type == 1">
                                    <img class="event_logo" src="@/assets/img/kick.png" v-else-if="text.type == 2">
                                    <img class="event_logo" src="@/assets/img/yellow_card.png" v-else-if="text.type == 3">
                                    <img class="event_logo" src="@/assets/img/red_card.png" v-else-if="text.type == 4">
                                    <img class="event_logo" src="@/assets/img/penalty.png" v-else-if="text.type == 8">
                                    <img class="event_logo" src="@/assets/img/substitution.png" v-else-if="text.type == 9">
                                    <img class="event_logo" src="@/assets/img/turn.png" v-else-if="text.type == 15">
                                    <img class="event_logo" src="@/assets/img/oolong.png" v-else-if="text.type == 17">
                                    <p>{{text.data}}</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="阵容" name="lineup">
                    <div class = 'lineup' v-if="is_lineup == 1">
                        <div class="team">
                            <div class = "home_team">
                                <p class ="logo"><img class="team-logo" :src="home_team.logo"></p>
                                <p class ="name"><span>{{home_team.name_zh}}</span></p>                                                   
                            </div> 
                            <div class = "mark">
                                <p>vs</p>
                            </div>
                            <div class = "away_team">
                                <p class ="logo"><img class="team-logo" :src="away_team.logo"></p>
                                <p class ="name"><span>{{away_team.name_zh}}</span></p>
                            </div>
                        </div>

                        <div class = 'lineup_list'>
                            <div class = "home_lineup">
                                <p v-if = "lineup.home_starting.length > 0" v-for="(player, i) in lineup.home_starting">
                                    <span class = 'jersey'>{{player.shirt_number}}</span>
                                    <span v-if="player.logo != ''">
                                        <img class="avatar" :src="player.logo">
                                    </span>
                                    <i class = "el-icon-s-custom" v-else></i>                                    
                                    <span class = 'name'>{{player.name}}</span>

                                    <!-- <span><img class="event_icon" src="@/assets/img/foot-begin.png"></span>
                                    <span class = 'time'>75`</span> -->                                   
                                </p>

                                <p class = "substitute" v-if = "lineup.home_replac.length > 0">
                                    替补
                                </p>
                                <p v-if = "lineup.home_replac.length > 0" v-for="(player, i) in lineup.home_replac">
                                    <span class = 'jersey'>{{player.shirt_number}}</span>                                       
                                    <span v-if="player.logo != ''">
                                        <img class="avatar" :src="player.logo" >                                       
                                    </span>
                                    <i class = "el-icon-s-custom" v-else></i>                                    
                                    <span class = 'name'>{{player.name}}</span>                          
                                </p> 

                                <!-- <p class = "substitute" v-if = "lineup.home_replacement.length > 0">
                                    换人
                                </p>

                                <div class = 'change_player' v-if = "lineup.home_replacement.length > 0" 
                                    v-for="(player, i) in lineup.home_replacement"> 
                                    <p class = 'out_player'> 
                                        <span class = 'jersey' style="margin-left:8px">{{player.out_player_shirt_number}}</span>                                  
                                        <span v-if="player.out_player_avatar != ''">
                                            <img :src="player.out_player_avatar" >                                       
                                        </span>
                                        <i class = "el-icon-s-custom" v-else ></i>

                                        <span class = 'name'>{{player.out_player_name}}</span>
                                                                              
                                    </p>

                                    <p class = 'in_player'>  
                                        <span class = 'jersey'>{{player.in_player_shirt_number}}</span> 
                                        <span v-if="player.in_player_avatar != ''">
                                            <img :src="player.in_player_avatar" >                                       
                                        </span>
                                        <i class = "el-icon-s-custom" v-else></i>                                       
                                        <span class = 'name'>{{player.in_player_name}}</span>                                           
                                    </p> 
                                </div> -->
                                
                            </div>
                            <div class = "court">
                                <div class = 'home_player'>
                                    <template v-for="(player, i) in lineup.home_starting">
                                        <div class="player" :style="{top:player.y,left:player.x}">
                                            <img class="avatar" :src="player.logo">
                                            <span class = 'sorce' v-if = 'player.rating > 0'>{{player.rating}}</span>
                                            <span class = 'jersey'>{{player.shirt_number}}</span>
                                            <span class = 'name'>{{player.name}}</span>                                        
                                        </div>
                                    </template>
                                </div>
                                
                                <div class = 'away_player'>
                                    <template v-for="(player, i) in lineup.away_starting">
                                        <div class="player" :style="{bottom:player.y,right:player.x}">
                                            <img class="avatar" :src="player.logo">
                                            <span class = 'sorce' v-if = 'player.rating > 0'>{{player.rating}}</span>
                                            <span class = 'jersey'>{{player.shirt_number}}</span>
                                            <span class = 'name'>{{player.name}}</span>
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <div class = "away_lineup">
                                <p v-if = "lineup.away_starting.length > 0" v-for="(player, i) in lineup.away_starting">   
                                   <span class = 'jersey'>{{player.shirt_number}}</span>
                                    <span v-if="player.logo != ''">
                                        <img class="avatar" :src="player.logo">
                                    </span>
                                    <i class = "el-icon-s-custom" v-else></i>                                    
                                    <span class = 'name'>{{player.name}}</span>
                                </p>

                                <p class = "substitute">
                                    替补
                                </p> 
                                
                                <p v-if = "lineup.away_replac.length > 0" v-for="(player, i) in lineup.away_replac">
                                    <span class = 'jersey'>{{player.shirt_number}}</span>                                       
                                    <span v-if="player.logo != ''">
                                        <img class="avatar" :src="player.logo" >                                       
                                    </span>
                                    <i class = "el-icon-s-custom" v-else></i>                                    
                                    <span class = 'name'>{{player.name}}</span>                          
                                </p>
                            </div>
                        </div>
                    </div>

                    <no-data v-else></no-data>
                </el-tab-pane>
                <el-tab-pane label="指数" name="finger">
                    <div class = 'finger'>
                        <el-tabs type="border-card" v-model="finger_check" @tab-click="fingerChange">
                           
                            <el-tab-pane label="让球" name="asia">
                                <div class = "ball">
                                    <el-table :data="single_finger_list.asia" stripe style="width: 100%" @row-click="SingleHistoryList">
                                        <el-table-column label="公司" width="200">
                                            <template slot-scope="scope">
                                                <span>{{ scope.row.company_name }}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="初盘"  width="400">
                                            <template slot-scope="scope">
                                                <div class="first_offer">
                                                    <span>{{ scope.row.first_a }}</span>
                                                    <span>{{ scope.row.first_b }}</span> 
                                                    <span>{{ scope.row.first_c }}</span>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column  label="即时盘" width="400">
                                            <template slot-scope="scope">
                                                <div class="instant_disk">
                                                    <span :style = "{color:(scope.row.im_a > scope.row.first_a  ? '#fa0303' : '#4858f0')}">
                                                        {{ scope.row.im_a }}
                                                    </span>

                                                    <span :style = "{color:(scope.row.im_b > scope.row.first_b  ? '#fa0303' : '#4858f0')}">
                                                        {{ scope.row.im_b }}
                                                    </span> 

                                                    <span :style = "{color:(scope.row.im_c > scope.row.first_c  ? '#fa0303' : '#4858f0')}">
                                                        {{ scope.row.im_c }}
                                                    </span>
                                                </div>
                                            </template>
                                        </el-table-column>

                                        <el-table-column width="125">
                                            <template slot-scope="scope">
                                                <div class="move" @click="SingleHistoryList(scope.row,'asia')">
                                                    <i class="el-icon-arrow-right"></i>
                                                </div>
                                            </template> 
                                        </el-table-column>
                                    </el-table>
                                </div> 
                            </el-tab-pane>
                           
                            <el-tab-pane label="胜平负" name="eu">                               
                                <div class="victory_defeat">
                                    <el-table :data="single_finger_list.eu" stripe style="width: 100%" @row-click="SingleHistoryList">
                                        <el-table-column  prop="date"  label="公司" width="200">
                                            <template slot-scope="scope">
                                                <span>{{ scope.row.company_name }}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column  width="100">
                                            <template slot-scope="scope">                                             
                                                <p>初盘</p> 
                                                <p>即时盘</p>                                                
                                            </template>
                                        </el-table-column>

                                        <el-table-column label="主胜"  width="235">
                                            <template slot-scope="scope">                                             
                                                <p>{{ scope.row.first_a }}</p> 
                                                <p>
                                                    <span style="color:#fa0303" v-if='scope.row.im_a > scope.row.first_a'>
                                                        {{ scope.row.im_a }}
                                                    </span>

                                                    <span style="color:#4858f0" v-else-if='scope.row.im_a < scope.row.first_a'>
                                                        {{ scope.row.im_a }}
                                                    </span> 
                                                    
                                                    <span v-else>
                                                        {{ scope.row.im_a }}
                                                    </span>
                                                </p>                                                
                                            </template>
                                        </el-table-column>
                                        
                                        <el-table-column label="主局" width="235">
                                            <template slot-scope="scope">
                                                <p>{{ scope.row.first_b }}</p> 
                                                <p>
                                                    <span style="color:#fa0303" v-if='scope.row.im_b > scope.row.first_b'>
                                                        {{ scope.row.im_b }}
                                                    </span>

                                                    <span style="color:#4858f0" v-else-if='scope.row.im_b < scope.row.first_b'>
                                                        {{ scope.row.im_b }}
                                                    </span> 
                                                    
                                                    <span v-else>
                                                        {{ scope.row.im_b }}
                                                    </span>
                                                </p>
                                            </template>
                                        </el-table-column>

                                        <el-table-column label="客胜" width="235">
                                            <template slot-scope="scope">                                                
                                                <p>{{ scope.row.first_c }}</p> 
                                                <p>
                                                    <span style="color:#fa0303" v-if='scope.row.im_c > scope.row.first_c'>
                                                        {{ scope.row.im_c }}
                                                    </span>

                                                    <span style="color:#4858f0" v-else-if='scope.row.im_c < scope.row.first_c'>
                                                        {{ scope.row.im_c }}
                                                    </span> 
                                                    
                                                    <span v-else>
                                                        {{ scope.row.im_c }}
                                                    </span>
                                                </p>
                                            </template>
                                        </el-table-column>

                                        <el-table-column  width="120">
                                            <template slot-scope="scope">
                                                <div class="move">
                                                    <i class="el-icon-arrow-right"></i>
                                                </div>
                                            </template> 
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>

                            <el-tab-pane label="总进球" name="bs">
                                <div class = "total_goals">
                                    <el-table :data="single_finger_list.bs" stripe style="width: 100%" @row-click="SingleHistoryList">
                                        <el-table-column  prop="date"  label="公司" width="200">
                                            <template slot-scope="scope">
                                                <span><span>{{ scope.row.company_name }}</span></span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="初盘"  width="400">
                                            <template slot-scope="scope">
                                                <div class="first_offer">
                                                    <span>{{ scope.row.first_a }}</span>
                                                    <span>{{ scope.row.first_b }}</span> 
                                                    <span>{{ scope.row.first_c }}</span>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="即时盘" width="400">
                                            <template slot-scope="scope">
                                                <div class="instant_disk">
                                                    <span :style = "{color:(scope.row.im_a > scope.row.first_a  ? '#fa0303' : '#4858f0')}">
                                                        {{ scope.row.im_a }}
                                                    </span>

                                                    <span :style = "{color:(scope.row.im_b > scope.row.first_b  ? '#fa0303' : '#4858f0')}">
                                                        {{ scope.row.im_b }}
                                                    </span> 

                                                    <span :style = "{color:(scope.row.im_c > scope.row.first_c  ? '#fa0303' : '#4858f0')}">
                                                        {{ scope.row.im_c }}
                                                    </span>
                                                </div>
                                            </template>
                                        </el-table-column>

                                        <el-table-column  width="125">
                                            <template slot-scope="scope">
                                                <div class="move">
                                                    <i class="el-icon-arrow-right"></i>
                                                </div>
                                            </template> 
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>

                            <el-tab-pane label="角球" name="kick">
                                <div class = "corner_kick">
                                    <el-table :data="single_finger_list.kick" stripe style="width: 100%">
                                        <el-table-column label="公司" width="200">
                                            <template slot-scope="scope"></template>
                                        </el-table-column>
                                        <el-table-column  label="初盘"  width="400">
                                            <template slot-scope="scope"></template>
                                        </el-table-column>
                                        <el-table-column    label="即时盘" width="400">
                                            <template slot-scope="scope"></template>
                                        </el-table-column>

                                        <el-table-column  width="125">
                                            <template slot-scope="scope"></template> 
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>                       
                        </el-tabs>
                    </div>
                </el-tab-pane>               
            </el-tabs>

            <el-drawer :title="finger_title" :before-close="fingerClose"  :visible.sync="dialog" 
                direction="ltr"  custom-class="demo-drawer"  ref="drawer"
            >
                <div class="demo-drawer__content">
                    <div class = "header" v-if="finger_status=='asia'">
                        <span style='width:110px;'>公司</span>
                        <span style='width:120px;'>主队</span>
                        <span style='width:110px;'>盘口</span>
                        <span style='width:110px;'>客队</span>
                        <span style='width:110px;'>变化时间</span>
                    </div>

                    <div class = "header" v-else-if="finger_status=='eu'">
                        <span style='width:110px;'>公司</span>
                        <span style='width:120px;'>主胜</span>
                        <span style='width:110px;'>平局</span>
                        <span style='width:110px;'>客胜</span>
                        <span style='width:110px;'>变化时间</span>
                    </div>

                    <div class = "header" v-else="finger_status=='bs'">
                        <span style='width:110px;'>大球</span>
                        <span style='width:120px;'>主胜</span>
                        <span style='width:110px;'>盘口</span>
                        <span style='width:110px;'>小球</span>
                        <span style='width:110px;'>变化时间</span>
                    </div>

                    <el-tabs :tab-position="framePosition" v-model="history_list_active">
                        <template v-for="(single, i) in single_history_list">
                            <el-tab-pane :label="single.company_name" :name="single.company_name">
                                <div class = "finger_list">
                                    <el-table :data="single.list" stripe :height="frame_height">
                                        <el-table-column property="home">
                                            <template slot-scope="scope">                                            
                                                <span :style = "{color:(single.home < scope.row.home  ? '#fa0303' : '#4858f0')}">
                                                    {{ scope.row.home }}
                                                </span>                                          
                                            </template>
                                        </el-table-column>
                                        <el-table-column property="shares">
                                            <template slot-scope="scope">                                            
                                                <span style="color:#fa0303" v-if='scope.row.shares > single.shares'>
                                                    {{ scope.row.shares }}
                                                </span>
                                                <span style="color:#0a0a0a" v-else-if='scope.row.shares < single.shares'>
                                                    {{ scope.row.shares }}
                                                </span>
                                                <span style="color:#11ee1c" v-else-if='scope.row.shares == single.shares'>
                                                    {{ scope.row.shares }}
                                                </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column property="away">
                                            <template slot-scope="scope">
                                                <span style="color:#fa0303" v-if='scope.row.away > single.away'>
                                                    {{ scope.row.away }}
                                                </span> 
                                                
                                                <span style="color:#4858f0" v-else-if='scope.row.away < single.away'>
                                                    {{ scope.row.shares }}
                                                </span>

                                                <span style="color:#0a0a0a" v-else='scope.row.shares == single.shares'>
                                                    {{ scope.row.shares }}
                                                </span>                                         
                                            </template>  
                                        </el-table-column>
                                        <el-table-column property="time">
                                            <template slot-scope="scope">                                            
                                                <span style="color:#f19409" v-if="scope.row.time != 0">
                                                    {{ scope.row.time }}'
                                                </span>                                          
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>
                        </template>
                    </el-tabs>
                </div>
            </el-drawer>
        </div>       
    </div>
</template>

<script>
import chat from "@/components/chat.vue";
import noData from "@/components/noData.vue";
import notHave from "@/components/notHave.vue";
require('@/assets/TcPlayer-2.2.0.js')

import {
    FootballGameDetails,
    FootballSingleHistory,
    FootballSingleHistoryList,
    FootballLineup,
    FootballGameEvents,
    FootballAnalysis,
    LiveMatches
} from '@/api'

export default {
    name: "zbj",
    components: {
        chat, //聊天室
        noData,
        notHave
    },
    data() {
        return {                       
            text_live:[],
            away_team:{},
            home_team:{},
            matchevent:{},
            team:{},
            team_type:0,
            status:0,
            is_play:'animation',
            flag:false,
            countdown_time:{'day':'00','hour':'00','minute':'00','seconds' : '00'},
            exceed_time:{'minute':'00','seconds' : '00'},
            single_finger:{'asia':{},'eu':{},'bs':{}},
            single_finger_list:{'asia':[],'eu':[],'bs':[]},
            single_history_list:[],
            event_id:0,
            home_team_id:0,
            away_team_id:0,
            dialog:false,
            sendContent:'',            
            visible:true,
            active: 'text_live',
            framePosition:'left',
            frame_height:'500px',
            history_list_active:'',
            finger_check:'asia',
            finger_status:'asia',
            finger_title:'全场让球指数变化',
            lineup:{
                'confirmed':0,
                'away_formation':'', 'away_replac':[], "away_replacement":[],"away_starting":[],
                'home_formation':'', 'home_replac':[],"home_replacement":[], "home_starting":[]
            },
            analysis:{},
            first_disc:[],
            im_disc:[],
            home_game_event:[],
            away_game_event:[],
            is_lineup:0,
            is_finger:0,
            team_score:{
                'home_danger':0,'away_danger':0,'home_danger_percentage':0,'away_danger_percentage':0,
                'home_attack':0,'away_attack':0,'home_attack_percentage':0,'home_attack_percentage':0,
                'home_control_rate':0,'away_control_rate':0,'home_control_rate_percentage':0,'away_control_rate_percentage':0,
                'home_red_card':0,'away_red_card':0,'home_kick':0,'away_kick':0,'home_yellow_card':0,'away_yellow_card':0,
                'home_penalty_kick':0,'away_penalty_kick':0,'home_shoot':0,'away_shoot':0,'home_shoot_percentage':0,'away_shoot_percentage':0,
                'home_deflection':0,'away_deflection':0,'home_deflection_percentage':0,'away_deflection_percentage':0 
            },
            first_offer:[],
            instant_disk:[],
            match_status:{},
            video_url :'',
            animation_url :'',
            is_eject:false,
            websock:null,          
        };
    },
    watch: {
        
    },
   
    /* beforeRouteEnter(to, form, next) {
        
    },
    beforeRouteLeave(to, form, next) {
        
    }, */

    mounted() {       
        let self = this;
        let height=document.documentElement.clientHeight - 100;
        if(height < 700){
            height = 700
        }
        this.frame_height = height + 'px'

        let event_id = self.$route.query.event_id
        
        if(!event_id){
            this.$router.push({ name: "Football" });
        }
        this.event_id = event_id
        this.FootballDetails()
        this.Gameanalysis()
        
        setInterval(() => {
            //this.FootAnalysis() 
        }, 5000); 
        
        //this.connectSocket()
    },
  
    methods: {
        /* connectSocket(){
            this.websock = new WebSocket("ws://172.16.127.45:9293")
            this.websock.onopen = this.onOpen
            this.websock.onmessage = this.onMessage;
        },
        
        onOpen(e){
            console.log("连接成功")
        },

        onMessage(res){
            let data = res.data
            if(data){
                let record = JSON.parse(res.data)
                if(recode.type == 'football'){

                }
            }          
        }, */

        async FootballDetails(){
            let data = {
                'id':this.event_id
            }
            let res = await FootballGameDetails(data)
            if(res.code == 0 || res.code == 200){               
                let record =  res.info
                this.text_live = record.text_live
                this.away_team = record.away_team
                this.home_team = record.home_team
                this.matchevent = record.matchevent
                this.team = record.team
                this.status = record.team.statusid
                console.log(this.status)
                this.home_team_id = this.home_team.id
                this.away_team_id = this.away_team.id
                this.Live_Matches()
                this.game_statistics(record.stats) 
                               
                if(this.text_live.length > 0){
                    this.text_live.forEach((val,key) => {
                        val.active = false
                        val.offset = parseInt(val.time) * 10 - 20 + 'px'
                        let text = val.data.split("-") 
                        if(text.length > 2){
                            val.explain = text[1] + text[2] 
                        }else{
                            val.explain = text[1]
                        }

                        if(val.main == 1 && val.position == 1){                          
                            this.home_game_event.push(val)
                        }

                        if(val.main == 1 && val.position == 2){                                                    
                            this.away_game_event.push(val)
                        }
                    })
                }

                //未开赛 
                /*  if(this.status == 1){
                    let time = setInterval(()=>{
                        if(this.flag == true){
                            clearInterval(time)
                        }                        
                        this.countdown(this.team.time)
                    },1000)
                }
                
                //正在进行  (2,3,4,5,7)
                if(this.status == 2 || this.status == 3 || this.status == 4 || this.status == 5 || this.status == 7){
                    let time = setInterval(()=>{
                        if(this.flag == true){
                            clearInterval(time)
                        }                        
                        this.underway(this.team.time)
                    },1000)
                } */
            }            
        },
        
        async SingleHistory(){
            let data = {
                'id' : this.event_id
            }
            let res = await FootballSingleHistory(data)
            if(res.code == 0 || res.code == 200){
                this.is_finger = 1
                let single = res.info
                this.single_finger_list.asia = single.asia
                this.single_finger_list.eu = single.eu
                this.single_finger_list.bs = single.bs
            }           
        },

        async SingleHistoryList(row){
            let data = {
                'id' : this.event_id,
                'type':this.finger_status
            }
            let res = await FootballSingleHistoryList(data)
            if(res.code == 0 || res.code == 200){  
                this.history_list_active = row.company_name          
                this.single_history_list = res.info
                this.dialog = true               
            }           
        },

        async FootLineup(){
            let data = {
                'id' : this.event_id,
            }

            let res = await FootballLineup(data)
            if(res.code == 0 || res.code == 200){
                this.is_lineup = 1
                this.lineup = res.info

                this.lineup.home_starting.forEach((val,key) => { 
                    val.x = (val.x * 5) + 'px' 
                    val.y = (val.y * 4) + 'px'
                })

                this.lineup.away_starting.forEach((val,key) => { 
                    val.x = (val.x * 5) + 'px'    //向左   500
                    val.y = (val.y * 4 ) + 'px'    //向上   393
                })                
            }
        },

        async Gameanalysis(){
            let data = {
                'id' :this.event_id
            }
            let res = await FootballAnalysis(data) 
            if(res.code == 0 || res.code == 200){
                this.first_offer = res.info.first;
                this.instant_disk = res.info.im
            }
        }, 

        async FootAnalysis(){
            let data = {
                'id' :this.event_id
            }
            let res = await FootballAnalysis(data) 
            if(res.code == 0 || res.code == 200){
                this.first_offer = res.info.first;
                this.instant_disk = res.info.im

                this.team_score.home_red_card = res.info.main_red_card
                this.team_score.home_yellow_card = res.info.main_yellow_card
                this.team_score.home_kick = res.info.main_kick

                this.team_score.away_red_card = res.info.deputy_red_card
                this.team_score.away_yellow_card = res.info.deputy_yellow_card
                this.team_score.away_kick = res.info.deputy_kick

                this.status = res.info.status  
                this.team.status_text = res.info.status_text
                
                this.home_team.score = res.info.main_fraction
                this.home_team.half_score = res.info.main_half_fraction
                this.away_team.score = res.info.deputy_fraction
                this.away_team.half_score = res.info.deputy_half_fraction
            }
        }, 

        async Live_Matches(){       
            let data = {
                'matchid' : this.event_id,
                'type':1
            }
            let res = await LiveMatches(data)
            if(res.code == 0){
                if(this.status != 8){
                    this.video_url = res.info.play_url
                }
            
                this.animation_url = res.info.flashurl                               
            }
        },

        switchPlay(type){
            if(type == 'video'){
                this.is_play = 'video' 
                if(this.video_url != ''){
                    setTimeout(() => {
                        this.player(this.video_url,"video_content")
                    },100)
                }                              
            }else{
                this.is_play = 'animation'               
            }  
        },

        player(url,id){
            var player =  new TcPlayer(id, {
                "m3u8": url,
                "autoplay" : true, 
                "coverpic" : "",
                "height" : '530', 
                listener(msg) {

                }
            });
        },

        show_important_explain(type,index,list){ 
            list.active = true 
            if(type == 1){
                this.$set(this.home_game_event, index, list)
            }else{
                this.$set(this.away_game_event, index, list)
            }                                                         
        },

        hide_important_explain(type,index,list){
            list.active = false                
            if(type == 1){
                this.$set(this.home_game_event, index, list)
            }else{
                this.$set(this.away_game_event, index, list)
            }  
        },

        countdown(endtime){
            let nowtime= parseInt(new Date().getTime() / 1000);
            let leftTime = parseInt(endtime - nowtime)
            
            let d = this.formate(parseInt(leftTime/(24*60*60)))
            let h = this.formate(parseInt(leftTime/(60*60)%24))
            let m = this.formate(parseInt(leftTime/60%60))
            let s = this.formate(parseInt(leftTime%60))

            if(leftTime <= 0){
                this.flag = true
            }
             
            this.countdown_time.day = d
            this.countdown_time.hour = h
            this.countdown_time.minute = m
            this.countdown_time.seconds = s            
        },

        underway(starttime){
            let nowtime= parseInt(new Date().getTime() / 1000);           
            let leftTime = parseInt(nowtime - starttime)
            let m = this.formate(parseInt(leftTime/60%60))
            let s = this.formate(parseInt(leftTime%60))

            if(m >= 30){
                this.flag = true
            }

            this.exceed_time.minute = m
            this.exceed_time.seconds = s
        },

        formate (time) {
            if(time>=10){
                return time
            }else{
                return `0${time}`
            }
        },

        fingerClose(){
            this.dialog = false
        },

        TeamChange(tab, event){ 
            switch(tab.name){
                case 'lineup':
                    if(this.is_lineup == 0){
                        this.FootLineup()
                    } 
                    break;
                case 'finger': 
                    if(this.is_finger == 0){
                        this.SingleHistory() 
                    }                                                                              
                    break;                     
            }
        },

        fingerChange(tab, event){ 
            this.finger_status = tab.name
            switch(this.finger_status){
                case 'asia':
                    this.finger_title = '全场让球指数变化'
                    break;
                case 'eu':
                    this.finger_title = '全场胜平负指数变化'
                    break;
                case 'bs':
                    this.finger_title = '全场总进球指数变化'
                    break;
            }
        },

        game_statistics(stats){
            let team_score = []
            stats.home_stats.forEach((v,i) =>{
                if(v.type == stats.away_stats[i].type){
                    v.away =  stats.away_stats[i].away
                    team_score.push(v)
                }                
            })

            if(team_score.length > 0){
                let score = {}
                team_score.forEach((val,key) => { 
                    let total = parseInt(val.home + val.away)
                    switch(val.type){  
                        case 24: //危险进攻
                            score.home_danger = val.home
                            score.away_danger = val.away
                            if(total > 0){
                                score.home_danger_percentage = parseInt(val.home / total * 100)
                                score.away_danger_percentage = parseInt(val.away / total * 100)
                            }else{
                                score.home_danger_percentage = 0
                                score.away_danger_percentage = 0
                            }
                            
                            break;
                        case 23: //进攻
                            score.home_attack = val.home
                            score.away_attack = val.away

                            if(total > 0){
                                score.home_attack_percentage = parseInt(val.home / total * 100)
                                score.home_attack_percentage = parseInt(val.away / total * 100)
                            }else{
                                score.home_attack_percentage = 0
                                score.home_attack_percentage = 0
                            }
                            
                            break;
                        case 25: //控球率
                            score.home_control_rate = val.home
                            score.away_control_rate = val.away

                            if(total > 0){
                                score.home_control_rate_percentage = parseInt(val.home / total * 100)
                                score.away_control_rate_percentage = parseInt(val.away / total * 100)
                            }else{
                                score.home_control_rate_percentage = 0
                                score.away_control_rate_percentage = 0
                            }
                            
                            break; 
                        case 4: //红牌
                            score.home_red_card = val.home
                            score.away_red_card = val.away
                            break;
                        case 2: //角球
                            score.home_kick = val.home
                            score.away_kick = val.away
                            break;
                        case 3: //黄牌
                            score.home_yellow_card = val.home
                            score.away_yellow_card = val.away
                            break; 
                        case 8: //点球
                            score.home_penalty_kick = val.home                       
                            score.away_penalty_kick = val.away                       
                            break; 
                        case 21: //射正                    
                            score.home_shoot = val.home
                            score.away_shoot = val.away

                            if(total > 0){
                                score.home_shoot_percentage = parseInt(val.home / total * 100)
                                score.away_shoot_percentage = parseInt(val.away / total * 100)
                            }else{
                                score.home_shoot_percentage = 0
                                score.away_shoot_percentage = 0
                            }
                            
                            break;
                        case 22: //射偏
                            score.home_deflection = val.home
                            score.away_deflection = val.away

                            if(total > 0){
                                score.home_deflection_percentage = parseInt(val.home / total * 100)
                                score.away_deflection_percentage = parseInt(val.away / total * 100)
                            }else{
                                score.home_deflection_percentage = 0
                                score.away_deflection_percentage = 0
                            }                          
                            break;                                 
                    }
                })
                this.team_score = score
            }                        
        }       
    },

    destroyed() {
        document.removeEventListener("scroll", this.handleScroll);
    },
};
</script>

<style lang="stylus">
#zbj {
    .zbjroom {
        height: 946px;
        margin-top:100px;
        .event_title{
            margin: auto;
            width:1200px;
            height: 120px;
            background: white;
            border-radius:5px;
            line-height:120px;
            >div{
                float: left;
            }

            .home_name{
                width:500px;
                height: 120px;
                text-align: right;
                line-height: 120px;

                .team{
                    position: relative;
                    bottom: 10px;
                    font-size: 20px;
                    letter-spacing:1px;
                }

                .fraction{
                    margin:0px 10px 0px 10px;
                    font-size:40px;
                }

                img{
                    position: relative;
                    top:15px;
                    height: 65px; 
                    margin:0px 10px 0px 20px;
                }
            }

            .sorce{
                width:200px;
                height: 120px;
                >p{
                    text-align:center;
                }

                .event_name{
                    margin-top:5px;
                    height: 25px;
                    line-height:25px;
                    font-size:14px;
                    color:#a1a1a1;
                }

                .event_time{
                    height: 20px;
                    line-height:20px;
                    font-size:14px;
                    color:#a1a1a1;
                }

                .event_flag{
                    height: 30px;
                    line-height:30px;
                    font-size:18px;
                    letter-spacing: 1px;
                }

                .now_sorce{
                    height: 30px;
                    line-height:30px;
                    font-size:14px;
                    color:#a1a1a1;
                }
            }

            .away_name{
                width:500px;
                height: 120px;
                text-align: left;
                line-height: 120px;

                .team{
                    position: relative;
                    bottom: 10px;
                    font-size: 20px;
                    letter-spacing:1px;
                }

                .fraction{
                    margin:0px 10px 0px 10px;
                    font-size:40px;
                }

                img{
                    position: relative;
                    top:15px;
                    height: 65px; 
                    margin:0px 10px 0px 20px;
                }
            }          
        }

        .rate{
            margin: auto;
            width:1200px;
            height: 90px;
            background: white;
            border-radius:5px;
            line-height:120px;
            margin-top:20px;

            .classify{
                width:100%;
                height: 30px;
                line-height:30px;
                >span{
                    width:240px;
                    display: block;
                    float:left;
                    text-align: center;
                    letter-spacing: 1px;
                    font-size: 14px;
                    border-right: 1px solid #dedede;
                    height: 20px;
                    line-height: 20px;
                    margin-top:5px;
                }                
            }

            .rate_table{
                width:100%;
                height: 30px;
                line-height:30px;
                border-top:1px solid #dedede;
                >div{
                    width:240px;
                    display: block;
                    float:left;
                    text-align: center;
                    letter-spacing: 1px;
                    font-size: 14px;
                }

                .title{
                    span{
                        display: block;
                        border-right: 1px solid #dedede;
                        height: 20px;
                        line-height: 20px;
                        margin-top:5px;
                    }
                }

                .rate_fraction{
                    >span{
                        width:79px;
                        display: block;
                        float:left;
                        text-align: center;
                        letter-spacing: 1px;
                        font-size: 14px;
                    }

                    .vertical{
                        height: 20px;
                        line-height: 20px;
                        margin-top:5px;
                        width:1px;
                        background: #dedede;
                        margin-left:2px;
                    }
                }
                
            }
        }

        .zbjroominner {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            height: 100%;
            padding: 10px 0;
            justify-content: space-between;
            >div {
                background: #fff;
                border-radius: 4px;
            }

            .media {
                width: 860px;
                height: 720px;
                position: relative;
                .classify{
                    width: 100%;
                    height: 40px;
                    line-height:40px;
                    .animation{
                        width:50%;
                        background: #464545;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                        letter-spacing: 1px;
                        color:#676060;
                        cursor: pointer;

                        img{
                            position: relative;
                            top:7px;
                            margin-right:10px;
                        }
                    }
                    
                    .video{
                        width:50%;
                        background:#636161;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                        letter-spacing: 1px;
                        color:#92949e;
                        cursor: pointer;
                        img{
                            position: relative;
                            top:7px;
                            margin-right:10px;
                        }
                    }

                    >div:hover{
                        color:#eca609;
                        font-weight: bold;
                    }

                    .hover{
                        color:#eca609;
                        font-weight: bold;
                    }
                }
                .animation_content{
                    width:100%;
                    height: 530px;
                    background:#4c4b4b;
                    .content{
                        width:100%;
                        background:#4c4b4b;
                        #animation_content{
                            width:800px;
                            height: 530px;
                            margin-left:30px;
                        }                        
                    }
                }

                .video_content{
                    width:100%;
                    height: 530px;
                    background: #343434;

                    .content{
                        width:100%;
                        height: 530px;
                        background: #4c4b4b;                        
                    }
                }

                .evnet_status{
                    width:100%;
                    height: 150px;
                    background: #3e3e3e;
                    padding-top:10px;
                    .team_control{
                        height: 50px;
                        line-height:50px;
                        width:100%;

                        >div{
                            float:left;                            
                        }

                        .home_state{
                            width:200px;
                            height: 40px;
                            >div{
                                float:left; 
                                width: 60px;
                                text-align:center;                                
                                height: 40px;
                                img{
                                    margin-right: 10px;  
                                    width:20px;
                                    position: relative;
                                    top:5px;                            
                                }

                                span{
                                    color:#fff;
                                    font-size:14px; 
                                    position: relative;
                                    top:5px;
                                }                            
                            }
                        }

                        .ball_control{
                            width:460px;
                            height: 40px;
                            >div{
                                float:left;
                            }

                            .home_control{
                                width:200px;
                                height: 40px;
                                span{
                                    display: block;
                                    float:left;
                                    width:30px; 
                                    height: 40px; 
                                    line-height:52px;
                                    text-align: center;
                                    font-size:14px;  
                                    color:#fff;                            
                                }

                                .progress{
                                    width:160px;
                                    float:left;
                                    .el-progress{
                                        transform:rotate(180deg);
                                        position: relative;
                                        top:23px;
                                    }                                    
                                }
                                
                            }

                            .control{
                                width:60px;
                                height: 40px;
                                text-align: center;
                                font-size: 14px;
                                color:#fff;
                                letter-spacing: 1px;
                            }

                            .away_control{
                                width:200px;
                                height: 40px;
                                span{
                                    display: block;
                                    float: right;
                                    width:30px; 
                                    height: 40px; 
                                    line-height:52px;
                                    text-align: center;
                                    font-size:14px;  
                                    color:#fff;                            
                                }

                                .progress{
                                    width:160px;
                                    float:left;
                                    margin-left:10px;
                                    .el-progress{
                                        position: relative;
                                        top:23px;
                                    }                                    
                                }
                            }
                        }

                        .away_state{
                            width:200px;
                            height: 40px;
                            >div{
                                float: right; 
                                width: 60px;
                                text-align:center;
                                height: 40px;
                                img{
                                    margin-right: 10px;  
                                    width:20px;
                                    position: relative;
                                    top:5px; 
                                    left:10px;                           
                                }

                                span{
                                    color:#fff;
                                    font-size:14px; 
                                    position: relative;
                                    top:5px;
                                }                            
                            }
                        }
                    }

                    .home_score{
                        width:430px;
                        height: 90px;                       
                        float:left;
                        .home_line{
                            height: 40px;
                            line-height:40px;
                            >span{
                                display: block;
                                float:left;
                                width:40px;
                                text-align: center;
                                font-size: 14px;
                                letter-spacing: 1px;
                                color: #fff;
                            }

                            .middle{
                                margin:0px 8px 0px 8px;
                            }
                            .progress{
                                width:145px;
                                float:left;
                                .el-progress{
                                    transform:rotate(180deg);
                                    position: relative;
                                    top:17px;
                                }
                            }
                        }
                    }

                    .away_score{
                        width:430px;
                        height: 90px;
                        float:left;

                        .away_line{
                            height: 40px;
                            line-height:40px;
                            >span{
                                display: block;
                                float:left;
                                width:40px;
                                height: 40px;
                                line-height:40px;
                                text-align: center;
                                font-size: 14px;
                                letter-spacing: 1px;
                                color: #fff;
                            }

                            .middle{
                                margin:0px 8px 0px 8px;                               
                            }
                            .progress{
                                width:145px;
                                float:left;
                                .el-progress{
                                    position: relative;
                                    top:17px;
                                }
                            }
                        }
                    }
                }
            }           
        }
    }

    .diagram{
        width:1200px;
        height: 220px;
        background: #fff;
        box-shadow:0 2px 6px rgba(4,0,0,0.1);
        margin: 50px auto;
        position: relative;

        .team-box{
            width:240px;
            float: left;
            .home_team{
                line-height: 100px;
                font-size:18px;
                text-align: center;
                letter-spacing: 1px;
                .logo{
                    height: 50px;
                    line-height: 50px;
                    img{
                        height: 35px;
                    }
                }

                .name{
                    height: 50px;
                    line-height: 50px;
                }
            }

            .away_team{
                line-height: 100px;
                font-size:18px;
                text-align: center;
                letter-spacing: 1px;
                .logo{
                    height: 50px;
                    line-height: 50px;
                    img{
                        height: 35px;
                        margin-top:15px;
                    }
                }

                .name{
                    height: 50px;
                    line-height: 50px;
                }
            }
        }

        .dividing_line{
            height: 160px;
            width:900px;
            position: relative;
            top:35px;
            display: flex;
            .boundary{
                width:160px;
                border-left:1px solid #cccccc;
                height: 160px;
                float:left;
            }

            .boundary_end{
                width:1px;
                border-left:1px solid #cccccc;
                height: 160px;
                background: cornsilk;
            }
            span{
                font-size:12px;
                color:#cccccc;
                position: relative;
                bottom:20px;
                right:6px;
            }
        } 

        .team_progress{
            height: 160px;
            width:900px;
            position: absolute;
            top:25px;
            left:240px;

            .home_progress{
                height: 80px;
                line-height: 80px;
                position: relative;

                .incident{
                    height: 80px;
                    position: absolute;
                    padding:0px 5px 0px 5px;
                    z-index: 1000;  
                    bottom: 10px; 
                    min-width:200px; 
                    .is_hover{
                        display: none;
                    }

                    .incident_info{ 
                        border-radius: 8px;
                        box-shadow: 1px 1px 2px #9c9c9c; 
                        position: relative;
                        right:50%;
                        padding:5px 5px 0px 5px;  
                        height: 45px;   
                        background: #fff;                                         
                        >p{
                            span{
                                display: block;
                                font-size:12px;
                                height: 20px;
                                line-height: 20px;
                                letter-spacing:1px; 
                            }
                        }

                        .thing{
                            float:left;
                            padding-left:5px;
                        }

                        .time{
                            width:35px;
                            height: 35px;
                            text-align: center;
                            line-height: 35px;
                            color:#fff;
                            background: #f8c21b;
                            border-radius: 5px;
                            font-size:16px;
                            margin-left:10px;
                            float:right;
                        }
                    }

                    .mark{
                        width:25px;
                        height: 30px;
                        clear:both;
                        line-height: 30px;
                        position: absolute;
                        top:50px;
                        cursor: pointer;
                        img{
                            margin-top:5px;
                        }
                        
                    }
                }
            }

            .away_progress{
                height: 80px;
                line-height: 80px;
                position: relative;
                .incident{
                    height: 80px;
                    position: absolute;
                    padding:0px 5px 0px 5px;
                    z-index: 1000;  
                    bottom: 10px; 
                    min-width:200px;
                    .is_hover{
                        display: none;
                    }                                  
                    .incident_info{ 
                        border-radius: 8px;
                        box-shadow: 1px 1px 2px #9c9c9c; 
                        position: relative;
                        right:50%;
                        padding:5px 5px 0px 5px;  
                        height: 45px;   
                        background: #fff;                                         
                        >p{
                            span{
                                display: block;
                                font-size:12px;
                                height: 20px;
                                line-height: 20px;
                                letter-spacing:1px; 
                            }
                        }

                        .thing{
                            float:left;
                            padding-left:5px;
                        }

                        .time{
                            width:35px;
                            height: 35px;
                            text-align: center;
                            line-height: 35px;
                            color:#fff;
                            background: #f8c21b;
                            border-radius: 5px;
                            font-size:16px;
                            margin-left:10px;
                            float:right;
                        }
                    }

                    .mark{
                        width:100px;
                        height: 30px;
                        clear:both;
                        line-height: 30px;
                        position: absolute;
                        top:50px;
                        cursor: pointer;
                        img{
                            margin-top:5px;
                        }
                        
                    }
                }
            }
        }      
    }

    .team_detail{
        width:1200px;        
        background: #fff;
        box-shadow:0 2px 6px rgba(4,0,0,0.1);
        margin: 50px auto;
        position: relative;

        .el-tabs__header{
            padding:10px 20px 0px 20px;
        }

        .el-drawer__header{
            padding:0px 0px 0px 36%;
            height:50px;
            line-height: 50px;
            span{
                color:#f00;
                font-size:20px;
                font-weight:bold;
                letter-spacing:1px;
            }
        }

        .el-tabs__item{
            padding:0 40px 0px 40px;
            height:50px;
            line-height: 50px;
            letter-spacing: 1px;
            text-align: center;
            font-size:18px;
            font-family: math;
        }

        .block{
            padding:10px 20px 10px 20px;

            .el-timeline-item__node--normal{
                top:25px;
            }
            
            .el-timeline-item__tail{
                top:25px;
            }

            .event_logo{
                width:25px;
                float:left;
                margin-right:20px;
            }

            p{
                height: 25px;
                line-height: 25px;
                font-size: 14px;
            }
        }

        .lineup{
            padding:10px 10px 10px 10px;
            width:100%;
            .team{
                height: 150px;
                >div{
                    float:left;
                }

                .home_team{
                    width:40%;
                    text-align: center;
                    .logo{
                        height: 50px;
                        img{
                            height: 50px;
                        }
                    }

                    .name{                       
                        height: 60px;
                        line-height: 60px;
                        font-size:26px;
                        letter-spacing: 1px;                        
                    }
                }

                .mark{
                    height: 60px;
                    width:20%;
                    p{                        
                        text-align: center;
                        color:rgba(221,221,221,1);
                        font-size:70px;
                        font-family:'Noto Sans S Chinese';
                        height: 60px;
                    }
                    
                }

                .away_team{
                    width:40%;
                    text-align: center;
                    .logo{
                        height: 50px;
                        img{
                            height: 50px;
                        }
                    }

                    .name{                       
                        height: 60px;
                        line-height: 60px;
                        font-size:26px;
                        letter-spacing: 1px;                       
                    }
                }
            }

            .lineup_list{
                >div{
                    display: block;
                    float:left;
                }
                .home_lineup{
                    width:340px;
                    background: #eee;

                    .change_player{
                        height: 40px;
                        line-height: 40px;
                        border-top:1px solid #DEDEDE;
                        p{
                            float:left;
                            width:50%;
                            span{
                                display: block;
                                float:left;
                                font-size:12px;
                            }                           
                        }

                        .in_player{
                            span{
                                float: right;
                            }

                            img{
                                width: 30px;
                                height: 30px;
                                position: relative;
                                top:10px;
                            }

                            i{
                                float:right;
                                width:20px;
                                height:20px;
                                line-height: 20px;
                                font-size:16px;
                                position:relative;
                                top:10px;
                                right:5px;
                                color:#a79d9d;
                                border-radius:50%;
                                background:#d8d2d2;
                                text-align:center;
                                margin-left:5px;
                            }
                        }

                        .out_player{
                            position: relative;
                            img{
                                width: 30px;
                                height: 30px;
                                position: relative;
                                top:10px;
                            }

                            i{
                                float:left;
                                width:20px;
                                height:20px;
                                line-height: 20px;
                                font-size:16px;
                                position:relative;
                                top:10px;
                                right:15px;
                                color:#a79d9d;
                                border-radius:50%;
                                background:#d8d2d2;
                                text-align:center;
                                margin-left:10px;
                            }

                            .name{
                                position: absolute;
                                left:60px;
                                bottom:10px;
                                width:110px;
                                text-align: left;
                            }
                        }
                    }

                    p{
                        height: 40px;
                        line-height: 40px;
                        border-top:1px solid #DEDEDE;
                        text-align:right;
                        i{
                            float:right;
                            width:30px;
                            height:30px;
                            line-height: 30px;
                            font-size:24px;
                            position:relative;
                            top:5px;
                            right:10px;
                            color:#a79d9d;
                            border-radius:50%;
                            background:#d8d2d2;
                            text-align:center;
                            margin-left:10px;
                        }

                        >div{
                            float:left;
                        }

                        >span{
                            display: block;
                            float: right;
                            margin-right: 10px;
                            height: 30px;
                            img{
                                position: relative;                               
                                height:30px;
                                width:30px;
                            }

                            .event_icon{
                                width: 20px;
                                top:5px;
                            }

                            .avatar{
                                top:6px;
                            }
                        }

                        .jersey{
                            font-size:12px;
                            width:20px;
                            height: 20px;
                            line-height: 20px;
                            text-align: center;
                            border-radius: 50%;
                            background: #000000;
                            color: #fff;
                            position: relative;
                            top:10px;
                        }

                        .name{
                            font-size:14px;
                        }

                        .time{
                            font-size:14px;
                        }
                    }

                    .substitute{
                        font-size: 14px;
                        letter-spacing: 1px;
                        box-shadow:0 2px 1px 0 rgba(0,0,0,0.1);
                        text-align: center;
                    }
                }

                .court{
                    width:500px;
                    height: 786px;
                    background: url('~@/assets/img/football_team_bg.png') no-repeat;

                    .home_player{
                        width: 100%; 
                        height: 393px;
                        position: relative;

                        .player{
                            height: 40px;
                            line-height: 40px;
                            position: absolute;
                            z-index: 200;
                            >span{
                                display: block;
                            }                           
                            img{
                                position: relative;
                                left:0px;
                                top:0px;
                                width: 30px;
                            }

                            .jersey{
                                font-size:12px;
                                width:20px;
                                height: 20px;
                                line-height: 20px;
                                text-align: center;
                                border-radius: 50%;
                                background: #000000;
                                color: #fff;
                                position: absolute;
                                top:8px;
                                left:-17px;
                            }

                            .name{
                                font-size:12px;
                                height: 20px;
                                line-height: 20px;
                                position: relative;
                                left:-45%;
                                bottom:18px;
                                color:#fff;
                                width:120px;
                                text-align: center;
                            }

                            .sorce{
                                position: absolute;
                                top:0px;
                                left:30px;
                                font-size:14px;
                                color:#f97605;
                            }
                        }
                    }

                    .away_player{
                        width: 100%; 
                        height: 393px;
                        position: relative;                       
                        .player{
                            height: 40px;
                            line-height: 40px;
                            position: absolute;
                            z-index: 200;
                            text-align:right;
                            >span{
                                display: block;
                            }                           
                            img{
                                position: relative;
                                left:0px;
                                top:0px;
                                width: 30px;
                            }

                            .jersey{
                                font-size:12px;
                                width:20px;
                                height: 20px;
                                line-height: 20px;
                                text-align: center;
                                border-radius: 50%;
                                background: #fff;
                                color: #000;
                                position: absolute;
                                top:5px;
                                right:-20px;
                            }

                            .name{
                                font-size:12px;
                                height: 20px;
                                line-height: 20px;
                                position: relative;
                                left:40%;
                                bottom:18px;
                                color:#fff;
                            }

                            .sorce{
                                position: absolute;
                                top:0px;
                                right:30px;
                                font-size:14px;
                                color:#f97605;
                            }
                        }
                    }
                }

                .away_lineup{
                    width:340px;
                    background: #eee;
                    p{
                        height: 40px;
                        line-height: 40px;
                        border-top:1px solid #DEDEDE;
                        text-align:left;

                        i{
                            float:left;
                            width:30px;
                            height:30px;
                            line-height: 30px;
                            font-size:24px;
                            position:relative;
                            top:5px;
                            right:0px;
                            color:#a79d9d;
                            border-radius:50%;
                            background:#d8d2d2;
                            text-align:center;
                            margin-left:10px;
                        }

                        >span{
                            display: block;
                            float: left;
                            margin-left: 10px;
                            height: 30px;
                            img{
                                position: relative;                               
                                width:25px;                               
                            }

                            .event_icon{
                                width: 20px;
                                top:5px;
                            }

                            .avatar{
                                top:6px;
                            }
                        }

                        .jersey{
                            font-size:12px;
                            width:20px;
                            height: 20px;
                            line-height: 20px;
                            text-align: center;
                            border-radius: 50%;
                            background: #000000;
                            color: #fff;
                            position: relative;
                            top:10px;
                        }

                        .name{
                            font-size:14px;
                        }

                        .time{
                            font-size:14px;
                        }
                    }

                    .substitute{
                        font-size: 14px;
                        letter-spacing: 1px;
                        box-shadow:0 2px 1px 0 rgba(0,0,0,0.1);
                        text-align: center;
                    }                    
                }
            }
        }

        .finger{
            padding:0px 20px 20px 20px;
            .el-tabs__header{
                padding:0px 20px 0px 0px;
            }
           
            .el-table__empty-text{
                font-size:30px;
                letter-spacing:1px;
                font-weight:500;
                display: block;
                height: 400px;
                line-height: 400px;
            }
            
            .el-tabs__item{
                padding:0px 40px 0px 40px;
                height:40px;
                line-height: 40px;
                letter-spacing: 1px;
                text-align: center;
                font-size:16px;
                font-family: math;
            } 

            .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{
                color:#409EFF;
            }

            .el-table th>.cell{
                text-align: center;
            }

            .el-table .cell{
                text-align: center;
            }

            .first_offer{
                width: 420px;
                >span{
                    display: block;
                    float:left;
                    width:125px;
                    text-align: center;
                }
            }

            .instant_disk{
                width: 420px;
                >span{
                    display: block;
                    float:left;
                    width:125px;
                    text-align: center;
                }
            }

            .move{
                text-align: right;
                cursor: pointer;
                height: 30px;
                line-height: 30px;
            }            
        }
      
        .el-tabs__header{
            padding:10px 0px 0px 20px;
        }

        .el-tabs--left .el-tabs__header.is-left{
            margin-right:0px;
        }

        .el-table .cell{
            text-align: center;
        }

        .demo-drawer__content{
            margin-top:5px;
            .finger_list{
                .el-table__footer-wrapper, .el-table__header-wrapper{
                    display: none;
                }

                .el-table__body{
                    margin-top:10px;
                }               
            }

            .el-tabs__active-bar .is-left{
                height:35px;
            }

            .el-tabs__item.is-active{
                background:#b2c0f3;
                border-radius: 5px;
                color:#fff;
                height:35px;
                line-height: 35px;
            }

            .el-tabs__item{
                padding:0 10px 0px 10px;
                height:35px;
                line-height: 35px;
                font-size:14px;
                margin-right:15px;
            }

            .header{
                position: absolute;
                height: 40px;
                line-height: 40px;
                width:575px;
                top:50px;
                background: #e2dbdb;
                z-index: 100;
                border-bottom:1px solid #b9b4b4;
                font-size:14px;
                color:#9a9292;
                letter-spacing:1px;
                >span{
                    display: block;
                    float: left;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                }
            }

            .el-table td, .el-table th{
                height: 35px;
                line-height: 35px;
                padding:0px;
            }
        }

        .ball{
            .el-table td, .el-table th{
                height: 35px;
                line-height: 35px;
                padding:0px;            
            }

            .el-table_1_column_1{
                border-right: 1px solid #ecedef;
            }

            .el-table_1_column_2{
                border-right: 1px solid #ecedef;
            }

            .el-table_1_column_3{
                border-right: 1px solid#ecedef;
            }
        }
 
        .victory_defeat{
            .el-table td, .el-table th{
                height: 35px;
                line-height: 35px;
                padding:0px;            
            }

            p{
                height: 30px;
                line-height: 30px;
            }
        } 

        .total_goals{
            .el-table td, .el-table th{
                height: 35px;
                line-height: 35px;
                padding:0px;            
            }

            .el-table_3_column_11{
                border-right: 1px solid #ecedef;
            }

            .el-table_3_column_12{
                border-right: 1px solid #ecedef;
            }

            .el-table_3_column_13{
                border-right: 1px solid#ecedef;
            }
        }

        .corner_kick{
            .el-table td, .el-table th{
                height: 35px;
                line-height: 35px;
                padding:0px;            
            }

            .el-table_4_column_15{
                border-right: 1px solid #ecedef;
            }

            .el-table_4_column_16{
                border-right: 1px solid #ecedef;
            }

            .el-table_4_column_17{
                border-right: 1px solid#ecedef;
            }
        } 
    }

    .vcp-controls-panel.show{
        display: none;
    }
    
}
</style>



