<template>
    <div id="zbj">
        <div class="zbjroom">
            <div class = "event_title">
                <div class = "home_name">
                    <span class = "team">{{home_team.name_zh}}</span>
                    <img :src="home_team.logo" class = "team_logo"/>
                    <span class = "fraction">{{home_team.main_score}}</span>
                </div>
                <div class = "sorce">
                    <p class = "event_name">{{event.name_zh}}</p>
                    <p class = "event_time">{{event.competition_text}}</p>
                    <p class = "event_flag">VS</p>
                    <p class = "now_sorce">HT：0-0</p>
                </div>

                <div class = "away_name">
                    <span class = "fraction">{{away_team.deputy_score}}</span>
                    <img :src="away_team.logo" class = "team_logo" />                   
                    <span class = "team">{{away_team.name_zh}}</span>
                </div>
            </div>
            <div class ="rate">
                <div class = "classify">
                    <div class = 'title'><span>对阵</span></div>
                    <div class = 'section'>
                        <span style='border-left: 1px solid #dedede;'>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span style='border-right: 1px solid #dedede;'>4</span>
                    </div>

                    <div class = 'event_status'>
                        <span>半场</span>
                        <span>全场</span>
                        <span>分差</span>
                        <span>总分</span>
                    </div>

                    <div class = 'cultivation_rate'>
                        <span>让分</span>
                        <span>欧指</span>
                        <span style='border-right: none;'>总分</span>
                    </div>
                </div>

                <div class = "rate_table">
                    <div class = 'title'>
                        <span>{{home_team.name_zh}}</span>
                    </div>
                    <div class = 'section'>
                        <span style='border-left: 1px solid #dedede;'>{{home_team.main_one_score}}</span>
                        <span>{{home_team.main_two_score}}</span>
                        <span>{{home_team.main_three_score}}</span>
                        <span style='border-right: 1px solid #dedede;'>{{home_team.main_four_score}}</span>
                    </div>                                     
                    <div class = 'event_state'>
                        <span>{{home_team.main_one_score + home_team.main_two_score}}</span>
                        <span>{{home_team.main_score}}</span>
                        <span>全：{{home_team.main_score - away_team.deputy_score}}</span>
                        <span>全：{{home_team.main_score + away_team.deputy_score}}</span>
                    </div> 
                    <div class = 'cultivation_rate'>
                        <span>-</span>
                        <span>-</span>
                        <span style='border-right: none;'>-</span>
                    </div>
                </div>

                <div class = "rate_table">
                    <div class = 'title'><span>{{away_team.name_zh}}</span></div>
                    <div class = 'section'>
                        <span style='border-left: 1px solid #dedede;'>{{away_team.deputy_one_score}}</span>
                        <span>{{away_team.deputy_two_score}}</span>
                        <span>{{away_team.deputy_three_score}}</span>
                        <span style='border-right: 1px solid #dedede;'>{{away_team.deputy_four_score}}</span>
                    </div> 
                    <div class = 'event_state'>
                        <span>{{away_team.deputy_one_score + away_team.deputy_two_score}}</span>
                        <span>{{away_team.deputy_score}}</span>
                        <span>半：{{(home_team.main_one_score + home_team.main_two_score) - (away_team.deputy_one_score + away_team.deputy_two_score)}}</span>
                        <span>半：{{(home_team.main_one_score + home_team.main_two_score) + (away_team.deputy_one_score + away_team.deputy_two_score)}}</span>
                    </div> 
                    <div class = 'cultivation_rate'>
                        <span>-</span>
                        <span>-</span>
                        <span style='border-right: none;'>-</span>
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

                    <!-- <div class = "event_status" v-if="is_eject"> -->   
                        <!-- 未开赛 1,11,12,13,14,15 -->                                           
                        <!-- <div class = 'not' v-if="status == 1 || status == 11 || status == 12 || status == 13 || status == 14 || status == 15">
                            <div class = 'home_team'>
                                <p><img :src="home_team.logo" /></p>
                                <p>{{home_team.name_zh}}</p>
                            </div>

                            <div class = 'score'>
                                <p class = "status">开赛倒计时</p>
                                <p class="count_down">
                                    <span>{{countdown_time.day}}</span>
                                    <span>{{countdown_time.hour}}</span>
                                    <span>{{countdown_time.minute}}</span>
                                    <span>{{countdown_time.seconds}}</span>
                                </p>
                                <p class = 'time'>
                                    <span>天</span>
                                    <span>小时</span>
                                    <span>分钟</span>
                                    <span>秒</span>
                                </p>
                            </div>

                            <div class = 'away_team'>
                                <p><img :src="away_team.logo" /></p>
                                <p>{{away_team.name_zh}}</p>
                            </div>
                        </div> -->

                        <!-- 完赛 10 -->
                        <!-- <div class = 'end' v-if="status==10">
                            <div class = "match_title">
                                <span>{{event.name_zh}}</span>
                            </div>
                            
                            <div class = 'ball_game'>
                                <div class = 'home_team'>
                                    <p><img :src="home_team.logo" /></p>
                                    <p>{{home_team.name_zh}}</p>
                                </div>

                                <div class = 'score'>
                                    <p class = "status">{{status_text}}</p>
                                    <p class= "team_score">
                                        <span>{{home_team.main_score}}</span> <span>:</span> <span>{{away_team.deputy_score}}</span>
                                    </p>
                                </div>

                                <div class = 'away_team'>
                                    <p><img :src="away_team.logo" /></p>
                                    <p>{{away_team.name_zh}}</p>
                                </div>
                            </div>                           
                        </div> -->
                    <!-- </div> -->
                    
                    <div class = 'animation_content' v-if="is_play=='animation' ">
                        <div class = "content" v-if="animation_url != '' ">
                            <iframe ref="iframe" id="animation_content" :src="animation_url" frameborder="0" scrolling="yes" ></iframe>
                        </div>

                        <div v-else style="width:100%; text-align: center; line-height: 440px; ">                       
                            <span style="font-size:30px; font-weight: bold; letter-spacing: 2px; color:#636161">暂无动画</span> 
                        </div>
                    </div>

                    <div class = 'video_content' v-else>
                        <div class = "content">
                            <div id="video_content" style="width:100%; height:auto;" v-if ="video_url != '' && status != 10"></div>
                            <div v-else style="width:100%; text-align: center; line-height: 440px; ">                       
                                <span style="font-size:30px; font-weight: bold; letter-spacing: 2px; color:#636161">暂无直播</span> 
                            </div>
                        </div>
                    </div>

                    <!-- 正在进行  2,3,4,5,6,7,8,9 --> 
                    <!-- <div class = "team" v-if="status == 3 || status == 4 || status == 5 || status == 6 || status == 7 || status == 8 || status == 9">                       
                        <div class = "home_team">
                            <img :src="home_team.logo" />
                            <span>{{home_team.name_zh}}</span>
                        </div> 

                        <div class = "sorce_half" v-if="status == 3 || status == 5 || status == 7">
                            <p class = "now_sorce">
                                <span class = "home_sorce">{{home_team.main_score}}</span>
                                <span style="color:#fff; position: relative; bottom:1px;">:</span>
                                <span class = "away_sorce">{{away_team.deputy_score}}</span>
                            </p>
                        </div>

                        //中场  3,5,7 
                        <div class = "sorce_conduct" v-else>
                            <p class = "time">{{this.exceed_time.minute}}:{{this.exceed_time.seconds}}</p>
                            <p class = "now_sorce">                              
                                <span class = "home_sorce">{{home_team.main_score}}</span>
                                <span style="color:#fff; position: relative; bottom:3px;">:</span>
                                <span class = "away_sorce">{{away_team.deputy_score}}</span>
                            </p>
                        </div> 
                        
                        <div class = "away_team">                           
                            <span>{{away_team.name_zh}}</span>
                            <img :src="away_team.logo" />
                        </div> 
                    </div> -->

                    <!-- <div class = "team_end" v-if="status==10">
                        <div class = "home_team">
                            <img :src="home_team.logo" />
                            <span>{{home_team.name_zh}}</span>
                        </div> 
                      
                        <div class = "sorce_end">
                            <p class = "now_sorce">
                                <span class = "home_sorce">{{home_team.main_score}}</span>
                                <span style="color:#fff; position: relative; bottom:1px;">:</span>
                                <span class = "away_sorce">{{away_team.deputy_score}}</span>
                            </p>
                        </div>

                        <div class = "away_team">                           
                            <span>{{away_team.name_zh}}</span>
                            <img :src="away_team.logo" />
                        </div> 
                    </div> -->

                    <div class="evnet_status">                        
                        <div class = "home_score">
                            <div class = "foul">
                                <div class="foul_type">
                                    <span class = "middle">暂停</span>
                                    <span>{{team_score.home_free_goal}}</span>                                  
                                </div>
                                
                                <div class="foul_type">
                                    <span class = "middle">犯规</span>
                                    <span>{{team_score.home_fouls}}</span>                                  
                                </div>
                            </div>

                            <div class = "team_score_type"> 
                                <div class='home_line'>
                                    <span>{{team_score.home_three_goal}}</span>
                                    <p class = 'progress'>
                                        <el-progress :text-inside="true" :stroke-width="8" :percentage="team_score.home_three_percentage" 
                                        :show-text = 'false' color='#75abeb'>
                                        </el-progress> 
                                    </p>
                                </div> 
                                
                                <div class='home_line'>
                                    <span>{{team_score.home_two_goal}}</span>
                                    <p class = 'progress'>
                                        <el-progress :text-inside="true" :stroke-width="8" :percentage="team_score.home_two_percentage"
                                         :show-text = 'false' color='#75abeb'>
                                        </el-progress> 
                                    </p>
                                </div>

                                <div class='home_line'>
                                    <span>{{team_score.home_free_goal}}</span>
                                    <p class = 'progress'>
                                        <el-progress :text-inside="true" :stroke-width="8" :percentage="team_score.home_free_hit" :show-text = 'false' color='#75abeb'>
                                        </el-progress> 
                                    </p>
                                </div>
                            </div> 
                        </div>

                        <div class ="score_type">
                            <p>3分球得分</p>
                            <p>2分球得分</p>
                            <p>
                                <span style="color:#fa0303">{{team_score.home_free_hit}}%</span>
                                <span class ="free_throw">罚球</span>
                                <span style="color:#fa0303">{{team_score.away_free_hit}}%</span>
                            </p>
                        </div>

                        <div class = "away_score">
                            <div class = "team_score_type"> 
                                <div class='away_line'>
                                    <span>{{team_score.away_three_goal}}</span>
                                    <p class = 'progress'>
                                        <el-progress :text-inside="true" :stroke-width="8" :percentage="team_score.away_three_percentage" :show-text = 'false' color='#fbd73b'>
                                        </el-progress> 
                                    </p>
                                </div> 
                                
                                <div class='away_line'>
                                    <span>{{team_score.away_two_goal}}</span>
                                    <p class = 'progress'>
                                        <el-progress :text-inside="true" :stroke-width="8" :percentage="team_score.away_two_percentage" :show-text = 'false' color='#fbd73b'>
                                        </el-progress> 
                                    </p>
                                </div>

                                <div class='away_line'>
                                    <span>{{team_score.away_free_goal}}</span>
                                    <p class = 'progress'>
                                        <el-progress :text-inside="true" :stroke-width="8" :percentage="team_score.away_free_hit" :show-text = 'false' color='#fbd73b'>
                                        </el-progress> 
                                    </p>
                                </div>
                            </div>
                            <div class = "foul">
                                <div class="foul_type">
                                    <span class = "middle">暂停</span>
                                    <span>{{team_score.away_free_goal}}</span>                                  
                                </div>
                                
                                <div class="foul_type">
                                    <span class = "middle">犯规</span>
                                    <span>{{team_score.away_fouls}}</span>                                  
                                </div>
                            </div>                
                        </div>
                    </div>
                </div>               
                <div class= "chat">
                    <chat></chat>
                </div>
            </div>
        </div>

        <div class = 'team_detail'>
            <el-tabs v-model="active" @tab-click="TeamChange">
                <el-tab-pane label="文字直播" name="text_live">
                    <div class = "text_live">
                        <el-tabs type="border-card">
                            <el-tab-pane label="第一节">
                                <div class="block" v-if="section_one.length > 0">
                                    <el-timeline>
                                        <el-timeline-item v-if="section_one.length > 0" v-for="(val, i) in section_one" :key="i">
                                            <el-card>
                                                <span>{{val.time}}</span>
                                                <span><img class="event_logo" :src="val.logo"></span>
                                                <span>{{val.describe}}</span>
                                                <span style="margin-left:10px;">{{val.score}}</span>
                                            </el-card>
                                        </el-timeline-item>                          
                                    </el-timeline>
                                </div>
                                <no-data v-else></no-data>
                            </el-tab-pane>
                            <el-tab-pane label="第二节">
                                <div class="block" v-if="section_two.length > 0">
                                    <el-timeline>
                                        <el-timeline-item v-if="section_two.length > 0" v-for="(val, i) in section_two" :key="i">
                                            <el-card>
                                                <span>{{val.time}}</span>
                                                <span><img class="event_logo" :src="val.logo"></span>
                                                <span>{{val.describe}}</span>
                                                <span style="margin-left:10px;">{{val.score}}</span>
                                            </el-card>
                                        </el-timeline-item>                          
                                    </el-timeline>
                                </div>
                                <no-data v-else></no-data>
                            </el-tab-pane>
                            <el-tab-pane label="第三节">
                                <div class="block" v-if="section_three.length > 0">
                                    <el-timeline>
                                        <el-timeline-item v-if="section_three.length > 0" v-for="(val, i) in section_three" :key="i">
                                            <el-card>
                                                <span>{{val.time}}</span>
                                                <span><img class="event_logo" :src="val.logo"></span>
                                                <span>{{val.describe}}</span>
                                                <span style="margin-left:10px;">{{val.score}}</span>
                                            </el-card>
                                        </el-timeline-item>                          
                                    </el-timeline>
                                </div>
                                <no-data v-else></no-data>
                            </el-tab-pane>
                            <el-tab-pane label="第四节">
                                <div class="block" v-if="section_four.length > 0">
                                    <el-timeline>
                                        <el-timeline-item v-if="section_four.length > 0" v-for="(val, i) in section_four" :key="i">
                                            <el-card>
                                                <span>{{val.time}}</span>
                                                <span><img class="event_logo" :src="val.logo"></span>
                                                <span>{{val.describe}}</span>
                                                <span style="margin-left:10px;">{{val.score}}</span>
                                            </el-card>
                                        </el-timeline-item>                          
                                    </el-timeline>
                                </div>
                                <no-data v-else></no-data>
                            </el-tab-pane>
                        </el-tabs> 
                    </div>
                </el-tab-pane>

                <el-tab-pane label="统计" name="statistics">
                    <div class = "statistics" v-if="is_lineup == 1" >
                        <div class = 'highest' v-if="max_score.length > 0 && home_score.length > 0 && away_score.length > 0">
                            <div class="highest_score">
                                <div class = 'player_score' v-for="(val, i) in max_score">
                                    <div class="home_player">
                                        <div class="avatar">
                                            <img :src="val.home_players_avatar">
                                        </div>
                                        <div class = 'user'>
                                            <span>{{val.home_jersey_number}}</span>
                                            <span>{{val.home_players_name}}</span>
                                        </div>

                                        <div class = "progress">
                                            <span :style="{bottom : val.home_top,left:val.home_left}">{{val.home_max}}</span>
                                            <div class="column" :style="{height: val.home_max_text}"></div>
                                        </div>
                                    </div>
                                    <div class = "type_score">
                                        <span>{{val.text}}</span>
                                    </div>
                                    <div class="away_player">
                                        <div class="avatar">
                                            <img :src="val.away_players_avatar">
                                        </div>
                                        
                                        <div class = 'user'>
                                            <span>{{val.away_jersey_number}}</span>
                                            <span>{{val.away_players_name}}</span>
                                        </div>

                                        <div class = "progress">
                                            <span :style="{bottom : val.away_top,left:val.away_left}">{{val.away_max}}</span>
                                            <div class="column" :style="{height: val.away_max_text}"></div>
                                        </div>                                   
                                    </div>
                                </div>                                
                            </div>

                            <div class="total">
                                <div class = "team_total">
                                    <div class = "home_team_name">
                                        <img :src="home_team.logo">
                                        <span>{{home_team.name_zh}}</span>
                                    </div>
                                    <div class = "vs">vs</div>
                                    <div class = "away_team_name">
                                        <span>{{away_team.name_zh}}</span>
                                        <img :src="away_team.logo">                                       
                                    </div>
                                </div>

                                <div class = "team_total_score">
                                    <div class = 'total_score_list' v-if="count_score.length > 0" v-for="(val, i) in count_score">
                                        <div class="home_total_detail">
                                            <span>{{val.home}}</span>
                                            <p class = 'progress'>
                                                <el-progress :text-inside="true" :stroke-width="10" :percentage="val.home_percentage" :show-text = 'false' color='#fbd73b'>
                                                </el-progress> 
                                            </p>  
                                        </div>

                                        <div class= 'text'>
                                            <span>{{val.text}}</span>
                                        </div>

                                        <div class="away_total_detail">                                                
                                            <p class = 'progress'>
                                                <el-progress :text-inside="true" :stroke-width="10" :percentage="val.away_percentage" :show-text = 'false' color='#409eff'>
                                                </el-progress> 
                                            </p>
                                            <span>{{val.away}}</span>
                                        </div>
                                    </div>                                                                      
                                </div>
                            </div>
                        </div>

                        <el-tabs type="border-card" :stretch='true'>
                            <el-tab-pane>
                                <span slot="label">
                                    <img class="home_event_logo" :src="home_team.logo">{{home_team.name_zh}}
                                </span>                                                             
                                <el-table :data="home_score" border style="width: 100%" >
                                    <el-table-column  prop="jersey_number"  label="球衣" width='50' fixed></el-table-column>
                                    <el-table-column  prop="players_name"  label="姓名" width='150' fixed>
                                        <template slot-scope="scope">
                                            <div class = 'players'>
                                                <img :src="scope.row.players_avatar" v-if="scope.row.players_avatar !='' ">
                                                <i class = "el-icon-s-custom" v-else></i>
                                                <span>{{ scope.row.players_name }}</span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  prop="is_replace" label="首发">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.is_replace == 0">否</span>                                           
                                            <span v-else>是</span>                                           
                                        </template>
                                    </el-table-column>
                                    <el-table-column  prop="show_up"  label="出场时间"></el-table-column>
                                    <el-table-column  prop="hit"  label="投篮"></el-table-column>
                                    <el-table-column  prop="three_shot_hit"  label="三分"></el-table-column>
                                    <el-table-column  prop="free_hits"  label="罚球"></el-table-column>
                                    <el-table-column  prop="attack"  label="进攻篮板"></el-table-column>
                                    <el-table-column  prop="defense"  label="防守篮板"></el-table-column>
                                    <el-table-column  prop="total"  label="总篮板"></el-table-column>
                                    <el-table-column  prop="assists"  label="助攻"></el-table-column>
                                    <el-table-column  prop="steals"  label="抢断"></el-table-column>
                                    <el-table-column  prop="shot"  label="盖帽"></el-table-column>
                                    <el-table-column  prop="error"  label="失误"></el-table-column>
                                    <el-table-column  prop="personal"  label="犯规"></el-table-column>
                                    <el-table-column  prop="score"  label="得分"></el-table-column>
                                </el-table>                                
                            </el-tab-pane>
                            <el-tab-pane>
                                <span slot="label">
                                    {{away_team.name_zh}} <img class="away_event_logo" :src="away_team.logo">
                                </span>
                                
                                <el-table :data="away_score" border style="width: 100%">
                                    <el-table-column  prop="jersey_number"  label="球衣" width='50' fixed></el-table-column>
                                    <el-table-column  prop="players_name"  label="姓名" width='150' fixed>
                                        <template slot-scope="scope">
                                            <div class = 'players'>
                                                <img :src="scope.row.players_avatar" v-if="scope.row.players_avatar !='' ">
                                                <i class = "el-icon-s-custom" v-else></i>
                                                <span>{{ scope.row.players_name }}</span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  prop="is_replace" label="首发">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.is_replace == 0">否</span>                                           
                                            <span v-else>是</span>                                           
                                        </template>
                                    </el-table-column>
                                    <el-table-column  prop="show_up"  label="出场时间"></el-table-column>
                                    <el-table-column  prop="hit"  label="投篮"></el-table-column>
                                    <el-table-column  prop="three_shot_hit"  label="三分"></el-table-column>
                                    <el-table-column  prop="free_hits"  label="罚球"></el-table-column>
                                    <el-table-column  prop="attack"  label="进攻篮板"></el-table-column>
                                    <el-table-column  prop="defense"  label="防守篮板"></el-table-column>
                                    <el-table-column  prop="total"  label="总篮板"></el-table-column>
                                    <el-table-column  prop="assists"  label="助攻"></el-table-column>
                                    <el-table-column  prop="steals"  label="抢断"></el-table-column>
                                    <el-table-column  prop="shot"  label="盖帽"></el-table-column>
                                    <el-table-column  prop="error"  label="失误"></el-table-column>
                                    <el-table-column  prop="personal"  label="犯规"></el-table-column>
                                    <el-table-column  prop="score"  label="得分"></el-table-column>
                                </el-table>                                                          
                            </el-tab-pane>
                        </el-tabs>
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
                                                    {{ scope.row.time }}
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
    BasketballGameDetails,
    BasketballGameStatistics,
    BasketballSingleHistory,
    BasketballSingleHistoryList,
    BasketballAnalysis,
    LiveMatches
} from '@/api'
export default {
    name: "zbj",

    components: {
        chat,
        noData,
        notHave
    },
    data() {
        return {
            event_id:0,
            frame_height:'500px',
            active: 'text_live',
            framePosition:'left',
            is_play:'animation',
            home_team:{'main_one_score':0,'main_two_score':0,'main_three_score':0,'main_four_score':0,'main_score':0},
            away_team:{'deputy_one_score':0,'deputy_two_score':0,'deputy_three_score':0,'deputy_four_score':0,'deputy_score':0},
            home_score:[],
            away_score:[],
            count_score:[],
            max_score:[],
            event:{},
            event:{},
            section_one:[],
            section_two:[],
            section_three:[],
            section_four:[],
            finger_check:'asia',
            finger_status:'asia',
            single_finger:{'asia':{},'eu':{},'bs':{}},
            single_finger_list:{'asia':[],'eu':[],'bs':[]},
            single_history_list:[],
            finger_title:'全场让球指数变化',
            history_list_active:'',
            dialog:false,
            flag:false,
            is_lineup:0,
            is_finger:0,
            status:0,
            status_text:"",
            section:0,
            countdown_time:{'day':'00','hour':'00','minute':'00','seconds' : '00'},
            exceed_time:{'minute':'00','seconds' : '00'},
            opening_time:0,
            team_score:{
                'home_three_goal' : 0,'away_three_goal' : 0,'home_two_goal':0,'away_two_goal':0,
                'home_free_goal' : 0,'away_free_goal' : 0,'home_surplus':0,'away_surplus':0,
                'home_fouls' : 0,'away_fouls' : 0,'home_free_hit':0,'away_free_hit':0,
                'home_suspend' : 0,'away_suspend' : 0
            },
            video_url :'',
            animation_url :'',
            is_eject:false,
            is_load:false
        };
    },
    
    mounted() {
        let self = this;
        let height=document.documentElement.clientHeight - 100;
        if(height < 700){
            height = 700
        }
        this.frame_height = height + 'px'
        let event_id = self.$route.query.event_id
        
        if(!event_id){
            this.$router.push({ name: "Basketball" });
        }
        this.event_id = event_id
        this.BasketballDetails()  
        //this.Gameanalysis()         
    },    
 
    methods: {
        async BasketballDetails(){                      
            let data = {
                'id': this.event_id
            }

            let res = await BasketballGameDetails(data)
            if(res.code == 0 || res.code == 200){
                this.is_load = true               
                let record = res.info
                this.home_team = record.home
                this.away_team = record.away
                this.event = record.event
                this.event.competition_text = record.competition_text
                this.event.competition_time = record.competition_time

                this.section_one = record.tlive[0] ? record.tlive[0] : []
                this.section_two = record.tlive[1] ? record.tlive[1] : []
                this.section_three = record.tlive[2] ? record.tlive[2] : []
                this.section_four = record.tlive[3] ? record.tlive[3] : []
                this.status = record.status
                this.status_text = record.status_text
                this.section = record.section
                this.opening_time = record.competition_time
                this.Live_Matches()
                if(res.info.stats.length > 0){
                    let score = {}
                    res.info.stats.forEach((val, i) =>{
                        switch(val.status){
                            case 1: //3分球进球数
                                let total = parseInt(val.home + val.away)
                                score.home_three_goal = val.home
                                score.away_three_goal = val.away
                                if(total > 0){                                   
                                    score.home_three_percentage = parseInt(val.home / total * 100)
                                    score.away_three_percentage = parseInt(val.away / total * 100)
                                }else{
                                    score.home_three_goal = 0
                                    score.away_three_goal = 0
                                }                              
                                break
                            case 2: //2分球进球数                                                            
                                let count = parseInt(val.home + val.away)
                                score.home_two_goal = val.home
                                score.away_two_goal = val.away
                                if(count > 0){
                                    score.home_two_percentage = parseInt(val.home / count * 100)
                                    score.away_two_percentage = parseInt(val.away / count * 100)
                                }else{
                                    score.home_two_goal = 0
                                    score.away_two_goal = 0
                                }                                
                                break
                            case 3: //罚球进球数
                                score.home_free_goal = val.home
                                score.away_free_goal = val.away
                                break
                            case 4: //剩余暂停数
                                score.home_surplus = val.home
                                score.away_surplus = val.away
                                break
                            case 5: //犯规数
                                score.home_fouls = val.home
                                score.away_fouls = val.away
                                break
                            case 6: //罚球命中率
                                score.home_free_hit = val.home
                                score.away_free_hit = val.away
                                break
                            case 7: //总暂停数
                                score.home_suspend = val.home
                                score.away_suspend = val.away
                                break
                        }                       
                    })
                    this.team_score = score
                }

                console.log("status:"+this.status)
                /*if(this.status == 1){
                    let time = setInterval(()=>{
                        if(this.flag == true){
                            clearInterval(time)
                        }                       
                        this.countdown(this.opening_time)
                    },1000)
                } 
                
                if(this.status == 2 || this.status == 4 || this.status == 6 || this.status == 8){
                    let time = setInterval(()=>{
                        if(this.flag == true){
                            clearInterval(time)
                        }                       
                        this.underway(this.opening_time)
                    },1000)
                }*/
            } 
        },

        async BasketballStatistics(){
            let data = {
                'id':this.event_id
            }
            let res = await BasketballGameStatistics(data)
            if(res.code == 0 || res.code == 200){
                this.is_lineup = 1
                this.home_score = res.info.home ? res.info.home : []
                this.away_score = res.info.away ? res.info.away: []

                let count_score = res.info.statistics ? res.info.statistics : []

                if(count_score.length > 0){
                    count_score.forEach((val,i) => {
                        let total = val.home + val.away
                        if(total > 0){
                            val.home_percentage = parseInt(val.home / total * 100)
                            val.away_percentage = parseInt(val.away / total * 100)
                        }else{
                            val.home_percentage = 0
                            val.away_percentage = 0
                        }                        
                    });                
                    this.count_score = count_score
                }
                
                let team_max_score = res.info.max ? res.info.max : []
                if(team_max_score.length > 0){
                    res.info.max.forEach((val,i) => {
                        let players_score = {
                            'home_players_id' : val[0].players_id,
                            'home_players_name' : val[0].players_name,
                            'home_jersey_number' : val[0].jersey_number,                       
                            'home_players_avatar' : val[0].players_avatar,   

                            'away_players_id' : val[1].players_id,
                            'away_players_name' : val[1].players_name,
                            'away_jersey_number' : val[1].jersey_number,                                             
                            'away_players_avatar' : val[1].players_avatar,                       
                        }

                        switch(i){
                            case 0:
                                players_score.text = '蓝板'
                                players_score.home_max = val[0].assists
                                players_score.away_max = val[1].assists
                                players_score.home_max_text = val[0].assists + 'px'
                                players_score.away_max_text = val[1].assists + 'px'
                                players_score.home_top = parseInt(val[0].assists) + 5 + 'px'
                                players_score.away_top = parseInt(val[1].assists) + 5 + 'px'
                                players_score.home_left = parseInt(val[0].assists) > 9 ? 10 + 'px' : 16 + 'px'
                                players_score.away_left = parseInt(val[1].assists) > 9 ? 18 + 'px' : 24 + 'px'
                                break;
                            case 1:
                                players_score.text = '助攻'
                                players_score.home_max = val[0].total
                                players_score.away_max = val[1].total
                                players_score.home_max_text = val[0].total + 'px'
                                players_score.away_max_text = val[1].total + 'px'
                                players_score.home_top = parseInt(val[0].total) + 5 + 'px'
                                players_score.away_top = parseInt(val[1].total) + 5 + 'px'
                                players_score.home_left = parseInt(val[0].total) > 9 ? 10 + 'px' : 16 + 'px'
                                players_score.away_left = parseInt(val[1].total) > 9 ? 18 + 'px' : 24 + 'px'                               
                                break;
                            default:
                                players_score.text = '得分'
                                players_score.home_max = val[0].score
                                players_score.away_max = val[1].score
                                players_score.home_max_text = val[0].score + 'px'
                                players_score.away_max_text = val[1].score + 'px'
                                players_score.home_top = parseInt(val[0].score) + 5 + 'px'
                                players_score.away_top = parseInt(val[1].score) + 5 + 'px'
                                players_score.home_left = parseInt(val[0].score) > 9 ? 10 + 'px' : 16 + 'px'
                                players_score.away_left = parseInt(val[1].score) > 9 ? 18 + 'px' : 24 + 'px'
                        }
                        
                        this.max_score.unshift(players_score)
                    })
                }               
            }           
        },

        async SingleHistory(){
            let data = {
                'id':this.event_id
            }

            let res = await BasketballSingleHistory(data)
            if(res.code == 0 || res.code == 200){
                this.is_finger = 1
                let finger = res.info

                this.single_finger_list.asia = finger.asia
                this.single_finger_list.eu = finger.eu
                this.single_finger_list.bs = finger.bs
            }
        },

        async SingleHistoryList(row){
            let data = {
                'id' : this.event_id,
                'type':this.finger_status
            }
            let res = await BasketballSingleHistoryList(data)
            if(res.code == 0 || res.code == 200){  
                this.history_list_active = row.company_name          
                this.single_history_list = res.info
                this.dialog = true               
            }           
        },

        async Live_Matches(){       
            let data = {
                'matchid' : this.event_id,
                'type':2
            }
            let res = await LiveMatches(data)
            if(res.code == 0){
                if(this.status != 10){
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
            console.log("player")
            var player =  new TcPlayer(id, {
                "m3u8": url,
                "autoplay" : true, 
                "coverpic" : "",
                "height" : '530', 
                listener(msg) {

                }
            });
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
    
        TeamChange(tab, event){ 
            console.log(tab.name)
            switch(tab.name){
                case 'statistics':
                    if(this.is_lineup == 0){
                        this.BasketballStatistics() 
                    }
                    break;
                case 'finger': 
                    if(this.is_finger == 0){
                        this.SingleHistory() 
                    }    
                    break;                      
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

        fingerClose(){
            this.dialog = false
        },

        formate (time) {
            if(time>=10){
                return time
            }else{
                return `0${time}`
            }
        },
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
                >div{
                    display: block;
                    float:left;
                    text-align: center;
                    letter-spacing: 1px;
                    font-size: 14px;
                    height: 20px;
                    line-height: 20px;
                    margin-top:5px;
                }

                .title{
                    width:184px;
                } 

                .section{
                    width:340px;
                    >span{
                        display: block;
                        width:84px;
                        float:left;                   
                    }
                }

                .event_status{
                    width:380;
                    >span{
                        display: block;
                        width:94px;
                        float:left;
                        border-right: 1px solid #dedede;                       
                    }
                }

                .cultivation_rate{
                    width:300px;
                    >span{
                        display: block;
                        width:99px;
                        float:left; 
                        border-right: 1px solid #dedede;                      
                    }
                }
            }

            .rate_table{               
                width:100%;
                height: 30px;
                line-height:30px;
                border-top:1px solid #dedede;
                >div{
                    margin-top:5px;
                    display: block;
                    float:left;
                    text-align: center;
                    letter-spacing: 1px;
                    font-size: 14px;
                }

                .section{
                    width:340px;
                    >span{
                        display: block;
                        width:84px;
                        float:left;
                        height: 20px;  
                        line-height: 20px;                        
                    }

                    .vertical{
                        height: 20px;
                        line-height: 20px;
                        margin-top:5px;
                        width:1px;
                        background: #dedede;
                        position: relative;
                        right:2px;
                    } 
                }

                .title{
                    width:184px;
                    height: 20px;
                    line-height: 20px;
                    span{                        
                        display: block;
                        
                    }
                }

                .event_state{
                    width:380;
                    height: 20px;
                    line-height: 20px;
                    >span{
                        display: block;
                        width:94px;
                        float:left;
                        border-right: 1px solid #dedede;                       
                    }   
                }

                .cultivation_rate{
                    width:300px;
                    height: 20px;
                    line-height: 20px;
                    >span{
                        display: block;
                        width:99px;
                        float:left; 
                        border-right: 1px solid #dedede;                      
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

                .event_status{
                    position: absolute;
                    height: 220px;
                    width:600px;
                    z-index: 100;
                    left:130px;
                    top:120px;
                    border-radius: 20px;
                 
                    .half{
                        width:100%;
                        height: 100%;
                        .time{                             
                            width:100%;
                            height: 40px;
                            line-height: 40px;
                            background:#000000;
                            border-top-left-radius:10px;
                            border-top-right-radius:10px;                         
                            >p{
                                float:left;
                                
                                >span{
                                    display: block;
                                    float:left;
                                    color:#fff;
                                    letter-spacing: 1px;
                                    font-size:12px;
                                }

                                .vertical{
                                    width:5px;
                                    height:25px;
                                    background: #f8c21b;
                                    border-radius: 2px;
                                    position: relative;
                                    top:8px;
                                }
                            }

                            .left{
                                width:70%;
                                span{
                                    margin:0px 0px 0px 15px;
                                }
                            }

                            .right{
                                width: 30%;
                                padding-left:100px;
                                span{
                                    margin:0px 0px 0px 5px;
                                }
                            }
                        }

                        .team_half_score{
                            width:100%;
                            height: 90px;
                            background:#000000;
                            opacity: 0.5;
                            >div{
                                float:left;
                                width:33.3%;
                            }

                            .home_team{
                                height: 80px;
                                padding-top:10px;
                                p{
                                    height: 40px;
                                    line-height:40px;
                                    text-align: center;
                                    color:#fff;
                                    letter-spacing: 1px;
                                    font-size:14px;
                                    img{
                                        height: 40px;
                                    }                       
                                }
                            }

                            .score{
                                height: 80px;
                                padding-top:5px;
                                .status{
                                    font-size:16px;
                                    height: 30px;
                                    line-height:30px;
                                    text-align: center;
                                    color:#fff;
                                    letter-spacing: 1px; 
                                }

                                .team_score{
                                    height: 50px;
                                    line-height:50px;
                                    text-align: center;
                                    color:#fff;
                                    letter-spacing: 1px;
                                    font-size:24px; 
                                    font-weight:600;
                                    letter-spacing: 1px;                                                          
                                }
                            }

                            .away_team{
                                height: 80px;
                                padding-top:10px;
                                p{
                                    height: 40px;
                                    line-height:40px;
                                    text-align: center;
                                    color:#fff;
                                    letter-spacing: 1px;
                                    font-size:14px;
                                    img{
                                        height: 40px;
                                    }                       
                                }
                            }
                        }

                        .scored{
                            width:100%;
                            height: 90px;                            
                            letter-spacing: 1px;
                            border-bottom-left-radius:10px;
                            border-bottom-right-radius:10px;
                            background: #000000;
                            .menu{
                                width:100%;
                                height: 30px;
                                line-height:30px;

                                p{
                                    float:left;
                                    width:180px;
                                    text-align: center;
                                }
                                >span{
                                    display: block;
                                    float:left;
                                    width:80px;
                                    text-align: center;
                                    font-size:14px;
                                    color:#fff;
                                }
                            }

                            .team_scored{
                                width:100%;
                                height: 30px;
                                line-height:30px;
                                p{
                                    float:left;
                                    width:180px;
                                    text-align: center;
                                    font-size:14px;
                                    color:#fff;
                                }

                                >span{
                                    display: block;
                                    float:left;
                                    width:80px;
                                    text-align: center;
                                    font-size:14px;
                                    color:#fff;
                                }
                            }
                        }
                    }


                    .not{
                        width:100%;
                        height: 100%;
                        background:rgb(27 25 25 / 20%);
                        border-radius: 10px;
                        >div{
                            float:left;                            
                        }
                        
                        .home_team{
                            height: 220px;
                            padding-top:70px;
                            width:35%;
                            p{
                                height: 50px;
                                line-height:50px;
                                text-align: center;
                                color:#fff;
                                letter-spacing: 1px;
                                font-size:18px;
                                font-family:'黑体';
                                img{
                                    height: 40px;
                                }                       
                            }
                        }

                        .score{
                            height: 80px;
                            padding-top:40px;
                            width:30%;
                            .status{
                                font-size:16px;
                                height: 40px;
                                line-height:40px;
                                text-align: center;
                                color:#fff;
                                letter-spacing: 1px; 
                            }

                            .count_down{
                                >span{
                                    display: block;
                                    float:left;
                                    background: #000;
                                    width:35px;
                                    height: 45px;
                                    line-height:45px;
                                    text-align: center;
                                    color:#fff;
                                    letter-spacing: 1px;
                                    font-size:22px; 
                                    font-weight:600;
                                    margin-right:10px;
                                    border-radius:5px;
                                    font-family:'cursive';
                                }
                                                                                          
                            }

                            .time{
                                >span{
                                    display: block;
                                    float:left;
                                    width:35px;
                                    height: 30px;
                                    line-height:30px;
                                    text-align: center;
                                    color:#bdb7b7;
                                    letter-spacing: 1px;
                                    font-size:14px;
                                    margin-right:10px;
                                }
                                                                                          
                            } 
                        }

                        .away_team{
                            height: 80px;
                            padding-top:70px;
                            width:35%;
                            p{
                                height: 50px;
                                line-height:50px;
                                text-align: center;
                                color:#fff;
                                letter-spacing: 1px;
                                font-size:18px;
                                font-family:'黑体';
                                img{
                                    height: 40px;
                                }                       
                            }
                        } 
                    }

                    .end{
                        width:100%;
                        height: 100%;
                        background:#000000;
                        opacity: 0.5;
                        filter: Alpha(opacity=50);
                        border-radius: 10px;
                    
                        .match_title{
                            width:100%;
                            height: 40px;
                            line-height:40px;
                            text-align: center;
                            color:#fff;
                            border-top-left-radius:10px;
                            border-top-right-radius:10px;
                            background:#b1afaf; 
                        }

                        .ball_game{
                            width:100%;
                            >div{
                                float:left;                            
                            }
                            .home_team{
                                height: 220px;
                                padding-top:70px;
                                width:40%;
                                p{
                                    height: 50px;
                                    line-height:50px;
                                    text-align: center;
                                    color:#fff;
                                    letter-spacing: 1px;
                                    font-size:18px;
                                    font-family:'黑体';
                                    img{
                                        height: 40px;
                                    }                       
                                }
                            }

                            .score{
                                height: 80px;
                                padding-top:60px;
                                width:20%;
                                .status{
                                    font-size:16px;
                                    height: 30px;
                                    line-height:30px;
                                    text-align: center;
                                    color:#fff;
                                    letter-spacing: 1px; 
                                }

                                .team_score{
                                    height: 50px;
                                    line-height:50px;
                                    text-align: center;
                                    color:#fff;
                                    letter-spacing: 1px;
                                    font-size:24px; 
                                    font-weight:600;
                                    letter-spacing: 1px;                                                          
                                }
                            }

                            .away_team{
                                height: 80px;
                                padding-top:70px;
                                width:40%;
                                p{
                                    height: 50px;
                                    line-height:50px;
                                    text-align: center;
                                    color:#fff;
                                    letter-spacing: 1px;
                                    font-size:18px;
                                    font-family:'黑体';
                                    img{
                                        height: 40px;
                                    }                       
                                }
                            } 
                        }


                    }
                    
                }

                .animation_content{
                    width:100%;
                    height: 530px;
                    background:#4c4b4b;
                    .content{
                        width:100%;
                        background:#3a3939;
                        #animation_content{
                            width:800px;
                            height: 530px;
                            margin-left:30px;
                        }                        
                    }
                }

                .video_content{
                    width:100%;
                    height: 475px;
                    background: #343434;

                    .content{
                        width:100%;
                        height: 475px;
                        background: #4c4b4b;                                               
                    }
                }

                .team{
                    width:100%;
                    height: 55px;
                    line-height: 55px;
                    background: #2b2b2b;

                    >div{
                        float: left;
                    }

                    .home_team{
                        width:370px;
                        text-align: center;
                        span{
                            font-size:14px;
                            letter-spacing: 1px;
                            color:#fff;
                        }

                        img{
                            height :30px;
                            position: relative;
                            top:10px;   
                            margin-right:10px;
                        }
                    }

                    .away_team{
                        width:370px;
                        text-align: center;
                        span{
                            font-size:14px;
                            letter-spacing: 1px;
                            color:#fff;
                        }

                        img{
                            height :30px;
                            position: relative;
                            top:10px;   
                            margin-left:10px;                        
                        }                       
                    }

                    .sorce_conduct{
                        width:120px;
                        height: 55px;
                        .time{
                            height: 30px;
                            line-height:30px;
                            text-align: center;
                            width: 100%;
                            color:white;
                            font-size:14px;
                            letter-spacing:1px;
                        }

                        .now_sorce{
                            height: 30px;
                            line-height:30px;
                            width: 100%;
                            text-align: center;
                            padding:0px 0px 5px 25px;
                            position: relative;
                            bottom:5px;
                            >span{
                                display: block;
                                float:left;
                            }
                            img{
                                width:15px;                                
                            }
                            .home_sorce{
                                width:23px;
                                height: 27px;
                                line-height: 27px;
                                background: #000000;
                                border-radius: 2px;
                                color:#fff;
                                opacity:0.7;
                                filter: Alpha(opacity=70);
                                margin:0px 5px 0px 2px;
                                font-family:'黑体';
                                font-weight: 600;
                            }

                            .away_sorce{
                                width:23px;
                                height: 27px;
                                line-height: 27px;
                                background: #000000;
                                border-radius: 2px;
                                color:#fff;
                                opacity:0.7;
                                filter: Alpha(opacity=70);
                                margin:0px 2px 0px 5px;
                                font-family:'黑体';
                                font-weight: 600;
                            }
                        }
                    }

                    .sorce_half{
                        width:120px;
                        height: 55px;
                        .time{
                            height: 30px;
                            line-height:30px;
                            text-align: center;
                            width: 100%;
                            color:white;
                            font-size:14px;
                            letter-spacing:1px;
                        }

                        .now_sorce{
                            height: 55px;
                            line-height:55px;
                            width: 100%;
                            text-align: center;
                            padding:0px 0px 5px 12px;
                            >span{
                                display: block;
                                float:left;
                            }
                            img{
                                width:15px; 
                                position: relative;  
                                top:2px;                             
                            }
                            .home_sorce{
                                width:23px;
                                height: 27px;
                                line-height: 27px;
                                background: #000000;
                                border-radius: 4px;
                                color:#fff;
                                opacity:0.7;
                                filter: Alpha(opacity=70);
                                margin:15px 5px 0px 2px;
                                font-family:'黑体';
                                font-weight: 600;
                            }

                            .away_sorce{
                                width:23px;
                                height: 27px;
                                line-height: 27px;
                                background: #000000;
                                border-radius: 4px;
                                color:#fff;
                                opacity:0.7;
                                filter: Alpha(opacity=70);
                                margin:15px 2px 0px 5px;
                                font-family:'黑体';
                                font-weight: 600;
                            }
                        }
                    }
                }

                .team_end{
                    width:100%;
                    height: 55px;
                    line-height: 55px;
                    background: #2b2b2b;
                    >div{
                        float: left;
                    }

                    .home_team{
                        width:350px;
                        text-align: center;
                        height: 55px;
                        line-height: 55px;
                        span{
                            font-size:18px;
                            letter-spacing: 1px;
                            color:#fff;
                            position: relative;
                            left:20px; 
                            bottom:20px;
                        }

                        img{
                            height :55px;  
                            margin-right:10px;
                        }
                    }

                    .away_team{
                        width:350px;
                        text-align: center;
                        height: 55px;
                        line-height: 55px;
                        span{
                            font-size:18px;
                            letter-spacing: 1px;
                            color:#fff;
                            position: relative;
                            right: 20px; 
                            bottom:20px;
                        }

                        img{
                            height :55px;  
                            margin-left:10px;                        
                        }                       
                    }

                    .sorce_end{
                        width:150px;
                        height: 50px;
                        line-height:50px;
                        border:2px solid #fff;
                        border-radius: 5px;
                        margin-top: 5px;
                        .now_sorce{
                            height: 50px;
                            line-height:50px;
                            width: 100%;
                            position: relative;
                            padding:4px 0px 0px 33px; 
                            bottom:5px;
                            >span{
                                display: block;
                                float:left;                               
                                text-align: center;
                            }
                           
                            .home_sorce{
                                color:#fff;
                                font-family:'黑体';
                                font-weight: 600;
                                font-size:30px;
                                width:33%;
                            }

                            .away_sorce{
                                color:#fff;
                                font-family:'黑体';
                                font-weight: 600;
                                font-size:30px;
                                width:33%;
                            }
                        }
                    }                    
                }

                .evnet_status{
                    width:100%;
                    height: 150px;
                    background: #3e3e3e;
                    padding-top:30px;
                    >div{
                        float:left;
                    }
                
                    .home_score{
                        width:360px;
                        height: 90px;                       
                        float:left;
                        
                        .foul{
                            height: 90px;
                            float: left;
                            width:140px;
                            .foul_type{
                                text-align: center;
                                margin:15px 20px 0px 40px;
                                background:#2d2c2c;
                                border-radius: 17px;
                                height: 25px;
                                line-height:23px;
                                >span{
                                    letter-spacing: 1px;
                                    color: #fff;
                                    font-size:14px;
                                    padding:0px 5px 0px 5px;
                                } 
                            }                            
                        }

                        .team_score_type{
                            height: 90px;
                            float: left;
                            width:220px;

                            .home_line{
                                height: 30px;
                                line-height:30px;
                                >span{
                                    display: block;
                                    float:left;
                                    width:40px;
                                    text-align: center;
                                    font-size: 14px;
                                    letter-spacing: 1px;
                                    color: #fff;
                                }
                                
                                .progress{
                                    width:150px;
                                    float:left;
                                    
                                    .el-progress{
                                        position: relative;
                                        top:10px;
                                        transform:rotate(180deg);
                                    }
                                }
                            }
                        }                       
                    }

                    .score_type{
                        width:140px;
                        height: 90px;
                        >p{
                            height: 30px;
                            line-height:30px;
                            font-size:14px;
                            text-align: center;
                            color:#fff;

                            .free_throw{
                                margin:0px 15px 0px 15px;
                            }
                        }
                    }

                    .away_score{
                        width:360px;
                        height: 90px;
                        float:left;                       
                        .foul{
                            height: 90px;
                            float: left;
                            width:140px;
                            .foul_type{
                                text-align: center;
                                margin:15px 40px 0px 20px;
                                background:#2d2c2c;
                                border-radius: 17px;
                                height: 25px;
                                line-height:23px;
                                >span{
                                    letter-spacing: 1px;
                                    color: #fff;
                                    font-size:14px;
                                    padding:0px 5px 0px 5px;
                                } 
                            }                            
                        }

                        .team_score_type{
                            height: 90px;
                            float: left;
                            width:220px;
                            padding-left:10px;
                            .away_line{
                                height: 30px;
                                line-height:30px;
                                >span{
                                    display: block;
                                    float:left;
                                    width:40px;
                                    text-align: center;
                                    font-size: 14px;
                                    letter-spacing: 1px;
                                    color: #fff;
                                }
                                
                                .progress{
                                    width:150px;
                                    float:left;
                                    .el-progress{
                                        position: relative;
                                        top:10px;
                                    }
                                }
                            }
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

        .text_live{
            padding:10px 20px 10px 20px;

            .el-tabs__item{
                padding:0px 20px 0px 20px;
                height:40px;
                line-height: 40px;
                font-size:16px;
            }

            .el-tabs__header{
                padding:0px 20px 0px 0px;
            }

            .el-card__body{
                span{
                    display: inline-block;

                    img{
                        position: relative;
                        top:3px;
                        left:10px;
                    }
                }
            }
        }

        .statistics{
            padding:10px 20px 10px 20px; 
            .el-table__empty-text{
                font-size:30px;
                letter-spacing:1px;
                font-weight:500;
                display: block;
                height: 400px;
                line-height: 400px;
            }           
            .highest{
                width:100%;
                height: 300px; 
                margin-bottom:20px;                
                 .highest_score{
                    width:45%;
                    box-shadow: 0px 2px 4px #b9b6b6;
                    border-radius: 10px;
                    float: left;
                    height: 300px;
                    .player_score{
                        width:100%;
                        padding-top:30px;
                        height: 100px;
                        .home_player{
                            width:46%;
                            height: 60px; 
                            float:left;
                            border-bottom: 1px solid #eee;
                            >div{
                                float: left;                            
                            }

                            .avatar{
                                width:60px;
                                margin-right:10px;
                                img{
                                    margin:10px 0px 0px 20px;
                                    height: 40px;
                                }
                            }

                            .user{
                                width:100px;
                                height: 22px;
                                line-height: 22px;
                                margin-top:8px;
                                >span{
                                    display: block;
                                    font-size:14px;
                                }
                            }

                            .progress{
                                width: 30px;
                                height: 60px;
                                position: relative;
                                left:40px;
                                >span{
                                    display: block;
                                    height: 20px;
                                    text-align:center;
                                    position: absolute;
                                    left:50%;
                                }

                                .column{
                                    width:20px;
                                    background: rgb(207, 180, 152);
                                    position: absolute;
                                    bottom:0px;
                                    left:30%;
                                }                                
                            }
                        }

                        .type_score{
                            width:8%;
                            position: relative;
                            span{
                                display: block;
                                position: absolute;
                                width:50px;
                                height: 40px;
                                line-height:40px;
                                font-size:14px;
                                letter-spacing:1px;
                                top:-20px;
                                left:246px;
                            }
                        }

                        .away_player{
                            width:46%;
                            height: 60px; 
                            float:right;
                            border-bottom: 1px solid #eee;
                            >div{
                                float: right;                            
                            }

                            .avatar{
                                width:60px;
                                margin-right:20px;
                                img{
                                    margin:10px 0px 0px 20px;
                                    height: 40px;
                                }
                            }

                            .user{
                                width:100px;
                                height: 22px;
                                line-height: 22px;
                                margin-top:8px;                           
                                >span{
                                    display: block;
                                    font-size:14px;
                                    text-align:right;
                                }
                            }

                            .progress{
                                width: 60px;
                                height: 60px;
                                position: relative;
                                right:20px;
                                >span{
                                    display: block;
                                    height: 20px;
                                    text-align:center;
                                    position: absolute;
                                    left:40%;
                                }

                                .column{
                                    width:20px;
                                    background: rgb(209, 108, 8);
                                    position: absolute;
                                    bottom:0px;
                                    left:30%;
                                }
                            }
                        }
                    }
                    
                }

                .total{
                    width:49%;
                    height: 300px;
                    box-shadow: 0px 2px 4px #b9b6b6;
                    float: left;
                    margin-left:5.5%;
                    border-radius: 10px;
                    .team_total{
                        width:100%;
                        height: 40px;
                        line-height:40px;
                        border-bottom: 1px solid #eee;
                        >div{
                            float: left;                             
                            text-align: center;
                            font-size:14px;                          
                        }

                        .home_team_name{
                            width:40%;
                            img{
                                height: 25px;
                                position: relative;
                                top:8px;
                                right:10px;
                            }
                        }

                        .vs{
                            width:20%;
                            font-size:20px;
                        }

                        .away_team_name{
                            width:40%;
                            height: 25px;
                            img{
                                height: 25px;
                                position: relative;
                                top:8px;
                                left:10px;
                            }
                        }
                    }

                    .team_total_score{
                        margin-top:10px;
                        .total_score_list{
                            width: 100%;
                            height: 40px;
                            >div{
                                float:left;
                            }

                            .home_total_detail{
                                width: 40%;
                                span{
                                    display: block;
                                    width:60px;
                                    height: 30px;
                                    line-height: 30px;
                                    font-size:14px;
                                    float:left;
                                    text-align:center;
                                }                               
                                .progress{
                                    height: 30px;
                                    position: relative;
                                    top:10px;
                                    left:60px;
                                    .el-progress--text-inside .el-progress-bar{
                                        transform:rotate(180deg);
                                    }
                                }

                            }

                            .text{
                                width: 20%;
                                height: 30px;
                                line-height: 30px;
                                text-align: center;
                                span{
                                     font-size:12px;
                                }
                            }

                            .away_total_detail{
                                width: 40%;
                                height: 30px;
                                span{
                                    display: block;
                                    width:60px;
                                    height: 30px;
                                    line-height: 30px;
                                    font-size:14px;
                                    float:right;
                                    text-align:center;
                                }
                                .progress{
                                    width:167px;
                                    height: 30px;
                                    position: relative;
                                    top:10px;
                                    float:left;
                                }
                            }
                        }
                    }
                } 
            }
          
            .el-tabs__item{
                height:60px;
                line-height: 60px;
                font-size:18px;
                letter-spacing:1px;
                border-left-color:#DCDFE6;
                width:50%;
            }

            .el-table td, .el-table th{
                padding:5px 0px 5px 0px;  
            }

            .el-tabs__header{
                padding:0px 0px 0px 0px;
            }

            .el-tabs__nav-prev{
                display: none;
            }

            .el-tabs__nav-next{
                display: none;
            }

            .el-tabs__nav-wrap.is-scrollable{
                padding:0px;
            }

            .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
                border-right-color:#fff;
            }

            .players{
                position: relative;
                img{
                    height: 30px;
                    width:30px;
                    float:left;
                    margin-left:5px;
                    border-radius:20%;
                }

                span{
                    display: block;
                    float:left;
                    position: absolute;
                    top:5px;
                    left:40%;                   
                }

                i{
                    float:left;
                    width:30px;
                    height:30px;
                    line-height: 30px;
                    font-size:24px;
                    position:relative;
                    top:0px;
                    right:5px;
                    color:#a79d9d;
                    border-radius:50%;
                    background:#d8d2d2;
                    text-align:center;
                    margin-left:10px;
                }
            }

            .home_event_logo{
                width:30px;
                position: relative;
                top:8px;
                right:20px;
            }

            .away_event_logo{
                width:30px;
                position: relative;
                top:8px;
                left:20px;
            }
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

            .el-table_3_column_33{
                border-right: 1px solid #ecedef;
            }

            .el-table_3_column_34{
                border-right: 1px solid #ecedef;
            }

            .el-table_3_column_35{
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

            .el-table_5_column_43{
                border-right: 1px solid #ecedef;
            }

            .el-table_5_column_44{
                border-right: 1px solid #ecedef;
            }

            .el-table_5_column_45{
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



