<template>
  <div id="Index" :style="{ height: screenHeight + 'px' }">
  <a-layout id="components-layout-demo-custom-trigger">
    <!-- Header start -->
    <a-layout>
      <a-layout-header style="padding:0">
        <div class="logo"  >
          <img src="../../static/one support portal-03.png">
          <span style="font-family:'Roboto Medium'" :style="logo">One Support Portal</span>
        </div>
          <a-icon
              v-bind:class="{ trigger: isActive,burger: isburger, 'Rotate': hasError }"
              @click="()=> collapsed = !collapsed"
              v-on:click="toggle()" :style="change" />
              <!-- <a-button class="swapLanguage" key="cn" :value="zhCN">简体中文</a-button> -->
            <!-- </a-button-group> -->
            <!-- User -->
            <div class="User">
              <span style="font-family:'Roboto Bold'">Welocme</span><a-icon type="user" style="margin-left:20px;margin-right:5px"/><span style="font-family:'Roboto Regular'">Demo User</span>
              <a-dropdown class="swapLanguage">
                <a-menu slot="overlay" @click="handleMenuClick">
                  <a-menu-item key="1">English</a-menu-item>
                  <a-menu-item key="2">some language1</a-menu-item>
                  <a-menu-item key="3">some language2</a-menu-item>
                </a-menu>
                <a-button style="margin-left: 22px">简体中文<a-icon type="down" /> </a-button>
              </a-dropdown>
            </div>
            
      </a-layout-header>
    </a-layout>
    <!-- Header end -->
    <a-layout :style="{ height: screenHeight + 'px' }">
      <!-- Sider -->
      <a-layout-sider :trigger="null" collapsible v-model="collapsed" :width="width" :collapsedWidth="collapsedWidth">
        <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
          <a-menu-item key="1">
            <router-link tag="a" to="/">
              <a-icon type="sound" />
              <span>System Announcements</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2">
           <!--  <router-link tag="a" to="/SR-Main"> -->
              <a-icon type="profile" />
              <span>SR Main Categories</span>
            <!-- </router-link> -->
          </a-menu-item>
          <a-menu-item key="3">
            <!-- <router-link tag="a" to="/Settings"> -->
              <a-icon type="setting" />
              <span>Settings</span>
           <!--  </router-link> -->
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <!-- Content -->
      <a-layout-content :style="{ margin: '24px 16px', padding: '15px 22px', background: '#fff', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</div>
</template>
<script>
  export default {
    name:'Index',
    data() {
      return {
        collapsed: false,
        width:'240px',
        collapsedWidth:'52px',
        logo:'',
        screenHeight: document.body.clientHeight,
        isActive:true,
        hasError:false,
        isburger:true,
      };
    },
    methods: {
      changeLocale(e) {
        const localeValue = e.target.value;
        this.locale = localeValue;
        if (!localeValue) {
          moment.locale('en');
        } else {
          moment.locale('zh-cn');
        }
      },
      toggle(){
        if (this.collapsed == false) {
          this.hasError=false;
          this.isburger=true;
        } else {
          this.hasError=true;
          this.isburger=false;
        }
      },
    
    },  
    mounted(){
    //挂载浏览器高度获取方法
    const that = this
    window.onresize = () => {
    return (() => {
       window.screenHeight = document.body.clientHeight
       that.screenHeight = window.screenHeight
    })()
  }
},

    watch:{
    //监控浏览器高度变化
      screenHeight (val) {
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if (!this.timer) {
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
          this.screenHeight = val
          this.timer = true
          let that = this
          setTimeout(function () {
            // 打印screenWidth变化的值
            console.log(that.screenHeight)
            that.timer = false
          }, 400)
        }
      }
    }

  };
</script>
<style lang="less">

  /*ant basic sytle*/
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 18px;
    cursor: pointer;
    transition: color 0.3s;
   
        
  }
  /*Header Style*/
  .ant-layout-header{
    width: 100%;
    height: 60px;
    background-color: #009CC7;
    -moz-box-shadow:0 4px 4px 0 rgba(0,0,0,0.40);
    -webkit-box-shadow:0 4px 4px 0 rgba(0,0,0,0.40);
    box-shadow: 0 4px 4px 0 rgba(0,0,0,0.40);
    z-index: 1;
    position: relative;
  }
  /*Header logo Style*/
  .logo {
    display: inline;
    font-size: 20px;
    color: #FFFFFF;
    padding:0 10px;
    position:relative;
    top:-1.5px;
    img{
      width:32px;
      height: 33.1px;
      vertical-align: center;
      position:relative;
      bottom:2px;
    }
  }
  /*Header tiggerNav Style*/
  .burger{
    display: inline-block!important;
    width: 30px;
    height: 35px;
    background:url(../../static/menu-expand-w.svg) no-repeat;
    background-size:40px 35px;
    position: relative;
    left:25px;
    top:8px;
    transform: rotate(180deg);
    animation: myAnimation 0.35s linear forwards;
  }
//rotate180deg
  .Rotate{
    display: inline-block!important;
    width: 30px;
    height: 35px;
    background:url(../../static/menu-expand-w.svg) no-repeat;
    background-size:40px 35px;
    position: relative;
    left:21px;
    top:8px;
    animation: Animation 0.35s linear forwards;
  } 
  /*Header Button*/
  .swapLanguage{
    width:120px;
    height:32px;
    color:#fff;
    text-align: center;
    background: none;
    border: 1px solid #FFFFFF;
    border-radius: 0px;
    padding:0px;
    &:hover,&:focus,&:active{
      background: none;
       background: none;
    border: 1px solid #FFFFFF;
    color:#fff;
    }
  }
  /*User name Style*/
  .User{
    color:#fff;
    font-size: 16px;
    display: inline;
    position: absolute;
    top:-0.2px;
    right:40px;
  }
  /*Sider Style*/
  .ant-layout-sider,.ant-menu{
    width:240px;
    background: #3E5D74;
  }
  .ant-menu-inline-collapsed{
    width:52px;
  }
  /* Collapsed item icon*/
  .ant-menu-inline-collapsed > .ant-menu-item{
    padding:0 15px!important;
  }
  /* first item */
  .ant-menu-item:first-child{
    margin-top:14px;
  }
  .ant-menu-item:not(:first-child){
    margin-top:1px;
  }
  .ant-menu-item{
    background: rgba(0,156,199,0.30);
    padding-left:16px!important;
    margin-bottom:0px!important;
    &:hover{
      background: rgba(0,156,199,0.30)!important;
    }
    a{
      font-family: 'Roboto Regular';
      font-size: 14px;
      color: #CCCCCC;
    }
    i{
      margin-top:0px;
      position:relative;
      top:4px;
      svg{
        width:1.5em;
        height:1.5em;
        color:white;
      }
    }
  }
  .ant-menu-item-selected{
    width:52px;
    background: rgba(22,221,195,0.80)!important;
    &:hover{
      background: rgba(22,221,195,0.80)!important;
    }
    a{
      font-family: 'Roboto Bold';
      color:#fff;
    }
  }
  /* animation */
  @keyframes myAnimation {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(180deg);
    }
  }
  @keyframes Animation {
    from {
        transform: rotate(180deg);
    }
    to {
        transform: rotate(0deg);
    }
  }
</style>