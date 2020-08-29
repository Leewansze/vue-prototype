<template>
  <div>
    <span class="System">System Announcements - New</span>
    <!-- Dash -->
    <a-divider dashed />
    <router-view></router-view>
    <a-form :form="form" @submit="handleSubmit">
      <!-- Title -->
      <a-form-item label="Title" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="['note1', { rules: [{ required: true, message: 'Please input your note!' }] }]"
          placeholder="Announcement Title"
        />
      </a-form-item>
      <!-- Date -->
      <a-form-item label="Date" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="['note2', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
      <!-- Severity -->
      <a-form-item v-bind="formItemLayout" :label-col="{ span: 7 }" :wrapper-col="{span: 12}">
        <span slot="label">
          Severity&nbsp;
          <a-tooltip placement="bottom" >
            <template slot="title">
              <span>
                1: Active Message<br/>
                2: Schedule Message<br/>
                3: Complete Message<br/>
                4: Sample
              </span>
            </template>
            <a-icon type="question-circle" />
          </a-tooltip>
        </span>
          <a-select
            showSearch
            placeholder="Please Select"
            optionFilterProp="children"
            style="width: 300px"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            :filterOption="filterOption" >
            <a-select-option value="Active Message">Active Message</a-select-option>
            <a-select-option value="Schedule Message">Schedule Message</a-select-option>
            <a-select-option value="Complete Message">Complete Message</a-select-option>
            <a-select-option value="Sample">Sample</a-select-option>
        </a-select>
      </a-form-item>
      <!-- Subject -->
      <a-form-item label="Subject:" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="['note3', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
      <!-- Affected Service -->
      <a-form-item label="Affected Service" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="['note4', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
      <!-- Effctive From&To -->
      <a-form-item v-bind="formItemLayout" label="Effctive From" :label-col="{ span: 7 }">
        <a-date-picker v-decorator="['date-picker1', { rules: [{ required: true, message: 'Please select the correct date!' }] }]" placeholder=""/>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Effctive To" :label-col="{ span: 7 }">
        <a-date-picker v-decorator="['date-picker2', { rules: [{ required: true, message: 'Please select the correct date!' }] }]" placeholder=""/>
      </a-form-item>
      <!-- Content -->
      <a-form-item label="Content:" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="['note5', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
      <!-- Expires -->
      <a-form-item v-bind="formItemLayout" label="Expires" :label-col="{ span: 7 }">
        <a-date-picker v-decorator="['date-picker3', { rules: [{ required: true, message: 'Please input your note!' }] }]" placeholder="Expire Dates"/>
      </a-form-item>
      <!-- HTML file name -->
      <a-form-item label="HTML file name" :label-col="{ span: 7 }" :wrapper-col="{span: 12}">
        <a-input placeholder="File name to be use in Agenswebplaza"/>
      </a-form-item>
      <!-- checkBox -->
      <a-form-item class="checkboxItem"label="Synchronization" :label-col="{ span: 7 }" :wrapper-col="{span: 12}">
        <a-checkbox @change="onChange">Checkbox</a-checkbox>
      </a-form-item>
      <!-- Radio -->
      <a-form-item label="Synchronization" :label-col="{ span: 7 }" :wrapper-col="{span: 12}">
        <a-radio-group @change="onChange" v-model="value">
          <a-radio :style="radioStyle" :value="1">un-click to re-sync</a-radio>
          <a-radio :style="radioStyle" :value="2">Emergency Maintenance</a-radio>
          <a-radio :style="radioStyle" :value="3">Planned Maintenance</a-radio>
          <a-radio :style="radioStyle" :value="4">Weekend Maintenance</a-radio>
          <a-radio :style="radioStyle" :value="5">Your own value <a-input class="ownValue"/></a-radio>
        </a-radio-group>
      </a-form-item>
      <!-- Upload -->
      <a-form-item label="Attachment(s)" :label-col="{ span: 7 }" :wrapper-col="{span: 12}"class="Upload">
        <a-upload-dragger
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
            <p class="ant-upload-text">Click or drag file to this area to upload</p>
            <p class="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other
              band files
          </p>
        </a-upload-dragger>
      </a-form-item>
      <!-- Save&Cancel -->
      <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
        <a-button type="primary" html-type="submit">Save</a-button>
        <a-button :style="{ marginLeft: '8px' }" @click="handleReset" class="Cancel">Cancel</a-button>
      </a-form-item>
       
    </a-form>
  </div>
</template>
<script>
  import reqwest from 'reqwest';
  import EditableCell from './EditableCell';
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
  };

  export default {
    name:'newForm',
    mounted() {
      this.fetch();
    },
    data() {
      return {
        // form
        checkNick: false,
        formItemLayout,
        formTailLayout,
        form: this.$form.createForm(this, { name: 'dynamic_rule' }),
        // Radio
        value: 1,
        radioStyle: {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
        },
      };
    },
    components: {
      EditableCell,
    },
    methods: {
      check() {
      this.form.validateFields(err => {
        if (!err) {
          console.info('success');
        }
      });
      },
      handleChange(e) {
        this.checkNick = e.target.checked;
        this.$nextTick(() => {
          this.form.validateFields(['nickname'], { force: true });
        });
      },
      onChange(e) {
        console.log(`checked = ${e.target.checked}`);
      },
      onChange(e) {
        console.log('radio checked', e.target.value);
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      },
      handleReset() {
        this.form.resetFields();
      },
    }
  };
</script>
<style lang="less">
  /*Header*/
  .System{
    font-size: 20px;
    color: #333333;
    font-family: 'Roboto Regular';
    line-height: 26px;
  }
  /*dash style*/
  .ant-divider{
    margin:19px 0 40px 0;
  }
  /* form label Style */
  .ant-form-item-label label{
    font-size:14px;
    margin-right: 21px;
    color: #555555;
  }
  /*checkBox*/
  .checkboxItem{
    margin-bottom:8px;
  }
  /* selector tooltip Sytle*/
  .ant-tooltip-inner{
    width:220px;
    font-size: 14px;
    font-family: 'Roboto Regular';
    line-height: 19px;
    background: rgba(0,0,0,0.75);
    border-radius: 4px;
    span{
      display: inline-block;
      padding-top:9px;
      padding-left:15px;
      padding-bottom:6.8px;
    }
  }
  /* Calendar-picker-input label*/ 
  .ant-calendar-picker-input{
    width:300px;
  }
  /*  Radio  */
  .ownValue{
    width:300px;
    height: 34px;
    margin-left:15px; 
  }
  /* Upload Style*/
  .Upload{
    margin-bottom:80px;
  }
  /* Submit&Cancel Button Style*/
  .ant-btn[type="submit"],.Cancel{
    width:160px;
    height:42px;
    font-size: 16px;
    letter-spacing: 0;
    border-radius: 4px;
    margin-bottom: 113px;
  }
  .ant-btn[type="submit"]{
    background: #16DDC3;
    border:#16DDC3;
    margin-right:30px;
  }
  .Cancel:focus{
    border: 1px solid #D8D8D8;
  }
</style>